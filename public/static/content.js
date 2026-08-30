/* =============================================================================
   CONTENT FILE — EDIT THIS ONE FILE TO UPDATE THE SITE
   -----------------------------------------------------------------------------
   Everything a non-developer needs to change lives here: service-area suburbs,
   Google reviews, the rental catalog, bundles, and add-ons.

   ⚠️  ITEMS MARKED  «REPLACE ME»  ARE PLACEHOLDERS AND MUST BE SWAPPED FOR REAL
       BUSINESS CONTENT BEFORE LAUNCH. See CONTENT-CHECKLIST.md in the repo root.

   NOTE ON PRICING: this site intentionally shows NO prices. Every item routes to
   "Request a quote". Do not add price fields back without a business decision.
============================================================================= */

/* -----------------------------------------------------------------------------
   1. SERVICE AREA — real Dallas–Fort Worth suburbs
   Free zone = 25 mi of the warehouse. Extended = 40 mi (delivery fee applies).
----------------------------------------------------------------------------- */
const SERVICE_AREA = {
  hq: "Garland, TX",
  free: [
    "Dallas", "Garland", "Richardson", "Plano", "Allen", "Rowlett",
    "Sachse", "Wylie", "Murphy", "Mesquite", "Addison", "Carrollton",
    "Farmers Branch", "Irving", "University Park", "Highland Park",
    "Balch Springs", "Sunnyvale", "Lake Highlands", "Rockwall"
  ],
  extended: [
    "Frisco", "McKinney", "Prosper", "Celina", "Little Elm", "The Colony",
    "Lewisville", "Flower Mound", "Coppell", "Grand Prairie", "Duncanville",
    "DeSoto", "Cedar Hill", "Forney", "Terrell", "Fate", "Heath",
    "Princeton", "Anna", "Melissa"
  ]
};

/* -----------------------------------------------------------------------------
   2. GOOGLE REVIEWS
   «REPLACE ME» — Paste your REAL Google reviews below.

   How to do it in 5 minutes:
     1. Open your Google Business Profile → Reviews.
     2. For each review copy: reviewer first name + last initial, star rating,
        the review text (verbatim — do not edit or embellish), and the month/year.
     3. Replace the objects below. Delete any you don't use.
     4. Set GOOGLE_REVIEWS_URL to your profile's review link.

   Only paste reviews that were genuinely left on Google. Never write your own.
----------------------------------------------------------------------------- */
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Events+%26+Rentals+.io+Garland+TX+reviews"; // «REPLACE ME» with your Google review link
const GOOGLE_RATING = null;        // «REPLACE ME» e.g. 4.9  (null hides the rating pill)
const GOOGLE_REVIEW_COUNT = null;  // «REPLACE ME» e.g. 87   (null hides the count)

const REVIEWS = [
  {
    placeholder: true,               // ← delete this line once it's a real review
    name: "«Reviewer name»",
    initial: "?",
    color: "#E63946",
    stars: 5,
    text: "Paste a real Google review here, word for word. Keep the reviewer's own wording — it reads more honestly than anything we could write, and Google's terms require reviews be shown as written.",
    meta: "Event type · Month 2026"
  },
  {
    placeholder: true,
    name: "«Reviewer name»",
    initial: "?",
    color: "#2A6FDB",
    stars: 5,
    text: "Paste a real Google review here, word for word. Aim for three to six reviews that each mention a different rental (bounce house, movie screen, concessions) so visitors see the range.",
    meta: "Event type · Month 2026",
    highlight: true
  },
  {
    placeholder: true,
    name: "«Reviewer name»",
    initial: "?",
    color: "#FFD60A",
    dark: true,
    stars: 5,
    text: "Paste a real Google review here, word for word. Reviews that name a specific suburb ('delivered to our house in Plano') are especially useful for local search.",
    meta: "Event type · Month 2026"
  }
];

/* -----------------------------------------------------------------------------
   3. RENTAL CATALOG — grouped into 4 categories
   Categories: inflatables | concessions | tables | addons

   PHOTOS: `img` should point at a photo of YOUR ACTUAL UNIT.
   Drop files into  public/static/img/units/  and reference them like
   "/static/img/units/castle-bounce-house.jpg".
   Any item left with  img: null  renders a branded "photo coming soon" tile —
   a visual reminder that a real photo is still owed.
----------------------------------------------------------------------------- */
const CATEGORIES = [
  { id: "inflatables", label: "Inflatables",     emoji: "🏰" },
  { id: "concessions", label: "Concessions",     emoji: "🍿" },
  { id: "tables",      label: "Tables & Decor",  emoji: "🪑" },
  { id: "addons",      label: "Add-ons",         emoji: "✨" }
];

const CATALOG = [
  /* ---------- INFLATABLES ---------- */
  {
    cat: "inflatables",
    name: "Standard Bounce Houses",
    tag: "Most booked",
    top: true,
    desc: "Classic castles, princess and sports themes. Sizes for 5 to 15 kids. Our deepest inventory — easiest date to secure.",
    img: "/static/img/svc-bounce-house.jpg",
    realPhoto: false
  },
  {
    cat: "inflatables",
    name: "Combo Units (Bounce + Slide)",
    tag: "Best upsell",
    top: true,
    desc: "Bounce floor plus an attached slide in one unit. Twice the fun on the same footprint — our most requested upgrade.",
    img: null,
    realPhoto: false
  },
  {
    cat: "inflatables",
    name: "Water Slides",
    tag: "Seasonal · Apr–Sep",
    top: true,
    desc: "Splash-friendly slides from 12 ft to 22 ft with a pool at the bottom. Two-person crew setup, so book early in summer.",
    img: "/static/img/svc-water-slide.jpg",
    realPhoto: false
  },
  {
    cat: "inflatables",
    name: "Obstacle Courses",
    tag: "Big groups",
    desc: "Head-to-head racing lanes for school field days, church events and block parties. Needs a wide, flat run.",
    img: null,
    realPhoto: false
  },
  {
    cat: "inflatables",
    name: "Inflatable Movie Screen",
    tag: "Most booked",
    top: true,
    desc: "20 ft screen with HD projector and speakers. Turns a driveway or field into an outdoor cinema after dark.",
    img: "/static/img/svc-movie-screen.jpg",
    realPhoto: false
  },

  /* ---------- CONCESSIONS ---------- */
  {
    cat: "concessions",
    name: "Popcorn Cart",
    tag: "Most booked",
    top: true,
    desc: "Vintage red cart popping real kettle corn. Serves 50–100 guests. Quick single-driver setup.",
    img: "/static/img/svc-popcorn-cart.jpg",
    realPhoto: false
  },
  {
    cat: "concessions",
    name: "Cotton Candy Cart",
    tag: "Most booked",
    top: true,
    desc: "Fresh-spun pink and blue cotton candy on demand, attendant included. Pairs with almost every booking.",
    img: "/static/img/svc-cotton-candy.jpg",
    realPhoto: false
  },
  {
    cat: "concessions",
    name: "Kona Ice / Shaved Ice",
    tag: "Summer favorite",
    desc: "Hawaiian-style shaved ice with 10+ syrup flavors. The go-to for hot Texas afternoons.",
    img: "/static/img/svc-snow-cones.jpg",
    realPhoto: false
  },
  {
    cat: "concessions",
    name: "Slushie Machine",
    tag: "Crowd pleaser",
    desc: "Twin-barrel frozen drink machine, two flavors at once. Non-alcoholic mixes for kids, adult mixes on request.",
    img: null,
    realPhoto: false
  },
  {
    cat: "concessions",
    name: "Chocolate Fountain",
    tag: "Showstopper",
    desc: "Three-tier flowing chocolate with strawberries, pretzels and marshmallows. Great for quinceañeras and weddings.",
    img: null,
    realPhoto: false
  },

  /* ---------- TABLES & DECOR ---------- */
  {
    cat: "tables",
    name: "Tables & Chairs",
    tag: "Essentials",
    desc: "6 ft folding tables plus kid and adult chairs, white or classic wood. Fast solo-driver drop-off.",
    img: "/static/img/svc-tables-chairs.jpg",
    realPhoto: false
  },
  {
    cat: "tables",
    name: "Event Tents & Canopies",
    tag: "Weather-ready",
    desc: "10×10 up to 20×40 canopies with optional sidewalls. Shade in July, cover in October.",
    img: "/static/img/svc-event-tents.jpg",
    realPhoto: false
  },
  {
    cat: "tables",
    name: "Decor & Balloon Styling",
    tag: "Photo-ready",
    desc: "Balloon garlands, backdrops, themed table settings and signage built around your colors.",
    img: null,
    realPhoto: false
  },

  /* ---------- ADD-ONS ---------- */
  {
    cat: "addons",
    name: "Event Photography",
    tag: "Keep the memories",
    desc: "A photographer on site for part or all of your event, with edited galleries delivered after.",
    img: null,
    realPhoto: false
  },
  {
    cat: "addons",
    name: "Drone Photo & Video",
    tag: "New",
    desc: "Aerial stills and video — ideal for big block parties, school events and church picnics.",
    img: null,
    realPhoto: false
  },
  {
    cat: "addons",
    name: "Generator & Power",
    tag: "Park-friendly",
    desc: "Quiet generators so inflatables and carts run anywhere — parks, fields, lots with no outlet.",
    img: null,
    realPhoto: false
  },
  {
    cat: "addons",
    name: "Face Painting & Balloon Artist",
    tag: "Entertainer",
    desc: "Hourly entertainers who keep the line moving and the kids busy between bounce sessions.",
    img: null,
    realPhoto: false
  }
];

/* -----------------------------------------------------------------------------
   4. BUNDLES — 4 packages built from top sellers.
   Bundle pricing is handled on the quote, not on the site.
----------------------------------------------------------------------------- */
const BUNDLES = [
  {
    name: "Backyard Birthday",
    emoji: "🎂",
    accent: "red",
    best: true,
    blurb: "Our number-one seller. Everything a 20–30 kid birthday actually needs.",
    includes: [
      "Standard bounce house (your theme)",
      "Popcorn cart with attendant",
      "2 tables + 12 kids' chairs"
    ],
    saving: "Bundled rate — lower than booking the three separately."
  },
  {
    name: "Block Party",
    emoji: "🎪",
    accent: "blue",
    blurb: "Built for cul-de-sacs, HOAs and church picnics with a big guest count.",
    includes: [
      "Combo unit (bounce + slide)",
      "Cotton candy cart",
      "Kona ice / shaved ice",
      "10×20 canopy tent"
    ],
    saving: "Bundled rate — lower than booking the four separately."
  },
  {
    name: "Movie Night",
    emoji: "🎬",
    accent: "yellow",
    blurb: "Driveway turns into a cinema. Best value after-dark package we offer.",
    includes: [
      "20 ft inflatable movie screen",
      "HD projector + speakers",
      "Popcorn cart with attendant",
      "4 tables + 16 chairs"
    ],
    saving: "Bundled rate — lower than booking the screen and cart separately."
  },
  {
    name: "Summer Splash",
    emoji: "💦",
    accent: "blue",
    seasonal: "April – September",
    blurb: "Beat the Texas heat. Two-person crew job, so lock the date in early.",
    includes: [
      "Water slide (12–22 ft)",
      "Kona ice / shaved ice",
      "Slushie machine",
      "10×10 shade canopy"
    ],
    saving: "Bundled rate — lower than booking the four separately."
  }
];

/* -----------------------------------------------------------------------------
   5. GALLERY
   «REPLACE ME» — swap in photos from your own events as you collect them.
   Ask customers for permission before posting photos with children in them.
----------------------------------------------------------------------------- */
const GALLERY = [
  { c: "g1", img: "/static/img/gal-1-birthday.jpg",    label: "Backyard birthday",  realPhoto: false },
  { c: "g2", img: "/static/img/gal-2-movie-night.jpg", label: "Movie night",        realPhoto: false },
  { c: "g3", img: "/static/img/gal-3-picnic.jpg",      label: "Church picnic",      realPhoto: false },
  { c: "g4", img: "/static/img/gal-4-carnival.jpg",    label: "School carnival",    realPhoto: false },
  { c: "g5", img: "/static/img/gal-5-twins.jpg",       label: "Combo unit setup",   realPhoto: false },
  { c: "g6", img: "/static/img/gal-6-splash.jpg",      label: "Summer splash day",  realPhoto: false }
];

/* Expose for app.js */
window.SITE_CONTENT = {
  SERVICE_AREA, REVIEWS, GOOGLE_REVIEWS_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT,
  CATEGORIES, CATALOG, BUNDLES, GALLERY
};
