type Draw = () => void;
type Jump = () => void;
type MoveLeft = () => void;
type MoveRight = () => void;
type Stop = () => void;

type Rat = {
  draw: Draw;
  jump: Jump;
  moveLeft: MoveLeft;
  moveRight: MoveRight;
  stop: Stop;
};
type CreateRatArg = {
  canvasWidth: number;
  ctx: CanvasRenderingContext2D;
  DRAG: number;
  GRAVITY: number;
};
type CreateRat = ({}: CreateRatArg) => Rat;

const COLOR = "white";

const HEIGHT = 10;
const WIDTH = 10;

export const createRat: CreateRat = ({ ctx, canvasWidth, DRAG, GRAVITY }) => {
  let x = 0;
  let xAcceleration = 0;
  let xVelocity = 0;

  let y = 0;
  let yAcceleration = 0;
  let yVelocity = 0;

  return {
    draw: () => {
      xVelocity += xAcceleration;
      if (xVelocity > 0) xVelocity -= DRAG;
      if (xVelocity < 0) xVelocity += DRAG;

      x += xVelocity;

      if (x < 0) {
        x = 0;
        xVelocity = 0;
        return;
      }

      if (x > canvasWidth) {
        x = canvasWidth - WIDTH;
        xVelocity = 0;
        return;
      }

      yAcceleration -= GRAVITY;
      yVelocity += yAcceleration;

      y += yVelocity;

      if (y <= 0) {
        y = 0;
        yVelocity = 0;
        yAcceleration = 0;
      }

      ctx.fillStyle = COLOR;
      ctx.fillRect(x, y, WIDTH, HEIGHT);
    },

    jump: () => {
      if (yVelocity !== 0) return;
      yAcceleration = 3;
    },

    moveRight: () => {
      if (yVelocity !== 0) return;
      if (xVelocity < -1) {
        xAcceleration = 1.5;
        return;
      }
      xAcceleration = 1;
      return;
    },

    moveLeft: () => {
      if (yVelocity !== 0) return;
      if (xVelocity > 1) {
        xAcceleration = -1.5;
        return;
      }
      xAcceleration = -1;
      return;
    },

    stop: () => {
      xAcceleration = 0;
      return;
    },
  };
};
