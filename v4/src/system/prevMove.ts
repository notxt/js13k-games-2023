export type PrevMoveDatum = {
  x: number;
  xPrev: number;
  y: number;
  yPrev: number;
};

type Set = (data: PrevMoveDatum[]) => void;
export type PrevMove = {
  set: Set;
};
type PrevMoveFactory = () => PrevMove;

export const prevMoveFactory: PrevMoveFactory = () => {
  const set: Set = (data: PrevMoveDatum[]) => {
    for (const d of data) {
      d.xPrev = d.x;
      d.yPrev = d.y;
    }
  };

  const system: PrevMove = {
    set,
  };

  return system;
};
