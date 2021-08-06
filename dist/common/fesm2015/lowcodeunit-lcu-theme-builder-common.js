import * as i0 from '@angular/core';
import { Injectable, NgZone, Component, Directive, ElementRef, Renderer2, HostListener, Input, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ThemeColorPickerService, FathymSharedModule, MaterialModule } from '@lcu/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { __awaiter } from 'tslib';
import * as tinycolor from 'tinycolor2';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const tinyColor$5 = tinycolor;
class UtilsService {
    Multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinyColor$5('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    }
}
UtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(); }, token: UtilsService, providedIn: "root" });
UtilsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

class PaletteModel {
}

class PalettePickerService {
    constructor() {
        this.ColorPickerChanged = new BehaviorSubject(new PaletteModel());
        this.ColorPickerClosed = new Subject();
    }
    PalettePickerChange(params) {
        this.CurrentPalette = Object.assign({}, params);
        this.ColorPickerChanged.next(this.CurrentPalette);
    }
    /**
     * Event when color picker is closed, use this to kick off
     * the process of building color variants and everything else
     * Doing this prevents multiple processes that occur during
     * Form Control changes
     *
     * @param params Selected color from color picker
     */
    CloseColorPicker(params) {
        this.ColorPickerClosed.next(params);
    }
}
PalettePickerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PalettePickerService_Factory() { return new PalettePickerService(); }, token: PalettePickerService, providedIn: "root" });
PalettePickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
PalettePickerService.ctorParameters = () => [];

const tinyColor$4 = tinycolor;
class VariantColorService {
    constructor(palettePickerService, utilsService) {
        this.palettePickerService = palettePickerService;
        this.utilsService = utilsService;
    }
    UpdatePrimaryVariants(color) {
        this.palettePickerService.PrimaryColorPalette = this.computeColors(color);
        for (const c of this.palettePickerService.PrimaryColorPalette) {
            const key = `--theme-primary-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            // set or update CSS variable values
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    UpdateAccentVariants(color) {
        this.palettePickerService.AccentColorPalette = this.computeColors(color);
        for (const c of this.palettePickerService.AccentColorPalette) {
            const key = `--theme-accent-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    UpdateWarnVariants(color) {
        this.palettePickerService.WarnColorPalette = this.computeColors(color);
        for (const c of this.palettePickerService.WarnColorPalette) {
            const key = `--theme-warn-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    computeColors(color) {
        const baseLightColor = tinyColor$4('#f9f9f9');
        let baseDarkColor = tinyColor$4('#222222');
        if (this.utilsService.Multiply) {
            baseDarkColor = this.utilsService.Multiply(tinyColor$4(color).toRgb(), tinyColor$4(color).toRgb());
        }
        const [, , , baseTetrad] = tinyColor$4(color).tetrad();
        return [
            this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 12), '50'),
            this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 30), '100'),
            this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 50), '200'),
            this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 70), '300'),
            this.getColorObject(tinyColor$4.mix(baseLightColor, tinyColor$4(color), 85), '400'),
            this.getColorObject(tinyColor$4(color), '500'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 87), '600'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 70), '700'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 54), '800'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, tinyColor$4(color), 25), '900'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
            this.getColorObject(tinyColor$4.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
        ];
    }
    // force change
    getColorObject(value, name) {
        const c = tinyColor$4(value);
        return {
            name,
            hex: c.toHexString(),
            darkContrast: c.isLight()
        };
    }
}
VariantColorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VariantColorService_Factory() { return new VariantColorService(i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(UtilsService)); }, token: VariantColorService, providedIn: "root" });
VariantColorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
VariantColorService.ctorParameters = () => [
    { type: PalettePickerService },
    { type: UtilsService }
];

class LocalStorageService {
    constructor() { }
    ClearColorMapStorage() {
        localStorage.clear();
    }
    GetColorMapStorage(name) {
        // return this.colorPalette;
        const arr = JSON.parse(localStorage.getItem(name));
        return localStorage.getItem(name);
    }
    SetColorMapStorage(colorMap) {
        // if ColorMaps already exists
        if (localStorage.getItem('ColorMaps')) {
            // return storage, then parse saved string
            this.storageArray = JSON.parse(localStorage.getItem('ColorMaps'));
        }
        else {
            this.storageArray = [];
        }
        // update storage array
        this.storageArray.push(colorMap);
        this.updateColorMapStorage();
    }
    updateColorMapStorage() {
        localStorage.setItem('ColorMaps', JSON.stringify(this.storageArray));
    }
}
LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
LocalStorageService.ctorParameters = () => [];

// @dynamic
/**
 * @dynamic need this because there are static members
 */
class ThemeBuilderConstants {
}
ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY = {
    50: [true, 12],
    100: [true, 30],
    200: [true, 50],
    300: [true, 70],
    400: [true, 85],
    500: [true, 100],
    600: [false, 87],
    700: [false, 70],
    800: [false, 54],
    900: [false, 25]
};
ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY = {
    A100: [15, 80, 65],
    A200: [15, 80, 55],
    A400: [15, 100, 45],
    A700: [15, 100, 40]
};
ThemeBuilderConstants.document = window.getComputedStyle(document.documentElement);
ThemeBuilderConstants.InitialValues = {
    primary: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'), Lighter: null, Darker: null },
    accent: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'), Lighter: null, Darker: null },
    warn: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-warn'), Lighter: null, Darker: null },
    DarkMode: false,
    LightText: ThemeBuilderConstants.document.getPropertyValue('--initial-light-text'),
    LightBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-light-background'),
    DarkText: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-text'),
    DarkBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-background')
};

const tinyColor$3 = tinycolor;
class PaletteTemplateService {
    /**
     * Return template for scss
     *
     * @param theme current theme
     */
    GetTemplate(theme) {
        const template = `
      @import '~@angular/material/theming';
      // Include the common styles for Angular Material. We include this here so that you only
      // have to load a single css file for Angular Material in your app.

      // Foreground Elements

      // Light Theme Text
      $dark-text: ${theme.Palette.LightText};
      $dark-primary-text: rgba($dark-text, 0.87);
      $dark-accent-text: rgba($dark-primary-text, 0.54);
      $dark-disabled-text: rgba($dark-primary-text, 0.38);
      $dark-dividers: rgba($dark-primary-text, 0.12);
      $dark-focused: rgba($dark-primary-text, 0.12);

      $mat-light-theme-foreground: (
        base:              black,
        divider:           $dark-dividers,
        dividers:          $dark-dividers,
        disabled:          $dark-disabled-text,
        disabled-button:   rgba($dark-text, 0.26),
        disabled-text:     $dark-disabled-text,
        elevation:         black,
        secondary-text:    $dark-accent-text,
        hint-text:         $dark-disabled-text,
        accent-text:       $dark-accent-text,
        icon:              $dark-accent-text,
        icons:             $dark-accent-text,
        text:              $dark-primary-text,
        slider-min:        $dark-primary-text,
        slider-off:        rgba($dark-text, 0.26),
        slider-off-active: $dark-disabled-text,
      );

      // Dark Theme text
      $light-text: ${theme.Palette.DarkText};
      $light-primary-text: $light-text;
      $light-accent-text: rgba($light-primary-text, 0.7);
      $light-disabled-text: rgba($light-primary-text, 0.5);
      $light-dividers: rgba($light-primary-text, 0.12);
      $light-focused: rgba($light-primary-text, 0.12);

      $mat-dark-theme-foreground: (
        base:              $light-text,
        divider:           $light-dividers,
        dividers:          $light-dividers,
        disabled:          $light-disabled-text,
        disabled-button:   rgba($light-text, 0.3),
        disabled-text:     $light-disabled-text,
        elevation:         black,
        hint-text:         $light-disabled-text,
        secondary-text:    $light-accent-text,
        accent-text:       $light-accent-text,
        icon:              $light-text,
        icons:             $light-text,
        text:              $light-text,
        slider-min:        $light-text,
        slider-off:        rgba($light-text, 0.3),
        slider-off-active: rgba($light-text, 0.3),
      );

      // Background config
      // Light bg
      $light-background:    ${theme.Palette.LightBackground};
      $light-bg-darker-5:   darken($light-background, 5%);
      $light-bg-darker-10:  darken($light-background, 10%);
      $light-bg-darker-20:  darken($light-background, 20%);
      $light-bg-darker-30:  darken($light-background, 30%);
      $light-bg-lighter-5:  lighten($light-background, 5%);
      $dark-bg-alpha-4:     rgba(${theme.Palette.DarkBackground}, 0.04);
      $dark-bg-alpha-12:    rgba(${theme.Palette.DarkBackground}, 0.12);

      $mat-light-theme-background: (
        background:               $light-background,
        status-bar:               $light-bg-darker-20,
        app-bar:                  $light-bg-darker-5,
        hover:                    $dark-bg-alpha-4,
        card:                     $light-bg-lighter-5,
        dialog:                   $light-bg-lighter-5,
        disabled-button:          $dark-bg-alpha-12,
        raised-button:            $light-bg-lighter-5,
        focused-button:           $dark-focused,
        selected-button:          $light-bg-darker-20,
        selected-disabled-button: $light-bg-darker-30,
        disabled-button-toggle:   $light-bg-darker-10,
        unselected-chip:          $light-bg-darker-10,
        disabled-list-option:     $light-bg-darker-10,
      );

      // Dark bg
      $dark-background:     ${theme.Palette.DarkBackground};
      $dark-bg-lighter-5:   lighten($dark-background, 5%);
      $dark-bg-lighter-10:  lighten($dark-background, 10%);
      $dark-bg-lighter-20:  lighten($dark-background, 20%);
      $dark-bg-lighter-30:  lighten($dark-background, 30%);
      $light-bg-alpha-4:    rgba(${theme.Palette.LightBackground}, 0.04);
      $light-bg-alpha-12:   rgba(${theme.Palette.LightBackground}, 0.12);

      // Background palette for dark themes.
      $mat-dark-theme-background: (
        background:               $dark-background,
        status-bar:               $dark-bg-lighter-20,
        app-bar:                  $dark-bg-lighter-5,
        hover:                    $light-bg-alpha-4,
        card:                     $dark-bg-lighter-5,
        dialog:                   $dark-bg-lighter-5,
        disabled-button:          $light-bg-alpha-12,
        raised-button:            $dark-bg-lighter-5,
        focused-button:           $light-focused,
        selected-button:          $dark-bg-lighter-20,
        selected-disabled-button: $dark-bg-lighter-30,
        disabled-button-toggle:   $dark-bg-lighter-10,
        unselected-chip:          $dark-bg-lighter-20,
        disabled-list-option:     $dark-bg-lighter-10,
      );

      // Theme Config
      ${['primary', 'accent', 'warn'].map(x => this.getScssPalette(x, theme.Palette[x])).join('\n')};

      $theme: ${!theme.ThemeDarkMode ? 'mat-dark-theme' : 'mat-light-theme'}($theme-primary, $theme-accent, $theme-warn);
      $altTheme: ${!theme.ThemeDarkMode ? 'mat-light-theme' : 'mat-dark-theme'}($theme-primary, $theme-accent, $theme-warn);

      // Theme Init
      @include angular-material-theme($theme);

      .theme-alternate {
        @include angular-material-theme($altTheme);
      }

      // Specific component overrides, pieces that are not in line with the general theming

      // Handle buttons appropriately, with respect to line-height
      .mat-raised-button, .mat-stroked-button, .mat-flat-button {
        padding: 0 1.15em;
        margin: 0 .65em;
        min-width: 3em;
      }

      .mat-standard-chip {
        padding: .5em .85em;
        min-height: 2.5em;
      }
      `;
        return template;
    }
    /**
     * Get the Scss Palatte
     *
     * @param name palette name
     *
     * @param subPalette SubPaletteModel
     */
    getScssPalette(name, subPalette) {
        return `
      body {
        --${name}-color: ${subPalette.Main};
        --${name}-lighter-color: ${subPalette.Lighter};
        --${name}-darker-color: ${subPalette.Darker};
        --text-${name}-color: #{${this.getTextColor(subPalette.Main)}};
        --text-${name}-lighter-color: #{${this.getTextColor(subPalette.Lighter)}};
        --text-${name}-darker-color: #{${this.getTextColor(subPalette.Darker)}};
      }

    $mat-${name}: (
      main: ${subPalette.Main},
      lighter: ${subPalette.Lighter},
      darker: ${subPalette.Darker},
      200: ${subPalette.Main}, // For slide toggle,
      contrast : (
        main: ${this.getTextColor(subPalette.Main)},
        lighter: ${this.getTextColor(subPalette.Lighter)},
        darker: ${this.getTextColor(subPalette.Darker)},
      )
    );
    $theme-${name}: mat-palette($mat-${name}, main, lighter, darker);`;
    }
    /**
     * Get text color
     *
     * @param col color
     */
    getTextColor(col) {
        return `$${tinyColor$3(col).isLight() ? 'dark' : 'light'}-primary-text`;
    }
}
PaletteTemplateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaletteTemplateService_Factory() { return new PaletteTemplateService(); }, token: PaletteTemplateService, providedIn: "root" });
PaletteTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];

const tinyColor$2 = tinycolor;
const fallbackURL = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
class ThemeBuilderService {
    constructor(http, paletteTemplateService, localStorageService, palettePickerService, zone, utilsService, variantColorService) {
        this.http = http;
        this.paletteTemplateService = paletteTemplateService;
        this.localStorageService = localStorageService;
        this.palettePickerService = palettePickerService;
        this.zone = zone;
        this.utilsService = utilsService;
        this.variantColorService = variantColorService;
        this.themeMode = true;
        this.Theme = new Subject();
        this.PaletteColors = new Subject();
        this.PaletteList = [];
    }
    set MaterialTheme(val) {
        this._materialTheme = val;
        console.log('SET MATERIAL THEME');
        this.ThemeScss = this.loadThemingScss();
    }
    get MaterialTheme() {
        return this._materialTheme;
    }
    /**
     * Set Palette colors
     */
    set Palette(palette) {
        this.palette = palette;
        this.palettePickerService.PalettePickerChange(palette);
        this.ThemeMode = !palette.DarkMode;
        console.log('SET PALETTE');
        this.updateTheme(this.getTheme());
    }
    get Palette() {
        return this.palette;
    }
    set ThemeMode(val) {
        this.themeMode = val;
        console.log('THEME MODE CHANGED');
        this.updateTheme(this.getTheme());
    }
    get ThemeMode() {
        return this.themeMode;
    }
    /**
     * load intial theme
     *
     * Pulls _theming.scss from Angular Material and then overwrites it with
     * our theme color changes
     */
    loadThemingScss() {
        console.log('LOAD THEMING SCSS');
        // return new Promise((res, rej) => {
        return this.http.get(this.MaterialTheme, { responseType: 'text' })
            .pipe(map((x) => {
            console.log('PIPE MAP');
            return x;
        }), map((txt) => {
            // console.log('SASS.WRITEFILE');
            // writeFile allows this file to be accessed from styles.scss
            Sass.writeFile('~@angular/material/theming', txt, (result) => {
            });
        })).toPromise();
        // })
    }
    /**
     * Get theme template and update it
     *
     * @param theme current theme
     */
    GetTemplate(theme) {
        return this.paletteTemplateService.GetTemplate(theme);
    }
    /**
     * Compile SASS to CSS
     *
     * @param theme SASS stylesheet
     * @returns compiled CSS
     */
    CompileScssTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('COMPILE SCSS THEME');
            // hold here until this.ThemeScss resolves, then run the next promise 
            yield this.ThemeScss;
            console.log('AWAIT HAS FINISHED');
            return new Promise((res, rej) => {
                Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), (v) => {
                    if (v.status === 0) {
                        console.log('RETURN COMPILED STRING');
                        res(v.text);
                    }
                    else {
                        rej(v);
                    }
                });
            });
        });
    }
    /**
     * Return primary and accent colors for each color map, from colors 50 - A700
     *
     * @param color color
     */
    GetPalette(color) {
        const baseLight = tinyColor$2('#ffffff');
        const baseDark = this.utilsService.Multiply(tinyColor$2(color).toRgb(), tinyColor$2(color).toRgb());
        const [, , , baseTriad] = tinyColor$2(color).tetrad();
        const primary = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY)
            .map(k => {
            const [light, amount] = ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY[k];
            return [k, tinyColor$2.mix(light ? baseLight : baseDark, tinyColor$2(color), amount)];
        });
        const accent = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)
            .map(k => {
            const [amount, sat, light] = ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY[k];
            return [k, tinyColor$2.mix(baseDark, baseTriad, amount)
                    .saturate(sat).lighten(light)];
        });
        return [...primary, ...accent].reduce((acc, [k, c]) => {
            acc[k] = c.toHexString();
            return acc;
        }, {});
    }
    /**
     * emit event with theme
     */
    emit() {
        this.Theme.next(this.getTheme());
    }
    /**
     * Return a new theme model
     */
    getTheme() {
        return {
            Palette: this.Palette,
            ThemeDarkMode: this.ThemeMode,
        };
    }
    updateTheme(theme) {
        // SASS stylesheet
        const source = this.GetTemplate(theme);
        console.log('UPDATE THEME');
        // Running functions outside of Angular's zone and do work that
        // doesn't trigger Angular change-detection.
        this.zone.runOutsideAngular(() => {
            this.CompileScssTheme(source)
                .finally(() => {
                console.log('SCSS IS COMPILED');
            })
                .then((text) => {
                console.log('PROMISE THEN HAPPENING');
                // SASS compiled to CSS
                const compiledDynamicCSS = text;
                const dynamicStyleSheet = document.getElementById('theme-builder-stylesheet');
                // check if dynamic stylesheet exists, then remove it
                if (dynamicStyleSheet) {
                    document.getElementsByTagName('body')[0].removeChild(dynamicStyleSheet);
                }
                // add dynamic stylesheet
                const style = document.createElement('style');
                style.id = 'theme-builder-stylesheet';
                style.appendChild(document.createTextNode(compiledDynamicCSS));
                document.getElementsByTagName('body')[0].appendChild(style);
            }).catch((err) => {
                console.error('Compile Scss Error', err);
            });
        });
    }
    /**
     *
     * @param themes Array of themes to be set
     */
    SetThemes(themes) {
        this.Themes = themes;
        let initial = new PaletteModel();
        initial = Object.assign(Object.assign({}, ThemeBuilderConstants.InitialValues), initial);
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
ThemeBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(PaletteTemplateService), i0.ɵɵinject(LocalStorageService), i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(UtilsService), i0.ɵɵinject(VariantColorService)); }, token: ThemeBuilderService, providedIn: "root" });
ThemeBuilderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ThemeBuilderService.ctorParameters = () => [
    { type: HttpClient },
    { type: PaletteTemplateService },
    { type: LocalStorageService },
    { type: PalettePickerService },
    { type: NgZone },
    { type: UtilsService },
    { type: VariantColorService }
];

class ThemeBuilderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ThemeBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-builder',
                template: "\r\n<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <!-- <lcu-mode-toggle></lcu-mode-toggle> -->\r\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-toolbar color=\"primary\">\r\n        <span class=\"primary-color\">Primary Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"accent\">\r\n        <span class=\"accent-color\">Accent Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"warn\">\r\n        <span class=\"warn-color\">Warn Colors</span>\r\n      </mat-toolbar>\r\n  </div>\r\n  <!-- <lcu-palette-picker></lcu-palette-picker> -->\r\n</div>\r\n",
                styles: [".primary-color{color:var(--theme-primary-A700)}.accent-color{color:var(--theme-accent-A700)}.warn-color{color:var(--theme-warn-A700)}"]
            },] }
];
ThemeBuilderComponent.ctorParameters = () => [];

class ThemeBuilderDirective {
    constructor(elRef, renderer, themeService) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.themeService = themeService;
    }
    onMouseEnter() {
        this.hoverEffect(this.getThemeColor(), 'underline');
    }
    onMouseLeave() {
        this.hoverEffect('', 'initial');
    }
    ngOnInit() {
        this.currentColor = this.getThemeColor();
    }
    getThemeColor() {
        const theme = this.themeService.GetColorClass().value;
        return 'color-swatch-' + theme.substring(theme.indexOf('-') + 1, theme.lastIndexOf('-'));
    }
    hoverEffect(color, decoration) {
        const title = this.elRef.nativeElement.querySelector('.mat-card-title');
        this.renderer.setStyle(title, 'text-decoration', decoration);
        if (!color && this.currentColor) {
            this.renderer.removeClass(title, this.currentColor);
        }
        else if (color !== this.currentColor) {
            this.renderer.removeClass(title, this.currentColor);
        }
        if (color) {
            this.renderer.addClass(title, color);
            this.currentColor = color;
        }
    }
}
ThemeBuilderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[theme-builder]'
            },] }
];
ThemeBuilderDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ThemeColorPickerService }
];
ThemeBuilderDirective.propDecorators = {
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};

// import * as EventEmitter from 'events';
const tinyColor$1 = tinycolor;
class ColorPickerComponent {
    constructor(palettePickerService) {
        this.palettePickerService = palettePickerService;
        this.ShowBackdrop = false;
    }
    /**
     * Set the selected color
     */
    set Color(col) {
        this.Control.setValue(col);
    }
    /**
     * Get the selected color
     *
     */
    get Color() {
        return this.Control.value;
    }
    ngOnInit() {
    }
    /**
     * Turn backdrop on
     *
     * @param on toggle
     */
    SetBackdrop(on) {
        this.ShowBackdrop = on;
    }
    /**
     * Set font color to contrast background color of display
     *
     * @param col color
     */
    GetTextColor(col) {
        return tinyColor$1(col).isLight() ? '#000' : '#fff';
    }
    ColorPickerClosed(evt) {
        this.palettePickerService.CloseColorPicker(evt);
    }
    ColorPickerChange(evt) {
        this.Color = evt;
    }
}
ColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-color-picker',
                template: "<div class=\"backdrop\" *ngIf=\"ShowBackdrop\"></div>\r\n\r\n<input \r\n  type=\"text\" \r\n  [disabled]=\"Disabled\" \r\n  [colorPicker]=\"Color\" \r\n  (colorPickerOpen)=\"SetBackdrop(true)\"\r\n  [cpPresetColors]=\"Variants\" \r\n  [cpPosition]=\"'bottom-left'\"\r\n  (colorPickerClose)=\"SetBackdrop(false); ColorPickerClosed($event)\" \r\n  [cpOutputFormat]=\"'hex'\"\r\n  [cpAlphaChannel]=\"'disabled'\" \r\n  (colorPickerChange)=\"ColorPickerChange($event)\" \r\n  [value]=\"Color\"\r\n  [style.background]=\"Color\" \r\n  [style.color]=\"GetTextColor(Color)\"\r\n>\r\n",
                styles: [".backdrop{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}:host,input{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input{text-align:center;cursor:pointer}:host{display:block}"]
            },] }
];
ColorPickerComponent.ctorParameters = () => [
    { type: PalettePickerService }
];
ColorPickerComponent.propDecorators = {
    Control: [{ type: Input, args: ['control',] }],
    Disabled: [{ type: Input, args: ['disabled',] }],
    Variants: [{ type: Input, args: ['variants',] }],
    Color: [{ type: Input, args: ['color',] }]
};

class PalettePickerComponent {
    constructor(themeBuilderService, palettePickerService) {
        this.themeBuilderService = themeBuilderService;
        this.palettePickerService = palettePickerService;
        this.setupForm();
        this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
            .subscribe((val) => {
            this.updatePalette();
        });
        // Update base colors of the color picker on change
        // when manually setting colors, not using
        // the color picker itself
        this.palettePickerService.ColorPickerChanged
            .subscribe((val) => {
            this.PrimaryColor = val.primary.Main;
            this.AccentColor = val.accent.Main;
            this.WarnColor = val.warn.Main;
            // this.Primary.setValue(val.primary.main);
            // this.Accent.setValue(val.accent.main);
            // this.Warn.setValue(val.warn.main);
        });
    }
    /**
     * Access Primary form group
     */
    get Primary() {
        return this.Form.get('primary');
    }
    /**
     * Access Accent form group
     */
    get Accent() {
        return this.Form.get('accent');
    }
    /**
     * Access Warn form group
     */
    get Warn() {
        return this.Form.get('warn');
    }
    updatePalette() {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        palette.primary.Main = this.Primary.value.main;
        palette.accent.Main = this.Accent.value.main;
        palette.warn.Main = this.Warn.value.main;
        this.themeBuilderService.Palette = palette;
    }
    ngOnInit() {
        // setting initial values,
        // this isn't the right way to do this, but for the moment - shannon
        this.patchValue(ThemeBuilderConstants.InitialValues, true);
        this.Form.valueChanges
            .pipe(distinctUntilChanged((a, b) => {
            //  console.log('A', a);
            //  console.log('B', b);
            return JSON.stringify(a) !== JSON.stringify(b);
        }))
            .subscribe((palette) => {
            this.themeBuilderService.Palette = palette;
        });
    }
    ngOnDestroy() {
        this.formSubscription.unsubscribe();
        this.colorPickerClosedSubscription.unsubscribe();
    }
    patchValue(val, emitValue) {
        this.Form.patchValue(val, { emitEvent: emitValue });
    }
    /**
     * Setup the form
     */
    setupForm() {
        this.Form = new FormGroup({
            primary: new FormGroup({
                main: new FormControl(''),
                lighter: new FormControl(''),
                darker: new FormControl('')
            }, { updateOn: 'change' }),
            accent: new FormGroup({
                main: new FormControl(''),
                lighter: new FormControl(''),
                darker: new FormControl('')
            }),
            warn: new FormGroup({
                main: new FormControl(''),
                lighter: new FormControl(''),
                darker: new FormControl('')
            }, { updateOn: 'change' }),
            lightText: new FormControl('', []),
            lightBackground: new FormControl('', []),
            darkText: new FormControl('', []),
            darkBackground: new FormControl('', [])
        }, { updateOn: 'change' });
    }
}
PalettePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-palette-picker',
                template: "<div \r\n  fxLayout=\"column\" \r\n  fxLayoutGap=\"10px\">\r\n  <div \r\n    fxLayout.lg=\"row\" \r\n    fxLayout.md=\"row\" \r\n    fxLayout.sm=\"column\" \r\n    fxLayout.xs=\"column\"\r\n    fxLayoutGap=\"10px\">\r\n    <lcu-sub-palette-picker [color-picker-color]=\"PrimaryColor\" [form]=\"Primary\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"AccentColor\" [form]=\"Accent\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"WarnColor\" [form]=\"Warn\"></lcu-sub-palette-picker>\r\n  </div>\r\n  <lcu-variant-colors></lcu-variant-colors>\r\n</div>\r\n",
                styles: [""]
            },] }
];
PalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];

class SubPalettePickerComponent {
    constructor(themeBuilderService, palettePickerService) {
        this.themeBuilderService = themeBuilderService;
        this.palettePickerService = palettePickerService;
        this.Unlocked = new FormControl(false);
        this.materialKeys = [...Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY),
            ...Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)];
    }
    set ColorPickerColor(val) {
        this.Main.setValue(val);
        this.onMainChange();
    }
    /**
     * Access Main color form control
     */
    get Main() {
        return this.Form.get('main');
    }
    /**
     * Access Light color form control
     */
    get Lighter() {
        return this.Form.get('lighter');
    }
    /**
     * Access Dark color form control
     */
    get Darker() {
        return this.Form.get('darker');
    }
    /**
     * Set preset color palette
     */
    get Variants() {
        return !this.themeBuilderService.MaterialPaletteColors ? undefined :
            this.materialKeys.map((x) => {
                return this.themeBuilderService.MaterialPaletteColors[x];
            });
    }
    ngOnInit() {
        if (this.Main.value) {
            this.onMainChange();
        }
        this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
            .subscribe((val) => {
            this.onMainChange();
        });
    }
    ngOnDestroy() {
        this.palettePickerChangedSubscription.unsubscribe();
        this.colorPickerClosedSubscription.unsubscribe();
    }
    /**
     * Returns palette colors, 50 - A700
     *
     * @param color selected base color, chosen from color pickers
     */
    onMainChange() {
        this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(this.Form.value.main);
        // set lightest and darkest hue colors in color picker
        if (!this.Unlocked.value) {
            this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
            this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
        }
    }
}
SubPalettePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-sub-palette-picker',
                template: "\r\n<div fxLayout=\"column\">\r\n    <!--Main Color-->\r\n    <lcu-color-picker\r\n      class=\"main\" \r\n      [control]=\"Main\"></lcu-color-picker>\r\n  \r\n    <div fxLayout=\"row\">\r\n      <!--Light and dark colors for additional hues-->\r\n      <lcu-color-picker \r\n        class=\"lighter\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Lighter\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n  \r\n      <lcu-color-picker \r\n        class=\"darker\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Darker\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n    </div>\r\n  </div>\r\n  ",
                styles: [".darker,.lighter,.main{border:.5px solid #ddd}.darker,.lighter{height:40px}.main{height:60px}"]
            },] }
];
SubPalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];
SubPalettePickerComponent.propDecorators = {
    Form: [{ type: Input, args: ['form',] }],
    ColorPickerColor: [{ type: Input, args: ['color-picker-color',] }]
};

class ModeToggleComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
    }
    set DarkMode(val) {
        if (!val) {
            return;
        }
        this._darkMode = val;
        this.Toggle.setValue(val);
        // this.setThemeMode(val);
    }
    get DarkMode() {
        return this._darkMode;
    }
    /**
     * Access Toggle field within the form group
     */
    get Toggle() {
        if (!this.ToggleForm) {
            return null;
        }
        return this.ToggleForm.get('toggle');
    }
    ngOnInit() {
        this.formSetup();
    }
    formSetup() {
        this.ToggleForm = new FormGroup({
            toggle: new FormControl(this.DarkMode)
        });
        this.onChanges();
    }
    onChanges() {
        this.Toggle.valueChanges
            .subscribe((val) => {
            this.setThemeMode(val);
        });
    }
    toggleMode(val) {
        return val ? 'Dark Mode' : 'Light Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
ModeToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-mode-toggle',
                template: "<form \r\n    [formGroup]=\"ToggleForm\" \r\n    fxLayout=\"row\" \r\n    fxLayoutAlign=\"start center\">\r\n    <mat-slide-toggle\r\n        (click)=\"$event.stopPropagation()\" \r\n        formControlName=\"toggle\"\r\n        labelPosition=\"before\" \r\n        color=\"primary\">\r\n    </mat-slide-toggle>\r\n    <span \r\n        class=\"margin-left-1 mat-card-subtitle\">\r\n        {{ ToggleMode }}\r\n    </span>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
ModeToggleComponent.ctorParameters = () => [
    { type: ThemeBuilderService }
];
ModeToggleComponent.propDecorators = {
    DarkMode: [{ type: Input, args: ['dark-mode',] }]
};

const tinyColor = tinycolor;
class VariantColorsComponent {
    constructor(PalettePickerService, themeBuilderService, variantColorService) {
        this.PalettePickerService = PalettePickerService;
        this.themeBuilderService = themeBuilderService;
        this.variantColorService = variantColorService;
        this.PalettePickerService.PrimaryColorPalette = [];
        this.PalettePickerService.AccentColorPalette = [];
        this.PalettePickerService.WarnColorPalette = [];
    }
    // tslint:disable-next-line:no-input-rename
    set AccentColor(val) {
        this._accentColor = val;
        // this.updateAccentColor(val);
        this.variantColorService.UpdateAccentVariants(val);
    }
    get AccentColor() {
        return this._accentColor;
    }
    // tslint:disable-next-line:no-input-rename
    set PrimaryColor(val) {
        this._primaryColor = val;
        // this.updatePrimaryColor(val);
        this.variantColorService.UpdatePrimaryVariants(val);
    }
    get PrimaryColor() {
        return this.PrimaryColor;
    }
    // tslint:disable-next-line:no-input-rename
    set WarnColor(val) {
        this._warnColor = val;
        // this.updateWarnColor(val);
        this.variantColorService.UpdateWarnVariants(val);
    }
    get WarnColor() {
        return this.WarnColor;
    }
    /**
     * Access primary color field
     */
    get PrimaryColorControl() {
        return this.Form.get('primaryColorControl');
    }
    /**
     * Access accent color field
     */
    get AccentColorControl() {
        return this.Form.get('accentColorControl');
    }
    ngOnInit() {
        this.setupForm();
        this.paletteChangedSubscription = this.PalettePickerService.ColorPickerChanged
            .subscribe((palette) => {
            if (!palette || !palette.primary) {
                return;
            }
            this.variantColorService.UpdatePrimaryVariants(palette.primary.Main);
            this.variantColorService.UpdateAccentVariants(palette.accent.Main);
            this.variantColorService.UpdateWarnVariants(palette.warn.Main);
            // this.updateAccentColor(palette.accent.main);
            // this.updatePrimaryColor(palette.primary.main);
            // this.updateWarnColor(palette.warn.main);
        });
    }
    ngOnDestroy() {
        this.paletteChangedSubscription.unsubscribe();
    }
    //   protected updatePrimaryColor(color: string): void {
    //     this.PalettePickerService.PrimaryColorPalette = this.computeColors(color ? color : this.PrimaryColorControl.value);
    //     for (const c of this.PalettePickerService.PrimaryColorPalette) {
    //       const key = `--theme-primary-${c.name}`;
    //       const value = c.hex;
    //       const key2 = `--theme-primary-contrast-${c.name}`;
    //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
    //       // set or update CSS variable values
    //       document.documentElement.style.setProperty(key, value);
    //       document.documentElement.style.setProperty(key2, value2);
    //     }
    //   }
    //   protected updateAccentColor(color: string): void {
    //     this.PalettePickerService.AccentColorPalette = this.computeColors(color ? color : this.AccentColorControl.value);
    //     for (const c of this.PalettePickerService.AccentColorPalette) {
    //       const key = `--theme-accent-${c.name}`;
    //       const value = c.hex;
    //       const key2 = `--theme-primary-contrast-${c.name}`;
    //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
    //       document.documentElement.style.setProperty(key, value);
    //       document.documentElement.style.setProperty(key2, value2);
    //     }
    //   }
    //   protected updateWarnColor(color: string): void {
    //     this.PalettePickerService.WarnColorPalette = this.computeColors(color);
    //     for (const c of this.PalettePickerService.WarnColorPalette) {
    //       const key = `--theme-warn-${c.name}`;
    //       const value = c.hex;
    //       const key2 = `--theme-primary-contrast-${c.name}`;
    //       const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
    //       document.documentElement.style.setProperty(key, value);
    //       document.documentElement.style.setProperty(key2, value2);
    //     }
    //   }
    setupForm() {
        this.Form = new FormGroup({
            primaryColorControl: new FormControl('#ffcc11'),
            accentColorControl: new FormControl('#0000aa')
        });
    }
}
VariantColorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-variant-colors',
                template: "<form\r\n    fxLayout=\"column\"\r\n    fxLayoutGap=\"10px\"\r\n    [formGroup]=\"Form\"\r\n    novalidate>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\" \r\n            *ngFor=\"let color of PalettePickerService.PrimaryColorPalette\" \r\n            [style.background-color]=\"color.hex\" \r\n            [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n            <div>\r\n                {{color.name}}\r\n            </div>\r\n            <div>\r\n                {{color.hex}}\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n                fxLayoutAlign=\"space-between center\"\r\n                class=\"padding-left-2 padding-right-2\"\r\n                *ngFor=\"let color of PalettePickerService.AccentColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\"\r\n            *ngFor=\"let color of PalettePickerService.WarnColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
VariantColorsComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
VariantColorsComponent.propDecorators = {
    AccentColor: [{ type: Input, args: ['accent-color',] }],
    PrimaryColor: [{ type: Input, args: ['primary-color',] }],
    WarnColor: [{ type: Input, args: ['warn-color',] }]
};

class ThemePickerModel {
    constructor(opts) {
        Object.assign(this, opts); // destructure values
    }
}

class ThemePickerComponent {
    constructor(palettePickerService, themeBuilderService, variantColorService) {
        this.palettePickerService = palettePickerService;
        this.themeBuilderService = themeBuilderService;
        this.variantColorService = variantColorService;
        this.setupForm();
    }
    set DarkMode(val) {
        if (!val) {
            return;
        }
        this._darkMode = val;
    }
    get DarkMode() {
        return this._darkMode;
    }
    get MaterialTheming() {
        return this._materialTheming;
    }
    set MaterialTheming(val) {
        this._materialTheming = val;
        // this.themeBuilderService.MaterialTheme = val;
    }
    /**
     * Access manual accent color field
     */
    get ManualAccent() {
        return this.ManualForm.get('manualAccent');
    }
    /**
     * Access manual primary color field
     */
    get ManualPrimary() {
        return this.ManualForm.get('manualPrimary');
    }
    /**
     * Access manual theme name field
     */
    get ManualThemeName() {
        return this.ManualForm.get('manualThemeName');
    }
    /**
     * Access manual warn color field
     */
    get ManualWarn() {
        return this.ManualForm.get('manualWarn');
    }
    ngOnInit() {
        this.themes();
    }
    /**
     * When selecting a theme from the list
     *
     * @param theme selected theme
     */
    SetActiveTheme(theme) {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        const colors = [theme.Primary, theme.Accent, theme.Warn];
        palette.primary.Main = theme.Primary;
        palette.accent.Main = theme.Accent;
        palette.warn.Main = theme.Warn;
        palette.DarkMode = theme.DarkMode;
        this.DarkMode = palette.DarkMode;
        this.variantColorService.UpdatePrimaryVariants(theme.Primary);
        this.variantColorService.UpdateAccentVariants(theme.Accent);
        this.variantColorService.UpdateWarnVariants(theme.Warn);
        this.themeBuilderService.Palette = palette;
        this.themes();
    }
    /**
     * Manually create theme, by using inputs
     */
    SetManualTheme() {
        let manualPalette;
        manualPalette = new ThemePickerModel({
            ID: this.ManualThemeName.value,
            Primary: this.ManualPrimary.value,
            Accent: this.ManualAccent.value,
            Warn: this.ManualWarn.value,
            DarkMode: true
        });
        this.themeBuilderService.Themes.unshift(manualPalette);
        this.SetActiveTheme(manualPalette);
    }
    /**
     * Setup form controls
     */
    setupForm() {
        this.ManualForm = new FormGroup({
            manualThemeName: new FormControl('', { validators: Validators.required }),
            manualPrimary: new FormControl('', { validators: Validators.required }),
            manualAccent: new FormControl('', { validators: Validators.required }),
            manualWarn: new FormControl('', { validators: Validators.required })
        });
    }
    /**
     * Create themes for theme picker
     */
    themes() {
        this.Themes = this.themeBuilderService.Themes;
    }
}
ThemePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle [dark-mode]=\"DarkMode\" class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button \r\n                mat-button class=\"theme-selector\" \r\n                (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <div class=\"theme-dark-mode\" \r\n                             [ngClass]=\"{'dark-mode' : theme.DarkMode, 'light-mode': !theme.DarkMode}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }} {{ theme.DarkMode }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <!-- Manual Form Controls -->\r\n        <div\r\n            *ngIf=\"ToggleManualControls\" \r\n            class=\"margin-2 \r\n            margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}div.theme-dark-mode{width:10px;height:10px;position:absolute;bottom:10px;left:55px}.dark-mode{background-color:#222}.light-mode{background-color:#f9f9f9}"]
            },] }
];
ThemePickerComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
ThemePickerComponent.propDecorators = {
    DarkMode: [{ type: Input, args: ['dark-mode',] }],
    ToggleManualControls: [{ type: Input, args: ['toggle-manual-controls',] }],
    MaterialTheming: [{ type: Input, args: ['material-theming',] }]
};
// function Input(arg0: string) {
//   throw new Error('Function not implemented.');
// }

class ThemeBuilderModule {
    static forRoot() {
        return {
            ngModule: ThemeBuilderModule,
            providers: [
                ThemeBuilderService,
                PalettePickerService
            ]
        };
    }
}
ThemeBuilderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ThemeBuilderComponent,
                    ThemeBuilderDirective,
                    ColorPickerComponent,
                    PalettePickerComponent,
                    SubPalettePickerComponent,
                    ModeToggleComponent,
                    VariantColorsComponent,
                    ThemePickerComponent
                ],
                imports: [
                    FathymSharedModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MaterialModule,
                    ColorPickerModule
                ],
                exports: [
                    ThemeBuilderComponent,
                    ThemeBuilderDirective,
                    ThemePickerComponent,
                    ModeToggleComponent
                ],
                entryComponents: [
                    ThemePickerComponent
                ]
            },] }
];

class ThemeBuilderModel {
}

class SubPaletteModel {
}

class ThemeModel {
}

class ColorModel {
}

/**
 * Generated bundle index. Do not edit.
 */

export { ColorModel, ColorPickerComponent, ModeToggleComponent, PaletteModel, PalettePickerService, SubPaletteModel, ThemeBuilderComponent, ThemeBuilderConstants, ThemeBuilderDirective, ThemeBuilderModel, ThemeBuilderModule, ThemeBuilderService, ThemeModel, ThemePickerComponent, ThemePickerModel, VariantColorService, PalettePickerComponent as ɵa, PaletteTemplateService as ɵb, LocalStorageService as ɵc, UtilsService as ɵd, SubPalettePickerComponent as ɵe, VariantColorsComponent as ɵf };
//# sourceMappingURL=lowcodeunit-lcu-theme-builder-common.js.map
