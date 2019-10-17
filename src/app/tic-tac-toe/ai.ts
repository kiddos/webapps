import { Grid, Side } from './grid';

export class Move {
  constructor(public x: number, public y: number) {}
}

class MoveNode {
  public children: Array<MoveNode>;

  constructor(public move: Move, public score: number, public turn: number) {
    this.children = [];
  }
}

export class AI {
  constructor(public side: Side) {}

  computeScore(grid: Grid) : number {
    let who = grid.whoWon();
    if (who === this.side.value) {
      return 1.0
    } else if (who === 0) {
      return 0.0;
    } else {
      return -1.0;
    }
  }

  getPossibleMove(grid: Grid) : Array<Move> {
    let moves: Array<Move> = [];
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        if (grid.getValue(i, j) === 0) {
          moves.push(new Move(j, i));
        }
      }
    }
    return moves;
  }

  constructTree(grid: Grid, value: number) : Array<MoveNode> {
    let moves: Array<Move> = this.getPossibleMove(grid);

    let nodes: Array<MoveNode> = [];
    for (let i = 0; i < moves.length; ++i) {
      let simulated = grid.copy();
      simulated.move(moves[i].y, moves[i].x, value);
      let score = this.computeScore(simulated);

      let node = new MoveNode(moves[i], score, value);
      node.children = this.constructTree(simulated, -value);

      nodes.push(node);
    }
    return nodes;
  }

  choose(root: MoveNode) : Array<number> {
    if (root.score !== 0) {
      return [0, root.score];
    }

    let len = root.children.length;
    if (len > 0) {
      // max if its ai's turn
      if (root.children[0].turn === this.side.value) {
        let result = this.choose(root.children[0]);
        let maxIndex = 0;
        let maxScore = result[1];
        for (let i = 1; i < len; ++i) {
          let result = this.choose(root.children[i]);
          let score = result[1];
          if (score > maxScore) {
            maxScore = score;
            maxIndex = i;
          }
        }

        return [maxIndex, maxScore];
      }
      // min if its player's turn
      else if (root.children[0].turn === -this.side.value) {
        let result = this.choose(root.children[0]);
        let minIndex = 0;
        let minScore = result[1]
        for (let i = 1; i < len; ++i) {
          let result = this.choose(root.children[i]);
          let score = result[1];
          if (score < minScore) {
            minScore = score;
            minIndex = i;
          }
        }

        return [minIndex, minScore];
      }
    } else {
      return [0, root.score];
    }
  }

  minimax(grid: Grid) : Move {
    let nodes: Array<MoveNode> = this.constructTree(grid, this.side.value);
    // console.log(nodes, this.side);
    let root = new MoveNode(new Move(0, 0), 0, 0);
    root.children = nodes;

    let result = this.choose(root);
    // console.log(result);
    let index = result[0];
    let score = result[1];

    return nodes[index].move;
  }

  selectMove(grid: Grid) : Move {
    let moves: Array<Move> = this.getPossibleMove(grid);

    let move: Move = this.minimax(grid);

    // random move
    // let index = Math.floor(Math.random() * moves.length);
    // return moves[index];
    return move;
  }

  move(grid: Grid) : Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        let move: Move = this.selectMove(grid);
        grid.move(move.y, move.x, this.side.value);
        resolve();
      });
    });
  }
}
