/**
 * Visual effects — confetti burst on victory.
 */
function spawnConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  const colors = ["#f0c040", "#4ade80", "#f87171", "#60a5fa", "#c084fc", "#fb923c"];

  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    el.style.left            = Math.random() * 100 + "%";
    el.style.background      = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDuration = (1.5 + Math.random() * 2) + "s";
    el.style.animationDelay  = (Math.random() * 1.5) + "s";
    el.style.borderRadius    = Math.random() > 0.5 ? "50%" : "2px";
    el.style.width           = (5 + Math.random() * 6) + "px";
    el.style.height          = (5 + Math.random() * 6) + "px";
    container.appendChild(el);
  }

  setTimeout(() => container.remove(), 5000);
}
