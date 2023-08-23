import { YBound } from "../../type";
import { MoveData } from "../move";

type AddObj = (obj: MoveData) => void;
type AddBound = (bound: YBound) => void;
type Test = () => void;

export type RightBoundSystem = {
  addObj: AddObj;
  addBound: AddBound;
  test: Test;
};

type CreateRightBoundSystem = () => RightBoundSystem;

export const createRightBoundSystem: CreateRightBoundSystem = () => {
  const objs: MoveData[] = [];
  const bounds: YBound[] = [];

  const addObj: AddObj = (obj: MoveData) => {
    objs.push(obj);
  };

  const addBound: AddBound = (bound: YBound) => {
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
    test,
  };
};
