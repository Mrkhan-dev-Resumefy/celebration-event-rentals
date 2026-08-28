# Events & Rentals .io

## Project Overview
- **Name**: Events & Rentals .io — Party Rentals Marketing Website
- **Goal**: A fully interactive, 3D-animated single-page marketing site for a family-owned party rental business (bounce houses, popcorn carts, inflatable movie screens, water slides, etc.), driving customers to call or WhatsApp for bookings.
- **Design Source**: Built from a Genspark Design ("Build it") handoff — recreated pixel-for-pixel per the handoff spec.
- **Features**:
  - Interactive 3D hero scene (Three.js) — rotating bounce house, popcorn cart with animated popping kernels, floating balloons, falling confetti. Drag to spin, auto-rotates when idle.
  - Sticky nav with scroll-aware shadow, smooth-scroll anchor links
  - Animated hero headline (squash-and-stretch "bounce", stroked "pop", wiggling "party!")
  - Scrolling marquee banner of event types
  - 8-card services grid with hover lift + rotate, inline SVG icons, pricing
  - "How it works" 3-step section on a dark background
  - Bento-grid photo gallery (placeholder gradients + emoji, ready to swap for real photos)
  - About section with polaroid-style photo frames and a spinning "since 2018" sticker
  - Custom inline SVG service-area map with animated HQ pin pulse and delivery-radius rings
  - Testimonials grid
  - Red booking/contact section: phone, WhatsApp (prefilled message), email, address cards + a quote-request form with multi-select service chips
  - Persistent floating WhatsApp FAB with pulse animation
  - GSAP ScrollTrigger hero parallax; IntersectionObserver section reveal animations
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

## Features Not Yet Implemented
- **Booking form backend**: `handleBook()` currently only `console.log`s the submission and shows a toast — needs to be wired to a real endpoint (e.g. Formspree, a Hono API route + email service, or a D1-backed table) before going live.
- **Real photography**: Gallery tiles and About polaroids are gradient + emoji placeholders — swap in real event photos when available.
- **Favicon**: Currently an inline 🎪 emoji data-URI; replace with a real brand icon set (16/32/180/512px) once finalized.

## Recommended Next Steps
1. Wire the booking form to a real submission target (Cloudflare D1 table + Hono `/api/book` route is the natural fit here, keeping everything on Cloudflare — see the `d1_databases` config commented out in `wrangler.jsonc`).
2. Replace gallery/about placeholder imagery with real event photos (upload to `public/static/` or use R2).
3. Add a real favicon/social preview image.
4. Consider adding basic analytics (Cloudflare Web Analytics — no cookies, free, edge-native).

## Deployment
- **Platform**: Cloudflare Pages (Hono backend, static assets in `public/`)
- **Tech Stack**: Hono + TypeScript + vanilla Three.js/GSAP (via CDN) + hand-authored CSS (no Tailwind/build-heavy framework — matches the original design handoff's lightweight, no-build-step approach)
- **Status**: ✅ Running locally in sandbox dev preview; deploy to production pending user confirmation of Cloudflare deploy path.
- **Last Updated**: 2026-08-28
