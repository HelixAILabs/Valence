---
layout: post
title: "Valence for Android 1.5.18 alpha - Watch it think"
date: 2026-10-04
description: "Valence for Android 1.5.18 alpha: an animated eye while the model thinks, a search icon that shows what happened, a time on every step, a cleaner list of steps and a new app icon."
---

<style>
.m18-shots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:28px 0 8px}
.m18-shots figure{margin:0}
.m18-shots img{display:block;width:100%;height:auto;border:1px solid var(--rule);border-radius:14px}
.m18-shots figcaption,.m18-icon figcaption{margin-top:8px;font-size:.85rem;line-height:1.4;color:var(--mute)}
.m18-icon{display:flex;align-items:center;gap:16px;margin:24px 0}
.m18-icon img{display:block;width:96px;height:96px;border:1px solid var(--rule);border-radius:18px}
.m18-icon figcaption{margin-top:0}
.m18-note{font-size:.85rem;color:var(--mute)}
@media (max-width:720px){.m18-shots{grid-template-columns:minmax(0,1fr);max-width:400px;margin-left:auto;margin-right:auto}}
</style>

This release is about seeing what Valence is doing. While it works on your question, the steps above the answer now move: an eye while the model thinks, a scanning search icon while it looks something up on the web. When it's done, every step tells you how long it took. And Valence has a new icon.

<div class="m18-shots">
  <figure>
    <img src="{{ '/pics/android-1-5-18-thinking-eye.png' | relative_url }}" alt="Dark mode. Under the question &quot;what's the date tomorrow and the weather in Chicago&quot;, a row reads Thinking… next to a round amber eye icon, with the model's thinking streaming in below it: the user is asking for two pieces of information, the date tomorrow and the weather in Chicago." loading="lazy">
    <figcaption>While the model thinks, the Thought row shows an animated eye, and its thinking streams in underneath.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/pics/android-1-5-18-search-loader.png' | relative_url }}" alt="Dark mode, the same question a few seconds later. Finished rows read Thought · 12s, Current date and time with a check mark, and Analyzed the result · 3s. The last row, Search the web, is still running, with its search icon mid-scan and the note Searching Tavily for &quot;weather in Chicago…&quot;." loading="lazy">
    <figcaption>While Valence searches the web, the search icon scans. The steps above it already show how long they took.</figcaption>
  </figure>
</div>

## What's new

- **An eye while it thinks.** While the model is thinking, the Thought row shows an animated eye. Tap the row afterwards to read what it thought, with the thinking level and how long it took.
- **A search icon that shows what happened.** While Valence searches, the icon scans. When the search ends, the icon shows whether it found results, found nothing, or couldn't search, for example when the phone is offline.
- **Every step shows how long it took.** Steps now read "Thought · 12s" or "Search the web ✓ · 3s" instead of character counts. Steps that finish in under a second show no time. Reopen the chat later and the times are still there. Chats saved before this update show no times.
- **A cleaner list of steps.** Only the answer sits in a card. The steps line up in one column above it, and a › on the right marks the steps you can open.
- **A new app icon.** An orange shattered V on black. The same V is now on the Quick Settings tile, in notifications and on the home-screen widget.

<div class="m18-shots">
  <figure>
    <img src="{{ '/pics/android-1-5-18-trail-light.png' | relative_url }}" alt="Light mode. The question &quot;what's the date tomorrow and the weather in Chicago today&quot;, then five step rows in one column: Thought · 9s, Current date and time with a check mark, Analyzed the result · 3s, Search the web with a check mark · 2s for &quot;weather in Chicago today&quot;, and Analyzed the search results · 6s. Below them, the answer card: tomorrow's date will be Monday, October 5, 2026, and Chicago shows 64°F and Fair, citing source 3, with Sources (3)." loading="lazy">
    <figcaption>A finished answer in light mode: every step with its time, and only the answer in a card.</figcaption>
  </figure>
  <figure>
    <img src="{{ '/pics/android-1-5-18-thought-expanded.png' | relative_url }}" alt="Dark mode. The Thought · 12s row is open. Its first line reads Thinking: Low · 12s, followed by the model's plan: call the time tool to get the current date, then call the search tool to find the weather in Chicago. The other steps follow underneath, each with its time." loading="lazy">
    <figcaption>Tap Thought to read the model's plan, with the thinking level and how long it took.</figcaption>
  </figure>
</div>

<figure class="m18-icon">
  <img src="{{ '/pics/android-1-5-18-app-icon.png' | relative_url }}" alt="The new Valence app icon in the phone's app drawer: an orange shattered V on a black background, labelled Valence." loading="lazy">
  <figcaption>The new icon, in the app drawer.</figcaption>
</figure>

<p class="m18-note">Every screenshot here is from this release, running on a motorola razr plus 2023 and captured from the phone's own screen.</p>

## Good to know

The on-device model can still use a web result for the wrong day. In one of our test runs it answered "the weather in Chicago" with a forecast for a different date, though it did say the date didn't match. Check the Sources under the answer.

## Download

**[Valence-1.5.18-alpha-arm64.apk](https://helixailabs.com/valence/Valence-1.5.18-alpha-arm64.apk)** · 64-bit Android 7.0+ · 33 MB

SHA-256: `6A100AE033BB4550941D5C3860D58496220EEB59F6F06401DD481783AEDDBA9C`

Installs straight over 1.5.14 or later and keeps your chats and your downloaded model.

Found something broken? Write to help@helixailabs.com.
