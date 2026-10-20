const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

class App {
    // Private properties
    #songs;

    // Constructor
    constructor(songs) {
        this.#songs = songs;
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
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    }

    // API
    start() {
        this.#handeEvents();
        this.#render();
    }
}
