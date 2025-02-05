const gameArea = document.getElementById('game-area');
const scoreBoard = document.getElementById('score-board');
let score = 0;

// Функция для проверки пересечения двух кругов
function circlesCollide(circle1, circle2) {
    const rect1 = circle1.getBoundingClientRect();
    const rect2 = circle2.getBoundingClientRect();

    const dx = rect1.left - rect2.left + (rect1.width - rect2.width) / 2;
    const dy = rect1.top - rect2.top + (rect1.height - rect2.height) / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (rect1.width / 2 + rect2.width / 2);
}

// Функция для создания круга без пересечений
function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = Math.floor(Math.random() * 50) + 30; // Размер от 30 до 80 пикселей
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    let x, y;
    let collision = true;
    let attempts = 0;

    // Пытаемся найти позицию без пересечений
    while (collision && attempts < 100) {
        x = Math.random() * (window.innerWidth - size);
        y = Math.random() * (window.innerHeight - size);

        collision = false;
        const existingCircles = document.querySelectorAll('.circle');
        for (const existingCircle of existingCircles) {
            if (circlesCollide(circle, existingCircle)) {
                collision = true;
                break;
            }
        }
        attempts++;
    }

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.backgroundColor = color;

    circle.addEventListener('click', () => {
        circle.remove();
        score += 1;
        scoreBoard.textContent = `Очки: ${score}`;
        createCircle(); // Создаём новый круг после лопания
    });

    circle.addEventListener('animationend', () => {
        circle.remove();
        createCircle(); // Создаём новый круг после завершения анимации
    });

    gameArea.appendChild(circle);
}

function startGame() {
    for (let i = 0; i < 10; i++) {
        createCircle();
    }
}

startGame();