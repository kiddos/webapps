import { Component, OnInit } from '@angular/core';

import { Conversion } from './conversion';
import { Temperature } from './temperature';

class Part {
  public value: number;
  public unit: string;
}

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  private conversion: Array<Conversion>;
  private current: Conversion;

  private part1: Part = new Part();
  private part2: Part = new Part();

  constructor() {
    this.conversion = [new Temperature()];

    this.chooseConversion(0);
  }

  ngOnInit() {
  }

  chooseConversion(index: number) : void {
    this.current = this.conversion[index];

    this.part1.unit = this.current.units[0];
    this.part2.unit = this.current.units[1];

    this.part1.value = 0;
    this.part2.value = this.current.convert(
      this.part1.unit, this.part2.unit, 0);
  }

  convert(fromPart: Part, toPart: Part) : void {
    let v = this.current.convert(
      fromPart.unit, toPart.unit, fromPart.value);
    v = parseFloat(v.toFixed(3));
    toPart.value = v;
  }
}
