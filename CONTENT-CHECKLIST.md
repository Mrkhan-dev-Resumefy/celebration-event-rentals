# Content Checklist — what the business owner still owes the site

The structure is done. Everything below is **content only**: no code changes
needed, no rebuild required for the static/Hostinger version.

All of it lives in **one file**: `public/static/content.js`.
Open it, edit the text, save, re-upload. That's it.

Anything still marked `«REPLACE ME»` or `placeholder: true` in that file is
**visibly flagged on the live page on purpose** — so a placeholder can never
quietly ship as if it were real.

---

## 1. Real Google reviews  ⬅ highest priority

**Where:** `content.js` → `REVIEWS` array

Right now three cards render with a yellow **"Placeholder — paste a real Google
review"** banner. To fix:

1. Open your Google Business Profile → **Reviews**.
2. For each review you want to feature, copy:
   - reviewer's first name + last initial (e.g. `Maria G.`)
   - star rating
   - the review text **word for word** (don't rewrite or polish it)
   - the month and year it was left
3. Replace one object per review, and **delete the `placeholder: true` line** —
   that's what removes the warning banner.
4. Set `GOOGLE_REVIEWS_URL` to your profile's review link, and fill in
   `GOOGLE_RATING` (e.g. `4.9`) and `GOOGLE_REVIEW_COUNT` (e.g. `87`) to show
   the "4.9★ average from 87 Google reviews" line.

**Aim for 3–6 reviews** that between them mention different rentals (bounce
house, movie screen, concessions) and name specific suburbs — "delivered to our
house in Plano" is worth a lot for local search.

> ⚠️ Only paste reviews genuinely left on Google, unedited. Writing your own
> testimonials is a Google terms violation and an FTC problem in the US.

---

## 2. Real photos of your actual units

**Where:** `content.js` → `CATALOG` and `GALLERY` arrays

Items currently split three ways:

| State in `content.js` | What shows on the page |
|---|---|
| `img: null` | Striped **"Photo of our unit coming soon"** tile |
| `img: "...", realPhoto: false` | Photo with a small **"illustrative"** corner flag |
| `img: "...", realPhoto: true` | Clean photo, no flag |

To swap in your own:

1. Photograph each unit **set up and inflated**, outdoors, in daylight.
   Landscape, roughly 4:3, no people's faces unless you have permission.
2. Save as JPG, ~1600 px wide, and drop into `public/static/img/units/`.
3. In `content.js` set both fields:
   ```js
   img: "/static/img/units/castle-bounce-house.jpg",
   realPhoto: true
   ```

Units needing a photo most (they have no image at all right now):
Combo units, Obstacle courses, Slushie machine, Chocolate fountain,
Decor & balloon styling, Photography, Drone, Generator, Face painting.

**Photo consent:** for gallery shots with children, get a parent's written OK
(a WhatsApp "yes you can post it" is fine to keep on file) before publishing.

---

## 3. Confirm the service-area suburb lists

**Where:** `content.js` → `SERVICE_AREA`

Pre-filled with real DFW suburbs based on a **Garland, TX** home base:

- **Free zone (25 mi):** Dallas, Garland, Richardson, Plano, Allen, Rowlett,
  Sachse, Wylie, Murphy, Mesquite, Addison, Carrollton, Farmers Branch, Irving,
  University Park, Highland Park, Balch Springs, Sunnyvale, Lake Highlands, Rockwall
- **Extended zone (25–40 mi):** Frisco, McKinney, Prosper, Celina, Little Elm,
  The Colony, Lewisville, Flower Mound, Coppell, Grand Prairie, Duncanville,
  DeSoto, Cedar Hill, Forney, Terrell, Fate, Heath, Princeton, Anna, Melissa

👉 **Please verify these against where you actually drive.** If your warehouse
isn't in Garland, change `hq` and re-sort the two lists — this list also feeds
the search-engine `areaServed` data in `index.html`, so accuracy matters.

---

## 4. Booking calendar — connect real inventory (optional, needs a decision)

**Where:** `public/static/app.js` → `fetchAvailability()`

The calendar is fully built and working, but availability is currently a
**stand-in pattern** (Saturdays busiest, some Sundays/Fridays limited). It is
labelled on the page as "a live guide, not a hold on inventory", so it is honest
as-is — but it is not reading your real bookings.

Two ways forward:

**A. Keep it as a guide (free, zero setup).** Fine if you confirm every booking
by phone anyway. You can hand-edit specific dates to `'full'` when you sell out.

**B. Wire a real booking system.** Sign up for one of these, then the single
`fetchAvailability()` function gets pointed at their API:

| Tool | Notes |
|---|---|
| **Checkfront** | Strong for rentals with inventory counts + delivery windows |
| **Rentals United** | Channel-focused; heavier than most party-rental shops need |
| **InflatableOffice / Event Rental Systems** | Built specifically for bounce-house businesses — usually the best fit |

The function must resolve to `{ 'YYYY-MM-DD': 'open' | 'limited' | 'full' }`.
Everything else on the page keeps working unchanged.

---

## 5. Pricing — deliberately absent

Per instruction, **no prices appear anywhere on the site**. Every rental card
and bundle routes to **"Request a quote."** Bundles say only that the bundled
rate is lower than booking the pieces separately.

If you ever want prices back, that's a business decision — say so and they can
be reinstated, but note that quote-gating typically raises call volume, which is
usually the point.

---

## 6. Operational notes captured in the site copy

These came from your ops brief and are reflected in the on-page copy:

- **Top sellers flagged** with a yellow ⭐ *Top seller* badge: standard bounce
  houses, combo units, water slides, movie screens, popcorn and cotton candy carts.
  Combos and movie screens are worded as upsells.
- **Stock more standard bounce houses** — the copy says "our deepest inventory —
  easiest date to secure", which sets the expectation you're leaning into.
- **Easy / solo-crew jobs** are worded to reflect it: concessions carts
  ("quick single-driver setup"), tables and chairs ("fast solo-driver drop-off"),
  standard bounce houses.
- **Two-person crew jobs** are flagged to customers as book-early:
  water slides ("two-person crew setup, so book early in summer") and obstacle
  courses ("needs a wide, flat run"). Summer Splash bundle says "lock the date
  in early".
- **Water slides marked seasonal** (April–September) in both the item tag and
  the Summer Splash bundle.
