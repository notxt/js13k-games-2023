"use strict";
(() => {
  // src/rat.ts
  var { round } = Math;
  var createRat = ({
    bottomBound,
    canvasHeight,
    canvasWidth,
    control,
    drawRect,
    gravity,
    leftBound,
    move,
    prevMove,
    runLeft,
    runRight
  }) => {
    const x = round(canvasWidth / 2);
    const y = round(canvasHeight / 2);
    const rat = {
      color: "white",
      ctlLeft: false,
      ctlRight: false,
      ctlSpace: false,
      height: 10,
      name: "rat",
      width: 10,
      x,
      xAcc: 1,
      xAccRate: 0.1,
      xPrev: x,
      xVel: 0,
      xVelMax: 5,
      y,
      yPrev: y,
      yVel: 0
    };
    prevMove.add(rat);
    control.add(rat);
    runLeft.add(rat);
    runRight.add(rat);
    gravity.add(rat);
    move.add(rat);
    bottomBound.addObj(rat);
    leftBound.addObj(rat);
    drawRect.add(rat);
  };

  // src/room.ts
  var createRoom = ({
    bottomBound,
    canvasHeight,
    leftBound,
    canvasWidth,
    rightBound
  }) => {
    const floor = {
      name: "floor",
      x: 0,
      width: canvasWidth,
      y: 0
    };
    bottomBound.addBound(floor);
    const leftWall = {
      name: "leftWall",
      x: 0,
      y: 0,
      height: canvasHeight
    };
    leftBound.addBound(leftWall);
    const rightWall = {
      name: "rightWall",
      x: canvasWidth,
      y: 0,
      height: canvasHeight
    };
    rightBound.addBound(rightWall);
    return;
  };

  // src/system/bound/bottom.ts
  var createBottomBoundSystem = () => {
    const objs = [];
    const bounds = [];
    const addObj = (obj) => {
      objs.push(obj);
    };
    const addBound = (bound) => {
      bounds.push(bound);
    };
    const test = () => {
      for (const o of objs) {
        for (const b of bounds) {
          if (o.yPrev > b.y && o.y <= b.y && o.xPrev >= b.x && o.xPrev <= b.x + b.width) {
            o.yVel = 0;
            o.y = b.y + 1;
          }
        }
      }
    };
    return {
      addObj,
      addBound,
      test
    };
  };

  // src/system/bound/left.ts
  var createLeftBoundSystem = () => {
    const objs = [];
    const bounds = [];
    const addObj = (obj) => {
      objs.push(obj);
    };
    const addBound = (bound) => {
      bounds.push(bound);
    };
    const test = () => {
      for (const o of objs) {
        for (const b of bounds) {
          if (o.xPrev > b.x && o.x <= b.x && o.yPrev >= b.y && o.yPrev <= b.y + b.height) {
            o.xVel = 0;
            o.x = b.x + 1;
          }
        }
      }
    };
    return {
      addObj,
      addBound,
      test
    };
  };

  // src/system/bound/right.ts
  var createRightBoundSystem = () => {
    const objs = [];
    const bounds = [];
    const addObj = (obj) => {
      objs.push(obj);
    };
    const addBound = (bound) => {
      bounds.push(bound);
    };
    const test = () => {
      for (const o of objs) {
        for (const b of bounds) {
          if (o.p0.x < b.x && o.p.x >= b.x && o.p0.y >= b.y0 && o.p0.y <= b.y1) {
            o.vel.x = 0;
            o.p.x = b.x - 1;
          }
        }
      }
    };
    return {
      addObj,
      addBound,
      test
    };
  };

  // src/system/control.ts
  var createControlSystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const left = (pressed) => {
      for (const i of items) {
        i.ctlLeft = pressed;
      }
    };
    const right = (pressed) => {
      for (const i of items) {
        i.ctlRight = pressed;
      }
    };
    const space = (pressed) => {
      for (const i of items) {
        i.ctlSpace = pressed;
      }
    };
    return {
      add,
      left,
      right,
      space
    };
  };

  // src/system/draw/rect.ts
  var createDrawRectSystem = (ctx2) => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const draw2 = () => {
      for (const i of items) {
        ctx2.fillStyle = i.color;
        ctx2.fillRect(i.x, i.y, i.width, i.height);
      }
    };
    const system = {
      add,
      draw: draw2
    };
    return system;
  };

  // src/system/control/runLeft.ts
  var createRunLeftSystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const update = () => {
      for (const i of items) {
        if (i.yVel !== 0)
          continue;
        if (!i.ctlLeft)
          continue;
        i.xVel -= i.xAcc;
      }
    };
    const runSystem = {
      add,
      update
    };
    return runSystem;
  };

  // src/system/control/runRight.ts
  var createRunRightSystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const update = () => {
      for (const i of items) {
        if (i.yVel !== 0)
          continue;
        if (!i.ctlRight)
          continue;
        i.xVel += i.xAcc;
      }
    };
    const runSystem = {
      add,
      update
    };
    return runSystem;
  };

  // src/system/move/setPrev.ts
  var createPrevMoveSystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const set = () => {
      for (const i of items) {
        i.xPrev = i.x;
        i.yPrev = i.y;
      }
    };
    const system = {
      add,
      set
    };
    return system;
  };

  // src/system/move/move.ts
  var createMoveSystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const update = () => {
      for (const i of items) {
        console.log(i.xVel);
        i.x += i.xVel;
        i.y += i.yVel;
      }
    };
    const system = {
      add,
      update
    };
    return system;
  };

  // src/system/physics/gravity.ts
  var GRAVITY = 1;
  var createGravitySystem = () => {
    const items = [];
    const add = (item) => {
      items.push(item);
    };
    const apply = () => {
      for (const i of items) {
        i.yVel -= GRAVITY;
      }
    };
    const system = {
      add,
      apply
    };
    return system;
  };

  // src/table.ts
  var createTableFactory = ({ bottomBound, drawRect }) => ({ name, x, y, width: width2, height: height2 }) => {
    const table = {
      color: "black",
      height: height2,
      name,
      width: width2,
      x,
      y
    };
    bottomBound.addBound(table);
    drawRect.add(table);
  };

  // src/main.ts
  var canvas = document.querySelector("canvas");
  if (canvas === null)
    throw new Error("canvas is null");
  var ctx = canvas.getContext("2d");
  if (ctx === null)
    throw new Error("ctx is null");
  var width = canvas.width;
  var height = canvas.height;
  var prevMoveSystem = createPrevMoveSystem();
  var controlSystem = createControlSystem();
  var runLeftSystem = createRunLeftSystem();
  var runRightSystem = createRunRightSystem();
  var gravitySystem = createGravitySystem();
  var moveSystem = createMoveSystem();
  var bottomBoundSystem = createBottomBoundSystem();
  var leftBoundSystem = createLeftBoundSystem();
  var rightBoundSystem = createRightBoundSystem();
  var drawRectSystem = createDrawRectSystem(ctx);
  var createRatArg = {
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
    runRight: runRightSystem
  };
  createRat(createRatArg);
  var createRoomArg = {
    bottomBound: bottomBoundSystem,
    canvasHeight: height,
    canvasWidth: width,
    leftBound: leftBoundSystem,
    rightBound: rightBoundSystem
  };
  createRoom(createRoomArg);
  var createTableFactoryArg = {
    bottomBound: bottomBoundSystem,
    drawRect: drawRectSystem
  };
  var createTable = createTableFactory(createTableFactoryArg);
  var table1 = {
    height: 1,
    name: "table1",
    width: 50,
    x: 50,
    y: 50
  };
  createTable(table1);
  var drawInfo = (t, frameCount2) => {
    const seconds = Math.round(t / 1e3);
    const fps = Math.round(frameCount2 / seconds);
    const offset = 2;
    ctx.font = "10px monospace";
    ctx.fillText(`FPS     ${fps}`, offset, 10);
  };
  var frameCount = 0;
  var play = true;
  var draw = () => {
    frameCount++;
    const t = performance.now();
    prevMoveSystem.set();
    runLeftSystem.update();
    runRightSystem.update();
    gravitySystem.apply();
    moveSystem.update();
    bottomBoundSystem.test();
    leftBoundSystem.test();
    rightBoundSystem.test();
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
  var controlCodes = ["ArrowLeft", "ArrowRight", "Space", "KeyP"];
  var isControlCode = (code) => controlCodes.includes(code);
  var keyPressFactory = (pressed) => (event) => {
    const code = event.code;
    if (!isControlCode(code))
      return;
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
  var keyDown = keyPressFactory(true);
  document.onkeydown = (event) => keyDown(event);
  var keyUp = keyPressFactory(false);
  document.onkeyup = (event) => keyUp(event);
})();
//# sourceMappingURL=main.js.map
