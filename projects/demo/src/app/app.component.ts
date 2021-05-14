import { ThemeBuilderService, PalettePickerService, PaletteModel, ThemeBuilderConstants } from '@lowcodeunit/lcu-theme-builder-common';
import { Component, OnInit } from '@angular/core';

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
    palette = { ...ThemeBuilderConstants.InitialValues, ...palette };

    this.themeBuilderService.Palette = palette;
  }
}
