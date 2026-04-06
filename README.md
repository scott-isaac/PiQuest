# Pi Quest

A quest-themed web game for memorizing the first 100 digits of Pi, five digits at a time.

**[Play it here](https://scott-isaac.github.io/PiQuest/)**

## How It Works

You start with **3.14159** and enter the next 5 digits of Pi at each step. Each chunk is paired with a fantasy milestone to aid memorization. Get it wrong and you start over from the beginning.

## Difficulty Modes

| Mode | Description |
|------|-------------|
| Normal | Full milestone hints (emoji + text) |
| Hard | Emoji clues only |
| Full | No hints at all — pure recall |

## Features

- 19 quest stages covering 100 digits of Pi
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
│   │   ├── chunks.js       # Pi digit chunks
│   │   ├── milestones.js   # Quest milestone hints (swappable)
│   │   └── deaths.js       # Failure flavor text  (swappable)
│   ├── audio.js            # Sound engine
│   ├── effects.js          # Confetti
│   └── game.js             # Core game logic
├── assets/
│   └── audio/
│       ├── success.wav     # Correct answer sound
│       └── fail.wav        # Wrong answer sound
└── README.md
```

The data files under `js/data/` are designed to be swappable — drop in alternate milestones or death messages to re-theme the quest.
