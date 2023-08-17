import { createRat } from "./rat";
import { createControlSystem } from "./system/control";
import { CreateDrawSystemArgs, createDrawSystem } from "./system/draw";
import { createMoveSystem } from "./system/move";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const width = canvas.width;
const height = canvas.height;

const controlSystem = createControlSystem();

const moveSystem = createMoveSystem();

const createDrawSystemArgs: CreateDrawSystemArgs = {
  ctx,
  canvasWidth: width,
  canvasHeight: height,
};
const drawSystem = createDrawSystem(createDrawSystemArgs);

const rat = createRat(width, height);
controlSystem.add(rat);
moveSystem.add(rat);

let frameCount = 0;
const drawInfo = (t: number) => {
  const seconds = Math.round(t / 1000);
  const fps = Math.round(frameCount / seconds);

  const offset = 2;
  ctx.fillText(`Seconds ${seconds}`, offset, 10);
  ctx.fillText(`FPS     ${fps}`, offset, 20);
};

const draw = () => {
  frameCount++;
  const t = performance.now();

  drawInfo(t);

  moveSystem.move();
  drawSystem.draw();

  requestAnimationFrame(() => draw());
};

requestAnimationFrame(() => draw());

const controlCodes = ["ArrowLeft", "ArrowRight", "Space"] as const;

type ControlCode = (typeof controlCodes)[number];

const isControlCode = (code: string): code is ControlCode =>
  controlCodes.includes(code as ControlCode);

const keyPressFactory = (pressed: boolean) => (event: KeyboardEvent) => {
  const code = event.code;

  if (!isControlCode(code)) return;

  if (code === "ArrowRight") {
    controlSystem.right(pressed);
    return;
  }

  if (code === "ArrowLeft") {
    controlSystem.left(pressed);
    return;
  }

  if (code === "Space") {
    controlSystem.space(pressed);
    return;
  }

  throw new Error(`unknown control code ${code}`);
};

const keyDown = keyPressFactory(true);
document.onkeydown = (event) => keyDown(event);

const keyUp = keyPressFactory(false);
document.onkeyup = (event) => keyUp(event);
