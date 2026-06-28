# Valence

**A private, controlled, curated AI space** — every AI model you use, local or cloud, on your terms.

[Website](https://helixailabs.com) · [Updates](https://helixailabs.github.io/Valence/updates/) · [All releases](https://github.com/HelixAILabs/Valence/releases) · help@helixailabs.com

---

## ⬇ Download

**[Download Valence 1.0.5 (.msi)](https://github.com/HelixAILabs/Valence/releases/download/v1.0.5/Valence-1.0.5.msi)**

Windows 10/11 (64-bit) · 829 MB · 7-day free trial, then **$59.95 once** · works fully offline · no subscription

> **SHA-256:** `C58BCFCE31C74BD76DC8CC7DD8F73587460C385C4A9DBC2A18BC94779BCC0B4D`
> The installer is unsigned, so Windows SmartScreen may warn you — click **More info → Run anyway**. Existing installs upgrade in place.

### Why is the download ~829 MB?

Valence ships **complete, offline GPU acceleration in the box** - no separate CUDA toolkit, no multi-gigabyte driver detour, no account. Most of the size is NVIDIA's GPU math libraries:

| Piece | Approx. size | What it does |
|-------|--------------|--------------|
| NVIDIA CUDA libraries (cuBLAS / ggml-cuda) | ~640 MB | Fast local AI on NVIDIA GPUs |
| Valence app + bundled .NET runtime | ~190 MB | The app itself, self-contained (no .NET install needed) |
| Vulkan backend | ~54 MB | Local AI on AMD & Intel GPUs |
| Embedding model + bundled tools | ~45 MB | On-device memory, knowledge, and web search |

Everything - your conversations, models, and memory - runs on your machine. The size is the cost of an AI that works fully offline and never phones home.

> **Getting lighter soon.** Valence already detects your hardware and uses the right acceleration (NVIDIA CUDA, AMD/Intel Vulkan, or CPU). A coming update will download only the pack your machine needs during setup, bringing the base install down to around 190 MB.

---

## What is Valence?

A private, controlled, curated space for working with AI — local or cloud, all under your control.

- **Curated, cross-model** — OpenAI, Anthropic, Google, Azure, xAI, OpenRouter, Ollama, and on-device local models, all from one interface.
- **Private by design** — conversations, memory, and documents stay on your computer. No account required.
- **Fully local option** — download a model (Gemma, Qwen, …) and chat with nothing leaving your PC.
- **You're in control** — local memory you own, per-profile knowledge from your own documents, model compare, and X-Ray ("why did it answer that?").
- **Kids Mode** — a locked-down chat for children with a parent dashboard, on-device safety, and daily time limits.

---

## Releases

| Version | Date | Summary |
|---------|------|---------|
| **[1.0.5](https://helixailabs.github.io/Valence/2026/06/27/valence-1-0-5.html)** &nbsp;_(latest)_ | Jun 27, 2026 | Smoother updates: the startup update prompt now appears, a robot animation shows the download, and old installers are cleaned up automatically. |
| **[1.0.4](https://helixailabs.github.io/Valence/2026/06/27/valence-1-0-4.html)** | Jun 27, 2026 | Lens and X-Ray reimagined as clean anchored windows over the canvas, plus a custom-lens authoring fix. |
| **[1.0.3](https://helixailabs.github.io/Valence/2026/06/26/valence-1-0-3.html)** | Jun 26, 2026 | Local AI on AMD & Intel GPUs (Vulkan) with CPU fallback, one-click in-app purchase, smarter defaults, and an in-app update fix. |
| **[1.0.2](https://helixailabs.github.io/Valence/2026/06/26/valence-1-0-2.html)** | Jun 26, 2026 | Interface polish, friendlier first-run, Ollama installed-model listing, manual Check for Updates, NVIDIA driver guidance. |
| **[1.0.1](https://helixailabs.github.io/Valence/2026/06/23/valence-1-0-1.html)** | Jun 23, 2026 | Installer packaging fix — bundles the complete app asset set. |
| **[1.0.0](https://helixailabs.github.io/Valence/2026/06/22/valence-1-0-0.html)** | Jun 22, 2026 | First public release. |

Full notes for every version live on **[Updates](https://helixailabs.github.io/Valence/updates/)**.

---

<sub>© 2026 Helix AI Labs · <a href="https://helixailabs.com">helixailabs.com</a> · help@helixailabs.com</sub>
