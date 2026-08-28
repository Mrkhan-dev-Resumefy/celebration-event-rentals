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
    <article class="service" style="animation-delay:${i * 60}ms">
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
    <div class="gitem ${g.c}" data-label="${g.label}" style="animation-delay:${i * 80}ms">
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
  setTimeout(() => toast.classList.remove('show'), 4000);
  form.reset();
  document.querySelectorAll('.chip.on').forEach(c => c.classList.remove('on'));
  return false;
}

// ========== SCROLL EFFECTS ==========
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

// mark sections & children reveal
document.querySelectorAll('.section-head, .step, .testi, .about-copy, .about-illus, .map-wrap, .contact-copy, .booking-form, .foot-cta').forEach(el => {
  el.classList.add('reveal');
});
// observe ALL reveals (both pre-marked and injected)
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Safety net: force-reveal anything still hidden after 2s (guards against
// dynamic injection + narrow viewports where IO doesn't fire as expected)
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in'));
}, 1500);

// ========== GSAP HERO 3D scroll parallax ==========
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.hero-3d', {
    y: -60,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  gsap.to('.hero-copy', {
    y: 40, opacity: 0.5,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}
