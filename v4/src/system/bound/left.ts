import { BoundObjectData, YBound } from "../../type";

type AddObj = (obj: BoundObjectData) => void;
type AddBound = (bound: YBound) => void;
type Test = () => void;

export type LeftBoundSystem = {
  addObj: AddObj;
  addBound: AddBound;
  test: Test;
};

type CreateLeftBoundSystem = () => LeftBoundSystem;

export const createLeftBoundSystem: CreateLeftBoundSystem = () => {
  const objs: BoundObjectData[] = [];
  const bounds: YBound[] = [];

  const addObj: AddObj = (obj: BoundObjectData) => {
    objs.push(obj);
  };

  const addBound: AddBound = (bound: YBound) => {
    bounds.push(bound);
  };

  const test = () => {
    for (const o of objs) {
      for (const b of bounds) {
        if (
          o.xPrev > b.x &&
          o.x <= b.x &&
          o.yPrev >= b.y &&
          o.yPrev <= b.y + b.height
        ) {
          o.xVel = 0;
          o.x = b.x + 1;
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
