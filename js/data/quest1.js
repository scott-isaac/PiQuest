/**
 * Quest 1: The Forgotten Kingdom
 * Covers digits 6–100 of Pi (after the "3.14159" prefix).
 * 19 chunks of 5 digits each.
 */
const QUEST_1 = {
  id:       "quest1",
  name:     "The Forgotten Kingdom",
  subtitle: "Master the first 100 digits of Pi",
  prefix:   "3.14159",
  unlocks:  "quest2",

  chunks: [
    "26535", "89793", "23846", "26433", "83279",
    "50288", "41971", "69399", "37510", "58209",
    "74944", "59230", "78164", "06286", "20899",
    "86280", "34825", "34211", "70679"
  ],

  milestones: [
    "\u{1F4E6} Dive into the abyss and survive",
    "\u{1F9CA} Fight the mighty yeti on the frost peaks",
    "\u{1F333} Free the treefolk from the mimic grove",
    "\u{1FAA4} Set your traps \u2014 but don\u2019t trigger them",
    "\u26F8\uFE0F Skate across the enchanted gates on thin ice",
    "\u{1F4A5} Cross the crumbling bridge before it breaks",
    "\u{1F525} Forge the ring of fire without burning your soul",
    "\u{1F9D7} Climb the craggy cliff before gravity strikes",
    "\u{1F9DA} Dance with the dryads and live to tell",
    "\u2694\uFE0F Outfence the five brave elven duelists",
    "\u{1F30C} Steal the foretold scroll past every alarm",
    "\u{1F525} Firewalk the coals without getting toasted",
    "\u{1F4A7} Sip from the sapphire spring \u2014 beware the curse",
    "\u{1FAA8} Rest beneath the sacred stone \u2014 don\u2019t get crushed",
    "\u{1F409} Dodge the twin dragons\u2019 flames",
    "\u{1F577}\uFE0F Survive the eight-legged ambush in the nest",
    "\u2604\uFE0F Catch the comet before it catches you",
    "\u{1F5FC} Scale the silver spire without looking down",
    "\u{1F40D} Slay the shadow serpent before it devours you"
  ],

  deaths: [
    "You dive too deep and discover\u2026 the bottomless pit of regret.",
    "The yeti mistakes you for a snow cone. Crunch.",
    "You hug the wrong tree. It\u2019s a mimic.",
    "Your own trap triggers. You explode in slapstick slow motion.",
    "You slip on magical ice and land in another timeline.",
    "The bridge breaks. You pose heroically as you fall forever.",
    "You forge the ring\u2026 in your dreams. It burns your soul.",
    "You climb the cliff\u2014then gravity says hi.",
    "Dryads invite you to dance\u2026 to death.",
    "Elves duel you instead. You\u2019re fencing practice now.",
    "You steal the scroll\u2014and trigger every magical alarm ever.",
    "You firewalk\u2026 barefoot. Now you\u2019re toast.",
    "The spring is refreshing\u2026 and cursed. You dissolve poetically.",
    "The sacred stone snores and rolls over you.",
    "The dragons don\u2019t like dodging games. You\u2019re flamb\u00e9.",
    "You poke the spider nest. Regret is swift.",
    "You catch the comet\u2014with your face. Vaporized.",
    "You fall from the spire yelling \u2018YOLOooooo\u2026\u2019",
    "The serpent\u2019s shadow eats your shadow. Then the rest of you."
  ],

  victoryIcon:  "\u{1F451}",
  victoryTitle: "Claim the Crown of Code!",
  victoryText:  "You have conquered the Forgotten Kingdom and become a legend."
};
