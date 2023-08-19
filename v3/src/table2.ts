import { DrawData } from "./system/draw";
import { Box, Point } from "./type";

type CreateTable2 = () => DrawData;

export const createTable2: CreateTable2 = () => {
  const point: Point = {
    type: "point",
    x: 100,
    y: 100,
  };

  const box: Box = {
    width: 50,
    height: 1,
  };

  const table: DrawData = {
    name: "table",
    p: point,
    b: box,
    color: "black",
  };

  return table;
};
