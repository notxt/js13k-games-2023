const ratColor = "black";

const rat = {
  x: 0,
  y: 0,
};

const canvas = document.querySelector("canvas");

const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext("2d");

let xAcceleration = 0;
let xVelocity = 0;
let drag = 0.5;

let yAcceleration = 0;
let yVelocity = 0;
let gravity = 0.5;

const drawRat = () => {
  const ratWidth = 10;
  xVelocity += xAcceleration;
  if (xVelocity > 0) xVelocity -= drag;
  if (xVelocity < 0) xVelocity += drag;

  rat.x += xVelocity;

  if (rat.x < 0) {
    rat.x = 0;
    xVelocity = 0;
    return;
  }

  if (rat.x > width) {
    rat.x = width - ratWidth;
    xVelocity = 0;
    return;
  }

  yAcceleration -= gravity;
  yVelocity += yAcceleration;

  rat.y += yVelocity;

  if (rat.y <= 0) {
    rat.y = 0;
    yVelocity = 0;
    yAcceleration = 0;
  }

  ctx.fillStyle = ratColor;
  ctx.fillRect(rat.x, rat.y, ratWidth, 10);
};

let frames = 0;
const draw = () => {
  frames++;
  requestAnimationFrame(() => draw());
  const seconds = Math.round(performance.now() / 1000);
  const fps = Math.round(frames / seconds);

  ctx.clearRect(0, 0, width, height);

  const textXOffset = 2;
  ctx.fillText(`FPS     ${fps}`, textXOffset, 10);
  ctx.fillText(`X Speed ${xVelocity}`, textXOffset, 20);
  ctx.fillText(`Y Speed ${yVelocity}`, textXOffset, 30);

  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);
  drawRat();
  ctx.restore();
};

requestAnimationFrame(() => draw());

document.onkeydown = (event) => {
  const code = event.code;

  if (code === "ArrowRight") {
    if (yVelocity !== 0) return;
    if (xVelocity < -1) {
      xAcceleration = 1.5;
      return;
    }
    xAcceleration = 1;
    return;
  }

  if (code === "ArrowLeft") {
    if (yVelocity !== 0) return;
    if (xVelocity > 1) {
      xAcceleration = -1.5;
      return;
    }
    xAcceleration = -1;
    return;
  }

  if (code === "Space") {
    if (yVelocity !== 0) return;
    yAcceleration = 3;
  }
};

document.onkeyup = (event) => {
  const key = event.key;

  if (key === "ArrowRight" || key === "ArrowLeft") {
    xAcceleration = 0;
  }
};
