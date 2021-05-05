import { Constants } from './../../../common/src/lib/utils/constants.utils';

// import { ThemeBuilderService } from './../../../common/src/lib/services/theme-builder.service';
// import { PalettePickerService } from './../../../common/src/lib/services/palette-picker.service';

import { Component, OnInit } from '@angular/core';
import { ThemeBuilderService, PaletteModel, ThemeModel, PalettePickerService } from '@lowcodeunit/theme-builder-common';

import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { take, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


// const styleVariables = require('../assets/styles/variables.scss');

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public Title: string;

  constructor(protected themeBuilderService: ThemeBuilderService,
    protected palettePickerService: PalettePickerService) {

    this.Title = 'Theme Builder';
  }

  public ngOnInit(): void {

    this.initialTheme();
  }

  /**
   * Setup the initial theme based on initial values
   * 
   * This will also setup the initial CSS variables
   */
  protected initialTheme(): void {
    let palette: PaletteModel = new PaletteModel();
    palette = { ...Constants.InitialValues, ...palette };

    this.themeBuilderService.Palette = palette;

  }

  /**
   * Change palette
   * 
   * @param type primary color
   */
  public ChangeThemeColors(type: string): void {

    let palette: PaletteModel = new PaletteModel();
    palette = { ...Constants.InitialValues, ...palette };

    if (type === 'yellow') {
      palette.primary.main = '#ffcc11';
      palette.accent.main = '#990066';
      palette.warn.darker = '#990000';

    } else {
      palette.primary.main = '#a83271';
      palette.accent.main = '#3298a8';
      palette.warn.darker = '#b9f013';
    }

        this.palettePickerService.PalettePickerChange(palette);
    // this.palettePickerService.NewPalette(palette);
    // this.themeBuilderService.Palette = palette;
    // document.documentElement.style.setProperty('--initial-primary', '#ffcc11');
    // document.documentElement.style.setProperty('--initial-accent', '#990066');

    // this.initialTheme();
  }
}
