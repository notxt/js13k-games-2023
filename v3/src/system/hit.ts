import { Rat } from "../rat";
import { DrawData } from "./draw";

type Add = (item: DrawData) => void;
type Test = () => void;

type HitSystem = {
  add: Add;
  test: Test;
};

type CreateHitSystem = (rat: Rat) => HitSystem;

export const createHitSystem: CreateHitSystem = (rat: Rat) => {
  const items: DrawData[] = [];

  const add = (item: DrawData) => {
    items.push(item);
  };

  const test = () => {
    for (const i of items) {
      if (
        rat.p0.y > i.p.y &&
        rat.p.y <= i.p.y &&
        i.p.x <= rat.p0.x &&
        rat.p0.x <= i.p.x + i.b.width
      ) {
        rat.vel.y = 0;
        rat.p.y = i.p.y + i.b.height + 1;
      }

      if (
        rat.p0.x > i.p.x &&
        rat.p.x <= i.p.x &&
        i.p.y <= rat.p0.y &&
        rat.p0.y <= i.p.y + i.b.height
      ) {
        rat.vel.x = 0;
        rat.p.x = i.p.x + 1;
      }

      if (
        rat.p0.x + rat.b.width < i.p.x &&
        rat.p.x + rat.b.width >= i.p.x &&
        i.p.y <= rat.p0.y &&
        rat.p0.y <= i.p.y + i.b.height
      ) {
        rat.vel.x = 0;
        rat.p.x = i.p.x - rat.b.width - 1;
      }
    }
  };

  return {
    add,
    test: test,
  };
};
