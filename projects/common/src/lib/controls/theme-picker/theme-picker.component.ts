import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component, OnInit } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Constants } from '../../utils/constants.utils';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  /**
   * property for reactive form
   */
  public ManualForm: FormGroup;


/**
 * Access manual accent color field
 */
public get ManualAccent(): AbstractControl {
  return this.ManualForm.get('manualAccent');
}

/**
 * Access manual primary color field
 */
 public get ManualPrimary(): AbstractControl {
  return this.ManualForm.get('manualPrimary');
}

/**
 * Access manual theme name field
 */
public get ManualThemeName(): AbstractControl {
  return this.ManualForm.get('manualThemeName');
}

/**
 * Access manual warn color field
 */
public get ManualWarn(): AbstractControl {
  return this.ManualForm.get('manualWarn');
}


  public Themes: Array<ThemePickerModel>;

  constructor(
    protected palettePickerService: PalettePickerService,
    protected themeBuilderService: ThemeBuilderService) {

      this.setupForm();
      this.themes();
  }

  ngOnInit(): void {
  }

  public SetActiveTheme(theme: ThemePickerModel): void {
    let palette: PaletteModel = new PaletteModel();
    palette = { ...this.palettePickerService.CurrentPalette, ...palette };

    palette.primary.main = theme.Primary;
    palette.accent.main = theme.Accent;
    palette.warn.main = theme.Warn;

  // this.palettePickerService.PalettePickerChange(palette);

  this.themeBuilderService.Palette = palette;
  }

  /**
   * Manually create theme, by using inputs
   */
  public SetManualTheme(): void {
    let manualPalette: ThemePickerModel;
    manualPalette = new ThemePickerModel(
      {
        ID: this.ManualThemeName.value,
        Primary: this.ManualPrimary.value,
        Accent: this.ManualAccent.value,
        Warn: this.ManualWarn.value
      }
    )
    this.Themes.unshift(manualPalette);
    this.SetActiveTheme(manualPalette);
  }

  protected setupForm(): void {

    this.ManualForm = new FormGroup({
      manualThemeName: new FormControl('', {validators: Validators.required}),
      manualPrimary: new FormControl(
        '',
        {validators: Validators.required}),
      manualAccent: new FormControl(
        '',
        {validators: Validators.required}),
      manualWarn: new FormControl(
        '',
        {validators: Validators.required})
    });
  }

  /**
   * Create themes for theme picker
   */
  protected themes(): void {
    this.Themes = [
      new ThemePickerModel(
        {
          ID: 'Fathym Brand',
          Primary: Constants.document.getPropertyValue('--initial-primary'),
          Accent: Constants.document.getPropertyValue('--initial-accent'),
          Warn: Constants.document.getPropertyValue('--initial-warn')
        }
      ),
      new ThemePickerModel(
        {
          ID: 'Yellow', 
          Primary: '#ffcc11', 
          Accent: '#06a5ff', 
          Warn: '#990000'
        }
      ),
      new ThemePickerModel(
        {
          ID: 'Pink', 
          Primary: '#a83271', 
          Accent: '#6103ff', 
          Warn: '#b9f013'
        }
      )
    ];
  }

}
