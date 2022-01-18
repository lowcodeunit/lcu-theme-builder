import { ThemeBuilderConstants } from '../../utils/theme-builder-constants.utils';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PaletteModel } from '../../models/palette.model';
import { distinctUntilChanged } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../services/theme-builder.service";
import * as i2 from "../../services/palette-picker.service";
import * as i3 from "@angular/flex-layout/flex";
import * as i4 from "../sub-palette-picker/sub-palette-picker.component";
import * as i5 from "../variant-colors/variant-colors.component";
export class PalettePickerComponent {
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
            this.PrimaryColor = val.primary.main;
            this.AccentColor = val.accent.main;
            this.WarnColor = val.warn.main;
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
        palette = { ...this.palettePickerService.CurrentPalette, ...palette };
        palette.primary.main = this.Primary.value.main;
        palette.accent.main = this.Accent.value.main;
        palette.warn.main = this.Warn.value.main;
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
PalettePickerComponent.ɵfac = function PalettePickerComponent_Factory(t) { return new (t || PalettePickerComponent)(i0.ɵɵdirectiveInject(i1.ThemeBuilderService), i0.ɵɵdirectiveInject(i2.PalettePickerService)); };
PalettePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PalettePickerComponent, selectors: [["lcu-palette-picker"]], decls: 6, vars: 6, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout.lg", "row", "fxLayout.md", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", "fxLayoutGap", "10px"], [3, "color-picker-color", "form"]], template: function PalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "lcu-sub-palette-picker", 2);
        i0.ɵɵelement(3, "lcu-sub-palette-picker", 2);
        i0.ɵɵelement(4, "lcu-sub-palette-picker", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelement(5, "lcu-variant-colors");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("color-picker-color", ctx.PrimaryColor)("form", ctx.Primary);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("color-picker-color", ctx.AccentColor)("form", ctx.Accent);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("color-picker-color", ctx.WarnColor)("form", ctx.Warn);
    } }, directives: [i3.DefaultLayoutDirective, i3.DefaultLayoutGapDirective, i4.SubPalettePickerComponent, i5.VariantColorsComponent], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PalettePickerComponent, [{
        type: Component,
        args: [{ selector: 'lcu-palette-picker', template: "<div \r\n  fxLayout=\"column\" \r\n  fxLayoutGap=\"10px\">\r\n  <div \r\n    fxLayout.lg=\"row\" \r\n    fxLayout.md=\"row\" \r\n    fxLayout.sm=\"column\" \r\n    fxLayout.xs=\"column\"\r\n    fxLayoutGap=\"10px\">\r\n    <lcu-sub-palette-picker [color-picker-color]=\"PrimaryColor\" [form]=\"Primary\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"AccentColor\" [form]=\"Accent\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"WarnColor\" [form]=\"Warn\"></lcu-sub-palette-picker>\r\n  </div>\r\n  <lcu-variant-colors></lcu-variant-colors>\r\n</div>\r\n", styles: [""] }]
    }], function () { return [{ type: i1.ThemeBuilderService }, { type: i2.PalettePickerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFtQixTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT3RELE1BQU0sT0FBTyxzQkFBc0I7SUFtQ2pDLFlBQXNCLG1CQUF3QyxFQUN4QyxvQkFBMEM7UUFEMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRTlELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjthQUMvRSxTQUFTLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQsMENBQTBDO1FBQzFDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCO2FBQzNDLFNBQVMsQ0FBQyxDQUFDLEdBQWlCLEVBQUUsRUFBRTtZQUUvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMvQiwyQ0FBMkM7WUFDM0MseUNBQXlDO1lBQ3pDLHFDQUFxQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE5Q0Q7O09BRUc7SUFDSCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU07UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQTZCUyxhQUFhO1FBRXJCLElBQUksT0FBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLE9BQU8sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXpDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzdDLENBQUM7SUFFTSxRQUFRO1FBRWIsMEJBQTBCO1FBQzNCLG9FQUFvRTtRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7YUFDckIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBZSxFQUFFLENBQWUsRUFBRSxFQUFFO1lBQy9ELHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDdkIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7YUFDRCxTQUFTLENBQUMsQ0FBQyxPQUFxQixFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sV0FBVztRQUVoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFUyxVQUFVLENBQUMsR0FBdUIsRUFBRSxTQUFrQjtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDeEIsT0FBTyxFQUFFLElBQUksU0FBUyxDQUFDO2dCQUNyQixJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQzVCLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDeEIsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQzVCLENBQUM7WUFDRixJQUFJLEVBQUUsSUFBSSxTQUFTLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7YUFDNUIsRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQztZQUN4QixTQUFTLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNsQyxlQUFlLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUN4QyxRQUFRLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNqQyxjQUFjLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztTQUN4QyxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7NEZBM0hVLHNCQUFzQjt5RUFBdEIsc0JBQXNCO1FDZG5DLDhCQUVxQjtRQUNuQiw4QkFLcUI7UUFDbkIsNENBQXNHO1FBQ3RHLDRDQUFvRztRQUNwRyw0Q0FBZ0c7UUFDbEcsaUJBQU07UUFDTixxQ0FBeUM7UUFDM0MsaUJBQU07O1FBTHNCLGVBQW1DO1FBQW5DLHFEQUFtQyxxQkFBQTtRQUNuQyxlQUFrQztRQUFsQyxvREFBa0Msb0JBQUE7UUFDbEMsZUFBZ0M7UUFBaEMsa0RBQWdDLGtCQUFBOzt1RkRHL0Msc0JBQXNCO2NBTGxDLFNBQVM7MkJBQ0Usb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGhlbWUtYnVpbGRlci1jb25zdGFudHMudXRpbHMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtcGFsZXR0ZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWxldHRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFsZXR0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHVibGljIEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByb3RlY3RlZCBmb3JtU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBQcmltYXJ5Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgQWNjZW50Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgV2FybkNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBQcmltYXJ5IGZvcm0gZ3JvdXBcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IFByaW1hcnkoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdwcmltYXJ5Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgQWNjZW50IGZvcm0gZ3JvdXBcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IEFjY2VudCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ2FjY2VudCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIFdhcm4gZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgV2FybigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3dhcm4nKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYWxldHRlUGlja2VyQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgdGhpcy5zZXR1cEZvcm0oKTtcclxuXHJcbiAgICB0aGlzLmNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uID0gdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNsb3NlZFxyXG4gICAgLnN1YnNjcmliZSgodmFsOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYWxldHRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgYmFzZSBjb2xvcnMgb2YgdGhlIGNvbG9yIHBpY2tlciBvbiBjaGFuZ2VcclxuICAgIC8vIHdoZW4gbWFudWFsbHkgc2V0dGluZyBjb2xvcnMsIG5vdCB1c2luZ1xyXG4gICAgLy8gdGhlIGNvbG9yIHBpY2tlciBpdHNlbGZcclxuICAgIHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuQ29sb3JQaWNrZXJDaGFuZ2VkXHJcbiAgICAuc3Vic2NyaWJlKCh2YWw6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG5cclxuICAgICAgdGhpcy5QcmltYXJ5Q29sb3IgPSB2YWwucHJpbWFyeS5tYWluO1xyXG4gICAgICB0aGlzLkFjY2VudENvbG9yID0gdmFsLmFjY2VudC5tYWluO1xyXG4gICAgICB0aGlzLldhcm5Db2xvciA9IHZhbC53YXJuLm1haW47XHJcbiAgICAgIC8vIHRoaXMuUHJpbWFyeS5zZXRWYWx1ZSh2YWwucHJpbWFyeS5tYWluKTtcclxuICAgICAgLy8gdGhpcy5BY2NlbnQuc2V0VmFsdWUodmFsLmFjY2VudC5tYWluKTtcclxuICAgICAgLy8gdGhpcy5XYXJuLnNldFZhbHVlKHZhbC53YXJuLm1haW4pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlUGFsZXR0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICBsZXQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgcGFsZXR0ZSA9IHsgLi4udGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DdXJyZW50UGFsZXR0ZSwgLi4ucGFsZXR0ZSB9O1xyXG4gICAgcGFsZXR0ZS5wcmltYXJ5Lm1haW4gPSB0aGlzLlByaW1hcnkudmFsdWUubWFpbjtcclxuICAgIHBhbGV0dGUuYWNjZW50Lm1haW4gPSB0aGlzLkFjY2VudC52YWx1ZS5tYWluO1xyXG4gICAgcGFsZXR0ZS53YXJuLm1haW4gPSB0aGlzLldhcm4udmFsdWUubWFpbjtcclxuXHJcbiAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgLy8gc2V0dGluZyBpbml0aWFsIHZhbHVlcyxcclxuICAgLy8gdGhpcyBpc24ndCB0aGUgcmlnaHQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCAtIHNoYW5ub25cclxuICAgIHRoaXMucGF0Y2hWYWx1ZShUaGVtZUJ1aWxkZXJDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgdHJ1ZSk7XHJcblxyXG4gICB0aGlzLkZvcm0udmFsdWVDaGFuZ2VzXHJcbiAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhOiBQYWxldHRlTW9kZWwsIGI6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKCdBJywgYSk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coJ0InLCBiKTtcclxuICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgIT09IEpTT04uc3RyaW5naWZ5KGIpO1xyXG4gICB9KSlcclxuICAgIC5zdWJzY3JpYmUoKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG4gICAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXRjaFZhbHVlKHZhbDogUGFsZXR0ZU1vZGVsIHwgYW55LCBlbWl0VmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuRm9ybS5wYXRjaFZhbHVlKHZhbCwge2VtaXRFdmVudDogZW1pdFZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCB0aGUgZm9ybVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzZXR1cEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLkZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgcHJpbWFyeTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSksXHJcbiAgICAgIGFjY2VudDogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9KSxcclxuICAgICAgd2FybjogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSksXHJcbiAgICAgIGxpZ2h0VGV4dDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSksXHJcbiAgICAgIGxpZ2h0QmFja2dyb3VuZDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSksXHJcbiAgICAgIGRhcmtUZXh0OiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgZGFya0JhY2tncm91bmQ6IG5ldyBGb3JtQ29udHJvbCgnJywgW10pXHJcbiAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgXHJcbiAgZnhMYXlvdXQ9XCJjb2x1bW5cIiBcclxuICBmeExheW91dEdhcD1cIjEwcHhcIj5cclxuICA8ZGl2IFxyXG4gICAgZnhMYXlvdXQubGc9XCJyb3dcIiBcclxuICAgIGZ4TGF5b3V0Lm1kPVwicm93XCIgXHJcbiAgICBmeExheW91dC5zbT1cImNvbHVtblwiIFxyXG4gICAgZnhMYXlvdXQueHM9XCJjb2x1bW5cIlxyXG4gICAgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XHJcbiAgICA8bGN1LXN1Yi1wYWxldHRlLXBpY2tlciBbY29sb3ItcGlja2VyLWNvbG9yXT1cIlByaW1hcnlDb2xvclwiIFtmb3JtXT1cIlByaW1hcnlcIj48L2xjdS1zdWItcGFsZXR0ZS1waWNrZXI+XHJcbiAgICA8bGN1LXN1Yi1wYWxldHRlLXBpY2tlciBbY29sb3ItcGlja2VyLWNvbG9yXT1cIkFjY2VudENvbG9yXCIgW2Zvcm1dPVwiQWNjZW50XCI+PC9sY3Utc3ViLXBhbGV0dGUtcGlja2VyPlxyXG4gICAgPGxjdS1zdWItcGFsZXR0ZS1waWNrZXIgW2NvbG9yLXBpY2tlci1jb2xvcl09XCJXYXJuQ29sb3JcIiBbZm9ybV09XCJXYXJuXCI+PC9sY3Utc3ViLXBhbGV0dGUtcGlja2VyPlxyXG4gIDwvZGl2PlxyXG4gIDxsY3UtdmFyaWFudC1jb2xvcnM+PC9sY3UtdmFyaWFudC1jb2xvcnM+XHJcbjwvZGl2PlxyXG4iXX0=