# Working on this site

**This directory is helixailabs.com.** `C:\HelixAILabs\Website` is not — it is a stale flat-HTML
tree that no longer publishes, and deploying from it uploads old pages over this site.

Before editing, adding, correcting or publishing anything here — including a one-line copy fix —
read the canonical skill, `helix-website`:

`C:\Users\chase\.claude\skills\helix-website\SKILL.md`

It is a user-level skill, so it is available from any repo — invoke it as `/helix-website`.

It covers the toolchain (Jekyll 4.4.1 + a Ruby that is deliberately off PATH), the structure,
post and page conventions, the two CSS token palettes and which scope they resolve in, the
verified additive deploy, how to screenshot and actually look at a page, and the claim-integrity
rules — a published figure names the instrument that produced it, and withdrawing a claim means
withdrawing it on every surface in the same deploy.

Deploy, for reference:

```bash
python deploy.py --build --dry-run   # build + list, uploads nothing
python deploy.py --build             # build, upload, byte-verify against the live URLs
```

`DEPLOYING.md` has the release-data specifics. The Valence `release` skill owns that subset and
defers to `update-website-skill` for everything else.
