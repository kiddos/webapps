import { Conversion } from './conversion';

export class Length extends Conversion {
  constructor() {
    super();

    this.name = 'Length';
    this.units = ['Centimeter', 'Meter', 'Kilometer', 'Inch', 'Foot', 'Mile'];
    this.defaultValue = 1.0;
  }

  convert(unit1: string, unit2: string, value: number) : number {
    if (unit1 === this.units[0] && unit2 === this.units[1]) {
      return value / 100.0;
    } else if (unit1 === this.units[1] && unit2 === this.units[0]) {
      return value * 100.0
    } else if (unit1 === this.units[0] && unit2 === this.units[2]) {
      return value / 100000.0;
    } else if (unit1 === this.units[2] && unit2 === this.units[0]) {
      return value * 100000.0;
    } else if (unit1 === this.units[0] && unit2 === this.units[3]) {
      return value / 2.54;
    } else if (unit1 === this.units[3] && unit2 === this.units[0]) {
      return value * 2.54;
    } else if (unit1 === this.units[0] && unit2 === this.units[4]) {
      return value / 30.48;
    } else if (unit1 === this.units[4] && unit2 === this.units[0]) {
      return value * 30.48;
    } else if (unit1 === this.units[0] && unit2 === this.units[5]) {
      return value / 160934.4;
    } else if (unit1 === this.units[5] && unit2 === this.units[0]) {
      return value * 160934.4;
    } else if (unit1 === this.units[1] && unit2 === this.units[2]) {
      return value / 1000.0;
    } else if (unit1 === this.units[2] && unit2 === this.units[1]) {
      return value * 1000.0;
    } else if (unit1 === this.units[1] && unit2 === this.units[3]) {
      return value * 39.37;
    } else if (unit1 === this.units[3] && unit2 === this.units[1]) {
      return value / 39.37;
    } else if (unit1 === this.units[1] && unit2 === this.units[4]) {
      return value * 3.281;
    } else if (unit1 === this.units[4] && unit2 === this.units[1]) {
      return value / 3.281;
    } else if (unit1 === this.units[1] && unit2 === this.units[5]) {
      return value / 1609.344;
    } else if (unit1 === this.units[5] && unit2 === this.units[1]) {
      return value * 1609.344;
    } else if (unit1 === this.units[2] && unit2 === this.units[3]) {
      return value * 39370.079;
    } else if (unit1 === this.units[3] && unit2 === this.units[2]) {
      return value / 39370.079;
    } else if (unit1 === this.units[2] && unit2 === this.units[4]) {
      return value * 3280.84;
    } else if (unit1 === this.units[4] && unit2 === this.units[2]) {
      return value / 3280.84;
    } else if (unit1 === this.units[2] && unit2 === this.units[5]) {
      return value / 1.60934;
    } else if (unit1 === this.units[5] && unit2 === this.units[2]) {
      return value * 1.60934;
    } else if (unit1 === this.units[3] && unit2 === this.units[4]) {
      return value / 12.0;
    } else if (unit1 === this.units[4] && unit2 === this.units[3]) {
      return value * 12.0;
    } else if (unit1 === this.units[3] && unit2 === this.units[5]) {
      return value / 63360;
    } else if (unit1 === this.units[5] && unit2 === this.units[3]) {
      return value * 63360;
    } else if (unit1 === this.units[4] && unit2 === this.units[5]) {
      return value / 5280;
    } else if (unit1 === this.units[5] && unit2 === this.units[4]) {
      return value * 5280;
    }
    return value;
  }
}
