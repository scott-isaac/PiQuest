/**
 * Core game logic — screen management, input handling, and game loop.
 * Depends on: chunks.js, milestones.js, deaths.js, audio.js, effects.js
 */
let mode = 1;
let currentIndex = 0;
let pendingTimer = null;

function formatMilestone(m) {
  if (mode === 2) return m.split(" ")[0];
  if (mode === 3) return "\u{1F9ED} Your next challenge awaits\u2026";
  return m;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function renderPiDisplay() {
  const prefix = '<span class="chunk known">3.14159</span> ';
  const completed = PI_CHUNKS.slice(0, currentIndex)
    .map(c => `<span class="chunk known">${c}</span>`)
    .join(" ");
  const cursor = currentIndex < PI_CHUNKS.length
    ? ' <span class="chunk cursor">?????</span>'
    : "";
  document.getElementById("pi-display").innerHTML = prefix + completed + cursor;
}

function renderGame() {
  document.getElementById("step-label").textContent =
    `Step ${currentIndex + 1} of ${PI_CHUNKS.length}`;
  document.getElementById("milestone").textContent =
    formatMilestone(MILESTONES[currentIndex]);
  document.getElementById("progress-fill").style.width =
    `${(currentIndex / PI_CHUNKS.length) * 100}%`;

  renderPiDisplay();

  const fb = document.getElementById("feedback");
  fb.className = "feedback";
  fb.innerHTML = "";

  const input = document.getElementById("digit-input");
  input.value = "";
  input.className = "";
  input.focus();
}

function showVictory() {
  showScreen("victory-screen");
  document.getElementById("victory-pi").textContent =
    "3.14159 " + PI_CHUNKS.join(" ");
  document.getElementById("progress-fill").style.width = "100%";
  Audio.playVictory();
  spawnConfetti();
}

function advanceToNext() {
  if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }

  if (currentIndex >= PI_CHUNKS.length) {
    showVictory();
    return;
  }

  document.getElementById("step-label").textContent =
    `Step ${currentIndex + 1} of ${PI_CHUNKS.length}`;
  document.getElementById("milestone").textContent =
    formatMilestone(MILESTONES[currentIndex]);
  document.getElementById("progress-fill").style.width =
    `${(currentIndex / PI_CHUNKS.length) * 100}%`;
  renderPiDisplay();

  const input = document.getElementById("digit-input");
  input.value = "";
  input.className = "";
  input.focus();
}

function handleSubmit() {
  const input = document.getElementById("digit-input");
  const guess = input.value.trim();
  if (guess.length === 0) return;

  // Cancel any pending failure timer if the player is already moving
  if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }

  if (guess === PI_CHUNKS[currentIndex]) {
    Audio.playSuccess();

    const fb = document.getElementById("feedback");
    fb.className = "feedback success";
    fb.innerHTML = "<strong>Success! Onward!</strong>";

    currentIndex++;
    // Advance the UI immediately so the player can start typing
    advanceToNext();

    // Clear the success banner after a moment
    pendingTimer = setTimeout(() => {
      fb.className = "feedback";
      fb.innerHTML = "";
      pendingTimer = null;
    }, 600);
  } else {
    Audio.playFail();
    input.classList.add("shake");

    const fb = document.getElementById("feedback");
    fb.className = "feedback failure";
    fb.innerHTML =
      `<strong>\u{1F480} ${DEATHS[currentIndex]}</strong>` +
      `<div class="correct-answer">\u{1F9E0} The correct chunk was: <strong>${PI_CHUNKS[currentIndex]}</strong></div>` +
      `<div class="death-msg">The scroll crumbles\u2026 back to the beginning.</div>`;

    currentIndex = 0;
    pendingTimer = setTimeout(() => { renderGame(); pendingTimer = null; }, 2500);
  }
}

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  Audio.preload();

  document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      mode = parseInt(btn.dataset.mode);
      Audio.setEnabled(document.getElementById("sound-check").checked);
      currentIndex = 0;
      showScreen("game-screen");
      renderGame();
    });
  });

  document.getElementById("submit-btn").addEventListener("click", handleSubmit);

  document.getElementById("digit-input").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSubmit();
  });

  document.getElementById("digit-input").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  });

  document.getElementById("play-again").addEventListener("click", () => {
    currentIndex = 0;
    showScreen("setup-screen");
  });
});
