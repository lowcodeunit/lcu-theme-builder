import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgZone, Directive, ElementRef, Renderer2, HostListener, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeColorPickerService, FathymSharedModule, MaterialModule } from '@lcu/common';
import { ColorPickerModule } from 'ngx-color-picker';
import * as tinycolor from 'tinycolor2';
import { BehaviorSubject, Subject } from 'rxjs';
import { __awaiter } from 'tslib';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
import * as ɵngcc2 from 'ngx-color-picker';
import * as ɵngcc3 from '@angular/common/http';
import * as ɵngcc4 from '@angular/forms';
import * as ɵngcc5 from '@angular/flex-layout/flex';
import * as ɵngcc6 from '@angular/material/slide-toggle';
import * as ɵngcc7 from '@angular/material/toolbar';
import * as ɵngcc8 from '@angular/material/button';
import * as ɵngcc9 from '@angular/material/menu';
import * as ɵngcc10 from '@angular/material/icon';
import * as ɵngcc11 from '@angular/flex-layout/extended';
import * as ɵngcc12 from '@angular/material/card';
import * as ɵngcc13 from '@angular/material/form-field';
import * as ɵngcc14 from '@angular/material/input';
import * as ɵngcc15 from '@lcu/common';

function ColorPickerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "div", 2);
} }
const _c0 = function (a0) { return { "background-color": a0 }; };
const _c1 = function (a0, a1) { return { "dark-mode": a0, "light-mode": a1 }; };
function ThemePickerComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 7);
    ɵngcc0.ɵɵelementStart(1, "button", 8);
    ɵngcc0.ɵɵlistener("click", function ThemePickerComponent_div_7_Template_button_click_1_listener() { const restoredCtx = ɵngcc0.ɵɵrestoreView(_r5); const theme_r3 = restoredCtx.$implicit; const ctx_r4 = ɵngcc0.ɵɵnextContext(); return ctx_r4.SetActiveTheme(theme_r3); });
    ɵngcc0.ɵɵelementStart(2, "div", 9);
    ɵngcc0.ɵɵelementStart(3, "div", 10);
    ɵngcc0.ɵɵelement(4, "div", 11);
    ɵngcc0.ɵɵelement(5, "div", 12);
    ɵngcc0.ɵɵelement(6, "div", 13);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(7, "span", 14);
    ɵngcc0.ɵɵtext(8);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const theme_r3 = ctx.$implicit;
    ɵngcc0.ɵɵadvance(3);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(6, _c0, theme_r3.Primary));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(8, _c0, theme_r3.Accent));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngStyle", ɵngcc0.ɵɵpureFunction1(10, _c0, theme_r3.Warn));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ɵngcc0.ɵɵpureFunction2(12, _c1, theme_r3.DarkMode, !theme_r3.DarkMode));
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate2(" ", theme_r3.ID, " ", theme_r3.DarkMode, " ");
} }
function ThemePickerComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "div", 15);
    ɵngcc0.ɵɵelementStart(1, "mat-card");
    ɵngcc0.ɵɵelementStart(2, "mat-card-header");
    ɵngcc0.ɵɵelementStart(3, "div", 16);
    ɵngcc0.ɵɵelementStart(4, "mat-icon", 17);
    ɵngcc0.ɵɵtext(5, "palette");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "mat-card-title");
    ɵngcc0.ɵɵtext(7, " Manual Theme ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(8, "mat-card-content");
    ɵngcc0.ɵɵelementStart(9, "form", 18);
    ɵngcc0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_form_click_9_listener($event) { return $event.stopPropagation(); });
    ɵngcc0.ɵɵelementStart(10, "mat-form-field");
    ɵngcc0.ɵɵelement(11, "input", 19);
    ɵngcc0.ɵɵelementStart(12, "mat-hint");
    ɵngcc0.ɵɵtext(13, "Theme Name");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(14, "mat-form-field");
    ɵngcc0.ɵɵelement(15, "input", 20);
    ɵngcc0.ɵɵelementStart(16, "mat-hint");
    ɵngcc0.ɵɵtext(17, "Primary Color");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(18, "mat-form-field");
    ɵngcc0.ɵɵelement(19, "input", 21);
    ɵngcc0.ɵɵelementStart(20, "mat-hint");
    ɵngcc0.ɵɵtext(21, "Accent Color");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(22, "mat-form-field");
    ɵngcc0.ɵɵelement(23, "input", 22);
    ɵngcc0.ɵɵelementStart(24, "mat-hint");
    ɵngcc0.ɵɵtext(25, "Warn Color");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(26, "mat-card-actions");
    ɵngcc0.ɵɵelementStart(27, "button", 23);
    ɵngcc0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_button_click_27_listener() { ɵngcc0.ɵɵrestoreView(_r8); const ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.SetManualTheme(); });
    ɵngcc0.ɵɵtext(28, " Set Theme ");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵadvance(9);
    ɵngcc0.ɵɵproperty("formGroup", ctx_r2.ManualForm);
    ɵngcc0.ɵɵadvance(18);
    ɵngcc0.ɵɵproperty("disabled", !ctx_r2.ManualForm.valid);
} }
function VariantColorsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵelementStart(1, "div");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div");
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r3 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("background-color", color_r3.hex)("color", color_r3.darkContrast ? "black" : "white");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r3.name, " ");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r3.hex, " ");
} }
function VariantColorsComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵelementStart(1, "div");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div");
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("background-color", color_r4.hex)("color", color_r4.darkContrast ? "black" : "white");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r4.name, " ");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r4.hex, " ");
} }
function VariantColorsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 4);
    ɵngcc0.ɵɵelementStart(1, "div");
    ɵngcc0.ɵɵtext(2);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(3, "div");
    ɵngcc0.ɵɵtext(4);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    ɵngcc0.ɵɵstyleProp("background-color", color_r5.hex)("color", color_r5.darkContrast ? "black" : "white");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r5.name, " ");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate1(" ", color_r5.hex, " ");
} }
class PaletteModel {
}

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
PalettePickerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PalettePickerService_Factory() { return new PalettePickerService(); }, token: PalettePickerService, providedIn: "root" });
PalettePickerService.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PalettePickerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

// import * as EventEmitter from 'events';
const tinyColor$5 = tinycolor;
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
        return tinyColor$5(col).isLight() ? '#000' : '#fff';
    }
    ColorPickerClosed(evt) {
        this.palettePickerService.CloseColorPicker(evt);
    }
    ColorPickerChange(evt) {
        this.Color = evt;
    }
}
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(ɵngcc0.ɵɵdirectiveInject(PalettePickerService)); };
ColorPickerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["lcu-color-picker"]], inputs: { Color: ["color", "Color"], Control: ["control", "Control"], Disabled: ["disabled", "Disabled"], Variants: ["variants", "Variants"] }, decls: 2, vars: 12, consts: [["class", "backdrop", 4, "ngIf"], ["type", "text", 3, "disabled", "colorPicker", "cpPresetColors", "cpPosition", "cpOutputFormat", "cpAlphaChannel", "value", "colorPickerOpen", "colorPickerClose", "colorPickerChange"], [1, "backdrop"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, ColorPickerComponent_div_0_Template, 1, 0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "input", 1);
        ɵngcc0.ɵɵlistener("colorPickerOpen", function ColorPickerComponent_Template_input_colorPickerOpen_1_listener() { return ctx.SetBackdrop(true); })("colorPickerClose", function ColorPickerComponent_Template_input_colorPickerClose_1_listener($event) { ctx.SetBackdrop(false); return ctx.ColorPickerClosed($event); })("colorPickerChange", function ColorPickerComponent_Template_input_colorPickerChange_1_listener($event) { return ctx.ColorPickerChange($event); });
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.ShowBackdrop);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵstyleProp("background", ctx.Color)("color", ctx.GetTextColor(ctx.Color));
        ɵngcc0.ɵɵproperty("disabled", ctx.Disabled)("colorPicker", ctx.Color)("cpPresetColors", ctx.Variants)("cpPosition", "bottom-left")("cpOutputFormat", "hex")("cpAlphaChannel", "disabled")("value", ctx.Color);
    } }, directives: [ɵngcc1.NgIf, ɵngcc2.ColorPickerDirective], styles: [".backdrop[_ngcontent-%COMP%]{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}[_nghost-%COMP%], input[_ngcontent-%COMP%]{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input[_ngcontent-%COMP%]{text-align:center;cursor:pointer}[_nghost-%COMP%]{display:block}"] });
ColorPickerComponent.ctorParameters = () => [
    { type: PalettePickerService }
];
ColorPickerComponent.propDecorators = {
    Control: [{ type: Input, args: ['control',] }],
    Disabled: [{ type: Input, args: ['disabled',] }],
    Variants: [{ type: Input, args: ['variants',] }],
    Color: [{ type: Input, args: ['color',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-color-picker',
                template: "<div class=\"backdrop\" *ngIf=\"ShowBackdrop\"></div>\r\n\r\n<input \r\n  type=\"text\" \r\n  [disabled]=\"Disabled\" \r\n  [colorPicker]=\"Color\" \r\n  (colorPickerOpen)=\"SetBackdrop(true)\"\r\n  [cpPresetColors]=\"Variants\" \r\n  [cpPosition]=\"'bottom-left'\"\r\n  (colorPickerClose)=\"SetBackdrop(false); ColorPickerClosed($event)\" \r\n  [cpOutputFormat]=\"'hex'\"\r\n  [cpAlphaChannel]=\"'disabled'\" \r\n  (colorPickerChange)=\"ColorPickerChange($event)\" \r\n  [value]=\"Color\"\r\n  [style.background]=\"Color\" \r\n  [style.color]=\"GetTextColor(Color)\"\r\n>\r\n",
                styles: [".backdrop{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}:host,input{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input{text-align:center;cursor:pointer}:host{display:block}"]
            }]
    }], function () { return [{ type: PalettePickerService }]; }, { Color: [{
            type: Input,
            args: ['color']
        }], Control: [{
            type: Input,
            args: ['control']
        }], Disabled: [{
            type: Input,
            args: ['disabled']
        }], Variants: [{
            type: Input,
            args: ['variants']
        }] }); })();

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
UtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(); }, token: UtilsService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(UtilsService, [{
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
        const baseLightColor = tinyColor$3('#f9f9f9');
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
VariantColorService.ɵfac = function VariantColorService_Factory(t) { return new (t || VariantColorService)(ɵngcc0.ɵɵinject(PalettePickerService), ɵngcc0.ɵɵinject(UtilsService)); };
VariantColorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function VariantColorService_Factory() { return new VariantColorService(i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(UtilsService)); }, token: VariantColorService, providedIn: "root" });
VariantColorService.ctorParameters = () => [
    { type: PalettePickerService },
    { type: UtilsService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VariantColorService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: PalettePickerService }, { type: UtilsService }]; }, null); })();

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
LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LocalStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

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
    primary: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'), Lighter: null, Darker: null },
    accent: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'), Lighter: null, Darker: null },
    warn: { Main: ThemeBuilderConstants.document.getPropertyValue('--initial-warn'), Lighter: null, Darker: null },
    DarkMode: false,
    LightText: ThemeBuilderConstants.document.getPropertyValue('--initial-light-text'),
    LightBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-light-background'),
    DarkText: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-text'),
    DarkBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-background')
};

const tinyColor$2 = tinycolor;
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
      $dark-text: ${theme.Palette.LightText};
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
      $light-text: ${theme.Palette.DarkText};
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
      $light-background:    ${theme.Palette.LightBackground};
      $light-bg-darker-5:   darken($light-background, 5%);
      $light-bg-darker-10:  darken($light-background, 10%);
      $light-bg-darker-20:  darken($light-background, 20%);
      $light-bg-darker-30:  darken($light-background, 30%);
      $light-bg-lighter-5:  lighten($light-background, 5%);
      $dark-bg-alpha-4:     rgba(${theme.Palette.DarkBackground}, 0.04);
      $dark-bg-alpha-12:    rgba(${theme.Palette.DarkBackground}, 0.12);

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
      $dark-background:     ${theme.Palette.DarkBackground};
      $dark-bg-lighter-5:   lighten($dark-background, 5%);
      $dark-bg-lighter-10:  lighten($dark-background, 10%);
      $dark-bg-lighter-20:  lighten($dark-background, 20%);
      $dark-bg-lighter-30:  lighten($dark-background, 30%);
      $light-bg-alpha-4:    rgba(${theme.Palette.LightBackground}, 0.04);
      $light-bg-alpha-12:   rgba(${theme.Palette.LightBackground}, 0.12);

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
      ${['primary', 'accent', 'warn'].map(x => this.getScssPalette(x, theme.Palette[x])).join('\n')};

      $theme: ${!theme.ThemeDarkMode ? 'mat-dark-theme' : 'mat-light-theme'}($theme-primary, $theme-accent, $theme-warn);
      $altTheme: ${!theme.ThemeDarkMode ? 'mat-light-theme' : 'mat-dark-theme'}($theme-primary, $theme-accent, $theme-warn);

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
        --${name}-color: ${subPalette.Main};
        --${name}-lighter-color: ${subPalette.Lighter};
        --${name}-darker-color: ${subPalette.Darker};
        --text-${name}-color: #{${this.getTextColor(subPalette.Main)}};
        --text-${name}-lighter-color: #{${this.getTextColor(subPalette.Lighter)}};
        --text-${name}-darker-color: #{${this.getTextColor(subPalette.Darker)}};
      }

    $mat-${name}: (
      main: ${subPalette.Main},
      lighter: ${subPalette.Lighter},
      darker: ${subPalette.Darker},
      200: ${subPalette.Main}, // For slide toggle,
      contrast : (
        main: ${this.getTextColor(subPalette.Main)},
        lighter: ${this.getTextColor(subPalette.Lighter)},
        darker: ${this.getTextColor(subPalette.Darker)},
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
        return `$${tinyColor$2(col).isLight() ? 'dark' : 'light'}-primary-text`;
    }
}
PaletteTemplateService.ɵfac = function PaletteTemplateService_Factory(t) { return new (t || PaletteTemplateService)(); };
PaletteTemplateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaletteTemplateService_Factory() { return new PaletteTemplateService(); }, token: PaletteTemplateService, providedIn: "root" });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PaletteTemplateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

const tinyColor$1 = tinycolor;
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
        const baseLight = tinyColor$1('#ffffff');
        const baseDark = this.utilsService.Multiply(tinyColor$1(color).toRgb(), tinyColor$1(color).toRgb());
        const [, , , baseTriad] = tinyColor$1(color).tetrad();
        const primary = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY)
            .map(k => {
            const [light, amount] = ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY[k];
            return [k, tinyColor$1.mix(light ? baseLight : baseDark, tinyColor$1(color), amount)];
        });
        const accent = Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)
            .map(k => {
            const [amount, sat, light] = ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY[k];
            return [k, tinyColor$1.mix(baseDark, baseTriad, amount)
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
ThemeBuilderService.ɵfac = function ThemeBuilderService_Factory(t) { return new (t || ThemeBuilderService)(ɵngcc0.ɵɵinject(ɵngcc3.HttpClient), ɵngcc0.ɵɵinject(PaletteTemplateService), ɵngcc0.ɵɵinject(LocalStorageService), ɵngcc0.ɵɵinject(PalettePickerService), ɵngcc0.ɵɵinject(ɵngcc0.NgZone), ɵngcc0.ɵɵinject(UtilsService), ɵngcc0.ɵɵinject(VariantColorService)); };
ThemeBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ThemeBuilderService_Factory() { return new ThemeBuilderService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(PaletteTemplateService), i0.ɵɵinject(LocalStorageService), i0.ɵɵinject(PalettePickerService), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(UtilsService), i0.ɵɵinject(VariantColorService)); }, token: ThemeBuilderService, providedIn: "root" });
ThemeBuilderService.ctorParameters = () => [
    { type: HttpClient },
    { type: PaletteTemplateService },
    { type: LocalStorageService },
    { type: PalettePickerService },
    { type: NgZone },
    { type: UtilsService },
    { type: VariantColorService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ThemeBuilderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc3.HttpClient }, { type: PaletteTemplateService }, { type: LocalStorageService }, { type: PalettePickerService }, { type: ɵngcc0.NgZone }, { type: UtilsService }, { type: VariantColorService }]; }, null); })();

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
        this.Toggle.setValue(val);
        // this.setThemeMode(val);
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
        return val ? 'Dark Mode' : 'Light Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
LightnessPickerComponent.ɵfac = function LightnessPickerComponent_Factory(t) { return new (t || LightnessPickerComponent)(ɵngcc0.ɵɵdirectiveInject(ThemeBuilderService)); };
LightnessPickerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: LightnessPickerComponent, selectors: [["lcu-mode-toggle"]], inputs: { DarkMode: ["dark-mode", "DarkMode"] }, decls: 4, vars: 2, consts: [["fxLayout", "row", "fxLayoutAlign", "start center", 3, "formGroup"], ["formControlName", "toggle", "labelPosition", "before", "color", "primary", 3, "click"], [1, "margin-left-1", "mat-card-subtitle"]], template: function LightnessPickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "form", 0);
        ɵngcc0.ɵɵelementStart(1, "mat-slide-toggle", 1);
        ɵngcc0.ɵɵlistener("click", function LightnessPickerComponent_Template_mat_slide_toggle_click_1_listener($event) { return $event.stopPropagation(); });
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(2, "span", 2);
        ɵngcc0.ɵɵtext(3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("formGroup", ctx.ToggleForm);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵtextInterpolate1(" ", ctx.ToggleMode, " ");
    } }, directives: [ɵngcc4.ɵNgNoValidate, ɵngcc4.NgControlStatusGroup, ɵngcc5.DefaultLayoutDirective, ɵngcc5.DefaultLayoutAlignDirective, ɵngcc4.FormGroupDirective, ɵngcc6.MatSlideToggle, ɵngcc4.NgControlStatus, ɵngcc4.FormControlName], styles: [""] });
LightnessPickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService }
];
LightnessPickerComponent.propDecorators = {
    DarkMode: [{ type: Input, args: ['dark-mode',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(LightnessPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-mode-toggle',
                template: "<form \r\n    [formGroup]=\"ToggleForm\" \r\n    fxLayout=\"row\" \r\n    fxLayoutAlign=\"start center\">\r\n    <mat-slide-toggle\r\n        (click)=\"$event.stopPropagation()\" \r\n        formControlName=\"toggle\"\r\n        labelPosition=\"before\" \r\n        color=\"primary\">\r\n    </mat-slide-toggle>\r\n    <span \r\n        class=\"margin-left-1 mat-card-subtitle\">\r\n        {{ ToggleMode }}\r\n    </span>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            }]
    }], function () { return [{ type: ThemeBuilderService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
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
            this.PrimaryColor = val.primary.Main;
            this.AccentColor = val.accent.Main;
            this.WarnColor = val.warn.Main;
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
        palette.primary.Main = this.Primary.value.main;
        palette.accent.Main = this.Accent.value.main;
        palette.warn.Main = this.Warn.value.main;
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
PalettePickerComponent.ɵfac = function PalettePickerComponent_Factory(t) { return new (t || PalettePickerComponent)(ɵngcc0.ɵɵdirectiveInject(ThemeBuilderService), ɵngcc0.ɵɵdirectiveInject(PalettePickerService)); };
PalettePickerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: PalettePickerComponent, selectors: [["lcu-palette-picker"]], decls: 6, vars: 6, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout.lg", "row", "fxLayout.md", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", "fxLayoutGap", "10px"], [3, "color-picker-color", "form"]], template: function PalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelement(2, "lcu-sub-palette-picker", 2);
        ɵngcc0.ɵɵelement(3, "lcu-sub-palette-picker", 2);
        ɵngcc0.ɵɵelement(4, "lcu-sub-palette-picker", 2);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelement(5, "lcu-variant-colors");
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("color-picker-color", ctx.PrimaryColor)("form", ctx.Primary);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("color-picker-color", ctx.AccentColor)("form", ctx.Accent);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("color-picker-color", ctx.WarnColor)("form", ctx.Warn);
    } }, directives: function () { return [ɵngcc5.DefaultLayoutDirective, ɵngcc5.DefaultLayoutGapDirective, SubPalettePickerComponent, VariantColorsComponent]; }, styles: [""] });
PalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(PalettePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-palette-picker',
                template: "<div \r\n  fxLayout=\"column\" \r\n  fxLayoutGap=\"10px\">\r\n  <div \r\n    fxLayout.lg=\"row\" \r\n    fxLayout.md=\"row\" \r\n    fxLayout.sm=\"column\" \r\n    fxLayout.xs=\"column\"\r\n    fxLayoutGap=\"10px\">\r\n    <lcu-sub-palette-picker [color-picker-color]=\"PrimaryColor\" [form]=\"Primary\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"AccentColor\" [form]=\"Accent\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"WarnColor\" [form]=\"Warn\"></lcu-sub-palette-picker>\r\n  </div>\r\n  <lcu-variant-colors></lcu-variant-colors>\r\n</div>\r\n",
                styles: [""]
            }]
    }], function () { return [{ type: ThemeBuilderService }, { type: PalettePickerService }]; }, null); })();

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
SubPalettePickerComponent.ɵfac = function SubPalettePickerComponent_Factory(t) { return new (t || SubPalettePickerComponent)(ɵngcc0.ɵɵdirectiveInject(ThemeBuilderService), ɵngcc0.ɵɵdirectiveInject(PalettePickerService)); };
SubPalettePickerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: SubPalettePickerComponent, selectors: [["lcu-sub-palette-picker"]], inputs: { ColorPickerColor: ["color-picker-color", "ColorPickerColor"], Form: ["form", "Form"] }, decls: 5, vars: 7, consts: [["fxLayout", "column"], [1, "main", 3, "control"], ["fxLayout", "row"], [1, "lighter", 3, "disabled", "control", "variants"], [1, "darker", 3, "disabled", "control", "variants"]], template: function SubPalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelement(1, "lcu-color-picker", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵelement(3, "lcu-color-picker", 3);
        ɵngcc0.ɵɵelement(4, "lcu-color-picker", 4);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("control", ctx.Main);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Lighter)("variants", ctx.Variants);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Darker)("variants", ctx.Variants);
    } }, directives: [ɵngcc5.DefaultLayoutDirective, ColorPickerComponent], styles: [".darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%], .main[_ngcontent-%COMP%]{border:.5px solid #ddd}.darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%]{height:40px}.main[_ngcontent-%COMP%]{height:60px}"] });
SubPalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];
SubPalettePickerComponent.propDecorators = {
    Form: [{ type: Input, args: ['form',] }],
    ColorPickerColor: [{ type: Input, args: ['color-picker-color',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(SubPalettePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-sub-palette-picker',
                template: "\r\n<div fxLayout=\"column\">\r\n    <!--Main Color-->\r\n    <lcu-color-picker\r\n      class=\"main\" \r\n      [control]=\"Main\"></lcu-color-picker>\r\n  \r\n    <div fxLayout=\"row\">\r\n      <!--Light and dark colors for additional hues-->\r\n      <lcu-color-picker \r\n        class=\"lighter\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Lighter\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n  \r\n      <lcu-color-picker \r\n        class=\"darker\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Darker\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n    </div>\r\n  </div>\r\n  ",
                styles: [".darker,.lighter,.main{border:.5px solid #ddd}.darker,.lighter{height:40px}.main{height:60px}"]
            }]
    }], function () { return [{ type: ThemeBuilderService }, { type: PalettePickerService }]; }, { ColorPickerColor: [{
            type: Input,
            args: ['color-picker-color']
        }], Form: [{
            type: Input,
            args: ['form']
        }] }); })();

class ThemeBuilderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ThemeBuilderComponent.ɵfac = function ThemeBuilderComponent_Factory(t) { return new (t || ThemeBuilderComponent)(); };
ThemeBuilderComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: ThemeBuilderComponent, selectors: [["lcu-theme-builder"]], decls: 11, vars: 0, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["color", "primary"], [1, "primary-color"], ["color", "accent"], [1, "accent-color"], ["color", "warn"], [1, "warn-color"]], template: function ThemeBuilderComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "div", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "mat-toolbar", 2);
        ɵngcc0.ɵɵelementStart(3, "span", 3);
        ɵngcc0.ɵɵtext(4, "Primary Colors");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(5, "mat-toolbar", 4);
        ɵngcc0.ɵɵelementStart(6, "span", 5);
        ɵngcc0.ɵɵtext(7, "Accent Colors");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(8, "mat-toolbar", 6);
        ɵngcc0.ɵɵelementStart(9, "span", 7);
        ɵngcc0.ɵɵtext(10, "Warn Colors");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } }, directives: [ɵngcc5.DefaultLayoutDirective, ɵngcc5.DefaultLayoutGapDirective, ɵngcc7.MatToolbar], styles: [".primary-color[_ngcontent-%COMP%]{color:var(--theme-primary-A700)}.accent-color[_ngcontent-%COMP%]{color:var(--theme-accent-A700)}.warn-color[_ngcontent-%COMP%]{color:var(--theme-warn-A700)}"] });
ThemeBuilderComponent.ctorParameters = () => [];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ThemeBuilderComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-builder',
                template: "\r\n<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <!-- <lcu-mode-toggle></lcu-mode-toggle> -->\r\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-toolbar color=\"primary\">\r\n        <span class=\"primary-color\">Primary Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"accent\">\r\n        <span class=\"accent-color\">Accent Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"warn\">\r\n        <span class=\"warn-color\">Warn Colors</span>\r\n      </mat-toolbar>\r\n  </div>\r\n  <!-- <lcu-palette-picker></lcu-palette-picker> -->\r\n</div>\r\n",
                styles: [".primary-color{color:var(--theme-primary-A700)}.accent-color{color:var(--theme-accent-A700)}.warn-color{color:var(--theme-warn-A700)}"]
            }]
    }], function () { return []; }, null); })();

class ThemePickerModel {
    constructor(opts) {
        Object.assign(this, opts); // destructure values
    }
}

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
    /**
     * When selecting a theme from the list
     *
     * @param theme selected theme
     */
    SetActiveTheme(theme) {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        const colors = [theme.Primary, theme.Accent, theme.Warn];
        palette.primary.Main = theme.Primary;
        palette.accent.Main = theme.Accent;
        palette.warn.Main = theme.Warn;
        palette.DarkMode = theme.DarkMode;
        this.DarkMode = palette.DarkMode;
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
            Warn: this.ManualWarn.value,
            DarkMode: true
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
ThemePickerComponent.ɵfac = function ThemePickerComponent_Factory(t) { return new (t || ThemePickerComponent)(ɵngcc0.ɵɵdirectiveInject(PalettePickerService), ɵngcc0.ɵɵdirectiveInject(ThemeBuilderService), ɵngcc0.ɵɵdirectiveInject(VariantColorService)); };
ThemePickerComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: ThemePickerComponent, selectors: [["lcu-theme-picker"]], inputs: { DarkMode: ["dark-mode", "DarkMode"], MaterialTheming: ["material-theming", "MaterialTheming"], ToggleManualControls: ["toggle-manual-controls", "ToggleManualControls"] }, decls: 9, vars: 4, consts: [["mat-icon-button", "", "id", "theme-selector", "tabindex", "-1", 3, "mat-menu-trigger-for"], [1, "auto-flip"], ["themeMenu", "matMenu"], [1, "margin-2", 3, "dark-mode"], ["tabindex", "-1", 1, "theme-selector-container", 3, "click", "keydown.tab", "keydown.shift.tab"], ["fxLayout", "column", 4, "ngFor", "ngForOf"], ["class", "margin-2 \n            margin-top-5", 4, "ngIf"], ["fxLayout", "column"], ["mat-button", "", 1, "theme-selector", 3, "click"], ["fxLayout", "row", "fxLayout", "start center", 1, "margin-1"], [1, "theme-primary", 3, "ngStyle"], [1, "theme-accent", 3, "ngStyle"], [1, "theme-warn", 3, "ngStyle"], [1, "theme-dark-mode", 3, "ngClass"], [1, "margin-left-2", "mat-card-subtitle"], [1, "margin-2", "margin-top-5"], ["mat-card-avatar", "", 1, "lcu-card-avatar"], ["color", "accent"], ["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup", "click"], ["type", "text", "matInput", "", "formControlName", "manualThemeName"], ["type", "text", "matInput", "", "formControlName", "manualPrimary"], ["type", "text", "matInput", "", "formControlName", "manualAccent"], ["type", "text", "matInput", "", "formControlName", "manualWarn"], ["mat-raised-button", "", "color", "primary", 1, "margin-top-3", 3, "disabled", "click"]], template: function ThemePickerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "button", 0);
        ɵngcc0.ɵɵelementStart(1, "mat-icon", 1);
        ɵngcc0.ɵɵtext(2, "format_color_fill");
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(3, "mat-menu", null, 2);
        ɵngcc0.ɵɵelement(5, "lcu-mode-toggle", 3);
        ɵngcc0.ɵɵelementStart(6, "div", 4);
        ɵngcc0.ɵɵlistener("click", function ThemePickerComponent_Template_div_click_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.shift.tab", function ThemePickerComponent_Template_div_keydown_shift_tab_6_listener($event) { return $event.stopPropagation(); });
        ɵngcc0.ɵɵtemplate(7, ThemePickerComponent_div_7_Template, 9, 15, "div", 5);
        ɵngcc0.ɵɵtemplate(8, ThemePickerComponent_div_8_Template, 29, 2, "div", 6);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = ɵngcc0.ɵɵreference(4);
        ɵngcc0.ɵɵproperty("mat-menu-trigger-for", _r0);
        ɵngcc0.ɵɵadvance(5);
        ɵngcc0.ɵɵproperty("dark-mode", ctx.DarkMode);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.Themes);
        ɵngcc0.ɵɵadvance(1);
        ɵngcc0.ɵɵproperty("ngIf", ctx.ToggleManualControls);
    } }, directives: [ɵngcc8.MatButton, ɵngcc9.MatMenuTrigger, ɵngcc10.MatIcon, ɵngcc9.MatMenu, LightnessPickerComponent, ɵngcc1.NgForOf, ɵngcc1.NgIf, ɵngcc5.DefaultLayoutDirective, ɵngcc1.NgStyle, ɵngcc11.DefaultStyleDirective, ɵngcc1.NgClass, ɵngcc11.DefaultClassDirective, ɵngcc12.MatCard, ɵngcc12.MatCardHeader, ɵngcc12.MatCardAvatar, ɵngcc12.MatCardTitle, ɵngcc12.MatCardContent, ɵngcc4.ɵNgNoValidate, ɵngcc4.NgControlStatusGroup, ɵngcc5.DefaultLayoutGapDirective, ɵngcc4.FormGroupDirective, ɵngcc13.MatFormField, ɵngcc14.MatInput, ɵngcc4.DefaultValueAccessor, ɵngcc4.NgControlStatus, ɵngcc4.FormControlName, ɵngcc13.MatHint, ɵngcc12.MatCardActions], styles: [".toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-selectors-container[_ngcontent-%COMP%]{width:390px;margin:0 8px}div.theme-primary[_ngcontent-%COMP%]{width:50px;height:50px}div.theme-accent[_ngcontent-%COMP%]{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn[_ngcontent-%COMP%]{width:15px;height:15px;position:absolute;bottom:15px;left:30px}div.theme-dark-mode[_ngcontent-%COMP%]{width:10px;height:10px;position:absolute;bottom:10px;left:55px}.dark-mode[_ngcontent-%COMP%]{background-color:#222}.light-mode[_ngcontent-%COMP%]{background-color:#f9f9f9}"] });
ThemePickerComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
ThemePickerComponent.propDecorators = {
    DarkMode: [{ type: Input, args: ['dark-mode',] }],
    ToggleManualControls: [{ type: Input, args: ['toggle-manual-controls',] }],
    MaterialTheming: [{ type: Input, args: ['material-theming',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ThemePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle [dark-mode]=\"DarkMode\" class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button \r\n                mat-button class=\"theme-selector\" \r\n                (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <div class=\"theme-dark-mode\" \r\n                             [ngClass]=\"{'dark-mode' : theme.DarkMode, 'light-mode': !theme.DarkMode}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }} {{ theme.DarkMode }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <!-- Manual Form Controls -->\r\n        <div\r\n            *ngIf=\"ToggleManualControls\" \r\n            class=\"margin-2 \r\n            margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}div.theme-dark-mode{width:10px;height:10px;position:absolute;bottom:10px;left:55px}.dark-mode{background-color:#222}.light-mode{background-color:#f9f9f9}"]
            }]
    }], function () { return [{ type: PalettePickerService }, { type: ThemeBuilderService }, { type: VariantColorService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
        }], MaterialTheming: [{
            type: Input,
            args: ['material-theming']
        }], ToggleManualControls: [{
            type: Input,
            args: ['toggle-manual-controls']
        }] }); })();
// function Input(arg0: string) {
//   throw new Error('Function not implemented.');
// }

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
            this.variantColorService.UpdatePrimaryVariants(palette.primary.Main);
            this.variantColorService.UpdateAccentVariants(palette.accent.Main);
            this.variantColorService.UpdateWarnVariants(palette.warn.Main);
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
VariantColorsComponent.ɵfac = function VariantColorsComponent_Factory(t) { return new (t || VariantColorsComponent)(ɵngcc0.ɵɵdirectiveInject(PalettePickerService), ɵngcc0.ɵɵdirectiveInject(ThemeBuilderService), ɵngcc0.ɵɵdirectiveInject(VariantColorService)); };
VariantColorsComponent.ɵcmp = /*@__PURE__*/ ɵngcc0.ɵɵdefineComponent({ type: VariantColorsComponent, selectors: [["lcu-variant-colors"]], inputs: { AccentColor: ["accent-color", "AccentColor"], PrimaryColor: ["primary-color", "PrimaryColor"], WarnColor: ["warn-color", "WarnColor"] }, decls: 8, vars: 4, consts: [["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["fxFlex", "33", "fxLayout", "column"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", "class", "padding-left-2 padding-right-2", 3, "background-color", "color", 4, "ngFor", "ngForOf"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", 1, "padding-left-2", "padding-right-2"]], template: function VariantColorsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵelementStart(0, "form", 0);
        ɵngcc0.ɵɵelementStart(1, "div", 1);
        ɵngcc0.ɵɵelementStart(2, "div", 2);
        ɵngcc0.ɵɵtemplate(3, VariantColorsComponent_div_3_Template, 5, 6, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(4, "div", 2);
        ɵngcc0.ɵɵtemplate(5, VariantColorsComponent_div_5_Template, 5, 6, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementStart(6, "div", 2);
        ɵngcc0.ɵɵtemplate(7, VariantColorsComponent_div_7_Template, 5, 6, "div", 3);
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
        ɵngcc0.ɵɵelementEnd();
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("formGroup", ctx.Form);
        ɵngcc0.ɵɵadvance(3);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.PalettePickerService.PrimaryColorPalette);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.PalettePickerService.AccentColorPalette);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngForOf", ctx.PalettePickerService.WarnColorPalette);
    } }, directives: [ɵngcc4.ɵNgNoValidate, ɵngcc4.NgControlStatusGroup, ɵngcc5.DefaultLayoutDirective, ɵngcc5.DefaultLayoutGapDirective, ɵngcc4.FormGroupDirective, ɵngcc5.DefaultFlexDirective, ɵngcc1.NgForOf, ɵngcc5.DefaultLayoutAlignDirective], styles: [""] });
VariantColorsComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
VariantColorsComponent.propDecorators = {
    AccentColor: [{ type: Input, args: ['accent-color',] }],
    PrimaryColor: [{ type: Input, args: ['primary-color',] }],
    WarnColor: [{ type: Input, args: ['warn-color',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(VariantColorsComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-variant-colors',
                template: "<form\r\n    fxLayout=\"column\"\r\n    fxLayoutGap=\"10px\"\r\n    [formGroup]=\"Form\"\r\n    novalidate>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\" \r\n            *ngFor=\"let color of PalettePickerService.PrimaryColorPalette\" \r\n            [style.background-color]=\"color.hex\" \r\n            [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n            <div>\r\n                {{color.name}}\r\n            </div>\r\n            <div>\r\n                {{color.hex}}\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n                fxLayoutAlign=\"space-between center\"\r\n                class=\"padding-left-2 padding-right-2\"\r\n                *ngFor=\"let color of PalettePickerService.AccentColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\"\r\n            *ngFor=\"let color of PalettePickerService.WarnColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
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
ThemeBuilderDirective.ɵfac = function ThemeBuilderDirective_Factory(t) { return new (t || ThemeBuilderDirective)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc15.ThemeColorPickerService)); };
ThemeBuilderDirective.ɵdir = /*@__PURE__*/ ɵngcc0.ɵɵdefineDirective({ type: ThemeBuilderDirective, selectors: [["", "theme-builder", ""]], hostBindings: function ThemeBuilderDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("mouseenter", function ThemeBuilderDirective_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function ThemeBuilderDirective_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } } });
ThemeBuilderDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ThemeColorPickerService }
];
ThemeBuilderDirective.propDecorators = {
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ThemeBuilderDirective, [{
        type: Directive,
        args: [{
                selector: '[theme-builder]'
            }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc15.ThemeColorPickerService }]; }, { onMouseEnter: [{
            type: HostListener,
            args: ['mouseenter']
        }], onMouseLeave: [{
            type: HostListener,
            args: ['mouseleave']
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
ThemeBuilderModule.ɵmod = /*@__PURE__*/ ɵngcc0.ɵɵdefineNgModule({ type: ThemeBuilderModule });
ThemeBuilderModule.ɵinj = /*@__PURE__*/ ɵngcc0.ɵɵdefineInjector({ imports: [[
            FathymSharedModule,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            MaterialModule,
            ColorPickerModule
        ]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵngcc0.ɵsetClassMetadata(ThemeBuilderModule, [{
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
                    ThemePickerComponent,
                    ThemeBuilderComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(ThemeBuilderModule, { declarations: function () { return [ThemeBuilderComponent, ThemeBuilderDirective, ColorPickerComponent, PalettePickerComponent, SubPalettePickerComponent, LightnessPickerComponent, VariantColorsComponent, ThemePickerComponent]; }, imports: function () { return [FathymSharedModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        ColorPickerModule]; }, exports: function () { return [ThemeBuilderComponent, ThemeBuilderDirective, ThemePickerComponent]; } }); })();

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

export { ColorModel, ColorPickerComponent, LightnessPickerComponent, PaletteModel, PalettePickerService, SubPaletteModel, ThemeBuilderComponent, ThemeBuilderConstants, ThemeBuilderDirective, ThemeBuilderModel, ThemeBuilderModule, ThemeBuilderService, ThemeModel, ThemePickerComponent, ThemePickerModel, VariantColorService, PalettePickerComponent as ɵa, PaletteTemplateService as ɵb, LocalStorageService as ɵc, UtilsService as ɵd, SubPalettePickerComponent as ɵe, VariantColorsComponent as ɵf };

//# sourceMappingURL=lowcodeunit-lcu-theme-builder-common.js.map