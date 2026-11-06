const t = document.querySelector('.menu-toggle'), n = document.getElementById('site-nav');
    t.addEventListener('click', () => { const o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o) });
    n.addEventListener('click', e => { if (e.target.closest('a')) { n.classList.remove('open'); t.setAttribute('aria-expanded', false) } });
    (function () {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const bar = document.createElement('div'); bar.className = 'scroll-progress'; document.body.appendChild(bar);
      const hd = document.getElementById('header'), top = document.querySelector('.go-to-top');
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
        hd.classList.toggle('scrolled', scrollY > 40); top.classList.toggle('show', scrollY > 500)
      };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
      // split titles into letters (kept as whole words so nothing breaks mid-word)
      const split = root => {
        let i = 0; root.setAttribute('aria-label', root.textContent.trim().replace(/\s+/g, ' '));
        const walk = n => [...n.childNodes].forEach(c => {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(p => {
              if (!p) return;
              if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return }
              const w = document.createElement('span'); w.className = 'wd'; w.setAttribute('aria-hidden', 'true');
              [...p].forEach(ch => { const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i++); s.textContent = ch; w.appendChild(s) });
              f.appendChild(w)
            });
            c.replaceWith(f)
          }
          else if (c.nodeType === 1) walk(c)
        });
        walk(root); root.classList.add('split')
      };
      const titles = [...document.querySelectorAll('.title-article,.title-article-container2,.title-container3,.title-container4,.title-container5')];
      titles.forEach(split);
      // scroll reveal
      const groups = [['.container2 .image', -70, 0], ['.container2 article>:not(.title-article-container2)', 0, 24], ['.container3 .item', 0, 40], ['.container4 .child', 0, 0],
      ['.container5 .input-boxs', 0, 24], ['.container5 .textarea-box', 0, 24], ['.container5 .btn-form', 0, 24], ['.footer article', 0, 24], ['.footer section', 0, 24], ['.footer .copyright-text', 0, 24]];
      const items = [];
      groups.forEach(([q, fx, fy]) => document.querySelectorAll(q).forEach(el => {
        el.classList.add('reveal');
        if (fx) el.style.setProperty('--fx', fx + 'px'); if (fy || !fx) el.style.setProperty('--fy', fy + 'px');
        const i = [...el.parentElement.children].indexOf(el); el.style.setProperty('--d', (i % 4) * 0.07 + 's'); items.push(el)
      }));
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });
      items.concat(titles).forEach(el => io.observe(el));
      // hero tilt
      const hero = document.querySelector('.container1'), box = hero.querySelector(':scope>div');
      if (!reduce && matchMedia('(hover:hover)').matches) {
        hero.addEventListener('mousemove', e => {
          const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          box.style.transform = 'perspective(800px) rotateY(' + (x * 16) + 'deg) rotateX(' + (-y * 16) + 'deg)'
        });
        hero.addEventListener('mouseleave', () => { box.style.transform = '' });
      }
    })();
    (function () {
      const items = [...document.querySelectorAll('.container3 .item')];
      const mk = (c, i, t) => { const s = document.createElement('span'); s.className = c; s.style.setProperty('--i', i); s.textContent = t; return s };
      items.forEach(it => {
        const t = it.querySelector('.title-section');
        if (t) {
          const txt = t.textContent.trim(); t.setAttribute('aria-label', txt); t.textContent = ''; let i = 0;
          txt.split(/\s+/).forEach((w, k, a) => {
            const wd = document.createElement('span'); wd.className = 'wd'; wd.setAttribute('aria-hidden', 'true');
            [...w].forEach(c => wd.appendChild(mk('ch', i++, c))); t.appendChild(wd); if (k < a.length - 1) t.appendChild(document.createTextNode(' '))
          })
        }
        const p = it.querySelector('p');
        if (p) {
          const ws = p.textContent.trim().split(/\s+/); p.setAttribute('aria-label', ws.join(' ')); p.textContent = '';
          ws.forEach((w, i) => { const s = mk('w', i, w); s.setAttribute('aria-hidden', 'true'); p.appendChild(s); if (i < ws.length - 1) p.appendChild(document.createTextNode(' ')) })
        }
        const st = it.querySelector('.stare-section');
        if (st) {
          const a = Array.from(st.textContent.trim()); st.setAttribute('aria-label', a.length + ' stars'); st.textContent = '';
          a.forEach((c, i) => { const s = mk('st', i, c); s.setAttribute('aria-hidden', 'true'); st.appendChild(s) })
        }
        const pr = it.querySelector('h4');
        if (pr) {
          const m = pr.textContent.match(/^(\D*)([\d.]+)(.*)$/); if (m) {
            pr.dataset.pre = m[1]; pr.dataset.end = m[2]; pr.dataset.post = m[3]; pr.dataset.dec = (m[2].split('.')[1] || '').length; pr.setAttribute('aria-label', pr.textContent.trim());
            pr.textContent = m[1] + (0).toFixed(+pr.dataset.dec) + m[3]
          }
        }
      });
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const count = (el, delay) => {
        if (reduce || !el.dataset.end) { if (el.dataset.end) el.textContent = el.dataset.pre + (+el.dataset.end).toFixed(+el.dataset.dec) + el.dataset.post; return }
        const end = +el.dataset.end; setTimeout(() => {
          const t0 = performance.now();
          (function step(t) { const k = Math.min((t - t0) / 800, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = el.dataset.pre + (end * e).toFixed(+el.dataset.dec) + el.dataset.post; if (k < 1) requestAnimationFrame(step) })(t0)
        }, delay * 1000 + 1000)
      };
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const d = parseFloat(e.target.style.getPropertyValue('--d')) || 0; const pr = e.target.querySelector('h4'); if (pr) count(pr, d); io.unobserve(e.target)
      }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });
      items.forEach(i => io.observe(i));
    })();
    (function () {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, hover = matchMedia('(hover:hover)').matches;
      const q = (s, r) => [...(r || document).querySelectorAll(s)];

      /* soft word-by-word writing (works on text nodes, keeps inner icons/tags) */
      const soft = (el, b, st) => {
        if (!el || el.dataset.sw) return; el.dataset.sw = 1;
        if (b != null) el.style.setProperty('--b', b + 's'); if (st != null) el.style.setProperty('--st', st + 's');
        let i = 0; el.setAttribute('aria-label', el.textContent.trim().replace(/\s+/g, ' '));
        const walk = n => [...n.childNodes].forEach(c => {
          if (c.nodeType === 3) {
            const f = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(p => {
              if (!p) return;
              if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return }
              const s = document.createElement('span'); s.className = 'sw'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', i++); s.textContent = p; f.appendChild(s)
            });
            c.replaceWith(f)
          } else if (c.nodeType === 1) walk(c)
        });
        walk(el); return i
      };

      q('.navbar-list .link').forEach((a, i) => a.style.setProperty('--k', i));

      /* observer for elements the old script does not track */
      const vis = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); vis.unobserve(e.target) } }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });

      /* hero */
      const hp = q('.container1 .paragraph-article')[0];
      if (hp) { soft(hp, .8, .03); vis.observe(hp) }

      /* about */
      [['.title2-article-container2', .5, .04], ['.paragraph-article-container2', .9, .03]].forEach(([s, b, st]) => {
        const e = q('.container2 ' + s)[0]; if (e) { e.classList.remove('reveal'); soft(e, b, st); vis.observe(e) }
      });
      const ap = q('.container2 .paragraph-article-container2')[0], ab = q('.container2 .btn-article-container2')[0];
      if (ab && ap) ab.style.setProperty('--d', Math.min(2.6, .9 + ap.querySelectorAll('.sw').length * .03) + 's');

      /* form + footer text */
      q('.container5 label').forEach(l => soft(l, .3, .05));
      q('.footer .footer-title').forEach(e => soft(e, .15, .08));
      q('.footer .text-footer').forEach(e => soft(e, .45, .025));
      q('.footer .footer-list li a').forEach((a, k) => soft(a, .3 + k * .2, .08));
      q('.footer .copyright-text').forEach(e => soft(e, .3, .05));
      const cf = q('.container5 .container-form')[0]; if (cf) { cf.classList.add('reveal'); vis.observe(cf) }

      /* column-aware stagger for card grids */
      const stagger = sel => {
        const els = q(sel); if (!els.length) return els;
        const cols = els.filter(x => x.offsetTop === els[0].offsetTop).length || 1;
        els.forEach((el, i) => el.style.setProperty('--d', (i % cols) * .14 + 's')); return els
      };
      const items = stagger('.container3 .item'), kids = stagger('.container4 .child');

      /* 3D tilt */
      const tilt = (el, max, lift, sc) => {
        if (reduce || !hover) return;
        el.addEventListener('pointermove', e => {
          if (e.pointerType !== 'mouse') return;
          const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          el.classList.add('tilting'); el.style.setProperty('--gx', x * 100 + '%'); el.style.setProperty('--gy', y * 100 + '%');
          el.style.transform = 'perspective(1000px) rotateY(' + ((x - .5) * max * 2) + 'deg) rotateX(' + ((.5 - y) * max * 2) + 'deg) translateY(-' + lift + 'px) scale(' + sc + ')'
        });
        el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.transform = '' })
      };
      items.forEach(el => tilt(el, 6, 8, 1.02));
      kids.forEach(el => tilt(el, 7, 6, 1.03));
      q('.container2 .image').forEach(el => tilt(el, 9, 0, 1.03));
    })();
    (function () {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      /* form: field icons */
      const icons = { fullname: 'fa-user', phone: 'fa-phone', email: 'fa-envelope', password: 'fa-lock', bio: 'fa-comment-dots' };
      document.querySelectorAll('.container5 .inputs').forEach(inp => {
        const w = document.createElement('div'); w.className = 'fld' + (inp.tagName === 'TEXTAREA' ? ' ta' : '');
        inp.parentNode.insertBefore(w, inp); w.appendChild(inp);
        const i = document.createElement('i'); i.className = 'fa ' + (icons[inp.id] || 'fa-pen') + ' fld-ic'; i.setAttribute('aria-hidden', 'true'); w.appendChild(i)
      });
      /* form: send button states + confetti */
      const form = document.querySelector('.container5 form'); if (!form) return;
      const btn = form.querySelector('.btn-form');
      btn.innerHTML = '<span class="lbl">Send message</span><i class="fa fa-paper-plane" aria-hidden="true"></i>';
      const lbl = btn.querySelector('.lbl'), ico = btn.querySelector('i');
      const state = (cls, icon, text) => { btn.className = btn.className.replace(/\b(sending|sent)\b/g, '').trim() + (cls ? ' ' + cls : ''); ico.className = icon; lbl.textContent = text };
      const burst = () => {
        if (reduce) return;
        const r = btn.getBoundingClientRect(), colors = ['#ffd400', '#ff9500', '#000', '#00d68f', '#ffe45c', '#ff5c8a'];
        for (let i = 0; i < 24; i++) {
          const p = document.createElement('i'); p.className = 'confetti';
          p.style.left = (r.left + r.width / 2) + 'px'; p.style.top = (r.top + r.height / 2) + 'px'; p.style.background = colors[i % colors.length];
          document.body.appendChild(p);
          const a = Math.random() * Math.PI * 2, d = 70 + Math.random() * 120;
          p.animate([
            { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
            { transform: 'translate(calc(-50% + ' + Math.cos(a) * d + 'px), calc(-50% + ' + (Math.sin(a) * d + 60) + 'px)) rotate(' + Math.random() * 540 + 'deg) scale(.6)', opacity: 0 }
          ], { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove()
        }
      };
      form.addEventListener('submit', ev => {
        ev.preventDefault(); if (btn.disabled) return;
        btn.disabled = true; state('sending', 'fa fa-circle-notch fa-spin', 'Sending...');
        // TODO: replace this timeout with a real request (fetch) to your backend
        setTimeout(() => {
          state('sent', 'fa fa-check', 'Message sent!'); burst(); form.reset();
          setTimeout(() => { state('', 'fa fa-paper-plane', 'Send message'); btn.disabled = false }, 2800)
        }, 1400)
      });
    })();