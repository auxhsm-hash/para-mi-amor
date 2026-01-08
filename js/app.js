const app = {
    state: { hasHeart: false, typing: false, reasonIdx: 0, musicOn: false },

    razones: [
        "Por tu forma única de ver la vida.",
        "Por la paz que siento cuando me abrazas.",
        "Por esa energía acelerada que me contagia.",
        "Por tu inteligencia que tanto admiro.",
        "Por cómo tus detalles cambian mi día.",
        "Por estos cuatro meses que se sienten hogar.",
        "Por tu risa, que es mi sonido favorito.",
        "Por ser el lugar al que siempre quiero volver.",
        "Por tu lado celosito que me parece adorable.",
        "Por cómo te esfuerzas en todo lo que haces.",
        "Por la luz que tienes e iluminas a los demás.",
        "Por elegirme todos los días.",
        "Por ser mi cómplice en cada aventura.",
        "Por tu mirada, que me calma y prende.",
        "Por tu capacidad de entender sin juzgar.",
        "Por cómo me cuidas sin que te lo pida.",
        "Por ser la mujer más maravillosa.",
        "Por tus 36 años de existir y ser tú.",
        "Por tu sensibilidad, que es tu gran fuerza.",
        "Por los momentos simples que haces infinitos.",
        "Por tu manera de amar, real e intensa.",
        "Por cómo me haces querer ser mejor.",
        "Por tu valentía ante los retos.",
        "Por esa chispa que tienes en los ojos.",
        "Por tus consejos, que siempre me aterrizan.",
        "Por hacerme sentir en casa estés donde estés.",
        "Por tu paciencia infinita.",
        "Por ser tú misma, sin pedir permiso.",
        "Por tu aroma, que se queda conmigo.",
        "Por las ganas de construir un futuro.",
        "Por tu sonrisa al despertar.",
        "Por cómo me escuchas cuando más lo necesito.",
        "Por hacerme reír hasta cuando estoy serio.",
        "Por ser mi puerto seguro.",
        "Por el amor que me das y me llena.",
        "Simplemente, por ser Lu. Te amo."
    ],

    maze: {
        map: [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1],
            [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
            [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1],
            [1,0,1,0,0,0,1,0,1,0,1,0,0,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
            [1,2,0,0,0,0,0,0,0,0,0,0,1,3,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        player: { x: 1, y: 1 }
    },

    nav(id) {
        const container = document.getElementById('app-container');
        if (id === 'intro') container.classList.remove('blur');
        else container.classList.add('blur');

        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${id}`).classList.add('active');

        if (id === 'carta') this.typewriter();
        if (id === 'razones') this.showReason();
        if (id === 'juego') this.initMaze();
    },

    typewriter() {
        if (this.state.typing) return;
        this.state.typing = true;
        const container = document.getElementById('typewriter-text');
        const footer = document.getElementById('letter-footer');
        const scroll = document.querySelector('.scroll-content');
        const text = `Mi amor…\n\nHoy cumples 36… y yo no quería que tu día se sintiera “normal”.\nQuería que se sintiera como tú:\nbonito, con intención, con emoción…\ny con esa chispa que aparece cuando todo vale la pena.\n\nA mí me encanta tu energía. Esa forma tuya de ir rápido, de estar viva... me contagia.\n\nEn solo cuatro meses me has regalado momentos que se sienten como hogar. Me encanta tu lado celosito que me da risa porque hasta cuando te enojas poquito sigues siendo adorable.\n\nHoy te celebro por tu inteligencia, por tu sensibilidad y por ser tú.\n\nFelices 36, mi amor.\n\nDaniel G.`;

        container.innerHTML = ''; footer.classList.add('hidden');
        let i = 0;
        const type = () => {
            if (i < text.length) {
                container.innerHTML += text.charAt(i); i++;
                scroll.scrollTop = scroll.scrollHeight;
                setTimeout(type, 40);
            } else { this.state.typing = false; footer.classList.remove('hidden'); }
        };
        type();
    },

    showReason() {
        document.getElementById('reason-text').innerText = this.razones[this.state.reasonIdx];
        document.getElementById('reason-num').innerText = this.state.reasonIdx + 1;
    },

    nextReason() {
        this.state.reasonIdx = (this.state.reasonIdx + 1) % this.razones.length;
        this.showReason();
        if(navigator.vibrate) navigator.vibrate(20);
    },

    initMaze() {
        this.maze.player = { x: 1, y: 1 };
        const container = document.getElementById('maze-container');
        container.style.gridTemplateColumns = `repeat(15, 1fr)`;
        this.renderMaze();
    },

    renderMaze() {
        const container = document.getElementById('maze-container');
        container.innerHTML = '';
        this.maze.map.forEach((row, y) => {
            row.forEach((cell, x) => {
                const div = document.createElement('div');
                div.className = 'cell ' + (cell === 1 ? 'wall' : 'path');
                if (cell === 2 && !this.state.hasHeart) div.innerHTML = '💗';
                if (cell === 3) div.innerHTML = '🎁';
                if (this.maze.player.x === x && this.maze.player.y === y) div.innerHTML = '📍';
                container.appendChild(div);
            });
        });
    },

    move(dir) {
        let dx = 0, dy = 0;
        if (dir === 'up') dy = -1; if (dir === 'down') dy = 1;
        if (dir === 'left') dx = -1; if (dir === 'right') dx = 1;

        const newX = this.maze.player.x + dx;
        const newY = this.maze.player.y + dy;
        const target = this.maze.map[newY][newX];

        if (target !== 1) {
            this.maze.player.x = newX;
            this.maze.player.y = newY;
            if (target === 2 && !this.state.hasHeart) {
                this.state.hasHeart = true;
                document.getElementById('stat-heart').innerText = "Corazón: ✅";
                if(navigator.vibrate) navigator.vibrate(50);
            }
            if (target === 3) {
                document.getElementById('modal-regalo').classList.add('active');
            }
            this.renderMaze();
        }
    }
};

window.navigateTo = (id) => app.nav(id);
window.startApp = () => { 
    app.nav('menu'); 
    const music = document.getElementById('bg-music');
    music.play().then(() => app.state.musicOn = true).catch(() => {});
};
window.toggleMusic = () => {
    const music = document.getElementById('bg-music');
    if (app.state.musicOn) { music.pause(); document.getElementById('music-icon').innerText = '🔇'; }
    else { music.play(); document.getElementById('music-icon').innerText = '🎵'; }
    app.state.musicOn = !app.state.musicOn;
};
window.nextReason = () => app.nextReason();
window.move = (dir) => app.move(dir);
window.openVideo = () => {
    document.getElementById('modal-regalo').classList.remove('active');
    document.getElementById('modal-video').classList.add('active');
    document.getElementById('main-video').play();
};
window.showTicket = () => {
    document.getElementById('modal-video').classList.remove('active');
    document.getElementById('modal-ticket').classList.add('active');
};