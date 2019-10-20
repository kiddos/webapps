import { BBox } from './bbox';
import { Point } from './point';

class SearchResult {
  constructor(public point: Point, public bbox: BBox, public anchor: number) {}
}

export class Label {
  imageName: string;
  bboxes: Array<BBox>;

  constructor() {
    this.imageName = '';
    this.bboxes = [];
  }

  computeDist(p1: Point, p2: Point) {
    let dx = p1.x - p2.x;
    let dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  close(p1: Point, p2: Point) {
    let dist = this.computeDist(p1, p2);
    return dist < 10;
  }

  findClosest(p: Point) : SearchResult {
    let closestPoint: Point = null;
    let closestBBox: BBox = null;
    let anchor: number = 0;
    let minDist = 800;
    for (let i = 0; i < this.bboxes.length; ++i) {
      if (this.close(p, this.bboxes[i].p1)) {
        if (this.computeDist(this.bboxes[i].p1, p) < minDist) {
          closestPoint = this.bboxes[i].p1;
          closestBBox = this.bboxes[i];
          anchor = 0;
          minDist = this.computeDist(this.bboxes[i].p1, p);
        }
      } else if (this.close(p, this.bboxes[i].p2)) {
        if (this.computeDist(this.bboxes[i].p2, p) < minDist) {
          closestPoint = this.bboxes[i].p2;
          closestBBox = this.bboxes[i];
          anchor = 1;
          minDist = this.computeDist(this.bboxes[i].p2, p);
        }
      } else if (this.close(p, this.bboxes[i].p3)) {
        if (this.computeDist(this.bboxes[i].p3, p) < minDist) {
          closestPoint = this.bboxes[i].p3;
          closestBBox = this.bboxes[i];
          anchor = 2;
          minDist = this.computeDist(this.bboxes[i].p3, p);
        }
      } else if (this.close(p, this.bboxes[i].p4)) {
        if (this.computeDist(this.bboxes[i].p4, p) < minDist) {
          closestPoint = this.bboxes[i].p4;
          closestBBox = this.bboxes[i];
          anchor = 3;
          minDist = this.computeDist(this.bboxes[i].p4, p);
        }
      }
    }

    let closest = new SearchResult(closestPoint, closestBBox, anchor);
    return closest;
  }

  addBBox(bbox: BBox) {
    this.bboxes.push(bbox);
  }

  clearBBoxes() {
    this.bboxes = [];
  }

  static fromJSONObject(obj) : Label {
    let label = new Label();
    label.imageName = obj.imageName;
    for (let i = 0; i < obj.bboxes.length; ++i) {
      let p1 = new Point(obj.bboxes[i].p1.x, obj.bboxes[i].p1.y);
      let p2 = new Point(obj.bboxes[i].p2.x, obj.bboxes[i].p2.y);
      let p3 = new Point(obj.bboxes[i].p3.x, obj.bboxes[i].p3.y);
      let p4 = new Point(obj.bboxes[i].p4.x, obj.bboxes[i].p4.y);

      let bbox = new BBox(p1, p3);
      bbox.p2 = p2;
      bbox.p4 = p4;
      label.bboxes.push(bbox);
    }
    return label;
  }
}
