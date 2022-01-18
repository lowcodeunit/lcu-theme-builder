import { ThemeBuilderConstants } from '../utils/theme-builder-constants.utils';
import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    async CompileScssTheme(theme) {
        await this.ThemeScss;
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
ThemeBuilderService.ɵfac = function ThemeBuilderService_Factory(t) { return new (t || ThemeBuilderService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.PaletteTemplateService), i0.ɵɵinject(i3.LocalStorageService), i0.ɵɵinject(i4.PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i5.UtilsService), i0.ɵɵinject(i6.VariantColorService)); };
ThemeBuilderService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeBuilderService, factory: ThemeBuilderService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: i2.PaletteTemplateService }, { type: i3.LocalStorageService }, { type: i4.PalettePickerService }, { type: i0.NgZone }, { type: i5.UtilsService }, { type: i6.VariantColorService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQWlCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBT3JDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBZ0U1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLDBEQUEwRCxDQUFDO1FBQ2hGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxL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dmljZSc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sb3JNYXBNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbG9yLW1hcC5tb2RlbCc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4uL3V0aWxzL3RoZW1lLWJ1aWxkZXItY29uc3RhbnRzLnV0aWxzJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9tYXRlcmlhbC1wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQYWxldHRlTGlzdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUtbGlzdC5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuY29uc3QgZmFsbGJhY2tVUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWxcclxuICAgKi9cclxuICBwcml2YXRlIF9tYXRlcmlhbFRoZW1lOiBzdHJpbmc7XHJcbiAgcHVibGljIHNldCBNYXRlcmlhbFRoZW1lKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gICAgIHRoaXMuX21hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgICAgIHRoaXMuVGhlbWVTY3NzID0gdGhpcy5sb2FkVGhlbWluZ1Njc3MoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgTWF0ZXJpYWxUaGVtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsVGhlbWU7XHJcbiAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFNldCBQYWxldHRlIGNvbG9yc1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzZXQgUGFsZXR0ZShwYWxldHRlOiBQYWxldHRlTW9kZWwpIHtcclxuXHJcbiAgICAgIHRoaXMucGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgICAgIHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuUGFsZXR0ZVBpY2tlckNoYW5nZShwYWxldHRlKTtcclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgUGFsZXR0ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFsZXR0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFRoZW1lTW9kZShsaWdodDogYm9vbGVhbikge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSAhbGlnaHQ7XHJcbiAgICAgIHRoaXMuVXBkYXRlVGhlbWUodGhpcy5nZXRUaGVtZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFRoZW1lTW9kZSgpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnRoZW1lTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVGhlbWVzOiBBcnJheTxUaGVtZVBpY2tlck1vZGVsPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIFxyXG4gICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVRlbXBsYXRlU2VydmljZTogUGFsZXR0ZVRlbXBsYXRlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXHJcbiAgICAgIHByb3RlY3RlZCB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHZhcmlhbnRDb2xvclNlcnZpY2U6IFZhcmlhbnRDb2xvclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIHRoaXMuTWF0ZXJpYWxUaGVtZSA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcbiAgICAgIHRoaXMudGhlbWVNb2RlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5UaGVtZSA9IG5ldyBTdWJqZWN0PFRoZW1lTW9kZWw+KCk7XHJcbiAgICAgIHRoaXMuUGFsZXR0ZUNvbG9ycyA9IG5ldyBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj4oKTtcclxuXHJcbiAgICAgIC8vIHRoaXMuVGhlbWVTY3NzID0gdGhpcy5sb2FkVGhlbWluZ1Njc3MoKTtcclxuXHJcbiAgICAgIHRoaXMuUGFsZXR0ZUxpc3QgPSBbXTtcclxuICAgICB9XHJcblxyXG4gICAvKipcclxuICAgICogbG9hZCBpbnRpYWwgdGhlbWVcclxuICAgICogXHJcbiAgICAqIFB1bGxzIF90aGVtaW5nLnNjc3MgZnJvbSBBbmd1bGFyIE1hdGVyaWFsIGFuZCB0aGVuIG92ZXJ3cml0ZXMgaXQgd2l0aCBcclxuICAgICogb3VyIHRoZW1lIGNvbG9yIGNoYW5nZXNcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBsb2FkVGhlbWluZ1Njc3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cHM6Ly93d3cuaW90LWVuc2VtYmxlLmNvbS9hc3NldHMvdGhlbWluZy90aGVtaW5nLnNjc3MnLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLk1hdGVyaWFsVGhlbWUsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHJldHVybiB4XHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZ20sICc/PycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCRtYXQtKFteOj9dKylcXHMqOlxccypcXChbPyBdKjUwOlteKCldKmNvbnRyYXN0XFxzKjpcXHMqXFwoW14pXStcXClbID9dKlxcKTtcXHMqPy9nLFxyXG4gICAgICAgICAgICAgIChhbGw6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiBuYW1lID09PSAnZ3JleScgPyBhbGwgOiAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcKi4qP1xcKlxcLy9nLCAnJylcclxuICAgICAgICAgICAgLnNwbGl0KC9bP11bP10vZylcclxuICAgICAgICAgICAgLm1hcCgobDogc3RyaW5nKSA9PiBsXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqKFxcL1xcLy4qKT8kL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFwkbWF0LWJsdWUtZ3JheVxccyo6XFxzKlxcJG1hdC1ibHVlLWdyZXlcXHMqO1xccyovZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC86XFxzXFxzKy9nLCAnOiAnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGw6IHN0cmluZykgPT4gISFsKVxyXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKHR4dDogc3RyaW5nKSA9PlxyXG4gICAgICAgICAgLy8gd3JpdGVGaWxlIGFsbG93cyB0aGlzIGZpbGUgdG8gYmUgYWNjZXNzZWQgZnJvbSBzdHlsZXMuc2Nzc1xyXG4gICAgICAgICAgU2Fzcy53cml0ZUZpbGUoJ35AYW5ndWxhci9tYXRlcmlhbC90aGVtaW5nJywgdHh0LCAocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Nhc3Mud3JpdGVGaWxlJywgcmVzdWx0KTtcclxuICAgICAgICAgIH0pKVxyXG4gICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGVtZSB0ZW1wbGF0ZSBhbmQgdXBkYXRlIGl0XHJcbiAgICogXHJcbiAgICogQHBhcmFtIHRoZW1lIGN1cnJlbnQgdGhlbWVcclxuICAgKi9cclxuICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGFsZXR0ZVRlbXBsYXRlU2VydmljZS5HZXRUZW1wbGF0ZSh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21waWxlIFNBU1MgdG8gQ1NTXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGhlbWUgU0FTUyBzdHlsZXNoZWV0XHJcbiAgICogQHJldHVybnMgY29tcGlsZWQgQ1NTXHJcbiAgICovXHJcbiAgIHB1YmxpYyBhc3luYyBDb21waWxlU2Nzc1RoZW1lKHRoZW1lOiBzdHJpbmcpIHtcclxuICAgIGF3YWl0IHRoaXMuVGhlbWVTY3NzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIFNhc3MuY29tcGlsZSh0aGVtZS5yZXBsYWNlKCdAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7JywgJycpLCAodjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHYuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICByZXModi50ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIHByaW1hcnkgYW5kIGFjY2VudCBjb2xvcnMgZm9yIGVhY2ggY29sb3IgbWFwLCBmcm9tIGNvbG9ycyA1MCAtIEE3MDBcclxuICAgICpcclxuICAgICogQHBhcmFtIGNvbG9yIGNvbG9yXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgR2V0UGFsZXR0ZShjb2xvcjogc3RyaW5nKTogTWF0ZXJpYWxQYWxldHRlTW9kZWwge1xyXG4gICAgY29uc3QgYmFzZUxpZ2h0ID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFyayA9IHRoaXMudXRpbHNTZXJ2aWNlLk11bHRpcGx5KHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSwgdGlueUNvbG9yKGNvbG9yKS50b1JnYigpKTtcclxuICAgIGNvbnN0IFssICwgLCBiYXNlVHJpYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbiAgICBjb25zdCBwcmltYXJ5ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2xpZ2h0LCBhbW91bnRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGxpZ2h0ID8gYmFzZUxpZ2h0IDogYmFzZURhcmssXHJcbiAgICAgICAgICB0aW55Q29sb3IoY29sb3IpLCBhbW91bnQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhY2NlbnQgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFthbW91bnQsIHNhdCwgbGlnaHRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgoYmFzZURhcmssIGJhc2VUcmlhZCwgYW1vdW50KVxyXG4gICAgICAgICAgLnNhdHVyYXRlKHNhdCkubGlnaHRlbihsaWdodCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucHJpbWFyeSwgLi4uYWNjZW50XS5yZWR1Y2UoKGFjYywgW2ssIGNdKSA9PiB7XHJcbiAgICAgIGFjY1trXSA9IGMudG9IZXhTdHJpbmcoKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGVtaXQgZXZlbnQgd2l0aCB0aGVtZVxyXG4gICAgKi9cclxuICAgcHJvdGVjdGVkIGVtaXQoKTogdm9pZCB7XHJcbiAgICAgdGhpcy5UaGVtZS5uZXh0KHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gYSBuZXcgdGhlbWUgbW9kZWxcclxuICAgICovXHJcbiAgIHB1YmxpYyBnZXRUaGVtZSgpOiBUaGVtZU1vZGVsIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwYWxldHRlOiB0aGlzLlBhbGV0dGUsXHJcbiAgICAgIGxpZ2h0bmVzczogdGhpcy5UaGVtZU1vZGUsXHJcbiAgICB9O1xyXG4gICB9XHJcblxyXG4gICBwdWJsaWMgVXBkYXRlVGhlbWUodGhlbWU6IFRoZW1lTW9kZWwpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBTQVNTIHN0eWxlc2hlZXRcclxuICAgIGNvbnN0IHNvdXJjZTogc3RyaW5nID0gdGhpcy5HZXRUZW1wbGF0ZSh0aGVtZSk7XHJcblxyXG4gICAgLy8gUnVubmluZyBmdW5jdGlvbnMgb3V0c2lkZSBvZiBBbmd1bGFyJ3Mgem9uZSBhbmQgZG8gd29yayB0aGF0XHJcbiAgICAvLyBkb2Vzbid0IHRyaWdnZXIgQW5ndWxhciBjaGFuZ2UtZGV0ZWN0aW9uLlxyXG4gICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG5cclxuICAgICB0aGlzLkNvbXBpbGVTY3NzVGhlbWUoc291cmNlKS50aGVuKCAodGV4dDogc3RyaW5nKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFNBU1MgY29tcGlsZWQgdG8gQ1NTXHJcbiAgICAgICAgY29uc3QgY29tcGlsZWREeW5hbWljQ1NTOiBzdHJpbmcgPSB0ZXh0O1xyXG5cclxuICAgICAgICBjb25zdCBkeW5hbWljU3R5bGVTaGVldDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUtYnVpbGRlci1zdHlsZXNoZWV0Jyk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGR5bmFtaWMgc3R5bGVzaGVldCBleGlzdHMsIHRoZW4gcmVtb3ZlIGl0XHJcbiAgICAgICAgaWYgKGR5bmFtaWNTdHlsZVNoZWV0KSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLnJlbW92ZUNoaWxkKGR5bmFtaWNTdHlsZVNoZWV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFkZCBkeW5hbWljIHN0eWxlc2hlZXRcclxuICAgICAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgc3R5bGUuaWQgPSAndGhlbWUtYnVpbGRlci1zdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb21waWxlZER5bmFtaWNDU1MpKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgfSk7XHJcbiAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNldFRoZW1lcyh0aGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLlRoZW1lcyA9IHRoZW1lcztcclxuXHJcbiAgICBsZXQgaW5pdGlhbDogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgaW5pdGlhbCA9IHsgLi4uVGhlbWVCdWlsZGVyQ29uc3RhbnRzLkluaXRpYWxWYWx1ZXMsIC4uLmluaXRpYWwgfTtcclxuICAgIGluaXRpYWwucHJpbWFyeS5tYWluID0gdGhpcy5UaGVtZXNbMF0uUHJpbWFyeTtcclxuICAgIGluaXRpYWwuYWNjZW50Lm1haW4gPSB0aGlzLlRoZW1lc1swXS5BY2NlbnQ7XHJcbiAgICBpbml0aWFsLndhcm4ubWFpbiA9IHRoaXMuVGhlbWVzWzBdLldhcm47XHJcblxyXG4gICAgdGhpcy5QYWxldHRlID0gaW5pdGlhbDtcclxuXHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlUHJpbWFyeVZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLlByaW1hcnkpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZUFjY2VudFZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLkFjY2VudCk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlV2FyblZhcmlhbnRzKHRoaXMuVGhlbWVzWzBdLldhcm4pO1xyXG5cclxuICB9XHJcbn1cclxuIl19