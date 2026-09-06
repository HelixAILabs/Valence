---
layout: post
title: "Coming in 1.6: the pause is gone, and memory finally answers the question"
category: news
date: 2026-08-24
---

<style>
.v16-lead{font-family:'Geist',sans-serif;font-size:1.24rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.4rem}
.v16-lead b{color:var(--ink);font-weight:600}
.v16-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.9rem 0}
.v16-pillars div{background:var(--card);padding:1.25rem 1.3rem;margin:0}
.v16-pillars .t{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
.v16-pillars .h{font-family:'Instrument Serif',Georgia,serif;font-size:1.4rem;color:var(--ink);margin:.3rem 0 .25rem;line-height:1.1}
.v16-pillars .s{font-size:.92rem;color:var(--mute);line-height:1.45}
.v16-note{border-left:2px solid var(--coral);padding:.1rem 0 .1rem 1.1rem;margin:1.15rem 0;color:var(--ink-soft)}
.v16-note b{color:var(--ink)}
.v16-before{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.6rem 0}
.v16-before div{background:var(--card);padding:1.1rem 1.25rem;margin:0}
.v16-before .lbl{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);display:block;margin-bottom:.45rem}
.v16-before .was .lbl{color:var(--mute)}
.v16-before .now .lbl{color:var(--coral)}
.v16-before p{margin:0;font-size:.95rem;line-height:1.5;color:var(--ink-soft)}
@media (max-width:640px){.v16-pillars,.v16-before{grid-template-columns:1fr}}
</style>

<p class="v16-lead">Most of 1.6 went into one stubborn question: <b>why does an answer sometimes crawl, stall halfway, or stop mid-sentence?</b> Chasing it down took us through the streaming path, the way we talk to the AI engine, and how memory decides what to say. The short version - answers now arrive smoothly, they finish, and when you ask your AI what it remembers, it actually tells you.</p>

Here is the honest version. A few separate faults were stacked on top of each other, and each one hid the next. Together they made a fast machine feel slow.

<div class="v16-pillars">
  <div>
    <span class="t">Arrive</span>
    <div class="h">No more stalling</div>
    <p class="s">Text now streams steadily from the first word to the last, instead of freezing partway and dumping the rest in a lump.</p>
  </div>
  <div>
    <span class="t">Finish</span>
    <div class="h">Answers that end</div>
    <p class="s">Long replies run to a real ending. When a limit genuinely is reached, Valence says so plainly instead of stopping mid-sentence.</p>
  </div>
  <div>
    <span class="t">Recall</span>
    <div class="h">Ask and receive</div>
    <p class="s">"Did we talk about that?" now brings back what you discussed - rather than a confident claim that nothing was ever said.</p>
  </div>
</div>

## The pause is gone

The worst offender was the strangest. Valence holds back the last few characters of a reply while it checks whether the AI is starting one of its built-in actions - a calculation, a memory lookup. That check could get stuck in the "waiting" position and never come out, and once stuck it held the **entire rest of the answer** hostage until the very end. A hex colour code in a block of CSS was enough to trigger it. Ask for a stylesheet, watch your answer disappear.

That is fixed, along with several things underneath it: the stream no longer waits on writing to disk, no longer re-measures the whole window sixty times a second, and no longer gets slower the longer the answer gets. We also found the AI engine was being told to put every model fully on the graphics card whether it fit or not - which, when it did not fit, cost several times the speed it was meant to buy.

<div class="v16-before">
  <div class="was"><span class="lbl">Before</span><p>Type a question, watch a few words appear, then wait. And wait. The rest lands all at once, or not at all.</p></div>
  <div class="now"><span class="lbl">In 1.6</span><p>Words arrive at a steady pace from start to finish, and keep that pace on long answers.</p></div>
</div>

## Answers stop getting cut off

Every AI reply has a budget. Ours was set from a fixed number that had nothing to do with the model you actually picked - so on a machine with plenty of room, replies stopped early for no reason, silently, mid-sentence. In 1.6 the budget is worked out from your model's real capacity: the same conversation that used to stop dead at a fixed 2,000-token ceiling now runs to about double that, and more on a roomier model.

And when a limit genuinely is reached, Valence now tells you, instead of just trailing off. That sounds obvious; it was not true before. The engine reports why it stopped after every single reply, and we had been reading the wrong field for it - so a cut-off answer and a finished one looked identical to the entire app, including to the panel whose job is explaining the turn. Reading the right field is what makes saying "this was cut off" possible at all.

Two related fixes ride along: the reasoning step can no longer eat the entire budget and leave nothing for the answer, and the context meter now agrees with the number shown next to your model - it used to disagree by a factor of five.

## Memory that answers the question

The memory redesign we [wrote about earlier]({{ '/2026/08/13/memory-architecture-preview.html' | relative_url }}) landed, and then we kept going, because the first version had a gap you could feel: your AI would be holding the memory and still tell you it had never heard of the topic.

- **"Did we talk about X?" now looks.** That phrasing never used to trigger a memory search at all, so the honest-sounding "no, we did not discuss that" was simply wrong.
- **Delivered memories get used.** Records could reach the AI and still be ignored in the answer.
- **Fewer, better matches.** Saved scraps and stored search queries used to outrank real content and crowd out the conversation - sometimes sixteen fragments deep.
- **Paraphrases land.** Asking in different words than you originally used now finds the memory anyway.
- **Nothing is stranded.** Older profiles whose memories had become invisible are repaired on the way in.

![Valence answering a question from memory, with the recalled note shown beneath the answer]({{ '/assets/img/memory-recall.png' | relative_url }})

The chip under the answer is the part we care most about: it names exactly which saved note was used, when it was saved, and gives you a way to open or dismiss it. Memory that acts on you invisibly is not something you can trust.

## X-Ray shows the receipts

X-Ray is the panel that explains what your AI just did. In 1.6 it gets a **Performance card**: how long the model spent reading your prompt versus writing the answer, the speed you actually feel, how much was reused from cache, and what the engine itself counted - not our estimate of it.

![The new Performance card in X-Ray, showing read and write time, speed in tokens per second, and cache reuse for a single turn]({{ '/assets/img/xray-performance.png' | relative_url }})

Those are real numbers from a real turn, not a mock-up. The split matters more than the total: a turn that is mostly *reading* means too much context is being attached, and a turn that is mostly *writing* is down to the model and your hardware. Those two point at opposite fixes, and no token count on its own tells them apart.

<p class="v16-note"><b>And it stops guessing.</b> X-Ray's plain-language summary used to assert things it had no way to know, including telling you no memories were recalled on turns where memories plainly were. It now reports only what was actually recorded, and says so when the record is silent. A transparency feature that confabulates is worse than none.</p>

## Kids Mode

Two safety improvements. The crisis check now recognises indirect phrasing - a child saying "nobody would care if I disappeared" is not always going to use the obvious words, and the old check waited for the obvious words. And a model only reaches Kids Mode by passing our own red-team results, rather than by appearing on a list.

We also re-ran our kids-safety measurements against the prompt that actually ships, rather than a stand-in built for testing. That distinction matters more than it sounds: a test that grades a prompt you never shipped can pass while the real thing fails.

<p class="v16-note"><b>Now shipped.</b> This is live in <a href="{{ '/2026/08/24/valence-1-6-0.html' | relative_url }}">Valence 1.6.0</a>, alongside the memory work described in <a href="{{ '/2026/08/13/memory-architecture-preview.html' | relative_url }}">the memory redesign preview</a>.</p>
