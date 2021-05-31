const speed = document.querySelector(".speed");
const speedbar = document.querySelector(".speed-bar");
const video = document.querySelector("video");

let isMouseDown = false;

speed.addEventListener("mousedown", function(e) {
    isMouseDown = true;
    speed.classList.add("active");
});

document.addEventListener("mouseup", function(e) {
    isMouseDown = false;
    speed.classList.remove("active");
    console.log(speed);
});

document.addEventListener("mousemove", function(e) {
    
    if (!isMouseDown) {
        return;
    }

    const height = speed.offsetHeight;
    const rateSize = e.pageY - speed.offsetTop;

    if (rateSize < 0 || rateSize > height) {
        return;
    }

    const percentage = rateSize / height;
    const min = 0.4;
    const max = 4;
    const speedRate = min + (max - min) * percentage;

    console.log(speed);

    speedbar.style.height = `${Math.round(percentage * 100)}%`;
    speedbar.textContent = `${speedRate.toFixed(2)}x`;
    video.playbackRate = speedRate;

    console.log(height);
    console.log(rateSize);
});
