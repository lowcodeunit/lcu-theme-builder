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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBaUU1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFK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LENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7OztZQTFQRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWRRLFVBQVU7WUFFVixzQkFBc0I7WUFYdEIsbUJBQW1CO1lBRm5CLG9CQUFvQjtZQUtSLE1BQU07WUFQbEIsWUFBWTtZQUNaLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMuc2VydmljZSc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sb3JNYXBNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbG9yLW1hcC5tb2RlbCc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4uL3V0aWxzL3RoZW1lLWJ1aWxkZXItY29uc3RhbnRzLnV0aWxzJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9tYXRlcmlhbC1wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgVGhlbWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90aGVtZS5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFBhbGV0dGVMaXN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvcGFsZXR0ZS1saXN0Lm1vZGVsJztcclxuaW1wb3J0IHsgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVQaWNrZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy90aGVtZS1waWNrZXIubW9kZWwnO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG5jb25zdCBmYWxsYmFja1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmlvdC1lbnNlbWJsZS5jb20vYXNzZXRzL3RoZW1pbmcvdGhlbWluZy5zY3NzJztcclxuXHJcbi8vIHRlbGwgdHlwZXNjcmlwdCB0aGF0IFNhc3MgZXhpc3RzXHJcbi8vIGxvYWRzIHRoZSBzeW5jaHJvbm91cyBTYXNzLmpzXHJcbmRlY2xhcmUgdmFyIFNhc3M6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXMgaXQgbGlnaHRuZXNzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHRoZW1lTW9kZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlbWUgUGFsZXR0ZVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBwYWxldHRlOiBQYWxldHRlTW9kZWw7XHJcblxyXG4gIC8vIHB1YmxpYyAkZm9udHMgPSBuZXcgU3ViamVjdDxGb250U2VsZWN0aW9uTW9kZWxbXT4oKTtcclxuICBwdWJsaWMgVGhlbWU6IFN1YmplY3Q8VGhlbWVNb2RlbD47XHJcbiAgcHVibGljIFBhbGV0dGVDb2xvcnM6IFN1YmplY3Q8UGFydGlhbDxQYWxldHRlTW9kZWw+PjtcclxuICBwdWJsaWMgVGhlbWVTY3NzOiBQcm9taXNlPHZvaWQ+O1xyXG4gIHB1YmxpYyBQYWxldHRlTGlzdDogQXJyYXk8UGFsZXR0ZUxpc3RNb2RlbD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhbGV0dGUgY29sb3JzLCBmcm9tIDUwIC0gQTcwMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBNYXRlcmlhbFBhbGV0dGVDb2xvcnM6IE1hdGVyaWFsUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvKipcclxuICAgKiBfdGhlbWluZy5zY3NzIGZyb20gQW5ndWxhciBNYXRlcmlhbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX21hdGVyaWFsVGhlbWU6IHN0cmluZztcclxuICBwdWJsaWMgc2V0IE1hdGVyaWFsVGhlbWUodmFsOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgdGhpcy5fbWF0ZXJpYWxUaGVtZSA9IHZhbDtcclxuICAgICAgdGhpcy5UaGVtZVNjc3MgPSB0aGlzLmxvYWRUaGVtaW5nU2NzcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBNYXRlcmlhbFRoZW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxUaGVtZTtcclxuICB9XHJcblxyXG4gICAvKipcclxuICAgICogU2V0IFBhbGV0dGUgY29sb3JzXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldCBQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZTtcclxuICAgICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5QYWxldHRlUGlja2VyQ2hhbmdlKHBhbGV0dGUpO1xyXG4gICAgICB0aGlzLlRoZW1lTW9kZSA9ICFwYWxldHRlLkRhcmtNb2RlO1xyXG4gICAgICB0aGlzLlVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQYWxldHRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGhlbWVNb2RlKHZhbDogYm9vbGVhbikge1xyXG5cclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB2YWw7XHJcbiAgICAgIHRoaXMuVXBkYXRlVGhlbWUodGhpcy5nZXRUaGVtZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFRoZW1lTW9kZSgpIHtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLnRoZW1lTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVGhlbWVzOiBBcnJheTxUaGVtZVBpY2tlck1vZGVsPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIFxyXG4gICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVRlbXBsYXRlU2VydmljZTogUGFsZXR0ZVRlbXBsYXRlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIGxvY2FsU3RvcmFnZVNlcnZpY2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXHJcbiAgICAgIHByb3RlY3RlZCB1dGlsc1NlcnZpY2U6IFV0aWxzU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHZhcmlhbnRDb2xvclNlcnZpY2U6IFZhcmlhbnRDb2xvclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIHRoaXMuTWF0ZXJpYWxUaGVtZSA9ICdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2Nzcyc7XHJcbiAgICAgIHRoaXMudGhlbWVNb2RlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5UaGVtZSA9IG5ldyBTdWJqZWN0PFRoZW1lTW9kZWw+KCk7XHJcbiAgICAgIHRoaXMuUGFsZXR0ZUNvbG9ycyA9IG5ldyBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj4oKTtcclxuXHJcbiAgICAgIC8vIHRoaXMuVGhlbWVTY3NzID0gdGhpcy5sb2FkVGhlbWluZ1Njc3MoKTtcclxuXHJcbiAgICAgIHRoaXMuUGFsZXR0ZUxpc3QgPSBbXTtcclxuICAgICB9XHJcblxyXG4gICAvKipcclxuICAgICogbG9hZCBpbnRpYWwgdGhlbWVcclxuICAgICogXHJcbiAgICAqIFB1bGxzIF90aGVtaW5nLnNjc3MgZnJvbSBBbmd1bGFyIE1hdGVyaWFsIGFuZCB0aGVuIG92ZXJ3cml0ZXMgaXQgd2l0aCBcclxuICAgICogb3VyIHRoZW1lIGNvbG9yIGNoYW5nZXNcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBsb2FkVGhlbWluZ1Njc3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cHM6Ly93d3cuaW90LWVuc2VtYmxlLmNvbS9hc3NldHMvdGhlbWluZy90aGVtaW5nLnNjc3MnLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLk1hdGVyaWFsVGhlbWUsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHJldHVybiB4XHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZ20sICc/PycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCRtYXQtKFteOj9dKylcXHMqOlxccypcXChbPyBdKjUwOlteKCldKmNvbnRyYXN0XFxzKjpcXHMqXFwoW14pXStcXClbID9dKlxcKTtcXHMqPy9nLFxyXG4gICAgICAgICAgICAgIChhbGw6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiBuYW1lID09PSAnZ3JleScgPyBhbGwgOiAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcKi4qP1xcKlxcLy9nLCAnJylcclxuICAgICAgICAgICAgLnNwbGl0KC9bP11bP10vZylcclxuICAgICAgICAgICAgLm1hcCgobDogc3RyaW5nKSA9PiBsXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqKFxcL1xcLy4qKT8kL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFwkbWF0LWJsdWUtZ3JheVxccyo6XFxzKlxcJG1hdC1ibHVlLWdyZXlcXHMqO1xccyovZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC86XFxzXFxzKy9nLCAnOiAnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGw6IHN0cmluZykgPT4gISFsKVxyXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKHR4dDogc3RyaW5nKSA9PlxyXG4gICAgICAgICAgLy8gd3JpdGVGaWxlIGFsbG93cyB0aGlzIGZpbGUgdG8gYmUgYWNjZXNzZWQgZnJvbSBzdHlsZXMuc2Nzc1xyXG4gICAgICAgICAgU2Fzcy53cml0ZUZpbGUoJ35AYW5ndWxhci9tYXRlcmlhbC90aGVtaW5nJywgdHh0LCAocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Nhc3Mud3JpdGVGaWxlJywgcmVzdWx0KTtcclxuICAgICAgICAgIH0pKVxyXG4gICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGVtZSB0ZW1wbGF0ZSBhbmQgdXBkYXRlIGl0XHJcbiAgICogXHJcbiAgICogQHBhcmFtIHRoZW1lIGN1cnJlbnQgdGhlbWVcclxuICAgKi9cclxuICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGFsZXR0ZVRlbXBsYXRlU2VydmljZS5HZXRUZW1wbGF0ZSh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21waWxlIFNBU1MgdG8gQ1NTXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGhlbWUgU0FTUyBzdHlsZXNoZWV0XHJcbiAgICogQHJldHVybnMgY29tcGlsZWQgQ1NTXHJcbiAgICovXHJcbiAgIHB1YmxpYyBhc3luYyBDb21waWxlU2Nzc1RoZW1lKHRoZW1lOiBzdHJpbmcpIHtcclxuICAgIGF3YWl0IHRoaXMuVGhlbWVTY3NzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIFNhc3MuY29tcGlsZSh0aGVtZS5yZXBsYWNlKCdAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7JywgJycpLCAodjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHYuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICByZXModi50ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIHByaW1hcnkgYW5kIGFjY2VudCBjb2xvcnMgZm9yIGVhY2ggY29sb3IgbWFwLCBmcm9tIGNvbG9ycyA1MCAtIEE3MDBcclxuICAgICpcclxuICAgICogQHBhcmFtIGNvbG9yIGNvbG9yXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgR2V0UGFsZXR0ZShjb2xvcjogc3RyaW5nKTogTWF0ZXJpYWxQYWxldHRlTW9kZWwge1xyXG4gICAgY29uc3QgYmFzZUxpZ2h0ID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFyayA9IHRoaXMudXRpbHNTZXJ2aWNlLk11bHRpcGx5KHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSwgdGlueUNvbG9yKGNvbG9yKS50b1JnYigpKTtcclxuICAgIGNvbnN0IFssICwgLCBiYXNlVHJpYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbiAgICBjb25zdCBwcmltYXJ5ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2xpZ2h0LCBhbW91bnRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1BSSU1BUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGxpZ2h0ID8gYmFzZUxpZ2h0IDogYmFzZURhcmssXHJcbiAgICAgICAgICB0aW55Q29sb3IoY29sb3IpLCBhbW91bnQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICBjb25zdCBhY2NlbnQgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFthbW91bnQsIHNhdCwgbGlnaHRdID0gVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgoYmFzZURhcmssIGJhc2VUcmlhZCwgYW1vdW50KVxyXG4gICAgICAgICAgLnNhdHVyYXRlKHNhdCkubGlnaHRlbihsaWdodCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBbLi4ucHJpbWFyeSwgLi4uYWNjZW50XS5yZWR1Y2UoKGFjYywgW2ssIGNdKSA9PiB7XHJcbiAgICAgIGFjY1trXSA9IGMudG9IZXhTdHJpbmcoKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGVtaXQgZXZlbnQgd2l0aCB0aGVtZVxyXG4gICAgKi9cclxuICAgcHJvdGVjdGVkIGVtaXQoKTogdm9pZCB7XHJcbiAgICAgdGhpcy5UaGVtZS5uZXh0KHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gYSBuZXcgdGhlbWUgbW9kZWxcclxuICAgICovXHJcbiAgIHB1YmxpYyBnZXRUaGVtZSgpOiBUaGVtZU1vZGVsIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBQYWxldHRlOiB0aGlzLlBhbGV0dGUsXHJcbiAgICAgIFRoZW1lRGFya01vZGU6IHRoaXMuVGhlbWVNb2RlLFxyXG4gICAgfTtcclxuICAgfVxyXG5cclxuICAgcHVibGljIFVwZGF0ZVRoZW1lKHRoZW1lOiBUaGVtZU1vZGVsKTogdm9pZCB7XHJcblxyXG4gICAgLy8gU0FTUyBzdHlsZXNoZWV0XHJcbiAgICBjb25zdCBzb3VyY2U6IHN0cmluZyA9IHRoaXMuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG5cclxuICAgIC8vIFJ1bm5pbmcgZnVuY3Rpb25zIG91dHNpZGUgb2YgQW5ndWxhcidzIHpvbmUgYW5kIGRvIHdvcmsgdGhhdFxyXG4gICAgLy8gZG9lc24ndCB0cmlnZ2VyIEFuZ3VsYXIgY2hhbmdlLWRldGVjdGlvbi5cclxuICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHJcbiAgICAgdGhpcy5Db21waWxlU2Nzc1RoZW1lKHNvdXJjZSkudGhlbiggKHRleHQ6IHN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAvLyBTQVNTIGNvbXBpbGVkIHRvIENTU1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVkRHluYW1pY0NTUzogc3RyaW5nID0gdGV4dDtcclxuXHJcbiAgICAgICAgY29uc3QgZHluYW1pY1N0eWxlU2hlZXQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCcpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBkeW5hbWljIHN0eWxlc2hlZXQgZXhpc3RzLCB0aGVuIHJlbW92ZSBpdFxyXG4gICAgICAgIGlmIChkeW5hbWljU3R5bGVTaGVldCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5yZW1vdmVDaGlsZChkeW5hbWljU3R5bGVTaGVldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgZHluYW1pYyBzdHlsZXNoZWV0XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmlkID0gJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29tcGlsZWREeW5hbWljQ1NTKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTZXRUaGVtZXModGhlbWVzOiBBcnJheTxUaGVtZVBpY2tlck1vZGVsPik6IHZvaWQge1xyXG4gICAgdGhpcy5UaGVtZXMgPSB0aGVtZXM7XHJcblxyXG4gICAgbGV0IGluaXRpYWw6IFBhbGV0dGVNb2RlbCA9IG5ldyBQYWxldHRlTW9kZWwoKTtcclxuICAgIGluaXRpYWwgPSB7IC4uLlRoZW1lQnVpbGRlckNvbnN0YW50cy5Jbml0aWFsVmFsdWVzLCAuLi5pbml0aWFsIH07XHJcbiAgICBpbml0aWFsLnByaW1hcnkuTWFpbiA9IHRoaXMuVGhlbWVzWzBdLlByaW1hcnk7XHJcbiAgICBpbml0aWFsLmFjY2VudC5NYWluID0gdGhpcy5UaGVtZXNbMF0uQWNjZW50O1xyXG4gICAgaW5pdGlhbC53YXJuLk1haW4gPSB0aGlzLlRoZW1lc1swXS5XYXJuO1xyXG4gICAgaW5pdGlhbC5EYXJrTW9kZSA9IHRoaXMuVGhlbWVzWzBdLkRhcmtNb2RlO1xyXG5cclxuICAgIHRoaXMuUGFsZXR0ZSA9IGluaXRpYWw7XHJcblxyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVByaW1hcnlWYXJpYW50cyh0aGlzLlRoZW1lc1swXS5QcmltYXJ5KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVBY2NlbnRWYXJpYW50cyh0aGlzLlRoZW1lc1swXS5BY2NlbnQpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVdhcm5WYXJpYW50cyh0aGlzLlRoZW1lc1swXS5XYXJuKTtcclxuXHJcbiAgfVxyXG59XHJcbiJdfQ==