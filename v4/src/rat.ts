import { BoundObjectData, Entity, RunData } from "./type";
import { DrawRectData, DrawRectSystem } from "./system/draw/rect";
import { RunLeftSystem } from "./system/control/runLeft";
import { RunRightSystem } from "./system/control/runRight";
import { ControlData, ControlSystem } from "./system/control";
import { GravitySystem } from "./system/physics/gravity";
import { MoveSystem } from "./system/move/move";
import { BottomBoundSystem } from "./system/bound/bottom";
import { PrevMoveSystem } from "./system/move/setPrev";
import { LeftBoundSystem } from "./system/bound/left";

const { round } = Math;

type Rat = Entity & ControlData & RunData & BoundObjectData & DrawRectData;

export type CreateRatArg = {
  bottomBound: BottomBoundSystem;
  canvasHeight: number;
  canvasWidth: number;
  control: ControlSystem;
  drawRect: DrawRectSystem;
  gravity: GravitySystem;
  leftBound: LeftBoundSystem;
  move: MoveSystem;
  prevMove: PrevMoveSystem;
  runLeft: RunLeftSystem;
  runRight: RunRightSystem;
};

type CreateRat = (arg: CreateRatArg) => void;

export const createRat: CreateRat = ({
  bottomBound,
  canvasHeight,
  canvasWidth,
  control,
  drawRect,
  gravity,
  leftBound,
  move,
  prevMove,
  runLeft,
  runRight,
}) => {
  const x = round(canvasWidth / 2);
  const y = round(canvasHeight / 2);

  const rat: Rat = {
    color: "white",
    ctlLeft: false,
    ctlRight: false,
    ctlSpace: false,
    height: 10,
    name: "rat",
    width: 10,
    x,
    xAcc: 1,
    xAccRate: 0.1,
    xPrev: x,
    xVel: 0,
    xVelMax: 5,
    y,
    yPrev: y,
    yVel: 0,
  };

  prevMove.add(rat);

  control.add(rat);

  runLeft.add(rat);
  runRight.add(rat);

  gravity.add(rat);
  move.add(rat);

  bottomBound.addObj(rat);
  leftBound.addObj(rat);

  drawRect.add(rat);
};
