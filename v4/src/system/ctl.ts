export type CtlDatum = {
  ctlDown: boolean;
  ctlJump: boolean;
  ctlLeft: boolean;
  ctlRight: boolean;
  ctlUp: boolean;
};

type Down = (data: CtlDatum[], pressed: boolean) => void;
type Jump = (data: CtlDatum[], pressed: boolean) => void;
type Left = (data: CtlDatum[], pressed: boolean) => void;
type Right = (data: CtlDatum[], pressed: boolean) => void;
type Up = (data: CtlDatum[], pressed: boolean) => void;

export type CtlSystem = {
  down: Down;
  jump: Jump;
  left: Left;
  right: Right;
  up: Up;
};

type Create = () => CtlSystem;

export const createCtlSystem: Create = () => {
  const down: Down = (data, pressed) => {
    for (const d of data) {
      d.ctlDown = pressed;
    }
  };

  const jump: Jump = (data, pressed) => {
    for (const d of data) {
      d.ctlJump = pressed;
    }
  };

  const left: Left = (data, pressed) => {
    for (const d of data) {
      d.ctlLeft = pressed;
    }
  };

  const right: Right = (data, pressed) => {
    for (const d of data) {
      d.ctlRight = pressed;
    }
  };

  const up: Up = (data, pressed) => {
    for (const d of data) {
      d.ctlUp = pressed;
    }
  };

  const system: CtlSystem = {
    down,
    jump,
    left,
    right,
    up,
  };

  return system;
};
