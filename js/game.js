/**
 * Core game logic — screen management, input handling, and game loop.
 * Depends on: quest1.js, quest2.js, quests.js, storage.js, audio.js, effects.js
 */
let mode = 1;
let currentIndex = 0;
let pendingTimer = null;
let activeQuest = null;

function formatMilestone(m) {
  if (mode === 2) return m.split(" ")[0];
  if (mode === 3) return "\u{1F9ED} Your next challenge awaits\u2026";
  return m;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// --- Quest picker ---

function renderQuestPicker() {
  const list = document.getElementById("quest-list");
  list.innerHTML = "";

  QUESTS.forEach(quest => {
    const unlocked = Storage.isUnlocked(quest);
    const completed = Storage.getCompleted().has(quest.id);

    const btn = document.createElement("button");
    btn.className = "quest-btn" + (unlocked ? "" : " locked");
    btn.disabled = !unlocked;

    const badge = completed ? ' <span class="quest-badge">completed</span>' : "";
    const lockIcon = unlocked ? "" : '<span class="quest-lock">\u{1F512}</span> ';

    btn.innerHTML =
      `<span class="label">${lockIcon}${quest.name}${badge}</span><br>` +
      `<span class="desc">${quest.subtitle}` +
      `${!unlocked ? " \u2014 complete the previous quest to unlock" : ""}` +
      `</span>`;

    if (unlocked) {
      btn.addEventListener("click", () => {
        activeQuest = quest;
        showScreen("setup-screen");
      });
    }

    list.appendChild(btn);
  });
}

// --- Pi display ---

function renderPiDisplay() {
  const prefix = '<span class="chunk known">' + activeQuest.prefix + '</span> ';
  const completed = activeQuest.chunks.slice(0, currentIndex)
    .map(c => `<span class="chunk known">${c}</span>`)
    .join(" ");
  const cursor = currentIndex < activeQuest.chunks.length
    ? ' <span class="chunk cursor">?????</span>'
    : "";
  document.getElementById("pi-display").innerHTML = prefix + completed + cursor;
}

// --- Game rendering ---

function renderGame() {
  document.getElementById("step-label").textContent =
    `Step ${currentIndex + 1} of ${activeQuest.chunks.length}`;
  document.getElementById("milestone").textContent =
    formatMilestone(activeQuest.milestones[currentIndex]);
  document.getElementById("progress-fill").style.width =
    `${(currentIndex / activeQuest.chunks.length) * 100}%`;

  renderPiDisplay();

  const fb = document.getElementById("feedback");
  fb.className = "feedback";
  fb.innerHTML = "";

  const input = document.getElementById("digit-input");
  input.value = "";
  input.className = "";
  input.focus();
}

function advanceToNext() {
  if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }

  if (currentIndex >= activeQuest.chunks.length) {
    showVictory();
    return;
  }

  document.getElementById("step-label").textContent =
    `Step ${currentIndex + 1} of ${activeQuest.chunks.length}`;
  document.getElementById("milestone").textContent =
    formatMilestone(activeQuest.milestones[currentIndex]);
  document.getElementById("progress-fill").style.width =
    `${(currentIndex / activeQuest.chunks.length) * 100}%`;
  renderPiDisplay();

  const input = document.getElementById("digit-input");
  input.value = "";
  input.className = "";
  input.focus();
}

// --- Victory ---

function showVictory() {
  // Persist completion and unlock next quest
  Storage.markCompleted(activeQuest.id);

  document.getElementById("victory-icon").textContent = activeQuest.victoryIcon;
  document.getElementById("victory-title").textContent = activeQuest.victoryTitle;
  document.getElementById("victory-text").textContent = activeQuest.victoryText;
  document.getElementById("victory-pi").textContent =
    activeQuest.prefix + " " + activeQuest.chunks.join(" ");
  document.getElementById("progress-fill").style.width = "100%";

  // Show unlock notice if a new quest was just unlocked
  const notice = document.getElementById("unlock-notice");
  if (activeQuest.unlocks) {
    const next = QUESTS.find(q => q.id === activeQuest.unlocks);
    if (next) {
      notice.textContent = "\u{1F513} " + next.name + " unlocked!";
      notice.style.display = "block";
    }
  } else {
    notice.style.display = "none";
  }

  showScreen("victory-screen");
  Audio.playVictory();
  spawnConfetti();
}

// --- Input handling ---

function handleSubmit() {
  const input = document.getElementById("digit-input");
  const guess = input.value.trim();
  if (guess.length === 0) return;

  if (pendingTimer) { clearTimeout(pendingTimer); pendingTimer = null; }

  if (guess === activeQuest.chunks[currentIndex]) {
    Audio.playSuccess();

    const fb = document.getElementById("feedback");
    fb.className = "feedback success";
    fb.innerHTML = "<strong>Success! Onward!</strong>";

    currentIndex++;
    advanceToNext();

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
      `<strong>\u{1F480} ${activeQuest.deaths[currentIndex]}</strong>` +
      `<div class="correct-answer">\u{1F9E0} The correct chunk was: <strong>${activeQuest.chunks[currentIndex]}</strong></div>` +
      `<div class="death-msg">The scroll crumbles\u2026 back to the beginning.</div>`;

    currentIndex = 0;
    pendingTimer = setTimeout(() => { renderGame(); pendingTimer = null; }, 2500);
  }
}

// --- Initialization ---

document.addEventListener("DOMContentLoaded", () => {
  Audio.preload();
  renderQuestPicker();

  // Mode selection → start game
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
    renderQuestPicker();
    showScreen("quest-screen");
  });
});
