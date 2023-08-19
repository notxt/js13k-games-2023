import { DrawData } from "./system/draw";
import { Box, Point } from "./type";

type Floor = DrawData;

type CreateFloor = (canvasWidth: number) => Floor;

export const createFloor: CreateFloor = (canvasWidth) => {
  const point: Point = {
    type: "point",
    x: 0,
    y: 0,
  };

  const box: Box = {
    width: canvasWidth,
    height: 1,
  };

  const floor: Floor = {
    name: "floor",
    p: point,
    b: box,
    color: "black",
  };

  return floor;
};
