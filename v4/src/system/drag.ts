const { floor, ceil } = Math;

const DRAG = 1;

export type DragDatum = {
  boundBottom: boolean;
  xVel: number;
};

type Update = (data: DragDatum[]) => void;

export type Drag = {
  update: Update;
};

type DragFactory = () => Drag;

export const dragFactory: DragFactory = () => {
  const update: Update = (data) => {
    for (const d of data) {
      if (!d.boundBottom) continue;
      if (d.xVel === 0) continue;
      if (d.xVel > 0) d.xVel = floor(d.xVel - DRAG);
      if (d.xVel < 0) d.xVel = ceil(d.xVel + DRAG);
    }
  };

  const system: Drag = {
    update,
  };

  return system;
};
