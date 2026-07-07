---
layout: post
title: "A lighter way in &mdash; the slim installer arrives"
category: news
date: 2026-07-06
---

<style>
.v13-lead{font-family:'Geist',sans-serif;font-size:1.24rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.4rem}
.v13-lead b{color:var(--ink);font-weight:600}
.v13-weight{display:flex;align-items:center;gap:1.6rem;flex-wrap:wrap;border:1px solid var(--rule);border-radius:12px;background:var(--card);padding:1.7rem 1.6rem;margin:2rem 0}
.v13-weight .num{font-family:'Geist Mono',monospace;font-variant-numeric:tabular-nums;line-height:1;display:flex;align-items:baseline;gap:.55rem;white-space:nowrap}
.v13-weight .old{font-size:1.7rem;color:var(--mute);text-decoration:line-through;text-decoration-color:var(--coral);text-decoration-thickness:2px}
.v13-weight .arr{color:var(--mute-2)}
.v13-weight .new{font-size:3.6rem;color:var(--coral);letter-spacing:-.02em}
.v13-weight .u{font-size:.38em;color:var(--mute);letter-spacing:.03em}
.v13-weight .cap{flex:1;min-width:210px}
.v13-weight .cap strong{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:1.6rem;color:var(--ink);display:block;line-height:1.1}
.v13-weight .cap span{color:var(--mute);font-size:.96rem;display:block;margin-top:.3rem}
.v13-hw{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.6rem 0}
.v13-hw div{background:var(--card);padding:1.15rem 1.2rem;margin:0}
.v13-hw .t{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.v13-hw .v{font-weight:650;margin-top:.4rem;color:var(--ink)}
.v13-hw .s{font-size:.85rem;color:var(--mute);margin-top:.15rem}
.v13-ways{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;margin:1.7rem 0}
.v13-ways .w{border:1px solid var(--rule);border-radius:12px;background:var(--card);padding:1.4rem 1.4rem}
.v13-ways .w.lead{border-color:var(--coral);box-shadow:0 0 0 1px var(--coral)}
.v13-ways .tag{font-family:'Geist Mono',monospace;font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:var(--coral)}
.v13-ways .tag.m{color:var(--mute)}
.v13-ways .nm{font-family:'Instrument Serif',Georgia,serif;font-size:1.6rem;color:var(--ink);margin:.15rem 0 .1rem}
.v13-ways .sz{font-family:'Geist Mono',monospace;font-size:.78rem;color:var(--mute);font-variant-numeric:tabular-nums}
.v13-ways .ds{font-size:.95rem;color:var(--ink-soft);margin:.55rem 0 0}
.v13-cta{text-align:center;margin:2.2rem 0 .5rem}
.v13-cta a{display:inline-flex;align-items:center;gap:.5rem;background:var(--coral);color:#fff;font-family:'Geist',sans-serif;font-weight:600;font-size:1.02rem;border-radius:3px;padding:.85rem 1.7rem}
.v13-cta a:hover{text-decoration:none;filter:brightness(1.06)}
.v13-cta .fine{font-family:'Geist Mono',monospace;font-size:.72rem;letter-spacing:.05em;color:var(--mute);margin-top:.9rem}
@media(max-width:560px){.v13-hw,.v13-ways{grid-template-columns:1fr}.v13-weight .new{font-size:2.7rem}}
</style>

<p class="v13-lead">For most of Valence's life, everyone downloaded the same 810&nbsp;megabytes &mdash; whether their computer had an NVIDIA card, an AMD card, or no dedicated graphics at all. It worked. But it was <b>heavy</b>, and most of that weight was GPU code your particular machine would never run.</p>

Valence 1.3 changes how it arrives. The new **slim installer** takes one quick look at your hardware during setup and brings down only the acceleration your card actually uses. Same private workspace, in less than a third of the download.

![Valence 1.3's reimagined first run: a dark, cinematic welcome reading "Private AI that lives on your computer."]({{ '/assets/img/firstrun-1-3.png' | relative_url }})

<div class="v13-weight">
  <div class="num"><span class="old">810<span class="u">MB</span></span><span class="arr">&rarr;</span><span class="new">300<span class="u">MB</span></span></div>
  <div class="cap"><strong>2.5&times; lighter.</strong><span>Because Valence stopped shipping every graphics backend to every machine &mdash; and started fetching just the one yours needs.</span></div>
</div>

## One quick look at your machine

The idea is almost boring in its simplicity. Instead of packing every possible graphics backend into one enormous file, the slim installer checks what's in your computer &mdash; right there on your machine, with nothing about your hardware sent anywhere &mdash; and downloads only what fits.

<div class="v13-hw">
  <div><div class="t">NVIDIA</div><div class="v">CUDA pack</div><div class="s">Fetched on first run</div></div>
  <div><div class="t">AMD &amp; Intel</div><div class="v">Vulkan pack</div><div class="s">Fetched on first run</div></div>
  <div><div class="t">CPU only</div><div class="v">Nothing extra</div><div class="s">Runs out of the box</div></div>
</div>

There's no "NVIDIA edition" to pick from a list. It's one download that quietly becomes the right build for the machine it lands on. On a laptop with no dedicated graphics, it stays lean and never pulls a pack at all.

## A calmer first run

The install got lighter; so did the first five minutes. Setup is now a guided, unhurried sequence: Valence takes that one look at your hardware, shows you exactly what it found, fetches anything missing with honest per-item progress, and hands you a workspace that's *already* using your graphics card. No wall of options, no guesswork &mdash; a clear path from download to your first conversation.

And once you're in, a small badge beside the wordmark keeps you oriented: which AI you're talking to, and where it runs. One click for the full picture &mdash; including how to switch.

## Two ways in

Slim is the right choice for almost everyone. It does need the internet once, during setup &mdash; so if you're installing on an offline or locked-down machine, the original **all-in-one** installer is still here, with every backend bundled and nothing to fetch afterward.

<div class="v13-ways">
  <div class="w lead">
    <div class="tag">Recommended</div>
    <div class="nm">Slim</div>
    <div class="sz">~300 MB &middot; needs internet once</div>
    <div class="ds">Downloads only the acceleration your card uses. Right for most people.</div>
  </div>
  <div class="w">
    <div class="tag m">Offline / air-gapped</div>
    <div class="nm">All-in-one</div>
    <div class="sz">~810 MB &middot; fully offline</div>
    <div class="ds">Every graphics backend bundled. Nothing to download after setup.</div>
  </div>
</div>

Both are the same application, with the same privacy: your conversations, models, and memory stay on your computer, and no account is required. The slim installer's single trip to the network is to bring down your graphics pack &mdash; and only that.

<div class="v13-cta">
  <a href="https://helixailabs.com/Valence.html#get">Get Valence 1.3 &rarr;</a>
  <div class="fine">Windows 10/11 (64-bit) &middot; 7-day free trial, then $59.95 once</div>
</div>
