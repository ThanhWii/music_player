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
const player = $('.player');
const progress = $('#progress');

class App {
    // Private properties
    #songs;
    #currentIndex;
    #currentSong;
    #isPlaying = false;

    // Constructor
    constructor(songs) {
        this.#songs = songs;
        this.#currentIndex = Math.floor(Math.random() * this.#songs.length);
        this.#currentSong = this.#songs[this.#currentIndex];
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
        const htmls = this.#songs.map((song) => {
            return `
                <div class="song">
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

    #handeEvents() {
        // CD Spinning
        const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], { duration: 10000, iterations: Infinity, });
        cdThumbAnimate.pause();
        // Zoom and shrink CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
        // Click Play Button
        playBtn.onclick = () => {
            if (this.#isPlaying) {
                audio.pause();
                cdThumbAnimate.pause();
            }
            else {
                audio.play();
                cdThumbAnimate.play();
            }
        }
        // Click Prev Button
        prevBtn.onclick = () => {
            this.#currentIndex = Math.max(--this.#currentIndex, 0);
            this.#currentSong = this.#songs[this.#currentIndex];
            this.#loadCurrentSong();
        }
        // Click Next Button
        nextBtn.onclick = () => {
            this.#currentIndex = Math.min(++this.#currentIndex, this.#songs.length - 1);
            this.#currentSong = this.#songs[this.#currentIndex];
            this.#loadCurrentSong();
        }
        // When song loaded metadata
        audio.onloadedmetadata = () => {
            timeEnd.textContent = App.#getTimeFormat(audio.duration);
        }
        // When song is playing
        audio.onplay = () => {
            this.#isPlaying = true;
            player.classList.add('playing');
        }
        // When song is pausing
        audio.onpause = () => {
            this.#isPlaying = false;
            player.classList.remove('playing');
        }
        // When song's progress change
        audio.ontimeupdate = () => {
            timeCurrent.textContent = App.#getTimeFormat(audio.currentTime);
            const progressPercent = audio.currentTime / audio.duration * 100;
            progress.value = progressPercent;
        }
        // When song is seeking
        progress.onchange = (e) => {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
    }

    #loadCurrentSong() {
        // Stop current song
        audio.pause();
        // Reset interface
        progress.value = 0;
        heading.textContent = this.#currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.#currentSong.image}')`;
        // Thiết lập nguồn mới và yêu cầu tải lại
        audio.preload = 'metadata';
        audio.src = this.#currentSong.path;
        audio.load();
        progress.value = 0;
        if (this.#isPlaying) {
            audio.play();
        }
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
