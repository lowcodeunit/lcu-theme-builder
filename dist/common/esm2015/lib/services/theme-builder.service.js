import { __awaiter } from "tslib";
import { PalettePickerService } from './palette-picker.service';
import { LocalStorageService } from './local-storage.service';
import { ThemeBuilderConstants } from '../utils/theme-builder-constants.utils';
import { Injectable, NgZone } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PaletteTemplateService } from './palette-template.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./palette-template.service";
import * as i3 from "./local-storage.service";
import * as i4 from "./palette-picker.service";
const tinyColor = tinycolor;
export class ThemeBuilderService {
    constructor(http, paletteTemplateService, localStorageService, palettePickerService, zone) {
        this.http = http;
        this.paletteTemplateService = paletteTemplateService;
        this.localStorageService = localStorageService;
        this.palettePickerService = palettePickerService;
        this.zone = zone;
        this.themeMode = true;
        this.Theme = new Subject();
        this.PaletteColors = new Subject();
        this.ThemeScss = this.loadThemingScss();
        this.PaletteList = [];
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
     */
    loadThemingScss() {
        // this is generated in angular.json, pulls from node_modules/@angular/material
        return this.http.get('/assets/_theming.scss', { responseType: 'text' })
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
}
ThemeBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.PaletteTemplateService), i0.ɵɵinject(i3.LocalStorageService), i0.ɵɵinject(i4.PalettePickerService), i0.ɵɵinject(i0.NgZone)); }, token: ThemeBuilderService, providedIn: "root" });
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
    { type: NgZone }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUUvRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQztBQUV4QyxPQUFPLEVBQWlCLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7QUFFcEUsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBWTVCLE1BQU0sT0FBTyxtQkFBbUI7SUF1QjlCLFlBQ1ksSUFBZ0IsRUFDaEIsc0JBQThDLEVBQzlDLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsSUFBWTtRQUpaLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUM5Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUV0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxH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S0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztnQkFFckUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU5RCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFVLEVBQUUsRUFBRTtnQkFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQzs7OztZQXZORixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQWRRLFVBQVU7WUFFVixzQkFBc0I7WUFYdEIsbUJBQW1CO1lBRm5CLG9CQUFvQjtZQUtSLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IE1hdGVyaWFsUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBQYWxldHRlTGlzdE1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL3BhbGV0dGUtbGlzdC5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcblxyXG5jb25zdCB0aW55Q29sb3IgPSB0aW55Y29sb3I7XHJcblxyXG50eXBlIFJHQkEgPSB0aW55Y29sb3IuQ29sb3JGb3JtYXRzLlJHQkE7XHJcblxyXG4vLyB0ZWxsIHR5cGVzY3JpcHQgdGhhdCBTYXNzIGV4aXN0c1xyXG4vLyBsb2FkcyB0aGUgc3luY2hyb25vdXMgU2Fzcy5qc1xyXG5kZWNsYXJlIHZhciBTYXNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIElzIGl0IGxpZ2h0bmVzc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZU1vZGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZW1lIFBhbGV0dGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsO1xyXG5cclxuICAvLyBwdWJsaWMgJGZvbnRzID0gbmV3IFN1YmplY3Q8Rm9udFNlbGVjdGlvbk1vZGVsW10+KCk7XHJcbiAgcHVibGljIFRoZW1lOiBTdWJqZWN0PFRoZW1lTW9kZWw+O1xyXG4gIHB1YmxpYyBQYWxldHRlQ29sb3JzOiBTdWJqZWN0PFBhcnRpYWw8UGFsZXR0ZU1vZGVsPj47XHJcbiAgcHVibGljIFRoZW1lU2NzczogUHJvbWlzZTx2b2lkPjtcclxuICBwdWJsaWMgUGFsZXR0ZUxpc3Q6IEFycmF5PFBhbGV0dGVMaXN0TW9kZWw+O1xyXG5cclxuICAvKipcclxuICAgKiBQYWxldHRlIGNvbG9ycywgZnJvbSA1MCAtIEE3MDBcclxuICAgKi9cclxuICBwdWJsaWMgTWF0ZXJpYWxQYWxldHRlQ29sb3JzOiBNYXRlcmlhbFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICBwcm90ZWN0ZWQgcGFsZXR0ZVRlbXBsYXRlU2VydmljZTogUGFsZXR0ZVRlbXBsYXRlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCBsb2NhbFN0b3JhZ2VTZXJ2aWNlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsKSB7XHJcblxyXG4gICAgdGhpcy50aGVtZU1vZGUgPSB0cnVlO1xyXG4gICAgdGhpcy5UaGVtZSA9IG5ldyBTdWJqZWN0PFRoZW1lTW9kZWw+KCk7XHJcbiAgICB0aGlzLlBhbGV0dGVDb2xvcnMgPSBuZXcgU3ViamVjdDxQYXJ0aWFsPFBhbGV0dGVNb2RlbD4+KCk7XHJcbiAgICB0aGlzLlRoZW1lU2NzcyA9IHRoaXMubG9hZFRoZW1pbmdTY3NzKCk7XHJcblxyXG4gICAgdGhpcy5QYWxldHRlTGlzdCA9IFtdO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogU2V0IFBhbGV0dGUgY29sb3JzXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNldCBQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkge1xyXG5cclxuICAgICAgdGhpcy5wYWxldHRlID0gcGFsZXR0ZTtcclxuICAgICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5QYWxldHRlUGlja2VyQ2hhbmdlKHBhbGV0dGUpO1xyXG5cclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgUGFsZXR0ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFsZXR0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFRoZW1lTW9kZShsaWdodDogYm9vbGVhbikge1xyXG4gICAgICB0aGlzLnRoZW1lTW9kZSA9ICFsaWdodDtcclxuICAgICAgdGhpcy5VcGRhdGVUaGVtZSh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGhlbWVNb2RlKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50aGVtZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAvKipcclxuICAgICogbG9hZCBpbnRpYWwgdGhlbWVcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBsb2FkVGhlbWluZ1Njc3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgIC8vIHRoaXMgaXMgZ2VuZXJhdGVkIGluIGFuZ3VsYXIuanNvbiwgcHVsbHMgZnJvbSBub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWxcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCcvYXNzZXRzL190aGVtaW5nLnNjc3MnLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoeDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4geFxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFxuL2dtLCAnPz8nKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwkbWF0LShbXjo/XSspXFxzKjpcXHMqXFwoWz8gXSo1MDpbXigpXSpjb250cmFzdFxccyo6XFxzKlxcKFteKV0rXFwpWyA/XSpcXCk7XFxzKj8vZyxcclxuICAgICAgICAgICAgICAoYWxsOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4gbmFtZSA9PT0gJ2dyZXknID8gYWxsIDogJycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cXC9cXCouKj9cXCpcXC8vZywgJycpXHJcbiAgICAgICAgICAgIC5zcGxpdCgvWz9dWz9dL2cpXHJcbiAgICAgICAgICAgIC5tYXAoKGw6IHN0cmluZykgPT4gbFxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKihcXC9cXC8uKik/JC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvXlxcJG1hdC1ibHVlLWdyYXlcXHMqOlxccypcXCRtYXQtYmx1ZS1ncmV5XFxzKjtcXHMqL2csICcnKVxyXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJylcclxuICAgICAgICAgICAgICAucmVwbGFjZSgvOlxcc1xccysvZywgJzogJylcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuZmlsdGVyKChsOiBzdHJpbmcpID0+ICEhbClcclxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG1hcCgodHh0OiBzdHJpbmcpID0+XHJcbiAgICAgICAgICAvLyB3cml0ZUZpbGUgYWxsb3dzIHRoaXMgZmlsZSB0byBiZSBhY2Nlc3NlZCBmcm9tIHN0eWxlcy5zY3NzXHJcbiAgICAgICAgICBTYXNzLndyaXRlRmlsZSgnfkBhbmd1bGFyL21hdGVyaWFsL3RoZW1pbmcnLCB0eHQsIChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU2Fzcy53cml0ZUZpbGUnLCByZXN1bHQpO1xyXG4gICAgICAgICAgfSkpXHJcbiAgICAgICkudG9Qcm9taXNlKCk7XHJcbiAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZW1lIHRlbXBsYXRlIGFuZCB1cGRhdGUgaXRcclxuICAgKiBcclxuICAgKiBAcGFyYW0gdGhlbWUgY3VycmVudCB0aGVtZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBHZXRUZW1wbGF0ZSh0aGVtZTogVGhlbWVNb2RlbCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYWxldHRlVGVtcGxhdGVTZXJ2aWNlLkdldFRlbXBsYXRlKHRoZW1lKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBpbGUgU0FTUyB0byBDU1NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0aGVtZSBTQVNTIHN0eWxlc2hlZXRcclxuICAgKiBAcmV0dXJucyBjb21waWxlZCBDU1NcclxuICAgKi9cclxuICAgcHVibGljIGFzeW5jIENvbXBpbGVTY3NzVGhlbWUodGhlbWU6IHN0cmluZykge1xyXG4gICAgYXdhaXQgdGhpcy5UaGVtZVNjc3M7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzLCByZWopID0+IHtcclxuICAgICAgU2Fzcy5jb21waWxlKHRoZW1lLnJlcGxhY2UoJ0BpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJGFsdFRoZW1lKTsnLCAnJyksICh2OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAodi5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgIHJlcyh2LnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZWoodik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgICk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBSZXR1cm4gcHJpbWFyeSBhbmQgYWNjZW50IGNvbG9ycyBmb3IgZWFjaCBjb2xvciBtYXAsIGZyb20gY29sb3JzIDUwIC0gQTcwMFxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0gY29sb3IgY29sb3JcclxuICAgICovXHJcbiAgIHB1YmxpYyBHZXRQYWxldHRlKGNvbG9yOiBzdHJpbmcpOiBNYXRlcmlhbFBhbGV0dGVNb2RlbCB7XHJcbiAgICBjb25zdCBiYXNlTGlnaHQgPSB0aW55Q29sb3IoJyNmZmZmZmYnKTtcclxuICAgIGNvbnN0IGJhc2VEYXJrID0gdGhpcy5tdWx0aXBseSh0aW55Q29sb3IoY29sb3IpLnRvUmdiKCksIHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSk7XHJcbiAgICBjb25zdCBbLCAsICwgYmFzZVRyaWFkXSA9IHRpbnlDb2xvcihjb2xvcikudGV0cmFkKCk7XHJcblxyXG4gICAgY29uc3QgcHJpbWFyeSA9IE9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZKVxyXG4gICAgICAubWFwKGsgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtsaWdodCwgYW1vdW50XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZW2tdO1xyXG4gICAgICAgIHJldHVybiBbaywgdGlueUNvbG9yLm1peChsaWdodCA/IGJhc2VMaWdodCA6IGJhc2VEYXJrLFxyXG4gICAgICAgICAgdGlueUNvbG9yKGNvbG9yKSwgYW1vdW50KV0gYXMgW3N0cmluZywgdGlueWNvbG9yLkluc3RhbmNlXTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgY29uc3QgYWNjZW50ID0gT2JqZWN0LmtleXMoVGhlbWVCdWlsZGVyQ29uc3RhbnRzLk1JWF9BTU9VTlRTX1NFQ09OREFSWSlcclxuICAgICAgLm1hcChrID0+IHtcclxuICAgICAgICBjb25zdCBbYW1vdW50LCBzYXQsIGxpZ2h0XSA9IFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUllba107XHJcbiAgICAgICAgcmV0dXJuIFtrLCB0aW55Q29sb3IubWl4KGJhc2VEYXJrLCBiYXNlVHJpYWQsIGFtb3VudClcclxuICAgICAgICAgIC5zYXR1cmF0ZShzYXQpLmxpZ2h0ZW4obGlnaHQpXSBhcyBbc3RyaW5nLCB0aW55Y29sb3IuSW5zdGFuY2VdO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gWy4uLnByaW1hcnksIC4uLmFjY2VudF0ucmVkdWNlKChhY2MsIFtrLCBjXSkgPT4ge1xyXG4gICAgICBhY2Nba10gPSBjLnRvSGV4U3RyaW5nKCk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgIH1cclxuXHJcbiAgIC8qKlxyXG4gICAgKiBlbWl0IGV2ZW50IHdpdGggdGhlbWVcclxuICAgICovXHJcbiAgIHByb3RlY3RlZCBlbWl0KCk6IHZvaWQge1xyXG4gICAgIHRoaXMuVGhlbWUubmV4dCh0aGlzLmdldFRoZW1lKCkpO1xyXG4gICB9XHJcblxyXG4gICAvKipcclxuICAgICogUmV0dXJuIGEgbmV3IHRoZW1lIG1vZGVsXHJcbiAgICAqL1xyXG4gICBwdWJsaWMgZ2V0VGhlbWUoKTogVGhlbWVNb2RlbCB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGFsZXR0ZTogdGhpcy5QYWxldHRlLFxyXG4gICAgICBsaWdodG5lc3M6IHRoaXMuVGhlbWVNb2RlLFxyXG4gICAgfTtcclxuICAgfVxyXG5cclxuICAgcHVibGljIG11bHRpcGx5KHJnYjE6IFJHQkEsIHJnYjI6IFJHQkEpOiBhbnkge1xyXG4gICAgcmdiMS5iID0gTWF0aC5mbG9vcihyZ2IxLmIgKiByZ2IyLmIgLyAyNTUpO1xyXG4gICAgcmdiMS5nID0gTWF0aC5mbG9vcihyZ2IxLmcgKiByZ2IyLmcgLyAyNTUpO1xyXG4gICAgcmdiMS5yID0gTWF0aC5mbG9vcihyZ2IxLnIgKiByZ2IyLnIgLyAyNTUpO1xyXG5cclxuICAgIHJldHVybiB0aW55Q29sb3IoJ3JnYiAnICsgcmdiMS5yICsgJyAnICsgcmdiMS5nICsgJyAnICsgcmdiMS5iKTtcclxuICAgfVxyXG5cclxuICAgcHVibGljIFVwZGF0ZVRoZW1lKHRoZW1lOiBUaGVtZU1vZGVsKTogdm9pZCB7XHJcblxyXG4gICAgLy8gU0FTUyBzdHlsZXNoZWV0XHJcbiAgICBjb25zdCBzb3VyY2U6IHN0cmluZyA9IHRoaXMuR2V0VGVtcGxhdGUodGhlbWUpO1xyXG5cclxuICAgIC8vIFJ1bm5pbmcgZnVuY3Rpb25zIG91dHNpZGUgb2YgQW5ndWxhcidzIHpvbmUgYW5kIGRvIHdvcmsgdGhhdFxyXG4gICAgLy8gZG9lc24ndCB0cmlnZ2VyIEFuZ3VsYXIgY2hhbmdlLWRldGVjdGlvbi5cclxuICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuXHJcbiAgICAgdGhpcy5Db21waWxlU2Nzc1RoZW1lKHNvdXJjZSkudGhlbiggKHRleHQ6IHN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAvLyBTQVNTIGNvbXBpbGVkIHRvIENTU1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVkRHluYW1pY0NTUzogc3RyaW5nID0gdGV4dDtcclxuXHJcbiAgICAgICAgY29uc3QgZHluYW1pY1N0eWxlU2hlZXQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCcpO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiBkeW5hbWljIHN0eWxlc2hlZXQgZXhpc3RzLCB0aGVuIHJlbW92ZSBpdFxyXG4gICAgICAgIGlmIChkeW5hbWljU3R5bGVTaGVldCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5yZW1vdmVDaGlsZChkeW5hbWljU3R5bGVTaGVldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgZHluYW1pYyBzdHlsZXNoZWV0XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgIHN0eWxlLmlkID0gJ3RoZW1lLWJ1aWxkZXItc3R5bGVzaGVldCc7XHJcbiAgICAgICAgICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29tcGlsZWREeW5hbWljQ1NTKSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG5cclxuICAgICAgfSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICB9KTtcclxuICB9XHJcbn1cclxuIl19