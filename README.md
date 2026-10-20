# Web Music Player

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B%20%2F%20ES2022-F7DF1E?logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-Audio%20API-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Responsive%20UI-1572B6?logo=css3&logoColor=white)
![Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A sleek, responsive, and feature-rich web music player built with pure Vanilla JavaScript (ES6+ Classes & ES2022 Private Fields), HTML5 Audio API, and CSS3.

🔗 **[Live Demo](https://thanhwii.github.io/music-player/)** *(Enable GitHub Pages in your repository settings to activate this link)*

---

## ✨ Key Features

- **Full Audio Playback Controls:** Play, pause, skip to next/previous tracks, and seek smoothly through any point in the song.
- **Real-Time Progress & Time Formatting:** Displays live current playback time (`mm:ss`) and total track duration automatically upon metadata load.
- **Shuffle & Repeat Modes:** Supports random track selection (with duplicate-prevention logic) and single-track repeat loop.
- **Interactive CD Artwork Animation:** Uses the native **Web Animations API** (`Element.animate`) to smoothly rotate the album cover in sync with playback state.
- **Scroll-Driven Header Transition:** Dynamically scales and fades the CD artwork as the user scrolls through the playlist.
- **Persistent User State:** Saves the active track index, shuffle state, and repeat preferences in `localStorage` so users can resume right where they left off after refreshing the browser.
- **Dynamic Playlist Rendering:** Supports click-to-play track selection via DOM event delegation and highlights the currently active song.

---

## 🏗️ Architecture & Technical Highlights

This application was architected to showcase modern Frontend Engineering fundamentals without relying on external UI frameworks:

1. **ES2022 OOP Encapsulation:** All application state (`#songs`, `#currentIndex`, `#isRandom`, `#isRepeat`, `#config`) and internal logic (`#render`, `#handeEvents`, `#loadCurrentSong`, `#getRandomIndex`) are strictly encapsulated inside the `App` class using private fields and methods (`#`).
2. **Native Web APIs Integration:**
   - **HTML5 `HTMLAudioElement` API:** Handles media loading (`preload="metadata"`), playback lifecycle events (`onloadedmetadata`, `ontimeupdate`, `onplay`, `onpause`, `onended`), and time seeking.
   - **Web Animations API:** Controls infinite 360-degree rotation of the `.cd-thumb` element with `.play()` and `.pause()` without CSS keyframe resets.
   - **Web Storage API (`localStorage`):** Persists user configuration (`music-player-config`) and active song index (`music-player-index`).
3. **Efficient Event Delegation:** Attaches a single click listener to the `.playlist` container using `e.target.closest('.song:not(.active)')` instead of binding individual listeners to every song node.

---

## 📂 Project Structure

```text
music-player/
├── assets/
│   ├── css/
│   │   └── style.css         # Core styling, layout, and responsive rules
│   ├── images/               # Album cover artwork (.jfif / .jpg)
│   └── musics/               # Audio track files (.mp3)
├── index.html                # Application markup and song list initialization
├── main.js                   # Core App class implementation (ES6+/ES2022)
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ThanhWii/music-player.git
cd music-player
```

### 2. Run Locally

Because this project uses 100% pure HTML, CSS, and Vanilla JavaScript with zero build steps required, you can launch it immediately:

- **Option A:** Open `index.html` directly in any modern web browser.
- **Option B (Recommended):** Use the **Live Server** extension in VS Code to run the app on a local development server.

### 3. Customizing the Playlist

You can easily add or modify tracks by updating the `songs` array inside `index.html` before initializing `new App(songs)`:

```javascript
const songs = [
    {
        name: 'APT.',
        artist: 'ROSÉ & Bruno Mars',
        path: './assets/musics/APT.mp3',
        image: './assets/images/APT..jfif',
    },
    {
        name: 'Despacito',
        artist: 'Luis Fonsi, Daddy Yankee',
        path: './assets/musics/Despacito.mp3',
        image: './assets/images/Despacito.jfif',
    }
    // Add more tracks here...
];

const musicPlayer = new App(songs);
musicPlayer.start();
```

---

## 🎵 Featured Tracklist

| # | Track Title | Artist |
| :- | :--- | :--- |
| 01 | **APT.** | ROSÉ & Bruno Mars |
| 02 | **Despacito** | Luis Fonsi, Daddy Yankee |
| 03 | **Gangnam Style** | PSY |
| 04 | **Girls Like You** | Maroon 5, Cardi B |
| 05 | **Happy** | Pharrell Williams |
| 06 | **Havana** | Camila Cabello feat. Young Thug |
| 07 | **Kiss Me More** | Doja Cat feat. SZA |
| 08 | **Moonlight** | Ariana Grande |
| 09 | **See You Again** | Wiz Khalifa |
| 10 | **Senorita** | Shawn Mendes, Camila Cabello |
| 11 | **Shape Of You** | Ed Sheeran |
| 12 | **We Don't Talk Anymore** | Charlie Puth |

---

## 📝 Author

- **Author:** [ThanhWii](https://github.com/ThanhWii)