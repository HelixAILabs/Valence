---
layout: post
title: "Coming in 1.4: privacy you can see, safety you can prove — and a workspace that fits you"
category: news
date: 2026-07-10
---

<style>
.v14-lead{font-family:'Geist',sans-serif;font-size:1.24rem;line-height:1.55;color:var(--ink-soft);margin:0 0 1.4rem}
.v14-lead b{color:var(--ink);font-weight:600}
.v14-pillars{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:12px;overflow:hidden;margin:1.9rem 0}
.v14-pillars div{background:var(--card);padding:1.25rem 1.3rem;margin:0}
.v14-pillars .t{font-family:'Geist Mono',monospace;font-size:.66rem;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
.v14-pillars .h{font-family:'Instrument Serif',Georgia,serif;font-size:1.5rem;color:var(--ink);margin:.3rem 0 .25rem;line-height:1.05}
.v14-pillars .s{font-size:.94rem;color:var(--mute);line-height:1.45}
.v14-feat{border-left:2px solid var(--coral);padding:.1rem 0 .1rem 1.1rem;margin:1.15rem 0;color:var(--ink-soft)}
.v14-feat b{color:var(--ink)}
.v14-proof{display:flex;align-items:baseline;gap:1rem;flex-wrap:wrap;border:1px solid var(--rule);border-radius:12px;background:var(--card);padding:1.5rem 1.6rem;margin:1.6rem 0}
.v14-proof .n{font-family:'Geist Mono',monospace;font-size:2.7rem;color:var(--coral);letter-spacing:-.02em;line-height:1;font-variant-numeric:tabular-nums}
.v14-proof .c{flex:1;min-width:210px;color:var(--ink-soft);font-size:1rem;line-height:1.5}
.v14-proof .c b{color:var(--ink)}
.v14-fixes{list-style:none;padding:0;margin:1.2rem 0}
.v14-fixes li{position:relative;padding:.45rem 0 .45rem 1.7rem;color:var(--ink-soft);border-bottom:1px solid var(--rule-soft)}
.v14-fixes li:last-child{border-bottom:0}
.v14-fixes li:before{content:"\2713";position:absolute;left:0;color:var(--coral);font-weight:700}
.v14-fixes li b{color:var(--ink)}
.v14-cta{text-align:center;margin:2.3rem 0 .5rem}
.v14-cta a{display:inline-flex;align-items:center;gap:.5rem;background:var(--coral);color:#fff;font-family:'Geist',sans-serif;font-weight:600;font-size:1.02rem;border-radius:3px;padding:.85rem 1.7rem}
.v14-cta a:hover{text-decoration:none;filter:brightness(1.06)}
.v14-cta .fine{font-family:'Geist Mono',monospace;font-size:.72rem;letter-spacing:.05em;color:var(--mute);margin-top:.9rem}

/* interface-scale demo */
.v14-scale{border:1px solid var(--rule);border-radius:12px;background:var(--card);overflow:hidden;margin:1.7rem 0}
.v14-stage{min-height:230px;padding:1.4rem;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(180deg,var(--rule-soft),transparent)}
.v14-mock{--s:1;width:240px;transform:scale(var(--s));transform-origin:center center;transition:transform .32s cubic-bezier(.2,.8,.2,1);border:1px solid var(--rule);border-radius:10px;background:var(--card);box-shadow:0 8px 30px rgba(0,0,0,.18);overflow:hidden}
.v14-mockbar{display:flex;align-items:center;gap:.4rem;padding:.5rem .7rem;border-bottom:1px solid var(--rule-soft);font-family:'Geist Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.v14-dot{width:7px;height:7px;border-radius:50%;background:var(--coral)}
.v14-mockbody{padding:.7rem}
.v14-bubble{font-family:'Geist',sans-serif;font-size:.72rem;line-height:1.45;padding:.45rem .6rem;border-radius:8px;margin:.35rem 0}
.v14-you{background:var(--coral-soft);color:var(--ink);margin-left:1.4rem}
.v14-ai{background:var(--rule-soft);color:var(--ink-soft)}
.v14-mockinput{margin:.55rem 0 .1rem;padding:.4rem .6rem;border:1px solid var(--rule);border-radius:7px;font-family:'Geist',sans-serif;font-size:.68rem;color:var(--mute)}
.v14-controls{display:flex;gap:.4rem;padding:.75rem .85rem;border-top:1px solid var(--rule-soft);justify-content:center;flex-wrap:wrap}
.v14-controls button{font-family:'Geist Mono',monospace;font-size:.7rem;letter-spacing:.06em;color:var(--mute);background:transparent;border:1px solid var(--rule);padding:.4rem .7rem;border-radius:4px;cursor:pointer;transition:all .16s}
.v14-controls button:hover{color:var(--ink);border-color:var(--mute-2)}
.v14-controls button.on{color:var(--coral);border-color:var(--coral);background:var(--coral-soft)}
.v14-note{font-family:'Geist Mono',monospace;font-size:.72rem;letter-spacing:.04em;color:var(--mute);text-transform:uppercase;margin:.2rem 0 1rem}
@media (prefers-reduced-motion: reduce){.v14-mock{transition:none}}
@media(max-width:560px){.v14-pillars{grid-template-columns:1fr}.v14-proof .n{font-size:2.2rem}.v14-mock{width:210px}}
</style>

<p class="v14-lead">Valence has always made two quiet promises: your AI lives on <b>your</b> computer, and it's a space you can hand to the people you love. Version 1.4 &mdash; in final testing as we write this &mdash; is the release where those promises stop being something you take on faith. <b>Privacy you can see. Safety we can prove.</b> A memory that listens, every model you bring working the way it should, and a workspace you can size to your own eyes. It's the steadiest &mdash; and most personal &mdash; Valence yet.</p>

<div class="v14-pillars">
  <div><div class="t">Private</div><div class="h">Locked down</div><div class="s">Encrypted on disk, with one switch that keeps everything on your machine.</div></div>
  <div><div class="t">Safe</div><div class="h">Built for kids</div><div class="s">Deny-by-default, real crisis support, and a red-team to back it up.</div></div>
  <div><div class="t">Smart</div><div class="h">Memory that listens</div><div class="s">Surfaces what's relevant &mdash; and your thumbs up and down actually count.</div></div>
  <div><div class="t">Flexible</div><div class="h">Every model works</div><div class="s">Web search, tools and reasoning behave the same, whoever you bring.</div></div>
  <div><div class="t">Yours</div><div class="h">Sized to you</div><div class="s">Scale the whole interface &mdash; chat, menus, all of it &mdash; to your screen.</div></div>
  <div><div class="t">Steady</div><div class="h">Fewer rough edges</div><div class="s">Crash fixes, no stray processes, calmer local answers.</div></div>
</div>

## Privacy you can see

Valence never needed an account and never sent your conversations anywhere. 1.4 makes that concrete:

<div class="v14-feat"><b>Everything's encrypted on disk.</b> Your conversations, your memory, and your profiles are now encrypted at rest &mdash; so even the files sitting on your own drive don't give up what you talked about.</div>

<div class="v14-feat"><b>One switch for "stays on this machine."</b> A single local-only master toggle guarantees nothing leaves your computer, with plain-spoken labels beside every provider so you always know what would &mdash; and wouldn't &mdash; reach the internet.</div>

<div class="v14-feat"><b>Take it or erase it.</b> Export everything you've saved in one step, or wipe it all just as easily. It's yours; you decide.</div>

## A space built for kids

Kids Mode grew up. In 1.4 it doesn't just filter &mdash; it starts from *no* and opens only what's been checked:

<div class="v14-feat"><b>Deny-by-default.</b> Every sensitive action is blocked first and allowed only when it's explicitly vetted &mdash; the safe direction to fail.</div>

<div class="v14-feat"><b>Help when it matters.</b> If a child ever signals real distress, Valence surfaces age-appropriate crisis support instead of looking away &mdash; and quietly gives a parent a heads-up.</div>

<div class="v14-proof">
  <div class="n">0</div>
  <div class="c">harmful outputs across <b>1,000 adversarial conversations</b> in our own red-team. Not a promise &mdash; a result you can read for yourself.</div>
</div>

<p><a href="https://helixailabs.com/Valence%20-%20Kids%20Safety%20Proof.html">See the Kids Safety Proof &rarr;</a></p>

## Memory that actually listens

Valence's on-device memory got noticeably sharper in 1.4 &mdash; and it takes your feedback to heart:

<div class="v14-feat"><b>Only what's relevant.</b> Instead of pushing every saved note into every answer, Valence now weighs what you're actually asking and brings up only what fits &mdash; and stays quiet when nothing does. Cleaner answers, less clutter.</div>

<div class="v14-feat"><b>Your thumbs count.</b> Thumbs-down a memory and it stops resurfacing; thumbs-up and it's favored next time. You're never stuck with what it guessed &mdash; you shape what it keeps in mind.</div>

## Works with every model

Valence has always let you bring your own AI &mdash; OpenAI, Claude, Gemini, xAI, OpenRouter, or a model running entirely on your machine. In 1.4 we went provider by provider and fixed the quiet places where the *advanced* features used to break, so switching models never costs you the good stuff:

<div class="v14-feat"><b>Web search that actually searches.</b> Ask Gemini something that needs the live web &mdash; <i>"when does the Slate Truck come out?"</i> &mdash; and it searches, then answers. No error, no query that vanishes into an empty reply.</div>

<div class="v14-feat"><b>Deep thinking and tools, together.</b> Claude's extended reasoning now rides alongside tool use the way it's meant to &mdash; the model can think hard <i>and</i> take action in a single turn.</div>

<div class="v14-feat"><b>Reasoning models, handled right.</b> Point Valence at a step-by-step reasoning model and it speaks that model's dialect correctly, instead of stumbling on the way it likes to answer.</div>

<p>You're never locked into one provider to get web search, tools, or careful reasoning. Switch freely &mdash; the powerful parts behave the same no matter who's behind the curtain.</p>

## Size the whole thing to you

For a while, one setting changed your chat text and nothing else &mdash; so it never quite felt like it did anything. In 1.4 it became a real <b>Interface Scale</b>: it grows or shrinks the <i>entire</i> workspace, in five steps from Extra Small to Extra Large. Try it &mdash; tap through the sizes:

<div class="v14-scale" id="v14-scale">
  <div class="v14-stage">
    <div class="v14-mock">
      <div class="v14-mockbar"><span class="v14-dot"></span> Valence</div>
      <div class="v14-mockbody">
        <div class="v14-bubble v14-you">How should I plan a two-week trip?</div>
        <div class="v14-bubble v14-ai">Start with the anchors &mdash; the two or three places you can't miss &mdash; and let the days between them stay loose.</div>
        <div class="v14-mockinput">Ask anything&hellip;</div>
      </div>
    </div>
  </div>
  <div class="v14-controls" role="group" aria-label="Interface scale preview">
    <button type="button" data-s="0.8">XS</button>
    <button type="button" data-s="0.9">S</button>
    <button type="button" data-s="1" class="on">M</button>
    <button type="button" data-s="1.15">L</button>
    <button type="button" data-s="1.3">XL</button>
  </div>
</div>
<p class="v14-note">Preview &middot; the real thing scales the entire app, live</p>

<div class="v14-feat"><b>For every screen and every pair of eyes.</b> Big, sharp monitor that makes everything feel tiny? Scale up. Want more on screen at once? Scale down. Whatever you choose, it's there again next time you open Valence.</div>

<div class="v14-feat"><b>Nothing gets left behind.</b> Menus, dialogs, buttons and chat all grow together and stay where they belong &mdash; the whole interface reflows, so nothing clips off the edge or drifts out of reach.</div>

<script>
(function(){
  var root=document.getElementById('v14-scale'); if(!root) return;
  var mock=root.querySelector('.v14-mock');
  var btns=root.querySelectorAll('.v14-controls button');
  if(!mock||!btns.length) return;
  function set(btn){
    var s=parseFloat(btn.getAttribute('data-s'))||1;
    mock.style.setProperty('--s', s);
    btns.forEach(function(b){ b.classList.toggle('on', b===btn); });
  }
  btns.forEach(function(b){ b.addEventListener('click', function(){ set(b); }); });
})();
</script>

## Steadier under the hood

The unglamorous work that makes the rest trustworthy:

<ul class="v14-fixes">
  <li><b>Fixed a startup crash</b> on certain graphics configurations that could leave the local model stuck.</li>
  <li><b>Stopped a rare out-of-memory crash</b> on big, complex answers &mdash; heavy math and long code render safely now.</li>
  <li><b>No more stray background processes</b> lingering after you close Valence.</li>
  <li><b>Calmer local conversations</b> &mdash; the on-device AI no longer echoes your greeting back or leaves an awkward gap before it answers.</li>
</ul>

## Almost here

None of this has shipped yet &mdash; 1.4 is in final testing as we write this, and we don't put a version in your hands until it's earned it. No firm date, but it's close.

When it lands, it's the same deal it's always been: everything runs on your machine, no account required, and the 7-day trial becomes a one-time <b>$59.95</b> &mdash; never a subscription. If any of this matters to you, or there's something we haven't built yet, we'd genuinely like to hear it: <b>help@helixailabs.com</b>.

<div class="v14-cta">
  <a href="https://helixailabs.com/Valence.html#get">Get Valence today &rarr;</a>
  <div class="fine">Windows 10/11 (64-bit) &middot; 7-day free trial, then $59.95 once</div>
</div>
