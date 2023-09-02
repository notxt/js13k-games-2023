import { Rect } from "./move";

const { PI, round } = Math;

export const white = "white";
export const black = "black";

type DrawRect = (data: Rect[]) => void;
type DrawRectFactory = (ctx: CanvasRenderingContext2D) => DrawRect;

export const drawRectFactory: DrawRectFactory = (ctx) => {
  const draw: DrawRect = (data) => {
    for (const d of data) {
      ctx.beginPath();
      ctx.fillStyle = white;
      ctx.fillRect(d.x, d.y, d.w, d.h);
    }
  };

  return draw;
};

type DrawActive = (r: Rect) => void;
type DrawActiveFactory = (ctx: CanvasRenderingContext2D) => DrawActive;

export const drawActiveFactory: DrawActiveFactory = (ctx) => (r) => {
  ctx.save();

  const x = r.x + round(r.w / 2);
  const y = r.y - 5;
  const length = 10;
  const angle = PI / 4;

  ctx.translate(x, y);
  ctx.beginPath();
  ctx.strokeStyle = black;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  ctx.save();
  ctx.rotate(angle);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length / 2);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate(-angle);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length / 2);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
};
