import { BottomBoundSystem, XBound } from "./system/bound/bottom";
import { LeftBoundSystem } from "./system/bound/left";
import { RightBoundSystem } from "./system/bound/right";
import { Entity, YBound } from "./type";

type Floor = Entity & XBound;
type LeftWall = Entity & YBound;
type RightWall = Entity & YBound;

export type CreateRoomArg = {
  bottomBound: BottomBoundSystem;
  canvasHeight: number;
  canvasWidth: number;
  leftBound: LeftBoundSystem;
  rightBound: RightBoundSystem;
};

type CreateRoom = (arg: CreateRoomArg) => void;

export const createRoom: CreateRoom = ({
  bottomBound,
  canvasHeight,
  leftBound,
  canvasWidth,
  rightBound,
}) => {
  const floor: Floor = {
    name: "floor",
    x: 0,
    width: canvasWidth,
    y: 0,
  };
  bottomBound.addBound(floor);

  const leftWall: LeftWall = {
    name: "leftWall",
    x: 0,
    y: 0,
    height: canvasHeight,
  };
  leftBound.addBound(leftWall);

  const rightWall: RightWall = {
    name: "rightWall",
    x: canvasWidth,
    y: 0,
    height: canvasHeight,
  };
  rightBound.addBound(rightWall);

  return;
};
