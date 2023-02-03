import { FlowField } from "./lib/FlowField";
import { typeText } from "./util";

//Typing title effect
const titleEl = document.getElementById("title") as HTMLHeadingElement;
const title = "Frontend Engineer";
typeText(title, titleEl);

const canvas = document.querySelector("#santiago-canvas") as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const flowFieldEffect = new FlowField(ctx, innerWidth, innerHeight);

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  flowFieldEffect.updateDimensions(innerWidth, innerHeight);
});

flowFieldEffect.animate();

window.addEventListener("mousemove", ({ x, y }) => {
  flowFieldEffect.setPointerCoordinates(x, y);
});
