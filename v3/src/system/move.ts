import { Point, Vector } from "../type";
import { ControlData } from "./control";

const GRAVITY = 1;
const DRAG = 0.5;

export type MoveData = {
  acc: Vector;
  control: ControlData;
  p: Point;
  p0: Point;
  vel: Vector;
};

type Add = (item: MoveData) => void;
type Move = () => void;

type MoveSystem = {
  add: Add;
  move: Move;
};

type CreateMoveSystem = () => MoveSystem;

export const createMoveSystem: CreateMoveSystem = () => {
  const items: MoveData[] = [];

  const add: Add = (item: MoveData): void => {
    items.push(item);
  };

  const move: Move = (): void => {
    for (const i of items) {
      if (i.vel.y === 0) {
        if (i.control.right) {
          if (i.vel.x < 1) {
            i.vel.x += i.acc.x * 1.5;
          } else {
            i.vel.x += i.acc.x;
          }
        }
        if (i.control.left) {
          if (i.vel.x > 1) {
            i.vel.x -= i.acc.x * 1.5;
          } else {
            i.vel.x -= i.acc.x;
          }
        }

        if (i.vel.x > 0 && !i.control.right) i.vel.x -= DRAG;
        if (i.vel.x < 0 && !i.control.left) i.vel.x += DRAG;
      }

      i.p0 = Object.assign({}, i.p);
      i.p.x += i.vel.x;

      if (i.control.space && i.vel.y === 0) {
        i.vel.y = 12;
        i.control.space = false;
      }

      i.vel.y -= GRAVITY;
      i.p.y += i.vel.y;
    }
  };

  return {
    add,
    move,
  };
};
