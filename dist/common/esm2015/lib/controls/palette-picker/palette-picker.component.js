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
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
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
        args: [{
                selector: 'lcu-palette-picker',
                templateUrl: './palette-picker.component.html',
                styleUrls: ['./palette-picker.component.scss']
            }]
    }], function () { return [{ type: i1.ThemeBuilderService }, { type: i2.PalettePickerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFtQixTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBT3RELE1BQU0sT0FBTyxzQkFBc0I7SUFtQ2pDLFlBQXNCLG1CQUF3QyxFQUN4QyxvQkFBMEM7UUFEMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRTlELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQjthQUMvRSxTQUFTLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQsMENBQTBDO1FBQzFDLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCO2FB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LGVBQWdDO1FBQWhDLGtEQUFnQyxrQkFBQTs7dUZERy9DLHNCQUFzQjtjQUxsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsU0FBUyxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLi8uLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS1wYWxldHRlLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3BhbGV0dGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wYWxldHRlLXBpY2tlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYWxldHRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwdWJsaWMgRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBwcm90ZWN0ZWQgY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJvdGVjdGVkIGZvcm1TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHVibGljIFByaW1hcnlDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBBY2NlbnRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBXYXJuQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIFByaW1hcnkgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgUHJpbWFyeSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3ByaW1hcnknKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBBY2NlbnQgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgQWNjZW50KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnYWNjZW50Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgV2FybiBmb3JtIGdyb3VwXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBXYXJuKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnd2FybicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UpIHtcclxuXHJcbiAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG5cclxuICAgIHRoaXMuY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb24gPSB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkNvbG9yUGlja2VyQ2xvc2VkXHJcbiAgICAuc3Vic2NyaWJlKCh2YWw6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhbGV0dGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBiYXNlIGNvbG9ycyBvZiB0aGUgY29sb3IgcGlja2VyIG9uIGNoYW5nZVxyXG4gICAgLy8gd2hlbiBtYW51YWxseSBzZXR0aW5nIGNvbG9ycywgbm90IHVzaW5nXHJcbiAgICAvLyB0aGUgY29sb3IgcGlja2VyIGl0c2VsZlxyXG4gICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNoYW5nZWRcclxuICAgIC5zdWJzY3JpYmUoKHZhbDogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcblxyXG4gICAgICB0aGlzLlByaW1hcnlDb2xvciA9IHZhbC5wcmltYXJ5Lm1haW47XHJcbiAgICAgIHRoaXMuQWNjZW50Q29sb3IgPSB2YWwuYWNjZW50Lm1haW47XHJcbiAgICAgIHRoaXMuV2FybkNvbG9yID0gdmFsLndhcm4ubWFpbjtcclxuICAgICAgLy8gdGhpcy5QcmltYXJ5LnNldFZhbHVlKHZhbC5wcmltYXJ5Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLkFjY2VudC5zZXRWYWx1ZSh2YWwuYWNjZW50Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLldhcm4uc2V0VmFsdWUodmFsLndhcm4ubWFpbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVQYWxldHRlKCk6IHZvaWQge1xyXG5cclxuICAgIGxldCBwYWxldHRlOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBwYWxldHRlID0geyAuLi50aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkN1cnJlbnRQYWxldHRlLCAuLi5wYWxldHRlIH07XHJcbiAgICBwYWxldHRlLnByaW1hcnkubWFpbiA9IHRoaXMuUHJpbWFyeS52YWx1ZS5tYWluO1xyXG4gICAgcGFsZXR0ZS5hY2NlbnQubWFpbiA9IHRoaXMuQWNjZW50LnZhbHVlLm1haW47XHJcbiAgICBwYWxldHRlLndhcm4ubWFpbiA9IHRoaXMuV2Fybi52YWx1ZS5tYWluO1xyXG5cclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5QYWxldHRlID0gcGFsZXR0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBzZXR0aW5nIGluaXRpYWwgdmFsdWVzLFxyXG4gICAvLyB0aGlzIGlzbid0IHRoZSByaWdodCB3YXkgdG8gZG8gdGhpcywgYnV0IGZvciB0aGUgbW9tZW50IC0gc2hhbm5vblxyXG4gICAgdGhpcy5wYXRjaFZhbHVlKFRoZW1lQnVpbGRlckNvbnN0YW50cy5Jbml0aWFsVmFsdWVzLCB0cnVlKTtcclxuXHJcbiAgIHRoaXMuRm9ybS52YWx1ZUNoYW5nZXNcclxuICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKGE6IFBhbGV0dGVNb2RlbCwgYjogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcbiAgICAvLyAgY29uc29sZS5sb2coJ0EnLCBhKTtcclxuICAgIC8vICBjb25zb2xlLmxvZygnQicsIGIpO1xyXG4gICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSAhPT0gSlNPTi5zdHJpbmdpZnkoYik7XHJcbiAgIH0pKVxyXG4gICAgLnN1YnNjcmliZSgocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcbiAgICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5QYWxldHRlID0gcGFsZXR0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5jb2xvclBpY2tlckNsb3NlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhdGNoVmFsdWUodmFsOiBQYWxldHRlTW9kZWwgfCBhbnksIGVtaXRWYWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5Gb3JtLnBhdGNoVmFsdWUodmFsLCB7ZW1pdEV2ZW50OiBlbWl0VmFsdWV9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHVwIHRoZSBmb3JtXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBwcmltYXJ5OiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KSxcclxuICAgICAgYWNjZW50OiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0pLFxyXG4gICAgICB3YXJuOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KSxcclxuICAgICAgbGlnaHRUZXh0OiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgbGlnaHRCYWNrZ3JvdW5kOiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgZGFya1RleHQ6IG5ldyBGb3JtQ29udHJvbCgnJywgW10pLFxyXG4gICAgICBkYXJrQmFja2dyb3VuZDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSlcclxuICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBcclxuICBmeExheW91dD1cImNvbHVtblwiIFxyXG4gIGZ4TGF5b3V0R2FwPVwiMTBweFwiPlxyXG4gIDxkaXYgXHJcbiAgICBmeExheW91dC5sZz1cInJvd1wiIFxyXG4gICAgZnhMYXlvdXQubWQ9XCJyb3dcIiBcclxuICAgIGZ4TGF5b3V0LnNtPVwiY29sdW1uXCIgXHJcbiAgICBmeExheW91dC54cz1cImNvbHVtblwiXHJcbiAgICBmeExheW91dEdhcD1cIjEwcHhcIj5cclxuICAgIDxsY3Utc3ViLXBhbGV0dGUtcGlja2VyIFtjb2xvci1waWNrZXItY29sb3JdPVwiUHJpbWFyeUNvbG9yXCIgW2Zvcm1dPVwiUHJpbWFyeVwiPjwvbGN1LXN1Yi1wYWxldHRlLXBpY2tlcj5cclxuICAgIDxsY3Utc3ViLXBhbGV0dGUtcGlja2VyIFtjb2xvci1waWNrZXItY29sb3JdPVwiQWNjZW50Q29sb3JcIiBbZm9ybV09XCJBY2NlbnRcIj48L2xjdS1zdWItcGFsZXR0ZS1waWNrZXI+XHJcbiAgICA8bGN1LXN1Yi1wYWxldHRlLXBpY2tlciBbY29sb3ItcGlja2VyLWNvbG9yXT1cIldhcm5Db2xvclwiIFtmb3JtXT1cIldhcm5cIj48L2xjdS1zdWItcGFsZXR0ZS1waWNrZXI+XHJcbiAgPC9kaXY+XHJcbiAgPGxjdS12YXJpYW50LWNvbG9ycz48L2xjdS12YXJpYW50LWNvbG9ycz5cclxuPC9kaXY+XHJcbiJdfQ==