export type ControlData = {
  ctlLeft: boolean;
  ctlRight: boolean;
  ctlSpace: boolean;
};

type Add = (item: ControlData) => void;
type Left = (pressed: boolean) => void;
type Right = (pressed: boolean) => void;
type Space = (pressed: boolean) => void;

export type ControlSystem = {
  add: Add;
  left: Left;
  right: Right;
  space: Space;
};

type Create = () => ControlSystem;

export const createControlSystem: Create = () => {
  const items: ControlData[] = [];

  const add: Add = (item: ControlData): void => {
    items.push(item);
  };

  const left: Left = (pressed) => {
    for (const i of items) {
      i.ctlLeft = pressed;
    }
  };
  const right: Left = (pressed) => {
    for (const i of items) {
      i.ctlRight = pressed;
    }
  };
  const space: Left = (pressed) => {
    for (const i of items) {
      i.ctlSpace = pressed;
    }
  };

  return {
    add,
    left,
    right,
    space,
  };
};
