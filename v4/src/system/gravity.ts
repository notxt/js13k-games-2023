const GRAVITY = 1;

export type GravityData = {
  boundBottom: boolean;
  boundLeft: boolean;
  boundRight: boolean;
  y: number;
  yVel: number;
};

type Apply = (objs: GravityData[]) => void;

export type GravitySystem = {
  apply: Apply;
};

type CreateGravitySystem = () => GravitySystem;

export const createGravitySystem: CreateGravitySystem = () => {
  const apply: Apply = (objs) => {
    for (const o of objs) {
      if (o.boundBottom || o.boundLeft || o.boundRight) continue;
      o.yVel -= GRAVITY;
    }
  };

  const system: GravitySystem = {
    apply,
  };

  return system;
};
