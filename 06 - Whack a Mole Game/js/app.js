const container = document.querySelector('.container');
const score = document.querySelector('.score');
let count = document.querySelector('.countdown');
const squares = document.querySelectorAll('.square');

let point = 0;
let timeLeft = 60;
let timerID;
let displayMoleTimerID;
let moleSquare;
let restartBtn;

function setScoreAndTimeLeft() {

    score.textContent = point;
    count.textContent = timeLeft;

}

function countDown() {

    timeLeft--;
    count.textContent = timeLeft;

    if (!timeLeft) {

        gameOver();

    }

}

function removeMole() {
    
    squares.forEach(square => {

        square.classList.remove('mole');

    });

}

function displayMole() {

    removeMole();

    moleSquare = squares[Math.floor(Math.random() * 9)];
    moleSquare.classList.add('mole');

}

function gameOver() {

    clearInterval(timerID);
    clearInterval(displayMoleTimerID);
    setTimeout(() => alert('Time is up. Your score : ' + point), 10);
    removeMole();

    restartBtn = document.createElement('button');
    restartBtn.classList.add('restart');
    restartBtn.textContent = 'Restart Game';
    container.appendChild(restartBtn);
    restartBtn.addEventListener('click', restartGame);


}

function restartGame() {

    restartBtn.remove();
    point = 0;
    timeLeft = 60;
    start();

}

function start() {

    setScoreAndTimeLeft();
    timerID = setInterval(countDown, 1000);
    displayMoleTimerID = setInterval(displayMole, 1000);

}


squares.forEach(square => {

    square.addEventListener('mouseup', () => {

        if (moleSquare.id === square.id && timeLeft > 0) {

            point++;
            score.textContent = point;

        }

    })

});

start();
