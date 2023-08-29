const { sin, PI } = Math;

const black = "Black";
const brown = "Brown";
const forestGreen = "ForestGreen";
const green = "Green";
const pink = "Pink";
const white = "White";

type Color =
  | typeof black
  | typeof brown
  | typeof forestGreen
  | typeof green
  | typeof pink
  | typeof white;
type LineCapType = "round";

type FillStyle = (color: Color) => void;
type LineCap = (type: LineCapType) => void;
type LineWidth = (width: number) => void;
type StrokeStyle = (color: Color) => void;

type DrawPath = Pick<CanvasDrawPath, "beginPath" | "fill" | "stroke">;
type Path = Pick<CanvasPath, "arc" | "moveTo" | "lineTo" | "arcTo">;
type Rect = Pick<CanvasRect, "fillRect" | "clearRect">;
type State = Pick<CanvasState, "save" | "restore">;
type Transform = Pick<CanvasTransform, "translate" | "rotate">;

type DrawType = "ratStand" | "ratRun" | "leafyTree" | "pineTree";
export type DrawD = {
  type: DrawType;
  scale: number;
  x: number;
  y: number;
};

export type Draw = (data: DrawD[], t: number) => void;
type DrawDatum = (datum: DrawD, t: number) => void;

type DrawFactory = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => Draw;

export const drawFactory: DrawFactory = (ctx, width, height) => {
  const fillStyle: FillStyle = (color) => (ctx.fillStyle = color);
  const lineCap: LineCap = (type) => (ctx.lineCap = type);
  const lineWidth: LineWidth = (width) => (ctx.lineWidth = width);
  const strokeStyle: StrokeStyle = (color) => (ctx.strokeStyle = color);

  const save: State["save"] = () => ctx.save();
  const translate: Transform["translate"] = (x, y) => ctx.translate(x, y);
  const beginPath: DrawPath["beginPath"] = () => ctx.beginPath();
  const arc: Path["arc"] = (x, y, radius, startAngle, endAngle) => {
    ctx.arc(x, y, radius, startAngle, endAngle, true);
  };
  const fill: DrawPath["fill"] = () => ctx.fill();
  const restore: State["restore"] = () => ctx.restore();
  const ctxRotate: Transform["rotate"] = (angle) => ctx.rotate(angle);
  const ctxMoveTo: Path["moveTo"] = (x, y) => ctx.moveTo(x, y);
  const lineTo: Path["lineTo"] = (x, y) => ctx.lineTo(x, y);
  const stroke: DrawPath["stroke"] = () => ctx.stroke();
  const arcTo: Path["arcTo"] = (x1, y1, x2, y2, radius) => {
    ctx.arcTo(x1, y1, x2, y2, radius);
  };
  const clearRect: Rect["clearRect"] = (x, y, w, h) => {
    ctx.clearRect(x, y, w, h);
  };

  const bodyWidth = 20;
  const bodyHeight = 20;
  const headWidth = 20;

  const circle = (x: number, y: number, radius: number) =>
    arc(x, y, radius, 0, PI * 2);

  const ear = () => {
    const radius = 10;

    // outer
    beginPath();
    fillStyle(white);
    circle(0, 0, radius);
    fill();

    // inner
    beginPath();
    fillStyle(pink);
    circle(0, 0, radius - 2);
    fill();
  };

  const whisker = () => {
    const whiskerLength = 10;

    beginPath();
    fillStyle(black);

    ctxMoveTo(0, 0);
    lineTo(0, whiskerLength);
    ctxRotate(PI / 12);
    ctxMoveTo(0, 0);
    lineTo(0, whiskerLength);
    stroke();
  };

  const body = () => {
    beginPath();
    fillStyle(white);

    // body
    lineTo(0, 0);
    lineTo(bodyWidth, 0);
    lineTo(bodyWidth + headWidth, bodyHeight);
    lineTo(0, bodyHeight);

    // butt
    arc(0, bodyHeight / 2, bodyHeight / 2, (3 * PI) / 2, PI / 2);
    fill();
  };

  const eye = () => {
    const radius = 3;
    const highlightRadius = 1.7;

    beginPath();
    fillStyle(black);
    circle(0, 0, radius);
    fill();

    beginPath();
    fillStyle(white);
    circle(-1, -1, highlightRadius);
    fill();
  };

  const tail = () => {
    const x1 = -20;
    const y1 = 0;
    const x2 = -20;
    const y2 = -20;
    const radius = 20;

    strokeStyle(pink);
    lineCap("round");
    lineWidth(3);
    beginPath();
    ctxMoveTo(0, 0);
    arcTo(x1, y1, x2, y2, radius);
    stroke();
  };

  const leg = (angle: number) => {
    ctxRotate(angle);
    beginPath();
    ctxMoveTo(0, 0);
    lineTo(0, 7);
    stroke();
  };

  const rat: DrawDatum = (d, legAngle) => {
    // back ear
    save();
    const earX = d.x + 20;
    const earY = d.y;
    const earXOffset = 6;
    const earYOffset = 1;
    translate(earX + earXOffset, earY - earYOffset);
    ear();
    restore();

    // back whiskers
    const whiskerX = d.x + 35;
    const whiskerY = d.y + 18;
    save();
    translate(whiskerX, whiskerY);
    ctxRotate((4 * PI) / 3);
    whisker();
    restore();

    // body
    save();
    translate(d.x, d.y);
    body();
    restore();

    // front whiskers
    save();
    translate(whiskerX, whiskerY);
    ctxRotate(PI / 2);
    whisker();
    restore();

    // front ear
    save();
    translate(earX - earXOffset, earY + earYOffset);
    ear();
    restore();

    // eyes
    const eyeX = d.x + 24;
    const eyeY = d.y + 11;
    const eyeOffset = 6;
    save();
    translate(eyeX, eyeY);
    ctxRotate(-PI / 10);
    eye();
    translate(eyeOffset, 0);
    eye();
    restore();

    // tail
    const tailX = d.x - 10;
    const tailY = d.y + 10;
    save();
    translate(tailX, tailY);
    tail();
    restore();

    // legs
    const legX = d.x;
    const legY = d.y + 20;
    const leftRightOffset = 3;
    const frontBackOffset = 20;

    save();
    translate(legX, legY);
    leg(legAngle);
    restore();

    save();
    translate(legX + leftRightOffset, legY);
    leg(-legAngle);
    restore();

    save();
    translate(legX + leftRightOffset + frontBackOffset, legY);
    leg(legAngle);
    restore();

    save();
    translate(legX + leftRightOffset + frontBackOffset + leftRightOffset, legY);
    leg(-legAngle);
    restore();
  };

  const ratStand: DrawDatum = (d) => {
    rat(d, 0);
  };

  const ratRun: DrawDatum = (d, t) => {
    rat(d, sin(t / 60));
  };

  const leafyTree: DrawDatum = (d) => {
    const trunkHeight = 150 * d.scale;
    const trunkWidth = 20 * d.scale;
    const branchRadius = 150 * d.scale;

    save();
    translate(d.x, d.y);

    beginPath();
    strokeStyle(brown);
    lineWidth(trunkWidth);
    ctxMoveTo(0, 0);
    lineTo(0, -trunkHeight);
    stroke();

    beginPath();
    fillStyle(forestGreen);
    circle(0, -trunkHeight - branchRadius, branchRadius);
    fill();

    restore();
  };

  const pineTree: DrawDatum = (d) => {
    const trunkHeight = 150 * d.scale;
    const trunkWidth = 20 * d.scale;
    const branchWidth = 80 * d.scale;
    const branchHeight = 150 * d.scale;
    const branchCount = 5;

    save();
    translate(d.x, d.y);

    beginPath();
    strokeStyle(brown);
    lineWidth(trunkWidth);
    ctxMoveTo(0, 0);
    lineTo(0, -trunkHeight);
    stroke();

    translate(0, -trunkHeight);

    for (let i = 1; i <= branchCount; i++) {
      beginPath();
      fillStyle(green);

      const height = branchWidth / i;
      const width = branchHeight / i;

      ctxMoveTo(-width / 2, 0);
      lineTo(0, -height);
      lineTo(width / 2, 0);
      translate(0, -((5 * height) / 6));

      fill();
    }

    restore();
  };

  const drawFn: Record<DrawType, DrawDatum> = {
    ratStand,
    ratRun,
    leafyTree,
    pineTree,
  };

  const draw: Draw = (data, t) => {
    clearRect(0, 0, width, height);

    for (const d of data) {
      drawFn[d.type](d, t);
    }
  };

  return draw;
};
