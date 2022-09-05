let cardsArray = [
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'cheeseburger',
        img: 'img/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'fries',
        img: 'img/fries.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'hotdog',
        img: 'img/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'ice-cream',
        img: 'img/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'milkshake',
        img: 'img/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    },
    {
        name: 'pizza',
        img: 'img/pizza.png'
    }

];

const container = document.querySelector('.container');
const grid = document.querySelector('.grid');
const score = document.querySelector('.score');

let card;
let cardID;
let point = 0;
let clickedCardsName = [];
let clickedCardsID = [];
let result;
let restartBtn;

score.textContent = point;

function sortCards() {

    cardsArray.sort(() => 0.5 - Math.random());
    
}

function createBoard() {

    for (let i = 0; i < cardsArray.length; i++) {

        card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', i);
        grid.appendChild(card);
        card.addEventListener('click', flipCard);

    }

}

function flipCard() {

    cardID = this.getAttribute('data-id');
    this.setAttribute('src', cardsArray[cardID].img);
    clickedCardsName.push(cardsArray[cardID].name);
    clickedCardsID.push(cardID);

    if (clickedCardsName.length === 2) {

        setTimeout(checkCards, 500);

    }


}

function checkCards() {

    if (clickedCardsName[0] === clickedCardsName[1]) {

        point++;
        score.textContent = point;
        let cards = document.querySelectorAll('img');

        cards.forEach((e) => {

            if (e.dataset.id === clickedCardsID[0] || e.dataset.id === clickedCardsID[1]) {

                e.setAttribute('src', 'img/white.png');

            }

        });

        if (point === 6) {
            
            WinGame();

        }

    } else {

        let cards = document.querySelectorAll('img');

        cards.forEach((e) => {

            if (e.dataset.id === clickedCardsID[0] || e.dataset.id === clickedCardsID[1]) {

                e.setAttribute('src', 'img/blank.png');

            }

        });

    }

    clickedCardsName = [];
    clickedCardsID = [];

}

function WinGame() {
    
    while (grid.firstChild) {
        
        grid.removeChild(grid.firstChild);

    }

    grid.classList.remove('grid');
    grid.classList.add('result');
    result = document.createElement('p');
    grid.appendChild(result);
    result.textContent = 'You WIN the Game';
    restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart Game';
    grid.appendChild(restartBtn);

    restartBtn.addEventListener('click', restartGame);

}

function restartGame() {
    
    result.remove();
    restartBtn.remove();
    grid.classList.remove('result');
    grid.classList.add('grid');

    setVariables();

    start();

}

function setVariables() {
    
    clickedCardsName = [];
    clickedCardsID = [];
    point = 0;
    score.textContent = point;

}

function start() {
    
    sortCards();
    createBoard();

}

start();

