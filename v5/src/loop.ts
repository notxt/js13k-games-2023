import { ctxFactory } from "./ctx";
import { ratFactory } from "./entity/rat";
import { DrawD, drawFactory } from "./system/draw";

const { round } = Math;

export type Round = (x: number) => number;

type LoopFactory = (canvas: HTMLCanvasElement) => FrameRequestCallback;

export const loopFactory: LoopFactory = (canvas) => {
  const canvasCtx = canvas.getContext("2d");
  if (canvasCtx === null) throw new Error("ctx is null");
  const ctx = ctxFactory(canvasCtx);

  const { height, width } = canvas;

  const draw = drawFactory(ctx);

  const drawData: DrawD[] = [];

  const rat = ratFactory(width, height, round);
  drawData.push(rat);

  const loop: FrameRequestCallback = (t) => {
    console.log(width, height, t);

    canvasCtx.clearRect(0, 0, width, height);

    draw(t, drawData);

    requestAnimationFrame(loop);
  };

  return loop;
};
