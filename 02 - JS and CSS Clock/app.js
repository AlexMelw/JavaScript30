const launchAnologueClock = () => {

    const clock = {};
    const $clockFace = document.querySelector(`.clock .clock-face`);
    clock.$secondHand = $clockFace.querySelector(`.hand.second-hand`);
    clock.$minuteHand = $clockFace.querySelector(`.hand.min-hand`);
    clock.$hourHand = $clockFace.querySelector(`.hand.hour-hand`);

    const secondsIntervalHandler = setInterval(() => {

        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegrees = (90 + seconds * 6) % 360; // ... / 60 sec * 360deg
        clock.$secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const minutes = now.getMinutes();
        const minutesDegrees = (90 + minutes * 6) % 360;
        clock.$minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const hoursDegrees = (90 + hours % 12 / 12 * 360 ) % 360;
        clock.$hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

        console.log(`smth happens`);
        
    }, 1000);
}

launchAnologueClock();