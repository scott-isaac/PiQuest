/**
 * Audio engine — handles both Web Audio API tones and .wav playback.
 */
const Audio = (() => {
  let ctx = null;
  let enabled = true;

  let successSound = null;
  let failSound = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function setEnabled(on) {
    enabled = on;
  }

  function isEnabled() {
    return enabled;
  }

  function preload() {
    successSound = new window.Audio("assets/audio/success.wav");
    failSound    = new window.Audio("assets/audio/fail.wav");
  }

  function playWav(sound) {
    if (!enabled || !sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  function playTone(freq, duration, type = "sine") {
    if (!enabled) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + duration);
    } catch (e) {}
  }

  function playSuccess() {
    playWav(successSound);
  }

  function playFail() {
    playWav(failSound);
  }

  function playVictory() {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => playTone(f, 0.3), i * 150)
    );
  }

  return { setEnabled, isEnabled, preload, playSuccess, playFail, playVictory };
})();
