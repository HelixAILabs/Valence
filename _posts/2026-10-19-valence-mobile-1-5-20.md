---
layout: post
title: "Valence for Android 1.5.20 alpha - Fixes for new users and the Ripple"
date: 2026-10-19
description: "Valence for Android 1.5.20 alpha: adding a model file works on the first try, Skip on the welcome screen no longer leaves the app ignoring taps, and the Ripple background keeps moving while you use the app."
---

A small release that fixes two problems new users hit in 1.5.19, and makes the Ripple background behave better.

## Fixes

- **Adding a model file works on the first try.** On a fresh install, a model added from your phone now gets the phone check by itself, and you can chat straight away. You no longer need Models ▸ Advanced ▸ Rescan phone.
- **Skip on the welcome screen.** After "Skip for now", the hidden welcome screen no longer catches your taps, so you don't have to restart the app.
- **The Ripple keeps moving while you use the app.** With the default (Native) drawing, the ripple keeps moving through taps, scrolling and typing. The Web backup still pauses while you touch the screen.
- **The Ripple rests again.** After about a minute without use the ripple stops to rest. In 1.5.19 it rested only once per session and then kept moving. It now rests every time.

## Known issues

- **A brief dark corner** can flash when you turn some phones sideways.
- **Scrolling** can be a little less smooth than it should be while the background is showing.

## Download

**[Valence-1.5.20-alpha-arm64.apk](https://helixailabs.com/valence/Valence-1.5.20-alpha-arm64.apk)** · 64-bit Android 7.0+ · 34 MB

SHA-256: `C7879AA9206B7CCC13A4FAF823C0581EF9EFA15CFB520E7BA6EB1A355724D959`

Installs straight over 1.5.14 or later and keeps your chats and your downloaded model.

Found something broken? Write to help@helixailabs.com.
