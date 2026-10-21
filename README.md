# BITSoM Business Conclave: event page

**Handoff for the bitsom.edu.in web team.** A storytelling page for the
BITSoM Business Conclave, to sit under **Events**. One template serves every
edition; all content lives in one data file, so new editions need no code.

Preview: https://bitsom-conclave.vercel.app (`?edition=2025`, `2026`, `2027`)

```
conclave/
├── index.html            page shell; header and footer are stand-ins
├── data/editions.js      all content, one object per edition
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
   can be reduced to `Noto Sans JP`. Jost is only a stand-in for previews.
3. **Paths.** Every asset path is relative to `index.html`. Copy the
   `conclave/` folder as is, e.g. to `/events/business-conclave/`.
4. **Editions.** The edition comes from `?edition=YYYY` and defaults to
   `CONCLAVE_DEFAULT_EDITION` in `data/editions.js`. If you prefer clean URLs
   (`/events/business-conclave/2025/`), rewrite them to the query string.
5. **Content Security Policy.** If the site sends a CSP, allow:
   `frame-src https://www.youtube-nocookie.com https://www.linkedin.com`
   and `img-src https://i.ytimg.com` (video thumbnails).
6. **CSS isolation.** Page styles use Conclave-specific class names and a few
   base rules (`body`, `img`, `.wrap`). Check those against the main
   stylesheet when you drop the page in.

## Before launch: content still to come

| Item | Where it goes | Notes |
| --- | --- | --- |
| HD speaker portraits | `assets/img/speakers/*.jpg` (2026, 11 files) and `assets/img/speakers/2025/*.jpg` (20 files) | The current files come from the decks at 117–265 px and are soft. Replace each file **with the same name**: square, at least 600 × 600 px, natural colour, face in the upper half. No code change needed. |
| Overview video | `media.overview.youtube` in the 2026 block | Paste the YouTube URL. |
| Candid Conversations episodes | `media.podcasts.items` | One `{ youtube, title }` per episode. |
| 2026 LinkedIn post | `media.linkedin` | Paste the post URL or the code from "Embed this post". |
| Attendance figure | 2026 `stats` | "350+" came from the pre-event deck (`TODO(confirm)`). |

The **Watch & Listen** chapter stays hidden until at least one media link is
filled in, then appears between In Frame and the Finale. Videos load only
when clicked (privacy-enhanced YouTube).

## The story

| Section | What it shows |
| --- | --- |
| Hero | Conclave logo, edition, theme, date, venue, speaker portraits |
| Numbers | Speakers, C-suite leaders, organisations, sectors (counted from the speaker list), attendees |
| The Idea | Why the Conclave exists, and the edition's theme |
| The Voices | Speaker cards with a sector filter; cards with a bio open a profile |
| The Day | Timeline of the day's sessions, each with a photo |
| In Frame | Photo gallery with a full-screen viewer |
| Watch & Listen | Overview film, podcast episodes, LinkedIn post (when supplied) |
| Reflections | Speaker quotes (2025) |
| The Finale | Team photo and how the day closed |
| Next edition | Call to action for the next Conclave |

Any section whose data is empty is skipped, and chapter numbers and the
sticky chapter menu adjust automatically.

## Adding an edition

1. In `data/editions.js`, copy the `"2026"` object and change the year.
2. Set `status: "published"` (until then the page shows a "coming soon"
   screen with the `message` text).
3. Add photos under `assets/img/` and point to them from the data.

## Brand compliance

Following the BITSoM Brand Guidelines and the brand team's review:

- **Logo:** the registered (®) BITSoM logo, used unmodified (trimmed and
  resized only), on BITSoM blue in the header and footer. It is never used as
  a background, texture or crop.
- **Look:** minimal and clean. White space and soft light gradients; the
  design-language pattern appears once, as a slim strip above the footer
  (`ribbon.png`, taken from the guideline pattern).
- **Colours:** red `#B72F26`, blue `#252A60`, orange `#F68722`.
- **Type:** Brandon Grotesque only in capitals, for headings and labels;
  Noto Sans JP for body copy (Manrope is the approved alternative and is
  already in the font stack).
- **Photos:** natural colour everywhere; nothing is tinted or filtered.
- **Tone of voice:** British English, active voice, positive phrasing;
  "BITSoM" keeps its lowercase "o" even inside capitals (`brand()` in
  `conclave.js`).

## Checks run before handoff

On desktop (1440 px) and mobile (390 px), for every edition: no script
errors, no broken images, no horizontal scrolling, no tinted images, and no
Brandon/Jost text outside capitals. The sector filter, speaker profile,
photo viewer (including arrow keys) and click-to-play video were exercised in
a headless browser.
