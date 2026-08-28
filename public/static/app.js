// ========== SERVICES DATA ==========
const SERVICES = [
  {
    name: "Bounce Houses",
    tag: "Most popular",
    desc: "Classic castles, princess themes, sports arenas. Sizes for 5 to 15 kids.",
    price: "$149",
    per: "per day",
    bg: "sv-red",
    icon: `<svg viewBox="0 0 100 100"><rect x="15" y="35" width="70" height="50" rx="6" fill="#E63946" stroke="#1a1a2e" stroke-width="3"/><path d="M15 55 L85 55" stroke="#fff" stroke-width="3"/><path d="M15 25 Q 50 5, 85 25 L 85 40 L 15 40 Z" fill="#FFD60A" stroke="#1a1a2e" stroke-width="3"/><path d="M25 40 L25 25 M40 40 L40 20 M55 40 L55 20 M70 40 L70 25" stroke="#1a1a2e" stroke-width="2"/><rect x="40" y="60" width="20" height="25" fill="#2A6FDB" stroke="#1a1a2e" stroke-width="3"/><path d="M50 15 L50 5" stroke="#1a1a2e" stroke-width="2"/><polygon points="50,5 58,8 50,10" fill="#E63946"/></svg>`
  },
  {
    name: "Water Slides",
    tag: "Summer hit",
    desc: "Splash-friendly slides from 12ft to 22ft. Full pool at the bottom.",
    price: "$189",
    per: "per day",
    bg: "sv-blue",
    icon: `<svg viewBox="0 0 100 100"><path d="M20 30 Q 30 20, 45 30 L 55 70 Q 60 85, 75 85 L 90 85" fill="none" stroke="#2A6FDB" stroke-width="8" stroke-linecap="round"/><path d="M20 30 Q 30 20, 45 30 L 55 70 Q 60 85, 75 85 L 90 85" fill="none" stroke="#7FB0FF" stroke-width="4" stroke-linecap="round"/><ellipse cx="75" cy="88" rx="15" ry="4" fill="#2A6FDB" opacity="0.5"/><circle cx="30" cy="22" r="3" fill="#FFD60A"/><circle cx="40" cy="18" r="2" fill="#fff"/></svg>`
  },
  {
    name: "Popcorn Cart",
    tag: "Crowd favorite",
    desc: "Vintage red cart with real kettle popcorn. Serves 50–100 guests.",
    price: "$99",
    per: "per event",
    bg: "sv-red",
    icon: `<svg viewBox="0 0 100 100"><rect x="25" y="35" width="50" height="30" fill="#E63946" stroke="#1a1a2e" stroke-width="3"/><line x1="30" y1="35" x2="30" y2="65" stroke="#fff" stroke-width="2"/><line x1="40" y1="35" x2="40" y2="65" stroke="#fff" stroke-width="2"/><line x1="60" y1="35" x2="60" y2="65" stroke="#fff" stroke-width="2"/><line x1="70" y1="35" x2="70" y2="65" stroke="#fff" stroke-width="2"/><rect x="27" y="20" width="46" height="18" fill="rgba(255,255,255,0.4)" stroke="#1a1a2e" stroke-width="2"/><circle cx="35" cy="27" r="3" fill="#FFF3B0"/><circle cx="45" cy="24" r="3" fill="#FFF3B0"/><circle cx="55" cy="27" r="3" fill="#FFF3B0"/><circle cx="65" cy="24" r="3" fill="#FFF3B0"/><polygon points="25,20 75,20 65,10 35,10" fill="#FFD60A" stroke="#1a1a2e" stroke-width="2"/><circle cx="35" cy="72" r="6" fill="#1a1a2e"/><circle cx="65" cy="72" r="6" fill="#1a1a2e"/></svg>`
  },
  {
    name: "Cotton Candy",
    tag: "Sweet tooth",
    desc: "Fresh spun pink & blue cotton candy on demand. Includes attendant.",
    price: "$119",
    per: "per event",
    bg: "sv-mix",
    icon: `<svg viewBox="0 0 100 100"><rect x="45" y="45" width="10" height="40" fill="#8B5A2B"/><ellipse cx="50" cy="35" rx="30" ry="25" fill="#FFB3D9"/><ellipse cx="35" cy="30" rx="12" ry="10" fill="#FFC9E3"/><ellipse cx="60" cy="25" rx="10" ry="8" fill="#FFC9E3"/><ellipse cx="68" cy="40" rx="8" ry="7" fill="#B3E0FF"/><ellipse cx="30" cy="45" rx="9" ry="7" fill="#B3E0FF"/><circle cx="42" cy="35" r="2" fill="#fff"/><circle cx="55" cy="32" r="2" fill="#fff"/></svg>`
  },
  {
    name: "Inflatable Movie Screen",
    tag: "Backyard nights",
    desc: "20-ft screen + HD projector + speakers. Perfect for movie nights.",
    price: "$249",
    per: "per night",
    bg: "sv-cream",
    icon: `<svg viewBox="0 0 100 100"><rect x="15" y="15" width="70" height="50" rx="4" fill="#1a1a2e" stroke="#FFD60A" stroke-width="3"/><rect x="20" y="20" width="60" height="40" fill="#2A6FDB"/><polygon points="45,30 45,50 60,40" fill="#FFD60A"/><rect x="30" y="65" width="8" height="20" fill="#1a1a2e"/><rect x="62" y="65" width="8" height="20" fill="#1a1a2e"/><rect x="15" y="80" width="70" height="6" fill="#8B5A2B"/></svg>`
  },
  {
    name: "Snow Cones",
    tag: "Cool off",
    desc: "10+ syrup flavors. Machine + supplies for up to 100 servings.",
    price: "$89",
    per: "per event",
    bg: "sv-blue",
    icon: `<svg viewBox="0 0 100 100"><path d="M35 40 L65 40 L50 85 Z" fill="#F4D19B" stroke="#1a1a2e" stroke-width="3"/><path d="M35 40 L65 40 L60 55 L40 55 Z" fill="#E8B979"/><ellipse cx="50" cy="40" rx="18" ry="10" fill="#7FC8FF" stroke="#1a1a2e" stroke-width="3"/><ellipse cx="43" cy="34" rx="8" ry="6" fill="#B3E0FF"/><ellipse cx="55" cy="32" rx="6" ry="4" fill="#FFB3D9"/><path d="M50 25 Q 55 20, 60 25" stroke="#E63946" stroke-width="2" fill="none"/><circle cx="55" cy="35" r="2" fill="#fff"/></svg>`
  },
  {
    name: "Tables & Chairs",
    tag: "Essentials",
    desc: "6-ft folding tables, kids and adult chairs. White or classic wood.",
    price: "$8",
    per: "per chair",
    bg: "sv-cream",
    icon: `<svg viewBox="0 0 100 100"><rect x="15" y="35" width="70" height="8" fill="#FFD60A" stroke="#1a1a2e" stroke-width="3"/><rect x="20" y="43" width="6" height="30" fill="#1a1a2e"/><rect x="74" y="43" width="6" height="30" fill="#1a1a2e"/><rect x="60" y="55" width="20" height="4" fill="#E63946" stroke="#1a1a2e" stroke-width="2"/><rect x="60" y="55" width="4" height="25" fill="#1a1a2e"/><rect x="76" y="55" width="4" height="25" fill="#1a1a2e"/><rect x="60" y="45" width="20" height="12" fill="none" stroke="#1a1a2e" stroke-width="2"/></svg>`
  },
  {
    name: "Event Tents",
    tag: "Weather-ready",
    desc: "10×10 to 20×40 canopies with sidewalls. Rain or shine, we've got you.",
    price: "$179",
    per: "per day",
    bg: "sv-yellow",
    icon: `<svg viewBox="0 0 100 100"><polygon points="15,45 50,15 85,45 85,50 15,50" fill="#E63946" stroke="#1a1a2e" stroke-width="3"/><polygon points="25,45 50,25 75,45 65,45 50,32 35,45" fill="#fff" stroke="#1a1a2e" stroke-width="2"/><rect x="18" y="50" width="4" height="35" fill="#1a1a2e"/><rect x="78" y="50" width="4" height="35" fill="#1a1a2e"/><rect x="15" y="83" width="70" height="4" fill="#8B5A2B"/><path d="M40 60 L 60 60" stroke="#FFD60A" stroke-width="2"/></svg>`
  }
];

// Inject services
const grid = document.getElementById('servicesGrid');
if (grid) {
  grid.innerHTML = SERVICES.map((s, i) => `
    <article class="service" style="animation-delay:${i * 60}ms">
      <div class="service-visual ${s.bg}">${s.icon}</div>
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
  { c: "g1", ph: "ph-1", emoji: "🎂", label: "Ana's 6th birthday" },
  { c: "g2", ph: "ph-2", emoji: "🎬", label: "Backyard movie night" },
  { c: "g3", ph: "ph-3", emoji: "🍿", label: "Church picnic" },
  { c: "g4", ph: "ph-4", emoji: "🎪", label: "School carnival" },
  { c: "g5", ph: "ph-5", emoji: "🏰", label: "Twins' 5th party" },
  { c: "g6", ph: "ph-6", emoji: "💦", label: "Summer splash bash" }
];
const gg = document.getElementById('galleryGrid');
if (gg) {
  gg.innerHTML = GALLERY.map((g, i) => `
    <div class="gitem ${g.c}" data-label="${g.label}" style="animation-delay:${i * 80}ms">
      <div class="ph ${g.ph}" data-emoji="${g.emoji}"></div>
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
