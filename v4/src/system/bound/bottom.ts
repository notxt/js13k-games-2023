import { BoundObjectData } from "../../type";

export type XBound = {
  width: number;
  x: number;
  y: number;
};

type AddObj = (obj: BoundObjectData) => void;
type AddBound = (bound: XBound) => void;
type Test = () => void;

export type BottomBoundSystem = {
  addObj: AddObj;
  addBound: AddBound;
  test: Test;
};

type CreateBottomBoundSystem = () => BottomBoundSystem;

export const createBottomBoundSystem: CreateBottomBoundSystem = () => {
  const objs: BoundObjectData[] = [];
  const bounds: XBound[] = [];

  const addObj: AddObj = (obj: BoundObjectData) => {
    objs.push(obj);
  };

  const addBound: AddBound = (bound: XBound) => {
    bounds.push(bound);
  };

  const test = () => {
    for (const o of objs) {
      for (const b of bounds) {
        if (
          o.yPrev > b.y &&
          o.y <= b.y &&
          o.xPrev >= b.x &&
          o.xPrev <= b.x + b.width
        ) {
          o.yVel = 0;
          o.y = b.y + 1;
        }
      }
    }
  };

  return {
    addObj,
    addBound,
    test,
  };
};
