import { VariantColorService } from './../../services/variant-color.service';
import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ThemePickerComponent {
    constructor(palettePickerService, themeBuilderService, variantColorService) {
        this.palettePickerService = palettePickerService;
        this.themeBuilderService = themeBuilderService;
        this.variantColorService = variantColorService;
        this.setupForm();
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
        // this.palettePickerService.PalettePickerChange(palette);
        // for (const color of colors) {
        //   debugger;
        //   this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(color);
        // }
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
ThemePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button mat-button class=\"theme-selector\" (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <div class=\"margin-2 margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n           \r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"]
            },] }
];
ThemePickerComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU9yRixNQUFNLE9BQU8sb0JBQW9CO0lBdUMvQixZQUNZLG9CQUEwQyxFQUMxQyxtQkFBd0MsRUFDeEMsbUJBQXdDO1FBRnhDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRWhELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBckNIOztPQUVHO0lBQ0gsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0YsSUFBVyxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7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SUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztJQUNoRCxDQUFDOzs7WUF2SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHl1SUFBNEM7O2FBRTdDOzs7WUFYUSxvQkFBb0I7WUFJcEIsbUJBQW1CO1lBTm5CLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZhcmlhbnRDb2xvclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3ZhcmlhbnQtY29sb3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4vLi4vLi4vdXRpbHMvdGhlbWUtYnVpbGRlci1jb25zdGFudHMudXRpbHMnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyTW9kZWwgfSBmcm9tICcuLy4uLy4uL21vZGVscy90aGVtZS1waWNrZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS10aGVtZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVtZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RoZW1lLXBpY2tlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaGVtZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb3BlcnR5IGZvciByZWFjdGl2ZSBmb3JtXHJcbiAgICovXHJcbiAgcHVibGljIE1hbnVhbEZvcm06IEZvcm1Hcm91cDtcclxuXHJcblxyXG4vKipcclxuICogQWNjZXNzIG1hbnVhbCBhY2NlbnQgY29sb3IgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgTWFudWFsQWNjZW50KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbEFjY2VudCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXNzIG1hbnVhbCBwcmltYXJ5IGNvbG9yIGZpZWxkXHJcbiAqL1xyXG4gcHVibGljIGdldCBNYW51YWxQcmltYXJ5KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFByaW1hcnknKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBtYW51YWwgdGhlbWUgbmFtZSBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBNYW51YWxUaGVtZU5hbWUoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsVGhlbWVOYW1lJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgbWFudWFsIHdhcm4gY29sb3IgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgTWFudWFsV2FybigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxXYXJuJyk7XHJcbn1cclxuXHJcblxyXG4gIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YXJpYW50Q29sb3JTZXJ2aWNlOiBWYXJpYW50Q29sb3JTZXJ2aWNlKSB7XHJcblxyXG4gICAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRoZW1lcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNldEFjdGl2ZVRoZW1lKHRoZW1lOiBUaGVtZVBpY2tlck1vZGVsKTogdm9pZCB7XHJcbiAgICBsZXQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgcGFsZXR0ZSA9IHsgLi4udGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DdXJyZW50UGFsZXR0ZSwgLi4ucGFsZXR0ZSB9O1xyXG5cclxuICAgIGNvbnN0IGNvbG9yczogQXJyYXk8c3RyaW5nPiA9IFt0aGVtZS5QcmltYXJ5LCB0aGVtZS5BY2NlbnQsIHRoZW1lLldhcm5dO1xyXG5cclxuICAgIHBhbGV0dGUucHJpbWFyeS5tYWluID0gdGhlbWUuUHJpbWFyeTtcclxuICAgIHBhbGV0dGUuYWNjZW50Lm1haW4gPSB0aGVtZS5BY2NlbnQ7XHJcbiAgICBwYWxldHRlLndhcm4ubWFpbiA9IHRoZW1lLldhcm47XHJcblxyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVByaW1hcnlWYXJpYW50cyh0aGVtZS5QcmltYXJ5KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVBY2NlbnRWYXJpYW50cyh0aGVtZS5BY2NlbnQpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVdhcm5WYXJpYW50cyh0aGVtZS5XYXJuKTtcclxuXHJcbiAgLy8gdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5QYWxldHRlUGlja2VyQ2hhbmdlKHBhbGV0dGUpO1xyXG5cclxuICAvLyBmb3IgKGNvbnN0IGNvbG9yIG9mIGNvbG9ycykge1xyXG4gIC8vICAgZGVidWdnZXI7XHJcbiAgLy8gICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxQYWxldHRlQ29sb3JzID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLkdldFBhbGV0dGUoY29sb3IpO1xyXG4gIC8vIH1cclxuICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgdGhpcy50aGVtZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGNyZWF0ZSB0aGVtZSwgYnkgdXNpbmcgaW5wdXRzXHJcbiAgICovXHJcbiAgcHVibGljIFNldE1hbnVhbFRoZW1lKCk6IHZvaWQge1xyXG4gICAgbGV0IG1hbnVhbFBhbGV0dGU6IFRoZW1lUGlja2VyTW9kZWw7XHJcbiAgICBtYW51YWxQYWxldHRlID0gbmV3IFRoZW1lUGlja2VyTW9kZWwoXHJcbiAgICAgIHtcclxuICAgICAgICBJRDogdGhpcy5NYW51YWxUaGVtZU5hbWUudmFsdWUsXHJcbiAgICAgICAgUHJpbWFyeTogdGhpcy5NYW51YWxQcmltYXJ5LnZhbHVlLFxyXG4gICAgICAgIEFjY2VudDogdGhpcy5NYW51YWxBY2NlbnQudmFsdWUsXHJcbiAgICAgICAgV2FybjogdGhpcy5NYW51YWxXYXJuLnZhbHVlXHJcbiAgICAgIH1cclxuICAgIClcclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5UaGVtZXMudW5zaGlmdChtYW51YWxQYWxldHRlKTtcclxuICAgIHRoaXMuU2V0QWN0aXZlVGhlbWUobWFudWFsUGFsZXR0ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0dXBGb3JtKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuTWFudWFsRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBtYW51YWxUaGVtZU5hbWU6IG5ldyBGb3JtQ29udHJvbCgnJywge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KSxcclxuICAgICAgbWFudWFsUHJpbWFyeTogbmV3IEZvcm1Db250cm9sKFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbEFjY2VudDogbmV3IEZvcm1Db250cm9sKFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFdhcm46IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGVtZXMgZm9yIHRoZW1lIHBpY2tlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5UaGVtZXMgPSB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuVGhlbWVzO1xyXG4gIH1cclxuXHJcbn1cclxuIl19