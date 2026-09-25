# BITSoM Business Conclave: event page

A storytelling page for the BITSoM Business Conclave, built to sit under
**Events** on bitsom.edu.in. One template serves every edition; the content
lives in a single data file.

```
conclave/
├── index.html            page shell (site header/footer are stubs)
├── data/editions.js      all content, one object per edition
└── assets/
    ├── css/conclave.css  styles, following the BITSoM Brand Guidelines
    ├── js/conclave.js    renderer (no dependencies)
    └── img/              brand, speakers, orgs, gallery
```

## Preview locally

```sh
cd conclave
python3 -m http.server 8000
# open http://localhost:8000/?edition=2026
```

`?edition=2025`, `2026` and `2027` switch editions. 2025 and 2027 show a
"coming soon" state until their data is filled in.

## The story

The 2026 page reads top to bottom as a story:

| Section | What it shows |
| --- | --- |
| Hero | Edition, theme, date, venue, and a mosaic of the 11 speakers |
| Numbers | Speakers, C-suite leaders, organisations and sectors (counted from the speaker list), plus attendees |
| 01 The Idea | Why the Conclave exists and the 2026 theme |
| 02 The Voices | Speaker cards with a sector filter and a profile pop-up, and an organisation logo strip |
| 03 The Day | Timeline of the day, keynote to high tea |
| The Panels | Who sat on which panel (hidden until filled in) |
| 04 In Frame | Photo gallery with lightbox |
| Reflections | Speaker quotes (hidden until filled in) |
| 05 The Finale | How the day closed: Ideas, Insight, Impact |
| Next edition | Call to action for the next Conclave |

Any section whose data is empty is skipped, and chapter numbers adjust
automatically.

## Adding an edition

1. In `data/editions.js`, copy the `"2026"` object and change the year.
2. Set `status: "published"`.
3. Add photos under `assets/img/` and point to them from the data.

Lines marked `TODO(confirm)` in the data file came from pre-event decks and
should be checked against what actually happened.

## Brand compliance

Taken from the BITSoM Brand Guidelines:

- **Colours:** red `#B72F26`, blue `#252A60`, orange `#F68722`. The watermark
  tones (`#A12325`, `#241F55`, `#E37126`) are used only for tone-on-tone
  patterns.
- **Type:** Brandon Grotesque for all headlines and sub-heads (uppercase),
  Noto Sans JP for body copy. Brandon is licensed; if the main site already
  loads it, it is picked up automatically, otherwise Jost stands in.
- **Design language 1:** the logo-derived pattern (stripes, chevrons,
  rings) in full colour on white ribbons (`pattern.svg`), and tone on tone on
  coloured sections (`pattern-mono.svg`).
- **Design language 2:** a large tone-on-tone crop of the logo in the hero,
  kept separate from design language 1 as the guidelines ask.
- **Image tone:** portraits use single-hue gradient maps in the three primary
  colours (SVG filters in `index.html`); the finale photo, which carries
  text, is treated in brand red.
- **Tone of voice:** British English, active voice, positive phrasing, and
  "BITSoM" always keeps its lowercase "o", including in uppercase text
  (`brand()` in `conclave.js`).

## Integrating into bitsom.edu.in

- Replace the `<header class="site-header">` and `<footer class="site-footer">`
  stubs in `index.html` with the site's global header and footer.
- Keep the hidden `<svg>` with the `duo-*` filters; portrait colouring
  depends on it.
- Page styles only touch classes used on this page, so they can load
  alongside the main site's CSS.
