#!/usr/bin/env python3
r"""
Deploy the built site-v2 output to helixailabs.com (GoDaddy shared hosting) over SFTP,
then verify every uploaded file against the live URL.

Modelled on C:\\HelixAILabs\\Website\\deploy.ps1, with two deliberate differences:

  1. The source is a Jekyll BUILD OUTPUT directory, not a git tree, so the file list
     comes from walking that directory rather than `git ls-files`.
  2. It is strictly ADDITIVE. sftp `put` never deletes, and nothing here issues `rm`.
     That is load-bearing: the live server holds files that exist in no git repo and
     are NOT reproduced by the v2 build --
         .htaccess                     (the 301s for retired doc URLs)
         valence/mobile-latest.json    (mobile update feed)
         data/**                       (legacy poster/runtime assets)
         pics/valence-demo.mp4         (referenced by the v2 homepage!)
         pics/_old-ui-backup/**
     An additive deploy leaves all of them untouched. A mirroring deploy would
     destroy them. Do not "clean up" by adding deletes without re-checking that list.

Usage:
  python deploy.py --build --dry-run   # build, then list what would upload
  python deploy.py --build             # build, upload, verify   <- the normal one
  python deploy.py                     # upload an existing ./_site, then verify
  python deploy.py --verify-only       # no upload; just check live against ./_site

--build finds Ruby/Jekyll itself (it is a user-scope install at ~\RubyJekyll and is
deliberately not on PATH), so the normal deploy is one command from a cold start.

Rollback, if a deploy goes wrong:
  python C:\\HelixAILabs\\site-backups\\rollback.py --list
"""
import argparse, os, posixpath, re, subprocess, sys, tempfile, time, urllib.parse, urllib.request

# Build output lives beside this script, so the tool works from any clone.
HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "_site")
KEY = os.path.expanduser(r"~\.ssh\valence_godaddy")
TARGET = "o3adkbwx3vrb@72.167.59.200"
REMOTE = "public_html"
SITE = "https://helixailabs.com"

# GoDaddy injects a performance-monitoring script into every HTML response. It is the
# host, not us, so a byte-for-byte comparison can never match without stripping it.
INJECTION = re.compile(
    rb"<script>'undefined'===\s*typeof _trfq.*?</script>\s*"
    rb"(<script src='https://img1\.wsimg\.com/[^']*'></script>)?",
    re.S,
)
TEXT_EXT = {".html", ".json", ".css", ".js", ".txt", ".xml", ".md", ".svg"}


# Ruby/Jekyll is a user-scope install and is deliberately NOT on PATH, so a bare
# "jekyll" fails for anyone who has not set it up in their shell. Finding it here
# means the documented deploy is a single command that works from a cold start.
RUBY_BIN_CANDIDATES = [
    os.path.expanduser(r"~\RubyJekyll\bin"),
    r"C:\Users\chase\RubyJekyll\bin",
]


def jekyll_build():
    env = dict(os.environ)
    exe = None
    for d in RUBY_BIN_CANDIDATES:
        cand = os.path.join(d, "jekyll.bat")
        if os.path.exists(cand):
            exe, env["PATH"] = cand, d + os.pathsep + env.get("PATH", "")
            break
    if exe is None:
        from shutil import which
        exe = which("jekyll")
    if exe is None:
        print("FAIL: jekyll not found. Looked in:\n    %s\nInstall with:\n"
              "    winget install --id RubyInstallerTeam.RubyWithDevKit.3.2 --location "
              "%s --scope user\n    gem install jekyll bundler"
              % ("\n    ".join(RUBY_BIN_CANDIDATES), os.path.expanduser(r"~\RubyJekyll")))
        return False
    print("=== 0. Build ===")
    print("  jekyll    : %s" % exe)
    p = subprocess.run([exe, "build", "--destination", BUILD],
                       cwd=HERE, env=env, capture_output=True, text=True)
    out = (p.stdout + p.stderr).strip()
    for line in out.splitlines():
        if line.strip() and not line.startswith(("Configuration file", "            Source",
                                                 "       Destination", " Incremental",
                                                 " Auto-regeneration")):
            print("  " + line.strip())
    if p.returncode != 0:
        print("FAIL: jekyll build exited %d" % p.returncode)
        return False
    return True


def build_files():
    out = []
    for root, _dirs, files in os.walk(BUILD):
        for f in files:
            full = os.path.join(root, f)
            rel = os.path.relpath(full, BUILD).replace("\\", "/")
            out.append(rel)
    return sorted(out)


def upload(files):
    lines = ["cd " + REMOTE]
    made = set()
    for f in files:
        d = posixpath.dirname(f)
        if d and d not in made:
            # create each ancestor; '-' means "keep going if it already exists"
            parts = d.split("/")
            for i in range(1, len(parts) + 1):
                sub = "/".join(parts[:i])
                if sub not in made:
                    lines.append("-mkdir " + sub)
                    made.add(sub)
        # sftp's batch parser treats "\" as an escape, so a Windows path silently
        # collapses ("C:\vsite\out\.htaccess" -> "C:vsiteout.htaccess"). Forward
        # slashes work fine on Windows and survive the parser intact.
        lines.append('put "%s" "%s"' % (BUILD.replace("\\", "/") + "/" + f, f))
    lines.append("bye")
    with tempfile.NamedTemporaryFile("w", suffix=".sftp", delete=False, newline="\n") as fh:
        fh.write("\n".join(lines))
        batch = fh.name
    cmd = ["sftp", "-o", "StrictHostKeyChecking=no", "-o", "BatchMode=yes",
           "-i", KEY, "-b", batch, TARGET]
    print("  running sftp with %d puts ..." % len(files), flush=True)
    p = subprocess.run(cmd, capture_output=True, text=True)
    os.unlink(batch)
    if p.returncode != 0:
        tail = "\n".join((p.stdout + p.stderr).strip().splitlines()[-15:])
        print("FAIL: sftp exited %d\n%s" % (p.returncode, tail))
        return False
    print("  uploaded %d files" % len(files))
    return True


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "valence-deploy-verify"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.status, r.read()


def verify_htaccess():
    """Apache 403s .htaccess by design, so an HTTP fetch can never verify it. Verify
    its FUNCTION instead: probe a URL its redirects govern and require the 301. A
    wrong or missing .htaccess turns that into a 200 or 404, which fails here.
    Without this the deploy reported a failure on every single run, which is how you
    train yourself to ignore failures."""
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k):
            return None
    try:
        code = urllib.request.build_opener(NoRedirect).open(
            SITE + "/valence_docs.html", timeout=30).status
    except urllib.error.HTTPError as e:
        code = e.code
    except Exception as e:
        print("  FAILED  .htaccess :: redirect probe errored: %s" % str(e)[:80])
        return False
    if code == 301:
        print("  ok      .htaccess (verified by 301 probe; Apache 403s the file itself)")
        return True
    print("  FAILED  .htaccess :: redirect probe returned %s, expected 301" % code)
    return False


def verify(files):
    bad, checked = [], 0
    for f in files:
        if f == ".htaccess":
            checked += 1
            if not verify_htaccess():
                bad.append((f, "redirect probe"))
            continue
        url = SITE + "/" + "/".join(urllib.parse.quote(p) for p in f.split("/"))
        local = open(os.path.join(BUILD, f.replace("/", "\\")), "rb").read()
        ok, note = False, ""
        for attempt in (1, 2):
            try:
                status, body = fetch(url)
                if status != 200:
                    note = "HTTP %d" % status
                elif os.path.splitext(f)[1].lower() in TEXT_EXT:
                    l = local.replace(b"\r\n", b"\n").strip()
                    r = INJECTION.sub(b"", body).replace(b"\r\n", b"\n").strip()
                    ok = l == r
                    if not ok:
                        note = "local %d bytes vs live %d after stripping host injection" % (len(l), len(r))
                else:
                    ok = len(body) == len(local)
                    if not ok:
                        note = "size %d local vs %d live" % (len(local), len(body))
            except Exception as e:
                note = str(e)[:120]
            if ok:
                break
            if attempt == 1:
                time.sleep(2)  # large writes need a moment to settle
        checked += 1
        if not ok:
            bad.append((f, note))
            print("  FAILED  %s :: %s" % (f, note))
    print("  verified %d, failed %d" % (checked, len(bad)))
    return bad


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--verify-only", action="store_true")
    ap.add_argument("--build", action="store_true",
                    help="run jekyll build into ./_site first (finds Ruby itself)")
    a = ap.parse_args()

    if a.build and not jekyll_build():
        return 1

    files = build_files()

    # Repo plumbing keeps finding its way into the build output and out onto the
    # public web: CNAME, README.md, serve.sh, deploy.py (which carries the SFTP
    # account name and server IP) and DEPLOYING.md have each done it. _config.yml
    # excludes them, but an exclude is one typo from silently lapsing, so refuse
    # the upload outright rather than trusting it.
    never_publish = {"cname", "readme.md", "deploy.py", "deploying.md", "serve.sh",
                     "gemfile", "gemfile.lock", ".gitignore"}
    leaked = [f for f in files
              if f.lower() in never_publish or f.lower().startswith(".git")]
    if leaked:
        print("FAIL: repo plumbing reached the build output and must not be published:")
        for f in leaked:
            print("    " + f)
        print("  Add it to `exclude:` in _config.yml and rebuild.")
        return 1

    if not files:
        print("FAIL: %s is empty. Run with --build, or build it yourself first." % BUILD)
        return 1
    print("=== 1. Source ===")
    print("  build dir : %s" % BUILD)
    print("  files     : %d" % len(files))
    if a.dry_run:
        for f in files:
            print("    " + f)
        print("\n--dry-run: nothing uploaded.")
        return 0
    if not os.path.exists(KEY):
        print("FAIL: ssh key not found at %s" % KEY)
        return 1

    if not a.verify_only:
        print("=== 2. Upload (additive; nothing is deleted) ===")
        if not upload(files):
            return 1
        time.sleep(3)

    print("=== 3. Verify against %s ===" % SITE)
    bad = verify(files)
    print("=== Result ===")
    if bad:
        print("  %d file(s) did not verify" % len(bad))
        return 1
    print("  DEPLOYED AND VERIFIED - %d files match the live site" % len(files))
    return 0


if __name__ == "__main__":
    sys.exit(main())
