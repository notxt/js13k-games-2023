import { DrawData } from "./system/draw";
import { Box, Point } from "./type";

type CreateRightWall = (canvasWidth: number, canvasHeight: number) => DrawData;

export const createRightWall: CreateRightWall = (canvasWidth, canvasHeight) => {
  const point: Point = {
    type: "point",
    x: canvasWidth - 1,
    y: 0,
  };

  const box: Box = {
    width: 1,
    height: canvasHeight,
  };

  const rightWall: DrawData = {
    name: "rightWall",
    p: point,
    b: box,
    color: "black",
  };

  return rightWall;
};
