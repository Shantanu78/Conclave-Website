/*
 * BITSoM Business Conclave page renderer.
 * Reads window.CONCLAVE_EDITIONS (data/editions.js) and builds the page for
 * the edition in ?edition=YYYY. No dependencies.
 */
(function () {
  "use strict";

  var editions = window.CONCLAVE_EDITIONS || {};
  var years = Object.keys(editions).sort();
  var params = new URLSearchParams(window.location.search);
  var year = params.get("edition");
  if (!editions[year]) year = window.CONCLAVE_DEFAULT_EDITION || years[years.length - 1];
  var ed = editions[year];
  var root = document.getElementById("conclave");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  /* Rotate portraits through the three primary colours */
  function duo(i) { return "duo--" + ["orange", "red", "blue"][i % 3]; }
  function has(a) { return Array.isArray(a) && a.length > 0; }
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
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "icon") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  /* ---------- derived numbers ---------- */

  function autoStat(key) {
    var sp = ed.speakers || [];
    switch (key) {
      case "speakers": return sp.length;
      case "cxos": return sp.filter(function (s) { return s.cxo; }).length;
      case "organisations": return unique(sp.map(function (s) { return s.org; })).length;
      case "sectors": return unique(sp.map(function (s) { return s.sector; })).length;
    }
    return 0;
  }
  function statValue(st) {
    if (typeof st.value === "string" && st.value.indexOf("auto:") === 0) return autoStat(st.value.slice(5));
    return Number(st.value) || 0;
  }

  /* ---------- sections ---------- */

  var chapters = []; // {id, label}
  function chapter(id, label) {
    chapters.push({ id: id, label: label });
    return pad(chapters.length);
  }

  function editionSwitcher() {
    return '<div class="editions" role="navigation" aria-label="Conclave editions">' +
      years.map(function (y) {
        var cur = y === year;
        return '<a class="editions__item' + (cur ? " is-active" : "") + '" href="?edition=' + esc(y) + '"' +
          (cur ? ' aria-current="page"' : "") + ">" + esc(y) + "</a>";
      }).join("") + "</div>";
  }

  function breadcrumb() {
    return '<nav class="crumbs wrap" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/">Events</a><span>/</span><span aria-current="page">Business Conclave ' + esc(year) + "</span></nav>";
  }

  function hero() {
    // Mosaic rows of up to 4. Short rows go in the middle and are centred
    // (e.g. 11 speakers -> 4 / 3 / 4), so the block never has an empty slot.
    var people = (ed.speakers || []).slice(0, 12);
    var rows = Math.ceil(people.length / 4), sizes = [];
    for (var r = 0; r < rows; r++) sizes.push(4);
    for (var d = rows * 4 - people.length, m = 0; d > 0; d--, m++) sizes[(Math.floor(rows / 2) + m) % rows]--;
    var faces = "", n = 0;
    sizes.forEach(function (size) {
      for (var c = 0; c < size; c++, n++) {
        var s = people[n];
        var style = "--i:" + n + (c === 0 && size < 4 ? ";grid-column-start:" + (5 - size) : "");
        faces += '<figure class="mosaic__tile duo ' + duo(n) + '" style="' + style + '"><img src="' + esc(s.photo) + '" alt="" loading="eager"></figure>';
      }
    });
    var tag = has(ed.tagline) ? '<p class="hero__tagline">' + ed.tagline.map(esc).join("<i>|</i>") + "</p>" : "";
    return '' +
      '<section class="hero" id="top">' +
        '<span class="hero__crop" aria-hidden="true"></span>' +
        '<div class="wrap hero__grid">' +
          '<div class="hero__copy">' +
            '<p class="hero__presents">BITS School of Management presents</p>' +
            '<h1 class="hero__title"><img class="hero__logo" src="assets/img/brand/conclave-logo-light.png" alt="BITSoM Conclave" width="560" height="173">' +
              '<span class="hero__year">' + esc(ed.year) + "</span></h1>" +
            (ed.theme ? '<p class="hero__kicker">' + esc(ed.theme.kicker) + '</p><p class="hero__theme">' + esc(ed.theme.title) + "</p>" : "") +
            '<ul class="hero__meta">' +
              (ed.date ? "<li>" + icon("calendar") + '<time datetime="' + esc(ed.dateISO || "") + '">' + esc(ed.date) + "</time></li>" : "") +
              (ed.venue ? "<li>" + icon("pin") + esc(ed.venue) + "</li>" : "") +
            "</ul>" + tag +
          "</div>" +
          (faces ? '<div class="hero__mosaic mosaic" aria-hidden="true">' + faces + "</div>" : "") +
        "</div>" +
        '<a class="hero__cue" href="#numbers">Start the story ' + icon("down") + "</a>" +
      "</section>" + ribbon();
  }

  function numbers() {
    if (!has(ed.stats)) return "";
    return '' +
      '<section class="numbers tone" id="numbers" aria-label="' + esc(ed.year) + ' in numbers">' +
        '<div class="wrap numbers__grid">' +
          ed.stats.map(function (st) {
            var v = statValue(st);
            return '<div class="stat reveal">' +
              '<span class="stat__num" data-count="' + v + '">' + (reduceMotion ? v : 0) + "</span>" +
              '<span class="stat__suffix">' + esc(st.suffix || "") + "</span>" +
              '<span class="stat__label">' + esc(st.label) + "</span></div>";
          }).join("") +
        "</div>" +
      "</section>";
  }

  function about() {
    var a = ed.about;
    if (!a) return "";
    var n = chapter("idea", "The Idea");
    return '' +
      '<section class="chapter chapter--idea" id="idea">' +
        '<div class="wrap">' +
          sectionHead(n, "The Idea", "Why we gathered") +
          '<div class="idea">' +
            '<div class="idea__copy reveal">' +
              (a.quote ? '<blockquote class="idea__quote">“' + esc(a.quote) + "”</blockquote>" : "") +
              (a.lead ? '<p class="idea__lead">' + brand(a.lead) + "</p>" : "") +
              (a.body ? '<p class="idea__body">' + brand(a.body) + "</p>" : "") +
            "</div>" +
            (ed.theme ? '<div class="idea__theme tone reveal">' +
              '<span class="chip chip--red">Theme ' + esc(ed.year) + "</span>" +
              '<p class="idea__theme-kicker">' + esc(ed.theme.kicker) + "</p>" +
              '<p class="idea__theme-title">' + esc(ed.theme.title) + "</p>" +
            "</div>" : "") +
          "</div>" +
          (has(a.pillars) ? '<div class="pillars">' + a.pillars.map(function (p, i) {
            return '<article class="pillar reveal" style="--d:' + i * 80 + 'ms">' + icon(p.icon, "pillar__icon") +
              "<h3>" + esc(p.title) + "</h3><p>" + brand(p.text) + "</p></article>";
          }).join("") + "</div>" : "") +
        "</div>" +
      "</section>";
  }

  function voices() {
    var sp = ed.speakers;
    if (!has(sp)) return "";
    var n = chapter("voices", "The Voices");
    var sectors = unique(sp.map(function (s) { return s.sector; }));
    var logos = sp.filter(function (s) { return s.logo; });
    return '' +
      '<section class="chapter chapter--voices tone" id="voices">' +
        '<div class="wrap">' +
          sectionHead(n, "The Voices", sp.length + " leaders. " + sectors.length + " sectors. One stage.", true) +
          '<div class="filters" role="group" aria-label="Filter speakers by sector">' +
            '<button type="button" class="filter is-active" data-filter="*" aria-pressed="true">All <span>' + sp.length + "</span></button>" +
            sectors.map(function (s) {
              var c = sp.filter(function (x) { return x.sector === s; }).length;
              return '<button type="button" class="filter" data-filter="' + esc(s) + '" aria-pressed="false">' + esc(s) + " <span>" + c + "</span></button>";
            }).join("") +
          "</div>" +
          '<ul class="speakers">' +
            sp.map(function (s, i) {
              return '<li class="speaker reveal" data-sector="' + esc(s.sector) + '" style="--d:' + (i % 4) * 70 + 'ms">' +
                '<button type="button" class="speaker__btn" data-speaker="' + i + '" aria-haspopup="dialog">' +
                  '<span class="speaker__photo duo ' + duo(i) + '"><img src="' + esc(s.photo) + '" alt="" loading="lazy">' +
                    (s.cxo ? '<span class="speaker__badge">CXO</span>' : "") + "</span>" +
                  '<span class="speaker__info">' +
                    '<span class="speaker__name">' + esc(s.name) + "</span>" +
                    '<span class="speaker__role">' + esc(s.role) + "</span>" +
                    '<span class="speaker__org">' + (s.logo ? '<img src="' + esc(s.logo) + '" alt="' + esc(s.org) + '" loading="lazy">' : '<em>' + esc(s.org || s.sector) + "</em>") + "</span>" +
                  "</span>" +
                  '<span class="speaker__more">Read profile ' + icon("arrow") + "</span>" +
                "</button></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
        (logos.length ? '<div class="logos" aria-label="Organisations on stage">' +
          '<p class="logos__label">Organisations on stage</p>' +
          '<div class="logos__track">' + [0, 1].map(function (k) {
            return '<div class="logos__row"' + (k ? ' aria-hidden="true"' : "") + ">" + logos.map(function (s) {
              return '<span class="logos__item"><img src="' + esc(s.logo) + '" alt="' + (k ? "" : esc(s.org)) + '" loading="lazy"></span>';
            }).join("") + "</div>";
          }).join("") + "</div></div>" : "") +
      "</section>";
  }

  function day() {
    var t = ed.timeline;
    if (!has(t)) return "";
    var n = chapter("day", "The Day");
    return '' +
      '<section class="chapter chapter--day" id="day">' +
        '<div class="wrap">' +
          sectionHead(n, "The Day", "From first word to last handshake", true) +
          '<ol class="timeline">' +
            t.map(function (s, i) {
              return '<li class="moment reveal">' +
                '<div class="moment__node">' + icon(s.icon || "mic") + "</div>" +
                '<div class="moment__card">' +
                  (s.image ? '<div class="moment__img"><img src="' + esc(s.image) + '" alt="" loading="lazy"></div>' : "") +
                  '<div class="moment__text">' +
                    '<p class="moment__time"><span>' + pad(i + 1) + "</span>" + esc(s.time || "") + "</p>" +
                    "<h3>" + esc(s.title) + "</h3><p>" + brand(s.text) + "</p>" +
                  "</div>" +
                "</div></li>";
            }).join("") +
          "</ol>" +
        "</div>" +
      "</section>";
  }

  function panels() {
    if (!has(ed.panels)) return "";
    var n = chapter("panels", "The Panels");
    var byName = {};
    (ed.speakers || []).forEach(function (s) { byName[s.name] = s; });
    return '' +
      '<section class="chapter chapter--panels" id="panels">' +
        '<div class="wrap">' +
          sectionHead(n, "The Panels", "Who sat on which stage") +
          '<div class="panels">' +
            ed.panels.map(function (p) {
              return '<article class="panel reveal"><h3>' + esc(p.title) + "</h3>" +
                (p.moderator ? '<p class="panel__mod">Moderated by ' + esc(p.moderator) + "</p>" : "") +
                '<ul class="panel__people">' + (p.speakers || []).map(function (nm) {
                  var s = byName[nm] || { name: nm };
                  return "<li>" + (s.photo ? '<img src="' + esc(s.photo) + '" alt="" loading="lazy">' : "") +
                    "<span><strong>" + esc(s.name) + "</strong>" + esc(s.org || "") + "</span></li>";
                }).join("") + "</ul></article>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function gallery() {
    if (!has(ed.gallery)) return "";
    var n = chapter("frames", "In Frame");
    return '' +
      '<section class="chapter chapter--frames tone" id="frames">' +
        '<div class="wrap">' +
          sectionHead(n, "In Frame", "The Conclave, as it happened", true) +
          '<ul class="gallery">' +
            ed.gallery.map(function (g, i) {
              return '<li class="gallery__item ' + (g.size ? "gallery__item--" + esc(g.size) : "") + ' reveal">' +
                '<button type="button" data-photo="' + i + '" aria-label="Open photo: ' + esc(g.caption) + '">' +
                  '<img src="' + esc(g.src) + '" alt="' + esc(g.caption) + '" loading="lazy">' +
                  '<span class="gallery__cap">' + esc(g.caption) + "</span>" +
                "</button></li>";
            }).join("") +
          "</ul>" +
        "</div>" +
      "</section>";
  }

  function testimonials() {
    if (!has(ed.testimonials)) return "";
    var n = chapter("reflections", "Reflections");
    return '' +
      '<section class="chapter chapter--quotes" id="reflections">' +
        '<div class="wrap">' +
          sectionHead(n, "Reflections", "In the speakers' words", true) +
          '<div class="quotes">' +
            ed.testimonials.map(function (q) {
              return '<figure class="quote reveal"><blockquote>' + brand(q.quote) + "</blockquote>" +
                "<figcaption>" + (q.photo ? '<img src="' + esc(q.photo) + '" alt="" loading="lazy">' : "") +
                "<span><strong>" + esc(q.name) + "</strong>" + esc(q.role || "") + "</span></figcaption></figure>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function finale() {
    var f = ed.finale;
    if (!f) return "";
    var n = chapter("finale", "The Finale");
    return '' +
      '<section class="chapter chapter--finale" id="finale">' +
        (f.image ? '<img class="finale__bg" src="' + esc(f.image) + '" alt="" loading="lazy">' : "") +
        '<div class="wrap finale">' +
          sectionHead(n, "The Finale", "", true) +
          '<h2 class="finale__title reveal">' + brand(f.title) + "</h2>" +
          '<p class="finale__text reveal">' + brand(f.text) + "</p>" +
          (has(f.takeaways) ? '<div class="takeaways">' + f.takeaways.map(function (t, i) {
            return '<div class="takeaway reveal" style="--d:' + i * 100 + 'ms"><span class="takeaway__word">' + esc(t.word) + "</span><p>" + brand(t.text) + "</p></div>";
          }).join("") + "</div>" : "") +
        "</div>" +
      "</section>";
  }

  function next() {
    var x = ed.next;
    if (!x) return "";
    return '' +
      '<section class="next tone">' +
        '<div class="wrap next__inner">' +
          '<div><h2>' + brand(x.title) + "</h2><p>" + brand(x.text) + "</p></div>" +
          (x.cta ? '<a class="btn btn--light" href="' + esc(x.cta.href) + '">' + esc(x.cta.label) + icon("arrow") + "</a>" : "") +
        "</div>" +
      "</section>" + ribbon();
  }

  function sectionHead(num, title, sub, light) {
    return '<header class="sec-head' + (light ? " sec-head--center" : "") + ' reveal">' +
      '<p class="sec-head__num">Chapter ' + num + "</p>" +
      '<h2 class="sec-head__title">' + esc(title) + "</h2>" +
      (sub ? '<p class="sec-head__sub">' + brand(sub) + "</p>" : "") +
      "</header>";
  }

  function subnav() {
    return '<nav class="subnav" aria-label="Conclave ' + esc(year) + ' chapters">' +
      '<div class="wrap subnav__inner">' +
        '<a class="subnav__title" href="#top">Business Conclave <b>' + esc(year) + "</b></a>" +
        (chapters.length ? '<div class="subnav__links">' + chapters.map(function (c) {
          return '<a href="#' + c.id + '" data-spy="' + c.id + '">' + esc(c.label) + "</a>";
        }).join("") + "</div>" : "") +
        editionSwitcher() +
      "</div></nav>";
  }

  function comingSoon() {
    var latest = years.filter(function (y) { return editions[y].status === "published"; }).pop();
    return '' +
      '<section class="hero hero--soon" id="top">' +
        '<span class="hero__crop" aria-hidden="true"></span>' +
        '<div class="wrap hero__grid">' +
          '<div class="hero__copy">' +
            '<p class="hero__presents">BITS School of Management presents</p>' +
            '<h1 class="hero__title"><img class="hero__logo" src="assets/img/brand/conclave-logo-light.png" alt="BITSoM Conclave" width="560" height="173">' +
              '<span class="hero__year">' + esc(year) + "</span></h1>" +
            '<p class="hero__theme">' + brand(ed.message || "Coming soon.") + "</p>" +
            (latest && latest !== year ? '<a class="btn btn--orange" href="?edition=' + esc(latest) + '">Relive Conclave ' + esc(latest) + icon("arrow") + "</a>" : "") +
          "</div>" +
        "</div>" +
      "</section>" + ribbon();
  }

  function ribbon() {
    return '<div class="ribbon" aria-hidden="true"></div>';
  }

  /* ---------- render ---------- */

  function render() {
    document.title = "BITSoM Business Conclave " + year + " | Events | BITS School of Management";
    if (!ed || ed.status !== "published") {
      root.innerHTML = subnav() + breadcrumb() + comingSoon();
      return;
    }
    var body = hero() + numbers() + about() + voices() + day() + panels() + gallery() + testimonials() + finale() + next();
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

  function setupFilters() {
    var btns = root.querySelectorAll(".filter");
    var cards = root.querySelectorAll(".speaker");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.dataset.filter;
        btns.forEach(function (x) {
          var on = x === b;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        cards.forEach(function (c) {
          c.hidden = !(f === "*" || c.dataset.sector === f);
        });
      });
    });
  }

  function setupSpeakerModal() {
    var dlg = document.getElementById("speaker-modal");
    if (!dlg || !dlg.showModal) return;
    var bodyEl = dlg.querySelector(".speaker-modal__body");
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-speaker]");
      if (!btn) return;
      var s = ed.speakers[+btn.dataset.speaker];
      bodyEl.innerHTML =
        '<div class="speaker-modal__photo duo ' + duo(+btn.dataset.speaker) + '"><img src="' + esc(s.photo) + '" alt="' + esc(s.name) + '"></div>' +
        '<div class="speaker-modal__text">' +
          '<span class="chip chip--orange">' + esc(s.sector) + "</span>" +
          "<h3>" + esc(s.name) + "</h3>" +
          '<p class="speaker-modal__role">' + esc(s.role) + (s.org ? ", " + esc(s.org) : "") + "</p>" +
          (s.logo ? '<img class="speaker-modal__logo" src="' + esc(s.logo) + '" alt="' + esc(s.org) + '">' : "") +
          "<p>" + brand(s.bio) + "</p>" +
        "</div>";
      dlg.showModal();
    });
    dlg.querySelector(".speaker-modal__close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  }

  function setupLightbox() {
    var dlg = document.getElementById("lightbox");
    if (!dlg || !dlg.showModal || !has(ed.gallery)) return;
    var img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption"), idx = 0;
    function show(i) {
      idx = (i + ed.gallery.length) % ed.gallery.length;
      var g = ed.gallery[idx];
      img.src = g.src; img.alt = g.caption; cap.textContent = g.caption + "  ·  " + (idx + 1) + " / " + ed.gallery.length;
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-photo]");
      if (!b) return;
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
  setupFilters();
  setupSpeakerModal();
  setupLightbox();
  setupScrollSpy();
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
