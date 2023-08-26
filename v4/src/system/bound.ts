import { Entity } from "../type";

export type BoundMoveDatum = {
  boundBottom: boolean;
  boundLeft: boolean;
  boundRight: boolean;
  width: number;
  x: number;
  xAcc: number;
  xPrev: number;
  xVel: number;
  y: number;
  yPrev: number;
  yVel: number;
};

export type XBoundDatum = {
  width: number;
  x: number;
  y: number;
} & Entity;

export type YBoundDatum = {
  height: number;
  x: number;
  y: number;
} & Entity;

type Bottom = (moveData: BoundMoveDatum[], boundData: XBoundDatum[]) => void;
type Left = (moveData: BoundMoveDatum[], boundData: YBoundDatum[]) => void;
type Right = (moveData: BoundMoveDatum[], boundData: YBoundDatum[]) => void;

export type BoundSystem = {
  bottom: Bottom;
  left: Left;
  right: Right;
};

type CreateBoundSystem = () => BoundSystem;

export const createBoundSystem: CreateBoundSystem = () => {
  const bottom: Bottom = (moveData, boundData) => {
    for (const m of moveData) {
      m.boundBottom = false;
      for (const b of boundData) {
        if (
          m.yPrev >= b.y &&
          m.y < b.y &&
          m.xPrev >= b.x &&
          m.xPrev <= b.x + b.width
        ) {
          m.boundBottom = true;
          m.yVel = 0;
          m.y = b.y;
        }
      }
    }
  };

  const left: Left = (objs, bounds) => {
    for (const o of objs) {
      o.boundLeft = false;
      for (const b of bounds) {
        if (
          o.xPrev >= b.x &&
          o.x < b.x &&
          o.yPrev >= b.y &&
          o.yPrev <= b.y + b.height
        ) {
          o.xAcc = 0;
          o.xVel = 0;
          o.x = b.x;
        }
        if (o.x === b.x) o.boundLeft = true;
      }
    }
  };

  const right: Right = (objs, bounds) => {
    for (const o of objs) {
      o.boundRight = false;
      for (const b of bounds) {
        if (
          o.xPrev + o.width <= b.x &&
          o.x + o.width > b.x &&
          o.yPrev >= b.y &&
          o.yPrev <= b.y + b.height
        ) {
          console.log("hit");
          o.xAcc = 0;
          o.xVel = 0;
          o.x = b.x - o.width;
        }
        if (o.x + o.width === b.x) o.boundRight = true;
      }
    }
  };

  return {
    bottom,
    left,
    right,
  };
};
