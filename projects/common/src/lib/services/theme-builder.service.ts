import { PalettePickerService } from './palette-picker.service';
import { ColorMapModel } from './../models/color-map.model';
import { LocalStorageService } from './local-storage.service';
import { Constants } from './../utils/constants.utils';
import { MaterialPaletteModel } from './../models/material-palette.model';
import { Injectable, NgZone } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeModel } from '../models/theme.model';
import { HttpClient } from '@angular/common/http';
import { FontSelectionModel } from '../models/font-selection.model';
import { PaletteListModel } from '../models/palette-list.model';
import { PaletteTemplateService } from './palette-template.service';

const tinyColor = tinycolor;

type RGBA = tinycolor.ColorFormats.RGBA;

// tell typescript that Sass exists
// loads the synchronous Sass.js
declare var Sass: any;

@Injectable({
  providedIn: 'root'
})

export class ThemeBuilderService {

  /**
   * Array of font selections
   */
  protected _fonts: Array<FontSelectionModel>;

  /**
   * Is it lightness
   */
  protected _themeMode: boolean;

  /**
   * Theme Palette
   */
  protected _palette: PaletteModel;

  public $fonts = new Subject<FontSelectionModel[]>();
  public Theme: ReplaySubject<ThemeModel>;
  public PaletteColors: Subject<Partial<PaletteModel>>;
  public ThemeScss: Promise<void>;
  public PaletteList: Array<PaletteListModel>;

  /**
   * Palette colors, from 50 - A700
   */
  public MaterialPaletteColors: MaterialPaletteModel;

  constructor(
    protected http: HttpClient, 
    protected paletteTemplateService: PaletteTemplateService,
    protected localStorageService: LocalStorageService,
    protected palettePickerService: PalettePickerService,
    protected zone: NgZone,) {
    this._themeMode = true;
    this.Theme = new ReplaySubject<ThemeModel>();
    this.PaletteColors = new Subject<Partial<PaletteModel>>();
    this.ThemeScss = this.loadThemingScss();

    this.PaletteList = [];
   }

   /**
    * Set Palette colors
    */
    public set Palette(palette: PaletteModel) {
      palette.AccentColorPalette = this.GetPalette(palette.accent.main);
      palette.PrimaryColorPalette = this.GetPalette(palette.primary.main);
      palette.WarnColorPalette = this.GetPalette(palette.warn.main);

      palette.ColorMap = new Map();
      palette.ColorMap.set('accent-palette', palette.AccentColorPalette);
      palette.ColorMap.set('primary-palette', palette.PrimaryColorPalette);
      palette.ColorMap.set('warn-palette', palette.WarnColorPalette);

      this._palette = palette;
      this.palettePickerService.NewPalette(palette);
      this.emit();
    }

    public get Palette() {
      return this._palette;
    }

    public set fonts(fonts: FontSelectionModel[]) {
      this._fonts = fonts;
      this.emit();
    }

    public get fonts() {
      return this._fonts;
    }

    public set ThemeMode(light: boolean) {
      this._themeMode = light;
     this.emit();
    }

    public get ThemeMode() {
      return this._themeMode;
    }

   /**
    * load intial theme
    */
   protected loadThemingScss(): Promise<void> {

     // this is generated in angular.json, pulls from node_modules/@angular/material
    return this.http.get('/assets/_theming.scss', { responseType: 'text' })
      .pipe(
        map((x: string) => {
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
        map((txt: string) =>
          // writeFile allows this file to be accessed from styles.scss
          Sass.writeFile('~@angular/material/theming', txt, (result: boolean) => {
           console.log('Sass.writeFile', result);
          }))
      ).toPromise();
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
   public async CompileScssTheme(theme: string) {
    await this.ThemeScss;
    return new Promise<string>((res, rej) => {
      Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), (v: any) => {
        if (v.status === 0) {
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
    const baseDark = this.multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
    const [, , , baseTriad] = tinyColor(color).tetrad();

    const primary = Object.keys(Constants.MIX_AMOUNTS_PRIMARY)
      .map(k => {
        const [light, amount] = Constants.MIX_AMOUNTS_PRIMARY[k];
        return [k, tinyColor.mix(light ? baseLight : baseDark,
          tinyColor(color), amount)] as [string, tinycolor.Instance];
      });

    const accent = Object.keys(Constants.MIX_AMOUNTS_SECONDARY)
      .map(k => {
        const [amount, sat, light] = Constants.MIX_AMOUNTS_SECONDARY[k];
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
      palette: this.Palette,
      lightness: this.ThemeMode,
      fonts: this.fonts
    };
   }

   public multiply(rgb1: RGBA, rgb2: RGBA): any {
    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);

    return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
   }

   public UpdateTheme(theme: ThemeModel): void {

    // SASS stylesheet
    const source: string = this.GetTemplate(theme);

    // Running functions outside of Angular's zone and do work that
    // doesn't trigger Angular change-detection.
    // this.zone.runOutsideAngular(() => {

     this.CompileScssTheme(source).then( (text: string) => {

        // SASS compiled to CSS
        const compiledDynamicCSS: string = text;

        const dynamicStyleSheet: HTMLElement = document.getElementById('theme-builder-stylesheet');

        // check if dynamic stylesheet exists, then remove it
        if (dynamicStyleSheet) {
          document.getElementsByTagName('head')[0].removeChild(dynamicStyleSheet);
        }

        // add dynamic stylesheet
        const style = document.createElement('style');
              style.id = 'theme-builder-stylesheet';
              style.appendChild(document.createTextNode(compiledDynamicCSS));

        document.getElementsByTagName('head')[0].appendChild(style);

      }).catch((err: Error) => {
        console.error(err);
      });
    // });
  }
}
