# Yango City Transit — Rwanda

**Country-specific pitch for the Republic of Rwanda · v3 SHIPPED · last updated 27 April 2026**

This is the **Rwanda-specific** pitch. There's also a **geo-agnostic version** called *City Transport by Yango v2* at `https://github.com/chernikovtech/city-transport-by-yango` (live at `https://city-transport-v2.chernikov.tech` (canonical) / `https://city-transport.chernikov.tech` (alias)) that you should treat as a sibling, not a sequel — see Section 11 for when to use which.

> ⚡ **v3 status:** Live on https://rwanda-transit.chernikov.tech as of commit `638efd8`. The site moved from a single 1,840-line monolith to a React Router v6 app with 7 routes. See **Section 5b** for the full v3 amendment log.

Read this file end-to-end before making changes. It tells you what exists, where it lives, what's done, what's pending, and which pitfalls the previous Claude already hit so you don't repeat them.

---

## 1. What this is

A Rwanda-specific pitch for **Yango City Transit** prepared for the Government of Rwanda — primarily Hon. Yves Iradukunda (State Minister of ICT), with downstream stakeholders at MININFRA, City of Kigali, Ecofleet Solutions, RURA and RTDA. Two artefacts:

1. **Landing site** — single-page React/Vite app on Railway, custom domain on Cloudflare.
2. **Executive PPTX deck** — 14-slide Yango-branded presentation.

The site went through a **v1 → v2 amendment cycle** based on feedback from Natasha (the team member who reviewed v1). All v2 amendments have been applied and are live. See Section 5 for the full amendment log.

---

## 2. Live URLs & ground truth

| Asset | URL |
|---|---|
| Landing site (live, primary) | https://rwanda-transit.chernikov.tech |
| Landing site (Railway direct) | https://yango-city-transit-rwanda-production.up.railway.app |
| GitHub repo | https://github.com/chernikovtech/yango-city-transit-rwanda |
| Local container path | `/home/claude/work/yango-city-transit-rwanda-v2/` |
| Executive PPTX deck | `/home/claude/deck/Yango-City-Transit-Rwanda-Executive-Brief.pptx` |
| Executive PDF deck | `/home/claude/deck/Yango-City-Transit-Rwanda-Executive-Brief.pdf` |
| Deck source script | `/home/claude/deck/build-deck.js` |

**Railway:** project `chernikov.tech demos` (`d4cd66c0-397d-42d3-a30f-2cafd7256074`), service `yango-city-transit-rwanda` (`86592fd3-8df9-4475-b81e-3eb5ab04f7c0`), environment `f29d5111-da06-4194-8beb-399c9b48e3bd`.

**Both URLs return HTTP 200. SSL valid. Cloudflare proxy enabled.**

---

## 3. Tech stack

### Landing site
- **React 18** + **Vite 6**, single 1,643-line JSX file (`yango-city-transit-rwanda.jsx`), no component library, no Tailwind, all inline styles.
- **Hosting:** Railway nixpacks build (`npm run build`) → `serve dist -s` on `$PORT`.
- **DNS:** Cloudflare proxy → Railway custom domain.
- **Skills available:** `one-click-deploy`, `railway-deploy-ready`, `yango-web-style`.

### Deck
- **pptxgenjs 4.0.1** (already globally installed).
- **Yango fonts** at `/mnt/skills/user/yango-pptx-template/fonts/` — install to `/usr/local/share/fonts/yango/` then `fc-cache -f` before rendering.
- **PDF conversion:** `python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf <file>.pptx`
- **Slide rasterisation for QA:** `pdftoppm -jpeg -r 100 <file>.pdf slide` then view each `slide-NN.jpg`.

### Brand constants (use verbatim)
```javascript
const C = {
  red: "FF1A1A",
  black: "000000",
  white: "FFFFFF",
  body: "F5F5F5",
  grayText: "666666",
  border: "E6E6E6",
  greenAccent: "00875A",
  blueAccent: "0B5FFF",
  amberAccent: "B07400",
  cardLight: "1a1a1a",
};

const F = {
  headline: "Yango Headline Black",
  body: "Yango Text",
  bodyMedium: "Yango Text Medium",
  bodyBold: "Yango Text Bold",
};
```

---

## 4. Site structure (v3 — React Router)

The site is now a **React Router v6 app with 7 routes**. The original 1,840-line monolith remains as a *components library* — every reusable atom is named-exported so the new pages can import them.

```
src/
├── main.jsx                       ← BrowserRouter wrapper
├── App.jsx                        ← <Routes> + ScrollToTop
├── components/
│   ├── Layout.jsx                 ← sticky Nav, Footer, SubPageHero
│   ├── DubaiVideo.jsx             ← Cloudinary "Yango Dubai Bus Integration" — 3 variants
│   └── Tooltip.jsx                ← Asterisk + PaymentMethodsLine (Amendment 4)
└── pages/
    ├── Home.jsx                   ← /             — 123-word above-the-fold pitch
    ├── Citizens.jsx               ← /citizens     — PassengerApp + Dubai inline + payments
    ├── Operators.jsx              ← /operators    — DriverApp + OperatorDashboard + CV section
    ├── Government.jsx             ← /government   — CityDashboard + fare evasion + alignment
    ├── Methodology.jsx            ← /methodology  — wraps RouteDesignMethodology (Step 01 amended)
    ├── Platform.jsx               ← /platform     — Dubai featured + 4 Tashkent + 3 dashboards + CV
    └── Impact.jsx                 ← /impact       — Yerevan +$115M + multilateral financing

yango-city-transit-rwanda.jsx      ← legacy monolith — now a NAMED-EXPORT components library:
                                     C, F, useIsMobile, Section, Counter, PhoneMockup,
                                     TabletMockup, PassengerApp, DriverApp, OperatorDashboard,
                                     CityDashboard, SpeedMapDemo, FareEvasionDemo,
                                     AccessibilityDemo, RouteDesignMethodology
                                     (the default export YangoCityTransit() is dead code now —
                                      tree-shaken out by Vite. Don't delete it; it's a useful
                                      reference for what each section USED to look like.)
```

| Route | Page | Primary content |
|---|---|---|
| `/` | Home | Hero + Dubai video + 3 pillar summary cards + 1 impact stat + CTA |
| `/citizens` | Citizens | Dubai inline video, PassengerApp mockup, payment-methods section with Asterisk tooltips, AccessibilityDemo |
| `/operators` | Operators | DriverApp + OperatorDashboard simulations, **Computer Vision integration** section (Amendment 3) with 6 use cases + CV demo video, SpeedMapDemo |
| `/government` | Government | CityDashboard mockup, 4-step fare-evasion methodology, frameworks (Vision 2050 / NST2 / RUMI) + delivery partners (MININFRA / Ecofleet / RURA) |
| `/methodology` | Methodology | The 4-step RouteDesignMethodology — Step 01 now reads "Install GPS trackers & load the route network" |
| `/platform` | Platform | Dubai featured at top, 4 Tashkent screencasts, CV teaser → /operators, 3 production dashboards |
| `/impact` | Impact | Yerevan +$115M case, "where the money comes from" breakdown, $430M Rwanda budget + $100M RUMI |

**SPA fallback:** the existing `serve dist -s` flag in `package.json`'s `start` script handles client-side route navigation — direct loads of `/citizens` etc. return the index.html and let the router resolve the path. Verified live: every route plus `/random-bogus-path` returns HTTP 200.

---

## 5. v1 → v2 amendments (applied — for reference)

Based on Natasha's review of v1. Don't re-apply; this is what's already live in v2.

### Hero & top stats
- Removed "30+ countries" stat
- Added "~100% 4G coverage" + "90%+ smartphone penetration"
- Split bus/ridership: 500 buses (Kigali) + 250K daily rides + Nyabugogo ~100K → 180K by 2030

### Three Pillars
- For Citizens: payments now USSD / MTN MoMo / Airtel Money / QR — no smartphone required
- For the City: 80% → **100% coverage**; "subsidy-free" → "new revenue stream for the Treasury"
- Added: "integrates with Ecofleet Solutions' service-level contracting model"
- "Minifra" → "MININFRA"

### Platform in Action (new section)
- 4 Tashkent video cards (citizen app × 2 phones, smart traffic signals, CarPlay, ops dashboard)
- 3 real production dashboards: Yaroslavl schedule, accessibility heatmap, fare-evasion chart
- All labelled "Live — Tashkent deployment" or "Production platform"
- Cloudinary folder: `yango-tech/demos/rwanda-city/`

### Fare-evasion methodology (new section)
4-step explainer matching Natasha's whiteboard walkthrough:
1. Log every app interaction
2. Log every payment
3. Calibrate with inspectors (ground-truth anchor)
4. Auto-target the worst zones (heatmap to inspector phones)

### Route Design Methodology (rewritten)
From 5 consulting-grade phases (Household Travel Survey, 2% target, TCRP) to 4 plain-English steps:
1. Install GPS trackers (weeks 1-6)
2. Launch app & collect data (weeks 6-16)
3. Optional IR passenger counters (weeks 12-20)
4. Analytics & route optimisation (ongoing)

### Removed entirely
- Performance KPI Framework block
- PPP block (replaced with revenue-stream framing — Natasha explicit no-PPP)
- "subsidy-free" language anywhere
- "30+ countries · 26,000+ engineers" footer
- Coverage-vs-ridership 80/30 confusing text

### Labels added
- "Simulation — example of how the final product could look" banner on interactive mockups section
- "· Simulation" suffix on all 4 device labels
- "The charts below are mockups" warning on analytics section

---

## 5b. v2 → v3 amendments (applied — for reference)

Driven by direct feedback from Evgeny: the v2 site was content-rich but the main page was too dense for a 60–90 second Minister-level read. v3 restructures the architecture (single page → 7 routes) and applies 5 substantive amendments. **Commit:** `638efd8`. **Live:** https://rwanda-transit.chernikov.tech.

### Architecture
- React Router v6 added as a runtime dep (`react-router-dom@^6.28.0`)
- New `src/App.jsx`, `src/main.jsx`, `src/components/`, `src/pages/`
- The legacy 1,840-line monolith stays in place as a **components library** — every reusable atom (`C`, `F`, `useIsMobile`, mockup components, `RouteDesignMethodology`) is now a named export
- Default `YangoCityTransit` export in the monolith is now dead code (tree-shaken by Vite)
- Sticky top nav rebuilt as `Layout.Nav` using `<NavLink>`s; mobile drawer included
- Every route auto-scrolls to top on navigation (`<ScrollToTop>` in `App.jsx`)

### Amendment 1 — Streamlined main page
- `Home.jsx` is **123 words above the fold** (target was ≤250)
- Sequence: hero pill + headline + 1 sentence intro + 4 stat tiles + 2 CTAs → Dubai video block → 3 pillar summary cards → 1 impact stat → final CTA
- Full v2 content is **redistributed**, not deleted — every section now lives on its matching sub-page

### Amendment 2 — Dubai bus integration video
- New `<DubaiVideo />` component with 3 variants (`hero`, `inline`, `platform`)
- Cloudinary public_id `Yango Dubai Bus Integration`, original hash `IMG_6556_idmnhd`
- Used on: `/` (autoplay loop, no controls — hero proof), `/citizens` (autoplay inline, no controls), `/platform` (controls visible — featured deployment card)
- All variants use Cloudinary `f_auto, q_auto, w_*` transforms for adaptive payload
- Caption written fresh (not reused Tashkent boilerplate): "Search a route, pick a bus, see real-time arrival, tap to pay…"
- Live LIVE IN DUBAI tag overlay on hero/inline variants

### Amendment 3 — Computer Vision integration reframe
- The screencast previously labelled "Operations Dashboard" (which is *actually* an object-detection feed showing red bounding boxes around vehicles in a depot/wash bay) now lives under its honest name
- **Title:** "Computer Vision integration"
- **Tag chip:** "OPERATIONS + SAFETY" (replaces "CARRIERS + CITY")
- **6 use cases** on `/operators`: depot security & overnight accountability, passenger crowding detection (Nyabugogo, Kicukiro), bus-bay occupancy at terminals, accident & incident detection, lane-discipline monitoring, licence-plate recognition for fare evasion
- **Driver-behaviour ML** (drowsiness, mobile-phone use) intentionally positioned as an *optional add-on* requiring driver-union and RURA approval — softer than the brief suggested, on political grounds
- Featured card on `/platform` linking back to `/operators`

### Amendment 4 — Payment-method asterisks + tooltip
- New `<Asterisk />` component (CSS-only tooltip, hover **and** keyboard focus, 150ms fade-in, max-width 280px, dotted underline, screen-reader friendly via `aria-describedby`)
- New `<PaymentMethodsLine />` pre-composed line: "Pay via USSD\*, MTN MoMo\*, Airtel Money\*, or QR scan\* — no smartphone required"
- Tooltip text: *"Payment methods depend on local regulation, telco integrations, and partnership agreements with Tap & Go, MTN, Airtel and BNR. The available methods at launch will be confirmed during the integration phase."*
- Used in `Citizens.jsx`'s passenger features list and a dedicated payment-methods section
- Asterisk colour `C.red`, tooltip on `C.black`

### Amendment 5 — Step 01 also loads route network
- **Title:** *"Install GPS trackers & load the route network"* (was: "Install GPS Trackers")
- **Subtitle:** *"Every bus reports its position. Every route is in the system."*
- **Body:** rewritten — explicitly mentions loading current route network and timetable into the platform alongside GPS hardware
- **5th bullet added** to the outputs list: *"Complete route catalogue (stops, schedules, fares) live in the citizen app from day one"*
- Edit applied directly inside `RouteDesignMethodology` in the components-library file (`yango-city-transit-rwanda.jsx`) — so it shows up wherever that component is rendered (currently only `/methodology`)

### What did NOT change
- Yerevan +$115M benchmark number — unchanged, still the headline impact stat
- Vision 2050 / NST2 / RUMI alignment language — unchanged
- All Tashkent screencasts and 3 production dashboard images — unchanged
- Brand tokens (`#FF1A1A` red, Yango Headline / Yango Group Text fonts) — unchanged
- Cloudinary asset paths — unchanged for everything except the new Dubai video

### Build & deploy verification
- Local `npm run build`: 282 KB JS → 80 KB gzipped (vs v2's 250 KB → 71 KB — the +30 KB is React Router + the 7 page components)
- Production smoke test: every route returns HTTP 200, SPA fallback works for arbitrary paths
- Railway deploy `5c35f605` succeeded at 10:36 UTC on 27 April 2026
- All 5 amendments verified present in the deployed bundle (string-grep on `/assets/index-D_v1B8C8.js`)

---

## 6. Executive deck (14 slides)

**Output:** `/home/claude/deck/Yango-City-Transit-Rwanda-Executive-Brief.pptx` (1.2MB) and `.pdf` (0.7MB).
**Source:** `/home/claude/deck/build-deck.js` (1,196 lines, pptxgenjs).

### Slide map
| # | Title | Background |
|---|---|---|
| 1 | Title — "Accelerate Kigali's smart mobility" | Dark |
| 2 | Context — Kigali 2026 (4 stats + 5 milestones) | Light |
| 3 | The Proposition — three pillars | Light |
| 4 | Platform in Action — 4 Tashkent screencasts | Dark |
| 5 | Real City Dashboards (Yaroslavl + accessibility + fare evasion) | Light |
| 6 | How We Deliver — 4-step methodology | Light |
| 7 | Revenue Control — fare evasion methodology | Dark |
| 8 | Platform Architecture — 4 modules | Light |
| 9 | Impact — Yerevan benchmark (+$115M) | Light |
| 10 | Alignment — Rwanda frameworks + delivery partners | Light |
| 11 | International Best Practice (6-card grid) | Light |
| 12 | Commercial Framework — no subsidy required | Light |
| 13 | Next Steps — 3-phase rollout | Light |
| 14 | Closing — "Let's accelerate Kigali. Together." | Dark |

### Build commands
```bash
cd /home/claude/deck
node build-deck.js
python3 /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf Yango-City-Transit-Rwanda-Executive-Brief.pptx
rm -f slide-*.jpg
pdftoppm -jpeg -r 100 Yango-City-Transit-Rwanda-Executive-Brief.pdf slide
# Then view each slide-NN.jpg one at a time
```

### Known deck pitfalls
- **Slide 5 fare-evasion card grazes the footer.** Fixed in v2 by reducing top-row to 2.1" and bottom-row to 2.15", but ~2px overlap remains at full zoom. Acceptable.
- **Don't use coloured-bullet rich text in `addText`.** It colours body text too. Use a separate coloured square `addShape` + a separate black `addText`. This pattern is already in the script.
- **Title pill on slide 1** wraps if text is too long. Width 4.3" / font 11 / charSpacing 3 fits "YANGO CITY TRANSIT · RWANDA" on one line.
- **Avoid Unicode glyphs that LibreOffice falls back to PNG emoji** (e.g. ↔). The Rwanda deck had a ↔ on slide 13 that came out as a coloured tofu square. Use plain "to" or "→" (rightward arrow, U+2192) which renders cleanly.
- **Yango fonts must be installed** before LibreOffice can render the PPTX to PDF correctly. If the PDF preview shows generic sans-serif, run `fc-cache` after copying fonts to `/usr/local/share/fonts/yango/`.

---

## 7. Cloudinary assets

### Tashkent screencast videos (production reference, used in Platform in Action)
- `IMG_4799_kzkmkx.mp4` — citizen app phone 1
- `IMG_4800_ltvopm.mp4` — citizen app phone 2
- `iOS_Traffic_Lights_ywbdsj.mp4` — smart traffic signals
- `CarPlay_Traffic_Lights_l5uzje.mp4` — CarPlay & in-vehicle
- `Screen_Recording_2026-02-12_at_1.11.13_PM_khhntc.mp4` — operations dashboard

URL pattern: `https://res.cloudinary.com/dc99897dw/video/upload/f_mp4,q_auto,w_400,ac_none,e_accelerate:250/<id>.mp4`

### Real production dashboard screenshots (used in Platform in Action + deck slide 5)
- `yango-tech/demos/rwanda-city/schedule-optimization-yaroslavl.jpg`
- `yango-tech/demos/rwanda-city/public-transport-accessibility.jpg`
- `yango-tech/demos/rwanda-city/fare-evasion-tracking.jpg`
- `yango-tech/demos/rwanda-city/platform-in-action-grid.jpg`

(The Africa version mirrors these to `yango-tech/demos/africa/` — don't conflate the two.)

---

## 8. Deploy pipeline (if you ever need to redeploy)

### Prerequisites
```bash
# Bootstrap deploy tokens — sets $GITHUB_TOKEN, $RAILWAY_TOKEN, $CLOUDFLARE_TOKEN, $CLOUDFLARE_ZONE_ID, $CLOUDINARY_*
. /home/claude/.deploy-tokens
```

### Quick redeploy (Railway auto-deploys on push to main)
```bash
cd /home/claude/work/yango-city-transit-rwanda-v2
git add -A
git commit -m "Your change message"
git push origin main
# Wait ~90s for Railway to rebuild
curl -sIL https://rwanda-transit.chernikov.tech | head -1
```

### Custom domain (already live — DO NOT recreate)
- Subdomain: `rwanda-transit.chernikov.tech`
- Custom domain ID: `f86923b8-0cfa-4090-94f9-37d8c91127ff`
- CNAME target: `5io3nffp.up.railway.app`

---

## 9. Tone & language guardrails (Evgeny's preferences)

- **Direct, data-driven, output-oriented.** No corporate hedging. No "we believe", "synergies", "leverage".
- **Punchy.** Short sentences. One idea per sentence.
- **Investment-banking tone, not consulting tone.** Concrete numbers > frameworks > generalities.
- **British spelling** — optimisation, organisation, programme, digitisation. The Rwanda content uses this throughout.
- **No "AI" buzzword inflation.** The platform uses real ML for inspector targeting and route optimisation; that's it.
- **Revenue-stream framing always**, never subsidy or cost-centre.
- **No PPP framing** — Natasha was clear about this.

---

## 10. Open questions / known soft spots

1. **Hon. Yves Iradukunda is at MINICT (digital), not MININFRA (transport).** The site doesn't currently have a named-Minister salutation. Decide before next outreach: is this addressed *to* Iradukunda (in which case digital-transformation framing should lead), or *via* him to MININFRA?
2. **Yerevan as the +$115M benchmark.** The Tashkent deployment is what's shown in the screencasts; Yerevan is what's quoted in the case study. Mild inconsistency. Could swap to Tashkent in a future iteration if it lands awkwardly.
3. **Electric bus / BRT** — kept as a soft "ready to integrate with" line. Natasha was lukewarm on this. Watch how it lands in the Iradukunda meeting before deciding to strip or expand.

---

## 11. Relationship to the geo-agnostic version

Sister repo: *City Transport by Yango v2* at `https://github.com/chernikovtech/city-transport-by-yango` (live at `https://city-transport-v2.chernikov.tech` (canonical) / `https://city-transport.chernikov.tech` (alias), local at `/home/claude/work/yango-city-transit-africa/`).

**Use the Rwanda version when:**
- The recipient is a Rwandan minister, civil servant, or partner
- The audience already knows the Tap & Go, Ecofleet, RUMI context
- You want concrete numbers tied to Rwanda's actual budget and operators

**Use the geo-agnostic version when:**
- Cold outreach to any non-Rwandan transport ministry, anywhere
- WhatsApp / email blast where customisation isn't justified
- The recipient is multi-country (AU, AfDB, World Bank, multilateral agency)

**Never** edit one and assume the other inherits. The geo-agnostic repo (`city-transport-by-yango`) was forked from this Rwanda v2 codebase and then systematically stripped of country-specific content. Treat them as siblings — keep changes scoped to the right repo.

---

## 12. File map

```
/home/claude/work/yango-city-transit-rwanda-v2/      ← THIS PROJECT (live, last commit adb1e00)
├── yango-city-transit-rwanda.jsx                     ← 1,643 lines, single component
├── src/main.jsx                                      ← React entry
├── index.html
├── package.json                                      ← name: yango-city-transit-rwanda
├── package-lock.json
├── vite.config.js
├── nixpacks.toml                                     ← Railway build config
├── yango-web-style.skill                             ← brand reference (don't deploy)
├── CLAUDE.md                                         ← this file
└── dist/                                             ← build output (gitignored)

/home/claude/work/yango-city-transit-africa/         ← sibling: City Transport by Yango v2 (separate repo)

/home/claude/deck/                                    ← deck workspace
├── build-deck.js                                     ← Rwanda deck generator
├── Yango-City-Transit-Rwanda-Executive-Brief.pptx
├── Yango-City-Transit-Rwanda-Executive-Brief.pdf
├── yango-logo-white.png / yango-logo-black.png
├── tashkent-citizen-1.jpg / -2.jpg                   ← video poster frames
├── tashkent-signals.jpg / tashkent-carplay.jpg / tashkent-ops.jpg
├── dashboard-schedule.jpg / dashboard-accessibility.jpg / dashboard-evasion.jpg
└── platform-grid.jpg

/home/claude/.deploy-tokens                           ← GitHub / Railway / Cloudflare / Cloudinary tokens
```

---

## 13. Recommended first move in Claude Code

```bash
git clone https://github.com/chernikovtech/yango-city-transit-rwanda
cd yango-city-transit-rwanda
# This CLAUDE.md will be auto-loaded
npm install
npm run dev   # local preview at http://localhost:5173
```

For deploy changes, just commit + push to `main` — Railway auto-redeploys.

---

**End of context file.**
