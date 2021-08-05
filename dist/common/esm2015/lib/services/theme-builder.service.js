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
        this.UpdateTheme(this.getTheme());
    }
    get Palette() {
        return this.palette;
    }
    set ThemeMode(val) {
        this.themeMode = val;
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
        // return new Promise((res, rej) => {
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
    UpdateTheme(theme) {
        // SASS stylesheet
        const source = this.GetTemplate(theme);
        // Running functions outside of Angular's zone and do work that
        // doesn't trigger Angular change-detection.
        this.zone.runOutsideAngular(() => {
            this.CompileScssTheme(source)
                .finally(() => {
                console.log('SCSS IS COMPILED');
            })
                .then((text) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBaUU1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFK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O1FBRXZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5FLENBQUM7Ozs7WUFoUUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7WUFkUSxVQUFVO1lBRVYsc0JBQXNCO1lBWHRCLG1CQUFtQjtZQUZuQixvQkFBb0I7WUFLUixNQUFNO1lBUGxCLFlBQVk7WUFDWixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3V0aWxzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBWYXJpYW50Q29sb3JTZXJ2aWNlIH0gZnJvbSAnLi92YXJpYW50LWNvbG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQYWxldHRlTGlzdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUtbGlzdC5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuY29uc3QgZmFsbGJhY2tVUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWxcclxuICAgKi9cclxuICBwcml2YXRlIF9tYXRlcmlhbFRoZW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHNldCBNYXRlcmlhbFRoZW1lKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gICAgIHRoaXMuX21hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgICAgIHRoaXMuVGhlbWVTY3NzID0gdGhpcy5sb2FkVGhlbWluZ1Njc3MoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgTWF0ZXJpYWxUaGVtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsVGhlbWU7XHJcbiAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFNldCBQYWxldHRlIGNvbG9yc1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzZXQgUGFsZXR0ZShwYWxldHRlOiBQYWxldHRlTW9kZWwpIHtcclxuXHJcbiAgICAgIHRoaXMucGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgICAgIHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuUGFsZXR0ZVBpY2tlckNoYW5nZShwYWxldHRlKTtcclxuICAgICAgdGhpcy5UaGVtZU1vZGUgPSAhcGFsZXR0ZS5EYXJrTW9kZTtcclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgUGFsZXR0ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFsZXR0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFRoZW1lTW9kZSh2YWw6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgIHRoaXMudGhlbWVNb2RlID0gdmFsO1xyXG4gICAgICB0aGlzLlVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBUaGVtZU1vZGUoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy50aGVtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVUZW1wbGF0ZVNlcnZpY2U6IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxyXG4gICAgICBwcm90ZWN0ZWQgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCB2YXJpYW50Q29sb3JTZXJ2aWNlOiBWYXJpYW50Q29sb3JTZXJ2aWNlKSB7XHJcblxyXG4gICAgICB0aGlzLnRoZW1lTW9kZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuVGhlbWUgPSBuZXcgU3ViamVjdDxUaGVtZU1vZGVsPigpO1xyXG4gICAgICB0aGlzLlBhbGV0dGVDb2xvcnMgPSBuZXcgU3ViamVjdDxQYXJ0aWFsPFBhbGV0dGVNb2RlbD4+KCk7XHJcbiAgICAgIHRoaXMuUGFsZXR0ZUxpc3QgPSBbXTtcclxuICAgICB9XHJcblxyXG4gICAvKipcclxuICAgICogbG9hZCBpbnRpYWwgdGhlbWVcclxuICAgICogXHJcbiAgICAqIFB1bGxzIF90aGVtaW5nLnNjc3MgZnJvbSBBbmd1bGFyIE1hdGVyaWFsIGFuZCB0aGVuIG92ZXJ3cml0ZXMgaXQgd2l0aCBcclxuICAgICogb3VyIHRoZW1lIGNvbG9yIGNoYW5nZXNcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBsb2FkVGhlbWluZ1Njc3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgXHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cHM6Ly93d3cuaW90LWVuc2VtYmxlLmNvbS9hc3NldHMvdGhlbWluZy90aGVtaW5nLnNjc3MnLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5NYXRlcmlhbFRoZW1lLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoeDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4geFxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2dtLCAnPz8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwkbWF0LShbXjo/XSspXFxzKjpcXHMqXFwoWz8gXSo1MDpbXigpXSpjb250cmFzdFxccyo6XFxzKlxcKFteKV0rXFwpWyA/XSpcXCk7XFxzKj8vZyxcclxuICAgICAgICAgICAgICAoYWxsOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4gbmFtZSA9PT0gJ2dyZXknID8gYWxsIDogJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCouKj9cXCpcXC8vZywgJycpXHJcbiAgICAgICAgICAgIC5zcGxpdCgvWz9dWz9dL2cpXHJcbiAgICAgICAgICAgIC5tYXAoKGw6IHN0cmluZykgPT4gbFxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKihcXC9cXC8uKik/JC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcJG1hdC1ibHVlLWdyYXlcXHMqOlxccypcXCRtYXQtYmx1ZS1ncmV5XFxzKjtcXHMqL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvOlxcc1xccysvZywgJzogJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChsOiBzdHJpbmcpID0+ICEhbClcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgICh0eHQ6IHN0cmluZykgPT5cclxuICAgICAgICAgIC8vIHdyaXRlRmlsZSBhbGxvd3MgdGhpcyBmaWxlIHRvIGJlIGFjY2Vzc2VkIGZyb20gc3R5bGVzLnNjc3NcclxuICAgICAgICAgIFNhc3Mud3JpdGVGaWxlKCd+QGFuZ3VsYXIvbWF0ZXJpYWwvdGhlbWluZycsIHR4dCwgKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTYXNzLndyaXRlRmlsZScsIHJlc3VsdCk7XHJcbiAgICAgICAgICB9KSlcclxuICAgICAgKS50b1Byb21pc2UoKVxyXG4gICAgLy8gfSlcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlbWUgdGVtcGxhdGUgYW5kIHVwZGF0ZSBpdFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB0aGVtZSBjdXJyZW50IHRoZW1lXHJcbiAgICovXHJcbiAgcHVibGljIEdldFRlbXBsYXRlKHRoZW1lOiBUaGVtZU1vZGVsKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGlsZSBTQVNTIHRvIENTU1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAqIEByZXR1cm5zIGNvbXBpbGVkIENTU1xyXG4gICAqL1xyXG4gICBwdWJsaWMgYXN5bmMgQ29tcGlsZVNjc3NUaGVtZSh0aGVtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGF3YWl0IHRoaXMuVGhlbWVTY3NzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIFNhc3MuY29tcGlsZSh0aGVtZS5yZXBsYWNlKCdAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7JywgJycpLCAodjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHYuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICByZXModi50ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIHByaW1hcnkgYW5kIGFjY2VudCBjb2xvcnMgZm9yIGVhY2ggY29sb3IgbWFwLCBmcm9tIGNvbG9ycyA1MCAtIEE3MDBcclxuICAgICpcclxuICAgICogQHBhcmFtIGNvbG9yIGNvbG9yXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgR2V0UGFsZXR0ZShjb2xvcjogc3RyaW5nKTogTWF0ZXJpYWxQYWxldHRlTW9kZWwge1xyXG4gICAgY29uc3QgYmFzZUxpZ2h0ID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFyayA9IHRoaXMudXRpbHNTZXJ2aWNlLk11bHRpcGx5KHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSwgdGlueUNvbG9yKGNvbG9yKS50b1JnYigpKTtcclxuICAgIGNvbnN0IFssICwgLCBiYXNlVHJpYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbiAgICBjb25zdCBwcmltYXJ5ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2xpZ2h0LCBhbW91bnRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGxpZ2h0ID8gYmFzZUxpZ2h0IDogYmFzZURhcmssXHJcbiAgICAgICAgICB0aW55Q29sb3IoY29sb3IpLCBhbW91bnQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhY2NlbnQgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFthbW91bnQsIHNhdCwgbGlnaHRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgoYmFzZURhcmssIGJhc2VUcmlhZCwgYW1vdW50KVxyXG4gICAgICAgICAgLnNhdHVyYXRlKHNhdCkubGlnaHRlbihsaWdodCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucHJpbWFyeSwgLi4uYWNjZW50XS5yZWR1Y2UoKGFjYywgW2ssIGNdKSA9PiB7XHJcbiAgICAgIGFjY1trXSA9IGMudG9IZXhTdHJpbmcoKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGVtaXQgZXZlbnQgd2l0aCB0aGVtZVxyXG4gICAgKi9cclxuICAgcHJvdGVjdGVkIGVtaXQoKTogdm9pZCB7XHJcbiAgICAgdGhpcy5UaGVtZS5uZXh0KHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gYSBuZXcgdGhlbWUgbW9kZWxcclxuICAgICovXHJcbiAgIHB1YmxpYyBnZXRUaGVtZSgpOiBUaGVtZU1vZGVsIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBQYWxldHRlOiB0aGlzLlBhbGV0dGUsXHJcbiAgICAgIFRoZW1lRGFya01vZGU6IHRoaXMuVGhlbWVNb2RlLFxyXG4gICAgfTtcclxuICAgfVxyXG5cclxuICAgcHVibGljIFVwZGF0ZVRoZW1lKHRoZW1lOiBUaGVtZU1vZGVsKTogdm9pZCB7XHJcblxyXG4gICAgLy8gU0FTUyBzdHlsZXNoZWV0XHJcbiAgICBjb25zdCBzb3VyY2U6IHN0cmluZyA9IHRoaXMuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG5cclxuICAgIC8vIFJ1bm5pbmcgZnVuY3Rpb25zIG91dHNpZGUgb2YgQW5ndWxhcidzIHpvbmUgYW5kIGRvIHdvcmsgdGhhdFxyXG4gICAgLy8gZG9lc24ndCB0cmlnZ2VyIEFuZ3VsYXIgY2hhbmdlLWRldGVjdGlvbi5cclxuICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHJcbiAgICAgdGhpcy5Db21waWxlU2Nzc1RoZW1lKHNvdXJjZSlcclxuICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICBjb25zb2xlLmxvZygnU0NTUyBJUyBDT01QSUxFRCcpO1xyXG4gICAgIH0pXHJcbiAgICAgLnRoZW4oICh0ZXh0OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgLy8gU0FTUyBjb21waWxlZCB0byBDU1NcclxuICAgICAgICBjb25zdCBjb21waWxlZER5bmFtaWNDU1M6IHN0cmluZyA9IHRleHQ7XHJcbiAgICAgICAgY29uc3QgZHluYW1pY1N0eWxlU2hlZXQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCcpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBkeW5hbWljIHN0eWxlc2hlZXQgZXhpc3RzLCB0aGVuIHJlbW92ZSBpdFxyXG4gICAgICAgIGlmIChkeW5hbWljU3R5bGVTaGVldCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5yZW1vdmVDaGlsZChkeW5hbWljU3R5bGVTaGVldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgZHluYW1pYyBzdHlsZXNoZWV0XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmlkID0gJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29tcGlsZWREeW5hbWljQ1NTKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lcyBBcnJheSBvZiB0aGVtZXMgdG8gYmUgc2V0XHJcbiAgICovXHJcbiAgcHVibGljIFNldFRoZW1lcyh0aGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLlRoZW1lcyA9IHRoZW1lcztcclxuXHJcbiAgICBsZXQgaW5pdGlhbDogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgaW5pdGlhbCA9IHsgLi4uVGhlbWVCdWlsZGVyQ29uc3RhbnRzLkluaXRpYWxWYWx1ZXMsIC4uLmluaXRpYWwgfTtcclxuICAgIGluaXRpYWwucHJpbWFyeS5NYWluID0gdGhpcy5UaGVtZXNbMF0uUHJpbWFyeTtcclxuICAgIGluaXRpYWwuYWNjZW50Lk1haW4gPSB0aGlzLlRoZW1lc1swXS5BY2NlbnQ7XHJcbiAgICBpbml0aWFsLndhcm4uTWFpbiA9IHRoaXMuVGhlbWVzWzBdLldhcm47XHJcbiAgICBpbml0aWFsLkRhcmtNb2RlID0gdGhpcy5UaGVtZXNbMF0uRGFya01vZGU7XHJcblxyXG4gICAgdGhpcy5QYWxldHRlID0gaW5pdGlhbDtcclxuXHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlUHJpbWFyeVZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLlByaW1hcnkpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZUFjY2VudFZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLkFjY2VudCk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlV2FyblZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLldhcm4pO1xyXG5cclxuICB9XHJcbn1cclxuIl19