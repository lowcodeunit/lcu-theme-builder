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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBZ0U1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFK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SUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7OztZQXhQRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWRRLFVBQVU7WUFFVixzQkFBc0I7WUFYdEIsbUJBQW1CO1lBRm5CLG9CQUFvQjtZQUtSLE1BQU07WUFQbEIsWUFBWTtZQUNaLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFV0aWxzU2VydmljZSB9IGZyb20gJy4vdXRpbHMuc2VydmljZSc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sb3JNYXBNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL2NvbG9yLW1hcC5tb2RlbCc7XHJcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4uL3V0aWxzL3RoZW1lLWJ1aWxkZXItY29uc3RhbnRzLnV0aWxzJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9tYXRlcmlhbC1wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgVGhlbWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90aGVtZS5tb2RlbCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IFBhbGV0dGVMaXN0TW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvcGFsZXR0ZS1saXN0Lm1vZGVsJztcclxuaW1wb3J0IHsgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVQaWNrZXJNb2RlbCB9IGZyb20gJy4uL21vZGVscy90aGVtZS1waWNrZXIubW9kZWwnO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG5jb25zdCBmYWxsYmFja1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmlvdC1lbnNlbWJsZS5jb20vYXNzZXRzL3RoZW1pbmcvdGhlbWluZy5zY3NzJztcclxuXHJcbi8vIHRlbGwgdHlwZXNjcmlwdCB0aGF0IFNhc3MgZXhpc3RzXHJcbi8vIGxvYWRzIHRoZSBzeW5jaHJvbm91cyBTYXNzLmpzXHJcbmRlY2xhcmUgdmFyIFNhc3M6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXMgaXQgbGlnaHRuZXNzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHRoZW1lTW9kZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlbWUgUGFsZXR0ZVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBwYWxldHRlOiBQYWxldHRlTW9kZWw7XHJcblxyXG4gIC8vIHB1YmxpYyAkZm9udHMgPSBuZXcgU3ViamVjdDxGb250U2VsZWN0aW9uTW9kZWxbXT4oKTtcclxuICBwdWJsaWMgVGhlbWU6IFN1YmplY3Q8VGhlbWVNb2RlbD47XHJcbiAgcHVibGljIFBhbGV0dGVDb2xvcnM6IFN1YmplY3Q8UGFydGlhbDxQYWxldHRlTW9kZWw+PjtcclxuICBwdWJsaWMgVGhlbWVTY3NzOiBQcm9taXNlPHZvaWQ+O1xyXG4gIHB1YmxpYyBQYWxldHRlTGlzdDogQXJyYXk8UGFsZXR0ZUxpc3RNb2RlbD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhbGV0dGUgY29sb3JzLCBmcm9tIDUwIC0gQTcwMFxyXG4gICAqL1xyXG4gIHB1YmxpYyBNYXRlcmlhbFBhbGV0dGVDb2xvcnM6IE1hdGVyaWFsUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvKipcclxuICAgKiBfdGhlbWluZy5zY3NzIGZyb20gQW5ndWxhciBNYXRlcmlhbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX21hdGVyaWFsVGhlbWU6IHN0cmluZztcclxuICBwdWJsaWMgc2V0IE1hdGVyaWFsVGhlbWUodmFsOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgdGhpcy5fbWF0ZXJpYWxUaGVtZSA9IHZhbDtcclxuICAgICAgdGhpcy5UaGVtZVNjc3MgPSB0aGlzLmxvYWRUaGVtaW5nU2NzcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBNYXRlcmlhbFRoZW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxUaGVtZTtcclxuICB9XHJcblxyXG4gICAvKipcclxuICAgICogU2V0IFBhbGV0dGUgY29sb3JzXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldCBQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZTtcclxuICAgICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5QYWxldHRlUGlja2VyQ2hhbmdlKHBhbGV0dGUpO1xyXG4gICAgICB0aGlzLlVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQYWxldHRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGhlbWVNb2RlKGxpZ2h0OiBib29sZWFuKSB7XHJcblxyXG4gICAgICB0aGlzLnRoZW1lTW9kZSA9ICFsaWdodDtcclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGhlbWVNb2RlKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudGhlbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlVGVtcGxhdGVTZXJ2aWNlOiBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcclxuICAgICAgcHJvdGVjdGVkIHV0aWxzU2VydmljZTogVXRpbHNTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgdmFyaWFudENvbG9yU2VydmljZTogVmFyaWFudENvbG9yU2VydmljZSkge1xyXG5cclxuICAgICAgdGhpcy5NYXRlcmlhbFRoZW1lID0gJ2h0dHBzOi8vd3d3LmlvdC1lbnNlbWJsZS5jb20vYXNzZXRzL3RoZW1pbmcvdGhlbWluZy5zY3NzJztcclxuICAgICAgdGhpcy50aGVtZU1vZGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLlRoZW1lID0gbmV3IFN1YmplY3Q8VGhlbWVNb2RlbD4oKTtcclxuICAgICAgdGhpcy5QYWxldHRlQ29sb3JzID0gbmV3IFN1YmplY3Q8UGFydGlhbDxQYWxldHRlTW9kZWw+PigpO1xyXG5cclxuICAgICAgLy8gdGhpcy5UaGVtZVNjc3MgPSB0aGlzLmxvYWRUaGVtaW5nU2NzcygpO1xyXG5cclxuICAgICAgdGhpcy5QYWxldHRlTGlzdCA9IFtdO1xyXG4gICAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBsb2FkIGludGlhbCB0aGVtZVxyXG4gICAgKiBcclxuICAgICogUHVsbHMgX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWwgYW5kIHRoZW4gb3ZlcndyaXRlcyBpdCB3aXRoIFxyXG4gICAgKiBvdXIgdGhlbWUgY29sb3IgY2hhbmdlc1xyXG4gICAgKi9cclxuICAgcHJvdGVjdGVkIGxvYWRUaGVtaW5nU2NzcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2NzcycsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuTWF0ZXJpYWxUaGVtZSwgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHhcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nbSwgJz8/JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcJG1hdC0oW146P10rKVxccyo6XFxzKlxcKFs/IF0qNTA6W14oKV0qY29udHJhc3RcXHMqOlxccypcXChbXildK1xcKVsgP10qXFwpO1xccyo/L2csXHJcbiAgICAgICAgICAgICAgKGFsbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IG5hbWUgPT09ICdncmV5JyA/IGFsbCA6ICcnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwvXFwqLio/XFwqXFwvL2csICcnKVxyXG4gICAgICAgICAgICAuc3BsaXQoL1s/XVs/XS9nKVxyXG4gICAgICAgICAgICAubWFwKChsOiBzdHJpbmcpID0+IGxcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccyooXFwvXFwvLiopPyQvZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXCRtYXQtYmx1ZS1ncmF5XFxzKjpcXHMqXFwkbWF0LWJsdWUtZ3JleVxccyo7XFxzKi9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoLzpcXHNcXHMrL2csICc6ICcpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmZpbHRlcigobDogc3RyaW5nKSA9PiAhIWwpXHJcbiAgICAgICAgICAgIC5qb2luKCdcXG4nKTtcclxuICAgICAgICB9KSxcclxuICAgICAgICBtYXAoXHJcbiAgICAgICAgICAodHh0OiBzdHJpbmcpID0+XHJcbiAgICAgICAgICAvLyB3cml0ZUZpbGUgYWxsb3dzIHRoaXMgZmlsZSB0byBiZSBhY2Nlc3NlZCBmcm9tIHN0eWxlcy5zY3NzXHJcbiAgICAgICAgICBTYXNzLndyaXRlRmlsZSgnfkBhbmd1bGFyL21hdGVyaWFsL3RoZW1pbmcnLCB0eHQsIChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2Fzcy53cml0ZUZpbGUnLCByZXN1bHQpO1xyXG4gICAgICAgICAgfSkpXHJcbiAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZW1lIHRlbXBsYXRlIGFuZCB1cGRhdGUgaXRcclxuICAgKiBcclxuICAgKiBAcGFyYW0gdGhlbWUgY3VycmVudCB0aGVtZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBHZXRUZW1wbGF0ZSh0aGVtZTogVGhlbWVNb2RlbCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWxldHRlVGVtcGxhdGVTZXJ2aWNlLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBpbGUgU0FTUyB0byBDU1NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0aGVtZSBTQVNTIHN0eWxlc2hlZXRcclxuICAgKiBAcmV0dXJucyBjb21waWxlZCBDU1NcclxuICAgKi9cclxuICAgcHVibGljIGFzeW5jIENvbXBpbGVTY3NzVGhlbWUodGhlbWU6IHN0cmluZykge1xyXG4gICAgYXdhaXQgdGhpcy5UaGVtZVNjc3M7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzLCByZWopID0+IHtcclxuICAgICAgU2Fzcy5jb21waWxlKHRoZW1lLnJlcGxhY2UoJ0BpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJGFsdFRoZW1lKTsnLCAnJyksICh2OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAodi5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgIHJlcyh2LnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWoodik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgICk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gcHJpbWFyeSBhbmQgYWNjZW50IGNvbG9ycyBmb3IgZWFjaCBjb2xvciBtYXAsIGZyb20gY29sb3JzIDUwIC0gQTcwMFxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0gY29sb3IgY29sb3JcclxuICAgICovXHJcbiAgIHB1YmxpYyBHZXRQYWxldHRlKGNvbG9yOiBzdHJpbmcpOiBNYXRlcmlhbFBhbGV0dGVNb2RlbCB7XHJcbiAgICBjb25zdCBiYXNlTGlnaHQgPSB0aW55Q29sb3IoJyNmZmZmZmYnKTtcclxuICAgIGNvbnN0IGJhc2VEYXJrID0gdGhpcy51dGlsc1NlcnZpY2UuTXVsdGlwbHkodGlueUNvbG9yKGNvbG9yKS50b1JnYigpLCB0aW55Q29sb3IoY29sb3IpLnRvUmdiKCkpO1xyXG4gICAgY29uc3QgWywgLCAsIGJhc2VUcmlhZF0gPSB0aW55Q29sb3IoY29sb3IpLnRldHJhZCgpO1xyXG5cclxuICAgIGNvbnN0IHByaW1hcnkgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfUFJJTUFSWSlcclxuICAgICAgLm1hcChrID0+IHtcclxuICAgICAgICBjb25zdCBbbGlnaHQsIGFtb3VudF0gPSBUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfUFJJTUFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgobGlnaHQgPyBiYXNlTGlnaHQgOiBiYXNlRGFyayxcclxuICAgICAgICAgIHRpbnlDb2xvcihjb2xvciksIGFtb3VudCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFjY2VudCA9IE9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2Ftb3VudCwgc2F0LCBsaWdodF0gPSBUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZW2tdO1xyXG4gICAgICAgIHJldHVybiBbaywgdGlueUNvbG9yLm1peChiYXNlRGFyaywgYmFzZVRyaWFkLCBhbW91bnQpXHJcbiAgICAgICAgICAuc2F0dXJhdGUoc2F0KS5saWdodGVuKGxpZ2h0KV0gYXMgW3N0cmluZywgdGlueWNvbG9yLkluc3RhbmNlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5wcmltYXJ5LCAuLi5hY2NlbnRdLnJlZHVjZSgoYWNjLCBbaywgY10pID0+IHtcclxuICAgICAgYWNjW2tdID0gYy50b0hleFN0cmluZygpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogZW1pdCBldmVudCB3aXRoIHRoZW1lXHJcbiAgICAqL1xyXG4gICBwcm90ZWN0ZWQgZW1pdCgpOiB2b2lkIHtcclxuICAgICB0aGlzLlRoZW1lLm5leHQodGhpcy5nZXRUaGVtZSgpKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJldHVybiBhIG5ldyB0aGVtZSBtb2RlbFxyXG4gICAgKi9cclxuICAgcHVibGljIGdldFRoZW1lKCk6IFRoZW1lTW9kZWwge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhbGV0dGU6IHRoaXMuUGFsZXR0ZSxcclxuICAgICAgbGlnaHRuZXNzOiB0aGlzLlRoZW1lTW9kZSxcclxuICAgIH07XHJcbiAgIH1cclxuXHJcbiAgIHB1YmxpYyBVcGRhdGVUaGVtZSh0aGVtZTogVGhlbWVNb2RlbCk6IHZvaWQge1xyXG5cclxuICAgIC8vIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAgY29uc3Qgc291cmNlOiBzdHJpbmcgPSB0aGlzLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuXHJcbiAgICAvLyBSdW5uaW5nIGZ1bmN0aW9ucyBvdXRzaWRlIG9mIEFuZ3VsYXIncyB6b25lIGFuZCBkbyB3b3JrIHRoYXRcclxuICAgIC8vIGRvZXNuJ3QgdHJpZ2dlciBBbmd1bGFyIGNoYW5nZS1kZXRlY3Rpb24uXHJcbiAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcblxyXG4gICAgIHRoaXMuQ29tcGlsZVNjc3NUaGVtZShzb3VyY2UpLnRoZW4oICh0ZXh0OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgLy8gU0FTUyBjb21waWxlZCB0byBDU1NcclxuICAgICAgICBjb25zdCBjb21waWxlZER5bmFtaWNDU1M6IHN0cmluZyA9IHRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTdHlsZVNoZWV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZHluYW1pYyBzdHlsZXNoZWV0IGV4aXN0cywgdGhlbiByZW1vdmUgaXRcclxuICAgICAgICBpZiAoZHluYW1pY1N0eWxlU2hlZXQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ucmVtb3ZlQ2hpbGQoZHluYW1pY1N0eWxlU2hlZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGR5bmFtaWMgc3R5bGVzaGVldFxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICBzdHlsZS5pZCA9ICd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbXBpbGVkRHluYW1pY0NTUykpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9KTtcclxuICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2V0VGhlbWVzKHRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD4pOiB2b2lkIHtcclxuICAgIHRoaXMuVGhlbWVzID0gdGhlbWVzO1xyXG5cclxuICAgIGxldCBpbml0aWFsOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBpbml0aWFsID0geyAuLi5UaGVtZUJ1aWxkZXJDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgLi4uaW5pdGlhbCB9O1xyXG4gICAgaW5pdGlhbC5wcmltYXJ5Lm1haW4gPSB0aGlzLlRoZW1lc1swXS5QcmltYXJ5O1xyXG4gICAgaW5pdGlhbC5hY2NlbnQubWFpbiA9IHRoaXMuVGhlbWVzWzBdLkFjY2VudDtcclxuICAgIGluaXRpYWwud2Fybi5tYWluID0gdGhpcy5UaGVtZXNbMF0uV2FybjtcclxuXHJcbiAgICB0aGlzLlBhbGV0dGUgPSBpbml0aWFsO1xyXG5cclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhpcy5UaGVtZXNbMF0uUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhpcy5UaGVtZXNbMF0uQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhpcy5UaGVtZXNbMF0uV2Fybik7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=