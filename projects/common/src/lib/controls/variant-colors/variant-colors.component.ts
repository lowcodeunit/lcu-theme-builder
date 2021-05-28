
import { PalettePickerService } from '../../services/palette-picker.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { PaletteTemplateService } from '../../services/palette-template.service';
import { Subscription } from 'rxjs';
import { PaletteModel } from '../../models/palette.model';
import { PaletteColorMapModel } from '../../models/palette-color-map.model';
import { MaterialPaletteModel } from '../../models/material-palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { ColorModel } from '../../models/color.model';

const tinyColor = tinycolor;

// const styleVariables = require('./assets/styles/dynamic-theme.scss');

/**
 * String literal data type
 */
type ModeType = 'dark' | 'light';

@Component({
  selector: 'lcu-variant-colors',
  templateUrl: './variant-colors.component.html',
  styleUrls: ['./variant-colors.component.scss']
})

export class VariantColorsComponent implements OnInit, OnDestroy {

  private _accentColor: string;
  private _primaryColor: string;
  private _warnColor: string;

// tslint:disable-next-line:no-input-rename
@Input('accent-color')
set AccentColor(val: string) {
  this._accentColor = val;
  this.updateAccentColor(val);
}

get AccentColor(): string {
  return this._accentColor;
}

// tslint:disable-next-line:no-input-rename
@Input('primary-color')
set PrimaryColor(val: string) {
  this._primaryColor = val;
  this.updatePrimaryColor(val);
}

get PrimaryColor(): string {
  return this.PrimaryColor;
}

// tslint:disable-next-line:no-input-rename
@Input('warn-color')
set WarnColor(val: string) {
  this._warnColor = val;
  this.updateWarnColor(val);
}

get WarnColor(): string {
  return this.WarnColor;
}

/**
 * Access primary color field
 */
public get PrimaryColorControl(): AbstractControl {
  return this.Form.get('primaryColorControl');
}

/**
 * Access accent color field
 */
public get AccentColorControl(): AbstractControl {
  return this.Form.get('accentColorControl');
}

/**
 * property for reactive form
 */
public Form: FormGroup;

protected paletteChangedSubscription: Subscription;

  constructor(
    public PalettePickerService: PalettePickerService,
    protected themeBuilderService: ThemeBuilderService) {
    this.PalettePickerService.PrimaryColorPalette = [];
    this.PalettePickerService.AccentColorPalette = [];
    this.PalettePickerService.WarnColorPalette = [];
  }

 public ngOnInit(): void {
    this.setupForm();

    this.paletteChangedSubscription = this.PalettePickerService.ColorPickerChanged
    .subscribe((palette: PaletteModel) => {

      if (!palette || !palette.primary) {
        return;
      }

      this.updateAccentColor(palette.accent.main);
      this.updatePrimaryColor(palette.primary.main);
      this.updateWarnColor(palette.warn.main);
    });
  }

  public ngOnDestroy(): void {
    this.paletteChangedSubscription.unsubscribe();
  }

  protected updatePrimaryColor(color: string): void {
    this.PalettePickerService.PrimaryColorPalette = this.computeColors(color ? color : this.PrimaryColorControl.value);

    for (const c of this.PalettePickerService.PrimaryColorPalette) {
      const key = `--theme-primary-${c.name}`;
      const value = c.hex;
      const key2 = `--theme-primary-contrast-${c.name}`;
      const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';

      // set or update CSS variable values
      document.documentElement.style.setProperty(key, value);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  protected updateAccentColor(color: string): void {
    this.PalettePickerService.AccentColorPalette = this.computeColors(color ? color : this.AccentColorControl.value);

    for (const c of this.PalettePickerService.AccentColorPalette) {
      const key = `--theme-accent-${c.name}`;
      const value = c.hex;
      const key2 = `--theme-primary-contrast-${c.name}`;
      const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key, value);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  protected updateWarnColor(color: string): void {
    this.PalettePickerService.WarnColorPalette = this.computeColors(color);

    for (const c of this.PalettePickerService.WarnColorPalette) {
      const key = `--theme-warn-${c.name}`;
      const value = c.hex;
      const key2 = `--theme-primary-contrast-${c.name}`;
      const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key, value);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  protected setupForm(): void {
    this.Form = new FormGroup({
      primaryColorControl: new FormControl('#ffcc11'),
      accentColorControl: new FormControl('#0000aa')
    });
  }

  protected computeColors(color: string): Array<ColorModel> {

    const baseLightColor = tinyColor('#ffffff');
    const baseDarkColor = this.themeBuilderService.multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
    const [, , , baseTetrad] = tinyColor(color).tetrad();

    return [
      this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 12), '50'),
      this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 30), '100'),
      this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 50), '200'),
      this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 70), '300'),
      this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 85), '400'),
      this.getColorObject(tinyColor(color), '500'),
      this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 87), '600'),
      this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 70), '700'),
      this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 54), '800'),
      this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 25), '900'),
      this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
      this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
      this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
      this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
    ];
  }
// force change
  protected getColorObject(value: tinycolor.Instance, name: string): ColorModel {
    const c = tinyColor(value);
    return {
      name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }
}
