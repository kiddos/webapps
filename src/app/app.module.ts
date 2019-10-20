import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { ChaseComponent } from './chase/chase.component';
import { ConversionComponent } from './conversion/conversion.component';
import { TicTacToeComponent, GameOverDialog } from './tic-tac-toe/tic-tac-toe.component';
import { BBoxLabelComponent, HelpDialog } from './bbox-label/bbox-label.component';

@NgModule({
  declarations: [
    AppComponent,
    ChaseComponent,
    ConversionComponent,
    TicTacToeComponent,
    GameOverDialog,
    BBoxLabelComponent,
    HelpDialog,
  ],
  entryComponents: [
    GameOverDialog,
    HelpDialog,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
