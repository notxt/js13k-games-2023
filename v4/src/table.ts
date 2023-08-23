import { BottomBoundSystem, XBound } from "./system/bound/bottom";
import { DrawRectData, DrawRectSystem } from "./system/draw/rect";
import { Box, Entity, Point } from "./type";

type Table = Entity & DrawRectData;

export type CreateTableArg = {
  height: number;
  name: string;
  width: number;
  x: number;
  y: number;
};
type CreateTable = (arg: CreateTableArg) => void;

export type CreateTableFactoryArg = {
  bottomBound: BottomBoundSystem;
  drawRect: DrawRectSystem;
};
type CreateTableFactory = (arg: CreateTableFactoryArg) => CreateTable;

export const createTableFactory: CreateTableFactory =
  ({ bottomBound, drawRect }) =>
  ({ name, x, y, width, height }) => {
    const table: Table = {
      color: "black",
      height,
      name,
      width,
      x,
      y,
    };

    bottomBound.addBound(table);
    
    drawRect.add(table);
  };
