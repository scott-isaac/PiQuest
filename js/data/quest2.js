/**
 * Quest 2: The Sunken Realm
 * Covers digits 101–200 of Pi.
 * 20 chunks of 5 digits each.
 * Unlocked by completing Quest 1.
 */
const QUEST_2 = {
  id:       "quest2",
  name:     "The Sunken Realm",
  subtitle: "Conquer digits 101 through 200",
  prefix:   "\u2026 70679",
  unlocks:  "quest-full",

  chunks: [
    "82148", "08651", "32823", "06647", "09384",
    "46095", "50582", "23172", "53594", "08128",
    "48111", "74502", "84102", "70193", "85211",
    "05559", "64462", "29489", "54930", "38196"
  ],

  milestones: [
    "\u{1F6A2} Sail to the edge of the great unknown",
    "\u{1F32B}\uFE0F Navigate the fog-blind strait",
    "\u{1F40A} Tame the three-headed sea beast",
    "\u{1F5DD}\uFE0F Unlock the sunken vault\u2019s secrets",
    "\u{1F30A} Outswim the ocean\u2019s wrath",
    "\u{1F52D} Chart the stars from the crow\u2019s nest",
    "\u{1F9AA} Find the five lost pearls of the deep",
    "\u{1F9DC} Trade with the twin-tailed merfolk",
    "\u{1F419} Fight the kraken in the whirlpool",
    "\u{1F6AA} Open the gate to the ocean floor",
    "\u2693 Forge an anchor from the fallen star",
    "\u{1F3B6} Steal the siren\u2019s enchanted harp",
    "\u{1F9E0} Brave the eight-armed coral guardian",
    "\u{1F303} Sail the seven seas by starlight",
    "\u{1F40B} Escape the whalebone prison",
    "\u{1F47B} Outwit the phantom fleet\u2019s captain",
    "\u{1F3DB}\uFE0F Raise the sunken temple from the depths",
    "\u{1F4DC} Decipher the tidal rune inscription",
    "\u{1F3C4} Ride the final wave to the horizon",
    "\u{1F531} Claim the Trident of the Deep"
  ],

  deaths: [
    "You sail too far and the sea swallows your ship whole.",
    "The fog hides a reef. Your hull says hello.",
    "The sea beast has three heads and zero patience. Gulp.",
    "The vault\u2019s lock is a riddle. You answer wrong. It floods.",
    "The ocean\u2019s wrath catches up. You\u2019re a very wet ex-hero.",
    "You misread the stars and navigate straight into a maelstrom.",
    "The pearls were guarded by electric eels. Shocking.",
    "The merfolk trade unfairly. You owe them your legs.",
    "The kraken hugs you. It\u2019s not affection.",
    "The gate opens \u2014 to a wall of pressurized water. Splat.",
    "The fallen star is still hot. Your anchor melts. So do you.",
    "The siren\u2019s harp plays your funeral march. Beautifully.",
    "The coral guardian has eight arms and you have two. Do the math.",
    "Night sailing is romantic until the sea serpents show up.",
    "The whalebone prison has no exits. You\u2019re a permanent exhibit.",
    "The phantom captain challenges you to chess. You lose. Forever.",
    "The temple rises \u2014 onto your ship. Crunch.",
    "You decipher the rune. It says \u2018turn back.\u2019 Too late.",
    "The final wave is bigger than expected. Much, much bigger.",
    "You reach for the Trident and it reaches back. Zap."
  ],

  victoryIcon:  "\u{1F531}",
  victoryTitle: "Claim the Trident of the Deep!",
  victoryText:  "The ocean bows before you. The Sunken Realm is yours."
};
