import { UtilsService } from './utils.service';
import { VariantColorService } from './variant-color.service';
import { PalettePickerService } from './palette-picker.service';
import { ColorMapModel } from './../models/color-map.model';
import { LocalStorageService } from './local-storage.service';
import { ThemeBuilderConstants } from '../utils/theme-builder-constants.utils';
import { MaterialPaletteModel } from './../models/material-palette.model';
import { Injectable, NgZone } from '@angular/core';
import tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { ReplaySubject, Subject } from 'rxjs';
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
      this.UpdateTheme(this.getTheme());
    }

    public get Palette() {
      return this.palette;
    }

    public set ThemeMode(light: boolean) {

      this.themeMode = !light;
      this.UpdateTheme(this.getTheme());
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

      this.MaterialTheme = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
      this.themeMode = true;
      this.Theme = new Subject<ThemeModel>();
      this.PaletteColors = new Subject<Partial<PaletteModel>>();

      // this.ThemeScss = this.loadThemingScss();

      this.PaletteList = [];
     }

   /**
    * load intial theme
    * 
    * Pulls _theming.scss from Angular Material and then overwrites it with 
    * our theme color changes
    */
   protected loadThemingScss(): Promise<void> {
    // return this.http.get('https://www.iot-ensemble.com/assets/theming/theming.scss', { responseType: 'text' })
    return this.http.get(this.MaterialTheme, { responseType: 'text' })
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
        map(
          (txt: string) =>
          // writeFile allows this file to be accessed from styles.scss
          Sass.writeFile('~@angular/material/theming', txt, (result: boolean) => {
           // console.log('Sass.writeFile', result);
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
      palette: this.Palette,
      lightness: this.ThemeMode,
    };
   }

   public UpdateTheme(theme: ThemeModel): void {

    // SASS stylesheet
    const source: string = this.GetTemplate(theme);

    // Running functions outside of Angular's zone and do work that
    // doesn't trigger Angular change-detection.
   this.zone.runOutsideAngular(() => {

     this.CompileScssTheme(source).then( (text: string) => {

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
        console.error(err);
      });
   });
  }

  public SetThemes(themes: Array<ThemePickerModel>): void {
    this.Themes = themes;

    let initial: PaletteModel = new PaletteModel();
    initial = { ...ThemeBuilderConstants.InitialValues, ...initial };
    initial.primary.main = this.Themes[0].Primary;
    initial.accent.main = this.Themes[0].Accent;
    initial.warn.main = this.Themes[0].Warn;

    this.Palette = initial;

    this.variantColorService.UpdatePrimaryVariants(this.Themes[0].Primary);
    this.variantColorService.UpdateAccentVariants(this.Themes[0].Accent);
    this.variantColorService.UpdateWarnVariants(this.Themes[0].Warn);

  }
}
