import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicThemeColorsComponent } from './dynamic-theme-colors.component';

describe('DynamicThemeColorsComponent', () => {
  let component: DynamicThemeColorsComponent;
  let fixture: ComponentFixture<DynamicThemeColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicThemeColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicThemeColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
