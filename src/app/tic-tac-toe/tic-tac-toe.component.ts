import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Grid, Side } from './grid';
import { AI } from './ai';


@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  @ViewChild('gamePad', { static: false}) gamePad: ElementRef<HTMLCanvasElement>;

  sides: Array<Side>;

  private context: CanvasRenderingContext2D;
  private grid: Grid;

  player: Side;
  ai: AI;
  playerTurn: boolean;

  constructor(public dialog: MatDialog) {
    this.sides = [new Side('X', -1), new Side('O', 1)]

    this.grid = new Grid();

    this.player = this.sides[0];

    this.ai = new AI(this.sides[1]);

  }

  ngOnInit() {
    this.playerTurn = true;
  }

  startGame() : void {
    this.grid.reset();
    this.playerTurn = true;

    if (this.player === this.sides[0]) {
      this.ai.side = this.sides[1];
    } else if (this.player === this.sides[1]){
      this.ai.side = this.sides[0];
    }

    this.draw();

    if (this.ai.side === this.sides[0]) {
      this.playerTurn = false;
      this.ai.move(this.grid).then(() => {
        this.playerTurn = true;
        this.draw();
      });
    }
  }

  ngAfterViewInit() {
    this.context = this.gamePad.nativeElement.getContext('2d');
    this.startGame();
  }

  gameOver() : void {
    let msg = '';
    if (this.player.value === this.grid.whoWon()) {
      msg = 'You Won';
    } else if (this.ai.side.value === this.grid.whoWon()){
      msg = 'You Lose';
    } else {
      msg = 'Tie';
    }

    const dialogRef = this.dialog.open(GameOverDialog, {
      width: '200px',
      data: msg,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.startGame();
    });
  }

  handleClick(event: MouseEvent) : void {
    if (!this.playerTurn) return;

    let w = this.gamePad.nativeElement.width;
    let h = this.gamePad.nativeElement.height;

    let x = event.clientX - this.gamePad.nativeElement.offsetLeft;
    let y = event.clientY - this.gamePad.nativeElement.offsetTop;

    let j = Math.floor(x / (w / 3.0));
    let i = Math.floor(y / (h / 3.0));

    if (this.grid.move(i, j, this.player.value)) {
      this.playerTurn = false;

      this.draw();
      if (this.grid.gameOver()) {
        this.gameOver();
      } else {
        this.ai.move(this.grid).then(() => {
          this.playerTurn = true;
          this.draw();

          if (this.grid.gameOver()) {
            this.gameOver();
          }
        });
      }
    }
  }

  draw() : void {
    let w = this.gamePad.nativeElement.width;
    let h = this.gamePad.nativeElement.height;

    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.rect(0, 0, w, h);
    this.context.fill();

    this.context.lineWidth = 3.0;
    this.context.beginPath();
    this.context.moveTo(0, h / 3.0);
    this.context.lineTo(w, h / 3.0)

    this.context.moveTo(0, h * 2.0 / 3.0);
    this.context.lineTo(w, h * 2.0 / 3.0)

    this.context.moveTo(w / 3.0, 0);
    this.context.lineTo(w / 3.0, h);

    this.context.moveTo(w * 2.0 / 3.0, 0);
    this.context.lineTo(w * 2.0 / 3.0, h);
    this.context.stroke();

    this.context.font = '100px Arial';
    this.context.fillStyle = 'black';
    this.context.beginPath();

    const padding = 15;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        let x = j * w / 3.0 + padding;
        let y = i * h / 3.0 + h / 3.0 - padding;
        if (this.grid.getValue(i, j) === -1) {
          this.context.fillText('X', x, y);
        } else if (this.grid.getValue(i, j) === 1) {
          this.context.fillText('O', x, y);
        }
      }
    }
  }
}

@Component({
  selector: 'game-over',
  templateUrl: 'game-over.html',
})
export class GameOverDialog {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialog>,
    @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  ok(): void {
    this.dialogRef.close();
  }
}
