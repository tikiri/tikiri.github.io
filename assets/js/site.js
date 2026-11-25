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
  });
})();

/* ---------- publications page ---------- */
function citation(p) {
  var link = p.doi ? '<a href="https://doi.org/' + p.doi + '" target="_blank" rel="noopener">doi:' + esc(p.doi) + "</a>"
                   : (p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener">Link</a>' : "");
  return '<div class="pub"><div class="t">' + esc(p.t) + (p.note ? '<span class="award">★ ' + esc(p.note) + "</span>" : "") + "</div>" +
    '<div class="a">' + esc(p.a) + " (" + p.y + ")</div>" +
    '<div class="v">' + esc(p.v) + "</div>" + (link ? '<div class="links">' + link + "</div>" : "") + "</div>";
}

function renderPublications() {
  var box = document.getElementById("pub-list");
  if (!box || !window.PUBLICATIONS) return;
  var search = document.getElementById("pub-search"), chipsBox = document.getElementById("pub-chips"), count = document.getElementById("pub-count");
  var active = "all";
  var topics = [["all", "All topics"]].concat(Object.keys(PUB_TOPICS).map(function (k) { return [k, PUB_TOPICS[k]]; }));
  chipsBox.innerHTML = topics.map(function (t) {
    return '<button class="chip" data-topic="' + t[0] + '" aria-pressed="' + (t[0] === "all") + '">' + esc(t[1]) + "</button>";
  }).join("");
  chipsBox.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    active = b.dataset.topic;
    chipsBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
    draw();
  });
  search.addEventListener("input", draw);

  function draw() {
    var q = search.value.trim().toLowerCase();
    var list = PUBLICATIONS.filter(function (p) {
      if (active !== "all" && (p.tags || []).indexOf(active) < 0) return false;
      if (!q) return true;
      return (p.t + " " + p.a + " " + p.v + " " + p.y).toLowerCase().indexOf(q) >= 0;
    }).sort(function (a, b) { return b.y - a.y; });
    count.textContent = list.length + " of " + PUBLICATIONS.length + " peer-reviewed publications";
    var html = "", year = null;
    list.forEach(function (p) {
      if (p.y !== year) { year = p.y; html += '<h3 class="pub-year">' + year + "</h3>"; }
      html += citation(p);
    });
    box.innerHTML = html || '<p class="muted">No publications match your search.</p>';
  }
  draw();

  var books = document.getElementById("book-list");
  if (books && window.BOOKS) books.innerHTML = BOOKS.map(function (b) {
    return '<li><strong>' + esc(b.t) + "</strong> (" + b.y + ")<br><span class=\"muted\">" + esc(b.v) + "</span></li>";
  }).join("");
  var reps = document.getElementById("report-list");
  if (reps && window.REPORTS) reps.innerHTML = REPORTS.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("");
}

/* latest publications on the home page */
function renderLatest() {
  var box = document.getElementById("latest-pubs");
  if (!box || !window.PUBLICATIONS) return;
  box.innerHTML = PUBLICATIONS.slice().sort(function (a, b) { return b.y - a.y; }).slice(0, 4).map(citation).join("");
  var n = document.querySelectorAll("[data-pub-count]");
  n.forEach(function (el) { el.textContent = PUBLICATIONS.length; });
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
