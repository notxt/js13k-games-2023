import { Entity, RunData } from "../type";
import { DrawRectData } from "../system/draw/rect";
import { CtlDatum } from "../system/ctl";
import { BoundMoveDatum } from "../system/bound";
import { MoveCtlDatum } from "../system/moveCtl";

const { round } = Math;

export type CreateRatArg = {
  canvasHeight: number;
  canvasWidth: number;
};

export type Rat = Entity &
  CtlDatum &
  MoveCtlDatum &
  RunData &
  BoundMoveDatum &
  DrawRectData;

type CreateRat = (arg: CreateRatArg) => Rat;

export const createRat: CreateRat = ({ canvasHeight, canvasWidth }) => {
  const x = round(canvasWidth / 2);
  const y = round(canvasHeight / 2);

  const data: Rat = {
    boundBottom: false,
    boundLeft: false,
    boundRight: false,
    color: "white",
    ctlDown: false,
    ctlJump: false,
    ctlLeft: false,
    ctlRight: false,
    ctlUp: false,
    height: 10,
    name: "rat",
    width: 10,
    x,
    xAcc: 0,
    xAccMax: 5,
    xAccRate: 1,
    xPrev: x,
    xVel: 0,
    xVelMax: 15,
    y,
    yPrev: y,
    yVel: 0,
  };

  return data;
};
