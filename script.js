/* mobile menu */
const menu = document.getElementById("menu");
const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  burger.setAttribute("aria-expanded", false);
}));

/* reveal on scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* active zone in the zone bar */
const links = [...document.querySelectorAll(".zone-nav a")];
const zoneObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    links.forEach(l => l.classList.toggle("on", l.dataset.z === id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll(".zone").forEach(z => zoneObs.observe(z));

/* clear selection when leaving the zones block */
const zonas = document.getElementById("zonas");
new IntersectionObserver(([e]) => {
  if (!e.isIntersecting) links.forEach(l => l.classList.remove("on"));
}, { threshold: 0 }).observe(zonas);

/* schedule bars open their event card (click again to close) */
(() => {
  const panel = document.getElementById("evtPanel");
  if (!panel) return;
  const bars = [...document.querySelectorAll("a.s-bar, a.cal-hit")];
  const cards = [...panel.querySelectorAll(".evt-card")];
  const close = () => {
    panel.hidden = true;
    cards.forEach(c => c.hidden = true);
    bars.forEach(b => b.classList.remove("active"));
  };
  const open = id => {
    const card = document.getElementById(id);
    if (!card) return;
    if (!card.hidden) return close();
    const bar = bars.find(b => b.getAttribute("href") === "#" + id);
    cards.forEach(c => c.hidden = c !== card);
    bars.forEach(b => b.classList.toggle("active", b === bar));
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  bars.forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    open(b.getAttribute("href").slice(1));
  }));
  panel.querySelector(".evt-close").addEventListener("click", close);
})();

/* footer PDF buttons open a floating window */
(() => {
  const modal = document.getElementById("pdfModal");
  if (!modal) return;
  const frame = document.getElementById("pdfFrame");
  const title = document.getElementById("pdfTitle");
  const openLink = document.getElementById("pdfOpen");
  const closeBtn = modal.querySelector(".pdf-close");
  let lastBtn = null;
  const open = btn => {
    lastBtn = btn;
    title.textContent = btn.dataset.title;
    frame.title = btn.dataset.title;
    frame.src = btn.dataset.pdf;
    openLink.href = btn.dataset.pdf;
    modal.hidden = false;
    closeBtn.focus();
  };
  const close = () => {
    modal.hidden = true;
    frame.src = "about:blank";
    if (lastBtn) lastBtn.focus();
  };
  document.querySelectorAll("[data-pdf]").forEach(b => b.addEventListener("click", () => open(b)));
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
})();
