const leftTimeContainer = document.querySelector(".display__time-left");
const endTimeContainer = document.querySelector(".display__end-time");
const timeTriggers = document.querySelectorAll("[data-time]");

[...timeTriggers].forEach(t =>
    t.addEventListener("click", e => startTimer(parseInt(e.target.dataset.time))));

document.customForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    const minutes = e.target.minutes.value;
    startTimer(minutes * 60);
});

let countdown;

function startTimer(seconds) {
    leftTimeContainer.classList.remove("blinker");
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    console.log(now);
    console.log(then);

    renderTimeLeft(seconds);
    renderEndTime(seconds);

    countdown = setInterval(() => {

        const rightNow = Date.now();
        const secondsLeft = Math.round((then - rightNow) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            
            leftTimeContainer.classList.add("blinker");

            return;
        }

        renderTimeLeft(secondsLeft);
    }, 1000);
}

function renderTimeLeft(seconds) {

    console.log(`Seconds left: ${seconds}`);

    const hoursLeft = Math.floor(seconds / 3600);
    const minLeft = Math.floor((seconds - hoursLeft * 3600) / 60);
    const secLeft = seconds % 60;

    console.log({
        hoursLeft, minLeft, secLeft
    });

    if (hoursLeft > 0) {
        leftTimeContainer.textContent = `
            ${hoursLeft}:${minLeft.toString().padStart(2, "0")}:${
                secLeft.toString().padStart(2, "0")
            }
        `;

        return;
    }

    leftTimeContainer.textContent = `
        ${minLeft}:${secLeft.toString().padStart(2, "0")}
    `;
}

function renderEndTime(seconds) {

    const then = Date.now() + seconds * 1000;
    const beBackDate = new Date(then);

    endTimeContainer.textContent = `
        Be back at ${beBackDate.getHours()}:${
            beBackDate.getMinutes().toString().padStart(2, "0")
        }
    `;
}
