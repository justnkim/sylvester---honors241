/* ============================================================
   SITE SETTINGS: edit this part to rename things.
   Every page reads its menu from here, so you only change it once.
   ============================================================ */
const SITE = {
  title: "The Daemon in the Machine",
  subtitle: "Plutarch × Westworld",
  // Each member gets a page. "file" must match the file name in the members/ folder.
  members: [
    { name: "Varsha Charan",                 file: "varsha.html" },
    { name: "Elizabeth Curtis",              file: "elizabeth.html" },
    { name: "Chaitra Dontineni",             file: "chaitra.html" },
    { name: "Justin Kim",                    file: "justin.html" },
    { name: "Simone Ivy Pulerwitz-Waisbord", file: "simone.html" },
    { name: "Mokshitha Veluru",              file: "mokshitha.html" },
  ],
};
/* ============================================================
   You shouldn't need to edit anything below this line.
   ============================================================ */

(function () {
  const inMembers = location.pathname.includes("/members/");
  const root = inMembers ? "../" : "";
  const here = location.pathname.split("/").pop() || "index.html";
  const pad = (n) => String(n).padStart(2, "0");

  const link = (href, label, file, sub) =>
    `<a href="${href}"${file === here ? ' aria-current="page"' : ""}>${label}${sub ? `<small>${sub}</small>` : ""}</a>`;

  const memberLinks = SITE.members
    .map((m, i) => link(root + "members/" + m.file, `<span class="host-no">${pad(i + 1)}</span>${m.name}`, m.file))
    .join("");
  const onMemberPage = SITE.members.some((m) => m.file === here);

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="brand" href="${root}index.html">
      <span class="brand-title">${SITE.title}</span>
      <span class="brand-sub">${SITE.subtitle}</span>
    </a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav id="site-nav">
      ${link(root + "index.html", "Home", "index.html", "The Voice")}
      ${link(root + "team.html", "Simmias' House", "team.html", "Team Builds")}
      ${link(root + "characters.html", "Characters", "characters.html", "The Map")}
      ${link(root + "maze.html", "The Maze", "maze.html", "Find your way")}
      <details class="members-menu"${onMemberPage ? ' data-current="true"' : ""}>
        <summary>The Hosts<small>Members</small></summary>
        <div class="members-list">${memberLinks}</div>
      </details>
      <button class="analysis-toggle" aria-pressed="false" title="Analysis mode: dark diagnostic view with annotations">
        <span class="led"></span>Analysis<small>Mode</small>
      </button>
    </nav>`;
  document.body.prepend(header);

  /* ---------------- Analysis mode ---------------- */
  const aBtn = header.querySelector(".analysis-toggle");
  const setAnalysis = (on, animate) => {
    document.documentElement.classList.toggle("analysis", on);
    aBtn.setAttribute("aria-pressed", on);
    if (animate) {
      document.body.classList.remove("glitch"); void document.body.offsetWidth;
      document.body.classList.add("glitch");
    }
    try { localStorage.setItem("analysis", on ? "1" : "0"); } catch (e) {}
  };
  let saved = false;
  try { saved = localStorage.getItem("analysis") === "1"; } catch (e) {}
  setAnalysis(saved, false);
  aBtn.addEventListener("click", () => setAnalysis(!document.documentElement.classList.contains("analysis"), true));

  // Glossary (hover definitions) loads on every page
  const g = document.createElement("script");
  g.src = root + "glossary.js";
  document.body.append(g);

  const toggle = header.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open);
  });
  // close the Hosts dropdown when clicking elsewhere
  document.addEventListener("click", (e) => {
    const d = header.querySelector(".members-menu");
    if (d.open && !d.contains(e.target)) d.open = false;
  });

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<p>${SITE.title} · Honors 241 Team Portfolio</p>
    <p class="mono">&gt; end of transmission_</p>`;
  document.body.append(footer);

  // Member cards on the home page
  const grid = document.getElementById("member-grid");
  if (grid) {
    grid.innerHTML = SITE.members
      .map(
        (m, i) => `<a class="member-card" href="members/${m.file}">
          <span class="mono">Host ${pad(i + 1)} · online</span>
          <strong>${m.name}</strong>
          <span>Journal &amp; individual builds →</span>
        </a>`
      )
      .join("");
  }

  /* ---------------- Motion & scroll effects ---------------- */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".hero");
  if (hero) document.body.classList.add("has-hero");

  // Reading progress bar along the top
  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.append(bar);

  // Back-to-top button
  const topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.textContent = "↑";
  topBtn.onclick = () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  document.body.append(topBtn);

  // Estimated reading time on each build
  document.querySelectorAll("article.build, section#intro").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/).length;
    const label = el.querySelector(".build-label");
    if (label) label.insertAdjacentHTML("beforeend", ` · ${Math.max(1, Math.round(words / 230))} min read`);
  });

  let ticking = false;
  const onScroll = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("scrolled", y > 40);
    topBtn.classList.toggle("show", y > innerHeight);
    if (hero && !reduceMotion) {
      const h = hero.offsetHeight;
      const t = Math.min(y / h, 1);
      hero.style.setProperty("--parallax", `${y * 0.4}px`);
      hero.style.setProperty("--fade", 1 - t * 1.2);
      hero.style.setProperty("--lift", `${y * -0.15}px`);
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  // Fade/slide elements in as they scroll into view
  if (!reduceMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      "main h2, main h3, main p, main blockquote, main hr, main figure, .journal-entry, .member-card, .diagnostic, .toc, .build-label, details.fold"
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach((el) => {
      if (el.closest("details:not([open]) > :not(summary)")) return;
      el.classList.add("reveal");
      io.observe(el);
    });
    // stagger the member cards
    document.querySelectorAll(".member-card").forEach((c, i) => (c.style.transitionDelay = `${(i % 3) * 90}ms`));
  }

  // Highlight the section you're reading in the side contents list
  const tocLinks = [...document.querySelectorAll(".toc a[href^='#']")];
  if (tocLinks.length && "IntersectionObserver" in window) {
    const map = new Map(tocLinks.map((a) => [document.querySelector(a.getAttribute("href")), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove("active"));
          map.get(e.target)?.classList.add("active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    map.forEach((_, sec) => sec && spy.observe(sec));
  }

  // Typed "console" lines on the home page
  const consoleEl = document.getElementById("console");
  if (consoleEl) {
    const lines = JSON.parse(consoleEl.dataset.lines);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { consoleEl.innerHTML = lines.map((l) => `<div>${l}</div>`).join(""); return; }
    let li = 0, ci = 0, cur;
    const tick = () => {
      if (li >= lines.length) return;
      if (ci === 0) { cur = document.createElement("div"); consoleEl.append(cur); }
      cur.textContent = lines[li].slice(0, ++ci);
      if (ci >= lines[li].length) { li++; ci = 0; setTimeout(tick, 700); }
      else setTimeout(tick, 38);
    };
    setTimeout(tick, 600);
  }
})();
