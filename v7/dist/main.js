"use strict";
(() => {
  // src/draw.ts
  var { PI, round } = Math;
  var white = "white";
  var black = "black";
  var drawRectFactory = (ctx2) => {
    const draw = (data) => {
      for (const d of data) {
        ctx2.beginPath();
        ctx2.fillStyle = white;
        ctx2.fillRect(d.x, d.y, d.w, d.h);
      }
    };
    return draw;
  };
  var drawActiveFactory = (ctx2) => (r) => {
    ctx2.save();
    const x = r.x + round(r.w / 2);
    const y = r.y - 5;
    const length = 10;
    const angle = PI / 4;
    ctx2.translate(x, y);
    ctx2.beginPath();
    ctx2.strokeStyle = black;
    ctx2.moveTo(0, 0);
    ctx2.lineTo(0, -length);
    ctx2.stroke();
    ctx2.save();
    ctx2.rotate(angle);
    ctx2.moveTo(0, 0);
    ctx2.lineTo(0, -length / 2);
    ctx2.stroke();
    ctx2.restore();
    ctx2.save();
    ctx2.rotate(-angle);
    ctx2.moveTo(0, 0);
    ctx2.lineTo(0, -length / 2);
    ctx2.stroke();
    ctx2.restore();
    ctx2.restore();
  };

  // src/move.ts
  var { min, max } = Math;
  var ctrlMove = (m) => {
    if (!(m.cl || m.cr)) {
      m.mv = 0;
      return;
    }
    if (m.cl) {
      m.xv -= m.ma;
    }
    if (m.cr) {
      m.xv += m.ma;
    }
  };
  var ctrlJump = (m) => {
    if (!m.cj)
      return;
    if (m.yv !== 0)
      return;
    m.yv = -m.jv;
    m.cj = false;
  };
  var fall = (data) => {
    for (const d of data) {
      let v = d.fv + d.fa;
      if (v > d.fvm)
        v = d.fvm;
      d.fv = v;
      d.yv += d.fv;
    }
  };
  var initMove = (data) => {
    for (const d of data) {
      d.x0 = d.x;
      d.x1 = d.x;
      d.y0 = d.y;
      d.y1 = d.y;
    }
  };
  var updateMove = (movables) => {
    for (const m of movables) {
      m.x1 += m.xv;
      m.y1 += m.yv;
    }
  };
  var movingLeft = (v) => v.x0 > v.x1;
  var movingRight = (v) => v.x0 < v.x1;
  var leftHit = (v, b) => v.x0 > b.x && b.x >= v.x1;
  var rightHit = (v, b) => v.x0 < b.x && b.x <= v.x1;
  var checkLeftBound = (b, movables) => {
    for (const m of movables) {
      if (!movingLeft(m))
        continue;
      if (!leftHit(m, b))
        continue;
      m.xv = 0;
      m.x1 = b.x + 1;
    }
  };
  var checkRightBound = (b, movables) => {
    for (const m of movables) {
      if (!movingRight(m))
        continue;
      const xVec = {
        x0: m.x0 + m.w,
        x1: m.x1 + m.w
      };
      if (!rightHit(xVec, b))
        continue;
      m.xv = 0;
      m.x1 = b.x - m.w - 1;
    }
  };
  var falling = (v) => v.y0 < v.y1;
  var topHit = (v, b) => v.y0 < b.y && b.y <= v.y1;
  var checkBottomBound = (b, movables) => {
    for (const m of movables) {
      if (!falling(m))
        continue;
      const yVec = {
        y0: m.y0 + m.h,
        y1: m.y1 + m.h
      };
      if (!topHit(yVec, b))
        continue;
      m.yv = 0;
      m.y1 = b.y - 1 - m.h;
    }
  };
  var moving = (v) => v.x0 !== v.x1 || v.y0 !== v.y1;
  var yBetween = (m, w) => m.y0 >= min(w.y, w.y + w.h) && m.y0 <= max(w.y, w.y + w.h);
  var xBetween = (m, p) => m.x0 >= min(p.x, p.x + p.w) && m.x0 <= max(p.x, p.x + p.w);
  var checkRectHit = (active2, rects2) => {
    if (!moving(active2))
      return;
    for (const r of rects2) {
      if (r === active2)
        continue;
      const br = {
        x: r.x + r.w,
        y: r.y,
        h: r.h
      };
      if (movingLeft(active2) && yBetween(active2, br) && leftHit(active2, br)) {
        active2.xv = 0;
        active2.x1 = br.x + 1;
      }
      const ar = {
        x0: active2.x0 + active2.w,
        x1: active2.x1 + active2.w
      };
      if (movingRight(active2) && yBetween(active2, r) && rightHit(ar, r)) {
        active2.xv = 0;
        active2.x1 = r.x - active2.w - 1;
      }
      const ab = {
        y0: active2.y0 + active2.h,
        y1: active2.y1 + active2.h
      };
      if (falling(active2) && xBetween(active2, r) && topHit(ab, r)) {
        active2.yv = 0;
        active2.y1 = r.y - active2.h - 1;
      }
    }
  };
  var applyMove = (data) => {
    for (const d of data) {
      d.x = d.x1;
      d.y = d.y1;
    }
  };

  // src/main.ts
  var { floor, random } = Math;
  var canvas = document.querySelector("canvas");
  if (canvas === null)
    throw new Error("canvas is null");
  var { width, height } = canvas;
  var ctx = canvas.getContext("2d");
  if (ctx === null)
    throw new Error("ctx is null");
  var { requestAnimationFrame: requestFrame } = window;
  var leftBound = {
    x: 0
  };
  var rightBound = {
    x: width
  };
  var bottomBound = {
    y: height
  };
  var rects = [];
  var drawActive = drawActiveFactory(ctx);
  var drawRect = drawRectFactory(ctx);
  var rectCount = 10;
  var rectSize = 10;
  for (let i = 0; i < rectCount; i++) {
    const x = floor(random() * (width - rectSize));
    const y = floor(random() * (height - rectSize));
    const box = {
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
      yv: 0
    };
    rects.push(box);
  }
  var active = rects[0];
  if (typeof active === "undefined")
    throw new Error("active is undefined");
  var pause = false;
  var loop = () => {
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
    if (!pause)
      requestFrame(loop);
  };
  requestFrame(loop);
  document.onkeydown = (event) => {
    const { code } = event;
    if (code === "KeyP")
      pause = !pause;
    if (code === "ArrowLeft")
      active.cl = true;
    if (code === "ArrowRight")
      active.cr = true;
    if (code === "Tab") {
      event.preventDefault();
      let i = rects.indexOf(active);
      if (i === -1)
        throw new Error("unable to locate active");
      i = (i + 1) % rects.length;
      active = rects[i];
    }
    if (code === "Space")
      active.cj = true;
  };
  document.onkeyup = (event) => {
    const { code } = event;
    if (code === "ArrowLeft")
      active.cl = false;
    if (code === "ArrowRight")
      active.cr = false;
  };
})();
//# sourceMappingURL=main.js.map
