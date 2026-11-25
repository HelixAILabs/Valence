---
layout: post
title: "Valence for Android 1.5.23 alpha - AI Workspace keeps quotations, headings and names faithful"
date: 2026-11-24
description: "Valence for Android 1.5.23 alpha: AI Workspace rewrites keep quotations word for word, keep your headings and drop invented ones, and list any names the rewrite left out."
---

The AI Workspace now keeps your document's own words where they matter most. Quotations, headings and names in the source are checked against the rewrite, and anything it cannot put right is listed for you to check.

## New

- **Quotations stay word for word.** The rewrite is asked to copy quotations exactly. If it rewords one anyway and the original can be matched for certain, the original words are put back and a note says so. A quotation that was changed too much to match is listed under "Check these".
- **No made-up headings.** Headings written as `== Title ==` keep their own wording. A heading the rewrite invented is removed when that can be proven, and otherwise listed. A heading from your document that is missing from the rewrite is listed too.
- **Dropped names are listed.** If a section of the rewrite leaves out a person, place or company named in your document, "Check these" says which ones.

Everything else in 1.5.22 is unchanged.

## Known issues

- **A heavily reworded quotation** is listed, not put back.
- **A date split onto its own line** by the rewrite is not flagged yet.
- **A reopened cut-off chat** shows the offer again but not the length-limit note or the chat-nearly-full warning.
- **A reply can stop a little short of the bottom** of the chat and show the scroll-down arrow.
- **A rewrite can drop the last bullet of a section.** The "Check these" list flags what is missing, so check it before you use the result.
- **A brief dark corner** can flash when you turn some phones sideways.
- **Scrolling** can be a little less smooth than it should be while the background is showing.

## Download

**[Valence-1.5.23-alpha-arm64.apk](https://helixailabs.com/valence/Valence-1.5.23-alpha-arm64.apk)** · 64-bit Android 7.0+ · 34 MB

SHA-256: `DCD2F6968F52E36FB3B3B1A6F40CA95108407F8682447EF3F58EE0734D294129`

Installs straight over 1.5.14 or later and keeps your chats and your downloaded model.

Found something broken? Write to help@helixailabs.com.
