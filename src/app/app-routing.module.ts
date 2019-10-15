import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChaseComponent } from './chase/chase.component';


const routes: Routes = [
  { path: '', component: ChaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
