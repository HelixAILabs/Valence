---
layout: post
title: "Next: a memory redesign - recall that earns its place"
category: news
date: 2026-08-13
---

<style>
.mem-lead{font-family:'Geist',sans-serif;font-size:1.24rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.4rem}
.mem-lead b{color:var(--ink);font-weight:600}
.mem-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.9rem 0}
.mem-pillars div{background:var(--card);padding:1.25rem 1.3rem;margin:0}
.mem-pillars .t{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
.mem-pillars .h{font-family:'Instrument Serif',Georgia,serif;font-size:1.4rem;color:var(--ink);margin:.3rem 0 .25rem;line-height:1.1}
.mem-pillars .s{font-size:.92rem;color:var(--mute);line-height:1.45}
.mem-note{border-left:2px solid var(--coral);padding:.1rem 0 .1rem 1.1rem;margin:1.15rem 0;color:var(--ink-soft)}
.mem-note b{color:var(--ink)}
@media (max-width:640px){.mem-pillars{grid-template-columns:1fr}}
</style>

<p class="mem-lead">Valence remembers things so your AI can pick up where you left off. That part works. What we want to work <b>better</b> is the judgment around it: what deserves to be remembered in the first place, and what deserves to be brought back into the conversation right now. So the next thing we are building is a redesign of the memory architecture - aimed at recall that is <b>more accurate, more reliable, and far more respectful of your conversation's space</b>.</p>

Here is the honest version of the problem. Today, when memory looks for something relevant, it is too generous. It can pull in fragments that only loosely match what you asked, and every fragment it injects takes up room in the context window - the working space your AI uses to follow the conversation itself. Memory that over-shares crowds out the very conversation it is trying to help. And some of what gets saved should never have been a memory at all: a quick hello, a half-formed scrap, a mislabeled snippet.

<div class="mem-pillars">
  <div>
    <span class="t">Save</span>
    <div class="h">Worth keeping</div>
    <p class="s">A quality gate at save time. Real conversations with substance become well-formed memories; throwaway small talk and fragments do not get written down at all.</p>
  </div>
  <div>
    <span class="t">Recall</span>
    <div class="h">Right, not just there</div>
    <p class="s">Retrieval only speaks up when the moment actually calls for it, and brings back fewer, better matches - the memory you meant, not everything in the neighborhood.</p>
  </div>
  <div>
    <span class="t">Space</span>
    <div class="h">Your window, protected</div>
    <p class="s">Less of the context window spent on memory means more room for the conversation you are actually having - longer threads before anything gets compressed.</p>
  </div>
</div>

<p class="mem-note"><b>Existing memories come along.</b> The redesign includes a cleanup pass for what is already saved, so long-time users get the benefit without starting over. Everything stays where it has always been: on your machine.</p>

What you should notice when it lands: ask "what did we decide about the garden project?" and get the decision - not a recitation of loosely related history. Watch your AI stay on topic without old memories steering it sideways. And keep long conversations flowing further before anything has to be trimmed.

No date promise yet - it ships when it passes our tests, and we will write up the details here when it does. Release notes, as always, live on [Updates]({{ '/updates/' | relative_url }}).
