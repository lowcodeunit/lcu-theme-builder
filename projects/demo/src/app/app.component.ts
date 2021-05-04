import { Constants } from './../../../common/src/lib/utils/constants.utils';

// import { ThemeBuilderService } from './../../../common/src/lib/services/theme-builder.service';
// import { PalettePickerService } from './../../../common/src/lib/services/palette-picker.service';

import { Component, OnInit } from '@angular/core';
import { ThemeBuilderService, PaletteModel, ThemeModel } from '@lowcodeunit/theme-builder-common';

import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { take, switchMap, debounceTime } from 'rxjs/operators';


// const styleVariables = require('../assets/styles/variables.scss');

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  protected compiledDynamicCSS: string;
  protected ready: Subject<boolean>;
  protected source: string;

  constructor(protected themeBuilderService: ThemeBuilderService,
              protected zone: NgZone) {

      this.ready = new Subject();

      // hate this approach, but no other lifehooks are working - shannon
      window.onload = () => {
        this.ready.next(true);
      }
   }

  public ngOnInit(): void {
    this.initialTheme();

    this.ready
    .pipe(
      take(1),
      switchMap((val: boolean) => {
        return this.themeBuilderService.Theme
      }),
      debounceTime(100)
    )
    .subscribe((theme: ThemeModel) => {
      this.themeBuilderService.UpdateTheme(theme);
    });
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
}
