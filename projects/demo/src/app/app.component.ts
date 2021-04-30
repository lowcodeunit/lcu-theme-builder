// import { ThemeBuilderService } from './../../../common/src/lib/services/theme-builder.service';
// import { PalettePickerService } from './../../../common/src/lib/services/palette-picker.service';

import { Component, OnInit } from '@angular/core';
import { ThemeBuilderService, PalettePickerService, PaletteModel, SubPaletteModel } from '@lowcodeunit/theme-builder-common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ThemeColorPickerService } from '@lcu/common';


// const styleVariables = require('../assets/styles/variables.scss');

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public ThemeClass: BehaviorSubject<string>;
  // public Themes: Array<any>;
  // public Title = 'LCU-Theme-Builder';

  constructor(
    // protected themeService: ThemeColorPickerService,
    // protected themeBuilderService: ThemeBuilderService,
    // protected palettePickerService: PalettePickerService
  ) { }

  public ngOnInit(): void {
    // this.setThemes();
    // this.resetTheme();
  }

  protected resetTheme(): void {
    // this.ThemeClass = this.themeService.GetColorClass();

    // use replace right now, but should update ThemeService in ref arch to hold color value - shannon
    // const color: string = this.ThemeClass.value.replace(/fathym-|-theme/gi, '');

    // this.setPaletteColors(color);
  }

  // public PickTheme(color: string): void {
  //   this.themeService.SetColorClass(`fathym-${color}-theme`);
  //   this.setPaletteColors(color);
  // }

  // protected setPaletteColors(color: string): void {
  //   this.Themes.forEach((itm) => {
  //     if (itm.Color === color) {
  //       const palette = new PaletteModel();

  //       palette.primary = new SubPaletteModel();
  //       palette.primary.main = itm.Palette.Primary;

  //       palette.accent = new SubPaletteModel();
  //       palette.accent.main = itm.Palette.Accent;

  //       palette.warn = new SubPaletteModel();
  //       palette.warn.main = itm.Palette.Warn;

  //       // this.palettePickerService.NewPalette(palette);
  //       this.palettePickerService.PalettePickerChange(palette);
  //     }
  //   });
  // }

  // protected setThemes(): void {

    // const colorPalette: Array<PaletteColorMapModel> = [
    //   { Name: '$fathym-arctic', Accent: '#dbfdf2', Primary: '#67c7c5', Warn: '#c43843' },
    //   { Name: '$fathym-contrast', Accent: '#282d35', Primary: '#ef4351', Warn: '#c43843' },
    //   { Name: '$fathym-cool-candy', Accent: '#9cd8d7', Primary: '#67c7c5', Warn: '#c43843' },
    //   { Name: '$fathym-flipper', Accent: '#f1f4f6', Primary: '#a4bab3', Warn: '#c43843' },
    //   { Name: '$fathym-ice', Accent: '#fbfcf4', Primary: '#f1f4f6', Warn: '#c43843' },
    //   { Name: '$fathym-ivy', Accent: '#dfeff2', Primary: '#a4bab3', Warn: '#c43843' },
    //   { Name: '$fathym-sea-green', Accent: '#67c7c5', Primary: '#65a29f', Warn: '#c43843' },
    //   { Name: '$fathym-white-mint', Accent: '#eff3f5', Primary: '#dfeff2', Warn: '#c43843' }
    // ];

  //   this.Themes = [
      
  //     { ColorSwatch: 'color-swatch-arctic', Icon: 'brightness_1', Label: 'Arctic Theme', Value: 'arctic-theme', Color: 'arctic',
  //       Palette: { Name: '$fathym-arctic', Accent: '#dbfdf2', Primary: '#67c7c5', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-contrast', Icon: 'brightness_1', Label: 'Contrast Theme', Value: 'contrast-theme', Color: 'contrast',
  //       Palette: { Name: '$fathym-contrast', Accent: '#282d35', Primary: '#ef4351', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-cool-candy', Icon: 'brightness_1', Label: 'Cool Candy Theme', Value: 'cool-candy-theme', Color: 'cool-candy',
  //       Palette: { Name: '$fathym-cool-candy', Accent: '#9cd8d7', Primary: '#67c7c5', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-flipper', Icon: 'brightness_1', Label: 'Flipper Theme', Value: 'flipper-theme', Color: 'flipper',
  //       Palette: { Name: '$fathym-flipper', Accent: '#f1f4f6', Primary: '#a4bab3', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-ice', Icon: 'brightness_1', Label: 'Ice Theme', Value: 'ice-theme', Color: 'ice',
  //       Palette: { Name: '$fathym-ice', Accent: '#fbfcf4', Primary: '#f1f4f6', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-sea-green', Icon: 'brightness_1', Label: 'Sea Green Theme', Value: 'sea-green-theme', Color: 'sea-green',
  //       Palette: { Name: '$fathym-sea-green', Accent: '#67c7c5', Primary: '#65a29f', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-white-mint', Icon: 'brightness_1', Label: 'White Mint Theme', Value: 'white-mint-theme', Color: 'white-mint',
  //       Palette: { Name: '$fathym-white-mint', Accent: '#eff3f5', Primary: '#dfeff2', Warn: '#c43843' } 
  //     },

  //     { ColorSwatch: 'color-swatch-ivy', Icon: 'brightness_1', Label: 'Ivy Theme', Value: 'ivy-theme', Color: 'ivy',
  //       Palette: { Name: '$fathym-ivy', Accent: '#dfeff2', Primary: '#a4bab3', Warn: '#c43843' } 
  //     }
  //   ];
  // }

  // public DisplayDetails(): void {
  //   console.log('DisplayDetails()');
  // }
}
