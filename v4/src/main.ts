import { CreateRatArg, Rat, createRat } from "./entity/rat";
import { CtlDatum as CtlObj, createCtlSystem } from "./system/ctl";
import { DrawRectData, createDrawRectSystem } from "./system/draw/rect";
import { PrevMoveDatum, prevMoveFactory } from "./system/prevMove";
import { MoveData, createMoveSystem } from "./system/move";
import { GravityData, createGravitySystem } from "./system/gravity";
import { createDrawBoundSystem } from "./system/draw/bound";
import {
  BoundMoveDatum,
  XBoundDatum,
  YBoundDatum,
  createBoundSystem,
} from "./system/bound";
import { MoveCtlDatum, moveCtlFactory } from "./system/moveCtl";
import { CreateRoomArg, createRoom } from "./entity/room";
import { Table } from "./entity/table";
import { DragDatum, dragFactory } from "./system/drag";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const width = canvas.width;
const height = canvas.height;

const prevMove = prevMoveFactory();

const ctlSystem = createCtlSystem();
const velCtrl = moveCtlFactory();

const gravitySystem = createGravitySystem();
const drag = dragFactory();
const moveSystem = createMoveSystem();

const boundSystem = createBoundSystem();

const drawBoundSystem = createDrawBoundSystem(ctx);
const drawRectSystem = createDrawRectSystem(ctx);

const prevMoveData: PrevMoveDatum[] = [];

const ctlObjs: CtlObj[] = [];
const velCtrlData: MoveCtlDatum[] = [];

const gravityObjs: GravityData[] = [];
const dragData: DragDatum[] = [];

const moveData: MoveData[] = [];

const boundObjs: BoundMoveDatum[] = [];
const bottomBounds: XBoundDatum[] = [];
const leftBounds: YBoundDatum[] = [];
const rightBounds: YBoundDatum[] = [];

const rects: DrawRectData[] = [];

const createRatArg: CreateRatArg = {
  canvasHeight: height,
  canvasWidth: width,
};
const rat = createRat(createRatArg);

prevMoveData.push(rat);
ctlObjs.push(rat);
gravityObjs.push(rat);
dragData.push(rat);
velCtrlData.push(rat);
moveData.push(rat);
boundObjs.push(rat);

rects.push(rat);

const createRoomArg: CreateRoomArg = {
  canvasHeight: height,
  canvasWidth: width,
};

const room = createRoom(createRoomArg);
bottomBounds.push(room.floor);
leftBounds.push(room.leftWall);
rightBounds.push(room.rightWall);

const table1: Table = {
  name: "table1",
  width: 50,
  x: 50,
  y: 50,
};
bottomBounds.push(table1);

const drawInfo = (t: number, frameCount: number, rat: Rat) => {
  const seconds = Math.round(t / 1000);
  const fps = Math.round(frameCount / seconds);

  const offset = 2;
  ctx.font = "10px monospace";
  ctx.fillText(`FPS ${fps}`, offset, 10);
  ctx.fillText(`Acc ${rat.xAcc}`, offset, 20);
  ctx.fillText(`Vel ${rat.xVel}`, offset, 30);
};

let frameCount = 0;

let play = true;
let drawBounds = true;
const draw: FrameRequestCallback = (t) => {
  frameCount++;

  // Setup
  prevMove.set(prevMoveData);

  // Ctrl
  velCtrl.down(velCtrlData);
  velCtrl.jump(velCtrlData);
  velCtrl.left(velCtrlData);
  velCtrl.right(velCtrlData);
  velCtrl.up(velCtrlData);

  // Physics
  gravitySystem.apply(gravityObjs);
  drag.update(dragData);

  // Move
  moveSystem.update(moveData);

  // Hit
  boundSystem.bottom(boundObjs, bottomBounds);
  boundSystem.left(boundObjs, leftBounds);
  boundSystem.right(boundObjs, rightBounds);

  // Draw
  ctx.clearRect(0, 0, width, height);

  drawInfo(t, frameCount, rat);

  ctx.save();
  ctx.translate(0, height);
  ctx.scale(1, -1);

  drawRectSystem.draw(rects);

  if (drawBounds) {
    drawBoundSystem.bottom(bottomBounds);
    drawBoundSystem.left(leftBounds);
    drawBoundSystem.right(rightBounds);
  }

  ctx.restore();

  if (play) {
    requestAnimationFrame(draw);
  }
};

requestAnimationFrame(draw);

const controlCodes = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "KeyB",
  "KeyP",
  "Space",
] as const;

type ControlCode = (typeof controlCodes)[number];

const isControlCode = (code: string): code is ControlCode =>
  controlCodes.includes(code as ControlCode);

const keyPressFactory = (pressed: boolean) => (event: KeyboardEvent) => {
  const code = event.code;

  if (!isControlCode(code)) return;

  if (code === "KeyP") {
    if (!pressed) return;
    play = play ? false : true;
    return;
  }

  if (code === "KeyB") {
    if (!pressed) return;
    drawBounds = drawBounds ? false : true;
    return;
  }

  if (code === "ArrowDown") {
    ctlSystem.down(ctlObjs, pressed);
    return;
  }

  if (code === "ArrowLeft") {
    ctlSystem.left(ctlObjs, pressed);
    return;
  }

  if (code === "ArrowRight") {
    ctlSystem.right(ctlObjs, pressed);
    return;
  }

  if (code === "ArrowUp") {
    ctlSystem.up(ctlObjs, pressed);
    return;
  }

  if (code === "Space") {
    ctlSystem.jump(ctlObjs, pressed);
    return;
  }

  throw new Error(`unknown control code ${code}`);
};

const keyDown = keyPressFactory(true);
document.onkeydown = (event) => keyDown(event);

const keyUp = keyPressFactory(false);
document.onkeyup = (event) => keyUp(event);
