/**
 * Quest registry — builds the quest list from individual quest modules.
 * The Full Quest is assembled automatically from Quest 1 + Quest 2.
 */
const QUEST_FULL = {
  id:       "quest-full",
  name:     "The Full Quest",
  subtitle: "All 200 digits of Pi in one legendary run",
  prefix:   "3.14159",
  unlocks:  null,

  chunks:     QUEST_1.chunks.concat(QUEST_2.chunks),
  milestones: QUEST_1.milestones.concat(QUEST_2.milestones),
  deaths:     QUEST_1.deaths.concat(QUEST_2.deaths),

  victoryIcon:  "\u{1F3C6}",
  victoryTitle: "Ascend to the Hall of Legends!",
  victoryText:  "200 digits. One hero. The realm shall never forget."
};

const QUESTS = [QUEST_1, QUEST_2, QUEST_FULL];
