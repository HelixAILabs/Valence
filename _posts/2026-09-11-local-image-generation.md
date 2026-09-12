---
layout: post
title: "Next: image generation that never leaves your machine"
category: news
date: 2026-09-11
description: "A feasibility spike on local image generation for Valence - what we measured on one strong graphics card, what surprised us, and what we still do not know."
---

<style>
.lig-lead{font-family:'Geist',sans-serif;font-size:1.24rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.4rem}
.lig-lead b{color:var(--ink);font-weight:600}
.lig-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.9rem 0}
.lig-stats div{background:var(--card);padding:1.25rem 1.3rem;margin:0}
.lig-stats .t{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
.lig-stats .h{font-family:'Instrument Serif',Georgia,serif;font-size:1.9rem;color:var(--ink);margin:.3rem 0 .25rem;line-height:1}
.lig-stats .s{font-size:.92rem;color:var(--mute);line-height:1.45}
.lig-note{border-left:2px solid var(--coral);padding:.1rem 0 .1rem 1.1rem;margin:1.15rem 0;color:var(--ink-soft)}
.lig-note b{color:var(--ink)}
.lig-open{counter-reset:o;margin:1.7rem 0}
.lig-open > div{position:relative;padding:1.1rem 0 1.1rem 3rem;border-top:1px solid var(--rule)}
.lig-open > div:last-child{border-bottom:1px solid var(--rule)}
.lig-open > div::before{counter-increment:o;content:counter(o,decimal-leading-zero);position:absolute;left:0;top:1.15rem;font-family:'Geist Mono',monospace;font-size:.8rem;color:var(--coral)}
.lig-open h4{font-family:'Instrument Serif',Georgia,serif;font-size:1.32rem;color:var(--ink);margin:0 0 .35rem;line-height:1.2}
.lig-open p{font-size:.97rem;color:var(--mute);line-height:1.55;margin:0}
.lig-rules{margin:1.7rem 0;border-left:2px solid var(--rule);padding-left:1.4rem}
.lig-rules > div{position:relative;padding:.75rem 0}
.lig-rules .s-n{font-family:'Geist Mono',monospace;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
.lig-rules .s-b{font-size:.98rem;color:var(--mute);line-height:1.55;margin:.15rem 0 0}
.lig-rules .s-b b{color:var(--ink-soft)}
@media (max-width:640px){.lig-stats{grid-template-columns:1fr}}
</style>

<p class="lig-lead">Valence can already make images, but it does it the way everyone else does: your words go to somebody's server, and an image comes back. We went looking at the other option - <b>image generation that runs on your own graphics card</b>, with no cloud API, no per-image charge, and nothing about the picture or the prompt that describes it ever leaving the machine. This post is what we measured. <b>Nothing is built in Valence yet.</b></p>

What we ran was a feasibility spike, standalone, outside the Valence codebase: `stable-diffusion.cpp` with SDXL base 1.0 weights. That engine is from the same ggml family as the llama.cpp engine Valence already uses for local chat models, which is the main reason it was the first thing we tried - it is the same shape of dependency we already ship and already understand.

## What it did

Every number below is from **one machine: an NVIDIA RTX 4070 SUPER with 12 GB of VRAM.** That is a strong card. Keep it attached to every figure here.

<div class="lig-stats">
  <div>
    <span class="t">First image</span>
    <div class="h">18 sec</div>
    <p class="s">At 1024x1024, including loading the model weights from disk. On an RTX 4070 SUPER, 12 GB.</p>
  </div>
  <div>
    <span class="t">Each one after</span>
    <div class="h">13 sec</div>
    <p class="s">Weights already resident. The load itself accounts for about 5 seconds of the first one.</p>
  </div>
  <div>
    <span class="t">Memory</span>
    <div class="h">6.4 GB</div>
    <p class="s">What the image model occupied on the card while it was loaded.</p>
  </div>
</div>

We generated two images and looked at them: a photorealistic fox in snow, and a blue bicycle against a brick wall. The quality held up. We are not publishing the images here.

## The finding we did not expect

We assumed a local chat model would have to be evicted to make room for an image model, and that generating a picture would therefore mean interrupting whatever conversation was in progress. That is not what happened.

On the same 12 GB card, a local chat model and the image model ran **at the same time, both fully working** - 10.9 GB of 12.2 GB in use. The chat model kept generating at full GPU speed, 162 tokens per second. Image generation slowed from 13 seconds to 17 under the contention. Nothing was unloaded and nothing fell back to the processor.

<p class="lig-note"><b>Why that matters more than the speed numbers.</b> If both fit, asking for an image does not have to tear down your conversation to do it. That changes the design from "stop, swap models, start again" to "this runs beside what you were already doing" - for a small chat model, on a card this size.</p>

## What we do not know yet

<div class="lig-open">
  <div>
    <h4>This is the optimistic case, not the floor</h4>
    <p>Every timing above came off one strong graphics card. We have not measured a modest or low-end machine, and we are not going to promise anyone a number for their hardware until we have. That measurement comes before any claim about speed.</p>
  </div>
  <div>
    <h4>Coexistence held for a small chat model</h4>
    <p>A large chat model and an image model will not both fit in 12 GB. That case needs different handling, and we have not designed it. What we proved is narrower than "these always coexist."</p>
  </div>
  <div>
    <h4>None of this is in the product</h4>
    <p>A spike outside the codebase, plus four filed work items that have not been started. No release contains this. There is no date.</p>
  </div>
</div>

## How we would want it to work

Three things are decided, in the sense that we know what we want. None of them are built.

<div class="lig-rules">
  <div><span class="s-n">Optional</span><p class="s-b"><b>The engine and the weights would be a separate download.</b> Image models are large. Someone who never generates an image should not pay for one in installer size or disk space.</p></div>
  <div><span class="s-n">Explicit</span><p class="s-b"><b>You ask; Valence does not decide.</b> Generation stays user-invoked, the way it is today. No language model gets to conclude that you probably wanted a picture. Valence checks deterministically whether there is room, asks which model to use, and remembers the answer if you want it to.</p></div>
  <div><span class="s-n">Gated</span><p class="s-b"><b>Kids Mode gets none of this until an image model has been verified safe for children</b> - the same bar local chat models already have to clear before a child profile can use them.</p></div>
</div>

The reason this is worth doing is not the cost saving, though there is one. It is that a prompt is a piece of writing about what you want, and an image is a thing you made. Neither of them has any business on somebody else's server just because that is where the graphics card is. If the card is already in your machine, the whole transaction can stay there.

## Where this goes

Image generation is one capability, and it is early. The more useful thing to say is how Valence is built to absorb the next one.

Valence is designed to scale with the hardware it finds and the models that exist, rather than being pinned to either. Both have moved fast and neither has stopped. Local models keep getting smaller and more capable at the same time - what needed a serious machine not long ago runs comfortably on a modest one now. The hardware underneath keeps getting cheaper and keeps shipping with more memory. Those two curves are what make a local-first workspace worth building at all, and they are both still pointing the same direction.

That is the bet. A workspace that runs on your own machine gets better every time the models improve and every time you upgrade - without us rebuilding it around somebody's new service, and without your data moving anywhere for you to benefit. The image generation we measured took 13 seconds on a card that sits under a desk. Not many years ago, that was not a thing a person owned.

So this is a beginning rather than a finish line. Valence gets more capable as the ground underneath it does, and whatever lands next will arrive the way this is arriving - as something your own machine can now do, kept on your own machine.
