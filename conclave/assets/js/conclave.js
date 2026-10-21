/*
 * BITSoM Business Conclave page renderer.
 *
 * Reads window.CONCLAVE_EDITIONS and window.CONCLAVE_CURRENT (data/editions.js)
 * and renders one of two views into <main id="conclave">:
 *
 *   (no query)            the upcoming edition, built to attract speakers
 *                         and partners
 *   ?edition=past         Past Editions, newest first: theme, speakers, pictures
 *   ?edition=2026         Past Editions, scrolled to that edition
 *
 * Plain JavaScript, no dependencies.
 */
(function () {
  "use strict";

  var editions = window.CONCLAVE_EDITIONS || {};
  var years = Object.keys(editions).sort();
  var current = window.CONCLAVE_CURRENT || years[years.length - 1];
  var cur = editions[current] || {};
  var pastYears = years.filter(function (y) { return editions[y].status === "past"; }).reverse();
  var query = new URLSearchParams(window.location.search).get("edition");
  var isPast = query === "past" || !!(query && editions[query] && editions[query].status === "past");
  var focusYear = isPast && query !== "past" ? query : null;
  var root = document.getElementById("conclave");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var galleries = {}; // year -> photos, for the lightbox

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  /* Brand rule: the "o" in BITSoM stays lowercase, even in uppercase text. */
  function brand(s) {
    return esc(s).replace(/BITSoM/g, 'BITS<span class="lc">o</span>M');
  }
  function has(a) { return Array.isArray(a) && a.length > 0; }
  /* "Title: Subtitle" themes show the subtitle on its own line; the words are unchanged */
  function themeHtml(title, cls) {
    if (!title) return "To be announced";
    var i = title.indexOf(": ");
    if (i < 0) return brand(title);
    return brand(title.slice(0, i)) + '<span class="' + cls + '"><span class="sr-colon">: </span>' + brand(title.slice(i + 2)) + "</span>";
  }
  function unique(a) { return a.filter(function (v, i) { return v && a.indexOf(v) === i; }); }
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  var ICONS = {
    mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    panel: '<circle cx="6" cy="7" r="2.2"/><circle cx="12" cy="6" r="2.2"/><circle cx="18" cy="7" r="2.2"/><path d="M2.5 14h19M4 14v6M20 14v6M3.5 12c0-1.7 1.1-2.7 2.5-2.7s2.5 1 2.5 2.7M9.5 11.5c0-1.9 1.1-3 2.5-3s2.5 1.1 2.5 3M15.5 12c0-1.7 1.1-2.7 2.5-2.7s2.5 1 2.5 2.7"/>',
    huddle: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="17" r="2.2"/><circle cx="19" cy="17" r="2.2"/><circle cx="12" cy="13" r="1.6"/><path d="M12 7.5v4M10.7 13.9 6.8 15.7M13.3 13.9l3.9 1.8"/>',
    podcast: '<rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="9" cy="13" r="2.5"/><path d="M15 11h3M15 14h3M7 7l3-4M17 7l-3-4"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/>',
    tea: '<path d="M4 10h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4zM17 11h1.5a2.5 2.5 0 0 1 0 5H17M3 21h16M8 3c-.8 1 .8 2 0 3.5M12 3c-.8 1 .8 2 0 3.5"/>',
    vision: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    purpose: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3"/>',
    audience: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c0-3.4 2.5-6 5.5-6s5.5 2.6 5.5 6M14 14.4c.9-.3 1.9-.4 3-.4 2.6 0 4.5 2.3 4.5 5.5"/>',
    impact: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  var LINKEDIN_GLYPH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>';

  /* YouTube: accept a full URL (watch, youtu.be, shorts, embed) or a bare id */
  function youtubeId(v) {
    if (!v) return "";
    var m = String(v).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(v) ? v : "";
  }
  /* LinkedIn: accept the post URL, the embed URL or the pasted <iframe> code */
  function linkedinEmbed(v) {
    if (!v) return "";
    v = String(v);
    var src = v.match(/src="([^"]+)"/);
    if (src) v = src[1];
    if (/linkedin\.com\/embed\//.test(v)) return v;
    var m = v.match(/urn:li:(share|activity|ugcPost):(\d{10,25})/) || v.match(/(activity|share|ugcPost)-(\d{10,25})/);
    return m ? "https://www.linkedin.com/embed/feed/update/urn:li:" + m[1] + ":" + m[2] : "";
  }

  /* ---------- data views ---------- */

  function pastSpeakers() {
    var out = [];
    pastYears.forEach(function (y) {
      (editions[y].speakers || []).forEach(function (s) { out.push(Object.assign({ year: y }, s)); });
    });
    return out;
  }
  /* One logo per organisation, newest edition first */
  function organisations() {
    var seen = {}, out = [];
    (cur.speakers || []).concat(pastSpeakers()).forEach(function (s) {
      if (s.org && s.logo && !seen[s.org]) { seen[s.org] = 1; out.push({ org: s.org, logo: s.logo }); }
    });
    return out;
  }
  function autoStat(key) {
    var sp = pastSpeakers();
    switch (key) {
      case "speakers": return sp.length;
      case "organisations": return unique(sp.map(function (s) { return s.org; })).length;
      case "editions": return pastYears.length;
    }
    return 0;
  }
  function statValue(st) {
    if (typeof st.value === "string" && st.value.indexOf("auto:") === 0) return autoStat(st.value.slice(5));
    return Number(st.value) || 0;
  }

  /* ---------- shared pieces ---------- */

  var chapters = []; // {id, label, nav} for the sticky menu
  function chapter(id, label, nav) {
    chapters.push({ id: id, label: label, nav: nav });
    return pad(chapters.length);
  }

  function sectionHead(num, title, sub, center) {
    return '<header class="sec-head' + (center ? " sec-head--center" : "") + ' reveal">' +
      (num ? '<p class="sec-head__num">Chapter ' + num + "</p>" : "") +
      '<h2 class="sec-head__title">' + brand(title) + "</h2>" +
      (sub ? '<p class="sec-head__sub">' + brand(sub) + "</p>" : "") +
      "</header>";
  }

  /* LinkedIn profile in a new tab; a greyed-out icon keeps cards uniform when none is listed */
  function linkedinButton(s) {
    if (s.linkedin) {
      return '<a class="li li--on" href="' + esc(s.linkedin) + '" target="_blank" rel="noopener noreferrer" ' +
        'aria-label="' + esc(s.name) + ' on LinkedIn (opens in a new tab)">' + LINKEDIN_GLYPH + "</a>";
    }
    return '<span class="li li--off" title="LinkedIn profile not listed" aria-hidden="true">' + LINKEDIN_GLYPH + "</span>";
  }

  /* Portrait on top, then name and role; the organisation and LinkedIn share the last row */
  function speakerCard(s, i, opts) {
    opts = opts || {};
    return '<li class="speaker reveal" style="--d:' + (i % 4) * 60 + 'ms">' +
      '<div class="speaker__card">' +
        '<span class="speaker__photo"><img src="' + esc(s.photo) + '" alt="" loading="lazy"></span>' +
        (opts.tag && s.year ? '<span class="speaker__tag">' + esc(s.year) + "</span>" : "") +
        '<span class="speaker__body">' +
          '<span class="speaker__name">' + esc(s.name) + "</span>" +
          '<span class="speaker__role">' + esc(s.role) + "</span>" +
          '<span class="speaker__foot">' +
            '<span class="speaker__org">' + (s.logo ? '<img src="' + esc(s.logo) + '" alt="' + esc(s.org) + '" loading="lazy">' : "<em>" + esc(s.org || s.sector) + "</em>") + "</span>" +
            linkedinButton(s) +
          "</span>" +
        "</span>" +
      "</div></li>";
  }

  function galleryGrid(year, photos) {
    galleries[year] = photos;
    return '<ul class="gallery">' + photos.map(function (g, i) {
      return '<li class="gallery__item ' + (g.size ? "gallery__item--" + esc(g.size) : "") + ' reveal">' +
        '<button type="button" data-gallery="' + esc(year) + '" data-photo="' + i + '" aria-label="Open photo: ' + esc(g.caption) + '">' +
          '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy">' +
          '<span class="gallery__cap">' + esc(g.caption) + "</span>" +
        "</button></li>";
    }).join("") + "</ul>";
  }

  function editionSwitcher() {
    var items = [{ href: "?", label: current, on: !isPast }, { href: "?edition=past", label: "Past editions", on: isPast }];
    return '<div class="editions" role="navigation" aria-label="Conclave editions">' + items.map(function (it) {
      return '<a class="editions__item' + (it.on ? " is-active" : "") + '" href="' + it.href + '"' + (it.on ? ' aria-current="page"' : "") + ">" + esc(it.label) + "</a>";
    }).join("") + "</div>";
  }

  function subnav() {
    return '<nav class="subnav" aria-label="Page sections">' +
      '<div class="wrap subnav__inner">' +
        '<a class="subnav__title" href="#top">' + (isPast ? "Past <b>Editions</b>" : "Business Conclave <b>" + esc(current) + "</b>") + "</a>" +
        (chapters.length ? '<div class="subnav__links">' + chapters.filter(function (c) { return c.nav !== false; }).map(function (c) {
          return '<a href="#' + c.id + '" data-spy="' + c.id + '">' + esc(c.label) + "</a>";
        }).join("") + "</div>" : "") +
        editionSwitcher() +
      "</div></nav>";
  }

  function breadcrumb() {
    return '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/">Events</a><span>/</span>' +
      (isPast ? '<a href="?">Business Conclave</a><span>/</span><span aria-current="page">Past editions</span>'
              : '<span aria-current="page">Business Conclave ' + esc(current) + "</span>") + "</nav>";
  }

  /* ================================================================== */
  /* Upcoming edition (home)                                             */
  /* ================================================================== */

  /* Constellation points (x%, y%): a loose lattice, each joined to its neighbours */
  var STARS = [[16, 9], [50, 5], [84, 10], [33, 27], [67, 25], [14, 46], [50, 45], [86, 47], [31, 66], [69, 64], [16, 85], [50, 87], [84, 84]];

  function constellation() {
    var all = organisations(), byOrg = {};
    all.forEach(function (o) { byOrg[o.org] = o; });
    var picks = (cur.constellation || []).map(function (n) { return byOrg[n]; }).filter(Boolean);
    all.forEach(function (o) { if (picks.length < STARS.length && picks.indexOf(o) < 0) picks.push(o); });
    picks = picks.slice(0, STARS.length);
    if (!picks.length) return "";
    var pts = STARS.slice(0, picks.length), lines = [], seen = {};
    pts.forEach(function (p, i) {
      pts.map(function (q, j) { return { j: j, d: Math.hypot(p[0] - q[0], p[1] - q[1]) }; })
        .filter(function (o) { return o.j !== i; })
        .sort(function (a, b) { return a.d - b.d; }).slice(0, 3)
        .forEach(function (o) {
          var k = Math.min(i, o.j) + "-" + Math.max(i, o.j);
          if (!seen[k] && o.d < 32) {
            seen[k] = 1;
            lines.push('<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + pts[o.j][0] + '" y2="' + pts[o.j][1] + '"/>');
          }
        });
    });
    return '<div class="constellation" role="list" aria-label="Organisations whose leaders have spoken at the Conclave">' +
      '<svg class="constellation__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + lines.join("") + "</svg>" +
      picks.map(function (o, i) {
        return '<span class="star" role="listitem" style="left:' + pts[i][0] + "%;top:" + pts[i][1] + "%;--i:" + i + '"><img src="' + esc(o.logo) + '" alt="' + esc(o.org) + '"></span>';
      }).join("") +
    "</div>";
  }

  function homeHero() {
    var t = cur.theme || {};
    var involve = cur.involve || {};
    return '' +
      '<section class="hero hero--home" id="top">' +
        '<div class="wrap hero__grid">' +
          '<div class="hero__copy">' +
            '<p class="hero__presents">BITS School of Management presents</p>' +
            '<h1 class="hero__title"><img class="hero__logo" src="assets/img/brand/conclave-logo-light.png" alt="BITSoM Conclave" width="560" height="173">' +
              '<span class="hero__year">' + esc(current) + "</span></h1>" +
            '<p class="hero__kicker">Theme ' + esc(current) + "</p>" +
            '<p class="hero__theme">' + themeHtml(t.title, "hero__theme-sub") + "</p>" +
            '<ul class="hero__meta">' +
              "<li>" + icon("calendar") + (cur.date ? '<time datetime="' + esc(cur.dateISO || "") + '">' + esc(cur.date) + "</time>" : "Date to be announced") + "</li>" +
              (cur.venue ? "<li>" + icon("pin") + esc(cur.venue) + "</li>" : "") +
            "</ul>" +
            '<div class="hero__actions">' +
              (involve.speakers ? '<a class="btn btn--orange" href="#involve">Speak at the Conclave' + icon("arrow") + "</a>" : "") +
              (involve.partners ? '<a class="btn btn--ghost" href="#involve-partners">Partner with us</a>' : "") +
            "</div>" +
            (has(cur.stats) ? '<dl class="hero__stats">' + cur.stats.map(function (st) {
              var v = statValue(st);
              return '<div class="hstat"><dt>' + esc(st.label) + "</dt>" +
                '<dd><span class="stat__num" data-count="' + v + '">' + (reduceMotion ? v : 0) + "</span>" +
                (st.suffix ? '<span class="hstat__suffix">' + esc(st.suffix) + "</span>" : "") + "</dd></div>";
            }).join("") + "</dl>" : "") +
          "</div>" +
          '<div class="hero__side">' + constellation() +
            '<p class="hero__side-cap">Where our past speakers come from</p>' +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function homeAbout() {
    var a = cur.about;
    if (!a) return "";
    var n = chapter("about", "About");
    return '' +
      '<section class="chapter" id="about">' +
        '<div class="wrap">' +
          sectionHead(n, "About the Conclave", "Where ideas meet action") +
          '<div class="about">' +
            '<div class="about__copy reveal">' +
              (a.quote ? '<blockquote class="about__quote">“' + esc(a.quote) + "”</blockquote>" : "") +
              (a.lead ? '<p class="about__lead">' + brand(a.lead) + "</p>" : "") +
              (a.body ? '<p class="about__body">' + brand(a.body) + "</p>" : "") +
            "</div>" +
            (has(a.pillars) ? '<div class="pillars reveal">' + a.pillars.map(function (p) {
              return '<article class="pillar">' + icon(p.icon, "pillar__icon") + "<h3>" + esc(p.title) + "</h3><p>" + brand(p.text) + "</p></article>";
            }).join("") + "</div>" : "") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function homeTheme() {
    var t = cur.theme || {};
    var n = chapter("theme", "Theme");
    return '' +
      '<section class="chapter" id="theme">' +
        '<div class="wrap">' +
          sectionHead(n, "The Theme", "One question for the year") +
          '<div class="themes">' +
            '<div class="theme-card reveal">' +
              '<span class="chip chip--light">Theme ' + esc(current) + "</span>" +
              '<p class="theme-card__title">' + themeHtml(t.title, "theme-card__sub") + "</p>" +
              (t.text ? '<p class="theme-card__text">' + brand(t.text) + "</p>"
                : t.title ? "" : '<p class="theme-card__text">The ' + esc(current) + " theme will be announced here. Here is where the conversation has been so far.</p>") +
            "</div>" +
            '<div class="themes__side reveal">' +
              (has(t.angles) ? t.angles.map(function (a) {
                return '<div class="angle"><span class="angle__title">' + esc(a.title) + '</span><span class="angle__text">' + brand(a.text) + "</span></div>";
              }).join("") :
              '<p class="themes__label">Previous themes</p>' +
              pastYears.map(function (y) {
                var pt = editions[y].theme || {};
                return '<a class="past-theme" href="?edition=' + esc(y) + '">' +
                  '<span class="past-theme__year">' + esc(y) + "</span>" +
                  '<span class="past-theme__body">' + (pt.kicker && !/^theme/i.test(pt.kicker) ? '<span class="past-theme__kicker">' + esc(pt.kicker) + "</span>" : "") +
                    '<span class="past-theme__title">' + brand(pt.title || "") + "</span></span>" +
                  icon("arrow") + "</a>";
              }).join("")) +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function homeDay() {
    if (!has(cur.dayFlow)) return "";
    var n = chapter("day", "The Day");
    return '' +
      '<section class="chapter" id="day">' +
        '<div class="wrap">' +
          sectionHead(n, "A Conclave Day", "How the day unfolds", true) +
          '<ol class="flow">' + cur.dayFlow.map(function (s, i) {
            return '<li class="flow__step reveal" style="--d:' + (i % 3) * 80 + 'ms">' +
              (s.image ? '<div class="flow__img"><img src="' + esc(s.image) + '" alt="" loading="lazy"></div>' : "") +
              '<div class="flow__text"><p class="flow__num">' + icon(s.icon || "mic") + "<span>" + pad(i + 1) + "</span></p>" +
                "<h3>" + esc(s.title) + "</h3><p>" + brand(s.text) + "</p></div></li>";
          }).join("") + "</ol>" +
        "</div>" +
      "</section>";
  }

  /* The 2027 line-up once six are confirmed; until then, the featured past
     speakers (all of them if none is marked). Either way the chapter closes
     with every organisation that has been on stage. */
  function homeSpeakers() {
    var confirmed = cur.speakers || [];
    var lineUp = confirmed.length >= 6;
    var sp = pastSpeakers();
    if (!lineUp && !sp.length) return "";
    var featured = sp.filter(function (s) { return s.featured; });
    var shown = lineUp ? confirmed : featured.length ? featured : sp;
    var orgs = organisations();
    var n = chapter("speakers", lineUp ? "Speakers" : "Past Speakers");
    return '' +
      '<section class="chapter" id="speakers">' +
        '<div class="wrap">' +
          (lineUp ? sectionHead(n, "The Speakers", "Conclave " + current + " line-up", true)
                  : sectionHead(n, "Past Speakers", "Leaders who have taken the Conclave stage", true)) +
          '<ul class="speakers' + (lineUp ? " speakers--three" : "") + '">' +
            shown.map(function (s, i) { return speakerCard(s, i, { tag: !lineUp }); }).join("") + "</ul>" +
          (sp.length > shown.length || lineUp ? '<p class="speakers__more reveal"><a class="btn btn--blue" href="?edition=past">Meet all ' + sp.length + " past speakers" + icon("arrow") + "</a></p>" : "") +
          (orgs.length ? '<p class="speakers__label reveal">On the Conclave stage so far</p>' +
            '<ul class="logo-wall">' + orgs.map(function (o, i) {
              return '<li class="logo-wall__item reveal" style="--d:' + (i % 6) * 40 + 'ms"><img src="' + esc(o.logo) + '" alt="' + esc(o.org) + '" loading="lazy"></li>';
            }).join("") + "</ul>" : "") +
        "</div>" +
      "</section>";
  }

  function homeMedia() {
    var m = cur.media || {};
    var feature = m.overview && youtubeId(m.overview.youtube) ? m.overview : null;
    var pods = ((m.podcasts && m.podcasts.items) || []).filter(function (p) { return youtubeId(p.youtube); });
    var posts = (m.linkedin || []).filter(function (p) { return linkedinEmbed(p.url); });
    if (!feature && !pods.length && !posts.length) return "";
    var n = chapter("watch", "Watch & Listen");
    function video(v) {
      var id = youtubeId(v.youtube);
      return '<div class="video">' +
        '<button type="button" class="video__play" data-youtube="' + esc(id) + '" data-title="' + esc(v.title || "") + '" ' +
          'style="background-image:url(https://i.ytimg.com/vi/' + esc(id) + '/hqdefault.jpg)" aria-label="Play video: ' + esc(v.title || "") + '">' +
          '<span class="video__btn" aria-hidden="true"></span></button></div>' +
        (v.title ? '<p class="video__title">' + brand(v.title) + "</p>" : "");
    }
    return '' +
      '<section class="chapter" id="watch">' +
        '<div class="wrap">' +
          sectionHead(n, "Watch & Listen", "The Conclave beyond the stage", true) +
          '<div class="media">' +
            (feature ? '<div class="media__feature reveal">' + video(feature) + "</div>" : "") +
            (pods.length ? '<div class="reveal"><p class="media__label">' + esc((m.podcasts && m.podcasts.title) || "Podcasts") + "</p>" +
              '<div class="media__grid">' + pods.map(function (p) { return "<div>" + video(p) + "</div>"; }).join("") + "</div></div>" : "") +
            (posts.length ? '<div class="reveal media__center"><p class="media__label">On LinkedIn</p><div class="media__social">' +
              posts.map(function (p) {
                return '<iframe class="linkedin" src="' + esc(linkedinEmbed(p.url)) + '" title="' + esc(p.title || "LinkedIn post") + '" loading="lazy" allowfullscreen></iframe>';
              }).join("") + "</div></div>" : "") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function homeReflections() {
    var quotes = [];
    pastYears.forEach(function (y) { (editions[y].testimonials || []).forEach(function (q) { quotes.push(Object.assign({ year: y }, q)); }); });
    if (!quotes.length) return "";
    var n = chapter("reflections", "Reflections");
    return '' +
      '<section class="chapter" id="reflections">' +
        '<div class="wrap">' +
          sectionHead(n, "In Their Words", "What past speakers said", true) +
          '<div class="quotes">' + quotes.map(function (q) {
            return '<figure class="quote reveal"><blockquote>' + brand(q.quote) + "</blockquote>" +
              "<figcaption>" + (q.photo ? '<img src="' + esc(q.photo) + '" alt="" loading="lazy">' : "") +
              "<span><strong>" + esc(q.name) + "</strong>" + esc(q.role || "") + " · Conclave " + esc(q.year) + "</span></figcaption></figure>";
          }).join("") + "</div>" +
        "</div>" +
      "</section>";
  }

  function homeInvolve() {
    var inv = cur.involve;
    if (!inv || (!inv.speakers && !inv.partners)) return "";
    var n = chapter("involve", "Get Involved");
    function card(c, id, cls, btn) {
      if (!c) return "";
      return '<article class="involve__card ' + cls + ' reveal" id="' + id + '">' +
        "<h3>" + brand(c.title) + "</h3>" +
        '<ul class="involve__points">' + (c.points || []).map(function (p) { return "<li>" + icon("check") + "<span>" + brand(p) + "</span></li>"; }).join("") + "</ul>" +
        (c.cta && c.cta.href ? '<a class="btn ' + btn + '" href="' + esc(c.cta.href) + '">' + esc(c.cta.label) + icon("arrow") + "</a>" : "") +
      "</article>";
    }
    return '' +
      '<section class="chapter" id="involve">' +
        '<div class="wrap">' +
          sectionHead(n, "Be Part of " + current, "Take the stage, or stand behind it", true) +
          '<div class="involve">' +
            card(inv.speakers, "involve-speakers", "involve__card--speak", "btn--orange") +
            card(inv.partners, "involve-partners", "involve__card--partner", "btn--blue") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function homePast() {
    if (!pastYears.length) return "";
    var n = chapter("past", "Past Editions", false); // the switcher already links there
    return '' +
      '<section class="chapter" id="past">' +
        '<div class="wrap">' +
          sectionHead(n, "Past Editions", "Revisit the themes, speakers and pictures", true) +
          '<div class="past-cards">' + pastYears.map(function (y) {
            var e = editions[y], t = e.theme || {};
            var full = (e.gallery || []).filter(function (g) { return g.size === "full"; })[0] || (e.gallery || [])[0];
            return '<a class="past-card reveal" href="?edition=' + esc(y) + '">' +
              (full ? '<span class="past-card__img"><img src="' + esc(full.src) + '" alt="" loading="lazy"></span>' : "") +
              '<span class="past-card__body">' +
                '<span class="past-card__year">' + esc(y) + "</span>" +
                '<span class="past-card__theme">' + brand(t.title || "") + "</span>" +
                '<span class="past-card__meta">' + esc(e.date || "") + " · " + (e.speakers || []).length + " speakers</span>" +
                '<span class="past-card__more">Explore ' + esc(y) + icon("arrow") + "</span>" +
              "</span></a>";
          }).join("") + "</div>" +
        "</div>" +
      "</section>";
  }

  /* ================================================================== */
  /* Past Editions                                                        */
  /* ================================================================== */

  function pastHero() {
    return '' +
      '<section class="hero hero--past" id="top">' +
        '<div class="wrap">' +
          '<p class="hero__presents">' + brand("BITSoM Business Conclave") + "</p>" +
          '<h1 class="hero__heading">Past Editions</h1>' +
          '<p class="hero__message">The themes, the speakers and the pictures from every Conclave so far.</p>' +
          '<div class="hero__jumps">' + pastYears.map(function (y) {
            // One line each: the theme's short name where it has one (2026: "Reimagining Bharat")
            var t = editions[y].theme || {};
            var label = t.kicker && !/^theme/i.test(t.kicker) ? t.kicker : t.title || "";
            return '<a class="jump" href="#e' + esc(y) + '"><b>' + esc(y) + "</b><span>" + brand(label) + "</span></a>";
          }).join("") + "</div>" +
        "</div>" +
      "</section>";
  }

  function pastEdition(y) {
    var e = editions[y], t = e.theme || {};
    chapters.push({ id: "e" + y, label: "Conclave " + y });
    return '' +
      '<section class="chapter edition" id="e' + esc(y) + '">' +
        '<div class="wrap">' +
          '<header class="edition__head reveal">' +
            '<div class="edition__when"><span class="edition__year">' + esc(y) + "</span>" +
              '<span class="edition__meta">' + esc(e.date || "") + (e.venue ? "<br>" + esc(e.venue) : "") + "</span></div>" +
            '<div class="edition__theme">' +
              '<p class="edition__kicker">' + esc(t.kicker && !/^theme/i.test(t.kicker) ? t.kicker : "Theme " + y) + "</p>" +
              "<h2>" + brand(t.title || "") + "</h2>" +
              (t.text ? "<p>" + brand(t.text) + "</p>" : "") +
            "</div>" +
          "</header>" +
          (has(e.speakers) ? '<h3 class="edition__label reveal">Speakers <span>' + e.speakers.length + "</span></h3>" +
            '<ul class="speakers">' + e.speakers.map(function (s, i) { return speakerCard(s, i); }).join("") + "</ul>" : "") +
          (has(e.gallery) ? '<h3 class="edition__label reveal">Pictures</h3>' + galleryGrid(y, e.gallery) : "") +
        "</div>" +
      "</section>";
  }

  function pastNext() {
    var t = (cur.theme || {}).title;
    return '' +
      '<section class="next">' +
        '<div class="wrap next__inner">' +
          "<div><h2>See you at Conclave " + esc(current) + "</h2><p>" + esc(cur.date || "Date to be announced") + (t ? " · " + brand(t) : "") + "</p></div>" +
          '<a class="btn btn--orange" href="?">Explore Conclave ' + esc(current) + icon("arrow") + "</a>" +
        "</div>" +
      "</section>";
  }

  /* ---------- render ---------- */

  function render() {
    var body;
    if (isPast) {
      document.title = "Past Editions | BITSoM Business Conclave | BITS School of Management";
      body = pastHero() + pastYears.map(pastEdition).join("") + pastNext();
    } else {
      document.title = "BITSoM Business Conclave " + current + " | Events | BITS School of Management";
      body = homeHero() + homeAbout() + homeTheme() + homeSpeakers() + homeDay() +
        homeMedia() + homeReflections() + homeInvolve() + homePast();
    }
    root.innerHTML = subnav() + breadcrumb() + body;
  }

  /* ---------- behaviour ---------- */

  function setupReveal() {
    var els = root.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function setupCounters() {
    var nums = root.querySelectorAll(".stat__num[data-count]");
    if (reduceMotion || !nums.length || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = n.dataset.count; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, end = +el.dataset.count, t0 = null, dur = 1400;
        function step(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function setupLightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || !dlg.showModal) return;
    var img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption"), list = [], idx = 0;
    function show(i) {
      idx = (i + list.length) % list.length;
      var g = list[idx];
      img.src = g.src; img.alt = g.caption; cap.textContent = g.caption + "  ·  " + (idx + 1) + " / " + list.length;
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-photo]");
      if (!b) return;
      list = galleries[b.dataset.gallery] || [];
      if (!list.length) return;
      show(+b.dataset.photo);
      dlg.showModal();
    });
    dlg.querySelector(".lightbox__close").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(idx - 1); });
    dlg.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* Click-to-play: load the YouTube player only when someone asks for it */
  function setupVideos() {
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-youtube]");
      if (!b) return;
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(b.dataset.youtube) + "?autoplay=1&rel=0&modestbranding=1";
      f.title = b.dataset.title || "YouTube video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      b.replaceWith(f);
    });
  }

  function setupScrollSpy() {
    var links = root.querySelectorAll("[data-spy]");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (l) { map[l.dataset.spy] = l; });
    var strip = root.querySelector(".subnav__links");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var l = map[e.target.id];
        if (!l) return; // back in the hero: nothing highlighted
        l.classList.add("is-active");
        // Scroll only the chapter strip sideways, never the page.
        strip.scrollTo({ left: l.offsetLeft - (strip.clientWidth - l.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).concat(["top"]).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }

  render();
  setupReveal();
  setupCounters();
  setupLightbox();
  setupVideos();
  setupScrollSpy();
  if (focusYear) {
    // Jump to the requested edition, and again once images have settled the layout.
    var target = document.getElementById("e" + focusYear);
    var jump = function () { if (target) target.scrollIntoView({ block: "start" }); };
    requestAnimationFrame(jump);
    window.addEventListener("load", jump, { once: true });
  }
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
