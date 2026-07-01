---
layout: post
title: "In the works: choose how your answers arrive"
date: 2026-06-30 10:00:00 -0700
category: news
---

You spend more time watching text stream in than almost anything else in Valence. So we're building a way to let *you* decide how it feels &mdash; a small set of **Streaming Effects** you'll pick from in **Settings &rarr; Theme**, with a live preview of each before you commit.

This is early &mdash; it hasn't shipped yet, and nothing here changes how Valence works today. But the direction is worth sharing, and it's the kind of thing that's easier to *show* than describe. Try the three below (tap the tabs, hit replay):

<div id="sfx-demo" data-sfx="on">
  <div class="sfx-tabs">
    <button class="sfx-tab sfx-active" data-fx="focus">Focus Pull</button>
    <button class="sfx-tab" data-fx="weight">Weight Settle</button>
    <button class="sfx-tab" data-fx="line">Line Rise</button>
  </div>
  <div class="sfx-stage"><div class="sfx-content"><span class="sfx-cursor"></span></div></div>
  <div class="sfx-foot">
    <span class="sfx-desc"></span>
    <button class="sfx-replay">&#8635; replay</button>
  </div>
</div>

<style>
#sfx-demo{margin:1.6rem 0 2rem;border:1px solid var(--rule);border-radius:6px;background:var(--card);overflow:hidden}
#sfx-demo .sfx-tabs{display:flex;gap:.4rem;padding:.7rem .8rem;border-bottom:1px solid var(--rule-soft);flex-wrap:wrap}
#sfx-demo .sfx-tab{font-family:'Geist Mono',monospace;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);background:transparent;border:1px solid var(--rule);padding:.4rem .7rem;border-radius:4px;cursor:pointer;transition:all .16s}
#sfx-demo .sfx-tab:hover{color:var(--ink);border-color:var(--mute-2)}
#sfx-demo .sfx-tab.sfx-active{color:var(--coral);border-color:var(--coral);background:var(--coral-soft)}
#sfx-demo .sfx-stage{padding:1.6rem 1.4rem;min-height:120px;display:flex;align-items:flex-start}
#sfx-demo .sfx-content{font-size:1.15rem;line-height:1.65;color:var(--ink)}
#sfx-demo .sfx-cursor{display:inline-block;width:2px;height:1.05em;background:var(--coral);vertical-align:-.15em;animation:sfx-blink 1s step-end infinite}
@keyframes sfx-blink{50%{opacity:0}}
#sfx-demo .sfx-foot{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.6rem .9rem;border-top:1px solid var(--rule-soft)}
#sfx-demo .sfx-desc{font-family:'Geist Mono',monospace;font-size:.68rem;color:var(--mute);line-height:1.4}
#sfx-demo .sfx-replay{font-family:'Geist Mono',monospace;font-size:.68rem;color:var(--mute);background:transparent;border:1px solid var(--rule);padding:.35rem .7rem;border-radius:4px;cursor:pointer;white-space:nowrap}
#sfx-demo .sfx-replay:hover{color:var(--ink)}
#sfx-demo .fp-word{display:inline-block;opacity:0;filter:blur(12px);transform:scale(1.05) translateY(2px);transition:opacity .5s cubic-bezier(.2,.8,.2,1),filter .55s cubic-bezier(.2,.8,.2,1),transform .55s cubic-bezier(.2,.8,.2,1)}
#sfx-demo .fp-word.in{opacity:1;filter:blur(0);transform:none}
#sfx-demo .ws-char{display:inline-block;color:var(--coral);font-weight:700}
#sfx-demo .ws-char.in{color:var(--ink);font-weight:400;transition:color .5s ease}
#sfx-demo .lc-mask{overflow:hidden;display:block}
#sfx-demo .lc-line{display:block;transform:translateY(110%);transition:transform .55s cubic-bezier(.16,1,.3,1)}
#sfx-demo .lc-line.in{transform:none}
@media (prefers-reduced-motion: reduce){
  #sfx-demo .fp-word,#sfx-demo .ws-char,#sfx-demo .lc-line{transition:none !important;opacity:1 !important;filter:none !important;transform:none !important}
  #sfx-demo .ws-char{color:var(--ink) !important;font-weight:400 !important}
}
</style>

<script>
(function(){
  var root=document.getElementById('sfx-demo'); if(!root||!root.dataset.sfx) return;
  var SAMPLE="The model doesn't know the whole answer at once. It commits to one token, then the next, each choice narrowing what comes after. What you watch resolve on screen is a decision settling into place.";
  var content=root.querySelector('.sfx-content'), desc=root.querySelector('.sfx-desc');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var netTimers=[],tick=null,pending='',done=false,cursor=null,lineState=null,lineCount=0;
  var FX={
    focus:{unit:'word',desc:'Words rack into focus from a soft blur as they arrive.',
      consume:function(w){var s=document.createElement('span');s.className='fp-word';s.textContent=w.replace(/\s+$/,'');content.insertBefore(s,cursor);content.insertBefore(document.createTextNode(' '),cursor);raf2(function(){s.classList.add('in')});}},
    weight:{unit:'char',desc:'Each character lands hot, then cools to normal weight.',
      consume:function(c){var s=document.createElement('span');s.className='ws-char';s.textContent=c===' '?' ':c;content.insertBefore(s,cursor);setTimeout(function(){s.classList.add('in')},20);}},
    line:{unit:'word',per:7,desc:'Words gather into lines that rise into view together.',
      consume:function(w){if(!lineState||lineCount>=7){var m=document.createElement('span');m.className='lc-mask';var i=document.createElement('span');i.className='lc-line';m.appendChild(i);content.insertBefore(m,cursor);content.insertBefore(document.createTextNode(' '),cursor);lineState=i;lineCount=0;raf2(function(){i.classList.add('in')});}lineState.textContent+=w;lineCount++;}}
  };
  var current='focus';
  function raf2(fn){requestAnimationFrame(function(){requestAnimationFrame(fn)});}
  function stop(){netTimers.forEach(clearTimeout);netTimers=[];if(tick)clearInterval(tick);pending='';done=false;lineState=null;lineCount=0;}
  function network(text,onChunk,onDone){var i=0;function step(){if(i>=text.length){onDone();return;}var n=1+Math.floor(Math.random()*5);onChunk(text.slice(i,i+n));i+=n;var d=30+Math.random()*90+(Math.random()<0.06?260+Math.random()*260:0);netTimers.push(setTimeout(step,d));}netTimers.push(setTimeout(step,180));}
  function play(){
    stop();content.innerHTML='';cursor=document.createElement('span');cursor.className='sfx-cursor';content.appendChild(cursor);
    var fx=FX[current];desc.textContent=fx.desc;
    if(reduce){content.textContent=SAMPLE;return;}
    network(SAMPLE,function(ch){pending+=ch;},function(){done=true;});
    tick=setInterval(function(){
      if(fx.unit==='char'){if(!pending.length)return;var c=pending[0];pending=pending.slice(1);fx.consume(c);}
      else{var sp=pending.indexOf(' ');if(sp===-1){if(done&&pending.length){var w=pending;pending='';fx.consume(w);}return;}var w=pending.slice(0,sp+1);pending=pending.slice(sp+1);fx.consume(w);}
    },24);
  }
  root.querySelectorAll('.sfx-tab').forEach(function(btn){btn.addEventListener('click',function(){current=btn.dataset.fx;root.querySelectorAll('.sfx-tab').forEach(function(b){b.classList.toggle('sfx-active',b===btn)});play();});});
  root.querySelector('.sfx-replay').addEventListener('click',play);
  play();
})();
</script>

## What we're actually building

- **A short menu of reveal styles**, chosen in **Settings &rarr; Theme** with a live preview exactly like the one above &mdash; so you see each one before you pick.
- **A calm default that never gets in the way.** There will always be a plain **None / Instant** option, and if your system asks for reduced motion, Valence honors it and skips the animation entirely.
- **Effects that respect your content.** Code blocks, math, and formatting have to render perfectly first &mdash; the motion is a layer on top, never something that garbles what the model actually said. (That constraint is why we're starting with a small, careful set rather than every idea at once.)

No date, no promises on the exact final lineup &mdash; just a look at where a corner of Valence is heading. If one of these speaks to you, or you have an idea for another, we'd genuinely like to hear it: **help@helixailabs.com**.
