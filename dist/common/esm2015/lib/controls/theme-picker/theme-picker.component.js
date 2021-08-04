import { VariantColorService } from './../../services/variant-color.service';
import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component, Input } from '@angular/core';
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
ThemePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle [dark-mode]=\"DarkMode\" class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button \r\n                mat-button class=\"theme-selector\" \r\n                (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <div class=\"theme-dark-mode\" \r\n                             [ngClass]=\"{'dark-mode' : !theme.DarkMode, 'light-mode': theme.DarkMode}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }} {{ theme.DarkMode }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <!-- Manual Form Controls -->\r\n        <div\r\n            *ngIf=\"ToggleManualControls\" \r\n            class=\"margin-2 \r\n            margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}div.theme-dark-mode{width:10px;height:10px;position:absolute;bottom:10px;left:55px}.dark-mode{background-color:#222}.light-mode{background-color:#f9f9f9}"]
            },] }
];
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
// function Input(arg0: string) {
//   throw new Error('Function not implemented.');
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckYsTUFBTSxPQUFPLG9CQUFvQjtJQWlGL0IsWUFDWSxvQkFBMEMsRUFDMUMsbUJBQXdDLEVBQ3hDLG1CQUF3QztRQUZ4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQXpFRCxJQUNXLFFBQVEsQ0FBQyxHQUFZO1FBRTlCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUVqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIs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LENBQUM7WUFDOUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUM7WUFDdkUsYUFBYSxFQUFFLElBQUksV0FBVyxDQUM1QixFQUFFLEVBQ0YsRUFBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBQyxDQUFDO1lBQ3BDLFlBQVksRUFBRSxJQUFJLFdBQVcsQ0FDM0IsRUFBRSxFQUNGLEVBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQztZQUNwQyxVQUFVLEVBQUUsSUFBSSxXQUFXLENBQ3pCLEVBQUUsRUFDRixFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ08sTUFBTTtRQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztJQUNoRCxDQUFDOzs7WUF2S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHFsSkFBNEM7O2FBRTdDOzs7WUFYUSxvQkFBb0I7WUFJcEIsbUJBQW1CO1lBTm5CLG1CQUFtQjs7O3VCQTZCekIsS0FBSyxTQUFDLFdBQVc7bUNBY2pCLEtBQUssU0FBQyx3QkFBd0I7OEJBYzlCLEtBQUssU0FBQyxrQkFBa0I7O0FBMEgzQixpQ0FBaUM7QUFDakMsa0RBQWtEO0FBQ2xELElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYXJpYW50Q29sb3JTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy92YXJpYW50LWNvbG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb25zdGFudHMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL3RoZW1lLWJ1aWxkZXItY29uc3RhbnRzLnV0aWxzJztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZVBpY2tlck1vZGVsIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXRoZW1lLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RoZW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGhlbWUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVtZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIHByb3BlcnR5IGZvciByZWFjdGl2ZSBmb3JtXHJcbiAgICovXHJcbiBwdWJsaWMgTWFudWFsRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuIC8qKlxyXG4gICogTGlzdCBvZiB0aGVtZXNcclxuICAqL1xyXG4gIHB1YmxpYyBUaGVtZXM6IEFycmF5PFRoZW1lUGlja2VyTW9kZWw+O1xyXG5wdWJsaWMgdGVzdDogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBfZGFya01vZGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCdkYXJrLW1vZGUnKVxyXG4gIHB1YmxpYyBzZXQgRGFya01vZGUodmFsOiBib29sZWFuKSB7XHJcblxyXG4gICAgaWYgKCF2YWwpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5fZGFya01vZGUgPSB2YWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IERhcmtNb2RlKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9kYXJrTW9kZTtcclxuICB9XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3RvZ2dsZS1tYW51YWwtY29udHJvbHMnKVxyXG4gIHB1YmxpYyBUb2dnbGVNYW51YWxDb250cm9sczogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHZhbCBfdGhlbWluZy5zY3NzIGZyb20gZXh0ZXJuYWwgc291cmNlXHJcbiAgICovXHJcbiAgLy8gQElucHV0KCdtYXRlcmlhbC10aGVtZS1zdHlsZXNoZWV0JylcclxuICAvLyBwdWJsaWMgc2V0IE1hdGVyaWFsVGhlbWVTdHlsZXNoZWV0KHZhbDogYW55KSB7XHJcbiAgLy8gICBkZWJ1Z2dlcjtcclxuICAvLyAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5NYXRlcmlhbFRoZW1lID0gdmFsO1xyXG4gIC8vIH1cclxuXHJcbiAgcHJpdmF0ZSBfbWF0ZXJpYWxUaGVtaW5nOiBzdHJpbmc7XHJcbiAgQElucHV0KCdtYXRlcmlhbC10aGVtaW5nJylcclxuICBnZXQgTWF0ZXJpYWxUaGVtaW5nKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF0ZXJpYWxUaGVtaW5nO1xyXG4gIH1cclxuXHJcbiAgc2V0IE1hdGVyaWFsVGhlbWluZyh2YWw6IHN0cmluZykge1xyXG5cclxuICAgIHRoaXMuX21hdGVyaWFsVGhlbWluZyA9IHZhbDtcclxuICAgIC8vIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5NYXRlcmlhbFRoZW1lID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIG1hbnVhbCBhY2NlbnQgY29sb3IgZmllbGRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IE1hbnVhbEFjY2VudCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbEFjY2VudCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIG1hbnVhbCBwcmltYXJ5IGNvbG9yIGZpZWxkXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBNYW51YWxQcmltYXJ5KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsUHJpbWFyeScpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIG1hbnVhbCB0aGVtZSBuYW1lIGZpZWxkXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBNYW51YWxUaGVtZU5hbWUoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxUaGVtZU5hbWUnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBtYW51YWwgd2FybiBjb2xvciBmaWVsZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgTWFudWFsV2FybigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFdhcm4nKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHZhcmlhbnRDb2xvclNlcnZpY2U6IFZhcmlhbnRDb2xvclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIHRoaXMuc2V0dXBGb3JtKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudGhlbWVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHNlbGVjdGluZyBhIHRoZW1lIGZyb20gdGhlIGxpc3RcclxuICAgKiBcclxuICAgKiBAcGFyYW0gdGhlbWUgc2VsZWN0ZWQgdGhlbWVcclxuICAgKi9cclxuICBwdWJsaWMgU2V0QWN0aXZlVGhlbWUodGhlbWU6IFRoZW1lUGlja2VyTW9kZWwpOiB2b2lkIHtcclxuICAgIGxldCBwYWxldHRlOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBwYWxldHRlID0geyAuLi50aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkN1cnJlbnRQYWxldHRlLCAuLi5wYWxldHRlIH07XHJcblxyXG4gICAgY29uc3QgY29sb3JzOiBBcnJheTxzdHJpbmc+ID0gW3RoZW1lLlByaW1hcnksIHRoZW1lLkFjY2VudCwgdGhlbWUuV2Fybl07XHJcblxyXG4gICAgcGFsZXR0ZS5wcmltYXJ5Lk1haW4gPSB0aGVtZS5QcmltYXJ5O1xyXG4gICAgcGFsZXR0ZS5hY2NlbnQuTWFpbiA9IHRoZW1lLkFjY2VudDtcclxuICAgIHBhbGV0dGUud2Fybi5NYWluID0gdGhlbWUuV2FybjtcclxuICAgIHBhbGV0dGUuRGFya01vZGUgPSB0aGVtZS5EYXJrTW9kZTtcclxuXHJcbiAgICB0aGlzLkRhcmtNb2RlID0gcGFsZXR0ZS5EYXJrTW9kZTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHModGhlbWUuUHJpbWFyeSk7XHJcbiAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModGhlbWUuQWNjZW50KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModGhlbWUuV2Fybik7XHJcblxyXG4gICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlBhbGV0dGUgPSBwYWxldHRlO1xyXG4gICAgdGhpcy50aGVtZXMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGNyZWF0ZSB0aGVtZSwgYnkgdXNpbmcgaW5wdXRzXHJcbiAgICovXHJcbiAgcHVibGljIFNldE1hbnVhbFRoZW1lKCk6IHZvaWQge1xyXG4gICAgbGV0IG1hbnVhbFBhbGV0dGU6IFRoZW1lUGlja2VyTW9kZWw7XHJcbiAgICBtYW51YWxQYWxldHRlID0gbmV3IFRoZW1lUGlja2VyTW9kZWwoXHJcbiAgICAgIHtcclxuICAgICAgICBJRDogdGhpcy5NYW51YWxUaGVtZU5hbWUudmFsdWUsXHJcbiAgICAgICAgUHJpbWFyeTogdGhpcy5NYW51YWxQcmltYXJ5LnZhbHVlLFxyXG4gICAgICAgIEFjY2VudDogdGhpcy5NYW51YWxBY2NlbnQudmFsdWUsXHJcbiAgICAgICAgV2FybjogdGhpcy5NYW51YWxXYXJuLnZhbHVlLFxyXG4gICAgICAgIERhcmtNb2RlOiB0cnVlXHJcbiAgICAgIH1cclxuICAgIClcclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5UaGVtZXMudW5zaGlmdChtYW51YWxQYWxldHRlKTtcclxuICAgIHRoaXMuU2V0QWN0aXZlVGhlbWUobWFudWFsUGFsZXR0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCBmb3JtIGNvbnRyb2xzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLk1hbnVhbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgbWFudWFsVGhlbWVOYW1lOiBuZXcgRm9ybUNvbnRyb2woJycsIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFByaW1hcnk6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxBY2NlbnQ6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxXYXJuOiBuZXcgRm9ybUNvbnRyb2woXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlbWVzIGZvciB0aGVtZSBwaWNrZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdGhlbWVzKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuVGhlbWVzID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lcztcclxuICB9XHJcblxyXG59XHJcbi8vIGZ1bmN0aW9uIElucHV0KGFyZzA6IHN0cmluZykge1xyXG4vLyAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24gbm90IGltcGxlbWVudGVkLicpO1xyXG4vLyB9XHJcblxyXG4iXX0=