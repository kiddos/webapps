export class Side {
  constructor(public name: string, public value: number) {}
}

export class Grid {
  public grid: Array<Array<number>>;

  constructor() {
    this.grid = [];
    for (let i = 0; i < 3; ++i) {
      let a = []
      for (let j = 0; j < 3; ++j) {
        a.push(0);
      }
      this.grid.push(a);
    }
  }

  reset() {
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        this.grid[i][j] = 0;
      }
    }
  }

  getValue(i: number, j: number) : number {
    return this.grid[i][j];
  }

  move(i: number, j: number, value: number) : boolean {
    if (this.grid[i][j] === 0) {
      this.grid[i][j] = value;
      return true;
    }
    return false;
  }

  gameOver() : boolean {
    let who = this.whoWon();
    if (who !== 0) {
      return true;
    }

    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (this.grid[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  whoWon() : number {
    for (let i = 0; i < 3; ++i) {
      let found = true;
      let z = this.grid[i][0];
      if (z !== 0) {
        for (let j = 1; j < 3; ++j) {
          if (this.grid[i][j] !== z) {
            found = false;
            break;
          }
        }

        if (found) {
          return z;
        }
      }

      found = true;
      z = this.grid[0][i];
      if (z !== 0) {
        for (let j = 1; j < 3; ++j) {
          if (this.grid[j][i] !== z) {
            found = false;
            break;
          }
        }

        if (found) {
          return z;
        }
      }
    }

    if (this.grid[0][0] === this.grid[1][1] && this.grid[1][1] == this.grid[2][2]) {
      return this.grid[0][0];
    }

    if (this.grid[0][2] === this.grid[1][1] && this.grid[1][1] == this.grid[2][0]) {
      return this.grid[0][2];
    }

    return 0;
  }

  copy() : Grid {
    let grid = new Grid();
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        grid.grid[i][j] = this.grid[i][j];
      }
    }
    return grid;
  }
}
