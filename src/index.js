const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");

const ctx = canvas.getContext('2d');

let canvasOffsetX;
let canvasOffsetY;

function updateOffsets() {
    const rect = canvas.getBoundingClientRect();
    canvasOffsetX = rect.left;
    canvasOffsetY = rect.top;
}

updateOffsets();

window.addEventListener("resize", updateOffsets);
window.addEventListener("scroll", updateOffsets);

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isPainting = false;
let lineWidth = 3;
let startX;
let startY;

toolbar.addEventListener('click', e => {

    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

});

toolbar.addEventListener('change', e => {

    if (e.target.id === 'color-picker') {
        ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === 'stroke') {
        lineWidth = e.target.value;
    }

});


const draw = (e) => {
    if (!isPainting) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
};

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);