import { Round } from "../loop";
import { DrawD } from "../system/draw";

export type Rat = DrawD;

type RatFactory = (width: number, height: number, round: Round) => Rat;

export const ratFactory: RatFactory = (width, height, round) => {
  const d: Rat = {
    x: round(width / 2),
    y: round(height / 2),
  };

  return d;
};
