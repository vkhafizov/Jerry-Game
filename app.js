const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('score-board');
let score = 0;

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = Math.floor(Math.random() * 100) + 50;
    const x = Math.random() * (window.innerWidth - size);
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = color;

    circle.addEventListener('click', () => {
        circle.remove();
        score += 1;
        scoreBoard.textContent = `Очки: ${score}`;
        createCircle();
    });

    circle.addEventListener('animationend', () => {
        circle.remove();
        createCircle();
    });

    gameArea.appendChild(circle);
}

function startGame() {
    for (let i = 0; i < 10; i++) {
        createCircle();
    }
}

startGame();