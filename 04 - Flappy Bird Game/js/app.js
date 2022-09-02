const grid = document.querySelector('.grid-container');
let sky = document.querySelector('.sky');
let bird = document.querySelector('.bird');
let ground = document.querySelector('.ground');

let countDiv;
let count = 3;
let countTimerID;
let score = 0;
let obstacle;
let obstacleRight = 0;
let obstacleHeight;
let createObstaclesTimerID;
let moveObstaclesTimerID;
let topObstacle;
let topObstacleRight = 0;
let topObstacleHeight;
let birdBottom = 150;
let fallTimerID;
let result;
let restartBtn;


function counter() {

    countDiv = document.createElement('div');
    countDiv.classList.add('counter');
    grid.appendChild(countDiv);

}

function displayCounter() {

    countDiv.innerHTML = count;
    count--;

    if (count < 0) {

        clearInterval(countTimerID);
        grid.removeChild(countDiv);

    }

}

function beforeTheGame() {

    counter();
    displayCounter();
    countTimerID = setInterval(displayCounter, 1000);

}

beforeTheGame();


createObstaclesTimerID = setInterval(createObstacles, 3000);


function createObstacles() {

    clearInterval(moveObstaclesTimerID);

    obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacleRight = 0;
    obstacle.style.right = obstacleRight + 'px';
    obstacleHeight = 100 + Math.floor(Math.random() * 100);
    obstacle.style.height = obstacleHeight + 'px';

    topObstacle = document.createElement('div');
    topObstacle.classList.add('top-obstacle');
    grid.appendChild(topObstacle);
    topObstacleRight = 0;
    topObstacle.style.right = topObstacleRight;
    topObstacleHeight = 100 + Math.floor(Math.random() * 100);
    topObstacle.style.height = topObstacleHeight + 'px';

    moveObstaclesTimerID = setInterval(moveObstacles, 30);

}

function moveObstacles() {

    if (obstacleRight >= 450) {

        clearInterval(moveObstaclesTimerID);
        grid.removeChild(obstacle);
        grid.removeChild(topObstacle);
        score++;

    }

    obstacleRight += 5;
    obstacle.style.right = obstacleRight + 'px';

    topObstacleRight += 5;
    topObstacle.style.right = topObstacleRight + 'px';

}

function start() {

    document.addEventListener('keyup', control);
    fallTimerID = setInterval(fall, 80);

}

setTimeout(start, 3000);

function control(e) {

    if (e.keyCode === 32) {

        jump();

    }

}

function jump() {

    birdBottom += 30;
    bird.style.bottom = birdBottom + 'px';

    check();

}

function fall() {

    birdBottom -= 6;
    bird.style.bottom = birdBottom + 'px';

    check();

}

function check() {
    
    if (birdBottom <= 0 || (birdBottom < obstacleHeight && obstacleRight >= 350) || (400 - birdBottom < topObstacleHeight && topObstacleRight >= 350) ) {
        
        gameOver();

    }

}

function gameOver() {

    removeGameElements();

    removeIntervals();

    addResultElements();

    document.removeEventListener('keyup' ,control);

    restartBtn.addEventListener('click' , restartGame);

}

function removeGameElements() {
        
    sky.remove();
    ground.remove();
    obstacle.remove();
    topObstacle.remove();

}

function removeIntervals() {
        
    clearInterval(createObstaclesTimerID);
    clearInterval(moveObstaclesTimerID);
    clearInterval(fallTimerID);

}

function addResultElements() {
    
    result= document.createElement('div');
    result.classList.add('result');
    grid.appendChild(result);

    restartBtn = document.createElement('button');
    restartBtn.classList.add('result-btn');
    grid.appendChild(restartBtn);

    result.innerHTML = `Game Over! <br> Your Score : ${score}`;
    restartBtn.innerHTML = 'Restart Game';

}

function restartGame() {
    
    removeResultElements();
    addGameElements();
    setVariables();
    
    beforeTheGame();
    createObstaclesTimerID = setInterval(createObstacles, 3000);
    setTimeout(start, 3000);

}

function removeResultElements() {
    
    result.remove();
    restartBtn.remove();

}

function addGameElements() {
    
    sky = document.createElement('div');
    sky.classList.add('sky');
    grid.appendChild(sky);

    bird = document.createElement('div');
    bird.classList.add('bird');
    sky.appendChild(bird);

    ground = document.createElement('div');
    ground.classList.add('ground');
    grid.appendChild(ground);

}

function setVariables() {
    
    count = 3;
    score = 0;
    birdBottom = 150;

}




