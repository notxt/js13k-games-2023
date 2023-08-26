export type DrawRectData = {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
};

type Draw = (rects: DrawRectData[]) => void;
export type DrawRectSystem = {
  draw: Draw;
};
type CreateDrawRectSystem = (ctx: CanvasRenderingContext2D) => DrawRectSystem;
export const createDrawRectSystem: CreateDrawRectSystem = (ctx) => {
  const draw: Draw = (rects: DrawRectData[]) => {
    for (const r of rects) {
      ctx.fillStyle = r.color;
      ctx.fillRect(r.x, r.y, r.width, r.height);
    }
  };

  const system: DrawRectSystem = {
    draw,
  };

  return system;
};
