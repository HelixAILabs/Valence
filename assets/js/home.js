/* Valence home: disclosures, scroll CTA, scroll reveals, hardware check.
   No dependencies. Everything degrades to static markup with JS off. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  function setDisc(btn, open) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    if (panel) panel.setAttribute('data-open', String(open));
  }

  /* ---- header CTA appears once past the hero ----
     Only on the home page, where the template starts data-on="false"
     because the hero already has its own big CTA. On every other page
     the template starts it "true" (there's no in-page hero button), and
     it must STAY visible from load — this scroll-reveal logic used to
     run unconditionally on every page and immediately re-hid it at
     scrollY=0, which is exactly the "can't find how to download" bug
     it caused everywhere except the home page. */
  var slot = document.querySelector('[data-cta-slot]');
  if (slot && slot.getAttribute('data-on') === 'false') {
    var shown = false;
    var onScroll = function () {
      var on = window.scrollY > 380;
      if (on !== shown) { shown = on; slot.setAttribute('data-on', String(on)); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- "How" accordion: one open at a time ---- */
  var hows = [].slice.call(document.querySelectorAll('[data-how]'));
  hows.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      hows.forEach(function (other) { setDisc(other, false); });
      if (willOpen) setDisc(btn, true);
    });
  });

  /* ---- checksum reveal ---- */
  [].slice.call(document.querySelectorAll('[data-sha]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      setDisc(btn, btn.getAttribute('aria-expanded') !== 'true');
    });
  });

  /* ---- download accordion: collapsed by default, one open at a time ---- */
  var dls = [].slice.call(document.querySelectorAll('[data-dl]'));
  dls.forEach(function (dl) {
    var head = dl.querySelector('.dl-head');
    head.addEventListener('click', function () {
      var willOpen = dl.getAttribute('data-open') !== 'true';
      dls.forEach(function (other) {
        other.setAttribute('data-open', 'false');
        other.querySelector('.dl-head').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        dl.setAttribute('data-open', 'true');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---- sections arrive as you reach them ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    [].slice.call(document.querySelectorAll('.rv')).forEach(function (el) { io.observe(el); });
  } else {
    [].slice.call(document.querySelectorAll('.rv')).forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- motion loops: fetch and play only once scrolled to ----
     preload="none" plus a late src assignment means page load pays for the
     poster and nothing else. A src that 404s (recording not made yet) leaves
     the poster on screen, which is the same thing the page showed before. */
  var loops = [].slice.call(document.querySelectorAll('.loop-v[data-src]'));
  if (loops.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      && 'IntersectionObserver' in window) {
    var lo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (!v.getAttribute('src')) v.setAttribute('src', v.getAttribute('data-src'));
          var p = v.play();
          if (p && p.catch) p.catch(function () { /* no file yet, poster stays */ });
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    loops.forEach(function (v) { lo.observe(v); });
  }

  /* ---- hardware check ---- */
  var scanBtn = document.querySelector('[data-scan]');
  if (!scanBtn) return;
  var out = document.getElementById('scan-result');

  function readGpu() {
    if (navigator.gpu && navigator.gpu.requestAdapter) {
      return navigator.gpu.requestAdapter().then(function (a) {
        var i = a && (a.info || null);
        return i ? [i.vendor, i.architecture].filter(Boolean).join(' ') : '';
      }).catch(function () { return ''; });
    }
    return Promise.resolve('');
  }
  // WEBGL_debug_renderer_info returns a driver string, not a product name:
  // "ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0, D3D11)".
  // Showing that to someone deciding whether to install is noise, so keep the
  // part a person would recognise and drop the API and shader-model tail.
  function tidyGpu(raw) {
    if (!raw) return '';
    // A software rasteriser means there is no usable GPU, so report nothing
    // rather than a vendor name: the verdict below reads "no GPU" correctly.
    if (/SwiftShader|llvmpipe|Software\s*Rasteriz|Microsoft Basic Render/i.test(raw)) return '';
    var m = raw.match(/^ANGLE \(([^,]+),\s*(.+?)(?:,\s*[^,]*)?\)$/);
    var vendor = m ? m[1].trim() : '';
    var name = m ? m[2] : raw;
    var cleaned = name
      .replace(/^ANGLE\s+Metal\s+Renderer:\s*/i, '')
      .replace(/^ANGLE\s+/i, '')
      .replace(/\s*(Direct3D\d*|OpenGL(?: ES)?|Vulkan|Metal|D3D\d*)\b.*$/i, '')
      .replace(/\s*vs_\d+_\d+.*$/i, '')
      .replace(/\(R\)|\(TM\)|\(C\)/gi, '')
      .replace(/\s*\(0x[0-9A-F]+\)/gi, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\s,(]+$/, '')
      .trim();
    // stripping the API name must never empty a string that named a real GPU
    if (!cleaned) cleaned = vendor || name.replace(/\s{2,}/g, ' ').trim();
    return cleaned.length > 46 ? cleaned.slice(0, 46).trim() : cleaned;
  }

  function glFallback() {
    try {
      var gl = document.createElement('canvas').getContext('webgl');
      var ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
      return ext ? tidyGpu(String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL))) : '';
    } catch (e) { return ''; }
  }

  function verdictFor(mem, cores, gpu) {
    // `mem` is navigator.deviceMemory: Chromium-only, and capped at 8 even on a
    // 64 GB machine. Firefox and Safari report nothing at all. So absence of a
    // signal is never treated as bad news. A discouraging verdict requires a
    // POSITIVE reading of 4 GB or less. Without that we say we couldn't tell.
    if (mem >= 8 && gpu) {
      return ['Local AI should run well on this machine.',
        'Start with a small model like Gemma or Qwen. With your graphics hardware, bigger models are likely in reach too.'];
    }
    if (mem >= 8 || cores >= 8) {
      return ['Small local models should work here.',
        'Expect comfortable speed on smaller models; larger ones may be slow without a dedicated graphics card. Cloud models run perfectly either way.'];
    }
    if (mem && mem <= 4) {
      return ['This machine looks light for local models.',
        'You can still try the smallest models, and every cloud model works fine, with your history and memory kept local.'];
    }
    return ["Your browser wouldn't say much about this machine.",
      'No problem. Valence does a proper hardware check on first run and sets up a model that genuinely fits.'];
  }

  scanBtn.addEventListener('click', function () {
    if (scanBtn.getAttribute('data-busy') === 'true') return;
    scanBtn.setAttribute('data-busy', 'true');
    scanBtn.textContent = 'Checking…';
    out.setAttribute('data-open', 'false');

    var cores = navigator.hardwareConcurrency || 0;
    var mem = navigator.deviceMemory || 0;
    var started = Date.now();

    readGpu().then(function (gpu) {
      if (!gpu) gpu = glFallback();
      var v = verdictFor(mem, cores, gpu);
      var specs = [
        mem ? mem + ' GB+ RAM visible to the browser' : null,
        cores ? cores + ' CPU cores' : null,
        gpu ? 'Graphics: ' + gpu : null
      ].filter(Boolean).join(' · ');

      // the real work finishes in ~1ms; a check that returns instantly reads as
      // fake, so hold the busy state briefly before showing the verdict.
      var wait = Math.max(0, 850 - (Date.now() - started));
      setTimeout(function () {
        out.querySelector('.verdict').textContent = v[0];
        out.querySelector('.why').textContent = v[1];
        var s = out.querySelector('.specs');
        s.textContent = specs;
        s.hidden = !specs;
        out.setAttribute('data-open', 'true');
        scanBtn.removeAttribute('data-busy');
        scanBtn.textContent = 'Check again';
      }, wait);
    });
  });
})();

