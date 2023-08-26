export type MoveData = {
  x: number;
  xVel: number;
  y: number;
  yVel: number;
};

type Update = (item: MoveData[]) => void;
export type MoveSystem = {
  update: Update;
};
type CreateMoveSystem = () => MoveSystem;

export const createMoveSystem: CreateMoveSystem = () => {
  const update: Update = (items) => {
    for (const i of items) {
      i.x += i.xVel;
      i.y += i.yVel;
    }
  };

  const system: MoveSystem = {
    update,
  };

  return system;
};
