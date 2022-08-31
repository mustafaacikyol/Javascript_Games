document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let movePlatformsId;
    let score = 0;


    function createDoodler() {

        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';

    }

    class Platform {

        constructor(newPlatBottom) {

            this.bottom = newPlatBottom;
            this.left = Math.floor(Math.random() * 315);
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.bottom = this.bottom + 'px';
            visual.style.left = this.left + 'px';
            grid.appendChild(visual);

        }

    }

    function createPlatforms() {

        for (let i = 0; i < platformCount; i++) {

            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let platform = new Platform(newPlatBottom);
            platforms.push(platform);

        }
    }

    function movePlatforms() {

        if (doodlerBottomSpace > 200) {

            platforms.forEach(platform => {

                platform.bottom = platform.bottom - 8;
                const visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if (platform.bottom < 10) {

                    platform.visual.classList.remove('platform');
                    platforms.shift();

                    score++;

                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);

                }

            })

        }
    }

    function jump() {

        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {

            doodlerBottomSpace += 2;
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace > startPoint + 200) {

                fall();

            }

        }, 30);

    }

    function fall() {

        clearInterval(upTimerId);
        isJumping = false;

        downTimerId = setInterval(function () {

            doodlerBottomSpace -= 3;
            doodler.style.bottom = doodlerBottomSpace + 'px';

            if (doodlerBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach((platform) => {

                if (doodlerBottomSpace <= platform.bottom + 15 &&
                    doodlerBottomSpace >= platform.bottom &&
                    doodlerLeftSpace >= platform.left - 60 &&
                    doodlerLeftSpace <= platform.left + 85 &&
                    !isJumping
                ) {
                    startPoint = doodlerBottomSpace;
                    jump();
                }

            });

        });

    }

    function control(e) {

        if (e.key === "ArrowLeft") {
            moveLeft();
        } else if (e.key === "ArrowRight") {
            moveRight();
        } else if (e.key === "ArrowUp") {
            moveStraight();
        }

    }

    function moveLeft() {

        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }

        if (isGoingLeft) {
            clearInterval(leftTimerId);
        }

        isGoingLeft = true;
        leftTimerId = setInterval(() => {

            if (doodlerLeftSpace >= 0) {

                doodlerLeftSpace -= 8;
                doodler.style.left = doodlerLeftSpace + 'px';

            } else {
                moveRight();
            }

        }, 20);

    }

    function moveRight() {

        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }

        if (isGoingRight) {
            clearInterval(rightTimerId);
        }

        isGoingRight = true;
        rightTimerId = setInterval(() => {

            if (doodlerLeftSpace <= 313) {

                doodlerLeftSpace += 8;
                doodler.style.left = doodlerLeftSpace + 'px';

            } else {
                moveLeft();
            }

        }, 20);

    }

    function moveStraight() {

        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        isGoingLeft = false;
        isGoingRight = false;

    }

    function gameOver() {

        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
        clearInterval(movePlatformsId);
        isGameOver = true;

        while (grid.firstChild) {

            grid.removeChild(grid.firstChild);

        }

        if (isGameOver) {

            restart();

        }

    }

    function restart() {

        let result = document.createElement('p');
        grid.appendChild(result);
        result.classList.add('result');
        result.innerHTML = `Game Over! <br> Your Score : ${score}`;

        let restartBtn = document.createElement('button');
        restartBtn.classList.add('restart');
        grid.appendChild(restartBtn);
        restartBtn.innerHTML = 'Restart Game';

        restartBtn.addEventListener('click', () => {

            while (grid.firstChild) {

                grid.removeChild(grid.firstChild);

            }

            platforms = [];
            isGameOver = false;
            score = 0;
            startPoint = 150;
            doodlerBottomSpace = startPoint;

            start();

        });

    }

    function start() {

        if (!isGameOver) {

            createPlatforms();
            createDoodler();
            movePlatformsId = setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', control);

        }

    }

    start();

})
