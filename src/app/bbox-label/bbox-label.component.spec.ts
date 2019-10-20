import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BBoxLabelComponent, HelpDialog } from './bbox-label.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('BboxLabelComponent', () => {
  let component: BBoxLabelComponent;
  let fixture: ComponentFixture<BBoxLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatInputModule,
        MatIconModule,
      ],
      declarations: [
        BBoxLabelComponent,
        HelpDialog,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BBoxLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
