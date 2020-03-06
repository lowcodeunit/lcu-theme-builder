import { ColorMapModel } from './../models/color-map.model';
import { LocalStorageService } from './local-storage.service';
import { SubPaletteModel } from './../models/sub-palette.model';
import { Constants } from './../utils/constants.utils';
import { MaterialPaletteModel } from './../models/material-palette.model';
import { Injectable } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { ReplaySubject, Subject } from 'rxjs';
import { map, skipLast } from 'rxjs/operators';
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
  protected _lightness: boolean;

  /**
   * Theme Palette
   */
  protected _palette: PaletteModel;

  public $fonts = new Subject<FontSelectionModel[]>();
  public $theme: ReplaySubject<ThemeModel>;
  public $lightness: Subject<boolean>;
  public $palette: Subject<Partial<PaletteModel>>;
  public $themeScss: Promise<void>;
  public PaletteList: Array<PaletteListModel>;

  /**
   * Palette colors, from 50 - A700
   */
  public MaterialPaletteColors: MaterialPaletteModel;

  constructor(
    protected http: HttpClient, 
    protected paletteTemplateService: PaletteTemplateService,
    protected localStorageService: LocalStorageService) {
    this._lightness = true;
    this.$theme = new ReplaySubject<ThemeModel>();
    this.$lightness = new Subject<boolean>();
    this.$palette = new Subject<Partial<PaletteModel>>();
    this.$themeScss = this.loadThemingScss();
    this.PaletteList = [];
   }

   /**
    * Set Palette colors
    */
    public set Palette(pal: PaletteModel) {
      pal.AccentColorPalette = this.GetPalette(pal.accent.main);
      pal.PrimaryColorPalette = this.GetPalette(pal.primary.main);
      pal.WarnColorPalette = this.GetPalette(pal.warn.main);

      pal.ColorMap = new Map();
      pal.ColorMap.set('accent-palette', pal.AccentColorPalette);
      pal.ColorMap.set('primary-palette', pal.PrimaryColorPalette);
      pal.ColorMap.set('warn-palette', pal.WarnColorPalette);

      this._palette = pal;
      this.emit();
    }

    public get Palette() {
      return this._palette;
    }

    set fonts(fonts: FontSelectionModel[]) {
      this._fonts = fonts;
      this.emit();
    }

    get fonts() {
      return this._fonts;
    }

    set lightness(light: boolean) {
      this._lightness = light;
      this.emit();
    }

    get lightness() {
      return this._lightness;
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
          Sass.writeFile('~@angular/material/theming', txt))
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
   * Save the selected color map
   *
   * @param theme Current selected theme
   */
  public SaveColorPalette(theme: ThemeModel): void {
    const colorMap: ColorMapModel = new ColorMapModel(
      this.paletteTemplateService.GenerateColorMap(theme), '$color-map' + String(Math.floor(Math.random() * 100)));
    this.localStorageService.SetColorMapStorage(colorMap);
  }

   public async CompileScssTheme(theme: string) {
    await this.$themeScss;
    return new Promise<string>((res, rej) =>
      Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), (v: any) => {
        if (v.status === 0) {
          res(v.text);
        } else {
          rej(v);
        }
      })
    );
   }

   public FromExternal(val: string): void {
     try {
       const json = JSON.parse(val);

       this.$lightness.next(json.lightness);
       this.$palette.next(json.palette);

     } catch (e) {
      console.error('Unable to read', val, e);
     }
   }

   public ToExternal(): string {
    const data = {
      palette: this.Palette,
      fonts: this.fonts.map(x => {
        const keys = Object.keys(x).filter(k => k === 'target' || x[k] !== Constants.DEFAULT_FONTS[x.target][k]);
        return keys.reduce((acc, v) => {
          acc[v] = x[v];
          return acc;
        }, {});
      }),
      // icons: this.icons,
      lightness: this.lightness
    };
    return JSON.stringify(data);
  }

   /**
    * Build the color palette, from colors 50 - A700
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
     this.$theme.next(this.getTheme());
   }

   /**
    * Return a new theme model
    */
   protected getTheme(): ThemeModel {
    return {
      palette: this.Palette,
      lightness: this.lightness,
      fonts: this.fonts
    };
   }

   protected multiply(rgb1: RGBA, rgb2: RGBA): any {
    rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
    rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
    rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);

    return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
   }
}
