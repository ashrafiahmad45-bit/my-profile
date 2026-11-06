   const t = document.querySelector('.menu-toggle'), n = document.getElementById('site-nav');
      t.addEventListener('click', () => { const o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o) });
      n.addEventListener('click', e => { if (e.target.closest('a')) { n.classList.remove('open'); t.setAttribute('aria-expanded', false) } });
      (function () {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        // scroll progress
        const bar = document.createElement('div'); bar.className = 'scroll-progress'; document.body.appendChild(bar);
        const upd = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')' };
        addEventListener('scroll', upd, { passive: true }); upd();
        // reveal on scroll
        const sel = '.container2 .information-box,.container2 .about-me article,.container2 .image-about-me,.title-container3,.container3 .info,.title-container4,.container4 .info,.call-me,.title-container5,.container5 .projects,.btn-bottom-container5,.title-moshtrian-razi,.container6 .child-right,.container6 .child-left';
        const items = [...document.querySelectorAll(sel)];
        items.forEach(el => { el.classList.add('reveal'); const i = [...el.parentElement.children].indexOf(el); el.style.setProperty('--d', (i % 3) * 0.12 + 's') });
        const count = el => {
          const m = el.textContent.match(/(\d+)(.*)/); if (!m || reduce) return; const end = +m[1], t0 = performance.now();
          (function step(t) { const k = Math.min((t - t0) / 1500, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(end * e) + m[2]; if (k < 1) requestAnimationFrame(step) })(t0)
        };
        const io = new IntersectionObserver(es => es.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.classList.add('visible'); const n = e.target.querySelector('.number-information'); if (n) count(n); io.unobserve(e.target)
        }), { threshold: .15 });
        items.forEach(el => io.observe(el));
        // hero image tilt
        const hero = document.querySelector('.container1'), box = document.querySelector('.box-image-container1');
        if (!reduce && matchMedia('(hover:hover)').matches) {
          hero.addEventListener('mousemove', e => {
            const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            box.style.transform = 'perspective(800px) rotateY(' + (x * 18) + 'deg) rotateX(' + (-y * 18) + 'deg)'
          });
          hero.addEventListener('mouseleave', () => { box.style.transform = '' });
        }
      })();
      (function () {
        const split = (el, start) => {
          const words = el.textContent.trim().split(/\s+/); el.textContent = ''; el.setAttribute('aria-label', words.join(' '));
          words.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', start + i); s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')) });
          return start + words.length
        };
        const t = document.querySelector('.title-container4'); if (t) split(t, 0);
        document.querySelectorAll('.container4 .info').forEach(c => {
          let n = 0; const h = c.querySelector('.title-info-container4'), p = c.querySelector('.paragraph-info-container4');
          if (h) n = split(h, n); if (p) split(p, n + 1)
        });
      })();
      (function () {
        const split = (el, start) => {
          const words = el.textContent.trim().split(/\s+/); el.textContent = ''; el.setAttribute('aria-label', words.join(' '));
          words.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', start + i); s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')) });
          return start + words.length
        };
        const a = document.querySelector('.container2 .about-me article');
        if (a) {
          let n = 0;['.title-article-container2', '.title2-article-container2', '.paragraph-article-container2'].forEach(q => { const e = a.querySelector(q); if (e) n = split(e, n) });
          const b = a.querySelector('.btn-article-container2'); if (b) b.style.setProperty('--btn', (.05 + n * .03) + 's')
        }
        // tighter stagger + start earlier (before the element is fully on screen)
        document.querySelectorAll('.reveal').forEach(el => { const i = [...el.parentElement.children].indexOf(el); el.style.setProperty('--d', (i % 3) * 0.05 + 's') });
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });
        document.querySelectorAll('.reveal').forEach(el => io.observe(el));
      })();
      (function () {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const clamp = v => Math.max(0, Math.min(100, v));
        const split = (el, start) => {
          const txt = el.textContent.trim(), words = txt.split(/\s+/);
          // latin-only text: keep word order correct inside the RTL page
          if (!/[\u0600-\u06FF]/.test(txt)) { el.classList.add('ltr-text'); el.setAttribute('dir', 'ltr') }
          el.textContent = ''; el.setAttribute('aria-label', words.join(' '));
          words.forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', start + i); s.textContent = w; el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(' ')) });
          return start + words.length
        };

        /* about: button waits for the text to finish */
        const art = document.querySelector('.container2 .about-me article');
        if (art) art.style.setProperty('--btn', Math.min(1.7, .2 + art.querySelectorAll('.w').length * .045) + 's');

        /* download button: ripple + progress fill (+ optional real file via data-file="resume.pdf") */
        const dl = document.querySelector('.btn-container2');
        if (dl) dl.addEventListener('click', e => {
          const r = dl.getBoundingClientRect(), rp = document.createElement('span');
          rp.className = 'ripple'; rp.style.left = (e.clientX - r.left) + 'px'; rp.style.top = (e.clientY - r.top) + 'px';
          dl.appendChild(rp); setTimeout(() => rp.remove(), 750);
          dl.classList.remove('busy'); void dl.offsetWidth; dl.classList.add('busy'); setTimeout(() => dl.classList.remove('busy'), 1400);
          const f = dl.dataset.file;
          if (f) { const a = document.createElement('a'); a.href = f; a.download = ''; document.body.appendChild(a); a.click(); a.remove() }
        });

        /* projects */
        const t5 = document.querySelector('.title-container5'); if (t5) split(t5, 0);
        const canTilt = !reduce && matchMedia('(hover:hover)').matches;
        document.querySelectorAll('.container5 .projects').forEach((c, i) => {
          let n = 0;
          ['.title-projects', '.info-projects p', '.btn-projects'].forEach(q => { const e = c.querySelector(q); if (e) n = split(e, n) + 1 });
          c.style.setProperty('--d', (i % 3) * .14 + 's');
          const ip = c.querySelector('.i-p');
          if (ip) ip.insertAdjacentHTML('beforeend', '<span class="eye" aria-hidden="true"><i class="fas fa-eye"></i></span>');
          if (!canTilt) return;
          c.addEventListener('pointerenter', e => {
            if (e.pointerType !== 'mouse' || !ip) return;
            const r = ip.getBoundingClientRect();
            ip.style.setProperty('--mx', clamp((e.clientX - r.left) / r.width * 100) + '%');
            ip.style.setProperty('--my', clamp((e.clientY - r.top) / r.height * 100) + '%');
          });
          c.addEventListener('pointermove', e => {
            if (e.pointerType !== 'mouse') return;
            const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            c.classList.add('tilting');
            c.style.transform = 'perspective(1000px) rotateY(' + ((x - .5) * 18) + 'deg) rotateX(' + ((.5 - y) * 18) + 'deg) translateY(-10px) scale(1.02)';
          });
          c.addEventListener('pointerleave', () => { c.classList.remove('tilting'); c.style.transform = '' });
        });

        /* contact: left panel */
        const pl = document.querySelector('.paragraph-child-left'); if (pl) split(pl, 0);
        document.querySelectorAll('.box-btn-child-left a').forEach((a, i) => a.style.setProperty('--k', i));

        /* contact: form */
        const form = document.querySelector('.container6 form');
        if (!form) return;
        [...form.children].filter(e => !e.classList.contains('title-form')).forEach((e, i) => e.style.setProperty('--k', i));
        const tf = form.querySelector('.title-form'); if (tf) split(tf, 0);
        const btn = form.querySelector('.btn-form'), lbl = btn.querySelector('.lbl'), ico = btn.querySelector('i');
        const state = (cls, icon, text) => { btn.className = 'btn-form' + (cls ? ' ' + cls : ''); ico.className = icon; lbl.textContent = text };
        const burst = () => {
          if (reduce) return;
          const r = btn.getBoundingClientRect(), colors = ['#0072ec', '#6200ff', '#00aeff', '#c800ff', '#ffd400', '#00d68f'];
          for (let i = 0; i < 22; i++) {
            const p = document.createElement('i'); p.className = 'confetti';
            p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + r.height / 2) + 'px'; p.style.background = colors[i % colors.length];
            document.body.appendChild(p);
            const a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 110;
            p.animate([
              { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
              { transform: 'translate(calc(-50% + ' + Math.cos(a) * d + 'px), calc(-50% + ' + (Math.sin(a) * d + 60) + 'px)) rotate(' + Math.random() * 540 + 'deg) scale(.6)', opacity: 0 }
            ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
          }
        };
        form.addEventListener('submit', ev => {
          ev.preventDefault(); if (btn.disabled) return;
          btn.disabled = true; state('sending', 'fas fa-circle-notch fa-spin', 'در حال ارسال...');
          // TODO: replace this timeout with a real request (fetch) to your backend
          setTimeout(() => {
            state('sent', 'fas fa-check', 'پیام شما ارسال شد'); burst(); form.reset();
            setTimeout(() => { state('', 'fas fa-paper-plane', 'ارسال پیام'); btn.disabled = false }, 2800);
          }, 1400);
        });
      })();