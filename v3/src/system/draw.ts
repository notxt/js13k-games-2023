import { Box, Point } from "../type";

export type DrawData = {
  name: string;
  b: Box;
  color: string;
  p: Point;
};

type Add = (item: DrawData) => void;
type Draw = (t: number, frameCount: number) => void;

type DrawSystem = {
  add: Add;
  draw: Draw;
};

export type CreateDrawSystemArgs = {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
};

type CreateDrawSystem = (args: CreateDrawSystemArgs) => DrawSystem;

export const createDrawSystem: CreateDrawSystem = ({
  ctx,
  canvasWidth,
  canvasHeight,
}) => {
  const items: DrawData[] = [];

  const add = (item: DrawData): void => {
    items.push(item);
  };

  const drawInfo = (t: number, frameCount: number) => {
    const seconds = Math.round(t / 1000);
    const fps = Math.round(frameCount / seconds);

    const offset = 2;
    ctx.font = "10px monospace";
    ctx.fillText(`Seconds ${seconds}`, offset, 10);
    ctx.fillText(`FPS     ${fps}`, offset, 20);
  };

  const draw = (t: number, frameCount: number): void => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawInfo(t, frameCount);

    ctx.save();
    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);

    for (const i of items) {
      ctx.fillStyle = i.color;
      ctx.fillRect(i.p.x, i.p.y, i.b.width, i.b.height);
    }

    ctx.restore();
  };

  return {
    add,
    draw,
  };
};
