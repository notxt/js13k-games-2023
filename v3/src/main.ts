import { createFloor } from "./floor";
import { createLeftWall } from "./leftWall";
import { createRat } from "./rat";
import { createRightWall } from "./rightWall";
import { createControlSystem } from "./system/control";
import {
  CreateDrawSystemArgs,
  DrawData,
  createDrawSystem,
} from "./system/draw";
import { createHitSystem } from "./system/hit";
import { createMoveSystem } from "./system/move";
import { createTable } from "./table";
import { createTable2 } from "./table2";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const ctx = canvas.getContext("2d");
if (ctx === null) throw new Error("ctx is null");

const width = canvas.width;
const height = canvas.height;

const rat = createRat(width, height);
const floor = createFloor(width);
const leftWall = createLeftWall(width);
const rightWall = createRightWall(width, height);
const table = createTable();
const table2 = createTable2();
const table3: DrawData = {
  name: "table3",
  p: {
    type: "point",
    x: 200,
    y: 50,
  },
  b: {
    width: 50,
    height: 1,
  },
  color: "black",
};

const controlSystem = createControlSystem();

const moveSystem = createMoveSystem();

const hitSystem = createHitSystem(rat);
hitSystem.add(floor);
hitSystem.add(leftWall);
hitSystem.add(rightWall);
hitSystem.add(table);
hitSystem.add(table2);
hitSystem.add(table3);

const createDrawSystemArgs: CreateDrawSystemArgs = {
  ctx,
  canvasWidth: width,
  canvasHeight: height,
};
const drawSystem = createDrawSystem(createDrawSystemArgs);

controlSystem.add(rat);
moveSystem.add(rat);
drawSystem.add(rat);

drawSystem.add(floor);
drawSystem.add(leftWall);
drawSystem.add(rightWall);
drawSystem.add(table);
drawSystem.add(table2);
drawSystem.add(table3);

let frameCount = 0;

let play = true;
const draw = () => {
  frameCount++;
  const t = performance.now();

  moveSystem.move();
  hitSystem.test();
  drawSystem.draw(t, frameCount);

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
