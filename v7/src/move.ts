const { min, max } = Math;

export type XBound = {
  x: number;
};

export type Platform = XBound & {
  y: number;
  w: number;
};

type XVec = {
  x0: number;
  x1: number;
};

export type YBound = {
  y: number;
};

export type Wall = YBound & {
  x: number;
  h: number;
};

type YVec = {
  y0: number;
  y1: number;
};

export type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Vec = XVec & YVec;

export type Movable = Rect & {
  cj: boolean;
  cl: boolean;
  cr: boolean;
  fa: number;
  fv: number;
  fvm: number;
  jv: number;
  ma: number;
  mv: number;
  mvm: number;
  x0: number;
  x1: number;
  xv: number;
  y0: number;
  y1: number;
  yv: number;
};

type Ctrl = (o: Movable) => void;
export const ctrlMove: Ctrl = (m) => {
  if (!(m.cl || m.cr)) {
    m.mv = 0;
    return;
  }
  if (m.cl) {
    // let v = m.mv - m.ma;
    // if (v < -m.mvm) v = -m.mvm;
    // m.mv = v;
    // m.xv += m.mv;
    m.xv -= m.ma;
  }
  if (m.cr) {
    // let v = m.mv + m.ma;
    // if (v > m.mvm) v = m.mvm;
    // m.mv = v;
    // m.xv += m.mv;
    m.xv += m.ma;
  }
};

// type Drag = (m: Movable) => void;
// export const drag: Drag = (m) => {
//   if
// }

export const ctrlJump: Ctrl = (m) => {
  if (!m.cj) return;
  if (m.yv !== 0) return;
  m.yv = -m.jv;
  m.cj = false;
};

type Fall = (data: Movable[]) => void;
export const fall: Fall = (data) => {
  for (const d of data) {
    let v = d.fv + d.fa;
    if (v > d.fvm) v = d.fvm;
    d.fv = v;
    d.yv += d.fv;
  }
};

type InitMove = (data: Movable[]) => void;
export const initMove: InitMove = (data: Movable[]) => {
  for (const d of data) {
    d.x0 = d.x;
    d.x1 = d.x;
    d.y0 = d.y;
    d.y1 = d.y;
  }
};

type UpdateMove = (movables: Movable[]) => void;
export const updateMove: UpdateMove = (movables) => {
  for (const m of movables) {
    m.x1 += m.xv;
    m.y1 += m.yv;
  }
};

type XBoundSystem = (bound: XBound, movables: Movable[]) => void;
type YBoundSystem = (bound: YBound, movables: Movable[]) => void;

const movingLeft = (v: XVec): Boolean => v.x0 > v.x1;
const movingRight = (v: XVec): Boolean => v.x0 < v.x1;

const leftHit = (v: XVec, b: XBound): Boolean => v.x0 > b.x && b.x >= v.x1;
const rightHit = (v: XVec, b: XBound): Boolean => v.x0 < b.x && b.x <= v.x1;

export const checkLeftBound: XBoundSystem = (b, movables) => {
  for (const m of movables) {
    if (!movingLeft(m)) continue;
    if (!leftHit(m, b)) continue;
    m.xv = 0;
    m.x1 = b.x + 1;
  }
};

export const checkRightBound: XBoundSystem = (b, movables) => {
  for (const m of movables) {
    if (!movingRight(m)) continue;
    const xVec: XVec = {
      x0: m.x0 + m.w,
      x1: m.x1 + m.w,
    };
    if (!rightHit(xVec, b)) continue;
    m.xv = 0;
    m.x1 = b.x - m.w - 1;
  }
};

const falling = (v: YVec): Boolean => v.y0 < v.y1;
const topHit = (v: YVec, b: YBound) => v.y0 < b.y && b.y <= v.y1;
export const checkBottomBound: YBoundSystem = (b, movables) => {
  for (const m of movables) {
    if (!falling(m)) continue;
    const yVec: YVec = {
      y0: m.y0 + m.h,
      y1: m.y1 + m.h,
    };
    if (!topHit(yVec, b)) continue;
    m.yv = 0;
    m.y1 = b.y - 1 - m.h;
  }
};

type CheckRectHit = (active: Movable, rects: Rect[]) => void;

const moving = (v: Vec) => v.x0 !== v.x1 || v.y0 !== v.y1;

const yBetween = (m: Movable, w: Wall) =>
  m.y0 >= min(w.y, w.y + w.h) && m.y0 <= max(w.y, w.y + w.h);

const xBetween = (m: Movable, p: Platform) =>
  m.x0 >= min(p.x, p.x + p.w) && m.x0 <= max(p.x, p.x + p.w);

export const checkRectHit: CheckRectHit = (active, rects) => {
  if (!moving(active)) return;
  for (const r of rects) {
    if (r === active) continue;

    const br: Wall = {
      x: r.x + r.w,
      y: r.y,
      h: r.h,
    };

    if (movingLeft(active) && yBetween(active, br) && leftHit(active, br)) {
      active.xv = 0;
      active.x1 = br.x + 1;
    }

    const ar: XVec = {
      x0: active.x0 + active.w,
      x1: active.x1 + active.w,
    };

    if (movingRight(active) && yBetween(active, r) && rightHit(ar, r)) {
      active.xv = 0;
      active.x1 = r.x - active.w - 1;
    }

    const ab: YVec = {
      y0: active.y0 + active.h,
      y1: active.y1 + active.h,
    };
    if (falling(active) && xBetween(active, r) && topHit(ab, r)) {
      active.yv = 0;
      active.y1 = r.y - active.h - 1;
    }
  }
};

type ApplyMove = (data: Movable[]) => void;
export const applyMove: ApplyMove = (data: Movable[]) => {
  for (const d of data) {
    d.x = d.x1;
    d.y = d.y1;
  }
};
