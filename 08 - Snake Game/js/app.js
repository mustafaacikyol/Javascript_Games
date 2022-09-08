const squares = document.querySelectorAll('.grid div');
const score = document.querySelector('.score');
const startRestartBtn = document.querySelector('.start');

let currentIndex;
let currentSnake;
let appleIndex = 0;
let point;
let width;
let direction;
let speed;
let interval;
let intervalTime;


function startRestartGame() {
    
    clearInterval(interval);
    squares.forEach(square => square.classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    currentIndex = 0;
    currentSnake = [4,3,2,1,0];
    appleIndex = 0;
    point = 0;
    score.textContent = point;
    width = 20;
    direction = 1;
    speed = 0.95;
    intervalTime = 300;

    for (let i = 0; i < currentSnake.length; i++) {
        
        squares[currentSnake[i]].classList.add('snake');
        
    }

    displayRandomApple();

    interval = setInterval(moveSnake , intervalTime);

}

function displayRandomApple() {
    
    do {
        
        appleIndex = Math.floor(Math.random() * squares.length);

    } while (squares[appleIndex].classList.contains('snake'));

    squares[appleIndex].classList.add('apple');

}

function moveSnake() {

    if (
        (currentSnake[0]%width === width-1 && direction === 1) ||
        (!(currentSnake[0]%width) && direction === -1) ||
        (currentSnake[0] < width && direction === -width) ||
        (currentSnake[0] >= width*(width-1) && direction === width)||
        squares[currentSnake[0]+direction].classList.contains('snake')
       ){
        
        return clearInterval(interval);
    
    }
    
    const lastItem = currentSnake.pop();
    squares[lastItem].classList.remove('snake');
    const firstItem = currentSnake[0] + direction;
    currentSnake.unshift(firstItem);
    squares[firstItem].classList.add('snake');

    if (currentSnake[0] === appleIndex) {
        
        point++;
        score.textContent = point;
        currentSnake.unshift(appleIndex);
        squares[appleIndex].classList.remove('apple');
        squares[appleIndex].classList.add('snake');
        displayRandomApple();
        intervalTime = intervalTime * speed;
        clearInterval(interval);
        interval = setInterval(moveSnake , intervalTime);

    }    

}

function control(e) {
    
    if (e.keyCode === 37) {
        direction = -1;
    }else if (e.keyCode === 38) {
        direction = -width;
    }else if (e.keyCode === 39) {
        direction = +1;
    }else if (e.keyCode === 40) {
        direction = +width;
    }

}


startRestartBtn.addEventListener('click' , startRestartGame);
document.addEventListener('keyup' , control);
