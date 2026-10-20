const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const cdWidth = cd.offsetWidth;
const playBtn = $('.btn-toggle-play');
const player = $('.player');

class App {
    // Private properties
    #songs;
    #currentIndex;
    #currentSong;
    #isPlaying = false;

    // Constructor
    constructor(songs) {
        this.#songs = songs;
        this.#currentIndex = 0;
        this.#currentSong = this.#songs[this.#currentIndex];
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
            }
            else {
                audio.play();
            }
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
    }

    #loadCurrentSong() {
        heading.textContent = this.#currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.#currentSong.image})`;
        audio.src = this.#currentSong.path;
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
