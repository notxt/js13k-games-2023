import { RunData } from "../../type";

type Add = (item: RunData) => void;
type Update = () => void;
export type RunRightSystem = {
  add: Add;
  update: Update;
};
type CreateRunRightSystem = () => RunRightSystem;

export const createRunRightSystem: CreateRunRightSystem = () => {
  const items: RunData[] = [];

  const add: Add = (item: RunData) => {
    items.push(item);
  };

  const update: Update = () => {
    for (const i of items) {
      // can't run if jumping or falling
      if (i.yVel !== 0) continue;

      if (!i.ctlRight) continue;

      // i.xAcc += i.xAccRate;
      i.xVel += i.xAcc;
      // if (i.xVel > i.xVelMax) i.xVel = i.xVelMax;
    }
  };

  const runSystem: RunRightSystem = {
    add,
    update,
  };

  return runSystem;
};
