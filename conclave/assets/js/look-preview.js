/*
 * Background preview: switch between the page looks in conclave.css
 * ([data-look] on <html>) to compare them on the live page.
 *
 *   ?look=ivory      open with a look (classic, ivory, mist, duo, aura)
 *
 * The choice is remembered while browsing between the two views.
 * Temporary: once a look is chosen, make it the default in conclave.css,
 * then delete this file and its <script> tag in index.html.
 */
(function () {
  "use strict";

  var LOOKS = [["classic", "Classic"], ["ivory", "Ivory"], ["mist", "Mist"], ["duo", "Duo"], ["aura", "Aura"]];
  var KEY = "conclave-look";
  var html = document.documentElement;

  function valid(v) { return LOOKS.some(function (l) { return l[0] === v; }); }
  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(v) {
    if (v === "classic") html.removeAttribute("data-look");
    else html.setAttribute("data-look", v);
    try { localStorage.setItem(KEY, v); } catch (e) { /* private mode: not remembered */ }
  }

  var asked = new URLSearchParams(window.location.search).get("look");
  var look = valid(asked) ? asked : valid(stored()) ? stored() : "classic";
  apply(look); // before first paint, so the page never flashes the default

  var css =
    ".look-picker{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:4px;" +
      "padding:5px;border-radius:999px;background:rgba(255,255,255,.96);border:1px solid rgba(37,42,96,.14);" +
      "box-shadow:0 12px 32px -12px rgba(29,31,63,.45);font-family:var(--f-head);max-width:calc(100vw - 24px)}" +
    ".look-picker span{padding:0 10px 0 12px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#5B5F7E}" +
    ".look-picker button{cursor:pointer;border:0;border-radius:999px;padding:8px 12px 7px;background:transparent;" +
      "font:inherit;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#252A60}" +
    ".look-picker button[aria-pressed=true]{background:#252A60;color:#fff}" +
    "@media (max-width:560px){.look-picker span{display:none}.look-picker button{padding:8px 9px 7px;font-size:11px;letter-spacing:.08em}}";

  document.addEventListener("DOMContentLoaded", function () {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement("div");
    bar.className = "look-picker";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Preview page background");
    bar.innerHTML = "<span>Background</span>" + LOOKS.map(function (l) {
      return '<button type="button" data-value="' + l[0] + '" aria-pressed="' + (l[0] === look) + '">' + l[1] + "</button>";
    }).join("");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      look = b.getAttribute("data-value");
      apply(look);
      bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    });
    document.body.appendChild(bar);
  });
})();
