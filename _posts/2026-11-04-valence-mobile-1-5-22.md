---
layout: post
title: "Valence for Android 1.5.22 alpha - AI Workspace waits out heat and low battery, shows time left"
date: 2026-11-04
description: "Valence for Android 1.5.22 alpha: long rewrites in the AI Workspace pause for a hot phone, a low battery or Battery Saver, show how long is left, keep lists intact, and a cut-off reply now offers to finish the job."
---

The AI Workspace gets smarter about when and how it works. Long rewrites now wait out a hot phone or a low battery, show how long is left, and keep your lists intact. A reply that runs out of room now offers to finish the job instead of stopping with an error.

## New

- **Waits for a better moment.** A long rewrite pauses by itself when the phone is too hot, the battery is low or Battery Saver is on, tells you why, and carries on when things are back to normal.
- **Time left.** The running AI Workspace card shows roughly how long the rewrite has left.
- **An offer when a reply is cut off.** If an answer stops because it ran out of room, Valence offers to redo it in sections in the AI Workspace, instead of leaving a half answer or an engine error.
- **Lists stay lists.** A rewrite keeps every item of a list in the source.
- **"AI Workspace" in your notifications.** The ongoing notice and the notification categories in Android settings now carry the AI Workspace name.

## Changes

- **Large attached files go to the AI Workspace.** A file too long for one reply now gets the offer to rewrite it in sections, instead of being split up behind the scenes. The old "Split large attachments" settings are gone.
- **One place for the "chat is nearly full" warning.** When a cut-off offer is showing, the warning sits inside the offer card, so it is no longer hidden.

Everything else in 1.5.21.1 is unchanged.

## Known issues

- **A reopened cut-off chat** shows the offer again but not the length-limit note or the chat-nearly-full warning.
- **A reply can stop a little short of the bottom** of the chat and show the scroll-down arrow.
- **A rewrite can drop the last bullet of a section.** The "Check these" list flags what is missing, so check it before you use the result.
- **A brief dark corner** can flash when you turn some phones sideways.
- **Scrolling** can be a little less smooth than it should be while the background is showing.

## Download

**[Valence-1.5.22-alpha-arm64.apk](https://helixailabs.com/valence/Valence-1.5.22-alpha-arm64.apk)** · 64-bit Android 7.0+ · 34 MB

SHA-256: `09160712807D762348A1DD67514EA94F285C20975FD3AB18713570A4BF7AC473`

Installs straight over 1.5.14 or later and keeps your chats and your downloaded model.

Found something broken? Write to help@helixailabs.com.
