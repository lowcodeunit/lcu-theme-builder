import { ThemeBuilderService } from '@lowcodeunit/theme-builder-common';
import { PalettePickerService } from './../../services/palette-picker.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { PaletteTemplateService } from '../../services/palette-template.service';
import { Subscription } from 'rxjs';
import { PaletteModel } from '../../models/palette.model';
import { PaletteColorMapModel } from '../../models/palette-color-map.model';
import { MaterialPaletteModel } from '../../models/material-palette.model';
import { Constants } from '../../utils/constants.utils';

const tinyColor = tinycolor;
// const styleVariables = require('./assets/styles/dynamic-theme.scss');

export interface Color {
  name: string;
  hex: string;
  darkContrast: boolean;
}

/**
 * String literal data type
 */
type ModeType = 'dark' | 'light';

@Component({
  selector: 'lcu-dynamic-theme-colors',
  templateUrl: './dynamic-theme-colors.component.html',
  styleUrls: ['./dynamic-theme-colors.component.scss']
})

export class DynamicThemeColorsComponent implements OnInit, OnDestroy {

  private _accentColor: string;
  private _primaryColor: string;
  private _warnColor: string;

// tslint:disable-next-line:no-input-rename
@Input('accent-color')
set AccentColor(val: string) {
  this._accentColor = val;
  this.UpdateAccentColor(val);
}

get AccentColor(): string {
  return this._accentColor;
}

// tslint:disable-next-line:no-input-rename
@Input('primary-color')
set PrimaryColor(val: string) {
  this._primaryColor = val;
  this.UpdatePrimaryColor(val);
}

get PrimaryColor(): string {
  return this.PrimaryColor;
}

// tslint:disable-next-line:no-input-rename
@Input('warn-color')
set WarnColor(val: string) {
  this._warnColor = val;
  this.UpdateWarnColor(val);
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
 * Access secondary color field
 */
public get SecondaryColorControl(): AbstractControl {
  return this.Form.get('secondaryColorControl');
}

/**
 * property for reactive form
 */
public Form: FormGroup;
public PrimaryColorPalette: Array<Color>;
public SecondaryColorPalette: Array<Color>;
public WarnColorPalette: Array<Color>;

protected paletteChangedSubscription: Subscription;

  constructor(
    protected palettePickerService: PalettePickerService,
    protected themeBuilderService: ThemeBuilderService) {
    this.PrimaryColorPalette = [];
    this.SecondaryColorPalette = [];
    this.WarnColorPalette = [];
  }

  ngOnInit(): void {
    this.setupForm();

    this.paletteChangedSubscription = this.palettePickerService.PaletteChanged.subscribe((palette: PaletteModel) => {
      this.UpdateAccentColor(palette.accent.main);
      this.UpdatePrimaryColor(palette.primary.main);
      this.UpdateWarnColor(palette.warn.main);
    });
  }

  public ngOnDestroy(): void {
    this.paletteChangedSubscription.unsubscribe();
  }

  public UpdatePrimaryColor(color: string): void {
    this.PrimaryColorPalette = this.computeColors(color ? color : this.PrimaryColorControl.value);

    for (const c of this.PrimaryColorPalette) {
      const key = `--theme-primary-${c.name}`;
      const value = c.hex;
      const key2 = `--theme-primary-contrast-${c.name}`;
      const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';

      // set or update CSS variable values
      document.documentElement.style.setProperty(key, value);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  public UpdateAccentColor(color: string): void {
    this.SecondaryColorPalette = this.computeColors(color ? color : this.SecondaryColorControl.value);

    for (const c of this.SecondaryColorPalette) {
      const key = `--theme-secondary-${c.name}`;
      const value = c.hex;
      const key2 = `--theme-primary-contrast-${c.name}`;
      const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
      document.documentElement.style.setProperty(key, value);
      document.documentElement.style.setProperty(key2, value2);
    }
  }

  public UpdateWarnColor(color: string): void {
    this.WarnColorPalette = this.computeColors(color);

    for (const c of this.WarnColorPalette) {
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
      secondaryColorControl: new FormControl('#0000aa')
    });
  }

  protected computeColors(color: string): Array<Color> {

    // for (let i = 0; i < 101; i++) {
    //   console.log(color + ' light ' + i,
    //     this.getColorObject(tinyColor(color).lighten(i), String(i)).hex, color + ' dark ' + i,
    //     this.getColorObject(tinyColor(color).darken(i), String(i)).hex
    //     );
    // }

    return [
      this.getColorObject(tinyColor(color).lighten(45), '50'),
      this.getColorObject(tinyColor(color).lighten(37), '100'),
      this.getColorObject(tinyColor(color).lighten(26), '200'),
      this.getColorObject(tinyColor(color).lighten(12), '300'),
      this.getColorObject(tinyColor(color).lighten(6), '400'),
      this.getColorObject(tinyColor(color), '500'),
      this.getColorObject(tinyColor(color).darken(6), '600'),
      this.getColorObject(tinyColor(color).darken(12), '700'),
      this.getColorObject(tinyColor(color).darken(18), '800'),
      this.getColorObject(tinyColor(color).darken(24), '900'),
      this.getColorObject(tinyColor(color).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinyColor(color).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinyColor(color).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinyColor(color).lighten(5).saturate(5), 'A700')
    ];
  }

  protected getColorObject(value: tinycolor.Instance, name: string): Color {

    // console.log('instance ', value);
    // console.log(tinyColor(value));
    
    const c = tinyColor(value);
    return {
      name,
      hex: c.toHexString(),
      darkContrast: c.isLight()
    };
  }
}
