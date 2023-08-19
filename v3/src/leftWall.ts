import { DrawData } from "./system/draw";
import { Box, Point } from "./type";

type CreateLeftWall = (canvasWidth: number) => DrawData;

export const createLeftWall: CreateLeftWall = (canvasHeight) => {
  const point: Point = {
    type: "point",
    x: 0,
    y: 0,
  };

  const box: Box = {
    width: 1,
    height: canvasHeight,
  };

  const leftWall: DrawData = {
    name: "leftWall",
    p: point,
    b: box,
    color: "black",
  };

  return leftWall;
};
