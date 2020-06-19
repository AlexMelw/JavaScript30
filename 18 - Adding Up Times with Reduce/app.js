const videosNode = document.querySelector(".videos");
const videoLiNodes = document.querySelectorAll("li[data-time]");

const allVideosTotalSeconds = [...videoLiNodes].reduce((allVideosTotalSeconds, liNode) => {
    
    const time = liNode.dataset.time;
    const timeUnits = time && time.split(`:`).reverse().map(parseFloat);
    const sec = timeUnits[0] || 0;
    const min = timeUnits[1] || 0;
    const hours = timeUnits[2] || 0;

    const totalVideoSeconds = 0
        + sec
        + min * 60
        + hours * 3600;

    return allVideosTotalSeconds + totalVideoSeconds;
}, 0);

console.log(`Total seconds: ${allVideosTotalSeconds}`);

const hours = Math.floor(allVideosTotalSeconds / 3600);
const minutes = Math.floor(allVideosTotalSeconds % 3600 / 60);

console.log(`Hours: ${hours}`);
console.log(`Minutes: ${minutes}`);
console.log(`Seconds: ${allVideosTotalSeconds % 60}`);
