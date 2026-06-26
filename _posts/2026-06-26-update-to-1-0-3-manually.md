---
layout: post
title: "Please update to 1.0.3 manually — a one-time fix for the in-app updater"
date: 2026-06-26 15:00:00 -0700
---

First, an apology. If you tried to update from inside Valence and it didn't install, that's on us. Here's exactly what happened and how to fix it in about two minutes.

## What went wrong

Valence **1.0.2 (and earlier)** had a bug in its **in-app updater**. When you clicked *Update*, it downloaded the new version correctly — but then couldn't hand the file off to the Windows installer, so the install failed with *"the installation package could not be opened."*

To be clear: **your data was never at risk.** Conversations, profiles, memory, and settings were untouched — the update simply couldn't finish.

We've fixed it in **1.0.3**.

## The catch — and why this is a one-time thing

The bug lives in the *old* version's updater, which means **the broken updater can't deliver its own fix.** So just this once, please install 1.0.3 by hand:

1. **[Download Valence 1.0.3](https://github.com/HelixAILabs/Valence/releases/download/v1.0.3/Valence-1.0.3.msi)** — or use the **Download** button on [helixailabs.com](https://helixailabs.com).
2. Run it. It's an **in-place upgrade**: your conversations, profiles, memory, and settings all carry over.

Windows may warn that the publisher is unknown (it's an indie app) — click **More info → Run anyway**.

**Once you're on 1.0.3, in-app updates work normally.** You won't have to do this again.

## Since you're updating anyway

1.0.3 is a big one:

- **Local AI now runs on AMD and Intel GPUs**, not just NVIDIA — Valence detects your hardware and picks the right acceleration (CUDA / Vulkan / CPU), and tells you which it's using.
- **Buy in one click**, right from the app.
- A clearer, **front-and-center "update available" prompt** going forward.
- Smarter defaults, an auto-selected model after setup, and a batch of fixes.

[Full release notes →](https://github.com/HelixAILabs/Valence/releases/tag/v1.0.3)

Sorry again for the hiccup, and thank you for bearing with us. Any trouble at all, email **help@helixailabs.com** — same inbox, same human.
