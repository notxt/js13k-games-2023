import { XBoundDatum, YBoundDatum } from "../bound";

type Bottom = (bounds: XBoundDatum[]) => void;
type Left = (bounds: YBoundDatum[]) => void;
type Right = (bounds: YBoundDatum[]) => void;

export type DrawBound = {
  bottom: Bottom;
  left: Left;
  right: Right;
};

type CreateDrawBoundSystem = (ctx: CanvasRenderingContext2D) => DrawBound;

export const createDrawBoundSystem: CreateDrawBoundSystem = (ctx) => {
  const bottom: Bottom = (bounds) => {
    for (const { x, y, width } of bounds) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.stroke();
    }
  };

  const left: Left = (bounds) => {
    for (const { x, y, height } of bounds) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.stroke();
    }
  };

  const right: Right = (bounds) => {
    for (const { x, y, height } of bounds) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + height);
      ctx.stroke();
    }
  };

  const system: DrawBound = {
    bottom,
    left,
    right,
  };

  return system;
};
