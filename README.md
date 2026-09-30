# Codnames 🕵️‍♂️🔍

A modern, responsive, real-time multiplayer implementation of the award-winning espionage board game **Codenames**, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, ready for 1-click deployment on **Vercel**.

---

## ✨ Features

- **🎮 Full Codenames Mechanics**:
  - Classic 5×5 interactive board (25 cards).
  - Red vs. Blue teams + Spectator gallery.
  - Spymaster vs. Operative roles.
  - 3D card flips with instant reveals and physical feel.
  - Secret Spymaster keycard view with accidental-reveal safeguard.
  - Operative card suggestion tokens and guess confirmation popups.
  - Clue submission console (word + number, unlimited, or zero).
  - Countdown turn timer with auditory and visual warnings.
  - Instant loss condition on revealing the Assassin.
  - Victory celebrations with confetti and full mission stats.
  - Instant rematch button preserving all players and roles in the room.

- **🎨 Bespoke Character Artwork System**:
  - Consistent **Mid-Century Espionage Noir** vector character illustrations across all card types:
    - 9 Unique Red Agents (The Mastermind, Femme Fatale, Cryptographer, etc.)
    - 9 Unique Blue Agents (Director of Ops, Counter-Hacker, Extraction Pilot, etc.)
    - 7 Unique Innocent Bystanders (Tourist, Barista, Dog Walker, Librarian, etc.)
    - 1 Sinister Assassin (The Shadow)
  - Selectable player avatars for nicknames.

- **📦 14 Official & Themed Expansions**:
  - **Core Games**: Codenames Classic (400 words), Codenames Duet (388 words), Deep Undercover 2.1 (334 18+/NSFW words).
  - **Official Expansion Packs** (from [codenamesgame.com](https://www.codenamesgame.com)):
    - *Sci-Fi Expansion Pack* (space exploration, cybernetics, alien worlds)
    - *Fairy Tales Expansion Pack* (folklore, mythology, enchanted fables)
    - *Cute Critters Pack* (nature, wildlife, animal concepts)
  - **Licensed Universes**:
    - *Critical Role & Vox Machina* (D&D, spells, taverns, Exandria)
    - *Back to Hogwarts* (Harry Potter wizarding lore, potions, beasts)
    - *Marvel Universe* (Superheroes, villains, Infinity artifacts)
    - *Disney Family Edition* (Animated classics, whimsical songs)
    - *The Simpsons* (Springfield satire, catchphrases, donuts)
    - *Blizzard Universe* (Warcraft, Overwatch, StarCraft, Diablo)
  - **Thematic Packs**:
    - *Tech, Code & AI* (developers, software engineering, algorithms)
    - *Pop Culture & Cinema* (blockbusters, music, viral culture)
  - **Custom Word Pack Creator**:
    - Paste custom words directly into the room settings to mix into the deck!

- **🔊 Procedural Web Audio Synthesizer**:
  - Built-in sound effects (card flip, clue chime, buzzer, timer ticks, victory fanfare) synthesized using the browser's Web Audio API — zero external audio files, zero 404s, works offline!

- **⚡ Shareable Room URLs**:
  - Instant room creation with friendly codes (e.g. `FOX-429`) or custom slugs.
  - One-click share link and room code copy.

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

### Option 1: Zero-Config Deployment
1. Push your repository to **GitHub**.
2. Import the repository into **Vercel**.
3. Click **Deploy**. The app will run smoothly with the built-in serverless state store.

### Option 2: 1-Click Upstash Redis for Persistent Serverless Sync
To persist room states across distributed serverless function instances on Vercel:
1. In your Vercel project dashboard, go to the **Storage** tab.
2. Connect **Upstash Redis** (free tier includes 10,000 commands/day).
3. The environment variables (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`) will be automatically linked.
4. Redeploy — Codnames will detect Redis and use it automatically!

---

## 📜 How to Play

1. **Host a Game**: Enter your operative codename on the homepage and click **Create Mission Room**.
2. **Invite Friends**: Click **Invite** in the top bar and share the room URL with your friends.
3. **Pick Roles & Teams**:
   - Split into **Red Team** and **Blue Team**.
   - Each team selects 1 **Spymaster**; everyone else joins as **Operatives**.
4. **Choose Expansions**: The host clicks **Settings & Expansions** to choose which word decks to play with, set turn timers, or add custom words.
5. **Start the Mission**:
   - The Spymaster gives a one-word clue and a number (e.g., `"OCEAN 2"`).
   - Operatives discuss and tap cards they believe match the clue.
   - Guess correctly to reveal your agents and decrease your team's remaining count.
   - First team to uncover all their agents wins!
   - Tapping the **Assassin** immediately forfeits the match to the rival team.
6. **Rematch**: After game over, click **Start Rematch** to instantly generate a fresh board while keeping all connected players in the lobby!
