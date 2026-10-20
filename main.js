const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const timeCurrent = $('.time-current');
const timeEnd = $('.time-end');
const audio = $('#audio');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;
const playBtn = $('.btn-toggle-play');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const player = $('.player');
const progress = $('#progress');

class App {
    // Private properties
    #songs;
    #currentIndex;
    #currentSong;
    #isRandom = false;
    #isRepeat = false;
    #cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], { duration: 10000, iterations: Infinity, });

    // Constructor
    constructor(songs) {
        this.#songs = songs;
        this.#currentIndex = Math.floor(Math.random() * this.#songs.length);
        this.#currentSong = this.#songs[this.#currentIndex];
        this.#cdThumbAnimate.pause();
    }

    // Private static methods
    static #getTimeFormat(seconds) {
        if (!Number.isFinite(seconds) || seconds < 0) {
            return '00:00';
        }
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const formattedMins = String(mins).padStart(2, '0');
        const formattedSecs = String(secs).padStart(2, '0');
        return `${formattedMins}:${formattedSecs}`;
    }

    // Private methods
    #render() {
        const htmls = this.#songs.map((song, index) => {
            return `
                <div class="song ${index === this.#currentIndex ? 'active' : ''}">
                    <div class="thumb" style="background-image: url('${song.image}')"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.artist}</p>
                    </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
            `;
        });
        $('.playlist').innerHTML = htmls.join('');
    }

    #playSong() {
        audio.play();
        this.#cdThumbAnimate.play();
    }

    #pauseSong() {
        audio.pause();
        this.#cdThumbAnimate.pause();
    }

    #handeEvents() {
        // Zoom and shrink CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        // Click Play Button
        playBtn.onclick = () => {
            if (audio.paused) {
                this.#playSong();
            }
            else {
                this.#pauseSong();
            }
        }
        // Click Prev Button
        prevBtn.onclick = () => {
            this.#prevSong();
        }
        // Click Next Button
        nextBtn.onclick = () => {
            this.#nextSong();
        }
        // Click Random Button
        randomBtn.onclick = () => {
            if (this.#isRandom) {
                randomBtn.classList.remove('active');
            }
            else {
                randomBtn.classList.add('active');
            }
            this.#isRandom = !this.#isRandom;
        }
        repeatBtn.onclick = () => {
            if (this.#isRepeat) {
                repeatBtn.classList.remove('active');
            }
            else {
                repeatBtn.classList.add('active');
            }
            this.#isRepeat = !this.#isRepeat;
        }
        // When song loaded metadata
        audio.onloadedmetadata = () => {
            timeEnd.textContent = App.#getTimeFormat(audio.duration);
        }
        // When song is playing
        audio.onplay = () => {
            player.classList.add('playing');
        }
        // When song is pausing
        audio.onpause = () => {
            player.classList.remove('playing');
        }
        // When song's progress change
        audio.ontimeupdate = () => {
            timeCurrent.textContent = App.#getTimeFormat(audio.currentTime);
            const progressPercent = audio.currentTime / audio.duration * 100;
            progress.value = progressPercent;
        }
        // When song is seeking
        progress.oninput = (e) => {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        // When song ended
        audio.onended = () => {
            if (this.#isRepeat) {
                this.#loadCurrentSong();
                this.#playSong();
            }
            else {
                this.#nextSong();
            }
        }
    }

    #loadCurrentSong() {
        // Reset interface
        progress.value = 0;
        timeCurrent.textContent = '00:00';
        heading.textContent = this.#currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.#currentSong.image}')`;
        // Get current song and load
        audio.preload = 'metadata';
        audio.src = this.#currentSong.path;
        audio.load();
        this.#render();
    }

    #prevSong() {
        if (this.#isRandom) {
            this.#getRandomIndex();
        }
        else {
            this.#currentIndex = Math.max(--this.#currentIndex, 0);
        }
        this.#currentSong = this.#songs[this.#currentIndex];
        this.#loadCurrentSong();
        this.#playSong();
    }

    #nextSong() {
        if (this.#isRandom) {
            this.#getRandomIndex();
        }
        else {
            this.#currentIndex = Math.min(++this.#currentIndex, this.#songs.length - 1);
        }
        this.#currentSong = this.#songs[this.#currentIndex];
        this.#loadCurrentSong();
        this.#playSong();
    }

    #getRandomIndex() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.#songs.length);
        }
        while (newIndex === this.#currentIndex);
        this.#currentIndex = newIndex;
    }

    // API
    start() {
        // Handle DOM events
        this.#handeEvents();
        // Load current song
        this.#loadCurrentSong();
        // Render playlist
        this.#render();
    }
}
