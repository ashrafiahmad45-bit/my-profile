  const t = document.querySelector('.menu-toggle'), n = document.getElementById('site-nav'), p = document.getElementById('product-item');
  t.addEventListener('click', () => { const o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o) });
  p.querySelector(':scope>a').addEventListener('click', e => { if (matchMedia('(max-width:900px), (hover:none)').matches) { e.preventDefault(); p.classList.toggle('open') } });
  n.addEventListener('click', e => { const a = e.target.closest('a'); if (a && !a.parentElement.matches('#product-item')) { n.classList.remove('open'); t.setAttribute('aria-expanded', false) } });
  document.addEventListener('click', e => { if (!p.contains(e.target)) p.classList.remove('open') });
  (function () {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.createElement('div'); bar.className = 'scroll-progress'; document.body.appendChild(bar);
    const top = document.querySelector('.go-to-top');
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; top.classList.toggle('show', scrollY > 500) };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const cards = [...document.querySelectorAll('#menu .menu-item')];
    cards.forEach((c, i) => {
      c.style.setProperty('--d', (i % 3) * 0.1 + 's');
      const t = c.querySelector('.menu-title');
      if (t) {
        const ws = t.textContent.trim().split(/\s+/); t.setAttribute('aria-label', ws.join(' ')); t.textContent = '';
        ws.forEach((w, k) => { const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', k); s.setAttribute('aria-hidden', 'true'); s.textContent = w; t.appendChild(s); if (k < ws.length - 1) t.appendChild(document.createTextNode(' ')) })
      }
      const p = c.querySelector('.menu-info-box p');
      if (p) {
        const m = p.textContent.match(/^\s*([\d,]+)\s*([\s\S]*)$/);
        if (m) {
          p.setAttribute('aria-label', p.textContent.trim()); p.innerHTML = '';
          const n = document.createElement('span'); n.className = 'num'; n.dataset.end = m[1].replace(/,/g, ''); n.textContent = '0'; n.setAttribute('aria-hidden', 'true');
          const u = document.createElement('span'); u.className = 'cur'; u.textContent = ' ' + m[2].trim(); u.setAttribute('aria-hidden', 'true'); p.append(n, u)
        }
      }
      const lk = c.querySelector('.like-btn');
      if (lk) lk.addEventListener('click', () => { lk.classList.remove('liked'); void lk.offsetWidth; lk.classList.toggle('liked', !lk._on); lk._on = !lk._on; if (!lk._on) lk.classList.remove('liked') });
    });
    const count = (el, delay) => {
      const end = +el.dataset.end; if (reduce) { el.textContent = end.toLocaleString('en-US'); return }
      setTimeout(() => {
        const t0 = performance.now(); (function step(t) {
          const k = Math.min((t - t0) / 900, 1), e = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(end * e).toLocaleString('en-US'); if (k < 1) requestAnimationFrame(step)
        })(t0)
      }, delay * 1000)
    };
    // reveal for location + footer
    const extra = [['#contianer-goghrafia article', 60, 0], ['#contianer-goghrafia section', -60, 0], ['#footer .footer-section', 0, 24], ['#footer .copyright-text', 0, 24]];
    const others = [];
    extra.forEach(([q, fx, fy]) => document.querySelectorAll(q).forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--fx', fx + 'px'); el.style.setProperty('--fy', fy + 'px'); el.style.setProperty('--d', i * 0.1 + 's'); others.push(el) }));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; const el = e.target; el.classList.add('visible');
      const n = el.querySelector('.num'); if (n) count(n, (parseFloat(el.style.getPropertyValue('--d')) || 0) + .8); io.unobserve(el)
    }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });
    cards.concat(others).forEach(el => io.observe(el));
    // tilt + glare
    if (!reduce && matchMedia('(hover:hover)').matches) {
      cards.forEach(c => {
        c.addEventListener('mousemove', e => {
          const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
          c.style.transform = 'perspective(1000px) rotateY(' + ((x - .5) * 16) + 'deg) rotateX(' + (-(y - .5) * 16) + 'deg) translateY(-8px) scale(1.02)'
        });
        c.addEventListener('mouseleave', () => { c.style.transform = '' });
      });
    }
  })();
        (function () {
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, hover = matchMedia('(hover:hover)').matches;
        const q = (s, r) => [...(r || document).querySelectorAll(s)];
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
          walk(el)
        };
        q('#header .navbar-list>li').forEach((li, i) => li.style.setProperty('--k', i));

        /* column-aware stagger for the card grid */
        const cards = q('#menu .menu-item');
        const cols = cards.filter(x => x.offsetTop === cards[0].offsetTop).length || 1;
        cards.forEach((c, i) => c.style.setProperty('--d', (i % cols) * .14 + 's'));

        /* soft writing: location + footer */
        q('.content-goghrafia').forEach((a, k) => soft(a, .3 + k * .4, .04));
        q('#footer .footer-title').forEach(e => soft(e, .15, .1));
        q('#footer .text-footer').forEach(e => soft(e, .45, .03));
        q('#footer .footer-list li a').forEach((a, k) => soft(a, .3 + k * .2, .1));

        /* location card enters in 3D */
        const loc = q('#contianer-goghrafia')[0];
        if (loc) {
          loc.classList.add('reveal');
          const vis = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); vis.unobserve(e.target) } }), { rootMargin: '0px 0px 150px 0px', threshold: 0 });
          vis.observe(loc)
        }

        /* 'tilting' class: quick follow while hovering, smooth return afterwards */
        if (!reduce && hover) cards.forEach(c => {
          c.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') c.classList.add('tilting') });
          c.addEventListener('pointerleave', () => c.classList.remove('tilting'))
        })
      })();