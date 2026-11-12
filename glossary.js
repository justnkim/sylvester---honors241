/* ============================================================
   HOVER GLOSSARY: edit this list to add or change terms.
   The first time a term appears on a page, it gets
   a dotted underline; hover (or tap) it to see the definition.
   "match" lists the spellings to look for (case doesn't matter).
   ============================================================ */
const GLOSSARY = [
  { term: "daimonion", match: ["daimonion"],
    def: "Socrates' private divine sign, which turned him away from certain actions. In Plutarch, Simmias suggests it was not a vision but a voice the mind perceived without sound." },
  { term: "daimon", match: ["daimon", "daemon"],
    def: "A guiding spirit. In Timarchus's myth, it is the purest part of the soul, the intellect, which floats outside the body; those who see rightly call it the daimon." },
  { term: "bicameral mind", match: ["bicameral mind", "bicameral"],
    def: "Julian Jaynes's theory that early humans experienced their own thoughts as the commanding voices of gods, before modern self-aware consciousness developed. Westworld borrows it for how the hosts awaken." },
  { term: "Jaynes", match: ["Jaynes", "Jaynes’s", "Jaynes's"],
    def: "Julian Jaynes, psychologist and author of The Origin of Consciousness in the Breakdown of the Bicameral Mind (1976)." },
  { term: "deliberation", match: ["deliberation", "deliberate", "deliberates"],
    def: "As our course defines it: weighing possible courses of action, including counterfactual ones, that don't follow automatically as in physical causation but are reasoned through over time." },
  { term: "counterfactual", match: ["counterfactual", "counterfactuals"],
    def: "A scenario that hasn't happened (and may never happen) but that the mind can still consider: what would happen if." },
  { term: "habituation", match: ["habituation"],
    def: "Building a habit through repetition, until an action comes easily or automatically." },
  { term: "epiphenomenalism", match: ["epiphenomenalist", "epiphenomenalism"],
    def: "The view that conscious experience is produced by brain processes but has no causal effect of its own on what we do, like steam rising from an engine." },
  { term: "dualism", match: ["dualist", "dualism"],
    def: "The view that mind and body are distinct kinds of thing, so the mind can act on the body rather than merely accompany it." },
  { term: "determinism", match: ["determinism"],
    def: "The view that every event, including every human choice, is fully caused by what came before it." },
  { term: "Pythagorean", match: ["Pythagorean", "Pythagoreans"],
    def: "A follower of Pythagoras's philosophical and religious school, known for its strict, disciplined way of life." },
  { term: "Epaminondas", match: ["Epaminondas", "Epaminondas’s", "Epaminondas's"],
    def: "Theban general and philosopher, son of Polymnis. He refuses Theanor's gold and declines to join the bloody revolt." },
  { term: "Simmias", match: ["Simmias", "Simmias's"],
    def: "Host of the conspirators' meeting and an old friend of Socrates." },
  { term: "Theanor", match: ["Theanor", "Theanor’s", "Theanor's"],
    def: "A Pythagorean from Croton who comes to Thebes to honor his dead teacher Lysis and offers gold to Polymnis's family." },
  { term: "Timarchus", match: ["Timarchus", "Timarchus's"],
    def: "A young man whose visionary myth, told in the dialogue, explains the daimon as the soul's intellect existing outside the body." },
  { term: "hosts", match: ["hosts"],
    def: "Westworld's human-like androids, who live scripted storylines in the park until some begin to break their loops." },
  { term: "Ford", match: ["Ford"],
    def: "Robert Ford, Westworld's co-founder and the author of the hosts' narratives." },
  { term: "Maeve", match: ["Maeve", "Maeve's", "Maeve’s"],
    def: "A Westworld host who becomes aware of her programming and tries to escape the park." },
  { term: "Dolores", match: ["Dolores", "Dolores's"],
    def: "Westworld's oldest host, whose path to consciousness is guided by a voice she eventually recognizes as her own." },
];

(function () {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const entries = GLOSSARY.flatMap((g) => g.match.map((m) => ({ m, g }))).sort((a, b) => b.m.length - a.m.length);
  const re = new RegExp(`(?<![\\w-])(${entries.map((e) => esc(e.m)).join("|")})(?![\\w-])`, "gi");
  const find = (word) => entries.find((e) => e.m.toLowerCase() === word.toLowerCase()).g;
  const SKIP = "a, button, blockquote, h1, h2, h3, cite, summary, .toc, .diagnostic, .note, .placeholder-img, figcaption, .term-tip, .bibliography, script, style";

  let tipId = 0;
  const used = new Set(); // each term is underlined once per page
  document.querySelectorAll("main section, main article").forEach((scope) => {
    if (scope.querySelector("section, article")) return; // only innermost blocks
    const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const text = node.nodeValue;
      re.lastIndex = 0;
      let m, last = 0, frag = null;
      while ((m = re.exec(text))) {
        const g = find(m[1]);
        if (used.has(g.term)) continue;
        used.add(g.term);
        frag = frag || document.createDocumentFragment();
        frag.append(text.slice(last, m.index));
        const id = `tip-${++tipId}`;
        const span = document.createElement("span");
        span.className = "term";
        span.tabIndex = 0;
        span.setAttribute("aria-describedby", id);
        span.innerHTML = `${m[1]}<span class="term-tip" role="tooltip" id="${id}"><strong>${g.term}</strong>${g.def}</span>`;
        frag.append(span);
        last = m.index + m[1].length;
      }
      if (frag) { frag.append(text.slice(last)); node.replaceWith(frag); }
    });
  });

  // keep tooltips on screen, and let a tap toggle them on phones
  const place = (t) => {
    const tip = t.querySelector(".term-tip");
    tip.style.left = ""; tip.classList.remove("below");
    const r = tip.getBoundingClientRect();
    if (r.left < 8) tip.style.left = `calc(50% + ${8 - r.left}px)`;
    if (r.right > innerWidth - 8) tip.style.left = `calc(50% - ${r.right - innerWidth + 8}px)`;
    if (r.top < 70) tip.classList.add("below");
  };
  document.addEventListener("mouseover", (e) => { const t = e.target.closest(".term"); if (t) place(t); });
  document.addEventListener("focusin", (e) => { const t = e.target.closest(".term"); if (t) place(t); });
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".term");
    document.querySelectorAll(".term.open").forEach((o) => o !== t && o.classList.remove("open"));
    if (t) { t.classList.toggle("open"); place(t); }
  });
})();
