export type DrawRectData = {
  color: string;
  height: number;
  width: number;
  x: number;
  y: number;
};

type Add = (item: DrawRectData) => void;
type Draw = () => void;
export type DrawRectSystem = {
  add: Add;
  draw: Draw;
};
type CreateDrawRectSystem = (ctx: CanvasRenderingContext2D) => DrawRectSystem;
export const createDrawRectSystem: CreateDrawRectSystem = (ctx) => {
  const items: DrawRectData[] = [];

  const add: Add = (item) => {
    items.push(item);
  };
  const draw: Draw = () => {
    for (const i of items) {
      ctx.fillStyle = i.color;
      ctx.fillRect(i.x, i.y, i.width, i.height);
    }
  };

  const system: DrawRectSystem = {
    add,
    draw,
  };

  return system;
};
