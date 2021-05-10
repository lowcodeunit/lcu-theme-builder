import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantColorsComponent } from './variant-colors.component';

describe('DynamicThemeColorsComponent', () => {
  let component: VariantColorsComponent;
  let fixture: ComponentFixture<VariantColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariantColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
