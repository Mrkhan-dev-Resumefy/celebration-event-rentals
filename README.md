# Events & Rentals .io

## Project Overview
- **Name**: Events & Rentals .io — Party Rentals Marketing Website
- **Goal**: A fully interactive, 3D-animated single-page marketing site for a family-owned party rental business (bounce houses, popcorn carts, inflatable movie screens, water slides, etc.), driving customers to call or WhatsApp for bookings.
- **Design Source**: Built from a Genspark Design ("Build it") handoff — recreated pixel-for-pixel per the handoff spec.
- **Features**:
  - Interactive 3D hero scene (Three.js) — rotating bounce house, popcorn cart with animated popping kernels, floating balloons, falling confetti. Drag to spin, auto-rotates when idle.
  - Sticky nav with scroll-aware shadow, smooth-scroll anchor links, and an animated winking bounce-house mascot logo (bobs, winks, flies a tiny flag)
  - Animated hero headline (squash-and-stretch "bounce", stroked "pop", wiggling "party!")
  - Scrolling marquee banner of event types
  - 8-card services grid with hover lift + rotate, real photographic images, pricing
  - "How it works" 3-step section on a dark background with minimal line icons
  - Bento-grid photo gallery with real event photos
  - About section with polaroid-style real team/van photos and a gently pulsing "5★ rated by families" badge (previous spinning "since 2018" ball removed per client request)
  - Small disclaimer captions under Services and Gallery noting actual rental equipment may vary from images shown
  - Custom inline SVG service-area map with animated HQ pin pulse and delivery-radius rings
  - Testimonials grid (reviews dated 2026)
  - Red booking/contact section: phone, WhatsApp (prefilled message), email, address cards + a quote-request form with multi-select service chips
  - Persistent floating WhatsApp FAB with pulse animation
  - Rich animated scrolling: rainbow scroll-progress bar, directional scroll reveals (left/right/zoom/tilt) with stagger, count-up hero stats, multi-depth parallax on hero badges & about polaroids, scroll-scrubbed marquee & heading scale-ins (GSAP ScrollTrigger + IntersectionObserver)
  - Fully responsive (stacks below 960px/860px/640px breakpoints)

## URLs
- **Local/dev preview**: http://localhost:3000 (sandbox) — see Deployment section for the public/production URL once deployed.

## Data Architecture
- **Data Models**: None — fully static, client-only site. Services, gallery items, and testimonials are hardcoded arrays in `app.js`.
- **Storage Services**: None used. No backend, no database.
- **Data Flow**: The booking form gathers field values client-side (`handleBook()` in `app.js`), currently only logs to console and shows a confirmation toast — **not yet wired to a real submission endpoint** (see Not Yet Implemented below).

## User Guide
1. Visit the site — the 3D scene in the hero animates automatically; drag it horizontally to spin the bounce-house scene manually.
2. Browse "What we rent" for the 8 rental categories and pricing.
3. Scroll to "Book your date" (red section) to call, WhatsApp, email, or fill out the quote-request form.
4. Use the persistent green WhatsApp button (bottom-right) at any time to start a chat with a prefilled message.

## Currently Completed Features
- Full recreation of all 11 sections from the design handoff (nav, hero/3D scene, services, how-it-works, gallery, about, map, testimonials, contact/booking, footer, WhatsApp FAB)
- All CSS design tokens, typography, spacing, shadows, and animation timings ported verbatim from the handoff `styles.css`
- Three.js hero scene ported verbatim (`scene.js`) — drag-to-rotate, auto-rotate, popcorn/balloon/confetti/flag animations
- Served via Hono on Cloudflare Pages: `index.html` returned as a static-string response from a Hono route, static JS/CSS served from `/static/*` via `hono/cloudflare-workers` `serveStatic`
- Real contact info baked in: phone `(469) 994-2172`, WhatsApp `+1 469 994 2172`, email `Hello@eventsrentals.io`
- **Real photography**: All 16 placeholder graphics replaced with original photorealistic images (8 service cards, 6 gallery items, 2 about-section photos) stored in `public/static/img/`. Images were AI-generated (not stock photos) to avoid any competitor-branding/licensing risk, using "no people / no text / no logos" prompts (except the about-team photo, which shows the crew from behind with no visible faces).
- **Cartoon icon removal**: Inline decorative SVG icons on service cards and gradient+emoji placeholders in the gallery/about sections were removed. The 3 "How it works" step icons were simplified to minimal single-color line icons (calendar / grid / truck) rather than full illustrative renders.
- **Product-image disclaimer**: Small italic caption added under both the Services grid and the Gallery grid: *"Photos are for illustrative purposes only. Actual rental equipment... may vary from images shown"* — added per client's request on a call, since the images are AI-generated representations rather than photos of the client's actual physical inventory.
- **New mascot logo**: Replaced the plain text-only wordmark with an animated custom SVG mascot (a winking, bobbing bounce-house with a tiny flapping flag) in the nav and footer; matching favicon. (An earlier pass also added light joke copy throughout the site — that copy was reverted per client request, keeping only the new logo/design.)
- **Spinning sticker removed & re-texted**: The rotating "🎪 since 2018" circular sticker in the About section no longer spins (now a subtle scale pulse) and its text was replaced with "⭐ 5★ rated by families". Polaroid captions also refreshed ("Our happy crew" / "Setup in action").
- **2026 reviews**: All three testimonials now dated 2026 (March / June / August 2026).
- **Bug fixes**:
  - Anchor links no longer hide section headings under the sticky nav (`scroll-margin-top` added)
  - Awkward manual "every-thing" line-break in hero copy fixed
  - Map legend zones corrected to match the stated 25-mile free-delivery radius
  - Toast confirmation no longer flickers when the form is submitted twice quickly (timer cleanup)
  - 3D canvas drag no longer hijacks page scrolling on touch devices (`touch-action: none` + pointer capture)
  - Three.js render loop now pauses while the hero is off-screen (battery/CPU saver)
  - Removed unused `dt` variable in `scene.js` and dead inline animation-delay styles in `app.js`
  - Reveal transition classes are now cleaned up after animating, so they can never conflict with card hover transitions
- **Animated scrolling effects**: Fixed rainbow scroll-progress bar at the top of the page; services/gallery cards now reveal on scroll with stagger; sections slide in from left/right or zoom/tilt in; hero stats count up when scrolled into view; hero floating badges drift at different parallax depths; about polaroids counter-parallax; marquee scrubs with scroll; section headings scale in as they enter the viewport. All effects respect `prefers-reduced-motion`.

## Features Not Yet Implemented
- **Booking form backend**: `handleBook()` currently only `console.log`s the submission and shows a toast — needs to be wired to a real endpoint (e.g. Formspree, a Hono API route + email service, or a D1-backed table) before going live.
- **Client's own equipment photos**: Current images are AI-generated stand-ins (hence the disclaimer). Swap in the client's actual product/event photos whenever available for a fully accurate representation.
- **Favicon**: Currently an inline SVG matching the new mascot; consider commissioning a polished brand icon set (16/32/180/512px PNG/ICO) once the client finalizes branding.

## Recommended Next Steps
1. Wire the booking form to a real submission target (Cloudflare D1 table + Hono `/api/book` route is the natural fit here, keeping everything on Cloudflare — see the `d1_databases` config commented out in `wrangler.jsonc`).
2. Replace the AI-generated images with the client's real equipment/event photos as they become available (drop into `public/static/img/`, same filenames) — remove the disclaimer once photos are 100% accurate.
3. Commission a polished multi-size favicon/social preview image set based on the new mascot.
4. Consider adding basic analytics (Cloudflare Web Analytics — no cookies, free, edge-native).

## Deployment
- **Platform**: Cloudflare Pages (Hono backend, static assets in `public/`)
- **Tech Stack**: Hono + TypeScript + vanilla Three.js/GSAP (via CDN) + hand-authored CSS (no Tailwind/build-heavy framework — matches the original design handoff's lightweight, no-build-step approach)
- **Status**: ✅ Running locally in sandbox dev preview. Code pushed to GitHub (`Mrkhan-dev-Resumefy/celebration-event-rentals`, branch `main`). Hostinger-ready static export available as a zip for direct upload to `public_html/`.
- **GitHub**: https://github.com/Mrkhan-dev-Resumefy/celebration-event-rentals
- **Hostinger export**: Updated zip with the new mascot logo (joke copy removed, professional wording restored), ready for direct `public_html/` upload.
- **Last Updated**: 2026-08-28
