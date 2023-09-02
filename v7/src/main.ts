import { drawRectFactory, drawActiveFactory } from "./draw";
import {
  Movable,
  YBound,
  applyMove,
  checkBottomBound,
  checkRectHit,
  ctrlMove,
  fall,
  initMove,
  Rect,
  checkLeftBound,
  XBound,
  checkRightBound,
  updateMove,
  ctrlJump,
} from "./move";

const { floor, random } = Math;

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const { width, height } = canvas;

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const { requestAnimationFrame: requestFrame } = window;

const leftBound: XBound = {
  x: 0,
};
const rightBound: XBound = {
  x: width,
};

const bottomBound: YBound = {
  y: height,
};

let rects: Movable[] = [];

const drawActive = drawActiveFactory(ctx);
const drawRect = drawRectFactory(ctx);

const rectCount = 10;
const rectSize = 10;
for (let i = 0; i < rectCount; i++) {
  const x = floor(random() * (width - rectSize));
  const y = floor(random() * (height - rectSize));
  const box: Rect & Movable = {
    cj: false,
    cl: false,
    cr: false,
    fv: 0,
    fvm: 2,
    fa: 1,
    h: rectSize,
    jv: 10,
    ma: 1,
    mv: 0,
    mvm: 1,
    w: rectSize,
    x,
    x0: x,
    x1: x,
    xv: 0,
    y,
    y0: y,
    y1: y,
    yv: 0,
  };

  rects.push(box);
}

let active = rects[0] as Movable;
if (typeof active === "undefined") throw new Error("active is undefined");

let pause = false;
const loop: FrameRequestCallback = () => {
  ctx.clearRect(0, 0, width, height);

  ctrlMove(active);
  ctrlJump(active);
  fall(rects);

  initMove(rects);
  updateMove(rects);

  checkLeftBound(leftBound, rects);
  checkRightBound(rightBound, rects);
  checkBottomBound(bottomBound, rects);

  checkRectHit(active, rects);
  applyMove(rects);

  drawActive(active);
  drawRect(rects);

  if (!pause) requestFrame(loop);
};

requestFrame(loop);

document.onkeydown = (event) => {
  const { code } = event;

  if (code === "KeyP") pause = !pause;
  if (code === "ArrowLeft") active.cl = true;
  if (code === "ArrowRight") active.cr = true;
  if (code === "Tab") {
    event.preventDefault();
    let i = rects.indexOf(active);
    if (i === -1) throw new Error("unable to locate active");
    i = (i + 1) % rects.length;
    active = rects[i] as Movable;
  }
  if (code === "Space") active.cj = true;
};

document.onkeyup = (event) => {
  const { code } = event;

  if (code === "ArrowLeft") active.cl = false;
  if (code === "ArrowRight") active.cr = false;
};
