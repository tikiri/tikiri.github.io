/* ===== obeysekera.net — shared script =====
   Builds the menu and footer on every page, and the publication list and
   photo gallery. To add a page to the menu, add a line to NAV below. */

var NAV = [
  ["index.html", "Home"],
  ["experience.html", "Experience"],
  ["research.html", "Research"],
  ["publications.html", "Publications"],
  ["teaching.html", "Teaching"],
  ["service.html", "Service"],
  ["photo-gallery.html", "Gallery"],
  ["http://tsunami.obeysekera.net", "Tsunami Project"],
  ["contact.html", "Contact"]
];

var WAVES = '<svg class="waves" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">' +
  '<path fill="var(--paper)" opacity=".35" d="M0 40c120 22 240 30 360 18S600 8 720 14s240 40 360 42 240-26 360-30v64H0z"/>' +
  '<path fill="var(--paper)" d="M0 62c160 18 320 20 480 6s320-30 480-20 320 30 480 28v14H0z"/></svg>';

function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

/* ---------- header & footer ---------- */
(function () {
  var here = location.pathname.split("/").pop() || "index.html";
  var links = NAV.map(function (n) {
    var cur = n[0] === here ? ' aria-current="page"' : "";
    return '<a href="' + n[0] + '"' + cur + ">" + n[1] + "</a>";
  }).join("");
  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = '<div class="wrap"><a class="brand" href="index.html">J. Obeysekera <small>(‘Obey’)</small></a>' +
      '<button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav></div>";
    var btn = header.querySelector(".menu-btn"), nav = header.querySelector(".nav");
    btn.addEventListener("click", function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  }
  var footer = document.getElementById("site-footer");
  if (footer && window.SITE) {
    footer.className = "site-footer";
    footer.innerHTML = '<div class="wrap"><div>© ' + new Date().getFullYear() + " " + esc(SITE.name) +
      '<br>Sea Level Solutions Center, Florida International University</div>' +
      '<div><a href="mailto:' + SITE.email + '">' + SITE.email + '</a> · <a href="' + SITE.cv + '">Download CV (PDF)</a></div></div>';
  }
  document.querySelectorAll("[data-waves]").forEach(function (el) { el.insertAdjacentHTML("beforeend", WAVES); });

  /* profile buttons */
  document.querySelectorAll("[data-profiles]").forEach(function (el) {
    var cls = el.getAttribute("data-profiles") || "btn btn-line";
    el.innerHTML = SITE.profiles.filter(function (p) { return p.url; }).map(function (p) {
      return '<a class="' + cls + '" href="' + p.url + '" target="_blank" rel="noopener">' + esc(p.label) + "</a>";
    }).join("");
  });
  document.querySelectorAll("[data-email]").forEach(function (el) { el.href = "mailto:" + SITE.email; if (!el.textContent.trim()) el.textContent = SITE.email; });
  document.querySelectorAll("[data-cv]").forEach(function (el) { el.href = SITE.cv; });

  /* headshot fallback to old site until images/headshot.jpg exists */
  document.querySelectorAll("img[data-headshot]").forEach(function (img) {
    img.addEventListener("error", function onErr() {
      if (window.HEADSHOT_OLD && img.src !== HEADSHOT_OLD) { img.src = HEADSHOT_OLD; return; }
      img.removeEventListener("error", onErr);
      var d = document.createElement("div"); d.className = img.className + " portrait-missing"; d.textContent = "JO"; d.setAttribute("aria-hidden", "true");
      img.replaceWith(d);
    });
    if (img.complete && !img.naturalWidth) img.dispatchEvent(new Event("error"));
  });
})();

/* ---------- publications page ---------- */
var NAME_RE = /(Obeysekera,\s*J(?:\.\s*T\.\s*B\.|\.T\.B\.|\.)?|(?:Jayantha|J\.?)\s*(?:T\.\s*B\.\s*)?Obeysekera)/g;
function citeHTML(p) {
  var text = esc(p.c).replace(NAME_RE, "<strong>$1</strong>");
  var link = p.doi ? ' <a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">doi:' + esc(p.doi) + "</a>"
           : (p.url ? ' <a href="' + esc(p.url) + '" target="_blank" rel="noopener">Link</a>' : "");
  return text + link;
}

function renderPublications() {
  var box = document.getElementById("pub-list");
  if (!box || !window.PUBS) return;
  var search = document.getElementById("pub-search"), catBox = document.getElementById("pub-cats"),
      chipsBox = document.getElementById("pub-chips"), count = document.getElementById("pub-count");
  var cat = "all", topic = "all", total = 0;
  PUB_CATEGORIES.forEach(function (c) { total += (PUBS[c.key] || []).length; });

  catBox.innerHTML = [["all", "All (" + total + ")"]].concat(PUB_CATEGORIES.map(function (c) {
    return [c.key, c.label + " (" + PUBS[c.key].length + ")"]; })).map(function (t) {
    return '<button class="chip" data-v="' + t[0] + '" aria-pressed="' + (t[0] === "all") + '">' + esc(t[1]) + "</button>"; }).join("");
  chipsBox.innerHTML = [["all", "All topics"]].concat(Object.keys(PUB_TOPICS).map(function (k) { return [k, PUB_TOPICS[k]]; })).map(function (t) {
    return '<button class="chip" data-v="' + t[0] + '" aria-pressed="' + (t[0] === "all") + '">' + esc(t[1]) + "</button>"; }).join("");
  function bind(el, set) {
    el.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      set(b.dataset.v);
      el.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      draw();
    });
  }
  bind(catBox, function (v) { cat = v; }); bind(chipsBox, function (v) { topic = v; });
  search.addEventListener("input", draw);

  function draw() {
    var q = search.value.trim().toLowerCase(), html = "", shown = 0;
    PUB_CATEGORIES.forEach(function (c) {
      if (cat !== "all" && cat !== c.key) return;
      var list = PUBS[c.key], n = list.length, rows = "";
      list.forEach(function (p, i) {
        if (topic !== "all" && (p.tags || []).indexOf(topic) < 0) return;
        if (q && (p.c + " " + (p.y || "") + " " + (p.doi || "")).toLowerCase().indexOf(q) < 0) return;
        rows += '<li value="' + (n - i) + '">' + citeHTML(p) + "</li>"; shown++;
      });
      if (rows) html += '<h2 class="pub-cat" id="' + c.key + '">' + esc(c.label) + ' <span class="count">(' + n + ")</span></h2>" +
                        '<ol class="pubs" reversed>' + rows + "</ol>";
    });
    count.textContent = "Showing " + shown + " of " + total + " items · as listed in the CV (" + PUB_AS_OF + ")";
    box.innerHTML = html || '<p class="muted">Nothing matches your search.</p>';
  }
  draw();
}

/* latest publications + counts on the home page */
function renderLatest() {
  if (!window.PUBS) return;
  document.querySelectorAll("[data-pub-count]").forEach(function (el) { el.textContent = PUBS.journal.length; });
  var box = document.getElementById("latest-pubs");
  if (box) box.innerHTML = '<ol class="pubs">' + PUBS.journal.slice(0, 5).map(function (p) { return "<li>" + citeHTML(p) + "</li>"; }).join("") + "</ol>";
}

/* ---------- gallery ---------- */
function renderGallery() {
  var box = document.getElementById("gallery");
  if (!box || !window.GALLERY) return;
  box.innerHTML = GALLERY.map(function (g, i) {
    return '<figure data-i="' + i + '"><img loading="lazy" src="' + g.src + '" alt="' + esc(g.caption) + '"><figcaption>' + esc(g.caption) + "</figcaption></figure>";
  }).join("");
  box.querySelectorAll("img").forEach(function (img, i) {
    img.addEventListener("error", function onErr() {
      if (GALLERY[i].old && img.src !== GALLERY[i].old) { img.src = GALLERY[i].old; return; }
      img.removeEventListener("error", onErr); img.classList.add("img-missing"); img.removeAttribute("src");
    });
  });
  var lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p"), cur = 0;
  function show(i) { cur = (i + GALLERY.length) % GALLERY.length; var im = box.querySelectorAll("img")[cur]; lbImg.src = im.currentSrc || im.src; lbImg.alt = GALLERY[cur].caption; lbCap.textContent = GALLERY[cur].caption; lb.classList.add("open"); }
  box.addEventListener("click", function (e) { var f = e.target.closest("figure"); if (f) show(+f.dataset.i); });
  lb.querySelector(".lb-close").onclick = function () { lb.classList.remove("open"); };
  lb.querySelector(".lb-prev").onclick = function () { show(cur - 1); };
  lb.querySelector(".lb-next").onclick = function () { show(cur + 1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.classList.remove("open"); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lb.classList.remove("open"); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1);
  });
}

renderPublications(); renderLatest(); renderGallery();
