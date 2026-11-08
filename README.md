# 💎 Crystal Collector!

An interactive, retro-arcade mathematical strategy game built using JavaScript and jQuery. Players must deduce hidden numeric values assigned to crystals to match a dynamically generated target number without going over. 

Originally built as a foundational project during a web development coding bootcamp, this repository has been refactored to prioritize clean architecture, accessible state management, and modern user experience (UX) guidelines.

## 🚀 Live Demo
[👉 Click here to play the live game!](https://defiledspec.github.io/Crystal-Collector/)

---

## ✨ Features & Refactoring Updates

*   **⚡ Tactile Micro-Interactions:** Buttons dynamically sink and alter their shadow profiles using CSS transitions on user interaction (`.press`), mirroring a physical arcade console.
*   **🔊 Audio Synthesis Engine:** Programmed clean audio feedback chimes using the native browser **Web Audio API** (`AudioContext`). This provides localized sound effects directly from code without loading bulky external audio files.
*   **💾 LocalStorage Persistence:** Player stats (Wins, Losses, Current Streak, and an all-time **Best Streak Record 🔥**) are preserved across browser refreshes and sessions.
*   **📐 Modernized Layout:** Removed legacy layout floats in favor of a flexible, responsive CSS Flexbox configuration (`.scoreboard-container`), ensuring proper dashboard presentation across high-resolution displays.
*   **🧹 Refactored State Engine:** Optimized performance loops by replacing unnecessary array pushes and iterations with a strict global state tracker.

---

## 🛠️ Tech Stack & Methods
*   **Markup & Layout:** HTML5, CSS3 (Flexbox, Keyframe Animations)
*   **Logic & Interactions:** JavaScript (ES6+), jQuery
*   **APIs Implemented:** Web Audio API, Web Storage API (`localStorage`)

---

## 🎮 How to Play

1.  The game displays a random **Target Number** at the start of each round (ranging between `19` and `120`).
2.  Clicking any of the four crystals adds a specific, hidden number to your **Total Score** (each crystal is randomly assigned a value between `1` and `12` every round).
3.  **To Win:** Match your total score *exactly* to the target number.
4.  **To Lose:** If your total score goes even `1` point above the target number, you bust!
5.  Winning builds your consecutive win streak; losing resets your current streak but preserves your all-time highest record!

---

## 🔧 Installation & Local Setup

Since this application relies strictly on client-side frontend technologies, you do not need to install any heavy server architectures or runtime frameworks.

1.  Clone this repository to your computer:
    ```bash
    git clone https://github.com/DefiledSpec/Crystal-Collector.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd YOUR_DIRECTORY_NAME
    ```
3.  Open `index.html` directly in your favorite web browser, or launch it with a development extension like VS Code's **Live Server**.
