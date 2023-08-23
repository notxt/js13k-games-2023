export type PrevMoveData = {
  x: number;
  xPrev: number;
  y: number;
  yPrev: number;
};

type Add = (item: PrevMoveData) => void;
type Set = () => void;
export type PrevMoveSystem = {
  add: Add;
  set: Set;
};
type CreatePrevMoveSystem = () => PrevMoveSystem;

export const createPrevMoveSystem: CreatePrevMoveSystem = () => {
  const items: PrevMoveData[] = [];

  const add: Add = (item) => {
    items.push(item);
  };

  const set: Set = () => {
    for (const i of items) {
      i.xPrev = i.x;
      i.yPrev = i.y;
    }
  };

  const system: PrevMoveSystem = {
    add,
    set,
  };

  return system;
};
