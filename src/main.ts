import { typeText } from "./util";

//Typing title effect
const titleEl = document.getElementById("title") as HTMLHeadingElement;
const title = "Frontend Engineer";
typeText(title, titleEl);

// Animation
const CELL_SIZE = 10;

// Delta time utils
let lastTimestamp = 0;
let interval = 1000 / 60;
let counter = 0;

let radius = 0;
let radiusVelocity = 0.3;

const canvas = document.querySelector("#santiago-canvas") as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
let gradiant = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradiant.addColorStop(0.5, "yellow");
gradiant.addColorStop(0.7, "blue");
gradiant.addColorStop(0.9, "red");
ctx.strokeStyle = gradiant;
ctx.lineWidth = 1;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gradiant = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradiant.addColorStop(0.5, "yellow");
  gradiant.addColorStop(0.7, "blue");
  gradiant.addColorStop(0.9, "red");
  ctx.strokeStyle = gradiant;
});

const pointerStore = {
  x: 0,
  y: 0,
};

function animate(timestamp: number) {
  const dt = timestamp - lastTimestamp;
  if (counter > interval) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x += CELL_SIZE) {
      for (let y = 0; y < canvas.height; y += CELL_SIZE) {
        ctx?.beginPath();
        ctx?.moveTo(x, y);
        const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * radius;
        const dxToPointer = pointerStore.x - x;
        const dyToPointer = pointerStore.y - y;
        let distance = dxToPointer * dxToPointer + dyToPointer * dyToPointer;
        if (distance > 100000) distance = 100000;

        const length = distance * 0.001;
        ctx?.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
        ctx.stroke();
        ctx?.closePath();
      }
    }
    radius += radiusVelocity;
    if (radius > 10 || radius < -10) radius *= -1;
    counter = 0;
  } else {
    counter += dt;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener("mousemove", ({ x, y }) => {
  pointerStore.x = x;
  pointerStore.y = y;
});
