import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaseComponent } from './chase/chase.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { BBoxLabelComponent } from './bbox-label/bbox-label.component';
import { PneumoniaComponent } from './pneumonia/pneumonia.component';


const routes: Routes = [
  {
    path: '',
    component: ChaseComponent,
    data: { title: "kiddo's webapps"},
  },
  {
    path: 'conversion',
    component: ConversionComponent,
    data: { title: 'Conversion' },
  },
  {
    path: 'tic-tac-toe',
    component: TicTacToeComponent,
    data: { title: 'Tic Tac Toe'},
  },
  {
    path: 'bbox-label',
    component: BBoxLabelComponent,
    data: { title: 'Bounding Box Label'},
  },
  {
    path: 'pneumonia',
    component: PneumoniaComponent,
    data: { title: 'Detect Pneumonia From Xray'},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
