---
layout: post
title: "Valence for Android 1.5.19 alpha - A new look and a Models page"
date: 2026-10-19
description: "Valence for Android 1.5.19 alpha: a Ripple background, a simpler Settings with a Models page, ten accent colours, the phone's own light or dark mode, and a model that can check the weather and find your city."
---

This release is mostly about how Valence looks and how easy it is to find your way around. The empty chat has a moving Ripple background, there are ten accent colours, and the app follows your phone's light or dark mode. Models has its own page. And the on-device model can now check the weather and find your city by itself.

## What's new

- **Ripple background.** A slow ripple moves behind the empty chat. The phone draws it directly, which takes about half the processor time of drawing it in the web view. If it misbehaves on your phone, switch to the backup in Settings ▸ Background ▸ Advanced ▸ Web.
- **A simpler Settings and a Models page.** The chip at the top of the chat names the model that is answering; tap it to open Models. Models shows the model in use first. Filter by who made a model, see its details, or add a model file from your phone. Cloud services are listed there too. A download keeps showing its progress when you leave the page and come back.
- **Thinking levels: Off, Light, Medium, High.** "Low" is now called "Light", and High is back on phones with enough memory. The level is set on the Models page.
- **Ten accent colours.** Six new ones (Rose, Coral, Cobalt, Sage, Indigo, Graphite) in a grid, in Settings and in the menu.
- **Matches your phone's theme.** New installs follow the phone's light or dark mode. The status bar, the navigation bar and the launch screen follow the theme too. Code blocks are easier to read in light mode.
- **Weather.** Ask about the weather and the on-device model can look it up itself, from MET Norway, with the US National Weather Service as backup. It is on by default and works without web search.
- **Your city.** The model can ask the phone for your rough location, city level only, when a question needs it. Android asks your permission first. If no location is available, Valence asks you for the city.
- **See the thinking as it happens.** While the model thinks, one line under the Thought row shows its latest sentence. Tap the row to read all of it.
- **Better answers about a particular day.** When you ask about tomorrow or a named day, the search text the model reads is taken from around that day, and the model is told tomorrow's date. In our blind-graded test (10 questions, one place, one date) it named the weekday correctly 10 times out of 10, up from 7. It still often missed tomorrow's actual forecast.
- **Kids mode.** The safety rules now reach the on-device model as proper instructions rather than as part of the chat text, and Kids replies now use the intended sampling settings.

## Fixes

- Cancelling a model download in the app now reads as a cancel, not an error, and no longer opens the file picker. Cancelling from Android's download notification still shows as a failure.
- A model or service picked in Settings is still selected after you restart the app.
- Sometimes the model kept thinking after its thinking time ran out, and that text, with a stray tag, ended up in the reply. It now goes into a "Kept thinking" row above the answer. Older chats display clean too.
- Android now only accepts a license key made for Android or for all platforms. A saved key made for another platform is removed, with a one-time notice.

## Known issues

- **Adding a model file on a fresh install:** the first chat fails and asks for a device scan. Open Models ▸ Advanced ▸ Rescan phone once, and chat works.
- **After Skip on the welcome screen**, if taps don't respond, close and reopen Valence once.
- **A brief dark corner** can flash when you turn some phones sideways.
- **Scrolling** can be a little less smooth than it should be while the background is showing.

## Download

**[Valence-1.5.19-alpha-arm64.apk](https://helixailabs.com/valence/Valence-1.5.19-alpha-arm64.apk)** · 64-bit Android 7.0+ · 34 MB

SHA-256: `2F43539E26BE7173AC8B033EC14E83B0E5718068FBDCE12AF9A2BE84AF6E0EFF`

Installs straight over 1.5.14 or later and keeps your chats and your downloaded model.

Found something broken? Write to help@helixailabs.com.
