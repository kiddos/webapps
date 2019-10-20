import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BBoxLabelComponent } from './bbox-label.component';

describe('BboxLabelComponent', () => {
  let component: BBoxLabelComponent;
  let fixture: ComponentFixture<BBoxLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BBoxLabelComponent ]
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
