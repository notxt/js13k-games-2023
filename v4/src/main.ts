import { CreateRatArg, createRat } from "./rat";
import { CreateRoomArg, createRoom } from "./room";
import { createBottomBoundSystem } from "./system/bound/bottom";
import { createLeftBoundSystem } from "./system/bound/left";
import { createRightBoundSystem } from "./system/bound/right";
import { createControlSystem } from "./system/control";
import { createDrawRectSystem } from "./system/draw/rect";
import { createRunLeftSystem } from "./system/control/runLeft";
import { createRunRightSystem } from "./system/control/runRight";
import { createPrevMoveSystem } from "./system/move/setPrev";
import { createMoveSystem } from "./system/move/move";
import { createGravitySystem } from "./system/physics/gravity";
import {
  CreateTableArg,
  CreateTableFactoryArg,
  createTableFactory,
} from "./table";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const width = canvas.width;
const height = canvas.height;

const prevMoveSystem = createPrevMoveSystem();

const controlSystem = createControlSystem();

const runLeftSystem = createRunLeftSystem();
const runRightSystem = createRunRightSystem();

const gravitySystem = createGravitySystem();

const moveSystem = createMoveSystem();

const bottomBoundSystem = createBottomBoundSystem();
const leftBoundSystem = createLeftBoundSystem();
const rightBoundSystem = createRightBoundSystem();
const drawRectSystem = createDrawRectSystem(ctx);

const createRatArg: CreateRatArg = {
  bottomBound: bottomBoundSystem,
  canvasHeight: height,
  canvasWidth: width,
  control: controlSystem,
  drawRect: drawRectSystem,
  gravity: gravitySystem,
  leftBound: leftBoundSystem,
  move: moveSystem,
  prevMove: prevMoveSystem,
  runLeft: runLeftSystem,
  runRight: runRightSystem,
};
createRat(createRatArg);

const createRoomArg: CreateRoomArg = {
  bottomBound: bottomBoundSystem,
  canvasHeight: height,
  canvasWidth: width,
  leftBound: leftBoundSystem,
  rightBound: rightBoundSystem,
};
createRoom(createRoomArg);

const createTableFactoryArg: CreateTableFactoryArg = {
  bottomBound: bottomBoundSystem,
  drawRect: drawRectSystem,
};
const createTable = createTableFactory(createTableFactoryArg);
const table1: CreateTableArg = {
  height: 1,
  name: "table1",
  width: 50,
  x: 50,
  y: 50,
};
createTable(table1);

const drawInfo = (t: number, frameCount: number) => {
  const seconds = Math.round(t / 1000);
  const fps = Math.round(frameCount / seconds);

  const offset = 2;
  ctx.font = "10px monospace";
  ctx.fillText(`FPS     ${fps}`, offset, 10);
};

let frameCount = 0;

let play = true;
const draw = () => {
  frameCount++;
  const t = performance.now();

  // Setup
  prevMoveSystem.set();

  // Controls
  runLeftSystem.update();
  runRightSystem.update();

  // Physics
  gravitySystem.apply();

  // Move
  moveSystem.update();

  // Hit
  bottomBoundSystem.test();
  leftBoundSystem.test();
  rightBoundSystem.test();

  // Draw
  ctx.clearRect(0, 0, width, height);

  drawInfo(t, frameCount);

  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);

  drawRectSystem.draw();

  ctx.restore();

  if (play) {
    requestAnimationFrame(() => draw());
  }
};

requestAnimationFrame(() => draw());

const controlCodes = ["ArrowLeft", "ArrowRight", "Space", "KeyP"] as const;

type ControlCode = (typeof controlCodes)[number];

const isControlCode = (code: string): code is ControlCode =>
  controlCodes.includes(code as ControlCode);

const keyPressFactory = (pressed: boolean) => (event: KeyboardEvent) => {
  const code = event.code;

  if (!isControlCode(code)) return;

  if (code === "KeyP") {
    play = play ? false : true;
    return;
  }

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
