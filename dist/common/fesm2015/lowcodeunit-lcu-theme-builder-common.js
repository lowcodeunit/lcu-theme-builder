import * as i0 from '@angular/core';
import { Injectable, Component, Directive, HostListener, Input, NgModule } from '@angular/core';
import * as i12 from '@angular/forms';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import * as i1$1 from '@lcu/common';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import * as i3$1 from 'ngx-color-picker';
import { ColorPickerModule } from 'ngx-color-picker';
import { __awaiter } from 'tslib';
import * as tinycolor from 'tinycolor2';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i3 from '@angular/flex-layout/flex';
import * as i2 from '@angular/material/toolbar';
import * as i8 from '@angular/common';
import * as i4 from '@angular/material/slide-toggle';
import * as i4$1 from '@angular/material/button';
import * as i5 from '@angular/material/menu';
import * as i6 from '@angular/material/icon';
import * as i10 from '@angular/flex-layout/extended';
import * as i11 from '@angular/material/card';
import * as i13 from '@angular/material/form-field';
import * as i14 from '@angular/material/input';

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
    primary: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'), lighter: null, darker: null },
    accent: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'), lighter: null, darker: null },
    warn: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-warn'), lighter: null, darker: null },
    lightText: ThemeBuilderConstants.document.getPropertyValue('--initial-light-text'),
    lightBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-light-background'),
    darkText: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-text'),
    darkBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-background')
};

class PaletteModel {
}

const tinyColor$5 = tinycolor;
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
      $dark-text: ${theme.palette.lightText};
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
      $light-text: ${theme.palette.darkText};
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
      $light-background:    ${theme.palette.lightBackground};
      $light-bg-darker-5:   darken($light-background, 5%);
      $light-bg-darker-10:  darken($light-background, 10%);
      $light-bg-darker-20:  darken($light-background, 20%);
      $light-bg-darker-30:  darken($light-background, 30%);
      $light-bg-lighter-5:  lighten($light-background, 5%);
      $dark-bg-alpha-4:     rgba(${theme.palette.darkBackground}, 0.04);
      $dark-bg-alpha-12:    rgba(${theme.palette.darkBackground}, 0.12);

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
      $dark-background:     ${theme.palette.darkBackground};
      $dark-bg-lighter-5:   lighten($dark-background, 5%);
      $dark-bg-lighter-10:  lighten($dark-background, 10%);
      $dark-bg-lighter-20:  lighten($dark-background, 20%);
      $dark-bg-lighter-30:  lighten($dark-background, 30%);
      $light-bg-alpha-4:    rgba(${theme.palette.lightBackground}, 0.04);
      $light-bg-alpha-12:   rgba(${theme.palette.lightBackground}, 0.12);

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
      ${['primary', 'accent', 'warn'].map(x => this.getScssPalette(x, theme.palette[x])).join('\n')};

      $theme: ${!theme.lightness ? 'mat-dark-theme' : 'mat-light-theme'}($theme-primary, $theme-accent, $theme-warn);
      $altTheme: ${!theme.lightness ? 'mat-light-theme' : 'mat-dark-theme'}($theme-primary, $theme-accent, $theme-warn);

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
        --${name}-color: ${subPalette.main};
        --${name}-lighter-color: ${subPalette.lighter};
        --${name}-darker-color: ${subPalette.darker};
        --text-${name}-color: #{${this.getTextColor(subPalette.main)}};
        --text-${name}-lighter-color: #{${this.getTextColor(subPalette.lighter)}};
        --text-${name}-darker-color: #{${this.getTextColor(subPalette.darker)}};
      }

    $mat-${name}: (
      main: ${subPalette.main},
      lighter: ${subPalette.lighter},
      darker: ${subPalette.darker},
      200: ${subPalette.main}, // For slide toggle,
      contrast : (
        main: ${this.getTextColor(subPalette.main)},
        lighter: ${this.getTextColor(subPalette.lighter)},
        darker: ${this.getTextColor(subPalette.darker)},
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
        return `$${tinyColor$5(col).isLight() ? 'dark' : 'light'}-primary-text`;
    }
}
PaletteTemplateService.ɵfac = function PaletteTemplateService_Factory(t) { return new (t || PaletteTemplateService)(); };
PaletteTemplateService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PaletteTemplateService, factory: PaletteTemplateService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaletteTemplateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

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
LocalStorageService.ɵfac = function LocalStorageService_Factory(t) { return new (t || LocalStorageService)(); };
LocalStorageService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LocalStorageService, factory: LocalStorageService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LocalStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

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
PalettePickerService.ɵfac = function PalettePickerService_Factory(t) { return new (t || PalettePickerService)(); };
PalettePickerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PalettePickerService, factory: PalettePickerService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PalettePickerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

const tinyColor$4 = tinycolor;
class UtilsService {
    Multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinyColor$4('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    }
}
UtilsService.ɵfac = function UtilsService_Factory(t) { return new (t || UtilsService)(); };
UtilsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

const tinyColor$3 = tinycolor;
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
        const baseLightColor = tinyColor$3('#ffffff');
        let baseDarkColor = tinyColor$3('#222222');
        if (this.utilsService.Multiply) {
            baseDarkColor = this.utilsService.Multiply(tinyColor$3(color).toRgb(), tinyColor$3(color).toRgb());
        }
        const [, , , baseTetrad] = tinyColor$3(color).tetrad();
        return [
            this.getColorObject(tinyColor$3.mix(baseLightColor, tinyColor$3(color), 12), '50'),
            this.getColorObject(tinyColor$3.mix(baseLightColor, tinyColor$3(color), 30), '100'),
            this.getColorObject(tinyColor$3.mix(baseLightColor, tinyColor$3(color), 50), '200'),
            this.getColorObject(tinyColor$3.mix(baseLightColor, tinyColor$3(color), 70), '300'),
            this.getColorObject(tinyColor$3.mix(baseLightColor, tinyColor$3(color), 85), '400'),
            this.getColorObject(tinyColor$3(color), '500'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, tinyColor$3(color), 87), '600'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, tinyColor$3(color), 70), '700'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, tinyColor$3(color), 54), '800'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, tinyColor$3(color), 25), '900'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
            this.getColorObject(tinyColor$3.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
        ];
    }
    // force change
    getColorObject(value, name) {
        const c = tinyColor$3(value);
        return {
            name,
            hex: c.toHexString(),
            darkContrast: c.isLight()
        };
    }
}
VariantColorService.ɵfac = function VariantColorService_Factory(t) { return new (t || VariantColorService)(i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(UtilsService)); };
VariantColorService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: VariantColorService, factory: VariantColorService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VariantColorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: PalettePickerService }, { type: UtilsService }]; }, null); })();

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
        this.MaterialTheme = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
        this.themeMode = true;
        this.Theme = new Subject();
        this.PaletteColors = new Subject();
        // this.ThemeScss = this.loadThemingScss();
        this.PaletteList = [];
    }
    set MaterialTheme(val) {
        this._materialTheme = val;
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
        this.UpdateTheme(this.getTheme());
    }
    get Palette() {
        return this.palette;
    }
    set ThemeMode(light) {
        this.themeMode = !light;
        this.UpdateTheme(this.getTheme());
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
        // return this.http.get('https://www.iot-ensemble.com/assets/theming/theming.scss', { responseType: 'text' })
        return this.http.get(this.MaterialTheme, { responseType: 'text' })
            .pipe(map((x) => {
            return x
                .replace(/\n/gm, '??')
                .replace(/\$mat-([^:?]+)\s*:\s*\([? ]*50:[^()]*contrast\s*:\s*\([^)]+\)[ ?]*\);\s*?/g, (all, name) => name === 'grey' ? all : '')
                .replace(/\/\*.*?\*\//g, '')
                .split(/[?][?]/g)
                .map((l) => l
                .replace(/^\s*(\/\/.*)?$/g, '')
                .replace(/^\$mat-blue-gray\s*:\s*\$mat-blue-grey\s*;\s*/g, '')
                .replace(/^\s*|\s*$/g, '')
                .replace(/:\s\s+/g, ': '))
                .filter((l) => !!l)
                .join('\n');
        }), map((txt) => 
        // writeFile allows this file to be accessed from styles.scss
        Sass.writeFile('~@angular/material/theming', txt, (result) => {
            // console.log('Sass.writeFile', result);
        }))).toPromise();
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
            yield this.ThemeScss;
            return new Promise((res, rej) => {
                Sass.compile(theme.replace('@include angular-material-theme($altTheme);', ''), (v) => {
                    if (v.status === 0) {
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
            palette: this.Palette,
            lightness: this.ThemeMode,
        };
    }
    UpdateTheme(theme) {
        // SASS stylesheet
        const source = this.GetTemplate(theme);
        // Running functions outside of Angular's zone and do work that
        // doesn't trigger Angular change-detection.
        this.zone.runOutsideAngular(() => {
            this.CompileScssTheme(source).then((text) => {
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
                console.error(err);
            });
        });
    }
    SetThemes(themes) {
        this.Themes = themes;
        let initial = new PaletteModel();
        initial = Object.assign(Object.assign({}, ThemeBuilderConstants.InitialValues), initial);
        initial.primary.main = this.Themes[0].Primary;
        initial.accent.main = this.Themes[0].Accent;
        initial.warn.main = this.Themes[0].Warn;
        this.Palette = initial;
        this.variantColorService.UpdatePrimaryVariants(this.Themes[0].Primary);
        this.variantColorService.UpdateAccentVariants(this.Themes[0].Accent);
        this.variantColorService.UpdateWarnVariants(this.Themes[0].Warn);
    }
}
ThemeBuilderService.ɵfac = function ThemeBuilderService_Factory(t) { return new (t || ThemeBuilderService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(PaletteTemplateService), i0.ɵɵinject(LocalStorageService), i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(UtilsService), i0.ɵɵinject(VariantColorService)); };
ThemeBuilderService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeBuilderService, factory: ThemeBuilderService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: PaletteTemplateService }, { type: LocalStorageService }, { type: PalettePickerService }, { type: i0.NgZone }, { type: UtilsService }, { type: VariantColorService }]; }, null); })();

class ThemeBuilderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ThemeBuilderComponent.ɵfac = function ThemeBuilderComponent_Factory(t) { return new (t || ThemeBuilderComponent)(); };
ThemeBuilderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ThemeBuilderComponent, selectors: [["lcu-theme-builder"]], decls: 11, vars: 0, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["color", "primary"], [1, "primary-color"], ["color", "accent"], [1, "accent-color"], ["color", "warn"], [1, "warn-color"]], template: function ThemeBuilderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "mat-toolbar", 2);
        i0.ɵɵelementStart(3, "span", 3);
        i0.ɵɵtext(4, "Primary Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "mat-toolbar", 4);
        i0.ɵɵelementStart(6, "span", 5);
        i0.ɵɵtext(7, "Accent Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "mat-toolbar", 6);
        i0.ɵɵelementStart(9, "span", 7);
        i0.ɵɵtext(10, "Warn Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, directives: [i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, i2.MatToolbar], styles: [".primary-color[_ngcontent-%COMP%]{color:var(--theme-primary-A700)}.accent-color[_ngcontent-%COMP%]{color:var(--theme-accent-A700)}.warn-color[_ngcontent-%COMP%]{color:var(--theme-warn-A700)}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-builder',
                templateUrl: './theme-builder.component.html',
                styleUrls: ['./theme-builder.component.scss']
            }]
    }], function () { return []; }, null); })();

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
ThemeBuilderDirective.ɵfac = function ThemeBuilderDirective_Factory(t) { return new (t || ThemeBuilderDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1$1.ThemeColorPickerService)); };
ThemeBuilderDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ThemeBuilderDirective, selectors: [["", "theme-builder", ""]], hostBindings: function ThemeBuilderDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseenter", function ThemeBuilderDirective_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function ThemeBuilderDirective_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderDirective, [{
        type: Directive,
        args: [{
                selector: '[theme-builder]'
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1$1.ThemeColorPickerService }]; }, { onMouseEnter: [{
            type: HostListener,
            args: ['mouseenter']
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
        }] }); })();

function ColorPickerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} }
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
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(i0.ɵɵdirectiveInject(PalettePickerService)); };
ColorPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["lcu-color-picker"]], inputs: { Control: ["control", "Control"], Disabled: ["disabled", "Disabled"], Variants: ["variants", "Variants"], Color: ["color", "Color"] }, decls: 2, vars: 12, consts: [["class", "backdrop", 4, "ngIf"], ["type", "text", 3, "disabled", "colorPicker", "cpPresetColors", "cpPosition", "cpOutputFormat", "cpAlphaChannel", "value", "colorPickerOpen", "colorPickerClose", "colorPickerChange"], [1, "backdrop"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ColorPickerComponent_div_0_Template, 1, 0, "div", 0);
        i0.ɵɵelementStart(1, "input", 1);
        i0.ɵɵlistener("colorPickerOpen", function ColorPickerComponent_Template_input_colorPickerOpen_1_listener() { return ctx.SetBackdrop(true); })("colorPickerClose", function ColorPickerComponent_Template_input_colorPickerClose_1_listener($event) { ctx.SetBackdrop(false); return ctx.ColorPickerClosed($event); })("colorPickerChange", function ColorPickerComponent_Template_input_colorPickerChange_1_listener($event) { return ctx.ColorPickerChange($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.ShowBackdrop);
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("background", ctx.Color)("color", ctx.GetTextColor(ctx.Color));
        i0.ɵɵproperty("disabled", ctx.Disabled)("colorPicker", ctx.Color)("cpPresetColors", ctx.Variants)("cpPosition", "bottom-left")("cpOutputFormat", "hex")("cpAlphaChannel", "disabled")("value", ctx.Color);
    } }, directives: [i8.NgIf, i3$1.ColorPickerDirective], styles: [".backdrop[_ngcontent-%COMP%]{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}[_nghost-%COMP%], input[_ngcontent-%COMP%]{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input[_ngcontent-%COMP%]{text-align:center;cursor:pointer}[_nghost-%COMP%]{display:block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-color-picker',
                templateUrl: './color-picker.component.html',
                styleUrls: ['./color-picker.component.scss']
            }]
    }], function () { return [{ type: PalettePickerService }]; }, { Control: [{
            type: Input,
            args: ['control']
        }], Disabled: [{
            type: Input,
            args: ['disabled']
        }], Variants: [{
            type: Input,
            args: ['variants']
        }], Color: [{
            type: Input,
            args: ['color']
        }] }); })();

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
SubPalettePickerComponent.ɵfac = function SubPalettePickerComponent_Factory(t) { return new (t || SubPalettePickerComponent)(i0.ɵɵdirectiveInject(ThemeBuilderService), i0.ɵɵdirectiveInject(PalettePickerService)); };
SubPalettePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SubPalettePickerComponent, selectors: [["lcu-sub-palette-picker"]], inputs: { Form: ["form", "Form"], ColorPickerColor: ["color-picker-color", "ColorPickerColor"] }, decls: 5, vars: 7, consts: [["fxLayout", "column"], [1, "main", 3, "control"], ["fxLayout", "row"], [1, "lighter", 3, "disabled", "control", "variants"], [1, "darker", 3, "disabled", "control", "variants"]], template: function SubPalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "lcu-color-picker", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelement(3, "lcu-color-picker", 3);
        i0.ɵɵelement(4, "lcu-color-picker", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("control", ctx.Main);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Lighter)("variants", ctx.Variants);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Darker)("variants", ctx.Variants);
    } }, directives: [i3.DefaultLayoutDirective, ColorPickerComponent], styles: [".darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%], .main[_ngcontent-%COMP%]{border:.5px solid #ddd}.darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%]{height:40px}.main[_ngcontent-%COMP%]{height:60px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SubPalettePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-sub-palette-picker',
                templateUrl: './sub-palette-picker.component.html',
                styleUrls: ['./sub-palette-picker.component.scss']
            }]
    }], function () { return [{ type: ThemeBuilderService }, { type: PalettePickerService }]; }, { Form: [{
            type: Input,
            args: ['form']
        }], ColorPickerColor: [{
            type: Input,
            args: ['color-picker-color']
        }] }); })();

function VariantColorsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r3 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r3.hex)("color", color_r3.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r3.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r3.hex, " ");
} }
function VariantColorsComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r4.hex)("color", color_r4.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r4.hex, " ");
} }
function VariantColorsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r5.hex)("color", color_r5.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r5.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r5.hex, " ");
} }
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
            this.variantColorService.UpdatePrimaryVariants(palette.primary.main);
            this.variantColorService.UpdateAccentVariants(palette.accent.main);
            this.variantColorService.UpdateWarnVariants(palette.warn.main);
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
VariantColorsComponent.ɵfac = function VariantColorsComponent_Factory(t) { return new (t || VariantColorsComponent)(i0.ɵɵdirectiveInject(PalettePickerService), i0.ɵɵdirectiveInject(ThemeBuilderService), i0.ɵɵdirectiveInject(VariantColorService)); };
VariantColorsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VariantColorsComponent, selectors: [["lcu-variant-colors"]], inputs: { AccentColor: ["accent-color", "AccentColor"], PrimaryColor: ["primary-color", "PrimaryColor"], WarnColor: ["warn-color", "WarnColor"] }, decls: 8, vars: 4, consts: [["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["fxFlex", "33", "fxLayout", "column"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", "class", "padding-left-2 padding-right-2", 3, "background-color", "color", 4, "ngFor", "ngForOf"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", 1, "padding-left-2", "padding-right-2"]], template: function VariantColorsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, VariantColorsComponent_div_3_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 2);
        i0.ɵɵtemplate(5, VariantColorsComponent_div_5_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 2);
        i0.ɵɵtemplate(7, VariantColorsComponent_div_7_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.Form);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.PrimaryColorPalette);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.AccentColorPalette);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.WarnColorPalette);
    } }, directives: [i12.ɵNgNoValidate, i12.NgControlStatusGroup, i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, i12.FormGroupDirective, i3.DefaultFlexDirective, i8.NgForOf, i3.DefaultLayoutAlignDirective], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VariantColorsComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-variant-colors',
                templateUrl: './variant-colors.component.html',
                styleUrls: ['./variant-colors.component.scss']
            }]
    }], function () { return [{ type: PalettePickerService }, { type: ThemeBuilderService }, { type: VariantColorService }]; }, { AccentColor: [{
            type: Input,
            args: ['accent-color']
        }], PrimaryColor: [{
            type: Input,
            args: ['primary-color']
        }], WarnColor: [{
            type: Input,
            args: ['warn-color']
        }] }); })();

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
            this.PrimaryColor = val.primary.main;
            this.AccentColor = val.accent.main;
            this.WarnColor = val.warn.main;
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
        palette.primary.main = this.Primary.value.main;
        palette.accent.main = this.Accent.value.main;
        palette.warn.main = this.Warn.value.main;
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
PalettePickerComponent.ɵfac = function PalettePickerComponent_Factory(t) { return new (t || PalettePickerComponent)(i0.ɵɵdirectiveInject(ThemeBuilderService), i0.ɵɵdirectiveInject(PalettePickerService)); };
PalettePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PalettePickerComponent, selectors: [["lcu-palette-picker"]], decls: 6, vars: 6, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout.lg", "row", "fxLayout.md", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", "fxLayoutGap", "10px"], [3, "color-picker-color", "form"]], template: function PalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "lcu-sub-palette-picker", 2);
        i0.ɵɵelement(3, "lcu-sub-palette-picker", 2);
        i0.ɵɵelement(4, "lcu-sub-palette-picker", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(5, "lcu-variant-colors");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("color-picker-color", ctx.PrimaryColor)("form", ctx.Primary);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("color-picker-color", ctx.AccentColor)("form", ctx.Accent);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("color-picker-color", ctx.WarnColor)("form", ctx.Warn);
    } }, directives: [i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, SubPalettePickerComponent, VariantColorsComponent], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PalettePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-palette-picker',
                templateUrl: './palette-picker.component.html',
                styleUrls: ['./palette-picker.component.scss']
            }]
    }], function () { return [{ type: ThemeBuilderService }, { type: PalettePickerService }]; }, null); })();

class LightnessPickerComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
    }
    set DarkMode(val) {
        if (!val) {
            return;
        }
        this._darkMode = val;
        this.setThemeMode(val);
    }
    get DarkMode() {
        return this._darkMode;
    }
    /**
     * Access Toggle field within the form group
     */
    get Toggle() {
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
        return val ? 'Light Mode' : 'Dark Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
LightnessPickerComponent.ɵfac = function LightnessPickerComponent_Factory(t) { return new (t || LightnessPickerComponent)(i0.ɵɵdirectiveInject(ThemeBuilderService)); };
LightnessPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LightnessPickerComponent, selectors: [["lcu-mode-toggle"]], inputs: { DarkMode: ["dark-mode", "DarkMode"] }, decls: 4, vars: 2, consts: [["fxLayout", "row", "fxLayoutAlign", "start center", 3, "formGroup"], ["formControlName", "toggle", "labelPosition", "before", "color", "primary", 3, "click"], [1, "margin-left-1", "mat-card-subtitle"]], template: function LightnessPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "mat-slide-toggle", 1);
        i0.ɵɵlistener("click", function LightnessPickerComponent_Template_mat_slide_toggle_click_1_listener($event) { return $event.stopPropagation(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.ToggleForm);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", ctx.ToggleMode, " ");
    } }, directives: [i12.ɵNgNoValidate, i12.NgControlStatusGroup, i3.DefaultLayoutDirective, i3.DefaultLayoutAlignDirective, i12.FormGroupDirective, i4.MatSlideToggle, i12.NgControlStatus, i12.FormControlName], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightnessPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-mode-toggle',
                templateUrl: './mode-toggle.component.html',
                styleUrls: ['./mode-toggle.component.scss']
            }]
    }], function () { return [{ type: ThemeBuilderService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
        }] }); })();

class ThemePickerModel {
    constructor(opts) {
        Object.assign(this, opts); // destructure values
    }
}

const _c0 = function (a0) { return { "background-color": a0 }; };
function ThemePickerComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "button", 8);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_7_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r5); const theme_r3 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.SetActiveTheme(theme_r3); });
    i0.ɵɵelementStart(2, "div", 9);
    i0.ɵɵelementStart(3, "div", 10);
    i0.ɵɵelement(4, "div", 11);
    i0.ɵɵelement(5, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 13);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const theme_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c0, theme_r3.Primary));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(6, _c0, theme_r3.Accent));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(8, _c0, theme_r3.Warn));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", theme_r3.ID, " ");
} }
function ThemePickerComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelementStart(1, "mat-card");
    i0.ɵɵelementStart(2, "mat-card-header");
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵelementStart(4, "mat-icon", 16);
    i0.ɵɵtext(5, "palette");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "mat-card-title");
    i0.ɵɵtext(7, " Manual Theme ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "mat-card-content");
    i0.ɵɵelementStart(9, "form", 17);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_form_click_9_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(10, "mat-form-field");
    i0.ɵɵelement(11, "input", 18);
    i0.ɵɵelementStart(12, "mat-hint");
    i0.ɵɵtext(13, "Theme Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "mat-form-field");
    i0.ɵɵelement(15, "input", 19);
    i0.ɵɵelementStart(16, "mat-hint");
    i0.ɵɵtext(17, "Primary Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "mat-form-field");
    i0.ɵɵelement(19, "input", 20);
    i0.ɵɵelementStart(20, "mat-hint");
    i0.ɵɵtext(21, "Accent Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "mat-form-field");
    i0.ɵɵelement(23, "input", 21);
    i0.ɵɵelementStart(24, "mat-hint");
    i0.ɵɵtext(25, "Warn Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "mat-card-actions");
    i0.ɵɵelementStart(27, "button", 22);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.SetManualTheme(); });
    i0.ɵɵtext(28, " Set Theme ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("formGroup", ctx_r2.ManualForm);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("disabled", !ctx_r2.ManualForm.valid);
} }
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
    SetActiveTheme(theme) {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        const colors = [theme.Primary, theme.Accent, theme.Warn];
        palette.primary.main = theme.Primary;
        palette.accent.main = theme.Accent;
        palette.warn.main = theme.Warn;
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
            Warn: this.ManualWarn.value
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
ThemePickerComponent.ɵfac = function ThemePickerComponent_Factory(t) { return new (t || ThemePickerComponent)(i0.ɵɵdirectiveInject(PalettePickerService), i0.ɵɵdirectiveInject(ThemeBuilderService), i0.ɵɵdirectiveInject(VariantColorService)); };
ThemePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ThemePickerComponent, selectors: [["lcu-theme-picker"]], inputs: { DarkMode: ["dark-mode", "DarkMode"], ToggleManualControls: ["toggle-manual-controls", "ToggleManualControls"], MaterialTheming: ["material-theming", "MaterialTheming"] }, decls: 9, vars: 4, consts: [["mat-icon-button", "", "id", "theme-selector", "tabindex", "-1", 3, "mat-menu-trigger-for"], [1, "auto-flip"], ["themeMenu", "matMenu"], [1, "margin-2", 3, "dark-mode"], ["tabindex", "-1", 1, "theme-selector-container", 3, "click", "keydown.tab", "keydown.shift.tab"], ["fxLayout", "column", 4, "ngFor", "ngForOf"], ["class", "margin-2 \n            margin-top-5", 4, "ngIf"], ["fxLayout", "column"], ["mat-button", "", 1, "theme-selector", 3, "click"], ["fxLayout", "row", "fxLayout", "start center", 1, "margin-1"], [1, "theme-primary", 3, "ngStyle"], [1, "theme-accent", 3, "ngStyle"], [1, "theme-warn", 3, "ngStyle"], [1, "margin-left-2", "mat-card-subtitle"], [1, "margin-2", "margin-top-5"], ["mat-card-avatar", "", 1, "lcu-card-avatar"], ["color", "accent"], ["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup", "click"], ["type", "text", "matInput", "", "formControlName", "manualThemeName"], ["type", "text", "matInput", "", "formControlName", "manualPrimary"], ["type", "text", "matInput", "", "formControlName", "manualAccent"], ["type", "text", "matInput", "", "formControlName", "manualWarn"], ["mat-raised-button", "", "color", "primary", 1, "margin-top-3", 3, "disabled", "click"]], template: function ThemePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "button", 0);
        i0.ɵɵelementStart(1, "mat-icon", 1);
        i0.ɵɵtext(2, "format_color_fill");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "mat-menu", null, 2);
        i0.ɵɵelement(5, "lcu-mode-toggle", 3);
        i0.ɵɵelementStart(6, "div", 4);
        i0.ɵɵlistener("click", function ThemePickerComponent_Template_div_click_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.shift.tab", function ThemePickerComponent_Template_div_keydown_shift_tab_6_listener($event) { return $event.stopPropagation(); });
        i0.ɵɵtemplate(7, ThemePickerComponent_div_7_Template, 8, 10, "div", 5);
        i0.ɵɵtemplate(8, ThemePickerComponent_div_8_Template, 29, 2, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(4);
        i0.ɵɵproperty("mat-menu-trigger-for", _r0);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("dark-mode", ctx.DarkMode);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.Themes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.ToggleManualControls);
    } }, directives: [i4$1.MatButton, i5.MatMenuTrigger, i6.MatIcon, i5.MatMenu, LightnessPickerComponent, i8.NgForOf, i8.NgIf, i3.DefaultLayoutDirective, i8.NgStyle, i10.DefaultStyleDirective, i11.MatCard, i11.MatCardHeader, i11.MatCardAvatar, i11.MatCardTitle, i11.MatCardContent, i12.ɵNgNoValidate, i12.NgControlStatusGroup, i3.DefaultLayoutGapDirective, i12.FormGroupDirective, i13.MatFormField, i14.MatInput, i12.DefaultValueAccessor, i12.NgControlStatus, i12.FormControlName, i13.MatHint, i11.MatCardActions], styles: [".toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-selectors-container[_ngcontent-%COMP%]{width:390px;margin:0 8px}div.theme-primary[_ngcontent-%COMP%]{width:50px;height:50px}div.theme-accent[_ngcontent-%COMP%]{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn[_ngcontent-%COMP%]{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-picker',
                templateUrl: './theme-picker.component.html',
                styleUrls: ['./theme-picker.component.scss']
            }]
    }], function () { return [{ type: PalettePickerService }, { type: ThemeBuilderService }, { type: VariantColorService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
        }], ToggleManualControls: [{
            type: Input,
            args: ['toggle-manual-controls']
        }], MaterialTheming: [{
            type: Input,
            args: ['material-theming']
        }] }); })();

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
ThemeBuilderModule.ɵfac = function ThemeBuilderModule_Factory(t) { return new (t || ThemeBuilderModule)(); };
ThemeBuilderModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ThemeBuilderModule });
ThemeBuilderModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[
            FathymSharedModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MaterialModule,
            ColorPickerModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ThemeBuilderComponent,
                    ThemeBuilderDirective,
                    ColorPickerComponent,
                    PalettePickerComponent,
                    SubPalettePickerComponent,
                    LightnessPickerComponent,
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
                    ThemePickerComponent
                ],
                entryComponents: [
                    ThemePickerComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ThemeBuilderModule, { declarations: [ThemeBuilderComponent,
        ThemeBuilderDirective,
        ColorPickerComponent,
        PalettePickerComponent,
        SubPalettePickerComponent,
        LightnessPickerComponent,
        VariantColorsComponent,
        ThemePickerComponent], imports: [FathymSharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        ColorPickerModule], exports: [ThemeBuilderComponent,
        ThemeBuilderDirective,
        ThemePickerComponent] }); })();

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

export { ColorModel, ColorPickerComponent, LightnessPickerComponent, PaletteModel, PalettePickerService, SubPaletteModel, ThemeBuilderComponent, ThemeBuilderConstants, ThemeBuilderDirective, ThemeBuilderModel, ThemeBuilderModule, ThemeBuilderService, ThemeModel, ThemePickerComponent, ThemePickerModel, VariantColorService };
//# sourceMappingURL=lowcodeunit-lcu-theme-builder-common.js.map
