// ========== SERVICES DATA ==========
const SERVICES = [
  {
    name: "Bounce Houses",
    tag: "Most popular",
    desc: "Classic castles, princess themes, sports arenas. Sizes for 5 to 15 kids.",
    price: "$149",
    per: "per day",
    img: "/static/img/svc-bounce-house.jpg"
  },
  {
    name: "Water Slides",
    tag: "Summer hit",
    desc: "Splash-friendly slides from 12ft to 22ft. Full pool at the bottom.",
    price: "$189",
    per: "per day",
    img: "/static/img/svc-water-slide.jpg"
  },
  {
    name: "Popcorn Cart",
    tag: "Crowd favorite",
    desc: "Vintage red cart with real kettle popcorn. Serves 50–100 guests.",
    price: "$99",
    per: "per event",
    img: "/static/img/svc-popcorn-cart.jpg"
  },
  {
    name: "Cotton Candy",
    tag: "Sweet tooth",
    desc: "Fresh spun pink & blue cotton candy on demand. Includes attendant.",
    price: "$119",
    per: "per event",
    img: "/static/img/svc-cotton-candy.jpg"
  },
  {
    name: "Inflatable Movie Screen",
    tag: "Backyard nights",
    desc: "20-ft screen + HD projector + speakers. Perfect for movie nights.",
    price: "$249",
    per: "per night",
    img: "/static/img/svc-movie-screen.jpg"
  },
  {
    name: "Snow Cones",
    tag: "Cool off",
    desc: "10+ syrup flavors. Machine + supplies for up to 100 servings.",
    price: "$89",
    per: "per event",
    img: "/static/img/svc-snow-cones.jpg"
  },
  {
    name: "Tables & Chairs",
    tag: "Essentials",
    desc: "6-ft folding tables, kids and adult chairs. White or classic wood.",
    price: "$8",
    per: "per chair",
    img: "/static/img/svc-tables-chairs.jpg"
  },
  {
    name: "Event Tents",
    tag: "Weather-ready",
    desc: "10×10 to 20×40 canopies with sidewalls. Rain or shine, we've got you.",
    price: "$179",
    per: "per day",
    img: "/static/img/svc-event-tents.jpg"
  }
];

// Inject services
const grid = document.getElementById('servicesGrid');
if (grid) {
  grid.innerHTML = SERVICES.map((s, i) => `
    <article class="service">
      <div class="service-visual"><img src="${s.img}" alt="${s.name}" loading="lazy"></div>
      <span class="service-tag">${s.tag}</span>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-price">
        <div><b>${s.price}</b> <span>${s.per}</span></div>
        <div class="service-arrow" aria-hidden="true">→</div>
      </div>
    </article>
  `).join('');
}

// ========== GALLERY ==========
const GALLERY = [
  { c: "g1", img: "/static/img/gal-1-birthday.jpg", label: "Ana's 6th birthday" },
  { c: "g2", img: "/static/img/gal-2-movie-night.jpg", label: "Backyard movie night" },
  { c: "g3", img: "/static/img/gal-3-picnic.jpg", label: "Church picnic" },
  { c: "g4", img: "/static/img/gal-4-carnival.jpg", label: "School carnival" },
  { c: "g5", img: "/static/img/gal-5-twins.jpg", label: "Twins' 5th party" },
  { c: "g6", img: "/static/img/gal-6-splash.jpg", label: "Summer splash bash" }
];
const gg = document.getElementById('galleryGrid');
if (gg) {
  gg.innerHTML = GALLERY.map((g, i) => `
    <div class="gitem ${g.c}" data-label="${g.label}">
      <img src="${g.img}" alt="${g.label}" loading="lazy">
    </div>
  `).join('');
}

// ========== SERVICE CHIPS ==========
const chipsBox = document.getElementById('serviceChips');
if (chipsBox) {
  const chipItems = SERVICES.map(s => s.name).concat(["Face painting", "Balloon artist", "Concessions bundle"]);
  chipsBox.innerHTML = chipItems.map(c => `<div class="chip" data-value="${c}">${c}</div>`).join('');
  chipsBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) chip.classList.toggle('on');
  });
}

// ========== DATE PICKER MIN ==========
const dateInput = document.getElementById('eventDate');
if (dateInput) {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  dateInput.min = tomorrow.toISOString().split('T')[0];
}

// ========== BOOKING FORM ==========
function handleBook(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const selected = Array.from(document.querySelectorAll('.chip.on')).map(c => c.dataset.value);
  console.log('Booking:', {
    name: data.get('name'),
    phone: data.get('phone'),
    date: data.get('date'),
    services: selected,
    notes: data.get('notes')
  });
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toast._timer); // bug fix: prevent stacked timers on rapid re-submit
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4000);
  form.reset();
  document.querySelectorAll('.chip.on').forEach(c => c.classList.remove('on'));
  return false;
}

// ========== SCROLL EFFECTS ==========
const nav = document.getElementById('nav');
const progressBar = document.getElementById('scrollProgress');

let scrollTicking = false;
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = `scaleX(${Math.min(p, 1)})`;
  }
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

// ========== COUNT-UP HERO STATS ==========
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1400;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
    const val = Math.round(target * eased);
    el.textContent = val.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const statsBox = document.getElementById('heroStats');
if (statsBox && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        statsBox.querySelectorAll('b[data-count]').forEach(animateCount);
        statIO.disconnect();
      }
    });
  }, { threshold: 0.4 });
  statIO.observe(statsBox);
}

// ========== REVEAL ON SCROLL ==========
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      revealEl(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

// Reveal + clean up afterwards so reveal transitions never interfere
// with each element's own hover transitions (cards, forms, etc.)
function revealEl(el) {
  el.classList.add('in');
  const delay = parseFloat(getComputedStyle(el).getPropertyValue('--rd')) || 0;
  setTimeout(() => {
    el.classList.remove('reveal', 'reveal-left', 'reveal-right', 'reveal-zoom', 'reveal-tilt', 'in');
    el.style.removeProperty('--rd');
  }, 900 + delay);
}

// Section-level reveals with direction variants for a livelier feel
const revealMap = [
  ['.section-head', ''],
  ['.step', 'reveal-zoom'],
  ['.testi', 'reveal-tilt'],
  ['.about-illus', 'reveal-left'],
  ['.about-copy', 'reveal-right'],
  ['.map-wrap', 'reveal-zoom'],
  ['.contact-copy', 'reveal-left'],
  ['.booking-form', 'reveal-right'],
  ['.foot-cta', ''],
  ['.img-disclaimer', '']
];
revealMap.forEach(([sel, variant]) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    if (variant) el.classList.add(variant);
    el.style.setProperty('--rd', `${Math.min(i * 90, 360)}ms`);
  });
});

// Injected cards (services + gallery): scroll-triggered stagger
document.querySelectorAll('.service, .gitem').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--rd', `${(i % 4) * 80}ms`);
});

// observe ALL reveals (both pre-marked and injected)
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Safety net: force-reveal anything still hidden after 1.5s if it's already
// in the viewport (guards against IO edge cases without breaking scroll reveals)
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) revealEl(el);
  });
}, 1500);
// Absolute fallback: never leave content invisible
setTimeout(() => {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => revealEl(el));
  }
}, 100);

// ========== GSAP SCROLL ANIMATIONS ==========
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero parallax
  gsap.to('.hero-3d', {
    y: -60,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero-copy', {
    y: 40, opacity: 0.5,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // Floating hero badges drift at different speeds (parallax depth)
  gsap.to('.fb1', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } });
  gsap.to('.fb2', { y: -40, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
  gsap.to('.fb3', { y: -110, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });

  // Marquee speeds up slightly as you scroll past it
  gsap.to('.marquee-track', {
    xPercent: -8,
    ease: 'none',
    scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  // About polaroids: gentle counter-parallax as the section scrolls
  gsap.to('.polaroid.p1', {
    y: -30, rotate: -8,
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });
  gsap.to('.polaroid.p2', {
    y: 30, rotate: 7,
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
  });

  // Section headings: subtle scale-in driven by scroll position
  gsap.utils.toArray('.section-head h2').forEach((h) => {
    gsap.fromTo(h, { scale: 0.94 }, {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: h, start: 'top 95%', end: 'top 55%', scrub: 0.8 }
    });
  });
}
