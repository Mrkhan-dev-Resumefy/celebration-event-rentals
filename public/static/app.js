/* =============================================================================
   APP LOGIC
   All copy/data comes from /static/content.js (window.SITE_CONTENT).
   No prices anywhere — every item routes to a quote request.
============================================================================= */
const C = window.SITE_CONTENT || {};
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Mobile gets a trimmed animation set for load speed
const IS_MOBILE = window.matchMedia('(max-width: 860px)').matches;

/* ---------------------------------------------------------------------------
   SCROLL REVEAL ENGINE
   Declared up top because the catalog renderer calls wireReveals() while
   injecting cards — it must exist before any render runs.
   Mobile skips the directional transforms and uses a plain fade to cut paint.
--------------------------------------------------------------------------- */
const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { revealEl(e.target); io.unobserve(e.target); }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }) : null;

function revealEl(el) {
  el.classList.add('in');
  const delay = parseFloat(getComputedStyle(el).getPropertyValue('--rd')) || 0;
  setTimeout(() => {
    el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'reveal-zoom', 'reveal-tilt', 'in');
    el.style.removeProperty('--rd');
  }, 800 + delay);
}

function wireReveals(nodes, variant, step) {
  nodes.forEach((el, i) => {
    if (REDUCED) return;
    el.classList.add('reveal');
    if (variant && !IS_MOBILE) el.classList.add(variant);
    el.style.setProperty('--rd', `${Math.min(i * (step || 90), 360)}ms`);
    if (io) io.observe(el); else revealEl(el);
  });
}

/* Bug fix: an instant jump (clicking a nav anchor, restoring scroll position,
   or landing on a #hash URL) scrolls PAST sections without ever intersecting
   them, so IntersectionObserver never fires and they stay invisible forever.
   This sweep reveals anything that's already above the viewport. */
function sweepPassedReveals() {
  const pending = document.querySelectorAll('.reveal:not(.in)');
  if (!pending.length) return;
  pending.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || (r.top < window.innerHeight && r.bottom > 0)) {
      io && io.unobserve(el);
      revealEl(el);
    }
  });
}

/* ---------------------------------------------------------------------------
   PHOTO TILE — renders a real photo, or a "photo coming soon" placeholder
   so missing unit photos are visible instead of silently faked.
--------------------------------------------------------------------------- */
function photoTile(item, cls) {
  if (item.img) {
    return `<div class="${cls}">
      <img src="${item.img}" alt="${escapeAttr(item.name || item.label || '')}" loading="lazy" decoding="async">
      ${item.realPhoto ? '' : '<span class="stock-flag" title="Illustrative photo — actual unit may differ">illustrative</span>'}
    </div>`;
  }
  return `<div class="${cls} photo-soon">
    <span class="ps-emoji" aria-hidden="true">📷</span>
    <span class="ps-text">Photo of our unit<br>coming soon</span>
  </div>`;
}
function escapeAttr(s) {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

/* ---------------------------------------------------------------------------
   1. CATALOG — grouped into 4 categories with filter tabs
--------------------------------------------------------------------------- */
const catalogGrid = document.getElementById('catalogGrid');
const catTabs = document.getElementById('catTabs');

function renderCatalog(filter) {
  if (!catalogGrid) return;
  const items = filter === 'all' ? C.CATALOG : C.CATALOG.filter(i => i.cat === filter);
  catalogGrid.innerHTML = items.map(s => `
    <article class="service${s.top ? ' service-top' : ''}" data-cat="${s.cat}">
      ${photoTile(s, 'service-visual')}
      <div class="service-tags">
        <span class="service-tag">${s.tag}</span>
        ${s.top ? '<span class="service-tag tag-top">⭐ Top seller</span>' : ''}
      </div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-foot">
        <button class="quote-link" type="button" data-item="${escapeAttr(s.name)}">Request a quote</button>
        <span class="service-arrow" aria-hidden="true">→</span>
      </div>
    </article>
  `).join('');
  // Reveal the freshly rendered cards
  wireReveals(catalogGrid.querySelectorAll('.service'), '', 70);
}

if (catTabs && C.CATEGORIES) {
  catTabs.innerHTML =
    `<button class="cat-tab on" data-cat="all">All rentals</button>` +
    C.CATEGORIES.map(c => `<button class="cat-tab" data-cat="${c.id}">${c.emoji} ${c.label}</button>`).join('');
  catTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-tab');
    if (!btn) return;
    catTabs.querySelectorAll('.cat-tab').forEach(b => b.classList.toggle('on', b === btn));
    renderCatalog(btn.dataset.cat);
  });
}
renderCatalog('all');

// "Request a quote" on any card / bundle → prefill the form and jump to it
document.addEventListener('click', (e) => {
  const link = e.target.closest('.quote-link');
  if (!link) return;
  const item = link.dataset.item;
  preselectChip(item);
  document.getElementById('contact')?.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
});

function preselectChip(label) {
  const chips = document.querySelectorAll('#serviceChips .chip');
  let hit = false;
  chips.forEach(ch => {
    if (ch.dataset.value === label) { ch.classList.add('on'); hit = true; }
  });
  if (!hit) {
    const notes = document.querySelector('[name="notes"]');
    if (notes && !notes.value.includes(label)) {
      notes.value = (notes.value ? notes.value.trim() + '\n' : '') + `Interested in: ${label}`;
    }
  }
}

/* ---------------------------------------------------------------------------
   2. BUNDLES
--------------------------------------------------------------------------- */
const bundleGrid = document.getElementById('bundleGrid');
if (bundleGrid && C.BUNDLES) {
  bundleGrid.innerHTML = C.BUNDLES.map(b => `
    <article class="bundle b-${b.accent}${b.best ? ' bundle-best' : ''}">
      ${b.best ? '<span class="bundle-flag">Most popular</span>' : ''}
      <div class="bundle-emoji" aria-hidden="true">${b.emoji}</div>
      <h3>${b.name}</h3>
      ${b.seasonal ? `<span class="bundle-season">🗓 ${b.seasonal}</span>` : ''}
      <p class="bundle-blurb">${b.blurb}</p>
      <ul class="bundle-list">
        ${b.includes.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <p class="bundle-save">${b.saving}</p>
      <button class="btn btn-primary bundle-btn quote-link" type="button" data-item="${escapeAttr(b.name + ' bundle')}">
        Get bundle quote →
      </button>
    </article>
  `).join('');
}

/* ---------------------------------------------------------------------------
   3. GALLERY
--------------------------------------------------------------------------- */
const gg = document.getElementById('galleryGrid');
if (gg && C.GALLERY) {
  gg.innerHTML = C.GALLERY.map(g => `
    <div class="gitem ${g.c}" data-label="${escapeAttr(g.label)}">
      <img src="${g.img}" alt="${escapeAttr(g.label)}" loading="lazy" decoding="async">
    </div>
  `).join('');
}

/* ---------------------------------------------------------------------------
   4. REVIEWS (Google)
--------------------------------------------------------------------------- */
const reviewGrid = document.getElementById('reviewGrid');
if (reviewGrid && C.REVIEWS) {
  reviewGrid.innerHTML = C.REVIEWS.map(r => `
    <figure class="testi${r.highlight ? ' hi' : ''}${r.placeholder ? ' testi-placeholder' : ''}">
      ${r.placeholder ? '<span class="ph-flag">Placeholder — paste a real Google review</span>' : ''}
      <div class="g-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.4-.2-2H12v3.9h6c-.1 1-.8 2.5-2.2 3.5v2.6h3.4c2-1.9 3.4-4.7 3.4-8z"/><path fill="#34A853" d="M12 23c2.9 0 5.3-1 7.1-2.6l-3.4-2.6c-.9.6-2.2 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H2.4v2.7C4.2 20.6 7.8 23 12 23z"/><path fill="#FBBC05" d="M5.9 14.4a6.8 6.8 0 0 1 0-4.3V7.4H2.4a11 11 0 0 0 0 9.7l3.5-2.7z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3-3C17.3 2.3 14.9 1 12 1 7.8 1 4.2 3.4 2.4 7.4l3.5 2.7C6.8 7.4 9.2 5.4 12 5.4z"/></svg>
        Google review
      </div>
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <blockquote>${r.text}</blockquote>
      <figcaption>
        <div class="avi" style="background:${r.color}${r.dark ? ';color:#1a1a2e' : ''}">${r.initial}</div>
        <div><b>${r.name}</b><span>${r.meta}</span></div>
      </figcaption>
    </figure>
  `).join('');
}
const gRating = document.getElementById('gRating');
if (gRating) {
  if (C.GOOGLE_RATING && C.GOOGLE_REVIEW_COUNT) {
    gRating.innerHTML = `<b>${C.GOOGLE_RATING}★</b> average from ${C.GOOGLE_REVIEW_COUNT} Google reviews`;
  } else {
    gRating.remove();
  }
}
const gLink = document.getElementById('gLink');
if (gLink && C.GOOGLE_REVIEWS_URL) gLink.href = C.GOOGLE_REVIEWS_URL;

/* ---------------------------------------------------------------------------
   5. SERVICE AREA — real suburb lists
--------------------------------------------------------------------------- */
function fillArea(id, list) {
  const box = document.getElementById(id);
  if (box && list) box.innerHTML = list.map(t => `<span class="town">${t}</span>`).join('');
}
fillArea('areaFree', C.SERVICE_AREA?.free);
fillArea('areaExt', C.SERVICE_AREA?.extended);
const hqName = document.getElementById('hqName');
if (hqName && C.SERVICE_AREA?.hq) hqName.textContent = C.SERVICE_AREA.hq;

/* ---------------------------------------------------------------------------
   6. AVAILABILITY CALENDAR
   Local, dependency-free month view. Weekend-load heuristics stand in for a
   real inventory feed — swap `fetchAvailability()` for your Checkfront /
   Rentals United endpoint and the UI keeps working unchanged.
--------------------------------------------------------------------------- */
const CAL = {
  cursor: new Date(),
  data: {},          // 'YYYY-MM-DD' -> 'open' | 'limited' | 'full'
  selected: null
};
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* Deterministic stand-in availability.
   TODO(owner): replace the body of this function with a fetch() to your
   booking provider. It must resolve to { 'YYYY-MM-DD': 'open'|'limited'|'full' }. */
function fetchAvailability(year, month) {
  const out = {};
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay();
    // Deterministic pseudo-random so the calendar is stable across renders
    const seed = (year * 372 + month * 31 + d) % 97;
    let status = 'open';
    if (dow === 6) status = seed % 5 === 0 ? 'full' : (seed % 2 === 0 ? 'limited' : 'open');   // Saturdays busiest
    else if (dow === 0) status = seed % 7 === 0 ? 'full' : (seed % 3 === 0 ? 'limited' : 'open');
    else if (dow === 5) status = seed % 4 === 0 ? 'limited' : 'open';
    out[ymd(date)] = status;
  }
  return Promise.resolve(out);
}

function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const label = document.getElementById('calLabel');
  if (!grid || !label) return;

  const y = CAL.cursor.getFullYear();
  const m = CAL.cursor.getMonth();
  label.textContent = `${MONTHS[m]} ${y}`;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const first = new Date(y, m, 1);
  const startPad = first.getDay();
  const days = new Date(y, m + 1, 0).getDate();

  let html = ['S','M','T','W','T','F','S']
    .map(d => `<span class="cal-dow">${d}</span>`).join('');
  for (let i = 0; i < startPad; i++) html += '<span class="cal-pad"></span>';

  for (let d = 1; d <= days; d++) {
    const date = new Date(y, m, d);
    const key = ymd(date);
    const past = date < today;
    const status = past ? 'past' : (CAL.data[key] || 'open');
    const sel = CAL.selected === key ? ' sel' : '';
    const aria = past ? 'Past date' :
      status === 'full' ? 'Fully booked' :
      status === 'limited' ? 'Limited availability' : 'Available';
    html += `<button type="button" class="cal-day s-${status}${sel}" data-date="${key}"
      ${past || status === 'full' ? 'disabled' : ''}
      aria-label="${MONTHS[m]} ${d}, ${y} — ${aria}">
      <span class="cd-n">${d}</span><span class="cd-dot" aria-hidden="true"></span>
    </button>`;
  }
  grid.innerHTML = html;
}

function loadMonth() {
  const grid = document.getElementById('calGrid');
  if (grid) grid.classList.add('cal-loading');
  fetchAvailability(CAL.cursor.getFullYear(), CAL.cursor.getMonth()).then(data => {
    CAL.data = Object.assign({}, CAL.data, data);
    renderCalendar();
    grid?.classList.remove('cal-loading');
  });
}

const calGridEl = document.getElementById('calGrid');
if (calGridEl) {
  loadMonth();
  document.getElementById('calPrev')?.addEventListener('click', () => {
    const now = new Date();
    // don't page back before the current month
    if (CAL.cursor.getFullYear() === now.getFullYear() && CAL.cursor.getMonth() === now.getMonth()) return;
    CAL.cursor = new Date(CAL.cursor.getFullYear(), CAL.cursor.getMonth() - 1, 1);
    loadMonth();
  });
  document.getElementById('calNext')?.addEventListener('click', () => {
    CAL.cursor = new Date(CAL.cursor.getFullYear(), CAL.cursor.getMonth() + 1, 1);
    loadMonth();
  });
  calGridEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.cal-day');
    if (!btn || btn.disabled) return;
    CAL.selected = btn.dataset.date;
    renderCalendar();
    const dateInput = document.getElementById('eventDate');
    if (dateInput) dateInput.value = CAL.selected;
    const picked = document.getElementById('calPicked');
    if (picked) {
      const [yy, mm, dd] = CAL.selected.split('-').map(Number);
      const status = CAL.data[CAL.selected] || 'open';
      picked.innerHTML = `<b>${MONTHS[mm - 1]} ${dd}, ${yy}</b> — ${
        status === 'limited' ? 'limited units left, ask us early' : 'good availability'
      }. <a href="#contact">Request this date →</a>`;
      picked.classList.add('on');
    }
  });
}

/* ---------------------------------------------------------------------------
   7. BOOKING FORM
--------------------------------------------------------------------------- */
const chipsBox = document.getElementById('serviceChips');
if (chipsBox && C.CATALOG) {
  const names = (C.BUNDLES || []).map(b => b.name + ' bundle')
    .concat(C.CATALOG.map(s => s.name));
  chipsBox.innerHTML = names.map(c => `<div class="chip" data-value="${escapeAttr(c)}" role="button" tabindex="0">${c}</div>`).join('');
  const toggle = (chip) => chip.classList.toggle('on');
  chipsBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) toggle(chip);
  });
  chipsBox.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const chip = e.target.closest('.chip');
    if (chip) { e.preventDefault(); toggle(chip); }
  });
}

const dateInput = document.getElementById('eventDate');
if (dateInput) {
  const tomorrow = new Date(Date.now() + 86400000);
  dateInput.min = ymd(tomorrow);
}

function handleBook(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const selected = Array.from(document.querySelectorAll('.chip.on')).map(c => c.dataset.value);
  console.log('Booking:', {
    name: data.get('name'), phone: data.get('phone'),
    date: data.get('date'), services: selected, notes: data.get('notes')
  });
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
  form.reset();
  document.querySelectorAll('.chip.on').forEach(c => c.classList.remove('on'));
  return false;
}
window.handleBook = handleBook;

/* ---------------------------------------------------------------------------
   8. SCROLL PROGRESS + NAV (rAF-throttled)
--------------------------------------------------------------------------- */
const nav = document.getElementById('nav');
const progressBar = document.getElementById('scrollProgress');
let scrollTicking = false;
function onScroll() {
  nav?.classList.toggle('scrolled', window.scrollY > 20);
  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  }
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
onScroll();

/* ---------------------------------------------------------------------------
   9. COUNT-UP HERO STATS
--------------------------------------------------------------------------- */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1200, start = performance.now();
  (function frame(now) {
    const t = Math.min(((now || performance.now()) - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(frame);
  })(start);
}
const statsBox = document.getElementById('heroStats');
if (statsBox && !REDUCED) {
  const statIO = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      statsBox.querySelectorAll('b[data-count]').forEach(animateCount);
      statIO.disconnect();
    }
  }, { threshold: 0.4 });
  statIO.observe(statsBox);
}

/* ---------------------------------------------------------------------------
   10. REVEAL ON SCROLL — wire up the sections
--------------------------------------------------------------------------- */
[
  ['.section-head', ''],
  ['.step', 'reveal-zoom'],
  ['.bundle', 'reveal-tilt'],
  ['.testi', 'reveal-tilt'],
  ['.about-illus', 'reveal-left'],
  ['.about-copy', 'reveal-right'],
  ['.area-card', 'reveal-zoom'],
  ['.cal-wrap', 'reveal-zoom'],
  ['.contact-copy', 'reveal-left'],
  ['.booking-form', 'reveal-right'],
  ['.foot-cta', ''],
  ['.img-disclaimer', ''],
  ['.gitem', '']
].forEach(([sel, variant]) => wireReveals(document.querySelectorAll(sel), variant));

// Sweep on load, after any anchor jump, and periodically while scrolling fast
setTimeout(sweepPassedReveals, 1200);
window.addEventListener('hashchange', () => setTimeout(sweepPassedReveals, 700));
document.addEventListener('click', (e) => {
  if (e.target.closest('a[href^="#"]')) setTimeout(sweepPassedReveals, 800);
});
window.addEventListener('scroll', () => {
  clearTimeout(window._sweepT);
  window._sweepT = setTimeout(sweepPassedReveals, 250);
}, { passive: true });

/* ---------------------------------------------------------------------------
   11. GSAP PARALLAX — desktop only.
   Called by scene.js once GSAP has been lazy-loaded. On mobile and under
   reduced-motion the library is never downloaded at all (~70 KB saved).
--------------------------------------------------------------------------- */
window.initGsapAnimations = function () {
  if (!window.gsap || !window.ScrollTrigger || IS_MOBILE || REDUCED) return;
  gsap.registerPlugin(ScrollTrigger);
  const heroST = { trigger: '.hero', start: 'top top', end: 'bottom top' };

  gsap.to('.hero-3d',   { y: -60, scrollTrigger: { ...heroST, scrub: 1 } });
  gsap.to('.hero-copy', { y: 40, opacity: .5, scrollTrigger: { ...heroST, scrub: 1 } });
  gsap.to('.fb1', { y: -80,  scrollTrigger: { ...heroST, scrub: 1.2 } });
  gsap.to('.fb2', { y: -40,  scrollTrigger: { ...heroST, scrub: .8 } });
  gsap.to('.fb3', { y: -110, scrollTrigger: { ...heroST, scrub: 1.5 } });

  gsap.to('.polaroid.p1', { y: -30, rotate: -8, scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
  gsap.to('.polaroid.p2', { y: 30,  rotate: 7,  scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });

  gsap.utils.toArray('.section-head h2').forEach((h) => {
    gsap.fromTo(h, { scale: .95 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: h, start: 'top 95%', end: 'top 55%', scrub: .8 }
    });
  });
};
