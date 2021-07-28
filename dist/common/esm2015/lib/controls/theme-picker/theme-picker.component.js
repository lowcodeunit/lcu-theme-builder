import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component, Input } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "./../../services/palette-picker.service";
import * as i2 from "../../services/theme-builder.service";
import * as i3 from "./../../services/variant-color.service";
import * as i4 from "@angular/material/button";
import * as i5 from "@angular/material/menu";
import * as i6 from "@angular/material/icon";
import * as i7 from "../mode-toggle/mode-toggle.component";
import * as i8 from "@angular/common";
import * as i9 from "@angular/flex-layout/flex";
import * as i10 from "@angular/flex-layout/extended";
import * as i11 from "@angular/material/card";
import * as i12 from "@angular/forms";
import * as i13 from "@angular/material/form-field";
import * as i14 from "@angular/material/input";
const _c0 = function (a0) { return { "background-color": a0 }; };
function ThemePickerComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelementStart(1, "button", 8);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_7_Template_button_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r5); const theme_r3 = restoredCtx.$implicit; const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.SetActiveTheme(theme_r3); });
    i0.ɵɵelementStart(2, "div", 9);
    i0.ɵɵelementStart(3, "div", 10);
    i0.ɵɵelement(4, "div", 11);
    i0.ɵɵelement(5, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 13);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const theme_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(4, _c0, theme_r3.Primary));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(6, _c0, theme_r3.Accent));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(8, _c0, theme_r3.Warn));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", theme_r3.ID, " ");
} }
function ThemePickerComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelementStart(1, "mat-card");
    i0.ɵɵelementStart(2, "mat-card-header");
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵelementStart(4, "mat-icon", 16);
    i0.ɵɵtext(5, "palette");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "mat-card-title");
    i0.ɵɵtext(7, " Manual Theme ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "mat-card-content");
    i0.ɵɵelementStart(9, "form", 17);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_form_click_9_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(10, "mat-form-field");
    i0.ɵɵelement(11, "input", 18);
    i0.ɵɵelementStart(12, "mat-hint");
    i0.ɵɵtext(13, "Theme Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "mat-form-field");
    i0.ɵɵelement(15, "input", 19);
    i0.ɵɵelementStart(16, "mat-hint");
    i0.ɵɵtext(17, "Primary Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "mat-form-field");
    i0.ɵɵelement(19, "input", 20);
    i0.ɵɵelementStart(20, "mat-hint");
    i0.ɵɵtext(21, "Accent Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "mat-form-field");
    i0.ɵɵelement(23, "input", 21);
    i0.ɵɵelementStart(24, "mat-hint");
    i0.ɵɵtext(25, "Warn Color");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "mat-card-actions");
    i0.ɵɵelementStart(27, "button", 22);
    i0.ɵɵlistener("click", function ThemePickerComponent_div_8_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.SetManualTheme(); });
    i0.ɵɵtext(28, " Set Theme ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("formGroup", ctx_r2.ManualForm);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("disabled", !ctx_r2.ManualForm.valid);
} }
export class ThemePickerComponent {
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
    SetActiveTheme(theme) {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        const colors = [theme.Primary, theme.Accent, theme.Warn];
        palette.primary.main = theme.Primary;
        palette.accent.main = theme.Accent;
        palette.warn.main = theme.Warn;
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
            Warn: this.ManualWarn.value
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
ThemePickerComponent.ɵfac = function ThemePickerComponent_Factory(t) { return new (t || ThemePickerComponent)(i0.ɵɵdirectiveInject(i1.PalettePickerService), i0.ɵɵdirectiveInject(i2.ThemeBuilderService), i0.ɵɵdirectiveInject(i3.VariantColorService)); };
ThemePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ThemePickerComponent, selectors: [["lcu-theme-picker"]], inputs: { DarkMode: ["dark-mode", "DarkMode"], ToggleManualControls: ["toggle-manual-controls", "ToggleManualControls"], MaterialTheming: ["material-theming", "MaterialTheming"] }, decls: 9, vars: 4, consts: [["mat-icon-button", "", "id", "theme-selector", "tabindex", "-1", 3, "mat-menu-trigger-for"], [1, "auto-flip"], ["themeMenu", "matMenu"], [1, "margin-2", 3, "dark-mode"], ["tabindex", "-1", 1, "theme-selector-container", 3, "click", "keydown.tab", "keydown.shift.tab"], ["fxLayout", "column", 4, "ngFor", "ngForOf"], ["class", "margin-2 \n            margin-top-5", 4, "ngIf"], ["fxLayout", "column"], ["mat-button", "", 1, "theme-selector", 3, "click"], ["fxLayout", "row", "fxLayout", "start center", 1, "margin-1"], [1, "theme-primary", 3, "ngStyle"], [1, "theme-accent", 3, "ngStyle"], [1, "theme-warn", 3, "ngStyle"], [1, "margin-left-2", "mat-card-subtitle"], [1, "margin-2", "margin-top-5"], ["mat-card-avatar", "", 1, "lcu-card-avatar"], ["color", "accent"], ["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup", "click"], ["type", "text", "matInput", "", "formControlName", "manualThemeName"], ["type", "text", "matInput", "", "formControlName", "manualPrimary"], ["type", "text", "matInput", "", "formControlName", "manualAccent"], ["type", "text", "matInput", "", "formControlName", "manualWarn"], ["mat-raised-button", "", "color", "primary", 1, "margin-top-3", 3, "disabled", "click"]], template: function ThemePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "button", 0);
        i0.ɵɵelementStart(1, "mat-icon", 1);
        i0.ɵɵtext(2, "format_color_fill");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "mat-menu", null, 2);
        i0.ɵɵelement(5, "lcu-mode-toggle", 3);
        i0.ɵɵelementStart(6, "div", 4);
        i0.ɵɵlistener("click", function ThemePickerComponent_Template_div_click_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.tab", function ThemePickerComponent_Template_div_keydown_tab_6_listener($event) { return $event.stopPropagation(); })("keydown.shift.tab", function ThemePickerComponent_Template_div_keydown_shift_tab_6_listener($event) { return $event.stopPropagation(); });
        i0.ɵɵtemplate(7, ThemePickerComponent_div_7_Template, 8, 10, "div", 5);
        i0.ɵɵtemplate(8, ThemePickerComponent_div_8_Template, 29, 2, "div", 6);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(4);
        i0.ɵɵproperty("mat-menu-trigger-for", _r0);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("dark-mode", ctx.DarkMode);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.Themes);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.ToggleManualControls);
    } }, directives: [i4.MatButton, i5.MatMenuTrigger, i6.MatIcon, i5.MatMenu, i7.LightnessPickerComponent, i8.NgForOf, i8.NgIf, i9.DefaultLayoutDirective, i8.NgStyle, i10.DefaultStyleDirective, i11.MatCard, i11.MatCardHeader, i11.MatCardAvatar, i11.MatCardTitle, i11.MatCardContent, i12.ɵNgNoValidate, i12.NgControlStatusGroup, i9.DefaultLayoutGapDirective, i12.FormGroupDirective, i13.MatFormField, i14.MatInput, i12.DefaultValueAccessor, i12.NgControlStatus, i12.FormControlName, i13.MatHint, i11.MatCardActions], styles: [".toolbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-selectors-container[_ngcontent-%COMP%]{width:390px;margin:0 8px}div.theme-primary[_ngcontent-%COMP%]{width:50px;height:50px}div.theme-accent[_ngcontent-%COMP%]{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn[_ngcontent-%COMP%]{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-picker',
                templateUrl: './theme-picker.component.html',
                styleUrls: ['./theme-picker.component.scss']
            }]
    }], function () { return [{ type: i1.PalettePickerService }, { type: i2.ThemeBuilderService }, { type: i3.VariantColorService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
        }], ToggleManualControls: [{
            type: Input,
            args: ['toggle-manual-controls']
        }], MaterialTheming: [{
            type: Input,
            args: ['material-theming']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdGhlbWUtcGlja2VyL3RoZW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDTTdFLDhCQUFvRDtJQUNoRCxpQ0FBMEU7SUFBaEMsZ1FBQStCO0lBQ3JFLDhCQUdxQjtJQUNqQiwrQkFBMEU7SUFDdEUsMEJBQThFO0lBQzlFLDBCQUEwRTtJQUU5RSxpQkFBTTtJQUNOLGdDQUN3QztJQUNwQyxZQUNKO0lBQUEsaUJBQU87SUFDWCxpQkFBTTtJQUNWLGlCQUFTO0lBQ2IsaUJBQU07OztJQVhpQyxlQUE4QztJQUE5QyxzRUFBOEM7SUFDM0MsZUFBNkM7SUFBN0MscUVBQTZDO0lBQy9DLGVBQTJDO0lBQTNDLG1FQUEyQztJQUtuRSxlQUNKO0lBREksNENBQ0o7Ozs7SUFLWiwrQkFHa0I7SUFDZCxnQ0FBVTtJQUNOLHVDQUFpQjtJQUNiLCtCQUE2QztJQUN6QyxvQ0FBeUI7SUFBQSx1QkFBTztJQUFBLGlCQUFXO0lBQy9DLGlCQUFNO0lBQ04sc0NBQWdCO0lBQ1osOEJBQ0o7SUFBQSxp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ZW50IjpbImltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvdGhlbWUtYnVpbGRlci1jb25zdGFudHMudXRpbHMnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLy4uLy4uL21vZGVscy90aGVtZS1waWNrZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtdGhlbWUtcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGhlbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aGVtZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFRoZW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogcHJvcGVydHkgZm9yIHJlYWN0aXZlIGZvcm1cclxuICAgKi9cclxuIHB1YmxpYyBNYW51YWxGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG4gLyoqXHJcbiAgKiBMaXN0IG9mIHRoZW1lc1xyXG4gICovXHJcbiAgcHVibGljIFRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD47XHJcbnB1YmxpYyB0ZXN0OiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIF9kYXJrTW9kZTogYm9vbGVhbjtcclxuICBASW5wdXQoJ2RhcmstbW9kZScpXHJcbiAgcHVibGljIHNldCBEYXJrTW9kZSh2YWw6IGJvb2xlYW4pIHtcclxuXHJcbiAgICBpZiAoIXZhbCkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLl9kYXJrTW9kZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRGFya01vZGUoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2RhcmtNb2RlO1xyXG4gIH1cclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9nZ2xlLW1hbnVhbC1jb250cm9scycpXHJcbiAgcHVibGljIFRvZ2dsZU1hbnVhbENvbnRyb2xzOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0gdmFsIF90aGVtaW5nLnNjc3MgZnJvbSBleHRlcm5hbCBzb3VyY2VcclxuICAgKi9cclxuICAvLyBASW5wdXQoJ21hdGVyaWFsLXRoZW1lLXN0eWxlc2hlZXQnKVxyXG4gIC8vIHB1YmxpYyBzZXQgTWF0ZXJpYWxUaGVtZVN0eWxlc2hlZXQodmFsOiBhbnkpIHtcclxuICAvLyAgIGRlYnVnZ2VyO1xyXG4gIC8vICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgLy8gfVxyXG5cclxuICBwcml2YXRlIF9tYXRlcmlhbFRoZW1pbmc6IHN0cmluZztcclxuICBASW5wdXQoJ21hdGVyaWFsLXRoZW1pbmcnKVxyXG4gIGdldCBNYXRlcmlhbFRoZW1pbmcoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbFRoZW1pbmc7XHJcbiAgfVxyXG5cclxuICBzZXQgTWF0ZXJpYWxUaGVtaW5nKHZhbDogc3RyaW5nKSB7XHJcblxyXG4gICAgdGhpcy5fbWF0ZXJpYWxUaGVtaW5nID0gdmFsO1xyXG4gICAgLy8gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsVGhlbWUgPSB2YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgbWFudWFsIGFjY2VudCBjb2xvciBmaWVsZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgTWFudWFsQWNjZW50KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsQWNjZW50Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgbWFudWFsIHByaW1hcnkgY29sb3IgZmllbGRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IE1hbnVhbFByaW1hcnkoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxQcmltYXJ5Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgbWFudWFsIHRoZW1lIG5hbWUgZmllbGRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IE1hbnVhbFRoZW1lTmFtZSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFRoZW1lTmFtZScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIG1hbnVhbCB3YXJuIGNvbG9yIGZpZWxkXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBNYW51YWxXYXJuKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsV2FybicpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFyaWFudENvbG9yU2VydmljZTogVmFyaWFudENvbG9yU2VydmljZSkge1xyXG5cclxuICAgICAgdGhpcy5zZXR1cEZvcm0oKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy50aGVtZXMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTZXRBY3RpdmVUaGVtZSh0aGVtZTogVGhlbWVQaWNrZXJNb2RlbCk6IHZvaWQge1xyXG4gICAgbGV0IHBhbGV0dGU6IFBhbGV0dGVNb2RlbCA9IG5ldyBQYWxldHRlTW9kZWwoKTtcclxuICAgIHBhbGV0dGUgPSB7IC4uLnRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuQ3VycmVudFBhbGV0dGUsIC4uLnBhbGV0dGUgfTtcclxuXHJcbiAgICBjb25zdCBjb2xvcnM6IEFycmF5PHN0cmluZz4gPSBbdGhlbWUuUHJpbWFyeSwgdGhlbWUuQWNjZW50LCB0aGVtZS5XYXJuXTtcclxuXHJcbiAgICBwYWxldHRlLnByaW1hcnkubWFpbiA9IHRoZW1lLlByaW1hcnk7XHJcbiAgICBwYWxldHRlLmFjY2VudC5tYWluID0gdGhlbWUuQWNjZW50O1xyXG4gICAgcGFsZXR0ZS53YXJuLm1haW4gPSB0aGVtZS5XYXJuO1xyXG5cclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhlbWUuUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhlbWUuQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhlbWUuV2Fybik7XHJcblxyXG4gICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgdGhpcy50aGVtZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGNyZWF0ZSB0aGVtZSwgYnkgdXNpbmcgaW5wdXRzXHJcbiAgICovXHJcbiAgcHVibGljIFNldE1hbnVhbFRoZW1lKCk6IHZvaWQge1xyXG4gICAgbGV0IG1hbnVhbFBhbGV0dGU6IFRoZW1lUGlja2VyTW9kZWw7XHJcbiAgICBtYW51YWxQYWxldHRlID0gbmV3IFRoZW1lUGlja2VyTW9kZWwoXHJcbiAgICAgIHtcclxuICAgICAgICBJRDogdGhpcy5NYW51YWxUaGVtZU5hbWUudmFsdWUsXHJcbiAgICAgICAgUHJpbWFyeTogdGhpcy5NYW51YWxQcmltYXJ5LnZhbHVlLFxyXG4gICAgICAgIEFjY2VudDogdGhpcy5NYW51YWxBY2NlbnQudmFsdWUsXHJcbiAgICAgICAgV2FybjogdGhpcy5NYW51YWxXYXJuLnZhbHVlXHJcbiAgICAgIH1cclxuICAgIClcclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5UaGVtZXMudW5zaGlmdChtYW51YWxQYWxldHRlKTtcclxuICAgIHRoaXMuU2V0QWN0aXZlVGhlbWUobWFudWFsUGFsZXR0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCBmb3JtIGNvbnRyb2xzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLk1hbnVhbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgbWFudWFsVGhlbWVOYW1lOiBuZXcgRm9ybUNvbnRyb2woJycsIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFByaW1hcnk6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxBY2NlbnQ6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxXYXJuOiBuZXcgRm9ybUNvbnRyb2woXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlbWVzIGZvciB0aGVtZSBwaWNrZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdGhlbWVzKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuVGhlbWVzID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lcztcclxuICB9XHJcblxyXG59XHJcbi8vIGZ1bmN0aW9uIElucHV0KGFyZzA6IHN0cmluZykge1xyXG4vLyAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gbm90IGltcGxlbWVudGVkLicpO1xyXG4vLyB9XHJcblxyXG4iLCI8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBpZD1cInRoZW1lLXNlbGVjdG9yXCIgW21hdC1tZW51LXRyaWdnZXItZm9yXT1cInRoZW1lTWVudVwiIHRhYmluZGV4PVwiLTFcIj5cclxuICAgIDxtYXQtaWNvbiBjbGFzcz1cImF1dG8tZmxpcFwiPmZvcm1hdF9jb2xvcl9maWxsPC9tYXQtaWNvbj5cclxuPC9idXR0b24+XHJcblxyXG5cclxuPG1hdC1tZW51ICN0aGVtZU1lbnU9XCJtYXRNZW51XCI+XHJcbiAgICA8bGN1LW1vZGUtdG9nZ2xlIFtkYXJrLW1vZGVdPVwiRGFya01vZGVcIiBjbGFzcz1cIm1hcmdpbi0yXCI+PC9sY3UtbW9kZS10b2dnbGU+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGhlbWUtc2VsZWN0b3ItY29udGFpbmVyXCJcclxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcclxuICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1wiXHJcbiAgICAgICAgKGtleWRvd24udGFiKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXHJcbiAgICAgICAgKGtleWRvd24udGFiKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXHJcbiAgICAgICAgKGtleWRvd24uc2hpZnQudGFiKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHRoZW1lIG9mIFRoZW1lc1wiIGZ4TGF5b3V0PVwiY29sdW1uXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjbGFzcz1cInRoZW1lLXNlbGVjdG9yXCIgKGNsaWNrKT1cIlNldEFjdGl2ZVRoZW1lKHRoZW1lKVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBcclxuICAgICAgICAgICAgICAgICAgICBmeExheW91dD1cInJvd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJzdGFydCBjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWFyZ2luLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhlbWUtcHJpbWFyeVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6dGhlbWUuUHJpbWFyeX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRoZW1lLWFjY2VudFwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6dGhlbWUuQWNjZW50fVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGhlbWUtd2FyblwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6dGhlbWUuV2Fybn1cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSA8bWF0LWljb24gKm5nSWY9XCJhY3RpdmVUaGVtZT09PXRoZW1lXCIgY2xhc3M9XCJjZW50ZXIgdGhlbWUtY2hlY2tcIj5jaGVjazwvbWF0LWljb24+IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWFyZ2luLWxlZnQtMiBtYXQtY2FyZC1zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7eyB0aGVtZS5JRCB9fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8IS0tIE1hbnVhbCBGb3JtIENvbnRyb2xzIC0tPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICAgKm5nSWY9XCJUb2dnbGVNYW51YWxDb250cm9sc1wiIFxyXG4gICAgICAgICAgICBjbGFzcz1cIm1hcmdpbi0yIFxyXG4gICAgICAgICAgICBtYXJnaW4tdG9wLTVcIj5cclxuICAgICAgICAgICAgPG1hdC1jYXJkPlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG1hdC1jYXJkLWF2YXRhciBjbGFzcz1cImxjdS1jYXJkLWF2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWljb24gY29sb3I9XCJhY2NlbnRcIj5wYWxldHRlPC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8bWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hbnVhbCBUaGVtZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLWhlYWRlcj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgZnhMYXlvdXQ9XCJjb2x1bW5cIlxyXG4gICAgICAgICAgICAgICAgICAgIGZ4TGF5b3V0R2FwPVwiMTBweFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Hcm91cF09XCJNYW51YWxGb3JtXCJcclxuICAgICAgICAgICAgICAgICAgICBub3ZhbGlkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWFudWFsVGhlbWVOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1oaW50PlRoZW1lIE5hbWU8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJtYW51YWxQcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hdC1oaW50PlByaW1hcnkgQ29sb3I8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJtYW51YWxBY2NlbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWF0LWhpbnQ+QWNjZW50IENvbG9yPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwibWFudWFsV2FyblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXQtaGludD5XYXJuIENvbG9yPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPG1hdC1jYXJkLWFjdGlvbnM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1hcmdpbi10b3AtM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFNYW51YWxGb3JtLnZhbGlkXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiU2V0TWFudWFsVGhlbWUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgU2V0IFRoZW1lXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLWFjdGlvbnM+XHJcbiAgICAgICAgICAgIDwvbWF0LWNhcmQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9tYXQtbWVudT4iXX0=