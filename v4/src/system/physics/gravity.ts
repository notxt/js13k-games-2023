const GRAVITY = 1;

export type GravityData = {
  y: number;
  yVel: number;
};

type Add = (item: GravityData) => void;
type Apply = () => void;

export type GravitySystem = {
  add: Add;
  apply: Apply;
};

type CreateGravitySystem = () => GravitySystem;

export const createGravitySystem: CreateGravitySystem = () => {
  const items: GravityData[] = [];

  const add: Add = (item) => {
    items.push(item);
  };

  const apply: Apply = () => {
    for (const i of items) {
      i.yVel -= GRAVITY;
    }
  };

  const system: GravitySystem = {
    add,
    apply,
  };

  return system;
};
