import { DrawData } from "./system/draw";
import { Box, Point } from "./type";

type CreateTable = () => DrawData;

export const createTable: CreateTable = () => {
  const point: Point = {
    type: "point",
    x: 50,
    y: 50,
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
