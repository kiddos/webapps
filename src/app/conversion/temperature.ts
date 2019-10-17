import { Conversion } from './conversion';

export class Temperature extends Conversion {
  constructor() {
    super();

    this.name = 'Temperature';
    this.units = ['Celsius', 'Fahrenheit', 'Kelvin'];
  }

  convert(unit1: string, unit2: string, value: number) : number {
    if (unit1 === this.units[0] && unit2 === this.units[1]) {
      return value * 9.0 / 5.0 + 32;
    } else if (unit1 === this.units[1] && unit2 === this.units[0]) {
      return (value - 32) * 5.0 / 9.0;
    } else if (unit1 === this.units[0] && unit2 === this.units[2]) {
      return value + 273.15;
    } else if (unit1 === this.units[2] && unit2 === this.units[0]) {
      return value - 273.15;
    } else if (unit1 === this.units[1] && unit2 === this.units[2]) {
      return (value - 32) * 5.0 / 9.0 + 273.15;
    } else if (unit1 === this.units[2] && unit2 === this.units[1]) {
      return (value - 273.15) * 9.0 / 5.0 + 32;
    }
    return value;
  }
}
