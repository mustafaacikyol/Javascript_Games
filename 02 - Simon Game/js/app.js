let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let power = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictBtn = document.querySelector("#strict");
const powerBtn = document.querySelector("#on");
const startBtn = document.querySelector("#start");

strictBtn.addEventListener('change' ,  () => {
    
    if (strictBtn.checked) {
        strict = true;
    } else {
        strict = false;
    }

});

powerBtn.addEventListener('click' , () => {

    if (powerBtn.checked) {

        power = true;
        turnCounter.textContent = "-";

    } else {

        power = false;
        turnCounter.textContent = "";
        clearColor();
        clearInterval(intervalId);

    }

});


startBtn.addEventListener('click' , () => {

    if (power || win) {
        
        play();

    }
    
});

function play() {
    
    order = [];
    playerOrder = [];
    win = false;
    flash = 0;
    turn = 1;
    turnCounter.textContent = 1;
    good = true;

    for(let i=0 ; i<20 ; i++){

        order[i] = Math.floor( (Math.random() * 4) + 1);

    }

    compTurn = true;
    intervalId = setInterval(gameTurn , 800);

}

function gameTurn(){

    power = false;

    if (flash === turn) {
        
        compTurn = false;
        clearInterval(intervalId);
        clearColor();
        power = true;

    }

    if (compTurn) {
        
        clearColor();

        setTimeout( () => {

            if(order[flash] === 1) one();
            if(order[flash] === 2) two();
            if(order[flash] === 3) three();
            if(order[flash] === 4) four();

            flash++;

        } , 200 );

    }

}

function one(){

    if (noise) {
        document.getElementById('clip1').play();
    }

    noise = true;
    topLeft.style.backgroundColor = "lightgreen";

}

function two(){

    if (noise) {
        document.getElementById('clip2').play();
    }

    noise = true;
    topRight.style.backgroundColor = "tomato";

}

function three(){

    if (noise) {
        document.getElementById('clip3').play();
    }

    noise = true;
    bottomLeft.style.backgroundColor = "yellow";

}

function four(){

    if (noise) {
        document.getElementById('clip4').play();
    }

    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";

}

function clearColor(){

    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";

}

function flashColor(){

    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";

}

topLeft.addEventListener('click' , () => {

    if (power) {
        
        playerOrder.push(1);
        check();
        one();

        if (!win) {
            setTimeout(clearColor,300);
        }
        
    }
});

topRight.addEventListener('click' , () => {

    if (power) {
        
        playerOrder.push(2);
        check();
        two();

        if (!win) {
            setTimeout(clearColor,300);
        }
        
    }
});

bottomLeft.addEventListener('click' , () => {

    if (power) {
        
        playerOrder.push(3);
        check();
        three();

        if (!win) {
            setTimeout(clearColor,300);
        }
        
    }
});

bottomRight.addEventListener('click' , () => {

    if (power) {
        
        playerOrder.push(4);
        check();
        four();

        if (!win) {
            setTimeout(clearColor,300);
        }
        
    }
    
});

function check(){

    if (playerOrder[playerOrder.length -1] !== order[playerOrder.length -1]) 
        good = false;
    
    if (playerOrder.length === 20 && good) {
        winGame();
    }

    if (!good) {
        
        flashColor();
        turnCounter.textContent = "NO!";

        setTimeout(() => {

            turnCounter.textContent = turn;
            clearColor();

            if (strict) {

                play();

            }else{

                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);

            }

        }, 800);

        noise = false;

    }

    if (good && !win && turn === playerOrder.length) {
        
        turn++;
        turnCounter.textContent = turn;
        compTurn = true;
        playerOrder = [];
        flash = 0;
        intervalId = setInterval(gameTurn, 800);

    }

}

function winGame(){

    flashColor();
    turnCounter.textContent = "WIN!";
    win = true;
    power = false;

}






