const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result = document.querySelector('.result p');
const choices = document.querySelectorAll('.choice');

const arr = ['r', 'p', 's'];

let userScore = 0;
let computerScore = 0;
let finishScore = 10;

userScore_span.textContent = userScore;
computerScore_span.textContent = computerScore;

choices.forEach(function (item) {
    item.addEventListener('click', function (e) {

        const choice = e.target;
        const userChoice = choice.getAttribute('id');
        const computerChoice = arr[Math.floor(Math.random() * arr.length)];


        switch (userChoice + computerChoice) {
            case 'rs':
            case 'pr':
            case 'sp':
                win(userChoice, computerChoice);
                choice.classList.add('green-glow');
                setTimeout(() => choice.classList.remove('green-glow'), 400);
                break;

            case 'rr':
            case 'pp':
            case 'ss':
                draw(userChoice, computerChoice);
                choice.classList.add('gray-glow');
                setTimeout(() => choice.classList.remove('gray-glow'), 400);
                break;

            default:
                lose(userChoice, computerChoice);
                choice.classList.add('red-glow');
                setTimeout(() => choice.classList.remove('red-glow'), 400);
                break;
        }


    })
})

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.textContent = userScore;
    displayChoices(userChoice, computerChoice);
    if (userScore === finishScore) {
        result.textContent = "CONGRULATIONS! You Beat Your Rival";
        preventClick();
        gameStart();
    } else {
        result.textContent = "You WIN!";
    }

}

function draw(userChoice, computerChoice) {
    displayChoices(userChoice, computerChoice);
    result.textContent = "It's a DRAW!";
}

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScore_span.textContent = computerScore;
    displayChoices(userChoice, computerChoice);
    if (computerScore === finishScore) {
        result.textContent = "GAME OVER!";
        preventClick();
        gameStart();
    } else {
        result.textContent = "You LOSE!";
    }
}

function displayChoices(userChoice, computerChoice) {

    document.getElementById('user').textContent = displayChoice(userChoice);
    document.getElementById('computer').textContent = displayChoice(computerChoice);

}

function displayChoice(choice) {

    if (choice === 'r') {
        return 'ROCK';
    } else if (choice === 'p') {
        return 'PAPER';
    } else if (choice === 's') {
        return 'SCISSORS';
    } else{
        return '';
    }

}

function gameStart() {

    setTimeout(function () {

        result.textContent = "Let's Begin!";
        choices.forEach( (item) => item.classList.remove('prevent-click') );
        displayChoices("","");
        
    } ,2000);
    userScore = 0;
    computerScore = 0;
    userScore_span.textContent = userScore;
    computerScore_span.textContent = computerScore;
    
}

function preventClick() {

    choices.forEach((item) => item.classList.add('prevent-click'));

}




