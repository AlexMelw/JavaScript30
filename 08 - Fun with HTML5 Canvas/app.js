
const container = document.querySelector(`.container`);
const drawingBox = document.querySelector(`.drawing-box`);
const canvas = document.querySelector(`#draw`);

const drawingBoxComputedStyle = getComputedStyle(drawingBox);
const shrt = drawingBoxComputedStyle;

// console.log(drawingBoxComputedStyle.paddingTop);
// console.log(drawingBoxComputedStyle.paddingBottom);
// console.log(drawingBoxComputedStyle.paddingLeft);
// console.log(drawingBoxComputedStyle.paddingRight);

const paddingLeft = parseFloat(shrt.paddingLeft);
const paddingRight = parseFloat(shrt.paddingRight);
const paddingTop = parseFloat(shrt.paddingTop);
const paddingBottom = parseFloat(shrt.paddingBottom);

canvas.width = drawingBox.clientWidth - paddingLeft - paddingRight;
canvas.height = drawingBox.clientHeight - paddingTop - paddingBottom;

// console.log(canvas.width);
// console.log(canvas.height);

const ctx = canvas.getContext(`2d`);
ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 61;

let isMouseDown = false;
let isMouseIn = true;
const isDrawing = () => {
    // console.log(`isMouseIn ${isMouseIn}`);
    // console.log(`isMouseDown ${isMouseDown}`);

    return isMouseDown && isMouseIn;
};

let lastX = 0;
let lastY = 0;
let hue = 299;
let growing = false;

const draw = function (e) {

    if (!isDrawing()) {
        return true;
    }

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    if (ctx.lineWidth >= 110 || ctx.lineWidth <= 40){
        growing = !growing;
    }

    if (growing) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

    hue = ++hue % 360;
    [lastX, lastY] = [e.offsetX, e.offsetY];
};


canvas.addEventListener(`mousedown`, (e) => {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    isMouseDown = true;
});

container.addEventListener(`mouseup`, (e) => {
    isMouseDown = false;
    // console.log(`MOUSEUP`)
});

canvas.addEventListener(`mouseout`, (e) => {
    isMouseIn = false;
    console.log(e);
});

canvas.addEventListener(`mouseenter`, (e) => {
    isMouseIn = true;
});

canvas.addEventListener(`mousemove`, draw);