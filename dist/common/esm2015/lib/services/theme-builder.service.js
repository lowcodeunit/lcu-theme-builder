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
        debugger;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDeEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBaUIsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBR3BFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM1QixNQUFNLFdBQVcsR0FBVywwREFBMEQsQ0FBQztBQVV2RixNQUFNLE9BQU8sbUJBQW1CO0lBaUU1QixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLElBQVksRUFDWixZQUEwQixFQUMxQixtQkFBd0M7UUFOeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVsRCxJQUFJLENBQUMsYUFBYSxHQUFHLDBEQUEwRCxDQUFDO1FBQ2hGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLEVBQWMsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksT0FBTyxFQUF5QixDQUFDO1FBRTFELDJDQUEyQztRQUUzQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBdkRKLElBQVcsYUFBYSxDQUFDLEdBQVc7UUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELElBQVcsYUFBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVBOztPQUVHO0lBQ0YsSUFBVyxPQUFPLENBQUMsT0FBcUI7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQVcsT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQVcsU0FBUyxDQUFDLEtBQWM7UUFFakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFFbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUF1QkY7Ozs7O09BS0c7SUFDTyxlQUFlO1FBQ3hCLDZHQUE2RztRQUM3RyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDL0QsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQztpQkFDTCxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztpQkFDckIsT0FBTyxDQUFDLDRFQUE0RSxFQUNuRixDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2lCQUMzRCxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQztpQkFDM0IsS0FBSyxDQUFDLFNBQVMsQ0FBQztpQkFDaEIsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDO2lCQUM5QixPQUFPLENBQUMsZ0RBQWdELEVBQUUsRUFBRSxDQUFDO2lCQUM3RCxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztpQkFDekIsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FDMUI7aUJBQ0EsTUFBTSxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUNELENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDaEIsNkRBQTZEO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDckUseUNBQXlDO1FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQ04sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUY7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxLQUFpQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csZ0JBQWdCLENBQUMsS0FBYTs7WUFDMUMsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO29CQUN4RixJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNsQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNiO3lCQUFNO3dCQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDUjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FDQSxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxLQUFhO1FBQzlCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEcsTUFBTSxDQUFDLEVBQUUsQUFBRCxFQUFHLEFBQUQsRUFBRyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFcEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUNuRCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQWlDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFFTCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDO2FBQ3BFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNQLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztxQkFDbEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBaUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU8sQ0FBQyxHQUFHLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3BELEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQ7O09BRUc7SUFDTyxJQUFJO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNkLFFBQVEsQ0FBQztRQUNULE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCLENBQUM7SUFDSCxDQUFDO0lBRU0sV0FBVyxDQUFDLEtBQWlCO1FBRW5DLGtCQUFrQjtRQUNsQixNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9DLCtEQUErRDtRQUMvRCw0Q0FBNEM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFFL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUVsRCx1QkFBdUI7Z0JBQ3ZCLE1BQU0sa0JBQWtCLEdBQVcsSUFBSSxDQUFDO2dCQUV4QyxNQUFNLGlCQUFpQixHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBRTNGLHFEQUFxRDtnQkFDckQsSUFBSSxpQkFBaUIsRUFBRTtvQkFDckIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUN6RTtnQkFFRCx5QkFBeUI7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxFQUFFLEdBQUcsMEJBQTBCLENBQUM7Z0JBQ3RDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBRXJFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFTSxTQUFTLENBQUMsTUFBK0I7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxPQUFPLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0MsT0FBTyxtQ0FBUSxxQkFBcUIsQ0FBQyxhQUFhLEdBQUssT0FBTyxDQUFFLENBQUM7UUFDakUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUzQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVuRSxDQUFDOzs7O1lBMVBGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBZFEsVUFBVTtZQUVWLHNCQUFzQjtZQVh0QixtQkFBbUI7WUFGbkIsb0JBQW9CO1lBS1IsTUFBTTtZQVBsQixZQUFZO1lBQ1osbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVmFyaWFudENvbG9yU2VydmljZSB9IGZyb20gJy4vdmFyaWFudC1jb2xvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xvck1hcE1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvY29sb3ItbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vbG9jYWwtc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29uc3RhbnRzIH0gZnJvbSAnLi4vdXRpbHMvdGhlbWUtYnVpbGRlci1jb25zdGFudHMudXRpbHMnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFBhbGV0dGVNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL21hdGVyaWFsLXBhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBUaGVtZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RoZW1lLm1vZGVsJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgUGFsZXR0ZUxpc3RNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLWxpc3QubW9kZWwnO1xyXG5pbXBvcnQgeyBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLXRlbXBsYXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZVBpY2tlck1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3RoZW1lLXBpY2tlci5tb2RlbCc7XHJcblxyXG5jb25zdCB0aW55Q29sb3IgPSB0aW55Y29sb3I7XHJcbmNvbnN0IGZhbGxiYWNrVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuaW90LWVuc2VtYmxlLmNvbS9hc3NldHMvdGhlbWluZy90aGVtaW5nLnNjc3MnO1xyXG5cclxuLy8gdGVsbCB0eXBlc2NyaXB0IHRoYXQgU2FzcyBleGlzdHNcclxuLy8gbG9hZHMgdGhlIHN5bmNocm9ub3VzIFNhc3MuanNcclxuZGVjbGFyZSB2YXIgU2FzczogYW55O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRoZW1lQnVpbGRlclNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiBJcyBpdCBsaWdodG5lc3NcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdGhlbWVNb2RlOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBUaGVtZSBQYWxldHRlXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHBhbGV0dGU6IFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgLy8gcHVibGljICRmb250cyA9IG5ldyBTdWJqZWN0PEZvbnRTZWxlY3Rpb25Nb2RlbFtdPigpO1xyXG4gIHB1YmxpYyBUaGVtZTogU3ViamVjdDxUaGVtZU1vZGVsPjtcclxuICBwdWJsaWMgUGFsZXR0ZUNvbG9yczogU3ViamVjdDxQYXJ0aWFsPFBhbGV0dGVNb2RlbD4+O1xyXG4gIHB1YmxpYyBUaGVtZVNjc3M6IFByb21pc2U8dm9pZD47XHJcbiAgcHVibGljIFBhbGV0dGVMaXN0OiBBcnJheTxQYWxldHRlTGlzdE1vZGVsPjtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFsZXR0ZSBjb2xvcnMsIGZyb20gNTAgLSBBNzAwXHJcbiAgICovXHJcbiAgcHVibGljIE1hdGVyaWFsUGFsZXR0ZUNvbG9yczogTWF0ZXJpYWxQYWxldHRlTW9kZWw7XHJcblxyXG4gIC8qKlxyXG4gICAqIF90aGVtaW5nLnNjc3MgZnJvbSBBbmd1bGFyIE1hdGVyaWFsXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxUaGVtZTogc3RyaW5nO1xyXG4gIHB1YmxpYyBzZXQgTWF0ZXJpYWxUaGVtZSh2YWw6IHN0cmluZykge1xyXG5cclxuICAgICB0aGlzLl9tYXRlcmlhbFRoZW1lID0gdmFsO1xyXG4gICAgICB0aGlzLlRoZW1lU2NzcyA9IHRoaXMubG9hZFRoZW1pbmdTY3NzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IE1hdGVyaWFsVGhlbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbFRoZW1lO1xyXG4gIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBTZXQgUGFsZXR0ZSBjb2xvcnNcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2V0IFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSB7XHJcblxyXG4gICAgICB0aGlzLnBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgICB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLlBhbGV0dGVQaWNrZXJDaGFuZ2UocGFsZXR0ZSk7XHJcbiAgICAgIHRoaXMuVGhlbWVNb2RlID0gIXBhbGV0dGUuRGFya01vZGU7XHJcbiAgICAgIHRoaXMuVXBkYXRlVGhlbWUodGhpcy5nZXRUaGVtZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFBhbGV0dGUoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhbGV0dGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBUaGVtZU1vZGUobGlnaHQ6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgIHRoaXMudGhlbWVNb2RlID0gIWxpZ2h0O1xyXG4gICAgICB0aGlzLlVwZGF0ZVRoZW1lKHRoaXMuZ2V0VGhlbWUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBUaGVtZU1vZGUoKSB7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy50aGVtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD47XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBcclxuICAgICAgcHJvdGVjdGVkIHBhbGV0dGVUZW1wbGF0ZVNlcnZpY2U6IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxyXG4gICAgICBwcm90ZWN0ZWQgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcbiAgICAgIHByb3RlY3RlZCB2YXJpYW50Q29sb3JTZXJ2aWNlOiBWYXJpYW50Q29sb3JTZXJ2aWNlKSB7XHJcblxyXG4gICAgICB0aGlzLk1hdGVyaWFsVGhlbWUgPSAnaHR0cHM6Ly93d3cuaW90LWVuc2VtYmxlLmNvbS9hc3NldHMvdGhlbWluZy90aGVtaW5nLnNjc3MnO1xyXG4gICAgICB0aGlzLnRoZW1lTW9kZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuVGhlbWUgPSBuZXcgU3ViamVjdDxUaGVtZU1vZGVsPigpO1xyXG4gICAgICB0aGlzLlBhbGV0dGVDb2xvcnMgPSBuZXcgU3ViamVjdDxQYXJ0aWFsPFBhbGV0dGVNb2RlbD4+KCk7XHJcblxyXG4gICAgICAvLyB0aGlzLlRoZW1lU2NzcyA9IHRoaXMubG9hZFRoZW1pbmdTY3NzKCk7XHJcblxyXG4gICAgICB0aGlzLlBhbGV0dGVMaXN0ID0gW107XHJcbiAgICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIGxvYWQgaW50aWFsIHRoZW1lXHJcbiAgICAqIFxyXG4gICAgKiBQdWxscyBfdGhlbWluZy5zY3NzIGZyb20gQW5ndWxhciBNYXRlcmlhbCBhbmQgdGhlbiBvdmVyd3JpdGVzIGl0IHdpdGggXHJcbiAgICAqIG91ciB0aGVtZSBjb2xvciBjaGFuZ2VzXHJcbiAgICAqL1xyXG4gICBwcm90ZWN0ZWQgbG9hZFRoZW1pbmdTY3NzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLy8gcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHBzOi8vd3d3LmlvdC1lbnNlbWJsZS5jb20vYXNzZXRzL3RoZW1pbmcvdGhlbWluZy5zY3NzJywgeyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5NYXRlcmlhbFRoZW1lLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoeDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4geFxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2dtLCAnPz8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwkbWF0LShbXjo/XSspXFxzKjpcXHMqXFwoWz8gXSo1MDpbXigpXSpjb250cmFzdFxccyo6XFxzKlxcKFteKV0rXFwpWyA/XSpcXCk7XFxzKj8vZyxcclxuICAgICAgICAgICAgICAoYWxsOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4gbmFtZSA9PT0gJ2dyZXknID8gYWxsIDogJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCouKj9cXCpcXC8vZywgJycpXHJcbiAgICAgICAgICAgIC5zcGxpdCgvWz9dWz9dL2cpXHJcbiAgICAgICAgICAgIC5tYXAoKGw6IHN0cmluZykgPT4gbFxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKihcXC9cXC8uKik/JC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcJG1hdC1ibHVlLWdyYXlcXHMqOlxccypcXCRtYXQtYmx1ZS1ncmV5XFxzKjtcXHMqL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvOlxcc1xccysvZywgJzogJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChsOiBzdHJpbmcpID0+ICEhbClcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG1hcChcclxuICAgICAgICAgICh0eHQ6IHN0cmluZykgPT5cclxuICAgICAgICAgIC8vIHdyaXRlRmlsZSBhbGxvd3MgdGhpcyBmaWxlIHRvIGJlIGFjY2Vzc2VkIGZyb20gc3R5bGVzLnNjc3NcclxuICAgICAgICAgIFNhc3Mud3JpdGVGaWxlKCd+QGFuZ3VsYXIvbWF0ZXJpYWwvdGhlbWluZycsIHR4dCwgKHJlc3VsdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTYXNzLndyaXRlRmlsZScsIHJlc3VsdCk7XHJcbiAgICAgICAgICB9KSlcclxuICAgICAgKS50b1Byb21pc2UoKTtcclxuICAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlbWUgdGVtcGxhdGUgYW5kIHVwZGF0ZSBpdFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB0aGVtZSBjdXJyZW50IHRoZW1lXHJcbiAgICovXHJcbiAgcHVibGljIEdldFRlbXBsYXRlKHRoZW1lOiBUaGVtZU1vZGVsKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGlsZSBTQVNTIHRvIENTU1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAqIEByZXR1cm5zIGNvbXBpbGVkIENTU1xyXG4gICAqL1xyXG4gICBwdWJsaWMgYXN5bmMgQ29tcGlsZVNjc3NUaGVtZSh0aGVtZTogc3RyaW5nKSB7XHJcbiAgICBhd2FpdCB0aGlzLlRoZW1lU2NzcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXMsIHJlaikgPT4ge1xyXG4gICAgICBTYXNzLmNvbXBpbGUodGhlbWUucmVwbGFjZSgnQGluY2x1ZGUgYW5ndWxhci1tYXRlcmlhbC10aGVtZSgkYWx0VGhlbWUpOycsICcnKSwgKHY6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICh2LnN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgcmVzKHYudGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlaih2KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgKTtcclxuICAgfVxyXG5cclxuICAgLyoqXHJcbiAgICAqIFJldHVybiBwcmltYXJ5IGFuZCBhY2NlbnQgY29sb3JzIGZvciBlYWNoIGNvbG9yIG1hcCwgZnJvbSBjb2xvcnMgNTAgLSBBNzAwXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSBjb2xvciBjb2xvclxyXG4gICAgKi9cclxuICAgcHVibGljIEdldFBhbGV0dGUoY29sb3I6IHN0cmluZyk6IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIHtcclxuICAgIGNvbnN0IGJhc2VMaWdodCA9IHRpbnlDb2xvcignI2ZmZmZmZicpO1xyXG4gICAgY29uc3QgYmFzZURhcmsgPSB0aGlzLnV0aWxzU2VydmljZS5NdWx0aXBseSh0aW55Q29sb3IoY29sb3IpLnRvUmdiKCksIHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSk7XHJcbiAgICBjb25zdCBbLCAsICwgYmFzZVRyaWFkXSA9IHRpbnlDb2xvcihjb2xvcikudGV0cmFkKCk7XHJcblxyXG4gICAgY29uc3QgcHJpbWFyeSA9IE9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtsaWdodCwgYW1vdW50XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZW2tdO1xyXG4gICAgICAgIHJldHVybiBbaywgdGlueUNvbG9yLm1peChsaWdodCA/IGJhc2VMaWdodCA6IGJhc2VEYXJrLFxyXG4gICAgICAgICAgdGlueUNvbG9yKGNvbG9yKSwgYW1vdW50KV0gYXMgW3N0cmluZywgdGlueWNvbG9yLkluc3RhbmNlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWNjZW50ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWSlcclxuICAgICAgLm1hcChrID0+IHtcclxuICAgICAgICBjb25zdCBbYW1vdW50LCBzYXQsIGxpZ2h0XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGJhc2VEYXJrLCBiYXNlVHJpYWQsIGFtb3VudClcclxuICAgICAgICAgIC5zYXR1cmF0ZShzYXQpLmxpZ2h0ZW4obGlnaHQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnByaW1hcnksIC4uLmFjY2VudF0ucmVkdWNlKChhY2MsIFtrLCBjXSkgPT4ge1xyXG4gICAgICBhY2Nba10gPSBjLnRvSGV4U3RyaW5nKCk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBlbWl0IGV2ZW50IHdpdGggdGhlbWVcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBlbWl0KCk6IHZvaWQge1xyXG4gICAgIHRoaXMuVGhlbWUubmV4dCh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIGEgbmV3IHRoZW1lIG1vZGVsXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgZ2V0VGhlbWUoKTogVGhlbWVNb2RlbCB7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhbGV0dGU6IHRoaXMuUGFsZXR0ZSxcclxuICAgICAgbGlnaHRuZXNzOiB0aGlzLlRoZW1lTW9kZSxcclxuICAgIH07XHJcbiAgIH1cclxuXHJcbiAgIHB1YmxpYyBVcGRhdGVUaGVtZSh0aGVtZTogVGhlbWVNb2RlbCk6IHZvaWQge1xyXG5cclxuICAgIC8vIFNBU1Mgc3R5bGVzaGVldFxyXG4gICAgY29uc3Qgc291cmNlOiBzdHJpbmcgPSB0aGlzLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuXHJcbiAgICAvLyBSdW5uaW5nIGZ1bmN0aW9ucyBvdXRzaWRlIG9mIEFuZ3VsYXIncyB6b25lIGFuZCBkbyB3b3JrIHRoYXRcclxuICAgIC8vIGRvZXNuJ3QgdHJpZ2dlciBBbmd1bGFyIGNoYW5nZS1kZXRlY3Rpb24uXHJcbiAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcblxyXG4gICAgIHRoaXMuQ29tcGlsZVNjc3NUaGVtZShzb3VyY2UpLnRoZW4oICh0ZXh0OiBzdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgLy8gU0FTUyBjb21waWxlZCB0byBDU1NcclxuICAgICAgICBjb25zdCBjb21waWxlZER5bmFtaWNDU1M6IHN0cmluZyA9IHRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGR5bmFtaWNTdHlsZVNoZWV0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZHluYW1pYyBzdHlsZXNoZWV0IGV4aXN0cywgdGhlbiByZW1vdmUgaXRcclxuICAgICAgICBpZiAoZHluYW1pY1N0eWxlU2hlZXQpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ucmVtb3ZlQ2hpbGQoZHluYW1pY1N0eWxlU2hlZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWRkIGR5bmFtaWMgc3R5bGVzaGVldFxyXG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICBzdHlsZS5pZCA9ICd0aGVtZS1idWlsZGVyLXN0eWxlc2hlZXQnO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNvbXBpbGVkRHluYW1pY0NTUykpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuXHJcbiAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICB9KTtcclxuICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgU2V0VGhlbWVzKHRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD4pOiB2b2lkIHtcclxuICAgIHRoaXMuVGhlbWVzID0gdGhlbWVzO1xyXG5cclxuICAgIGxldCBpbml0aWFsOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBpbml0aWFsID0geyAuLi5UaGVtZUJ1aWxkZXJDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgLi4uaW5pdGlhbCB9O1xyXG4gICAgaW5pdGlhbC5wcmltYXJ5Lm1haW4gPSB0aGlzLlRoZW1lc1swXS5QcmltYXJ5O1xyXG4gICAgaW5pdGlhbC5hY2NlbnQubWFpbiA9IHRoaXMuVGhlbWVzWzBdLkFjY2VudDtcclxuICAgIGluaXRpYWwud2Fybi5tYWluID0gdGhpcy5UaGVtZXNbMF0uV2FybjtcclxuICAgIGluaXRpYWwuRGFya01vZGUgPSB0aGlzLlRoZW1lc1swXS5EYXJrTW9kZTtcclxuXHJcbiAgICB0aGlzLlBhbGV0dGUgPSBpbml0aWFsO1xyXG5cclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhpcy5UaGVtZXNbMF0uUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhpcy5UaGVtZXNbMF0uQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhpcy5UaGVtZXNbMF0uV2Fybik7XHJcblxyXG4gIH1cclxufVxyXG4iXX0=