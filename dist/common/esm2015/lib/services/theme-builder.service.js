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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBNkIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBb0U1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFK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Q0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5FLENBQUM7Ozs7WUE1UEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFkUSxVQUFVO1lBRVYsc0JBQXNCO1lBWHRCLG1CQUFtQjtZQUZuQixvQkFBb0I7WUFLUixNQUFNO1lBUGxCLFlBQVk7WUFDWixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYXJpYW50Q29sb3JTZXJ2aWNlIH0gZnJvbSAnLi92YXJpYW50LWNvbG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQYWxldHRlTGlzdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUtbGlzdC5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuY29uc3QgZmFsbGJhY2tVUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWxcclxuICAgKi9cclxuICBwcml2YXRlIF9tYXRlcmlhbFRoZW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHNldCBNYXRlcmlhbFRoZW1lKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gICAgIHRoaXMuX21hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgICAgY29uc29sZS5sb2coJ1NFVCBNQVRFUklBTCBUSEVNRScpO1xyXG4gICAgICB0aGlzLlRoZW1lU2NzcyA9IHRoaXMubG9hZFRoZW1pbmdTY3NzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IE1hdGVyaWFsVGhlbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbFRoZW1lO1xyXG4gIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZXQgUGFsZXR0ZSBjb2xvcnNcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2V0IFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSB7XHJcblxyXG4gICAgICB0aGlzLnBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgICB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLlBhbGV0dGVQaWNrZXJDaGFuZ2UocGFsZXR0ZSk7XHJcbiAgICAgIHRoaXMuVGhlbWVNb2RlID0gIXBhbGV0dGUuRGFya01vZGU7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTRVQgUEFMRVRURScpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQYWxldHRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGhlbWVNb2RlKHZhbDogYm9vbGVhbikge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB2YWw7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdUSEVNRSBNT0RFIENIQU5HRUQnKTtcclxuICAgICAgdGhpcy51cGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGhlbWVNb2RlKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudGhlbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlVGVtcGxhdGVTZXJ2aWNlOiBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcclxuICAgICAgcHJvdGVjdGVkIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgdmFyaWFudENvbG9yU2VydmljZTogVmFyaWFudENvbG9yU2VydmljZSkge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlRoZW1lID0gbmV3IFN1YmplY3Q8VGhlbWVNb2RlbD4oKTtcclxuICAgICAgdGhpcy5QYWxldHRlQ29sb3JzID0gbmV3IFN1YmplY3Q8UGFydGlhbDxQYWxldHRlTW9kZWw+PigpO1xyXG4gICAgICB0aGlzLlBhbGV0dGVMaXN0ID0gW107XHJcbiAgICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGxvYWQgaW50aWFsIHRoZW1lXHJcbiAgICAqIFxyXG4gICAgKiBQdWxscyBfdGhlbWluZy5zY3NzIGZyb20gQW5ndWxhciBNYXRlcmlhbCBhbmQgdGhlbiBvdmVyd3JpdGVzIGl0IHdpdGggXHJcbiAgICAqIG91ciB0aGVtZSBjb2xvciBjaGFuZ2VzXHJcbiAgICAqL1xyXG4gICBwcm90ZWN0ZWQgbG9hZFRoZW1pbmdTY3NzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc29sZS5sb2coJ0xPQUQgVEhFTUlORyBTQ1NTJyk7XHJcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5NYXRlcmlhbFRoZW1lLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoeDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnUElQRSBNQVAnKTtcclxuICAgICAgICAgIHJldHVybiB4XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKHR4dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU0FTUy5XUklURUZJTEUnKTtcclxuICAgICAgICAgICAgICAgIC8vIHdyaXRlRmlsZSBhbGxvd3MgdGhpcyBmaWxlIHRvIGJlIGFjY2Vzc2VkIGZyb20gc3R5bGVzLnNjc3NcclxuICAgICAgICAgICAgICAgIFNhc3Mud3JpdGVGaWxlKCd+QGFuZ3VsYXIvbWF0ZXJpYWwvdGhlbWluZycsIHR4dCwgKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgICAvLyB9KVxyXG4gICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGVtZSB0ZW1wbGF0ZSBhbmQgdXBkYXRlIGl0XHJcbiAgICogXHJcbiAgICogQHBhcmFtIHRoZW1lIGN1cnJlbnQgdGhlbWVcclxuICAgKi9cclxuICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGFsZXR0ZVRlbXBsYXRlU2VydmljZS5HZXRUZW1wbGF0ZSh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21waWxlIFNBU1MgdG8gQ1NTXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGhlbWUgU0FTUyBzdHlsZXNoZWV0XHJcbiAgICogQHJldHVybnMgY29tcGlsZWQgQ1NTXHJcbiAgICovXHJcbiAgIHB1YmxpYyBhc3luYyBDb21waWxlU2Nzc1RoZW1lKHRoZW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc29sZS5sb2coJ0NPTVBJTEUgU0NTUyBUSEVNRScpO1xyXG4gICAgLy8gaG9sZCBoZXJlIHVudGlsIHRoaXMuVGhlbWVTY3NzIHJlc29sdmVzLCB0aGVuIHJ1biB0aGUgbmV4dCBwcm9taXNlIFxyXG4gICAgYXdhaXQgdGhpcy5UaGVtZVNjc3M7XHJcbiAgICBjb25zb2xlLmxvZygnQVdBSVQgSEFTIEZJTklTSEVEJyk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzLCByZWopID0+IHtcclxuICAgICAgU2Fzcy5jb21waWxlKHRoZW1lLnJlcGxhY2UoJ0BpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJGFsdFRoZW1lKTsnLCAnJyksICh2OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAodi5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdSRVRVUk4gQ09NUElMRUQgU1RSSU5HJyk7XHJcbiAgICAgICAgICByZXModi50ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIHByaW1hcnkgYW5kIGFjY2VudCBjb2xvcnMgZm9yIGVhY2ggY29sb3IgbWFwLCBmcm9tIGNvbG9ycyA1MCAtIEE3MDBcclxuICAgICpcclxuICAgICogQHBhcmFtIGNvbG9yIGNvbG9yXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgR2V0UGFsZXR0ZShjb2xvcjogc3RyaW5nKTogTWF0ZXJpYWxQYWxldHRlTW9kZWwge1xyXG4gICAgY29uc3QgYmFzZUxpZ2h0ID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFyayA9IHRoaXMudXRpbHNTZXJ2aWNlLk11bHRpcGx5KHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSwgdGlueUNvbG9yKGNvbG9yKS50b1JnYigpKTtcclxuICAgIGNvbnN0IFssICwgLCBiYXNlVHJpYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbiAgICBjb25zdCBwcmltYXJ5ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2xpZ2h0LCBhbW91bnRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGxpZ2h0ID8gYmFzZUxpZ2h0IDogYmFzZURhcmssXHJcbiAgICAgICAgICB0aW55Q29sb3IoY29sb3IpLCBhbW91bnQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhY2NlbnQgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFthbW91bnQsIHNhdCwgbGlnaHRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgoYmFzZURhcmssIGJhc2VUcmlhZCwgYW1vdW50KVxyXG4gICAgICAgICAgLnNhdHVyYXRlKHNhdCkubGlnaHRlbihsaWdodCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucHJpbWFyeSwgLi4uYWNjZW50XS5yZWR1Y2UoKGFjYywgW2ssIGNdKSA9PiB7XHJcbiAgICAgIGFjY1trXSA9IGMudG9IZXhTdHJpbmcoKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGVtaXQgZXZlbnQgd2l0aCB0aGVtZVxyXG4gICAgKi9cclxuICAgcHJvdGVjdGVkIGVtaXQoKTogdm9pZCB7XHJcbiAgICAgdGhpcy5UaGVtZS5uZXh0KHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gYSBuZXcgdGhlbWUgbW9kZWxcclxuICAgICovXHJcbiAgIHB1YmxpYyBnZXRUaGVtZSgpOiBUaGVtZU1vZGVsIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBQYWxldHRlOiB0aGlzLlBhbGV0dGUsXHJcbiAgICAgIFRoZW1lRGFya01vZGU6IHRoaXMuVGhlbWVNb2RlLFxyXG4gICAgfTtcclxuICAgfVxyXG5cclxuICAgcHJvdGVjdGVkIHVwZGF0ZVRoZW1lKHRoZW1lOiBUaGVtZU1vZGVsKTogdm9pZCB7XHJcblxyXG4gICAgLy8gU0FTUyBzdHlsZXNoZWV0XHJcbiAgICBjb25zdCBzb3VyY2U6IHN0cmluZyA9IHRoaXMuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG4gICAgY29uc29sZS5sb2coJ1VQREFURSBUSEVNRScpO1xyXG4gICAgLy8gUnVubmluZyBmdW5jdGlvbnMgb3V0c2lkZSBvZiBBbmd1bGFyJ3Mgem9uZSBhbmQgZG8gd29yayB0aGF0XHJcbiAgICAvLyBkb2Vzbid0IHRyaWdnZXIgQW5ndWxhciBjaGFuZ2UtZGV0ZWN0aW9uLlxyXG4gICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cclxuICAgICB0aGlzLkNvbXBpbGVTY3NzVGhlbWUoc291cmNlKVxyXG4gICAgIC5maW5hbGx5KCgpID0+IHtcclxuICAgICAgIGNvbnNvbGUubG9nKCdTQ1NTIElTIENPTVBJTEVEJyk7XHJcbiAgICAgfSlcclxuICAgICAudGhlbiggKHRleHQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnUFJPTUlTRSBUSEVOIEhBUFBFTklORycpO1xyXG4gICAgICAgIC8vIFNBU1MgY29tcGlsZWQgdG8gQ1NTXHJcbiAgICAgICAgY29uc3QgY29tcGlsZWREeW5hbWljQ1NTOiBzdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTdHlsZVNoZWV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZHluYW1pYyBzdHlsZXNoZWV0IGV4aXN0cywgdGhlbiByZW1vdmUgaXRcclxuICAgICAgICBpZiAoZHluYW1pY1N0eWxlU2hlZXQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ucmVtb3ZlQ2hpbGQoZHluYW1pY1N0eWxlU2hlZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGR5bmFtaWMgc3R5bGVzaGVldFxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICBzdHlsZS5pZCA9ICd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbXBpbGVkRHluYW1pY0NTUykpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQ29tcGlsZSBTY3NzIEVycm9yJywgZXJyKTtcclxuICAgICAgfSk7XHJcbiAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGhlbWVzIEFycmF5IG9mIHRoZW1lcyB0byBiZSBzZXRcclxuICAgKi9cclxuICBwdWJsaWMgU2V0VGhlbWVzKHRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD4pOiB2b2lkIHtcclxuICAgIHRoaXMuVGhlbWVzID0gdGhlbWVzO1xyXG5cclxuICAgIGxldCBpbml0aWFsOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBpbml0aWFsID0geyAuLi5UaGVtZUJ1aWxkZXJDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgLi4uaW5pdGlhbCB9O1xyXG4gICAgaW5pdGlhbC5wcmltYXJ5Lk1haW4gPSB0aGlzLlRoZW1lc1swXS5QcmltYXJ5O1xyXG4gICAgaW5pdGlhbC5hY2NlbnQuTWFpbiA9IHRoaXMuVGhlbWVzWzBdLkFjY2VudDtcclxuICAgIGluaXRpYWwud2Fybi5NYWluID0gdGhpcy5UaGVtZXNbMF0uV2FybjtcclxuICAgIGluaXRpYWwuRGFya01vZGUgPSB0aGlzLlRoZW1lc1swXS5EYXJrTW9kZTtcclxuXHJcbiAgICB0aGlzLlBhbGV0dGUgPSBpbml0aWFsO1xyXG5cclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhpcy5UaGVtZXNbMF0uUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhpcy5UaGVtZXNbMF0uQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhpcy5UaGVtZXNbMF0uV2Fybik7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=