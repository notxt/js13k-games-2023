export type MoveData = {
  x: number;
  xVel: number;
  y: number;
  yVel: number;
};

type Add = (item: MoveData) => void;
type Update = () => void;
export type MoveSystem = {
  add: Add;
  update: Update;
};
type CreateMoveSystem = () => MoveSystem;

export const createMoveSystem: CreateMoveSystem = () => {
  const items: MoveData[] = [];

  const add: Add = (item) => {
    items.push(item);
  };

  const update: Update = () => {
    for (const i of items) {
      console.log(i.xVel);
      i.x += i.xVel;
      i.y += i.yVel;
    }
  };

  const system: MoveSystem = {
    add,
    update,
  };

  return system;
};
