import { Box, Point } from "../type";

export type DrawData = {
  b: Box;
  color: string;
  p: Point;
};

type Draw = () => void;

type DrawSystem = {
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

  const draw = (): void => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

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
