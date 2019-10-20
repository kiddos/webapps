import { Point } from './point';

export class BBox {
  p2: Point;
  p4: Point;

  constructor(public p1: Point, public p3: Point) {
    this.p2 = new Point(p3.x, p1.y);
    this.p4 = new Point(p1.x, p3.y);
  }

  draw(context: CanvasRenderingContext2D, mode: string) {
    context.globalAlpha = 0.9;

    if (mode == 'Add') {
      context.strokeStyle = '#B900FF';
    } else if (mode === 'Edit') {
      context.strokeStyle = '#FF002B';
    }

    context.beginPath();
    context.moveTo(this.p1.x, this.p1.y);
    context.lineTo(this.p2.x, this.p2.y);
    context.lineTo(this.p3.x, this.p3.y);
    context.lineTo(this.p4.x, this.p4.y);
    context.lineTo(this.p1.x, this.p1.y);
    context.stroke();
  }

  anchorMove(anchor: number, dx: number, dy: number) {
    if (anchor === 0) {
      this.p1.x += dx;
      this.p1.y += dy;
      this.p2.y += dy;
      this.p4.x += dx;
    } else if (anchor === 1) {
      this.p2.x += dx;
      this.p2.y += dy;
      this.p1.y += dy;
      this.p3.x += dx;
    } else if (anchor === 2) {
      this.p3.x += dx;
      this.p3.y += dy;
      this.p4.y += dy;
      this.p2.x += dx;
    } else if (anchor === 3) {
      this.p4.x += dx;
      this.p4.y += dy;
      this.p3.y += dy;
      this.p1.x += dx;
    }
  }

  toString() {
    return `(${this.p1.x.toFixed(2)}, ${this.p1.y.toFixed(2)}), ` +
      `(${this.p2.x.toFixed(2)}, ${this.p2.y.toFixed(2)}), ` +
      `(${this.p3.x.toFixed(2)}, ${this.p3.y.toFixed(2)}), ` +
      `(${this.p4.x.toFixed(2)}, ${this.p4.y.toFixed(2)})`;
  }
}
