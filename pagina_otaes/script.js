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
