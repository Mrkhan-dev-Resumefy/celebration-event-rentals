# Events & Rentals .io

## Project Overview
- **Name**: Events & Rentals .io — Party Rentals Marketing Website
- **Goal**: A single-page marketing site for a family-owned Dallas-area party rental business (bounce houses, combo units, water slides, concessions carts, movie screens, tables & decor, add-ons), driving customers to request a quote by phone, WhatsApp, or form.
- **Design Source**: Built from a Genspark Design ("Build it") handoff.
- **Business model on-page**: **quote-only — no prices anywhere.** Every rental card and bundle routes to "Request a quote."

### Features
- **4 package bundles** (Backyard Birthday, Block Party, Movie Night, Summer Splash) built from the top sellers, each flagged as discounted vs. booking separately
- **Rental catalog grouped into 4 categories** — Inflatables, Concessions, Tables & Decor, Add-ons — with client-side filter tabs, replacing the old single long SKU list
- **Top-seller badges** on standard bounce houses, combo units, water slides, movie screens, popcorn & cotton candy carts
- **Availability calendar** — month view with open / limited / fully-booked day states, month paging, and click-to-prefill the booking form
- **Real Dallas-suburb service area** — two zones (free within 25 mi, extended 25–40 mi) listing 40 actual DFW suburbs, plus `LocalBusiness` structured data for local SEO
- **Google-reviews section** with review badges, a rating summary line, and a link out to the full Google profile
- **Honest photo labelling** — items show either a real photo, an "illustrative" corner flag, or a striped "photo of our unit coming soon" tile
- Interactive 3D hero scene (Three.js): rotating bounce house, popping popcorn cart, floating balloons, falling confetti; drag to spin, auto-rotates when idle. **Desktop only** — mobile gets a static SVG poster
- Sticky nav with scroll-aware shadow, animated winking bounce-house mascot logo, animated hero headline, suburb-name scrolling marquee
- Scroll animation suite: rainbow progress bar, directional staggered reveals, count-up hero stats, multi-depth parallax, heading scale-ins
- Booking form with multi-select chips (bundles + all catalog items), city field, and date input synced to the calendar
- Persistent floating WhatsApp FAB, quote-request toast confirmation
- Fully responsive, keyboard accessible (skip link, focus rings, chip keyboard support), and `prefers-reduced-motion` aware

## URLs
- **Local/dev preview**: http://localhost:3000 (sandbox) — see Deployment for the public preview URL.

## Data Architecture
- **Single content file**: `public/static/content.js` exposes `window.SITE_CONTENT` — service-area suburbs, Google reviews, the 17-item catalog, the 4 bundles, and gallery items. **This is the only file a non-developer needs to edit.** See `CONTENT-CHECKLIST.md`.
- **Storage Services**: None. Fully static, client-only site — no backend, no database.
- **Availability data**: `fetchAvailability(year, month)` in `app.js` returns `{ 'YYYY-MM-DD': 'open'|'limited'|'full' }`. It currently generates a deterministic weekend-load pattern as a labelled stand-in; swap its body for a Checkfront / InflatableOffice / Rentals United fetch and the entire UI keeps working unchanged.
- **Data Flow**: The booking form gathers values client-side (`handleBook()`), logs to console and shows a toast — **not yet wired to a real endpoint** (see below).

## User Guide
1. **Start with a bundle** — the four packages at the top cover the most common events.
2. **Or browse by category** — tap Inflatables / Concessions / Tables & Decor / Add-ons to filter the catalog.
3. **Check your date** in the availability calendar; clicking a day fills in the booking form's date field.
4. **Request a quote** — any card's "Request a quote" button jumps to the form and preselects that item.
5. Call, WhatsApp (green button, bottom-right), or email at any time.

## Currently Completed Features

### Content swap (real business content)
- **Real Dallas suburbs** replace the invented "Westside / Eastfield / Riverside / Tri-City" placeholders. Two zones covering 40 real DFW towns (Garland, Richardson, Plano, Rowlett, Sachse, Wylie, Murphy, Mesquite, Rockwall, Frisco, McKinney, Coppell, Forney…), driven from `SERVICE_AREA` in `content.js` and mirrored into `LocalBusiness` → `areaServed` JSON-LD.
- **Reviews section rebuilt for real Google reviews** — Google-branded badges, a rating-summary line, and an outbound profile link. The three cards ship as **clearly flagged placeholders** ("Placeholder — paste a real Google review") so fabricated testimonials cannot go live unnoticed. Paste-in instructions in `CONTENT-CHECKLIST.md`.
- **Photo honesty system** — three states per item: real photo (clean), existing AI/illustrative photo (small "illustrative" corner flag), or no photo at all (striped "photo of our unit coming soon" tile). 9 items intentionally render the placeholder tile as a standing reminder that real unit photos are owed.
- **All pricing removed** site-wide, per instruction. No `$` figure appears anywhere in the HTML, CSS, or JS. Bundles state only that the bundled rate beats booking separately; every CTA is "Request a quote."

### Added
- **4 bundles** priced-on-quote, with per-bundle inclusion lists, a "Most popular" flag on Backyard Birthday, and a seasonal window on Summer Splash.
- **Availability calendar** — dependency-free month grid, disabled past/full days, deterministic weekend-load model, month paging (can't page before the current month), selection banner, and a clear note that it's a guide rather than an inventory hold.
- **Full add-on list** now represented: cotton candy, Kona/shaved ice, slushie machine, chocolate fountain, decor & balloon styling, photography, drone, generators, face painting/balloon artist.
- **Quote-link plumbing** — clicking "Request a quote" on any card or bundle scrolls to the form and preselects the matching chip (or appends a note if no chip matches).

### Removed / simplified
- **Long single SKU list → 4 filtered categories** with tab navigation.
- **Old SVG service-area map deleted** — it showed fictional city names and contradicted the real delivery radius. Replaced by the two-zone real-suburb card layout.
- **Heavy animations trimmed for mobile load speed** (see below).

### Mobile performance work
Measured with Playwright on the live preview (390 px viewport):

| Metric | Before | After |
|---|---|---|
| Page transfer weight (mobile) | ~1.65 MB | **28 KB** |
| Browser load event (mobile) | 38.7 s (first capture) | **~0.35 s** |
| First Contentful Paint (mobile) | — | **~0.36 s** |
| three.js + GSAP requests (mobile) | 3 | **0** |

- **Three.js (~600 KB) and GSAP (~70 KB) are no longer blocking `<script>` tags.** They're lazy-loaded after first paint, only on desktop, and only once the hero nears the viewport. Mobile and reduced-motion visitors download **neither** — they get a hand-drawn static SVG hero poster instead.
- Decorative infinite animations (headline bounce/wiggle, mascot bob/wink, logo dot, float badges, sticker pulse, WhatsApp pulse, hint pulse) are disabled under 860 px; float badges are hidden entirely.
- `backdrop-filter` blur (expensive on mobile GPUs) dropped on the nav and contact cards at small sizes; marquee rotation removed to avoid an extra compositing layer; marquee slowed to reduce repaints.
- `content-visibility: auto` on below-fold desktop sections so the browser skips their layout/paint until scrolled near.
- Scroll reveals use a plain fade on mobile (no directional transforms) and shorter durations.
- All images carry `loading="lazy"` + `decoding="async"`.

### Bug fixes this pass
- **`Cannot access 'io' before initialization`** — a genuine crash (caught by browser testing) where the catalog renderer called `wireReveals()` before the IntersectionObserver was declared. The reveal engine is now hoisted above all render calls. This error was killing every script after it on page load.
- **Sections skipped by an instant jump stayed permanently invisible** — clicking a nav anchor, loading a `#hash` URL, or a restored scroll position scrolls *past* elements without ever intersecting them, so their reveal never fired. Added a `sweepPassedReveals()` pass on load, `hashchange`, anchor click, and scroll-idle. Verified: 0 hidden elements after an instant jump to page bottom (was 31).
- Calendar could page backwards into past months — now clamped to the current month.
- Booking-form inputs had no `id`/`for` pairing (labels weren't associated) and were missing `autocomplete` attributes — both fixed.
- Service chips were mouse-only — now keyboard operable (`role="button"`, `tabindex`, Enter/Space).
- Added a skip-to-content link and visible `:focus-visible` rings.
- Injected content is HTML-escaped (`escapeAttr`) so an apostrophe in a town or item name can't break an attribute.
- `prefers-reduced-motion` now also disables smooth scrolling and clamps *all* animations globally, not just the reveal set.

### Retained from earlier passes
- Hono on Cloudflare Pages: `index.html` returned as a static string, `/static/*` served via `serveStatic`
- Real contact info: phone `(469) 994-2172`, WhatsApp `+1 469 994 2172`, email `Hello@eventsrentals.io`
- Animated mascot logo (nav + footer) and matching favicon
- Non-spinning, gently pulsing About-section sticker (now reads "⭐ Family owned")
- 16 AI-generated photographic images in `public/static/img/`

## Features Not Yet Implemented
- **Real Google reviews** — section is built; the owner must paste in actual reviews (3 flagged placeholders currently render). See `CONTENT-CHECKLIST.md` §1.
- **Photos of the actual units** — 9 catalog items show "photo coming soon" tiles; the rest are flagged "illustrative". See §2.
- **Live inventory feed for the calendar** — availability is a labelled stand-in pattern; needs a Checkfront / InflatableOffice / Rentals United connection. See §4.
- **Booking form backend** — `handleBook()` only logs and toasts; needs a real endpoint (Formspree, a Hono `/api/book` route + email, or D1).
- **Favicon set** — inline SVG only; a polished multi-size PNG/ICO set would be better.

## Recommended Next Steps
1. **Owner content pass** (days, not weeks): paste real Google reviews, shoot the 9 missing unit photos, confirm the suburb lists. All in `content.js` — walkthrough in `CONTENT-CHECKLIST.md`.
2. Wire the booking form to a real submission target (Cloudflare D1 + Hono `/api/book` keeps everything on Cloudflare — see the commented `d1_databases` block in `wrangler.jsonc`).
3. Decide on the calendar: keep it as an honest guide, or connect a real booking system (InflatableOffice is usually the best fit for bounce-house businesses).
4. Add Cloudflare Web Analytics (free, cookieless, edge-native) to see which bundles and categories get the most attention.

## Deployment
- **Platform**: Cloudflare Pages (Hono backend, static assets in `public/`)
- **Tech Stack**: Hono + TypeScript + vanilla Three.js/GSAP (lazy-loaded via CDN, desktop only) + hand-authored CSS — no Tailwind or heavy framework, matching the handoff's no-build-step approach
- **Status**: ✅ Running in sandbox dev preview; verified with Playwright on desktop + mobile viewports (0 console errors, 0 page errors). Pushed to GitHub `main`. Hostinger-ready static export available as a zip for direct `public_html/` upload.
- **GitHub**: https://github.com/Mrkhan-dev-Resumefy/celebration-event-rentals
- **Last Updated**: 2026-08-30
