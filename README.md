# Pi Quest

A quest-themed web game for memorizing the first 200 digits of Pi, five digits at a time.

**[Play it here](https://scott-isaac.github.io/PiQuest/)**

## How It Works

You start with **3.14159** and enter the next 5 digits of Pi at each step. Each chunk is paired with a fantasy milestone to aid memorization. Get it wrong and you start over from the beginning.

## Quests

| Quest | Digits | Unlock |
|-------|--------|--------|
| The Forgotten Kingdom | 1–100 | Available from the start |
| The Sunken Realm | 101–200 | Complete Quest 1 |
| The Full Quest | 1–200 | Complete Quest 2 |

Progress is saved via cookies — unlocks persist across sessions.

## Difficulty Modes

| Mode | Description |
|------|-------------|
| Normal | Full milestone hints (emoji + text) |
| Hard | Emoji clues only |
| Full | No hints at all — pure recall |

## Features

- 39 quest stages covering 200 digits of Pi
- Cookie-based progression unlocks
- Mnemonic milestones and humorous death messages
- Sound effects (.wav) with Web Audio API fallback
- Progress bar and live digit display
- Confetti on victory
- No build step, no dependencies — just static files

## Project Structure

```
├── index.html              # Page markup
├── css/
│   └── style.css           # All styles
├── js/
│   ├── data/
│   │   ├── quest1.js       # The Forgotten Kingdom (digits 1–100)
│   │   ├── quest2.js       # The Sunken Realm (digits 101–200)
│   │   └── quests.js       # Quest registry + Full Quest assembly
│   ├── storage.js          # Cookie-based unlock persistence
│   ├── audio.js            # Sound engine
│   ├── effects.js          # Confetti
│   └── game.js             # Core game logic
├── assets/
│   └── audio/
│       ├── success.wav     # Correct answer sound
│       └── fail.wav        # Wrong answer sound
└── README.md
```

Each quest file under `js/data/` is self-contained (chunks, milestones, deaths) — swap one out to re-theme that leg of the journey.
