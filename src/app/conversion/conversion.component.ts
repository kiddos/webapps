import { Component, OnInit } from '@angular/core';

import { Conversion } from './conversion';
import { Temperature } from './temperature';
import { Length } from './length';

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
  conversion: Array<Conversion>;
  current: Conversion;

  part1: Part = new Part();
  part2: Part = new Part();

  constructor() {
    this.conversion = [new Temperature(), new Length()];

    this.chooseConversion(0);
  }

  ngOnInit() {
  }

  chooseConversion(index: number) : void {
    this.current = this.conversion[index];

    this.part1.unit = this.current.units[0];
    this.part2.unit = this.current.units[1];

    this.part1.value = this.current.defaultValue;
    this.part2.value = this.current.convert(
      this.part1.unit, this.part2.unit, this.current.defaultValue);
  }

  convert(fromPart: Part, toPart: Part) : void {
    let v = this.current.convert(
      fromPart.unit, toPart.unit, fromPart.value);

    let precision = 3;
    let s = fromPart.value.toString();
    if (s.indexOf('.') >= 0) {
      precision = s.length - s.indexOf('.');
    }
    v = parseFloat(v.toFixed(precision));
    toPart.value = v;
  }
}
