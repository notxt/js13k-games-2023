import { Ctx } from "./ctx";

const { PI, sin } = Math;

export type DrawD = {
  x: number;
  y: number;
};

type Draw = (t: number, data: DrawD[]) => void;

type DrawFactory = (ctx: Ctx) => Draw;

export const drawFactory: DrawFactory = (ctx) => {
  const draw: Draw = (t, data) => {
    for (const d of data) {
      ctx.fillStyle("white");

      const bodyWidth = 20;
      const bodyHeight = 20;
      const headWidth = 20;
      const headHeight = 20;

      // ear
      const earRadius = 10;
      const earOffset = 8;

      ctx.save();
      ctx.translate(d.x + bodyWidth + earOffset, d.y - 3);

      ctx.fillStyle("white");
      ctx.beginPath();
      ctx.arc(0, 0, earRadius, 0, PI * 2);
      ctx.fill();

      ctx.fillStyle("pink");
      ctx.beginPath();
      ctx.arc(0, 0, earRadius - 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // whiskers
      ctx.save();
      ctx.translate(d.x + bodyWidth + headWidth - 5, d.y + headHeight - 2);

      const whiskerLength = 10;

      ctx.beginPath();
      ctx.fillStyle("black");
      ctx.rotate((-4 * PI) / 6);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, whiskerLength);
      ctx.rotate(PI / 12);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, whiskerLength);
      ctx.stroke();

      ctx.restore();

      // body
      ctx.save();
      ctx.translate(d.x, d.y);

      ctx.fillRect(0, 0, bodyWidth, bodyHeight);

      ctx.restore();

      // butt
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.fillStyle("white");
      ctx.beginPath();
      ctx.arc(0, bodyHeight / 2, bodyHeight / 2, (3 * PI) / 2, PI / 2, true);
      ctx.fill();
      ctx.restore();

      // head
      ctx.save();
      ctx.translate(d.x + bodyWidth, d.y);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, headHeight);
      ctx.lineTo(headWidth, headHeight);
      ctx.fill();

      ctx.restore();

      // whiskers
      ctx.save();
      ctx.translate(d.x + bodyWidth + headWidth - 5, d.y + headHeight - 2);

      ctx.beginPath();
      ctx.fillStyle("black");
      ctx.rotate((3 * PI) / 6);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, whiskerLength);
      ctx.rotate(PI / 12);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, whiskerLength);
      ctx.stroke();

      ctx.restore();

      // ear
      ctx.save();
      ctx.translate(d.x + bodyWidth - earOffset, d.y - 3);

      ctx.fillStyle("white");
      ctx.beginPath();
      ctx.arc(0, 0, earRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle("pink");
      ctx.beginPath();
      ctx.arc(0, 0, earRadius - 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // eye
      ctx.save();
      ctx.translate(d.x + bodyWidth, d.y + 10);

      const eyeRadius = 3;
      const eyeHighlightRadius = 1.7;
      ctx.fillStyle("black");
      ctx.beginPath();
      ctx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle("white");
      ctx.beginPath();
      ctx.arc(-1, -1, eyeHighlightRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // eye
      ctx.save();
      ctx.translate(d.x + bodyWidth + 6, d.y + 8);

      ctx.fillStyle("black");
      ctx.beginPath();
      ctx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle("white");
      ctx.beginPath();
      ctx.arc(-1, -1, eyeHighlightRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // tail
      ctx.save();
      ctx.translate(d.x - bodyHeight / 2, d.y + bodyHeight / 2);

      const tailCtl1 = {
        x: -20,
        y: 0,
      };

      const tailCtl2 = {
        x: -20,
        y: -20,
      };
      const tailRadius = 20;

      ctx.strokeStyle("pink");
      ctx.lineCap("round");
      ctx.lineWidth(3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arcTo(tailCtl1.x, tailCtl1.y, tailCtl2.x, tailCtl2.y, tailRadius);
      ctx.stroke();

      ctx.restore();

      // legs
      const legLength = 7;
      const footLength = 0;
      const legOffset = 3;
      const frontOffset = bodyWidth;
      ctx.save();
      ctx.translate(d.x, d.y + bodyHeight);
      const rotate = sin(t / 60);
      ctx.rotate(rotate);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, legLength);
      ctx.lineTo(footLength, legLength);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(d.x + legOffset, d.y + bodyHeight);
      ctx.rotate(-rotate);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, legLength);
      ctx.lineTo(footLength, legLength);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(d.x + frontOffset, d.y + bodyHeight);
      ctx.rotate(rotate);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, legLength);
      ctx.lineTo(footLength, legLength);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(d.x + frontOffset + legOffset, d.y + bodyHeight);
      ctx.rotate(-rotate);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, legLength);
      ctx.lineTo(footLength, legLength);
      ctx.stroke();
      ctx.restore();
    }
  };

  return draw;
};
