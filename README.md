# BITSoM Business Conclave: event page

**Handoff for the bitsom.edu.in web team.** The BITSoM Business Conclave
page, to sit under **Events**. All content lives in one data file, so new
editions and new speakers need no code.

Preview: https://bitsom-conclave.vercel.app

| View | URL | Purpose |
| --- | --- | --- |
| Conclave 2027 (main page) | `index.html` | Attract speakers and partners: hero with past speakers' company logos, about, theme, a typical day, past speakers, organisations, reflections, how to get involved |
| Past Editions | `index.html?edition=past` | 2026 above 2025, each with its theme, speakers and pictures |
| One past edition | `index.html?edition=2026` | Past Editions, scrolled to that year |

```
conclave/
├── index.html            page shell; header and footer are stand-ins
├── data/editions.js      all content: 2027 (upcoming), 2026, 2025
└── assets/
    ├── css/conclave.css  styles (scoped to Conclave classes)
    ├── js/conclave.js    renderer, plain JavaScript, no dependencies
    └── img/
        ├── brand/        ® logo, Conclave logo, footer strip
        ├── speakers/     2026 portraits (2025 in speakers/2025/)
        ├── orgs/         company logos (2025 in orgs/2025/)
        └── gallery/      event photos, one folder per year
```

## Run it locally

```sh
cd conclave
python3 -m http.server 8000
# open http://localhost:8000/?edition=2026
```

It is a static page: no build step, no framework, no server code.

## Taking it live on bitsom.edu.in

1. **Header and footer.** Replace `<header class="site-header">` and
   `<footer class="site-footer">` in `index.html` with the site's global
   header and footer. Keep the footer line "under the aegis of BITS Pilani".
2. **Fonts.** The CSS asks for `Brandon Grotesque` first. If the main site
   already serves it, nothing else is needed and the Google Fonts `<link>`
   can be reduced to `Manrope`. Jost is only a stand-in for previews.
3. **Paths.** Every asset path is relative to `index.html`. Copy the
   `conclave/` folder as is, e.g. to `/events/business-conclave/`.
4. **Views.** With no query string the page shows the upcoming edition
   (`CONCLAVE_CURRENT` in `data/editions.js`). `?edition=past` shows Past
   Editions. For clean URLs (`/events/business-conclave/past-editions/`),
   rewrite them to the query string.
5. **Content Security Policy.** If the site sends a CSP, allow:
   `frame-src https://www.youtube-nocookie.com https://www.linkedin.com`
   and `img-src https://i.ytimg.com` (video thumbnails).
6. **CSS isolation.** Page styles use Conclave-specific class names and a few
   base rules (`body`, `img`, `.wrap`). Check those against the main
   stylesheet when you drop the page in.

## Before launch: content still to come

| Item | Where it goes | Notes |
| --- | --- | --- |
| 2027 date | `"2027"` → `date` | Until filled in, the page says "Date to be announced". A one-line `theme.text` can also be added for the theme card. |
| Speak / partner links | `"2027"` → `involve.*.cta.href` | e.g. a `mailto:` or form link; the buttons appear once set. |
| LinkedIn profiles | `linkedin` on each speaker | 18 of 31 are filled in from public profiles. Still empty (greyed-out icon): Sanchit Suneja, Neetu Ailsinghani, Sambasivan G, Shirshendu Bhattacharya, Raghavendra Purwar, Amol Peshattiwar, Jitendra Chauhan, Raghuraman R., Ravindra Soni, Abhishek Shukla, Naveen Chhabra, Sunil Patil, Ramya Venkatesh. Paste the full profile URL to switch the icon on. |
| Original speaker photos | `assets/img/speakers/*.jpg` (2026, 11 files) and `assets/img/speakers/2025/*.jpg` (20 files) | The current files are 640 × 640, enhanced with Real-ESRGAN from small sources: 2026 colour portraits are cropped from the event photos (stage-screen headshots and stage shots); Shirshendu Bhattacharya, Sashidhar Velaga and Vivek Wadhwa are still the black-and-white playbill photos; 2025 come from the decks. Originals are better still: replace each file **with the same name**, square, at least 600 × 600 px, natural colour, face in the upper half. No code change needed. |
| Overview video | `"2027"` → `media.overview.youtube` | Paste the YouTube URL. |
| Candid Conversations episodes | `media.podcasts.items` | One `{ youtube, title }` per episode. |
| 2026 LinkedIn post | `media.linkedin` | Paste the post URL or the code from "Embed this post". |
| Attendance figure | 2026 `stats` | "350+" came from the pre-event deck (`TODO(confirm)`). |

The **Watch & Listen** chapter stays hidden until at least one media link is
filled in. Videos load only when clicked (privacy-enhanced YouTube).

**Announcing 2027 speakers:** add them to `"2027"` → `speakers` (same fields
as past speakers). Once there are six or more, "Past Speakers" on the main
page is replaced by the 2027 line-up in rows of three.

## The story

**Conclave 2027 (main page)**

| Section | What it shows |
| --- | --- |
| Hero | Conclave logo, 2027, theme, date, venue, Speak / Partner buttons, key numbers, and a constellation of past speakers' company logos |
| About | What the Conclave is |
| Theme | The 2027 theme, with links to previous themes |
| A Conclave Day | The typical day flow, without times, with photos |
| Past Speakers | All past speakers, filterable by edition (becomes the 2027 line-up at six confirmed) |
| On the Conclave Stage | Logo wall of every organisation from 2025 and 2026 |
| Watch & Listen | Overview film, podcasts, LinkedIn post (when supplied) |
| In Their Words | Speaker reflections from LinkedIn |
| Be Part of 2027 | What speakers and partners get |
| Past Editions | Cards linking to each past edition |

**Past Editions:** for each year, newest first: theme, speakers, pictures.

Any section whose data is empty is skipped; chapter numbers and the sticky
menu adjust automatically.

## Rolling over to the next edition

After Conclave 2027:
1. Set the 2027 block's `status` to `"past"` and give it a `gallery` and a
   `theme.kicker` if wanted; it then appears on Past Editions above 2026.
2. Add a `"2028"` block (copy the 2027 one) with `status: "upcoming"`.
3. Set `CONCLAVE_CURRENT = "2028"`.

## Brand compliance

Following the BITSoM Brand Guidelines and the brand team's review:

- **Logo:** the registered (®) BITSoM logo, used unmodified (trimmed and
  resized only), on BITSoM blue in the header and footer. It is never used as
  a background, texture or crop.
- **Look:** minimal and clean. White space and soft light gradients; no logo
  or logo-derived element sits behind content. The design-language pattern
  appears once, as a slim strip above the footer (`ribbon.png`).
- **Colours:** red `#B72F26`, blue `#252A60`, orange `#F68722`.
- **Type:** Brandon Grotesque only in capitals, for headings and labels;
  Manrope for body copy, as on BITSoM Vertex.
- **Photos:** natural colour everywhere; nothing is tinted or filtered.
- **Tone of voice:** British English, active voice, positive phrasing;
  "BITSoM" keeps its lowercase "o" even inside capitals (`brand()` in
  `conclave.js`).

## Checks run before handoff

On desktop (1440 px) and mobile (390 px), for both views: no script errors,
no broken images, no horizontal scrolling, no tinted images, and no
Brandon/Jost text outside capitals. Exercised in a headless browser: the
edition filter, LinkedIn links (new tab) and greyed-out icons, the switch to
the 2027 line-up at six speakers, the photo viewer per edition (including
arrow keys), jumping to an edition from `?edition=2025`, and click-to-play
video.
