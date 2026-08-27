---
layout: post
title: "Valence for macOS — first alpha (0.0.1)"
date: 2026-08-27
---

Valence comes to the Mac. This is an **early alpha** for Apple Silicon — the native macOS rebuild of Valence, running local models in-process with Apple's MLX. Alpha means exactly that: the core works and we use it daily, the edges are rough, and some Windows features aren't here yet. Here's the honest map.

## What should work

- **Chat with local models** — Qwen and Gemma via MLX, streaming, fully on-device. Cloud providers (OpenAI, Anthropic, Google) if you bring keys.
- **Your conversations** — sidebar, tabs, pinning, search, export to Markdown/PDF/snapshot, ChatGPT import.
- **Local memory** — auto-saved memories, recall in context, a memory browser. Everything stays on your machine.
- **X-Ray** — see exactly what was sent to the model and why, per message.
- **Abilities** — calculator, time, remember/forget, web search; MCP tool support.
- **The Mac basics** — global hotkey companion panel, dictation, read-aloud, screenshot attach, themes.
- **In-app updates** — install once; new alpha builds arrive automatically.

## Not here yet

- **Kids Mode.** It's built — and deliberately switched off. Our rule: Kids Mode ships only after a 1,000-turn adversarial safety battery passes against the real gates on the Mac. It's close, but a child-safety feature doesn't ship on "close."
- **Windows data import.** The Mac alpha is a fresh start; migration comes later.
- **Notarization.** First launch needs System Settings → Privacy &amp; Security → **Open Anyway** — once. In-app updates never repeat it.

## Download

[Valence-0.0.1.dmg](https://github.com/HelixAILabs/Valence/releases/download/macos-v0.0.1/Valence-0.0.1.dmg) &middot; Apple Silicon &middot; macOS 14+

SHA-256: `A50255B74FC74B968009831D8A9FE72A98051522916AB1E7F9351A6A074B39CB`

Found something broken or missing that matters to you? That's the point of an alpha — help@helixailabs.com.