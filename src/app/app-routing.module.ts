import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaseComponent } from './chase/chase.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';


const routes: Routes = [
  { path: '', component: ChaseComponent },
  { path: 'conversion', component: ConversionComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
