/* pages.js: the behaviours the ten standalone pages each shipped their own
   copy of, plus the three that were genuinely page-specific. Everything is
   feature-detected, so one file serves every page. */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.add('js');

  /* ---- reveal / stagger (was duplicated on all ten pages) ---- */
  var targets = d.querySelectorAll('.reveal, .stagger');
  if (targets.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---- scroll progress bar ---- */
  var sp = d.getElementById('sp') || d.querySelector('.scroll-progress i');
  if (sp) {
    var tick = function () {
      var h = d.documentElement.scrollHeight - window.innerHeight;
      sp.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* ---- screenshot lightbox (Docs, Getting Started, Guides) ---- */
  (function () {
    var box = d.getElementById('lbox');
    if (!box) return;
    var img = d.getElementById('lbImg'),
        cap = d.getElementById('lbCap'),
        x = d.getElementById('lbClose');
    function open(src, alt) {
      img.src = src; img.alt = alt || '';
      if (cap) cap.textContent = alt || '';
      box.classList.add('open');
      d.body.style.overflow = 'hidden';
    }
    function close() {
      box.classList.remove('open');
      d.body.style.overflow = '';
      img.removeAttribute('src');
    }
    d.querySelectorAll('.shot img, img.zoom').forEach(function (el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function () { open(el.currentSrc || el.src, el.alt); });
    });
    if (x) x.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  })();

  /* ---- calm video: honour prefers-reduced-motion (Valence.html) ---- */
  (function () {
    var vids = d.querySelectorAll('video[data-calm]');
    if (!vids.length) return;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    vids.forEach(function (v) {
      if (calm.matches) { v.pause(); v.removeAttribute('autoplay'); v.controls = true; }
    });
    if (!('IntersectionObserver' in window) || calm.matches) return;
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { var p = e.target.play(); if (p) p.catch(function () {}); }
        else e.target.pause();
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vio.observe(v); });
  })();

  /* ---- research: in-flight / published tabs ---- */
  (function () {
    var tf = d.getElementById('t-flight'), td = d.getElementById('t-done'),
        pf = d.getElementById('p-flight'), pd = d.getElementById('p-done');
    if (!tf || !td || !pf || !pd) return;
    function show(flight) {
      pf.classList.toggle('hidden', !flight);
      pd.classList.toggle('hidden', flight);
      tf.setAttribute('aria-selected', String(flight));
      td.setAttribute('aria-selected', String(!flight));
    }
    tf.addEventListener('click', function () { show(true); });
    td.addEventListener('click', function () { show(false); });
  })();

  /* ---- contact form ----
     Restored: this handler used to live inline on Contact.html and was dropped
     when the per-page scripts were consolidated here. Without it the form did a
     native POST and dumped the visitor on the Lambda's raw JSON response, with
     the success panel and the mailto fallback both unreachable. The markup was
     never touched, so the ids below are the ones the page already ships. */
  var cForm = document.getElementById('contactForm');
  if (cForm) {
    var cStatus = document.getElementById('formStatus');
    var cBtn = document.getElementById('submitBtn');
    var cPanel = document.getElementById('successPanel');
    var CONTACT_EMAIL = 'help@helixailabs.com';

    var mailtoFallback = function (data) {
      var subject = '[' + (data.category || 'Contact') + '] from ' + (data.name || 'a Valence user');
      var body = (data.message || '').trim() + '\n\n' + (data.name || '')
               + (data.email ? ' (' + data.email + ')' : '');
      window.location.href = 'mailto:' + CONTACT_EMAIL
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
    };

    // sent = the relay accepted it, nothing left for the visitor to do.
    // otherwise their email client opened and they still have to press send.
    var showSuccess = function (sent) {
      document.getElementById('successSent').classList.toggle('hidden', !sent);
      document.getElementById('successFallback').classList.toggle('hidden', sent);
      cForm.classList.add('hidden');
      cPanel.classList.remove('hidden');
      cPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    cForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (cForm.botcheck && cForm.botcheck.value) { return; }   // honeypot: bots fill it
      if (!cForm.reportValidity()) { return; }

      var data = {};
      new FormData(cForm).forEach(function (v, k) { data[k] = v; });

      var label = cBtn.textContent;
      cBtn.disabled = true;
      cBtn.textContent = 'Sending…';
      cStatus.classList.remove('err');
      cStatus.textContent = 'Sending your message…';

      var done = function () { cBtn.disabled = false; cBtn.textContent = label; };

      fetch(cForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        return res.json().catch(function () { return {}; })
          .then(function (out) { return { res: res, out: out }; });
      }).then(function (r) {
        if (r.res.ok && r.out.success) {
          cStatus.textContent = '';
          showSuccess(true);
          done();
          return;
        }
        // validation errors come back readable: show it and let them fix it
        if (r.res.status === 400 && r.out.message) {
          cStatus.classList.add('err');
          cStatus.textContent = r.out.message;
          done();
          return;
        }
        throw new Error(r.out.message || ('Unexpected response (' + r.res.status + ')'));
      }).catch(function () {
        // backend unreachable: never lose the message the visitor just wrote
        cStatus.classList.add('err');
        cStatus.textContent = "Couldn't send from the site, opening your email app instead.";
        mailtoFallback(data);
        showSuccess(false);
        done();
      });
    });
  }

  /* ---- sticky rail: highlight the section you're actually in ----
     Both rails style .rail-link.active but nothing ever set it.

     Two parts on purpose. The DECISION is "last section whose top has passed
     the line", not "first section intersecting": the install section is taller
     than the viewport, so an is-it-visible test stays stuck on it all the way
     down. The TRIGGER is an IntersectionObserver as well as scroll, because IO
     fires on load and on section boundaries even when no scroll event does. */
  var railLinks = [].slice.call(document.querySelectorAll('.docs-rail .rail-link[href^="#"]'));
  var targets = railLinks.map(function (a) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    return el ? { a: a, el: el } : null;
  }).filter(Boolean);
  if (targets.length) {
    var mark = function () {
      var current = null;
      targets.forEach(function (t) {
        if (t.el.getBoundingClientRect().top <= 96) current = t;
      });
      targets.forEach(function (t) { t.a.classList.remove('active'); });
      if (current) current.a.classList.add('active');
    };
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(mark, { threshold: [0, 1] });
      targets.forEach(function (t) { spy.observe(t.el); });
    }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { ticking = false; mark(); });
      }
    }, { passive: true });
    window.addEventListener('resize', mark, { passive: true });
    mark();
  }

})();
