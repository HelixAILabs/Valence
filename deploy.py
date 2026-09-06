#!/usr/bin/env python3
"""
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
  python deploy.py --dry-run     # show what would upload, touch nothing
  python deploy.py               # upload, then verify
  python deploy.py --verify-only # skip upload, just verify live against the build
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


def verify(files):
    bad, checked = [], 0
    for f in files:
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
    a = ap.parse_args()

    files = build_files()
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
