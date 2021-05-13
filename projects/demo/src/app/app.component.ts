import { Constants } from './../../../common/src/lib/utils/constants.utils';
import { Component, OnInit } from '@angular/core';




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
}
