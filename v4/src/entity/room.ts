import { XBoundDatum, YBoundDatum } from "../system/bound";
import { Entity } from "../type";

type Floor = Entity & XBoundDatum;
type LeftWall = Entity & YBoundDatum;
type RightWall = Entity & YBoundDatum;

export type CreateRoomArg = {
  canvasHeight: number;
  canvasWidth: number;
};

type Room = {
  floor: XBoundDatum;
  leftWall: YBoundDatum;
  rightWall: YBoundDatum;
};

type CreateRoom = (arg: CreateRoomArg) => Room;

export const createRoom: CreateRoom = ({ canvasHeight, canvasWidth }) => {
  const floor: Floor = {
    name: "floor",
    x: 0,
    width: canvasWidth,
    y: 0,
  };

  const leftWall: LeftWall = {
    name: "leftWall",
    x: 0,
    y: 0,
    height: canvasHeight,
  };

  const rightWall: RightWall = {
    name: "rightWall",
    x: canvasWidth,
    y: 0,
    height: canvasHeight,
  };

  return {
    floor,
    leftWall,
    rightWall,
  };
};
