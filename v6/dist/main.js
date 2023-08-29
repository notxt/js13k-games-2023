"use strict";
(() => {
  // src/draw.ts
  var { sin, PI } = Math;
  var black = "Black";
  var brown = "Brown";
  var forestGreen = "ForestGreen";
  var green = "Green";
  var pink = "Pink";
  var white = "White";
  var drawFactory = (ctx2, width2, height2) => {
    const fillStyle = (color) => ctx2.fillStyle = color;
    const lineCap = (type) => ctx2.lineCap = type;
    const lineWidth = (width3) => ctx2.lineWidth = width3;
    const strokeStyle = (color) => ctx2.strokeStyle = color;
    const save = () => ctx2.save();
    const translate = (x, y) => ctx2.translate(x, y);
    const beginPath = () => ctx2.beginPath();
    const arc = (x, y, radius, startAngle, endAngle) => {
      ctx2.arc(x, y, radius, startAngle, endAngle, true);
    };
    const fill = () => ctx2.fill();
    const restore = () => ctx2.restore();
    const ctxRotate = (angle) => ctx2.rotate(angle);
    const ctxMoveTo = (x, y) => ctx2.moveTo(x, y);
    const lineTo = (x, y) => ctx2.lineTo(x, y);
    const stroke = () => ctx2.stroke();
    const arcTo = (x1, y1, x2, y2, radius) => {
      ctx2.arcTo(x1, y1, x2, y2, radius);
    };
    const clearRect = (x, y, w, h) => {
      ctx2.clearRect(x, y, w, h);
    };
    const bodyWidth = 20;
    const bodyHeight = 20;
    const headWidth = 20;
    const circle = (x, y, radius) => arc(x, y, radius, 0, PI * 2);
    const ear = () => {
      const radius = 10;
      beginPath();
      fillStyle(white);
      circle(0, 0, radius);
      fill();
      beginPath();
      fillStyle(pink);
      circle(0, 0, radius - 2);
      fill();
    };
    const whisker = () => {
      const whiskerLength = 10;
      beginPath();
      fillStyle(black);
      ctxMoveTo(0, 0);
      lineTo(0, whiskerLength);
      ctxRotate(PI / 12);
      ctxMoveTo(0, 0);
      lineTo(0, whiskerLength);
      stroke();
    };
    const body = () => {
      beginPath();
      fillStyle(white);
      lineTo(0, 0);
      lineTo(bodyWidth, 0);
      lineTo(bodyWidth + headWidth, bodyHeight);
      lineTo(0, bodyHeight);
      arc(0, bodyHeight / 2, bodyHeight / 2, 3 * PI / 2, PI / 2);
      fill();
    };
    const eye = () => {
      const radius = 3;
      const highlightRadius = 1.7;
      beginPath();
      fillStyle(black);
      circle(0, 0, radius);
      fill();
      beginPath();
      fillStyle(white);
      circle(-1, -1, highlightRadius);
      fill();
    };
    const tail = () => {
      const x1 = -20;
      const y1 = 0;
      const x2 = -20;
      const y2 = -20;
      const radius = 20;
      strokeStyle(pink);
      lineCap("round");
      lineWidth(3);
      beginPath();
      ctxMoveTo(0, 0);
      arcTo(x1, y1, x2, y2, radius);
      stroke();
    };
    const leg = (angle) => {
      ctxRotate(angle);
      beginPath();
      ctxMoveTo(0, 0);
      lineTo(0, 7);
      stroke();
    };
    const rat2 = (d, legAngle) => {
      save();
      const earX = d.x + 20;
      const earY = d.y;
      const earXOffset = 6;
      const earYOffset = 1;
      translate(earX + earXOffset, earY - earYOffset);
      ear();
      restore();
      const whiskerX = d.x + 35;
      const whiskerY = d.y + 18;
      save();
      translate(whiskerX, whiskerY);
      ctxRotate(4 * PI / 3);
      whisker();
      restore();
      save();
      translate(d.x, d.y);
      body();
      restore();
      save();
      translate(whiskerX, whiskerY);
      ctxRotate(PI / 2);
      whisker();
      restore();
      save();
      translate(earX - earXOffset, earY + earYOffset);
      ear();
      restore();
      const eyeX = d.x + 24;
      const eyeY = d.y + 11;
      const eyeOffset = 6;
      save();
      translate(eyeX, eyeY);
      ctxRotate(-PI / 10);
      eye();
      translate(eyeOffset, 0);
      eye();
      restore();
      const tailX = d.x - 10;
      const tailY = d.y + 10;
      save();
      translate(tailX, tailY);
      tail();
      restore();
      const legX = d.x;
      const legY = d.y + 20;
      const leftRightOffset = 3;
      const frontBackOffset = 20;
      save();
      translate(legX, legY);
      leg(legAngle);
      restore();
      save();
      translate(legX + leftRightOffset, legY);
      leg(-legAngle);
      restore();
      save();
      translate(legX + leftRightOffset + frontBackOffset, legY);
      leg(legAngle);
      restore();
      save();
      translate(legX + leftRightOffset + frontBackOffset + leftRightOffset, legY);
      leg(-legAngle);
      restore();
    };
    const ratStand = (d) => {
      rat2(d, 0);
    };
    const ratRun = (d, t) => {
      rat2(d, sin(t / 60));
    };
    const leafyTree = (d) => {
      const trunkHeight = 150 * d.scale;
      const trunkWidth = 20 * d.scale;
      const branchRadius = 150 * d.scale;
      save();
      translate(d.x, d.y);
      beginPath();
      strokeStyle(brown);
      lineWidth(trunkWidth);
      ctxMoveTo(0, 0);
      lineTo(0, -trunkHeight);
      stroke();
      beginPath();
      fillStyle(forestGreen);
      circle(0, -trunkHeight - branchRadius, branchRadius);
      fill();
      restore();
    };
    const pineTree = (d) => {
      const trunkHeight = 150 * d.scale;
      const trunkWidth = 20 * d.scale;
      const branchWidth = 80 * d.scale;
      const branchHeight = 150 * d.scale;
      const branchCount = 5;
      save();
      translate(d.x, d.y);
      beginPath();
      strokeStyle(brown);
      lineWidth(trunkWidth);
      ctxMoveTo(0, 0);
      lineTo(0, -trunkHeight);
      stroke();
      translate(0, -trunkHeight);
      for (let i = 1; i <= branchCount; i++) {
        beginPath();
        fillStyle(green);
        const height3 = branchWidth / i;
        const width3 = branchHeight / i;
        ctxMoveTo(-width3 / 2, 0);
        lineTo(0, -height3);
        lineTo(width3 / 2, 0);
        translate(0, -(5 * height3 / 6));
        fill();
      }
      restore();
    };
    const drawFn = {
      ratStand,
      ratRun,
      leafyTree,
      pineTree
    };
    const draw2 = (data, t) => {
      clearRect(0, 0, width2, height2);
      for (const d of data) {
        drawFn[d.type](d, t);
      }
    };
    return draw2;
  };

  // src/main.ts
  var { requestAnimationFrame } = window;
  var { round, random, floor } = Math;
  var canvas = document.querySelector("canvas");
  if (canvas === null)
    throw new Error("canvas is null");
  var { height, width } = canvas;
  var ctx = canvas.getContext("2d");
  if (ctx === null)
    throw new Error("ctx is null");
  var draw = drawFactory(ctx, width, height);
  var drawData = [];
  var rat = {
    type: "ratStand",
    scale: 1,
    x: round(width / 2),
    y: round(2 * height / 3)
  };
  drawData.push(rat);
  for (let i = 0; i < 10; i++) {
    const layers = 5;
    const multiplier = floor(height / layers);
    const y = round(random() * layers) * multiplier;
    const scale = y / height;
    console.log(height, y, scale);
    const tree = {
      type: "leafyTree",
      scale,
      x: floor(random() * width),
      y
    };
    drawData.push(tree);
  }
  for (let i = 0; i < 10; i++) {
    const layers = 5;
    const multiplier = floor(height / layers);
    const y = round(random() * layers) * multiplier;
    const scale = y / height;
    console.log(height, y, scale);
    const tree = {
      type: "pineTree",
      scale,
      x: floor(random() * width),
      y
    };
    drawData.push(tree);
  }
  drawData.sort((d1, d2) => d1.y - d2.y);
  var pause = false;
  var loop = (t) => {
    draw(drawData, t);
    if (!pause)
      requestAnimationFrame(loop);
  };
  document.onkeydown = (event) => {
    const { key } = event;
    console.log(key);
    if (key === "p")
      pause = pause ? false : true;
    if (key === "ArrowRight")
      rat.type = "ratRun";
  };
  document.onkeyup = (event) => {
    const { key } = event;
    console.log(key);
    if (key === "ArrowRight")
      rat.type = "ratStand";
  };
  requestAnimationFrame(loop);
})();
//# sourceMappingURL=main.js.map
