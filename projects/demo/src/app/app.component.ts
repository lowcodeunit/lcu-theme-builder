import { HttpClient } from '@angular/common/http';
import { 
  ThemeBuilderService, 
  PalettePickerService, 
  ThemeBuilderConstants, 
  ThemePickerModel } from '@lowcodeunit/lcu-theme-builder-common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public Title: string;

  public ThemingURL: string;

  constructor(
    protected themeBuilderService: ThemeBuilderService,
    protected palettePickerService: PalettePickerService,
    protected http: HttpClient,) {

    this.Title = 'Theme Builder';
  }

  public ngOnInit(): void {
      this.setupThemes();
  }

  /**
   * Setup array of themes
   */
  protected setupThemes(): void {
    const themes: Array<ThemePickerModel> = [
      new ThemePickerModel(
        {
          ID: 'Fathym Brand',
          Primary: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'),
          Accent: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'),
          Warn: ThemeBuilderConstants.document.getPropertyValue('--initial-warn')
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
    ]

    // set where Angular Material _theming.scss is coming from, this is needed in setting up
    // our own dynamic theme - essentially, our theme overwrites this one
    this.themeBuilderService.MaterialTheme = 'https://www.iot-ensemble.com/assets/theming/theming.scss';

    this.themeBuilderService.SetThemes(themes);
  }

}
