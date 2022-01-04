import { __awaiter } from "tslib";
import { UtilsService } from './utils.service';
import { VariantColorService } from './variant-color.service';
import { PalettePickerService } from './palette-picker.service';
import { LocalStorageService } from './local-storage.service';
import { ThemeBuilderConstants } from '../utils/theme-builder-constants.utils';
import { Injectable, NgZone } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PaletteTemplateService } from './palette-template.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./palette-template.service";
import * as i3 from "./local-storage.service";
import * as i4 from "./palette-picker.service";
import * as i5 from "./utils.service";
import * as i6 from "./variant-color.service";
const tinyColor = tinycolor;
const fallbackURL = 'https://www.iot-ensemble.com/assets/theming/theming.scss';
export class ThemeBuilderService {
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
        }), map((txt) => {
            /**
             * writeFile allows this file to be accessed from styles.scss
             */
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
        const baseLight = tinyColor('#ffffff');
        const baseDark = this.utilsService.Multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
        const [, , , baseTriad] = tinyColor(color).tetrad();
        const primary = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY)
            .map(k => {
            const [light, amount] = ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY[k];
            return [k, tinyColor.mix(light ? baseLight : baseDark, tinyColor(color), amount)];
        });
        const accent = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)
            .map(k => {
            const [amount, sat, light] = ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY[k];
            return [k, tinyColor.mix(baseDark, baseTriad, amount)
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
ThemeBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.PaletteTemplateService), i0.ɵɵinject(i3.LocalStorageService), i0.ɵɵinject(i4.PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i5.UtilsService), i0.ɵɵinject(i6.VariantColorService)); }, token: ThemeBuilderService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBNkIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBb0U1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFK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L3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYXJpYW50Q29sb3JTZXJ2aWNlIH0gZnJvbSAnLi92YXJpYW50LWNvbG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQYWxldHRlTGlzdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUtbGlzdC5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuY29uc3QgZmFsbGJhY2tVUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWxcclxuICAgKi9cclxuICBwcml2YXRlIF9tYXRlcmlhbFRoZW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHNldCBNYXRlcmlhbFRoZW1lKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gICAgIHRoaXMuX21hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgICAgY29uc29sZS5sb2coJ1NFVCBNQVRFUklBTCBUSEVNRScpO1xyXG4gICAgICB0aGlzLlRoZW1lU2NzcyA9IHRoaXMubG9hZFRoZW1pbmdTY3NzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IE1hdGVyaWFsVGhlbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbFRoZW1lO1xyXG4gIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZXQgUGFsZXR0ZSBjb2xvcnNcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2V0IFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSB7XHJcblxyXG4gICAgICB0aGlzLnBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgICB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLlBhbGV0dGVQaWNrZXJDaGFuZ2UocGFsZXR0ZSk7XHJcbiAgICAgIHRoaXMuVGhlbWVNb2RlID0gIXBhbGV0dGUuRGFya01vZGU7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTRVQgUEFMRVRURScpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQYWxldHRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGhlbWVNb2RlKHZhbDogYm9vbGVhbikge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB2YWw7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdUSEVNRSBNT0RFIENIQU5HRUQnKTtcclxuICAgICAgdGhpcy51cGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGhlbWVNb2RlKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudGhlbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlVGVtcGxhdGVTZXJ2aWNlOiBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcclxuICAgICAgcHJvdGVjdGVkIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgdmFyaWFudENvbG9yU2VydmljZTogVmFyaWFudENvbG9yU2VydmljZSkge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlRoZW1lID0gbmV3IFN1YmplY3Q8VGhlbWVNb2RlbD4oKTtcclxuICAgICAgdGhpcy5QYWxldHRlQ29sb3JzID0gbmV3IFN1YmplY3Q8UGFydGlhbDxQYWxldHRlTW9kZWw+PigpO1xyXG4gICAgICB0aGlzLlBhbGV0dGVMaXN0ID0gW107XHJcbiAgICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGxvYWQgaW50aWFsIHRoZW1lXHJcbiAgICAqIFxyXG4gICAgKiBQdWxscyBfdGhlbWluZy5zY3NzIGZyb20gQW5ndWxhciBNYXRlcmlhbCBhbmQgdGhlbiBvdmVyd3JpdGVzIGl0IHdpdGggXHJcbiAgICAqIG91ciB0aGVtZSBjb2xvciBjaGFuZ2VzXHJcbiAgICAqL1xyXG4gICBwcm90ZWN0ZWQgbG9hZFRoZW1pbmdTY3NzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc29sZS5sb2coJ0xPQUQgVEhFTUlORyBTQ1NTJyk7XHJcbiAgICBcclxuICAgIC8vIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcclxuICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLk1hdGVyaWFsVGhlbWUsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdQSVBFIE1BUCcpO1xyXG4gICAgICAgICAgcmV0dXJuIHhcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nbSwgJz8/JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcJG1hdC0oW146P10rKVxccyo6XFxzKlxcKFs/IF0qNTA6W14oKV0qY29udHJhc3RcXHMqOlxccypcXChbXildK1xcKVsgP10qXFwpO1xccyo/L2csXHJcbiAgICAgICAgICAgICAgKGFsbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IG5hbWUgPT09ICdncmV5JyA/IGFsbCA6ICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwqLio/XFwqXFwvL2csICcnKVxyXG4gICAgICAgICAgICAuc3BsaXQoL1s/XVs/XS9nKVxyXG4gICAgICAgICAgICAubWFwKChsOiBzdHJpbmcpID0+IGxcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccyooXFwvXFwvLiopPyQvZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXCRtYXQtYmx1ZS1ncmF5XFxzKjpcXHMqXFwkbWF0LWJsdWUtZ3JleVxccyo7XFxzKi9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoLzpcXHNcXHMrL2csICc6ICcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZpbHRlcigobDogc3RyaW5nKSA9PiAhIWwpXHJcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAodHh0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogd3JpdGVGaWxlIGFsbG93cyB0aGlzIGZpbGUgdG8gYmUgYWNjZXNzZWQgZnJvbSBzdHlsZXMuc2Nzc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBTYXNzLndyaXRlRmlsZSgnfkBhbmd1bGFyL21hdGVyaWFsL3RoZW1pbmcnLCB0eHQsIChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICAgLy8gfSlcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlbWUgdGVtcGxhdGUgYW5kIHVwZGF0ZSBpdFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB0aGVtZSBjdXJyZW50IHRoZW1lXHJcbiAgICovXHJcbiAgcHVibGljIEdldFRlbXBsYXRlKHRoZW1lOiBUaGVtZU1vZGVsKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGlsZSBTQVNTIHRvIENTU1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAqIEByZXR1cm5zIGNvbXBpbGVkIENTU1xyXG4gICAqL1xyXG4gICBwdWJsaWMgYXN5bmMgQ29tcGlsZVNjc3NUaGVtZSh0aGVtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnNvbGUubG9nKCdDT01QSUxFIFNDU1MgVEhFTUUnKTtcclxuICAgIC8vIGhvbGQgaGVyZSB1bnRpbCB0aGlzLlRoZW1lU2NzcyByZXNvbHZlcywgdGhlbiBydW4gdGhlIG5leHQgcHJvbWlzZSBcclxuICAgIGF3YWl0IHRoaXMuVGhlbWVTY3NzO1xyXG4gICAgY29uc29sZS5sb2coJ0FXQUlUIEhBUyBGSU5JU0hFRCcpO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIFNhc3MuY29tcGlsZSh0aGVtZS5yZXBsYWNlKCdAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7JywgJycpLCAodjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHYuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnUkVUVVJOIENPTVBJTEVEIFNUUklORycpO1xyXG4gICAgICAgICAgcmVzKHYudGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlaih2KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJldHVybiBwcmltYXJ5IGFuZCBhY2NlbnQgY29sb3JzIGZvciBlYWNoIGNvbG9yIG1hcCwgZnJvbSBjb2xvcnMgNTAgLSBBNzAwXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSBjb2xvciBjb2xvclxyXG4gICAgKi9cclxuICAgcHVibGljIEdldFBhbGV0dGUoY29sb3I6IHN0cmluZyk6IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIHtcclxuICAgIGNvbnN0IGJhc2VMaWdodCA9IHRpbnlDb2xvcignI2ZmZmZmZicpO1xyXG4gICAgY29uc3QgYmFzZURhcmsgPSB0aGlzLnV0aWxzU2VydmljZS5NdWx0aXBseSh0aW55Q29sb3IoY29sb3IpLnRvUmdiKCksIHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSk7XHJcbiAgICBjb25zdCBbLCAsICwgYmFzZVRyaWFkXSA9IHRpbnlDb2xvcihjb2xvcikudGV0cmFkKCk7XHJcblxyXG4gICAgY29uc3QgcHJpbWFyeSA9IE9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtsaWdodCwgYW1vdW50XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZW2tdO1xyXG4gICAgICAgIHJldHVybiBbaywgdGlueUNvbG9yLm1peChsaWdodCA/IGJhc2VMaWdodCA6IGJhc2VEYXJrLFxyXG4gICAgICAgICAgdGlueUNvbG9yKGNvbG9yKSwgYW1vdW50KV0gYXMgW3N0cmluZywgdGlueWNvbG9yLkluc3RhbmNlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWNjZW50ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWSlcclxuICAgICAgLm1hcChrID0+IHtcclxuICAgICAgICBjb25zdCBbYW1vdW50LCBzYXQsIGxpZ2h0XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGJhc2VEYXJrLCBiYXNlVHJpYWQsIGFtb3VudClcclxuICAgICAgICAgIC5zYXR1cmF0ZShzYXQpLmxpZ2h0ZW4obGlnaHQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnByaW1hcnksIC4uLmFjY2VudF0ucmVkdWNlKChhY2MsIFtrLCBjXSkgPT4ge1xyXG4gICAgICBhY2Nba10gPSBjLnRvSGV4U3RyaW5nKCk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBlbWl0IGV2ZW50IHdpdGggdGhlbWVcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBlbWl0KCk6IHZvaWQge1xyXG4gICAgIHRoaXMuVGhlbWUubmV4dCh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIGEgbmV3IHRoZW1lIG1vZGVsXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgZ2V0VGhlbWUoKTogVGhlbWVNb2RlbCB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgUGFsZXR0ZTogdGhpcy5QYWxldHRlLFxyXG4gICAgICBUaGVtZURhcmtNb2RlOiB0aGlzLlRoZW1lTW9kZSxcclxuICAgIH07XHJcbiAgIH1cclxuXHJcbiAgIHByb3RlY3RlZCB1cGRhdGVUaGVtZSh0aGVtZTogVGhlbWVNb2RlbCk6IHZvaWQge1xyXG5cclxuICAgIC8vIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAgY29uc3Qgc291cmNlOiBzdHJpbmcgPSB0aGlzLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuICAgIGNvbnNvbGUubG9nKCdVUERBVEUgVEhFTUUnKTtcclxuICAgIC8vIFJ1bm5pbmcgZnVuY3Rpb25zIG91dHNpZGUgb2YgQW5ndWxhcidzIHpvbmUgYW5kIGRvIHdvcmsgdGhhdFxyXG4gICAgLy8gZG9lc24ndCB0cmlnZ2VyIEFuZ3VsYXIgY2hhbmdlLWRldGVjdGlvbi5cclxuICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHJcbiAgICAgdGhpcy5Db21waWxlU2Nzc1RoZW1lKHNvdXJjZSlcclxuICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICBjb25zb2xlLmxvZygnU0NTUyBJUyBDT01QSUxFRCcpO1xyXG4gICAgIH0pXHJcbiAgICAgLnRoZW4oICh0ZXh0OiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ1BST01JU0UgVEhFTiBIQVBQRU5JTkcnKTtcclxuICAgICAgICAvLyBTQVNTIGNvbXBpbGVkIHRvIENTU1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVkRHluYW1pY0NTUzogc3RyaW5nID0gdGV4dDtcclxuICAgICAgICBjb25zdCBkeW5hbWljU3R5bGVTaGVldDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUtYnVpbGRlci1zdHlsZXNoZWV0Jyk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGR5bmFtaWMgc3R5bGVzaGVldCBleGlzdHMsIHRoZW4gcmVtb3ZlIGl0XHJcbiAgICAgICAgaWYgKGR5bmFtaWNTdHlsZVNoZWV0KSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLnJlbW92ZUNoaWxkKGR5bmFtaWNTdHlsZVNoZWV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBkeW5hbWljIHN0eWxlc2hlZXRcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgc3R5bGUuaWQgPSAndGhlbWUtYnVpbGRlci1zdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb21waWxlZER5bmFtaWNDU1MpKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvbXBpbGUgU2NzcyBFcnJvcicsIGVycik7XHJcbiAgICAgIH0pO1xyXG4gICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lcyBBcnJheSBvZiB0aGVtZXMgdG8gYmUgc2V0XHJcbiAgICovXHJcbiAgcHVibGljIFNldFRoZW1lcyh0aGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLlRoZW1lcyA9IHRoZW1lcztcclxuXHJcbiAgICBsZXQgaW5pdGlhbDogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgaW5pdGlhbCA9IHsgLi4uVGhlbWVCdWlsZGVyQ29uc3RhbnRzLkluaXRpYWxWYWx1ZXMsIC4uLmluaXRpYWwgfTtcclxuICAgIGluaXRpYWwucHJpbWFyeS5NYWluID0gdGhpcy5UaGVtZXNbMF0uUHJpbWFyeTtcclxuICAgIGluaXRpYWwuYWNjZW50Lk1haW4gPSB0aGlzLlRoZW1lc1swXS5BY2NlbnQ7XHJcbiAgICBpbml0aWFsLndhcm4uTWFpbiA9IHRoaXMuVGhlbWVzWzBdLldhcm47XHJcbiAgICBpbml0aWFsLkRhcmtNb2RlID0gdGhpcy5UaGVtZXNbMF0uRGFya01vZGU7XHJcblxyXG4gICAgdGhpcy5QYWxldHRlID0gaW5pdGlhbDtcclxuXHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlUHJpbWFyeVZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLlByaW1hcnkpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZUFjY2VudFZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLkFjY2VudCk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlV2FyblZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLldhcm4pO1xyXG5cclxuICB9XHJcbn1cclxuIl19