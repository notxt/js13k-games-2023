import { createRat } from "./rat";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

let DRAG = 0.5;
let GRAVITY = 0.5;

const rat = createRat({
  DRAG: DRAG,
  GRAVITY: GRAVITY,
  ctx,
  canvasWidth: WIDTH,
});

let frameCount = 0;
const draw = () => {
  frameCount++;
  requestAnimationFrame(() => draw());
  const seconds = Math.round(performance.now() / 1000);
  const fps = Math.round(frameCount / seconds);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const textXOffset = 2;
  ctx.fillText(`FPS     ${fps}`, textXOffset, 10);

  ctx.save();
  ctx.translate(0, HEIGHT);
  ctx.scale(1, -1);
  rat.draw();
  ctx.restore();
};

requestAnimationFrame(() => draw());

document.onkeydown = (event) => {
  const code = event.code;

  if (code === "ArrowRight") {
    rat.moveRight();
    return;
  }

  if (code === "ArrowLeft") {
    rat.moveLeft();
    return;
  }

  if (code === "Space") {
    rat.jump();
    return;
  }
};

document.onkeyup = (event) => {
  const code = event.code;

  if (code === "ArrowRight" || code === "ArrowLeft") {
    rat.stop();
    return;
  }
};
