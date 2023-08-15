const ratColor = "black";

const rat = {
  x: 0,
  y: 0,
};

const canvas = document.querySelector("canvas");

const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext("2d");

let velocity = 0;
let acceleration = 0;
let drag = 0.5;
const drawRat = () => {
  const ratWidth = 10;
  velocity += acceleration;
  if (velocity > 0) velocity -= drag;
  if (velocity < 0) velocity += drag;

  rat.x += velocity;

  if (rat.x < 0) {
    rat.x = 0;
    velocity = 0;
    return;
  }

  if (rat.x > width) {
    rat.x = width - ratWidth;
    velocity = 0;
    return;
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

  ctx.fillText(`frames: ${frames}`, 0, 10);
  ctx.fillText(`seconds: ${seconds}`, 0, 20);
  ctx.fillText(`fps: ${fps}`, 0, 30);
  ctx.fillText(`rat velocity: ${velocity}`, 0, 50);

  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);
  drawRat();
  ctx.restore();
};

requestAnimationFrame(() => draw());

document.onkeydown = (event) => {
  const key = event.key;

  if (key === "ArrowRight") {
    if (velocity < -1) {
      acceleration = 1.5;
      return;
    }
    acceleration = 1;
    return;
  }

  if (key === "ArrowLeft") {
    if (velocity > 1) {
      acceleration = -1.5;
      return;
    }
    acceleration = -1;
    return;
  }
};

document.onkeyup = (event) => {
  const key = event.key;

  if (key === "ArrowRight" || key === "ArrowLeft") {
    acceleration = 0;
  }
};
