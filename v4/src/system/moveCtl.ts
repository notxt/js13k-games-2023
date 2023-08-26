export type MoveCtlDatum = {
  boundBottom: boolean;
  boundLeft: boolean;
  boundRight: boolean;
  ctlDown: boolean;
  ctlJump: boolean;
  ctlLeft: boolean;
  ctlRight: boolean;
  ctlUp: boolean;
  x: number;
  xAcc: number;
  xAccMax: number;
  xAccRate: number;
  xVel: number;
  xVelMax: number;
  yVel: number;
};

type Down = (data: MoveCtlDatum[]) => void;
type Jump = (data: MoveCtlDatum[]) => void;
type Left = (data: MoveCtlDatum[]) => void;
type Right = (data: MoveCtlDatum[]) => void;
type Up = (data: MoveCtlDatum[]) => void;

export type MoveCtl = {
  down: Down;
  jump: Jump;
  left: Left;
  right: Right;
  up: Up;
};

type MoveCtlFactory = () => MoveCtl;

export const moveCtlFactory: MoveCtlFactory = () => {
  const down: Down = (data) => {
    for (const d of data) {
      if (!d.ctlUp) continue;
      if (d.boundLeft || d.boundRight) d.yVel = -2;
    }
  };

  const left: Left = (data) => {
    for (const d of data) {
      if (!d.ctlLeft && !d.ctlRight) d.xAcc = 0;
      if (!d.ctlLeft) continue;
      if (!d.boundBottom) continue;

      d.xAcc += d.xAccRate;
      if (d.xAcc > d.xAccMax) d.xAcc = d.xAccMax;
      d.xVel -= d.xAcc;
      if (d.xVel < -d.xVelMax) d.xVel = -d.xVelMax;
    }
  };

  const jump: Jump = (data) => {
    for (const d of data) {
      if (!d.ctlJump) continue;
      if (d.boundBottom) d.yVel = 6;
      if (d.boundLeft) d.xVel = 6;
      if (d.boundRight) d.xVel = -6;
    }
  };

  const right: Right = (data) => {
    for (const d of data) {
      if (!d.ctlRight && !d.ctlLeft) d.xAcc = 0;
      if (!d.ctlRight) continue;
      if (!d.boundBottom) continue;

      d.xAcc += d.xAccRate;
      if (d.xAcc > d.xAccMax) d.xAcc = d.xAccMax;
      d.xVel += d.xAcc;
      if (d.xVel > d.xVelMax) d.xVel = d.xVelMax;
    }
  };

  const up: Up = (data) => {
    for (const d of data) {
      // d.yVel = 0;
      if (d.boundLeft || d.boundRight) {
        d.yVel = 0;
        if (d.ctlUp) d.yVel = 2;
      }
    }
  };

  const system: MoveCtl = {
    down,
    jump,
    left,
    right,
    up,
  };

  return system;
};
