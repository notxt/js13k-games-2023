import { loopFactory } from "./loop";

const canvas = document.querySelector("canvas");
if (canvas === null) throw new Error("canvas is null");

const draw = loopFactory(canvas);

requestAnimationFrame(draw);
