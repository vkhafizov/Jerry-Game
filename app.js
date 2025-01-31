const gameArea = document.getElementById('game-area');

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = Math.floor(Math.random() * 100) + 50;
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.backgroundColor = color;

    circle.addEventListener('click', () => {
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

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

startGame();