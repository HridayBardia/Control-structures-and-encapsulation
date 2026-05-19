# 🚀 Presentation Update Prompt
### Java Control Structures & Encapsulation — React/JSX Artifact

> **How to use:** Paste this entire prompt into the chat where your presentation artifact exists, and Claude will update it accordingly.

---

## PROMPT TO PASTE:

---

Please update this entire React presentation with the following changes. Apply ALL of them together:

---

### 1. 🧊 FULL 3D FRAGMENTED VISUAL OVERHAUL

Transform the entire presentation into a deeply 3D, fragmented, immersive experience by combining ALL of the following styles:

- **Glassmorphism:** Every card/panel should use `backdrop-filter: blur(...)`, semi-transparent backgrounds (`rgba` with low opacity), and subtle white border highlights to create frosted glass depth.

- **Neon/Cyberpunk Fragments:** Add glowing neon accents (electric blue `#00f0ff`, hot pink `#ff2d78`, acid green `#39ff14`) as borders, text shadows, and floating geometric shards in the background. Use `box-shadow: 0 0 20px ...` for glow effects.

- **3D Card Flips:** Slide transitions should use CSS `rotateY` or `rotateX` transforms with `perspective: 1200px` and `transform-style: preserve-3d` so slides flip into view in 3D space.

- **Shattered/Exploding Fragment Effect:** When navigating away from a slide, shatter it — break it into 6–12 small triangular/rectangular CSS fragments that fly outward with `transform: translate + rotate + scale` animations before the next slide appears.

- **Floating Background Shards:** Add 8–15 abstract geometric shapes (triangles, rhombuses, thin rectangles) floating slowly in the background using CSS `@keyframes` animations. They should be semi-transparent and glow faintly.

- **Depth Layers:** Use `z-index` layering, `translateZ`, and subtle `perspective` on the slide container so content feels like it's sitting IN 3D space, not flat on screen.

- **Lighting Effect:** Add a subtle radial gradient "light source" that shifts slightly with each slide — like a spotlight moving across a dark stage.

---

### 2. ⌨️ USER TYPES TO UNLOCK CODE REVEAL

Replace any existing code display or auto-reveal with this interactive mechanic:

- **Each code slide shows a blurred/obscured code block** with a prompt like:
  ```
  🔐 Type the keyword to unlock this code:
  [ input box ]
  ```

- The **keyword** should be a relevant Java keyword shown in that slide's code (e.g., `for`, `while`, `if`, `private`, `encapsulation`, `class`, etc.)

- As the user **types correctly (character by character)**, the code reveals itself **word by word or line by line** in real time — matching typed characters unlock portions of the code progressively.

- On **full correct keyword typed**, the entire code block snaps into full visibility with a satisfying neon glow flash animation (`@keyframes flash-glow`).

- If wrong characters are typed, show a subtle red shake effect on the input.

- After the code is fully revealed, **wait 1.5 seconds**, then the **output panel slides up from below** with a smooth 3D `translateY` + `opacity` transition, showing the program's output in a terminal-style box (dark background, green monospace text).

---

### 3. 📋 LAST SLIDE — CONCLUSION (NOT VIVA)

- Remove any "Viva", "Q&A", or "Viva Voce" content from the last slide entirely.
- Replace with a **Conclusion slide** that includes:
  - Title: `Conclusion`
  - A brief 3–5 point summary of what was covered:
    - Java Control Structures: `if/else`, `switch`, loops (`for`, `while`, `do-while`)
    - Encapsulation: hiding data using `private` fields + `public` getters/setters
    - Benefits: code reusability, security, maintainability
  - A closing line like: *"Mastering these concepts forms the backbone of robust Java programming."*
  - Style it as the most visually dramatic slide — full 3D shatter entrance, all neon glows active, floating shards most visible.

---

### 4. ✨ GLOBAL STYLE UPGRADES

Apply these across the entire presentation:

- **Font:** Use `'Orbitron'` or `'Rajdhani'` (import from Google Fonts) for headings — futuristic, technical feel. Use `'JetBrains Mono'` or `'Fira Code'` for all code blocks.

- **Color Palette:**
  - Background: deep space `#050510` or `#0a0a1a`
  - Primary accent: `#00f0ff` (cyan)
  - Secondary accent: `#ff2d78` (pink)
  - Code highlight: `#39ff14` (neon green)
  - Glass panels: `rgba(255,255,255,0.05)` with `border: 1px solid rgba(255,255,255,0.15)`

- **Slide Navigation:** Arrows/buttons should be 3D-styled with hover `translateZ(10px)` and glow effect.

- **Progress Bar:** Add a glowing neon progress bar at the top or bottom showing current slide position.

- **Slide Counter:** Show `Slide X of N` in a small glassmorphic chip in the corner.

- **Entrance Animations:** Every slide entrance should feel different — some flip on Y-axis, some shatter in, some slide from depth (`translateZ(-500px) → 0`).

---

### 5. 🎯 OUTPUT REVEAL MECHANIC (for all code slides)

After code is unlocked via typing:
- Show a **"▶ Run"** button that pulses with neon glow
- On click, simulate program execution with a **loading bar** (1–2 seconds)
- Then reveal the **output terminal** with text appearing character by character (typewriter effect, ~30ms per character)
- Terminal should look like a real console: dark background, `JetBrains Mono` font, green text, blinking cursor `█`

---

**Apply all of the above while keeping all existing slide content, Java code examples, and topic structure intact. Only enhance — do not remove educational content.**

---

*Generated update prompt for Java Control Structures & Encapsulation React Presentation*
