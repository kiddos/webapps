import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionComponent } from './conversion.component';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

describe('ConversionComponent', () => {
  let component: ConversionComponent;
  let fixture: ComponentFixture<ConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCardModule,
      ],
      declarations: [ ConversionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
