const container = document.querySelector(".items");

let isDown = false;
let lastInnerMovementX = 0;
let lastScrollLet = 0;

container.addEventListener("mousedown", e => {
    isDown = true;
    container.classList.add("active");

    lastInnerMovementX = e.pageX - container.offsetLeft;
    lastScrollLeft = container.scrollLeft;
});

container.addEventListener("mouseup", e => {
    isDown = false;
    container.classList.remove("active");
});

container.addEventListener("mousemove", e => {

    if (!isDown) {
        return;
    }

    e.preventDefault();

    const currentMovementX = e.pageX - container.offsetLeft;
    const walk = lastInnerMovementX - currentMovementX;

    container.scrollLeft = lastScrollLeft + walk * 4;
});
