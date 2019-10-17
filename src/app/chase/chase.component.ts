import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-chase',
  templateUrl: './chase.component.html',
  styleUrls: ['./chase.component.css']
})
export class ChaseComponent implements OnInit {
  @ViewChild('it', { static: false }) it: ElementRef<HTMLImageElement>;

  private init: boolean;
  private moving: boolean;
  private x: number;
  private y: number;
  private targetX: number;
  private targetY: number;

  constructor(private renderer: Renderer2) {
    this.init = false;
    this.x = 0;
    this.y = 0;
    this.moving = false;
  }

  ngOnInit() { }


  move(event: MouseEvent) {
    if (!this.init) {
      this.x = this.it.nativeElement.offsetLeft;
      this.y = this.it.nativeElement.offsetTop;

      this.init = true;
    }

    this.targetX = event.clientX;
    this.targetY = event.clientY;
    if (!this.moving) {
      this.moving = true;
      this.moveToTarget();
    }
  }

  clip(value: number, min: number, max: number) : number {
    if (value > 0) {
      return Math.max(Math.min(max, value), min);
    } else {
      return Math.min(Math.max(-max, value), -min);
    }
  }

  moveToTarget() {
    let w = this.it.nativeElement.width;
    let h = this.it.nativeElement.height;
    let dx = this.targetX - (this.x + w / 2.0);
    let dy = this.targetY - (this.y + h / 2.0);
    let angle = Math.atan2(dy, dx);
    let dist = Math.sqrt(dx * dx + dy * dy);

    this.renderer.setStyle(this.it.nativeElement, 'transform', `rotate(${angle}rad)`);

    if (dist > w * 2.0 / 3.0) {
      const delta = this.clip(dist * 0.1, 0, 3);
      dx = delta * Math.cos(angle);
      dy = delta * Math.sin(angle);

      this.x += dx;
      this.y += dy;
      this.it.nativeElement.style.left = this.x + 'px';
      this.it.nativeElement.style.top = this.y + 'px';

      setTimeout(() => {
        this.moveToTarget();
      }, 10);
    } else {
      this.moving = false;
    }
  }
}
