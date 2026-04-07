/**
 * Persistent unlock storage using cookies.
 * Stores a comma-separated list of completed quest IDs.
 */
const Storage = (() => {
  const COOKIE_NAME = "piquest_unlocks";
  const EXPIRY_DAYS = 365 * 5;

  function readCookie() {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[1]) : "";
  }

  function writeCookie(value) {
    const expires = new Date(Date.now() + EXPIRY_DAYS * 864e5).toUTCString();
    document.cookie =
      COOKIE_NAME + "=" + encodeURIComponent(value) +
      "; expires=" + expires + "; path=/; SameSite=Lax";
  }

  function getCompleted() {
    const raw = readCookie();
    return raw ? new Set(raw.split(",")) : new Set();
  }

  function markCompleted(questId) {
    const completed = getCompleted();
    completed.add(questId);
    writeCookie([...completed].join(","));
  }

  function isUnlocked(quest) {
    // Quest 1 is always available
    if (quest.id === "quest1") return true;
    // Find the quest whose completion unlocks this one
    const unlocker = QUESTS.find(q => q.unlocks === quest.id);
    return unlocker ? getCompleted().has(unlocker.id) : false;
  }

  function resetAll() {
    writeCookie("");
  }

  return { getCompleted, markCompleted, isUnlocked, resetAll };
})();
