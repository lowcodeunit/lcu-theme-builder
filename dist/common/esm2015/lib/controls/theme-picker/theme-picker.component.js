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
ThemePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle [dark-mode]=\"DarkMode\" class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button mat-button class=\"theme-selector\" (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <!-- Manual Form Controls -->\r\n        <div\r\n            *ngIf=\"ToggleManualControls\" \r\n            class=\"margin-2 \r\n            margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFRckYsTUFBTSxPQUFPLG9CQUFvQjtJQWlGL0IsWUFDWSxvQkFBMEMsRUFDMUMsbUJBQXdDLEVBQ3hDLG1CQUF3QztRQUZ4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQXpFRCxJQUNXLFFBQVEsQ0FBQyxHQUFZO1FBRTlCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFFckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUVqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIs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QUNGLEVBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQztZQUNwQyxZQUFZLEVBQUUsSUFBSSxXQUFXLENBQzNCLEVBQUUsRUFDRixFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUM7WUFDcEMsVUFBVSxFQUFFLElBQUksV0FBVyxDQUN6QixFQUFFLEVBQ0YsRUFBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBQyxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLE1BQU07UUFFZCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7SUFDaEQsQ0FBQzs7O1lBL0pGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QiwwMklBQTRDOzthQUU3Qzs7O1lBWFEsb0JBQW9CO1lBSXBCLG1CQUFtQjtZQU5uQixtQkFBbUI7Ozt1QkE2QnpCLEtBQUssU0FBQyxXQUFXO21DQWNqQixLQUFLLFNBQUMsd0JBQXdCOzhCQWM5QixLQUFLLFNBQUMsa0JBQWtCOztBQWtIM0IsaUNBQWlDO0FBQ2pDLGtEQUFrRDtBQUNsRCxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFyaWFudENvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdmFyaWFudC1jb2xvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi8uLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVQaWNrZXJNb2RlbCB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3RoZW1lLXBpY2tlci5tb2RlbCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS10aGVtZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVtZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RoZW1lLXBpY2tlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBwcm9wZXJ0eSBmb3IgcmVhY3RpdmUgZm9ybVxyXG4gICAqL1xyXG4gcHVibGljIE1hbnVhbEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAvKipcclxuICAqIExpc3Qgb2YgdGhlbWVzXHJcbiAgKi9cclxuICBwdWJsaWMgVGhlbWVzOiBBcnJheTxUaGVtZVBpY2tlck1vZGVsPjtcclxucHVibGljIHRlc3Q6IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgX2RhcmtNb2RlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgnZGFyay1tb2RlJylcclxuICBwdWJsaWMgc2V0IERhcmtNb2RlKHZhbDogYm9vbGVhbikge1xyXG5cclxuICAgIGlmICghdmFsKSB7IHJldHVybjsgfVxyXG5cclxuICAgIHRoaXMuX2RhcmtNb2RlID0gdmFsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBEYXJrTW9kZSgpOiBib29sZWFuIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZGFya01vZGU7XHJcbiAgfVxyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCd0b2dnbGUtbWFudWFsLWNvbnRyb2xzJylcclxuICBwdWJsaWMgVG9nZ2xlTWFudWFsQ29udHJvbHM6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB2YWwgX3RoZW1pbmcuc2NzcyBmcm9tIGV4dGVybmFsIHNvdXJjZVxyXG4gICAqL1xyXG4gIC8vIEBJbnB1dCgnbWF0ZXJpYWwtdGhlbWUtc3R5bGVzaGVldCcpXHJcbiAgLy8gcHVibGljIHNldCBNYXRlcmlhbFRoZW1lU3R5bGVzaGVldCh2YWw6IGFueSkge1xyXG4gIC8vICAgZGVidWdnZXI7XHJcbiAgLy8gICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxUaGVtZSA9IHZhbDtcclxuICAvLyB9XHJcblxyXG4gIHByaXZhdGUgX21hdGVyaWFsVGhlbWluZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgnbWF0ZXJpYWwtdGhlbWluZycpXHJcbiAgZ2V0IE1hdGVyaWFsVGhlbWluZygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hdGVyaWFsVGhlbWluZztcclxuICB9XHJcblxyXG4gIHNldCBNYXRlcmlhbFRoZW1pbmcodmFsOiBzdHJpbmcpIHtcclxuXHJcbiAgICB0aGlzLl9tYXRlcmlhbFRoZW1pbmcgPSB2YWw7XHJcbiAgICAvLyB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxUaGVtZSA9IHZhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBtYW51YWwgYWNjZW50IGNvbG9yIGZpZWxkXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBNYW51YWxBY2NlbnQoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxBY2NlbnQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBtYW51YWwgcHJpbWFyeSBjb2xvciBmaWVsZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgTWFudWFsUHJpbWFyeSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFByaW1hcnknKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBtYW51YWwgdGhlbWUgbmFtZSBmaWVsZFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgTWFudWFsVGhlbWVOYW1lKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsVGhlbWVOYW1lJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgbWFudWFsIHdhcm4gY29sb3IgZmllbGRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IE1hbnVhbFdhcm4oKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxXYXJuJyk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YXJpYW50Q29sb3JTZXJ2aWNlOiBWYXJpYW50Q29sb3JTZXJ2aWNlKSB7XHJcblxyXG4gICAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRoZW1lcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNldEFjdGl2ZVRoZW1lKHRoZW1lOiBUaGVtZVBpY2tlck1vZGVsKTogdm9pZCB7XHJcbiAgICBsZXQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgcGFsZXR0ZSA9IHsgLi4udGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DdXJyZW50UGFsZXR0ZSwgLi4ucGFsZXR0ZSB9O1xyXG5cclxuICAgIGNvbnN0IGNvbG9yczogQXJyYXk8c3RyaW5nPiA9IFt0aGVtZS5QcmltYXJ5LCB0aGVtZS5BY2NlbnQsIHRoZW1lLldhcm5dO1xyXG5cclxuICAgIHBhbGV0dGUucHJpbWFyeS5tYWluID0gdGhlbWUuUHJpbWFyeTtcclxuICAgIHBhbGV0dGUuYWNjZW50Lm1haW4gPSB0aGVtZS5BY2NlbnQ7XHJcbiAgICBwYWxldHRlLndhcm4ubWFpbiA9IHRoZW1lLldhcm47XHJcblxyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVByaW1hcnlWYXJpYW50cyh0aGVtZS5QcmltYXJ5KTtcclxuICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVBY2NlbnRWYXJpYW50cyh0aGVtZS5BY2NlbnQpO1xyXG4gICAgdGhpcy52YXJpYW50Q29sb3JTZXJ2aWNlLlVwZGF0ZVdhcm5WYXJpYW50cyh0aGVtZS5XYXJuKTtcclxuXHJcbiAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgICB0aGlzLnRoZW1lcygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFudWFsbHkgY3JlYXRlIHRoZW1lLCBieSB1c2luZyBpbnB1dHNcclxuICAgKi9cclxuICBwdWJsaWMgU2V0TWFudWFsVGhlbWUoKTogdm9pZCB7XHJcbiAgICBsZXQgbWFudWFsUGFsZXR0ZTogVGhlbWVQaWNrZXJNb2RlbDtcclxuICAgIG1hbnVhbFBhbGV0dGUgPSBuZXcgVGhlbWVQaWNrZXJNb2RlbChcclxuICAgICAge1xyXG4gICAgICAgIElEOiB0aGlzLk1hbnVhbFRoZW1lTmFtZS52YWx1ZSxcclxuICAgICAgICBQcmltYXJ5OiB0aGlzLk1hbnVhbFByaW1hcnkudmFsdWUsXHJcbiAgICAgICAgQWNjZW50OiB0aGlzLk1hbnVhbEFjY2VudC52YWx1ZSxcclxuICAgICAgICBXYXJuOiB0aGlzLk1hbnVhbFdhcm4udmFsdWVcclxuICAgICAgfVxyXG4gICAgKVxyXG4gICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lcy51bnNoaWZ0KG1hbnVhbFBhbGV0dGUpO1xyXG4gICAgdGhpcy5TZXRBY3RpdmVUaGVtZShtYW51YWxQYWxldHRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHVwIGZvcm0gY29udHJvbHNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc2V0dXBGb3JtKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuTWFudWFsRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBtYW51YWxUaGVtZU5hbWU6IG5ldyBGb3JtQ29udHJvbCgnJywge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KSxcclxuICAgICAgbWFudWFsUHJpbWFyeTogbmV3IEZvcm1Db250cm9sKFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbEFjY2VudDogbmV3IEZvcm1Db250cm9sKFxyXG4gICAgICAgICcnLFxyXG4gICAgICAgIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFdhcm46IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGVtZXMgZm9yIHRoZW1lIHBpY2tlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB0aGVtZXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5UaGVtZXMgPSB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuVGhlbWVzO1xyXG4gIH1cclxuXHJcbn1cclxuLy8gZnVuY3Rpb24gSW5wdXQoYXJnMDogc3RyaW5nKSB7XHJcbi8vICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbi8vIH1cclxuXHJcbiJdfQ==