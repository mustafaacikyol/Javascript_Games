const timeLeft = document.querySelector('.time');
const result = document.querySelector('.result');
const startBtn = document.querySelector('.startbtn');
const squares = document.querySelectorAll('.grid div');

let currentIndex = 76;
let time = 20;
let width = 9;
let timerID;
let moveObstaclesID;
let isGameStart = false;
let isPause = false;

function moveObstacles() {

    squares.forEach(square => {

        if (square.classList.contains("log-left")) {

            if (square.classList.contains('l1')) {

                square.classList.remove('l1');
                square.classList.add('l2');

            } else if (square.classList.contains('l2')) {

                square.classList.remove('l2');
                square.classList.add('l3');

            } else if (square.classList.contains('l3')) {

                square.classList.remove('l3');
                square.classList.add('l4');

            } else if (square.classList.contains('l4')) {

                square.classList.remove('l4');
                square.classList.add('l5');

            } else if (square.classList.contains('l5')) {

                square.classList.remove('l5');
                square.classList.add('l1');

            }

        } else if (square.classList.contains("log-right")) {

            if (square.classList.contains('l1')) {

                square.classList.remove('l1');
                square.classList.add('l5');

            } else if (square.classList.contains('l2')) {

                square.classList.remove('l2');
                square.classList.add('l1');

            } else if (square.classList.contains('l3')) {

                square.classList.remove('l3');
                square.classList.add('l2');

            } else if (square.classList.contains('l4')) {

                square.classList.remove('l4');
                square.classList.add('l3');

            } else if (square.classList.contains('l5')) {

                square.classList.remove('l5');
                square.classList.add('l4');

            }

        } else if (square.classList.contains("car-left")) {

            if (square.classList.contains('c1')) {

                square.classList.remove('c1');
                square.classList.add('c2');

            } else if (square.classList.contains('c2')) {

                square.classList.remove('c2');
                square.classList.add('c3');

            } else if (square.classList.contains('c3')) {

                square.classList.remove('c3');
                square.classList.add('c1');

            }

        } else if (square.classList.contains("car-right")) {

            if (square.classList.contains('c1')) {

                square.classList.remove('c1');
                square.classList.add('c3');

            } else if (square.classList.contains('c2')) {

                square.classList.remove('c2');
                square.classList.add('c1');

            } else if (square.classList.contains('c3')) {

                square.classList.remove('c3');
                square.classList.add('c2');

            }

        }

    });

    checkFrog();

}

function moveFrog(e) {

    switch (e.keyCode) {
        case 37:

            if (currentIndex % width != 0) {

                squares[currentIndex].classList.remove('frog');
                currentIndex -= 1;

            }
            break;
        case 38:

            if (currentIndex > width - 1) {

                squares[currentIndex].classList.remove('frog');
                currentIndex -= width;

            }
            break;
        case 39:

            if (currentIndex % width < width - 1) {

                squares[currentIndex].classList.remove('frog');
                currentIndex += 1;

            }
            break;
        case 40:

            if (currentIndex + width < width * width) {

                squares[currentIndex].classList.remove('frog');
                currentIndex += width;

            }
            break;
        default:
            break;
    }

    squares[currentIndex].classList.add('frog');

    checkFrog();

}

function countDownTime() {

    time--;
    timeLeft.textContent = time;

    if (!time) {

        result.textContent = "You LOSE the Game!";
        clearInterval(timerID);
        clearInterval(moveObstaclesID);

    }

}

function checkFrog() {

    if (squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        squares[currentIndex].classList.contains('c1')) lose();

    if (squares[currentIndex].classList.contains('end') && time > 0) win();
    
}

function lose() {

    isGameStart = false;
    clearInterval(timerID);
    clearInterval(moveObstaclesID);
    result.textContent = "You LOSE the Game!";
    document.removeEventListener('keyup', moveFrog);

}

function win() {
    
    isGameStart = false;
    clearInterval(timerID);
    clearInterval(moveObstaclesID);
    result.textContent = "You WIN the Game!";
    document.removeEventListener('keyup', moveFrog);

}

function start() {

    document.addEventListener('keyup', moveFrog);

    if (!isGameStart && !isPause) {

        isGameStart = true;
        squares[currentIndex].classList.remove('frog');
        result.textContent = "";
        time = 20;
        timeLeft.textContent = time;
        currentIndex = 76;
        squares[currentIndex].classList.add('frog');
        timerID = setInterval(countDownTime, 1000);
        moveObstaclesID = setInterval(moveObstacles, 1000);


    } else if (isGameStart && !isPause) {

        isPause = true;
        clearInterval(timerID);
        clearInterval(moveObstaclesID);
        document.removeEventListener('keyup', moveFrog);


    } else if (isGameStart && isPause) {

        isPause = false;
        timerID = setInterval(countDownTime, 1000);
        moveObstaclesID = setInterval(moveObstacles, 1000);

    }


}

startBtn.addEventListener('click', start);
