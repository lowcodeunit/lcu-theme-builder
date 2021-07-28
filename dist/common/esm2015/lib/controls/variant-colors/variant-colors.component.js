import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import * as i0 from "@angular/core";
import * as i1 from "../../services/palette-picker.service";
import * as i2 from "../../services/theme-builder.service";
import * as i3 from "./../../services/variant-color.service";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/flex-layout/flex";
import * as i6 from "@angular/common";
function VariantColorsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r3 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r3.hex)("color", color_r3.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r3.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r3.hex, " ");
} }
function VariantColorsComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r4 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r4.hex)("color", color_r4.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r4.hex, " ");
} }
function VariantColorsComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    i0.ɵɵstyleProp("background-color", color_r5.hex)("color", color_r5.darkContrast ? "black" : "white");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r5.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", color_r5.hex, " ");
} }
const tinyColor = tinycolor;
export class VariantColorsComponent {
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
            this.variantColorService.UpdatePrimaryVariants(palette.primary.main);
            this.variantColorService.UpdateAccentVariants(palette.accent.main);
            this.variantColorService.UpdateWarnVariants(palette.warn.main);
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
VariantColorsComponent.ɵfac = function VariantColorsComponent_Factory(t) { return new (t || VariantColorsComponent)(i0.ɵɵdirectiveInject(i1.PalettePickerService), i0.ɵɵdirectiveInject(i2.ThemeBuilderService), i0.ɵɵdirectiveInject(i3.VariantColorService)); };
VariantColorsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: VariantColorsComponent, selectors: [["lcu-variant-colors"]], inputs: { AccentColor: ["accent-color", "AccentColor"], PrimaryColor: ["primary-color", "PrimaryColor"], WarnColor: ["warn-color", "WarnColor"] }, decls: 8, vars: 4, consts: [["fxLayout", "column", "fxLayoutGap", "10px", "novalidate", "", 3, "formGroup"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["fxFlex", "33", "fxLayout", "column"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", "class", "padding-left-2 padding-right-2", 3, "background-color", "color", 4, "ngFor", "ngForOf"], ["fxLayout", "row", "fxLayoutGap", "10px", "fxLayoutAlign", "space-between center", 1, "padding-left-2", "padding-right-2"]], template: function VariantColorsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵtemplate(3, VariantColorsComponent_div_3_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "div", 2);
        i0.ɵɵtemplate(5, VariantColorsComponent_div_5_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "div", 2);
        i0.ɵɵtemplate(7, VariantColorsComponent_div_7_Template, 5, 6, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.Form);
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.PrimaryColorPalette);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.AccentColorPalette);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.PalettePickerService.WarnColorPalette);
    } }, directives: [i4.ɵNgNoValidate, i4.NgControlStatusGroup, i5.DefaultLayoutDirective, i5.DefaultLayoutGapDirective, i4.FormGroupDirective, i5.DefaultFlexDirective, i6.NgForOf, i5.DefaultLayoutAlignDirective], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VariantColorsComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-variant-colors',
                templateUrl: './variant-colors.component.html',
                styleUrls: ['./variant-colors.component.scss']
            }]
    }], function () { return [{ type: i1.PalettePickerService }, { type: i2.ThemeBuilderService }, { type: i3.VariantColorService }]; }, { AccentColor: [{
            type: Input,
            args: ['accent-color']
        }], PrimaryColor: [{
            type: Input,
            args: ['primary-color']
        }], WarnColor: [{
            type: Input,
            args: ['warn-color']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb2xvcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdmFyaWFudC1jb2xvcnMvdmFyaWFudC1jb2xvcnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdmFyaWFudC1jb2xvcnMvdmFyaWFudC1jb2xvcnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLFNBQVMsRUFBbUIsV0FBVyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7Ozs7Ozs7OztJQ0U1Qiw4QkFLdUQ7SUFDdkQsMkJBQUs7SUFDRCxZQUNKO0lBQUEsaUJBQU07SUFDTiwyQkFBSztJQUNELFlBQ0o7SUFBQSxpQkFBTTtJQUNWLGlCQUFNOzs7SUFSRixnREFBb0Msb0RBQUE7SUFHaEMsZUFDSjtJQURJLDhDQUNKO0lBRUksZUFDSjtJQURJLDZDQUNKOzs7SUFJQSw4QkFLMkQ7SUFDdkQsMkJBQUs7SUFDRCxZQUNKO0lBQUEsaUJBQU07SUFDTiwyQkFBSztJQUNELFlBQ0o7SUFBQSxpQkFBTTtJQUNWLGlCQUFNOzs7SUFSRixnREFBb0Msb0RBQUE7SUFHaEMsZUFDSjtJQURJLDhDQUNKO0lBRUksZUFDSjtJQURJLDZDQUNKOzs7SUFJSiw4QkFLMkQ7SUFDdkQsMkJBQUs7SUFDRCxZQUNKO0lBQUEsaUJBQU07SUFDTiwyQkFBSztJQUNELFlBQ0o7SUFBQSxpQkFBTTtJQUNWLGlCQUFNOzs7SUFSRixnREFBb0Msb0RBQUE7SUFHaEMsZUFDSjtJQURJLDhDQUNKO0lBRUksZUFDSjtJQURJLDZDQUNK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Q0FBaUMsQ0FBQzthQUMvQzsySUFVRyxXQUFXO2tCQURkLEtBQUs7bUJBQUMsY0FBYztZQWFqQixZQUFZO2tCQURmLEtBQUs7bUJBQUMsZUFBZTtZQWFsQixTQUFTO2tCQURaLEtBQUs7bUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVDb2xvck1hcE1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUtY29sb3ItbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xvck1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbG9yLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuXHJcbi8vIGNvbnN0IHN0eWxlVmFyaWFibGVzID0gcmVxdWlyZSgnLi9hc3NldHMvc3R5bGVzL2R5bmFtaWMtdGhlbWUuc2NzcycpO1xyXG5cclxuLyoqXHJcbiAqIFN0cmluZyBsaXRlcmFsIGRhdGEgdHlwZVxyXG4gKi9cclxudHlwZSBNb2RlVHlwZSA9ICdkYXJrJyB8ICdsaWdodCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS12YXJpYW50LWNvbG9ycycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92YXJpYW50LWNvbG9ycy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbG9yc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBfYWNjZW50Q29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF9wcmltYXJ5Q29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF93YXJuQ29sb3I6IHN0cmluZztcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuQElucHV0KCdhY2NlbnQtY29sb3InKVxyXG5zZXQgQWNjZW50Q29sb3IodmFsOiBzdHJpbmcpIHtcclxuICB0aGlzLl9hY2NlbnRDb2xvciA9IHZhbDtcclxuICAvLyB0aGlzLnVwZGF0ZUFjY2VudENvbG9yKHZhbCk7XHJcbiAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZUFjY2VudFZhcmlhbnRzKHZhbCk7XHJcbn1cclxuXHJcbmdldCBBY2NlbnRDb2xvcigpOiBzdHJpbmcge1xyXG4gIHJldHVybiB0aGlzLl9hY2NlbnRDb2xvcjtcclxufVxyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG5ASW5wdXQoJ3ByaW1hcnktY29sb3InKVxyXG5zZXQgUHJpbWFyeUNvbG9yKHZhbDogc3RyaW5nKSB7XHJcbiAgdGhpcy5fcHJpbWFyeUNvbG9yID0gdmFsO1xyXG4gIC8vIHRoaXMudXBkYXRlUHJpbWFyeUNvbG9yKHZhbCk7XHJcbiAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVByaW1hcnlWYXJpYW50cyh2YWwpO1xyXG59XHJcblxyXG5nZXQgUHJpbWFyeUNvbG9yKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRoaXMuUHJpbWFyeUNvbG9yO1xyXG59XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbkBJbnB1dCgnd2Fybi1jb2xvcicpXHJcbnNldCBXYXJuQ29sb3IodmFsOiBzdHJpbmcpIHtcclxuICB0aGlzLl93YXJuQ29sb3IgPSB2YWw7XHJcbiAgLy8gdGhpcy51cGRhdGVXYXJuQ29sb3IodmFsKTtcclxuICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlV2FyblZhcmlhbnRzKHZhbCk7XHJcbn1cclxuXHJcbmdldCBXYXJuQ29sb3IoKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGhpcy5XYXJuQ29sb3I7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgcHJpbWFyeSBjb2xvciBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBQcmltYXJ5Q29sb3JDb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3ByaW1hcnlDb2xvckNvbnRyb2wnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBhY2NlbnQgY29sb3IgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgQWNjZW50Q29sb3JDb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ2FjY2VudENvbG9yQ29udHJvbCcpO1xyXG59XHJcblxyXG4vKipcclxuICogcHJvcGVydHkgZm9yIHJlYWN0aXZlIGZvcm1cclxuICovXHJcbnB1YmxpYyBGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG5wcm90ZWN0ZWQgcGFsZXR0ZUNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgUGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFyaWFudENvbG9yU2VydmljZTogVmFyaWFudENvbG9yU2VydmljZSkge1xyXG4gICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5QcmltYXJ5Q29sb3JQYWxldHRlID0gW107XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLkFjY2VudENvbG9yUGFsZXR0ZSA9IFtdO1xyXG4gICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5XYXJuQ29sb3JQYWxldHRlID0gW107XHJcbiAgfVxyXG5cclxuIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0dXBGb3JtKCk7XHJcblxyXG4gICAgdGhpcy5wYWxldHRlQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuQ29sb3JQaWNrZXJDaGFuZ2VkXHJcbiAgICAuc3Vic2NyaWJlKChwYWxldHRlOiBQYWxldHRlTW9kZWwpID0+IHtcclxuXHJcbiAgICAgIGlmICghcGFsZXR0ZSB8fCAhcGFsZXR0ZS5wcmltYXJ5KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlUHJpbWFyeVZhcmlhbnRzKHBhbGV0dGUucHJpbWFyeS5tYWluKTtcclxuICAgICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZUFjY2VudFZhcmlhbnRzKHBhbGV0dGUuYWNjZW50Lm1haW4pO1xyXG4gICAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlV2FyblZhcmlhbnRzKHBhbGV0dGUud2Fybi5tYWluKTtcclxuICAgICAgLy8gdGhpcy51cGRhdGVBY2NlbnRDb2xvcihwYWxldHRlLmFjY2VudC5tYWluKTtcclxuICAgICAgLy8gdGhpcy51cGRhdGVQcmltYXJ5Q29sb3IocGFsZXR0ZS5wcmltYXJ5Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLnVwZGF0ZVdhcm5Db2xvcihwYWxldHRlLndhcm4ubWFpbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucGFsZXR0ZUNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4vLyAgIHByb3RlY3RlZCB1cGRhdGVQcmltYXJ5Q29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4vLyAgICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5QcmltYXJ5Q29sb3JQYWxldHRlID0gdGhpcy5jb21wdXRlQ29sb3JzKGNvbG9yID8gY29sb3IgOiB0aGlzLlByaW1hcnlDb2xvckNvbnRyb2wudmFsdWUpO1xyXG5cclxuLy8gICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLlByaW1hcnlDb2xvclBhbGV0dGUpIHtcclxuLy8gICAgICAgY29uc3Qga2V5ID0gYC0tdGhlbWUtcHJpbWFyeS0ke2MubmFtZX1gO1xyXG4vLyAgICAgICBjb25zdCB2YWx1ZSA9IGMuaGV4O1xyXG4vLyAgICAgICBjb25zdCBrZXkyID0gYC0tdGhlbWUtcHJpbWFyeS1jb250cmFzdC0ke2MubmFtZX1gO1xyXG4vLyAgICAgICBjb25zdCB2YWx1ZTIgPSBjLmRhcmtDb250cmFzdCA/ICdyZ2JhKGJsYWNrLCAwLjg3KScgOiAnd2hpdGUnO1xyXG5cclxuLy8gICAgICAgLy8gc2V0IG9yIHVwZGF0ZSBDU1MgdmFyaWFibGUgdmFsdWVzXHJcbi8vICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5cclxuLy8gICBwcm90ZWN0ZWQgdXBkYXRlQWNjZW50Q29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4vLyAgICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGUgPSB0aGlzLmNvbXB1dGVDb2xvcnMoY29sb3IgPyBjb2xvciA6IHRoaXMuQWNjZW50Q29sb3JDb250cm9sLnZhbHVlKTtcclxuXHJcbi8vICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGUpIHtcclxuLy8gICAgICAgY29uc3Qga2V5ID0gYC0tdGhlbWUtYWNjZW50LSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlID0gYy5oZXg7XHJcbi8vICAgICAgIGNvbnN0IGtleTIgPSBgLS10aGVtZS1wcmltYXJ5LWNvbnRyYXN0LSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlMiA9IGMuZGFya0NvbnRyYXN0ID8gJ3JnYmEoYmxhY2ssIDAuODcpJyA6ICd3aGl0ZSc7XHJcbi8vICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5cclxuLy8gICBwcm90ZWN0ZWQgdXBkYXRlV2FybkNvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuLy8gICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuV2FybkNvbG9yUGFsZXR0ZSA9IHRoaXMuY29tcHV0ZUNvbG9ycyhjb2xvcik7XHJcblxyXG4vLyAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuV2FybkNvbG9yUGFsZXR0ZSkge1xyXG4vLyAgICAgICBjb25zdCBrZXkgPSBgLS10aGVtZS13YXJuLSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlID0gYy5oZXg7XHJcbi8vICAgICAgIGNvbnN0IGtleTIgPSBgLS10aGVtZS1wcmltYXJ5LWNvbnRyYXN0LSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlMiA9IGMuZGFya0NvbnRyYXN0ID8gJ3JnYmEoYmxhY2ssIDAuODcpJyA6ICd3aGl0ZSc7XHJcbi8vICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0dXBGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5Gb3JtID0gbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgIHByaW1hcnlDb2xvckNvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgnI2ZmY2MxMScpLFxyXG4gICAgICBhY2NlbnRDb2xvckNvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgnIzAwMDBhYScpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4vLyAgIHByb3RlY3RlZCBjb21wdXRlQ29sb3JzKGNvbG9yOiBzdHJpbmcpOiBBcnJheTxDb2xvck1vZGVsPiB7XHJcblxyXG4vLyAgICAgY29uc3QgYmFzZUxpZ2h0Q29sb3IgPSB0aW55Q29sb3IoJyNmZmZmZmYnKTtcclxuLy8gICAgIGNvbnN0IGJhc2VEYXJrQ29sb3IgPSB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UubXVsdGlwbHkodGlueUNvbG9yKGNvbG9yKS50b1JnYigpLCB0aW55Q29sb3IoY29sb3IpLnRvUmdiKCkpO1xyXG4vLyAgICAgY29uc3QgWywgLCAsIGJhc2VUZXRyYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbi8vICAgICByZXR1cm4gW1xyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDEyKSwgJzUwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgMzApLCAnMTAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNTApLCAnMjAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNzApLCAnMzAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgODUpLCAnNDAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yKGNvbG9yKSwgJzUwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgODcpLCAnNjAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA3MCksICc3MDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIHRpbnlDb2xvcihjb2xvciksIDU0KSwgJzgwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgMjUpLCAnOTAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCBiYXNlVGV0cmFkLCAxNSkuc2F0dXJhdGUoODApLmxpZ2h0ZW4oNjUpLCAnQTEwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDgwKS5saWdodGVuKDU1KSwgJ0EyMDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIGJhc2VUZXRyYWQsIDE1KS5zYXR1cmF0ZSgxMDApLmxpZ2h0ZW4oNDUpLCAnQTQwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDEwMCkubGlnaHRlbig0MCksICdBNzAwJylcclxuLy8gICAgIF07XHJcbi8vICAgfVxyXG4vLyAvLyBmb3JjZSBjaGFuZ2VcclxuLy8gICBwcm90ZWN0ZWQgZ2V0Q29sb3JPYmplY3QodmFsdWU6IHRpbnljb2xvci5JbnN0YW5jZSwgbmFtZTogc3RyaW5nKTogQ29sb3JNb2RlbCB7XHJcbi8vICAgICBjb25zdCBjID0gdGlueUNvbG9yKHZhbHVlKTtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIG5hbWUsXHJcbi8vICAgICAgIGhleDogYy50b0hleFN0cmluZygpLFxyXG4vLyAgICAgICBkYXJrQ29udHJhc3Q6IGMuaXNMaWdodCgpXHJcbi8vICAgICB9O1xyXG4vLyAgIH1cclxufVxyXG4iLCI8Zm9ybVxyXG4gICAgZnhMYXlvdXQ9XCJjb2x1bW5cIlxyXG4gICAgZnhMYXlvdXRHYXA9XCIxMHB4XCJcclxuICAgIFtmb3JtR3JvdXBdPVwiRm9ybVwiXHJcbiAgICBub3ZhbGlkYXRlPlxyXG4gICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxyXG4gICAgICAgIDxkaXYgZnhGbGV4PVwiMzNcIiBmeExheW91dD1cImNvbHVtblwiPlxyXG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxMHB4XCIgXHJcbiAgICAgICAgICAgIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwicGFkZGluZy1sZWZ0LTIgcGFkZGluZy1yaWdodC0yXCIgXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBQYWxldHRlUGlja2VyU2VydmljZS5QcmltYXJ5Q29sb3JQYWxldHRlXCIgXHJcbiAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yLmhleFwiIFxyXG4gICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiY29sb3IuZGFya0NvbnRyYXN0ID8gJ2JsYWNrJyA6ICd3aGl0ZSdcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHt7Y29sb3IubmFtZX19XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAge3tjb2xvci5oZXh9fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGZ4RmxleD1cIjMzXCIgZnhMYXlvdXQ9XCJjb2x1bW5cIj5cclxuICAgICAgICAgICAgPGRpdiBmeExheW91dD1cInJvd1wiIGZ4TGF5b3V0R2FwPVwiMTBweFwiIFxyXG4gICAgICAgICAgICAgICAgZnhMYXlvdXRBbGlnbj1cInNwYWNlLWJldHdlZW4gY2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwicGFkZGluZy1sZWZ0LTIgcGFkZGluZy1yaWdodC0yXCJcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBQYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGVcIiBcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yLmhleFwiIFxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImNvbG9yLmRhcmtDb250cmFzdCA/ICdibGFjaycgOiAnd2hpdGUnXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Y29sb3IubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3tjb2xvci5oZXh9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgZnhGbGV4PVwiMzNcIiBmeExheW91dD1cImNvbHVtblwiPlxyXG4gICAgICAgICAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxMHB4XCIgXHJcbiAgICAgICAgICAgIGZ4TGF5b3V0QWxpZ249XCJzcGFjZS1iZXR3ZWVuIGNlbnRlclwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwicGFkZGluZy1sZWZ0LTIgcGFkZGluZy1yaWdodC0yXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNvbG9yIG9mIFBhbGV0dGVQaWNrZXJTZXJ2aWNlLldhcm5Db2xvclBhbGV0dGVcIiBcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yLmhleFwiIFxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImNvbG9yLmRhcmtDb250cmFzdCA/ICdibGFjaycgOiAnd2hpdGUnXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Y29sb3IubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3tjb2xvci5oZXh9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZm9ybT5cclxuXHJcblxyXG4iXX0=