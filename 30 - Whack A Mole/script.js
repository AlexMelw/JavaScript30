import "./style.css";

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

moles.forEach(mole =>
    mole.addEventListener("click", bonk))

let score = 0;
let isTimeUp = true;
let lastHole;

function bonk(e) {

    if (!e.isTrusted) {
        return;
    }

    if (this.parentElement.classList.contains("up")) {
        this.parentElement.classList.remove("up");
        scoreBoard.textContent = ++score;
    }
}

function startGame(e) {
    
    if (!isTimeUp) {
        return;
    }
    
    isTimeUp = false;
    lastHole = null;
    score = 0;
    scoreBoard.textContent = score;

    peep();

    setTimeout(() => {
        isTimeUp = true;
    }, 30_000);
}

const startGameButton = document.querySelector("#startGame");
startGameButton.addEventListener("click", startGame);

function peep() {

    if (score === 3) {
        isTimeUp = true;
        return;
    }

    const time = getRandomTime(300, 1000);
    const hole = getRandomHole(holes);

    if (hole === lastHole) {
        console.log("same hole skipped");

        if (!isTimeUp) {
            peep();
        }

        return;
    }

    hole.classList.add("up");

    setTimeout(() => {

        hole.classList.remove("up");
        lastHole = hole;

        if (!isTimeUp) {
            peep();
        }

    }, time);
}

function getRandomTime(min, max) {

    const randomTime = Math.floor(Math.random() * (max - min + 1) + min);

    return randomTime;
}

function getRandomHole(holes) {

    const randomHoleIndex = Math.floor(Math.random() * 6);

    return holes[randomHoleIndex];
}
