const scoreElement = document.querySelector('.score');
const result = document.querySelector('.result');
const squares = document.querySelectorAll('.grid div');
const startRestartBtn = document.querySelector('.start-restart');

let score;
let width = 15;
let direction;
let currentShooterIndex;
let moveInvadersID;
let invadersTakenDown = [];
let invaders;


function start() {

    if (currentShooterIndex) squares[currentShooterIndex].classList.remove('shooter');

    if (invaders) {

        for (let i = 0; i < invaders.length; i++) {

            squares[invaders[i]].classList.remove('invader');

        }

    }

    clearInterval(moveInvadersID);
    result.textContent = '';
    score = 0;
    scoreElement.textContent = score;
    direction = 1;
    currentShooterIndex = 187;
    invadersTakenDown = [];
    invaders = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

    squares[currentShooterIndex].classList.add('shooter');

    for (let i = 0; i < invaders.length; i++) {

        squares[invaders[i]].classList.add('invader');

    }

    moveInvadersID = setInterval(moveInvaders, 400);

}

function moveInvaders() {

    const leftedge = invaders[0] % width === 0;
    const rightedge = invaders[invaders.length - 1] % width === width - 1;

    if (((leftedge) && direction === -1) || ((rightedge) && direction === 1)) {

        direction = width;

    } else if (leftedge) {

        direction = 1;

    } else if (rightedge) {

        direction = -1;

    }

    for (let i = 0; i < invaders.length; i++) {

        squares[invaders[i]].classList.remove('invader');
        invaders[i] += direction;

    }

    for (let i = 0; i < invaders.length; i++) {

        if (!invadersTakenDown.includes(i)) {
            
            squares[invaders[i]].classList.add('invader');

        }

        if (invaders[i] >= width*width - (width*3) && squares[invaders[i]].classList.contains('invader')) gameOver();

    }

}

function moveShooter(e) {

    if (e.keyCode === 37 && currentShooterIndex % width !== 0) {

        squares[currentShooterIndex].classList.remove('shooter');
        currentShooterIndex -= 1;
        squares[currentShooterIndex].classList.add('shooter');

    } else if (e.keyCode === 39 && currentShooterIndex % width < width - 1) {

        squares[currentShooterIndex].classList.remove('shooter');
        currentShooterIndex += 1;
        squares[currentShooterIndex].classList.add('shooter');

    }

}

function win() {
    
    clearInterval(moveInvadersID);
    result.textContent = 'You WIN the Game!';

}

function gameOver() {
    
    clearInterval(moveInvadersID);
    result.textContent = 'Game Over! You LOSE!';

}


function shoot() {

    let moveLaserID;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {

        squares[currentLaserIndex].classList.remove('laser');

        if (currentLaserIndex < width) {

            return clearInterval(moveLaserID);

        }

        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {

            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');
            clearInterval(moveLaserID);
            score++;
            scoreElement.textContent = score;
            const removedItem = invaders.indexOf(currentLaserIndex);
            invadersTakenDown.push(removedItem);

            if (invadersTakenDown.length === invaders.length) win();

            setTimeout(function () {
                squares[currentLaserIndex].classList.remove('boom');
            }, 70)

        }

    }

    moveLaserID = setInterval(moveLaser, 100);

}


startRestartBtn.addEventListener('click', start);
document.addEventListener('keydown', moveShooter);
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
        shoot();
    }
});


