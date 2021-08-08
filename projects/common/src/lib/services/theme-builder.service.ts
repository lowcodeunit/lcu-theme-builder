import { UtilsService } from './utils.service';
import { VariantColorService } from './variant-color.service';
import { PalettePickerService } from './palette-picker.service';
import { ColorMapModel } from './../models/color-map.model';
import { LocalStorageService } from './local-storage.service';
import { ThemeBuilderConstants } from '../utils/theme-builder-constants.utils';
import { MaterialPaletteModel } from './../models/material-palette.model';
import { Injectable, NgZone } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeModel } from '../models/theme.model';
import { HttpClient } from '@angular/common/http';
import { PaletteListModel } from '../models/palette-list.model';
import { PaletteTemplateService } from './palette-template.service';
import { ThemePickerModel } from '../models/theme-picker.model';

const tinyColor = tinycolor;
const fallbackURL: string = 'https://www.iot-ensemble.com/assets/theming/theming.scss';

// tell typescript that Sass exists
// loads the synchronous Sass.js
declare var Sass: any;

@Injectable({
  providedIn: 'root'
})

export class ThemeBuilderService {

  /**
   * Is it lightness
   */
  protected themeMode: boolean;

  /**
   * Theme Palette
   */
  protected palette: PaletteModel;

  // public $fonts = new Subject<FontSelectionModel[]>();
  public Theme: Subject<ThemeModel>;
  public PaletteColors: Subject<Partial<PaletteModel>>;
  public ThemeScss: Promise<void>;
  public PaletteList: Array<PaletteListModel>;

  /**
   * Palette colors, from 50 - A700
   */
  public MaterialPaletteColors: MaterialPaletteModel;

  /**
   * _theming.scss from Angular Material
   */
  private _materialTheme: string;
  public set MaterialTheme(val: string) {

     this._materialTheme = val;
     console.log('SET MATERIAL THEME');
      this.ThemeScss = this.loadThemingScss();
  }

  public get MaterialTheme(): string {
    return this._materialTheme;
  }

   /**
    * Set Palette colors
    */
    public set Palette(palette: PaletteModel) {

      this.palette = palette;
      this.palettePickerService.PalettePickerChange(palette);
      this.ThemeMode = !palette.DarkMode;
      console.log('SET PALETTE');
      this.updateTheme(this.getTheme());
    }

    public get Palette() {
      return this.palette;
    }

    public set ThemeMode(val: boolean) {

      this.themeMode = val;
      console.log('THEME MODE CHANGED');
      this.updateTheme(this.getTheme());
    }

    public get ThemeMode() {

      return this.themeMode;
    }

    public Themes: Array<ThemePickerModel>;

    constructor(
      protected http: HttpClient, 
      protected paletteTemplateService: PaletteTemplateService,
      protected localStorageService: LocalStorageService,
      protected palettePickerService: PalettePickerService,
      protected zone: NgZone,
      protected utilsService: UtilsService,
      protected variantColorService: VariantColorService) {

      this.themeMode = true;
      this.Theme = new Subject<ThemeModel>();
      this.PaletteColors = new Subject<Partial<PaletteModel>>();
      this.PaletteList = [];
     }

   /**
    * load intial theme
    * 
    * Pulls _theming.scss from Angular Material and then overwrites it with 
    * our theme color changes
    */
   protected loadThemingScss(): Promise<void> {
    console.log('LOAD THEMING SCSS');
    
    // return new Promise((res, rej) => {
     return this.http.get(this.MaterialTheme, { responseType: 'text' })
      .pipe(
        map((x: string) => {
          console.log('PIPE MAP');
          return x
            .replace(/\n/gm, '??')
            .replace(/\$mat-([^:?]+)\s*:\s*\([? ]*50:[^()]*contrast\s*:\s*\([^)]+\)[ ?]*\);\s*?/g,
              (all: string, name: string) => name === 'grey' ? all : '')
            .replace(/\/\*.*?\*\//g, '')
            .split(/[?][?]/g)
            .map((l: string) => l
              .replace(/^\s*(\/\/.*)?$/g, '')
              .replace(/^\$mat-blue-gray\s*:\s*\$mat-blue-grey\s*;\s*/g, '')
              .replace(/^\s*|\s*$/g, '')
              .replace(/:\s\s+/g, ': ')
            )
            .filter((l: string) => !!l)
            .join('\n');
        }),
        map(
          (txt: string) => {
                /**
                 * writeFile allows this file to be accessed from styles.scss
                 */
                Sass.writeFile('~@angular/material/theming', txt, (result: boolean) => {
                })
            }
          )
        ).toPromise();
    // })
   }

  /**
   * Get theme template and update it
   * 
   * @param theme current theme
   */
  public GetTemplate(theme: ThemeModel): string {
    return this.paletteTemplateService.GetTemplate(theme);
  }

  /**
   * Compile SASS to CSS
   *
   * @param theme SASS stylesheet
   * @returns compiled CSS
   */
   public async CompileScssTheme(theme: string): Promise<string> {
    console.log('COMPILE SCSS THEME');
    // hold here until this.ThemeScss resolves, then run the next promise 
    await this.ThemeScss;
    console.log('AWAIT HAS FINISHED');
    return new Promise<string>((res, rej) => {
      Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), (v: any) => {
        if (v.status === 0) {
          console.log('RETURN COMPILED STRING');
          res(v.text);
        } else {
          rej(v);
        }
      });
    }
    );
   }

   /**
    * Return primary and accent colors for each color map, from colors 50 - A700
    *
    * @param color color
    */
   public GetPalette(color: string): MaterialPaletteModel {
    const baseLight = tinyColor('#ffffff');
    const baseDark = this.utilsService.Multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
    const [, , , baseTriad] = tinyColor(color).tetrad();

    const primary = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY)
      .map(k => {
        const [light, amount] = ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY[k];
        return [k, tinyColor.mix(light ? baseLight : baseDark,
          tinyColor(color), amount)] as [string, tinycolor.Instance];
      });

    const accent = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)
      .map(k => {
        const [amount, sat, light] = ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY[k];
        return [k, tinyColor.mix(baseDark, baseTriad, amount)
          .saturate(sat).lighten(light)] as [string, tinycolor.Instance];
      });

    return [...primary, ...accent].reduce((acc, [k, c]) => {
      acc[k] = c.toHexString();
      return acc;
    }, {});
   }

   /**
    * emit event with theme
    */
   protected emit(): void {
     this.Theme.next(this.getTheme());
   }

   /**
    * Return a new theme model
    */
   public getTheme(): ThemeModel {

    return {
      Palette: this.Palette,
      ThemeDarkMode: this.ThemeMode,
    };
   }

   protected updateTheme(theme: ThemeModel): void {

    // SASS stylesheet
    const source: string = this.GetTemplate(theme);
    console.log('UPDATE THEME');
    // Running functions outside of Angular's zone and do work that
    // doesn't trigger Angular change-detection.
   this.zone.runOutsideAngular(() => {

     this.CompileScssTheme(source)
     .finally(() => {
       console.log('SCSS IS COMPILED');
     })
     .then( (text: string) => {
      console.log('PROMISE THEN HAPPENING');
        // SASS compiled to CSS
        const compiledDynamicCSS: string = text;
        const dynamicStyleSheet: HTMLElement = document.getElementById('theme-builder-stylesheet');

        // check if dynamic stylesheet exists, then remove it
        if (dynamicStyleSheet) {
          document.getElementsByTagName('body')[0].removeChild(dynamicStyleSheet);
        }

        // add dynamic stylesheet
        const style = document.createElement('style');
              style.id = 'theme-builder-stylesheet';
              style.appendChild(document.createTextNode(compiledDynamicCSS));

        document.getElementsByTagName('body')[0].appendChild(style);

      }).catch((err: Error) => {
        console.error('Compile Scss Error', err);
      });
   });
  }

  /**
   *
   * @param themes Array of themes to be set
   */
  public SetThemes(themes: Array<ThemePickerModel>): void {
    this.Themes = themes;

    let initial: PaletteModel = new PaletteModel();
    initial = { ...ThemeBuilderConstants.InitialValues, ...initial };
    initial.primary.Main = this.Themes[0].Primary;
    initial.accent.Main = this.Themes[0].Accent;
    initial.warn.Main = this.Themes[0].Warn;
    initial.DarkMode = this.Themes[0].DarkMode;

    this.Palette = initial;

    this.variantColorService.UpdatePrimaryVariants(this.Themes[0].Primary);
    this.variantColorService.UpdateAccentVariants(this.Themes[0].Accent);
    this.variantColorService.UpdateWarnVariants(this.Themes[0].Warn);

  }
}
