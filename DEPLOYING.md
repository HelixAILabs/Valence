# Building and deploying helixailabs.com

This branch (`site-v2`) **is** helixailabs.com. It is a Jekyll site, built locally and
pushed to GoDaddy over SFTP. There is no CI and no GitHub Pages involved.

## The normal deploy

```
cd C:\HelixAILabs\Valence-Site
python deploy.py --build
```

That builds `_site`, uploads every file over SFTP, then **re-fetches each one over
HTTPS and compares the bytes**. A green run ends with `DEPLOYED AND VERIFIED`. An
upload that "looked fine" is not evidence; the live URL is.

`--build` locates Ruby itself, so this works from a cold shell. Other forms:

```
python deploy.py --build --dry-run   # build, then list what would upload
python deploy.py                     # upload an existing ./_site
python deploy.py --verify-only       # no upload; check live against ./_site
```

## Rollback

```
python C:\HelixAILabs\site-backups\rollback.py --list
python C:\HelixAILabs\site-backups\rollback.py 2026-09-06-post-v2.tar.gz
```

The restore path is live-tested, not assumed: a real file was corrupted in production,
restored, and confirmed byte-identical. See that folder's README.

## Toolchain

Ruby 3.2.11 + Jekyll 4.4.1 are a **user-scope** install at `C:\Users\chase\RubyJekyll`
(`winget install --id RubyInstallerTeam.RubyWithDevKit.3.2 --location <dir> --scope user`
— no admin needed). It is deliberately **not on PATH**; `deploy.py --build` finds it.
To run `jekyll` by hand, prepend `C:\Users\chase\RubyJekyll\bin`.

`Gemfile.lock` pins the gems. The three plugins are hard build dependencies, not
optional: without `jekyll-redirect-from` there is no `/Valence.html`, which the shipped
app still links to. A missing plugin does not fail the build — it silently ships a
broken site. That is why the lockfile exists.

## Things that will bite you

**The deploy is ADDITIVE and must stay that way.** `sftp put` never deletes and nothing
here issues `rm`. The server holds files that exist in no repo and that Jekyll does not
produce:

| Path | What it is |
|---|---|
| `valence/mobile-latest.json` | the mobile update feed |
| `data/**` | legacy poster/runtime assets |
| `pics/valence-demo.mp4` | **referenced by the current home page** |
| `pics/_old-ui-backup/**` | old screenshots |

A mirroring deploy destroys all of it. Do not add deletes without re-checking that list.

**`version.json` is the highest-consequence file here.** The shipped desktop app
hardcodes `https://helixailabs.com/version.json` (`UpdateCheckService.cs:11`). A stale
or regressed file strands the entire installed base with no error, no prompt and no log
line. It regressed to 1.6.0 on this branch once and was caught before deploy.

**`.htaccess` cannot be verified over HTTP** — Apache 403s it by design. `deploy.py`
verifies its *function* instead, requiring `/valence_docs.html` to return 301.

**GoDaddy overrides `ErrorDocument`.** The styled `404.html` this site ships is never
served as an error page. Tested with both a path and a literal string; both ignored,
while `Redirect` rules in the same file work. The only fix is cPanel's "Error Pages"
tool, which is browser-only. The directive stays in `.htaccess` because it is correct
on any normal Apache and on GitHub Pages.

**GoDaddy injects a monitoring script into every HTML response**, so a naive byte
comparison can never match. `deploy.py` strips it before comparing.

**`sftp` batch files treat `\` as an escape.** A Windows path silently collapses
(`C:\vsite\out\.htaccess` → `C:vsiteout.htaccess`) and the transfer fails on the first
file. Use forward slashes.

**Windows MAX_PATH.** Jekyll's cache writes long paths; building from a deeply nested
directory fails with a confusing `No such file or directory` on `.jekyll-cache`. Keep
the clone somewhere short — this is why it lives at `C:\HelixAILabs\Valence-Site`.

**Do not deploy from `C:\HelixAILabs\Website`.** That is the retired flat site. Its
`deploy.ps1` and the Mac's `deploy.sh` now refuse to run, because deploying from there
uploads older pages over this site. It is kept only because its working tree still holds
1.7.x content nothing else does — it is dirty, 5 commits behind origin, and its committed
HEAD says 1.6.0 while production shipped 1.7.2.

## One repo, two branches, two sites

`HelixAILabs/Valence` serves **two different sites**:

- `main` → `helixailabs.github.io/Valence` — the release feed (its README is that page)
- `site-v2` → `helixailabs.com` — this site

They have **separate `_posts/` directories**. A release post added to one does not appear
on the other. Add it to both. This is exactly how they drifted: `site-v2` forked at 1.7.0
and never got the 1.7.1 or 1.7.2 posts, so its `/updates/` stopped at 1.7.0.

Merging them is a real option but not free: this branch carries a `CNAME` for
helixailabs.com that would claim the domain on Pages the moment it landed on `main`,
redirecting the github.io feed at DNS that still points to GoDaddy. `CNAME` is excluded
from the build for the same reason.

## What to edit for a release

See `/release` step 7 in the app repo. Short version — four places:

1. `_config.yml` — `valence_version`, `valence_date`, `valence_slim_mb`, `valence_full_mb`
2. `_includes/downloads.html` — the two SHA-256s (the only hardcoded release data left)
3. `_data/releases.yml` + `_posts/` — a row and a post
4. `version.json` — the auto-updater feed
