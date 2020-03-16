import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalettPickerComponent } from './palett-picker.component';

describe('PalettPickerComponent', () => {
  let component: PalettPickerComponent;
  let fixture: ComponentFixture<PalettPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalettPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalettPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
