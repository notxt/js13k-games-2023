"use strict";
(() => {
  // src/entity/rat.ts
  var { round } = Math;
  var createRat = ({ canvasHeight, canvasWidth }) => {
    const x = round(canvasWidth / 2);
    const y = round(canvasHeight / 2);
    const data = {
      boundBottom: false,
      boundLeft: false,
      boundRight: false,
      color: "white",
      ctlDown: false,
      ctlJump: false,
      ctlLeft: false,
      ctlRight: false,
      ctlUp: false,
      height: 10,
      name: "rat",
      width: 10,
      x,
      xAcc: 0,
      xAccMax: 5,
      xAccRate: 1,
      xPrev: x,
      xVel: 0,
      xVelMax: 15,
      y,
      yPrev: y,
      yVel: 0
    };
    return data;
  };

  // src/system/ctl.ts
  var createCtlSystem = () => {
    const down = (data, pressed) => {
      for (const d of data) {
        d.ctlDown = pressed;
      }
    };
    const jump = (data, pressed) => {
      for (const d of data) {
        d.ctlJump = pressed;
      }
    };
    const left = (data, pressed) => {
      for (const d of data) {
        d.ctlLeft = pressed;
      }
    };
    const right = (data, pressed) => {
      for (const d of data) {
        d.ctlRight = pressed;
      }
    };
    const up = (data, pressed) => {
      for (const d of data) {
        d.ctlUp = pressed;
      }
    };
    const system = {
      down,
      jump,
      left,
      right,
      up
    };
    return system;
  };

  // src/system/draw/rect.ts
  var createDrawRectSystem = (ctx2) => {
    const draw2 = (rects2) => {
      for (const r of rects2) {
        ctx2.fillStyle = r.color;
        ctx2.fillRect(r.x, r.y, r.width, r.height);
      }
    };
    const system = {
      draw: draw2
    };
    return system;
  };

  // src/system/prevMove.ts
  var prevMoveFactory = () => {
    const set = (data) => {
      for (const d of data) {
        d.xPrev = d.x;
        d.yPrev = d.y;
      }
    };
    const system = {
      set
    };
    return system;
  };

  // src/system/move.ts
  var createMoveSystem = () => {
    const update = (items) => {
      for (const i of items) {
        i.x += i.xVel;
        i.y += i.yVel;
      }
    };
    const system = {
      update
    };
    return system;
  };

  // src/system/gravity.ts
  var GRAVITY = 1;
  var createGravitySystem = () => {
    const apply = (objs) => {
      for (const o of objs) {
        if (o.boundBottom || o.boundLeft || o.boundRight)
          continue;
        o.yVel -= GRAVITY;
      }
    };
    const system = {
      apply
    };
    return system;
  };

  // src/system/draw/bound.ts
  var createDrawBoundSystem = (ctx2) => {
    const bottom = (bounds) => {
      for (const { x, y, width: width2 } of bounds) {
        ctx2.beginPath();
        ctx2.moveTo(x, y);
        ctx2.lineTo(x + width2, y);
        ctx2.stroke();
      }
    };
    const left = (bounds) => {
      for (const { x, y, height: height2 } of bounds) {
        ctx2.beginPath();
        ctx2.moveTo(x, y);
        ctx2.lineTo(x, y + height2);
        ctx2.stroke();
      }
    };
    const right = (bounds) => {
      for (const { x, y, height: height2 } of bounds) {
        ctx2.beginPath();
        ctx2.moveTo(x, y);
        ctx2.lineTo(x, y + height2);
        ctx2.stroke();
      }
    };
    const system = {
      bottom,
      left,
      right
    };
    return system;
  };

  // src/system/bound.ts
  var createBoundSystem = () => {
    const bottom = (moveData2, boundData) => {
      for (const m of moveData2) {
        m.boundBottom = false;
        for (const b of boundData) {
          if (m.yPrev >= b.y && m.y < b.y && m.xPrev >= b.x && m.xPrev <= b.x + b.width) {
            m.boundBottom = true;
            m.yVel = 0;
            m.y = b.y;
          }
        }
      }
    };
    const left = (objs, bounds) => {
      for (const o of objs) {
        o.boundLeft = false;
        for (const b of bounds) {
          if (o.xPrev >= b.x && o.x < b.x && o.yPrev >= b.y && o.yPrev <= b.y + b.height) {
            o.xAcc = 0;
            o.xVel = 0;
            o.x = b.x;
          }
          if (o.x === b.x)
            o.boundLeft = true;
        }
      }
    };
    const right = (objs, bounds) => {
      for (const o of objs) {
        o.boundRight = false;
        for (const b of bounds) {
          if (o.xPrev + o.width <= b.x && o.x + o.width > b.x && o.yPrev >= b.y && o.yPrev <= b.y + b.height) {
            console.log("hit");
            o.xAcc = 0;
            o.xVel = 0;
            o.x = b.x - o.width;
          }
          if (o.x + o.width === b.x)
            o.boundRight = true;
        }
      }
    };
    return {
      bottom,
      left,
      right
    };
  };

  // src/system/moveCtl.ts
  var moveCtlFactory = () => {
    const down = (data) => {
      for (const d of data) {
        if (!d.ctlUp)
          continue;
        if (d.boundLeft || d.boundRight)
          d.yVel = -2;
      }
    };
    const left = (data) => {
      for (const d of data) {
        if (!d.ctlLeft && !d.ctlRight)
          d.xAcc = 0;
        if (!d.ctlLeft)
          continue;
        if (!d.boundBottom)
          continue;
        d.xAcc += d.xAccRate;
        if (d.xAcc > d.xAccMax)
          d.xAcc = d.xAccMax;
        d.xVel -= d.xAcc;
        if (d.xVel < -d.xVelMax)
          d.xVel = -d.xVelMax;
      }
    };
    const jump = (data) => {
      for (const d of data) {
        if (!d.ctlJump)
          continue;
        if (d.boundBottom)
          d.yVel = 6;
        if (d.boundLeft)
          d.xVel = 6;
        if (d.boundRight)
          d.xVel = -6;
      }
    };
    const right = (data) => {
      for (const d of data) {
        if (!d.ctlRight && !d.ctlLeft)
          d.xAcc = 0;
        if (!d.ctlRight)
          continue;
        if (!d.boundBottom)
          continue;
        d.xAcc += d.xAccRate;
        if (d.xAcc > d.xAccMax)
          d.xAcc = d.xAccMax;
        d.xVel += d.xAcc;
        if (d.xVel > d.xVelMax)
          d.xVel = d.xVelMax;
      }
    };
    const up = (data) => {
      for (const d of data) {
        if (d.boundLeft || d.boundRight) {
          d.yVel = 0;
          if (d.ctlUp)
            d.yVel = 2;
        }
      }
    };
    const system = {
      down,
      jump,
      left,
      right,
      up
    };
    return system;
  };

  // src/entity/room.ts
  var createRoom = ({ canvasHeight, canvasWidth }) => {
    const floor2 = {
      name: "floor",
      x: 0,
      width: canvasWidth,
      y: 0
    };
    const leftWall = {
      name: "leftWall",
      x: 0,
      y: 0,
      height: canvasHeight
    };
    const rightWall = {
      name: "rightWall",
      x: canvasWidth,
      y: 0,
      height: canvasHeight
    };
    return {
      floor: floor2,
      leftWall,
      rightWall
    };
  };

  // src/system/drag.ts
  var { floor, ceil } = Math;
  var DRAG = 1;
  var dragFactory = () => {
    const update = (data) => {
      for (const d of data) {
        if (!d.boundBottom)
          continue;
        if (d.xVel === 0)
          continue;
        if (d.xVel > 0)
          d.xVel = floor(d.xVel - DRAG);
        if (d.xVel < 0)
          d.xVel = ceil(d.xVel + DRAG);
      }
    };
    const system = {
      update
    };
    return system;
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
  var prevMove = prevMoveFactory();
  var ctlSystem = createCtlSystem();
  var velCtrl = moveCtlFactory();
  var gravitySystem = createGravitySystem();
  var drag = dragFactory();
  var moveSystem = createMoveSystem();
  var boundSystem = createBoundSystem();
  var drawBoundSystem = createDrawBoundSystem(ctx);
  var drawRectSystem = createDrawRectSystem(ctx);
  var prevMoveData = [];
  var ctlObjs = [];
  var velCtrlData = [];
  var gravityObjs = [];
  var dragData = [];
  var moveData = [];
  var boundObjs = [];
  var bottomBounds = [];
  var leftBounds = [];
  var rightBounds = [];
  var rects = [];
  var createRatArg = {
    canvasHeight: height,
    canvasWidth: width
  };
  var rat = createRat(createRatArg);
  prevMoveData.push(rat);
  ctlObjs.push(rat);
  gravityObjs.push(rat);
  dragData.push(rat);
  velCtrlData.push(rat);
  moveData.push(rat);
  boundObjs.push(rat);
  rects.push(rat);
  var createRoomArg = {
    canvasHeight: height,
    canvasWidth: width
  };
  var room = createRoom(createRoomArg);
  bottomBounds.push(room.floor);
  leftBounds.push(room.leftWall);
  rightBounds.push(room.rightWall);
  var table1 = {
    name: "table1",
    width: 50,
    x: 50,
    y: 50
  };
  bottomBounds.push(table1);
  var drawInfo = (t, frameCount2, rat2) => {
    const seconds = Math.round(t / 1e3);
    const fps = Math.round(frameCount2 / seconds);
    const offset = 2;
    ctx.font = "10px monospace";
    ctx.fillText(`FPS ${fps}`, offset, 10);
    ctx.fillText(`Acc ${rat2.xAcc}`, offset, 20);
    ctx.fillText(`Vel ${rat2.xVel}`, offset, 30);
  };
  var frameCount = 0;
  var play = true;
  var drawBounds = true;
  var draw = (t) => {
    frameCount++;
    prevMove.set(prevMoveData);
    velCtrl.down(velCtrlData);
    velCtrl.jump(velCtrlData);
    velCtrl.left(velCtrlData);
    velCtrl.right(velCtrlData);
    velCtrl.up(velCtrlData);
    gravitySystem.apply(gravityObjs);
    drag.update(dragData);
    moveSystem.update(moveData);
    boundSystem.bottom(boundObjs, bottomBounds);
    boundSystem.left(boundObjs, leftBounds);
    boundSystem.right(boundObjs, rightBounds);
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
  var controlCodes = [
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "KeyB",
    "KeyP",
    "Space"
  ];
  var isControlCode = (code) => controlCodes.includes(code);
  var keyPressFactory = (pressed) => (event) => {
    const code = event.code;
    if (!isControlCode(code))
      return;
    if (code === "KeyP") {
      if (!pressed)
        return;
      play = play ? false : true;
      return;
    }
    if (code === "KeyB") {
      if (!pressed)
        return;
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
  var keyDown = keyPressFactory(true);
  document.onkeydown = (event) => keyDown(event);
  var keyUp = keyPressFactory(false);
  document.onkeyup = (event) => keyUp(event);
})();
//# sourceMappingURL=main.js.map
