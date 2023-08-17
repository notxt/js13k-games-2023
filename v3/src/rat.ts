import { Box, Point, Vector } from "./type";
import { DrawData } from "./system/draw";
import { ControlData, ControlItem } from "./system/control";
import { MoveData } from "./system/move";

const { round } = Math;

type Rat = ControlItem & MoveData & DrawData;

type CreateRat = (canvasWidth: number, canvasHeight: number) => Rat;

export const createRat: CreateRat = (canvasWidth, canvasHeight) => {
  const control: ControlData = {
    left: false,
    right: false,
    space: false,
  };

  const point: Point = {
    type: "point",
    x: round(canvasWidth / 2),
    y: round(canvasHeight / 2),
  };

  const box: Box = {
    width: 10,
    height: 10,
  };

  const vel: Vector = {
    type: "vector",
    x: 0,
    y: 0,
  };

  const acc: Vector = {
    type: "vector",
    x: 0,
    y: 0,
  };

  const rat: Rat = {
    acc,
    b: box,
    color: "white",
    control,
    p: point,
    vel,
  };

  return rat;
};
