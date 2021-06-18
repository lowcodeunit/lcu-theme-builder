import { __awaiter } from "tslib";
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
import * as i5 from "./variant-color.service";
const tinyColor = tinycolor;
export class ThemeBuilderService {
    constructor(http, paletteTemplateService, localStorageService, palettePickerService, zone, variantColorService) {
        this.http = http;
        this.paletteTemplateService = paletteTemplateService;
        this.localStorageService = localStorageService;
        this.palettePickerService = palettePickerService;
        this.zone = zone;
        this.variantColorService = variantColorService;
        this.themeMode = true;
        this.Theme = new Subject();
        this.PaletteColors = new Subject();
        this.ThemeScss = this.loadThemingScss();
        this.PaletteList = [];
    }
    /**
     * _theming.scss from Angular Material
     */
    // private _materialTheme: string;
    // public set MaterialTheme(val: string) {
    //   this._materialTheme = val;
    //     this.ThemeScss = this.loadThemingScss();
    // }
    // public get MaterialTheme(): string {
    //   return this._materialTheme;
    // }
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
        // return this.http.get(this.MaterialTheme, { responseType: 'text' })
        return this.http.get('https://www.iot-ensemble.com/assets/theming/theming.scss', { responseType: 'text' })
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
        const baseDark = this.multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
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
    multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
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
ThemeBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.PaletteTemplateService), i0.ɵɵinject(i3.LocalStorageService), i0.ɵɵinject(i4.PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i5.VariantColorService)); }, token: ThemeBuilderService, providedIn: "root" });
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
    { type: VariantColorService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQztBQUN4QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFpQixPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQUdwRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFZNUIsTUFBTSxPQUFPLG1CQUFtQjtJQWdFNUIsWUFDWSxJQUFnQixFQUNoQixzQkFBOEMsRUFDOUMsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyxJQUFZLEVBQ1osbUJBQXdDO1FBTHhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLE9BQU8sRUFBYyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQXlCLENBQUM7UUFFMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQXhESjs7T0FFRztJQUNILGtDQUFrQztJQUNsQywwQ0FBMEM7SUFFMUMsK0JBQStCO0lBQy9CLCtDQUErQztJQUMvQyxJQUFJO0lBRUosdUNBQXVDO0lBQ3ZDLGdDQUFnQztJQUNoQyxJQUFJO0lBRUg7O09BRUc7SUFDRixJQUFXLE9BQU8sQ0FBQyxPQUFxQjtRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBYztRQUVqQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQVcsU0FBUztRQUVsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQXFCRjs7Ozs7T0FLRztJQUNPLGVBQWU7UUFDeEIscUVBQXFFO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsMERBQTBELEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDdkcsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQztpQkFDTCxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztpQkFDckIsT0FBTyxDQUFDLDRFQUE0RSxFQUNuRixDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUMzRCxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztpQkFDM0IsS0FBSyxDQUFDLFNBQVMsQ0FBQztpQkFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDO2lCQUM5QixPQUFPLENBQUMsZ0RBQWdELEVBQUUsRUFBRSxDQUFDO2lCQUM3RCxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztpQkFDekIsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FDMUI7aUJBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUNELENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDaEIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDckUseUNBQXlDO1FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQ04sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUY7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxLQUFpQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csZ0JBQWdCLENBQUMsS0FBYTs7WUFDMUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO29CQUN4RixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNsQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNiO3lCQUFNO3dCQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDUjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FDQSxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxLQUFhO1FBQzlCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsRUFBRSxBQUFELEVBQUcsQUFBRCxFQUFHLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVwRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDO2FBQ25FLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEdBQUcscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQ25ELFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBaUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztRQUVMLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUM7YUFDcEUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1AsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcscUJBQXFCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsT0FBTyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO3FCQUNsRCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFpQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO1FBRUwsT0FBTyxDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEQsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNPLElBQUk7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBRWQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUIsQ0FBQztJQUNILENBQUM7SUFFTSxRQUFRLENBQUMsSUFBVSxFQUFFLElBQVU7UUFDckMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFM0MsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWlCO1FBRW5DLGtCQUFrQjtRQUNsQixNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9DLCtEQUErRDtRQUMvRCw0Q0FBNEM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFFL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUVsRCx1QkFBdUI7Z0JBQ3ZCLE1BQU0sa0JBQWtCLEdBQVcsSUFBSSxDQUFDO2dCQUV4QyxNQUFNLGlCQUFpQixHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBRTNGLHFEQUFxRDtnQkFDckQsSUFBSSxpQkFBaUIsRUFBRTtvQkFDckIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN6RTtnQkFFRCx5QkFBeUI7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxFQUFFLEdBQUcsMEJBQTBCLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBK0I7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxPQUFPLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsT0FBTyxtQ0FBUSxxQkFBcUIsQ0FBQyxhQUFhLEdBQUssT0FBTyxDQUFFLENBQUM7UUFDakUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkUsQ0FBQzs7OztZQTlQRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWZRLFVBQVU7WUFFVixzQkFBc0I7WUFYdEIsbUJBQW1CO1lBRm5CLG9CQUFvQjtZQUtSLE1BQU07WUFObEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFyaWFudENvbG9yU2VydmljZSB9IGZyb20gJy4vdmFyaWFudC1jb2xvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xvck1hcE1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sb3ItbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29uc3RhbnRzIH0gZnJvbSAnLi4vdXRpbHMvdGhlbWUtYnVpbGRlci1jb25zdGFudHMudXRpbHMnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFBhbGV0dGVNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL21hdGVyaWFsLXBhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBUaGVtZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RoZW1lLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgUGFsZXR0ZUxpc3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLWxpc3QubW9kZWwnO1xyXG5pbXBvcnQgeyBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLXRlbXBsYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZVBpY2tlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RoZW1lLXBpY2tlci5tb2RlbCc7XHJcblxyXG5jb25zdCB0aW55Q29sb3IgPSB0aW55Y29sb3I7XHJcblxyXG50eXBlIFJHQkEgPSB0aW55Y29sb3IuQ29sb3JGb3JtYXRzLlJHQkE7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLyoqXHJcbiAgICogX3RoZW1pbmcuc2NzcyBmcm9tIEFuZ3VsYXIgTWF0ZXJpYWxcclxuICAgKi9cclxuICAvLyBwcml2YXRlIF9tYXRlcmlhbFRoZW1lOiBzdHJpbmc7XHJcbiAgLy8gcHVibGljIHNldCBNYXRlcmlhbFRoZW1lKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gIC8vICAgdGhpcy5fbWF0ZXJpYWxUaGVtZSA9IHZhbDtcclxuICAvLyAgICAgdGhpcy5UaGVtZVNjc3MgPSB0aGlzLmxvYWRUaGVtaW5nU2NzcygpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gcHVibGljIGdldCBNYXRlcmlhbFRoZW1lKCk6IHN0cmluZyB7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxUaGVtZTtcclxuICAvLyB9XHJcblxyXG4gICAvKipcclxuICAgICogU2V0IFBhbGV0dGUgY29sb3JzXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldCBQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZTtcclxuICAgICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5QYWxldHRlUGlja2VyQ2hhbmdlKHBhbGV0dGUpO1xyXG4gICAgICB0aGlzLlVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQYWxldHRlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYWxldHRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgVGhlbWVNb2RlKGxpZ2h0OiBib29sZWFuKSB7XHJcblxyXG4gICAgICB0aGlzLnRoZW1lTW9kZSA9ICFsaWdodDtcclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGhlbWVNb2RlKCkge1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMudGhlbWVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICAgIHByb3RlY3RlZCBwYWxldHRlVGVtcGxhdGVTZXJ2aWNlOiBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgbG9jYWxTdG9yYWdlU2VydmljZTogTG9jYWxTdG9yYWdlU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcclxuICAgICAgcHJvdGVjdGVkIHZhcmlhbnRDb2xvclNlcnZpY2U6IFZhcmlhbnRDb2xvclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIHRoaXMudGhlbWVNb2RlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5UaGVtZSA9IG5ldyBTdWJqZWN0PFRoZW1lTW9kZWw+KCk7XHJcbiAgICAgIHRoaXMuUGFsZXR0ZUNvbG9ycyA9IG5ldyBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj4oKTtcclxuXHJcbiAgICAgIHRoaXMuVGhlbWVTY3NzID0gdGhpcy5sb2FkVGhlbWluZ1Njc3MoKTtcclxuXHJcbiAgICAgIHRoaXMuUGFsZXR0ZUxpc3QgPSBbXTtcclxuICAgICB9XHJcblxyXG4gICAvKipcclxuICAgICogbG9hZCBpbnRpYWwgdGhlbWVcclxuICAgICogXHJcbiAgICAqIFB1bGxzIF90aGVtaW5nLnNjc3MgZnJvbSBBbmd1bGFyIE1hdGVyaWFsIGFuZCB0aGVuIG92ZXJ3cml0ZXMgaXQgd2l0aCBcclxuICAgICogb3VyIHRoZW1lIGNvbG9yIGNoYW5nZXNcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBsb2FkVGhlbWluZ1Njc3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLk1hdGVyaWFsVGhlbWUsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwczovL3d3dy5pb3QtZW5zZW1ibGUuY29tL2Fzc2V0cy90aGVtaW5nL3RoZW1pbmcuc2NzcycsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIHJldHVybiB4XHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZ20sICc/PycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXCRtYXQtKFteOj9dKylcXHMqOlxccypcXChbPyBdKjUwOlteKCldKmNvbnRyYXN0XFxzKjpcXHMqXFwoW14pXStcXClbID9dKlxcKTtcXHMqPy9nLFxyXG4gICAgICAgICAgICAgIChhbGw6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiBuYW1lID09PSAnZ3JleScgPyBhbGwgOiAnJylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcKi4qP1xcKlxcLy9nLCAnJylcclxuICAgICAgICAgICAgLnNwbGl0KC9bP11bP10vZylcclxuICAgICAgICAgICAgLm1hcCgobDogc3RyaW5nKSA9PiBsXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqKFxcL1xcLy4qKT8kL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFwkbWF0LWJsdWUtZ3JheVxccyo6XFxzKlxcJG1hdC1ibHVlLWdyZXlcXHMqO1xccyovZywgJycpXHJcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC86XFxzXFxzKy9nLCAnOiAnKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGw6IHN0cmluZykgPT4gISFsKVxyXG4gICAgICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKHR4dDogc3RyaW5nKSA9PlxyXG4gICAgICAgICAgLy8gd3JpdGVGaWxlIGFsbG93cyB0aGlzIGZpbGUgdG8gYmUgYWNjZXNzZWQgZnJvbSBzdHlsZXMuc2Nzc1xyXG4gICAgICAgICAgU2Fzcy53cml0ZUZpbGUoJ35AYW5ndWxhci9tYXRlcmlhbC90aGVtaW5nJywgdHh0LCAocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1Nhc3Mud3JpdGVGaWxlJywgcmVzdWx0KTtcclxuICAgICAgICAgIH0pKVxyXG4gICAgICApLnRvUHJvbWlzZSgpO1xyXG4gICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGVtZSB0ZW1wbGF0ZSBhbmQgdXBkYXRlIGl0XHJcbiAgICogXHJcbiAgICogQHBhcmFtIHRoZW1lIGN1cnJlbnQgdGhlbWVcclxuICAgKi9cclxuICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMucGFsZXR0ZVRlbXBsYXRlU2VydmljZS5HZXRUZW1wbGF0ZSh0aGVtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21waWxlIFNBU1MgdG8gQ1NTXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdGhlbWUgU0FTUyBzdHlsZXNoZWV0XHJcbiAgICogQHJldHVybnMgY29tcGlsZWQgQ1NTXHJcbiAgICovXHJcbiAgIHB1YmxpYyBhc3luYyBDb21waWxlU2Nzc1RoZW1lKHRoZW1lOiBzdHJpbmcpIHtcclxuICAgIGF3YWl0IHRoaXMuVGhlbWVTY3NzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgIFNhc3MuY29tcGlsZSh0aGVtZS5yZXBsYWNlKCdAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7JywgJycpLCAodjogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHYuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICByZXModi50ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICApO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIHByaW1hcnkgYW5kIGFjY2VudCBjb2xvcnMgZm9yIGVhY2ggY29sb3IgbWFwLCBmcm9tIGNvbG9ycyA1MCAtIEE3MDBcclxuICAgICpcclxuICAgICogQHBhcmFtIGNvbG9yIGNvbG9yXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgR2V0UGFsZXR0ZShjb2xvcjogc3RyaW5nKTogTWF0ZXJpYWxQYWxldHRlTW9kZWwge1xyXG4gICAgY29uc3QgYmFzZUxpZ2h0ID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFyayA9IHRoaXMubXVsdGlwbHkodGlueUNvbG9yKGNvbG9yKS50b1JnYigpLCB0aW55Q29sb3IoY29sb3IpLnRvUmdiKCkpO1xyXG4gICAgY29uc3QgWywgLCAsIGJhc2VUcmlhZF0gPSB0aW55Q29sb3IoY29sb3IpLnRldHJhZCgpO1xyXG5cclxuICAgIGNvbnN0IHByaW1hcnkgPSBPYmplY3Qua2V5cyhUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfUFJJTUFSWSlcclxuICAgICAgLm1hcChrID0+IHtcclxuICAgICAgICBjb25zdCBbbGlnaHQsIGFtb3VudF0gPSBUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfUFJJTUFSWVtrXTtcclxuICAgICAgICByZXR1cm4gW2ssIHRpbnlDb2xvci5taXgobGlnaHQgPyBiYXNlTGlnaHQgOiBiYXNlRGFyayxcclxuICAgICAgICAgIHRpbnlDb2xvcihjb2xvciksIGFtb3VudCldIGFzIFtzdHJpbmcsIHRpbnljb2xvci5JbnN0YW5jZV07XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFjY2VudCA9IE9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUlkpXHJcbiAgICAgIC5tYXAoayA9PiB7XHJcbiAgICAgICAgY29uc3QgW2Ftb3VudCwgc2F0LCBsaWdodF0gPSBUaGVtZUJ1aWxkZXJDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZW2tdO1xyXG4gICAgICAgIHJldHVybiBbaywgdGlueUNvbG9yLm1peChiYXNlRGFyaywgYmFzZVRyaWFkLCBhbW91bnQpXHJcbiAgICAgICAgICAuc2F0dXJhdGUoc2F0KS5saWdodGVuKGxpZ2h0KV0gYXMgW3N0cmluZywgdGlueWNvbG9yLkluc3RhbmNlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIFsuLi5wcmltYXJ5LCAuLi5hY2NlbnRdLnJlZHVjZSgoYWNjLCBbaywgY10pID0+IHtcclxuICAgICAgYWNjW2tdID0gYy50b0hleFN0cmluZygpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogZW1pdCBldmVudCB3aXRoIHRoZW1lXHJcbiAgICAqL1xyXG4gICBwcm90ZWN0ZWQgZW1pdCgpOiB2b2lkIHtcclxuICAgICB0aGlzLlRoZW1lLm5leHQodGhpcy5nZXRUaGVtZSgpKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJldHVybiBhIG5ldyB0aGVtZSBtb2RlbFxyXG4gICAgKi9cclxuICAgcHVibGljIGdldFRoZW1lKCk6IFRoZW1lTW9kZWwge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhbGV0dGU6IHRoaXMuUGFsZXR0ZSxcclxuICAgICAgbGlnaHRuZXNzOiB0aGlzLlRoZW1lTW9kZSxcclxuICAgIH07XHJcbiAgIH1cclxuXHJcbiAgIHB1YmxpYyBtdWx0aXBseShyZ2IxOiBSR0JBLCByZ2IyOiBSR0JBKTogYW55IHtcclxuICAgIHJnYjEuYiA9IE1hdGguZmxvb3IocmdiMS5iICogcmdiMi5iIC8gMjU1KTtcclxuICAgIHJnYjEuZyA9IE1hdGguZmxvb3IocmdiMS5nICogcmdiMi5nIC8gMjU1KTtcclxuICAgIHJnYjEuciA9IE1hdGguZmxvb3IocmdiMS5yICogcmdiMi5yIC8gMjU1KTtcclxuXHJcbiAgICByZXR1cm4gdGlueUNvbG9yKCdyZ2IgJyArIHJnYjEuciArICcgJyArIHJnYjEuZyArICcgJyArIHJnYjEuYik7XHJcbiAgIH1cclxuXHJcbiAgIHB1YmxpYyBVcGRhdGVUaGVtZSh0aGVtZTogVGhlbWVNb2RlbCk6IHZvaWQge1xyXG5cclxuICAgIC8vIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAgY29uc3Qgc291cmNlOiBzdHJpbmcgPSB0aGlzLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuXHJcbiAgICAvLyBSdW5uaW5nIGZ1bmN0aW9ucyBvdXRzaWRlIG9mIEFuZ3VsYXIncyB6b25lIGFuZCBkbyB3b3JrIHRoYXRcclxuICAgIC8vIGRvZXNuJ3QgdHJpZ2dlciBBbmd1bGFyIGNoYW5nZS1kZXRlY3Rpb24uXHJcbiAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcblxyXG4gICAgIHRoaXMuQ29tcGlsZVNjc3NUaGVtZShzb3VyY2UpLnRoZW4oICh0ZXh0OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgLy8gU0FTUyBjb21waWxlZCB0byBDU1NcclxuICAgICAgICBjb25zdCBjb21waWxlZER5bmFtaWNDU1M6IHN0cmluZyA9IHRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTdHlsZVNoZWV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZHluYW1pYyBzdHlsZXNoZWV0IGV4aXN0cywgdGhlbiByZW1vdmUgaXRcclxuICAgICAgICBpZiAoZHluYW1pY1N0eWxlU2hlZXQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ucmVtb3ZlQ2hpbGQoZHluYW1pY1N0eWxlU2hlZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGR5bmFtaWMgc3R5bGVzaGVldFxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICBzdHlsZS5pZCA9ICd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbXBpbGVkRHluYW1pY0NTUykpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9KTtcclxuICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2V0VGhlbWVzKHRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD4pOiB2b2lkIHtcclxuICAgIHRoaXMuVGhlbWVzID0gdGhlbWVzO1xyXG5cclxuICAgIGxldCBpbml0aWFsOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBpbml0aWFsID0geyAuLi5UaGVtZUJ1aWxkZXJDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgLi4uaW5pdGlhbCB9O1xyXG4gICAgaW5pdGlhbC5wcmltYXJ5Lm1haW4gPSB0aGlzLlRoZW1lc1swXS5QcmltYXJ5O1xyXG4gICAgaW5pdGlhbC5hY2NlbnQubWFpbiA9IHRoaXMuVGhlbWVzWzBdLkFjY2VudDtcclxuICAgIGluaXRpYWwud2Fybi5tYWluID0gdGhpcy5UaGVtZXNbMF0uV2FybjtcclxuXHJcbiAgICB0aGlzLlBhbGV0dGUgPSBpbml0aWFsO1xyXG5cclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhpcy5UaGVtZXNbMF0uUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhpcy5UaGVtZXNbMF0uQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhpcy5UaGVtZXNbMF0uV2Fybik7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=