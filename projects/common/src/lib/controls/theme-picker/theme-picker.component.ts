import { VariantColorService } from './../../services/variant-color.service';
import { ThemeBuilderConstants } from './../../utils/theme-builder-constants.utils';
import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component, Input, OnInit } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
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
  * List of themes
  */
  public Themes: Array<ThemePickerModel>;


  // tslint:disable-next-line:no-input-rename
  @Input('toggle-manual-controls')
  public ToggleManualControls: boolean;

  /**
   * 
   * @param val _theming.scss from external source
   */
  // @Input('material-theme-stylesheet')
  // public set MaterialThemeStylesheet(val: any) {
  //   debugger;
  //   this.themeBuilderService.MaterialTheme = val;
  // }

  private _materialTheming: string;
  @Input('material-theming')
  get MaterialTheming(): string {
    return this._materialTheming;
  }

  set MaterialTheming(val: string) {

    this._materialTheming = val;
    // this.themeBuilderService.MaterialTheme = val;
  }

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

  constructor(
    protected palettePickerService: PalettePickerService,
    protected themeBuilderService: ThemeBuilderService,
    protected variantColorService: VariantColorService) {

      this.setupForm();
  }

  ngOnInit(): void {
    this.themes();
  }

  public SetActiveTheme(theme: ThemePickerModel): void {
    let palette: PaletteModel = new PaletteModel();
    palette = { ...this.palettePickerService.CurrentPalette, ...palette };

    const colors: Array<string> = [theme.Primary, theme.Accent, theme.Warn];

    palette.primary.main = theme.Primary;
    palette.accent.main = theme.Accent;
    palette.warn.main = theme.Warn;

    this.variantColorService.UpdatePrimaryVariants(theme.Primary);
    this.variantColorService.UpdateAccentVariants(theme.Accent);
    this.variantColorService.UpdateWarnVariants(theme.Warn);

    this.themeBuilderService.Palette = palette;
    this.themes();
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
    this.themeBuilderService.Themes.unshift(manualPalette);
    this.SetActiveTheme(manualPalette);
  }

  /**
   * Setup form controls
   */
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

    this.Themes = this.themeBuilderService.Themes;
  }

}
// function Input(arg0: string) {
//   throw new Error('Function not implemented.');
// }

