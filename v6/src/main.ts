import { DrawD, drawFactory } from "./draw";

const { requestAnimationFrame } = window;
const { round, random, floor } = Math;

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const { height, width } = canvas;

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const draw = drawFactory(ctx, width, height);

const drawData: DrawD[] = [];
type Rat = DrawD;
type Tree = DrawD;

const rat: Rat = {
  type: "ratStand",
  scale: 1,
  x: round(width / 2),
  y: round((2 * height) / 3),
};
drawData.push(rat);

for (let i = 0; i < 15; i++) {
  const layers = 5;
  const multiplier = floor(height / layers);
  const y = round(random() * layers) * multiplier;
  const scale = y / height;
  console.log(height, y, scale);
  const tree: Tree = {
    type: "leafyTree",
    scale,
    x: floor(random() * width),
    y,
  };
  drawData.push(tree);
}

drawData.sort((d1, d2) => d1.y - d2.y);

let pause = false;
const loop: FrameRequestCallback = (t) => {
  draw(drawData, t);

  if (!pause) requestAnimationFrame(loop);
};

document.onkeydown = (event) => {
  const { key } = event;
  console.log(key);

  if (key === "p") pause = pause ? false : true;
  if (key === "ArrowRight") rat.type = "ratRun";
};

document.onkeyup = (event) => {
  const { key } = event;
  console.log(key);

  if (key === "ArrowRight") rat.type = "ratStand";
};

requestAnimationFrame(loop);
