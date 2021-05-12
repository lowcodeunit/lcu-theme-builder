import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component, OnInit } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';

@Component({
  selector: 'lcu-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

public Themes: Array<ThemePickerModel>;

  constructor(
    protected palettePickerService: PalettePickerService,
    protected themeBuilderService: ThemeBuilderService) {

    this.Themes = [
      new ThemePickerModel({ID: 'Yellow', Primary: '#ffcc11', Accent: '#06a5ff', Warn: '#990000'}),
      new ThemePickerModel({ID: 'Pink', Primary: '#a83271', Accent: '#6103ff', Warn: '#b9f013'})
    ];
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

}
