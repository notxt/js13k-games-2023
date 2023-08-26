export type Color = "white" | "pink" | "black";
export type LineCapType = "round";

type DrawPath = Pick<CanvasDrawPath, "beginPath" | "fill" | "stroke">;
type Path = Pick<CanvasPath, "arc" | "moveTo" | "lineTo" | "arcTo">;
type Rect = Pick<CanvasRect, "fillRect">;
type State = Pick<CanvasState, "save" | "restore">;
type Transform = Pick<CanvasTransform, "translate" | "rotate">;

type FillStyle = (color: Color) => void;
type LineCap = (type: LineCapType) => void;
type LineWidth = (width: number) => void;
type StrokeStyle = (color: Color) => void;

export type Ctx = DrawPath &
  Path &
  Rect &
  State &
  Transform & {
    fillStyle: FillStyle;
    lineCap: LineCap;
    lineWidth: LineWidth;
    strokeStyle: StrokeStyle;
  };

type CtxFactory = (ctx: CanvasRenderingContext2D) => Ctx;

export const ctxFactory: CtxFactory = (canvasCtx) => {
  const fillStyle: FillStyle = (color) => (canvasCtx.fillStyle = color);
  const lineCap: LineCap = (type) => (canvasCtx.lineCap = type);
  const lineWidth: LineWidth = (width) => (canvasCtx.lineWidth = width);
  const strokeStyle: StrokeStyle = (color) => (canvasCtx.strokeStyle = color);

  const save: State["save"] = () => canvasCtx.save();

  const translate: Transform["translate"] = (x, y) => canvasCtx.translate(x, y);

  const beginPath: DrawPath["beginPath"] = () => canvasCtx.beginPath();

  const arc: Path["arc"] = (
    x,
    y,
    radius,
    startAngle,
    endAngle,
    counterclockwise
  ) => canvasCtx.arc(x, y, radius, startAngle, endAngle, counterclockwise);

  const fill: DrawPath["fill"] = () => canvasCtx.fill();

  const restore: State["restore"] = () => canvasCtx.restore();

  const rotate: Transform["rotate"] = (angle) => canvasCtx.rotate(angle);

  const moveTo: Path["moveTo"] = (x, y) => canvasCtx.moveTo(x, y);

  const lineTo: Path["lineTo"] = (x, y) => canvasCtx.lineTo(x, y);

  const stroke: DrawPath["stroke"] = () => canvasCtx.stroke();

  const fillRect: Rect["fillRect"] = (x, y, w, h) =>
    canvasCtx.fillRect(x, y, w, h);

  const arcTo: Path["arcTo"] = (x1, y1, x2, y2, radius) =>
    canvasCtx.arcTo(x1, y1, x2, y2, radius);

  const c: Ctx = {
    arc,
    arcTo,
    beginPath,
    fill,
    fillRect,
    fillStyle,
    lineCap,
    lineTo,
    lineWidth,
    moveTo,
    restore,
    rotate,
    save,
    stroke,
    strokeStyle,
    translate,
  };

  return c;
};
