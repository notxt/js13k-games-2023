import { Point, Vector } from "../type";

export type MoveData = {
  acc: Vector;
  p: Point;
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
      i.p.x += i.vel.x;
      i.p.y += i.vel.y;
    }
  };

  return {
    add,
    move,
  };
};
