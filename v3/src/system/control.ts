export type ControlData = {
  left: boolean;
  right: boolean;
  space: boolean;
};

export type ControlItem = {
  control: ControlData;
};

type Add = (item: ControlItem) => void;
type Left = (pressed: boolean) => void;
type Right = (pressed: boolean) => void;
type Space = (pressed: boolean) => void;

type ControlSystem = {
  add: Add;
  left: Left;
  right: Right;
  space: Space;
};

type Create = () => ControlSystem;

export const createControlSystem: Create = () => {
  const items: ControlItem[] = [];

  const add: Add = (item: ControlItem): void => {
    items.push(item);
  };

  const left: Left = (pressed) => {
    for (const i of items) {
      i.control.left = pressed;
    }
  };
  const right: Left = (pressed) => {
    for (const i of items) {
      i.control.right = pressed;
    }
  };
  const space: Left = (pressed) => {
    for (const i of items) {
      i.control.space = pressed;
    }
  };

  return {
    add,
    left,
    right,
    space,
  };
};
