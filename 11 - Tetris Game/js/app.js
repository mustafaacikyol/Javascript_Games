const grid = document.querySelector('.grid');
const smallGrid = document.querySelector('.small-grid');
const startPauseBtn = document.querySelector('.start-pause');
const resultElement = document.querySelector('.result');
const scoreElement = document.querySelector('.score');
const lineElement = document.querySelector('.line');

const width = 10;
const height = 20;
let score = 0;
let line = 0;
let currentIndex = 4;
let moveDownTimerID;
let isGameOver = false;

function createGrid() {

    for (let i = 0; i < 16; i++) {

        const divElement = document.createElement('div');
        smallGrid.appendChild(divElement);
    }

    for (let i = 0; i < width * height; i++) {

        const divElement = document.createElement('div');
        grid.appendChild(divElement);

    }

    for (let i = width * height; i < width * height + width; i++) {

        const divElement = document.createElement('div');
        divElement.classList.add('block3');
        grid.appendChild(divElement);

    }

}

createGrid();

let squares = Array.from(grid.querySelectorAll('div'));
const smallSquares = document.querySelectorAll(".small-grid div");

const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
];

const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
];

const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
];

const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
];

const Tetrominoes = [lTetromino, oTetromino, iTetromino, tTetromino, zTetromino];

let random = Math.floor(Math.random() * Tetrominoes.length);
let currentRotation = 0;
let current = Tetrominoes[random][currentRotation];

function draw() {

    current.forEach(index => squares[currentIndex + index].classList.add('block'));

}


function undraw() {

    current.forEach(index => squares[currentIndex + index].classList.remove('block'));

}

function moveLeft() {

    undraw();

    if (!current.some(index => (currentIndex + index) % width === 0) &&
        !current.some(index => squares[currentIndex + index - 1].classList.contains('block2'))) currentIndex -= 1;

    draw();

}

function moveRight() {

    undraw();

    if (!current.some(index => (currentIndex + index) % width === width - 1) &&
        !current.some(index => squares[currentIndex + index + 1].classList.contains('block2'))) currentIndex += 1;

    draw();

}

function moveDown() {

    undraw();

    if (!current.some(index => currentIndex + index >= width * 19)) currentIndex += width;

    draw();
    freeze();

}

const ITetromino1 = [width - 2, width - 1, width, width + 1];
const ITetromino2 = [width - 1, width, width + 1, width + 2];
const ITetromino3 = [width + 1, width + 2, width + 3, width + 4];

function rotate() {

    undraw();
    currentRotation++;

    if (currentRotation === current.length) currentRotation = 0;

    if (random === 2 && current.every(index => (currentIndex + index) % width === width - 1)) {

        current = ITetromino1;

    } else if (random === 2 && current.every(index => (currentIndex + index) % width === width - 2)) {

        current = ITetromino2;

    } else if (random === 2 && current.every(index => (currentIndex + index) % width === 0)) {

        current = ITetromino3;

    } else {

        current = Tetrominoes[random][currentRotation];

    }

    draw();

}


function control(e) {

    if (e.keyCode === 37) moveLeft();
    else if (e.keyCode === 38) rotate();
    else if (e.keyCode === 39) moveRight();
    else if (e.keyCode === 40) moveDown();

}

const displayWidth = 4;
const displayIndex = 0;
let nextRandom = 10;

const smallTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [displayWidth + 1, displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
    [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2],
];


function displayNextItem() {

    smallSquares.forEach(smallSquare => smallSquare.classList.remove('block'));

    let smallCurrent = smallTetrominoes[nextRandom];
    smallCurrent.forEach(index => smallSquares[index].classList.add('block'));

}

function gameOver() {

    isGameOver = true;
    clearInterval(moveDownTimerID);
    document.removeEventListener('keydown', control);
    resultElement.textContent = 'Game OVER!';

}

function addScore() {

    for (let i = 0; i < width * height; i += width) {

        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

        if (row.every(index => squares[index].classList.contains('block2'))) {

            score += 10;
            line += 1;
            scoreElement.textContent = score;
            lineElement.textContent = line;

            row.forEach(index => {
                squares[index].classList.remove('block');
                squares[index].classList.remove('block2');
            });

            const squaresRemoved = squares.splice(i, width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(square => grid.appendChild(square));

        }

    }

}

function freeze() {

    if (current.some(index => squares[currentIndex + index + width].classList.contains('block3') ||
        current.some(index => squares[currentIndex + index + width].classList.contains('block2')))) {

        current.forEach(index => squares[currentIndex + index].classList.add('block2'));

        random = nextRandom;
        nextRandom = Math.floor(Math.random() * smallTetrominoes.length);
        current = Tetrominoes[random][currentRotation];
        currentIndex = 4;

        draw();
        displayNextItem();

        addScore();

        if (current.some(index => squares[currentIndex + index].classList.contains('block2'))) gameOver();

    }

}

function startGame() {

    document.addEventListener('keydown', control);
    draw();
    if (nextRandom === 10) nextRandom = Math.floor(Math.random() * smallTetrominoes.length);
    displayNextItem();
    moveDownTimerID = setInterval(moveDown, 1000);

}

function pauseGame() {

    clearInterval(moveDownTimerID);
    moveDownTimerID = null;
    document.removeEventListener('keydown', control);

}

function startPauseGame() {

    if (moveDownTimerID && !isGameOver) {

        pauseGame();

    } else if (isGameOver) {

        isGameOver = false;
        score = 0;
        line = 0;
        nextRandom = 10;
        scoreElement.textContent = score;
        lineElement.textContent = line;
        resultElement.textContent = '';

        squares.forEach(square => {
            square.classList.remove('block');
            square.classList.remove('block2');
        });

        startGame();

    } else {

        startGame();

    }

}

startPauseBtn.addEventListener('click', startPauseGame);
