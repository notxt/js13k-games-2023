export type Entity = {
  name: string;
};

export type BoundObjectData = {
  x: number;
  xPrev: number;
  xVel: number;
  y: number;
  yPrev: number;
  yVel: number;
};

export type Point = {
  type: "point";
  x: number;
  y: number;
};

export type Vector = {
  type: "vector";
  x: number;
  y: number;
};

export type Box = {
  width: number;
  height: number;
};

export type YBound = {
  height: number;
  x: number;
  y: number;
};

export type RunData = {
  ctlLeft: boolean;
  ctlRight: boolean;
  x: number;
  xAcc: number;
  xAccRate: number;
  xVel: number;
  xVelMax: number;
  yVel: number;
};
