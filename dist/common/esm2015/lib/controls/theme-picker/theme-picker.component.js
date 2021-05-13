import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Constants } from '../../utils/constants.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ThemePickerComponent {
    constructor(palettePickerService, themeBuilderService) {
        this.palettePickerService = palettePickerService;
        this.themeBuilderService = themeBuilderService;
        this.setupForm();
        this.themes();
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
    }
    SetActiveTheme(theme) {
        let palette = new PaletteModel();
        palette = Object.assign(Object.assign({}, this.palettePickerService.CurrentPalette), palette);
        palette.primary.main = theme.Primary;
        palette.accent.main = theme.Accent;
        palette.warn.main = theme.Warn;
        // this.palettePickerService.PalettePickerChange(palette);
        this.themeBuilderService.Palette = palette;
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
        this.Themes.unshift(manualPalette);
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
        this.Themes = [
            new ThemePickerModel({
                ID: 'Fathym Brand',
                Primary: Constants.document.getPropertyValue('--initial-primary'),
                Accent: Constants.document.getPropertyValue('--initial-accent'),
                Warn: Constants.document.getPropertyValue('--initial-warn')
            }),
            new ThemePickerModel({
                ID: 'Yellow',
                Primary: '#ffcc11',
                Accent: '#06a5ff',
                Warn: '#990000'
            }),
            new ThemePickerModel({
                ID: 'Pink',
                Primary: '#a83271',
                Accent: '#6103ff',
                Warn: '#b9f013'
            })
        ];
    }
}
ThemePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-picker',
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button mat-button class=\"theme-selector\" (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <div class=\"margin-2 margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n           \r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"]
            },] }
];
ThemePickerComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQW1CLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPckYsTUFBTSxPQUFPLG9CQUFvQjtJQXVDL0IsWUFDWSxvQkFBMEMsRUFDMUMsbUJBQXdDO1FBRHhDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVoRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFyQ0g7O09BRUc7SUFDSCxJQUFXLFlBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDRixJQUFXLGFBQWE7UUFDdkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7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O2dCQUNsQixNQUFNLEVBQUUsU0FBUztnQkFDakIsSUFBSSxFQUFFLFNBQVM7YUFDaEIsQ0FDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFuSUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHF1SUFBNEM7O2FBRTdDOzs7WUFaUSxvQkFBb0I7WUFJcEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZVBpY2tlck1vZGVsIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvdGhlbWUtcGlja2VyLm1vZGVsJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzLnV0aWxzJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtdGhlbWUtcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGhlbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aGVtZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGhlbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBwcm9wZXJ0eSBmb3IgcmVhY3RpdmUgZm9ybVxyXG4gICAqL1xyXG4gIHB1YmxpYyBNYW51YWxGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBtYW51YWwgYWNjZW50IGNvbG9yIGZpZWxkXHJcbiAqL1xyXG5wdWJsaWMgZ2V0IE1hbnVhbEFjY2VudCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxBY2NlbnQnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBtYW51YWwgcHJpbWFyeSBjb2xvciBmaWVsZFxyXG4gKi9cclxuIHB1YmxpYyBnZXQgTWFudWFsUHJpbWFyeSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxQcmltYXJ5Jyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgbWFudWFsIHRoZW1lIG5hbWUgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgTWFudWFsVGhlbWVOYW1lKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFRoZW1lTmFtZScpO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXNzIG1hbnVhbCB3YXJuIGNvbG9yIGZpZWxkXHJcbiAqL1xyXG5wdWJsaWMgZ2V0IE1hbnVhbFdhcm4oKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsV2FybicpO1xyXG59XHJcblxyXG5cclxuICBwdWJsaWMgVGhlbWVzOiBBcnJheTxUaGVtZVBpY2tlck1vZGVsPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UpIHtcclxuXHJcbiAgICAgIHRoaXMuc2V0dXBGb3JtKCk7XHJcbiAgICAgIHRoaXMudGhlbWVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBTZXRBY3RpdmVUaGVtZSh0aGVtZTogVGhlbWVQaWNrZXJNb2RlbCk6IHZvaWQge1xyXG4gICAgbGV0IHBhbGV0dGU6IFBhbGV0dGVNb2RlbCA9IG5ldyBQYWxldHRlTW9kZWwoKTtcclxuICAgIHBhbGV0dGUgPSB7IC4uLnRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuQ3VycmVudFBhbGV0dGUsIC4uLnBhbGV0dGUgfTtcclxuXHJcbiAgICBwYWxldHRlLnByaW1hcnkubWFpbiA9IHRoZW1lLlByaW1hcnk7XHJcbiAgICBwYWxldHRlLmFjY2VudC5tYWluID0gdGhlbWUuQWNjZW50O1xyXG4gICAgcGFsZXR0ZS53YXJuLm1haW4gPSB0aGVtZS5XYXJuO1xyXG5cclxuICAvLyB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLlBhbGV0dGVQaWNrZXJDaGFuZ2UocGFsZXR0ZSk7XHJcblxyXG4gIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5QYWxldHRlID0gcGFsZXR0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hbnVhbGx5IGNyZWF0ZSB0aGVtZSwgYnkgdXNpbmcgaW5wdXRzXHJcbiAgICovXHJcbiAgcHVibGljIFNldE1hbnVhbFRoZW1lKCk6IHZvaWQge1xyXG4gICAgbGV0IG1hbnVhbFBhbGV0dGU6IFRoZW1lUGlja2VyTW9kZWw7XHJcbiAgICBtYW51YWxQYWxldHRlID0gbmV3IFRoZW1lUGlja2VyTW9kZWwoXHJcbiAgICAgIHtcclxuICAgICAgICBJRDogdGhpcy5NYW51YWxUaGVtZU5hbWUudmFsdWUsXHJcbiAgICAgICAgUHJpbWFyeTogdGhpcy5NYW51YWxQcmltYXJ5LnZhbHVlLFxyXG4gICAgICAgIEFjY2VudDogdGhpcy5NYW51YWxBY2NlbnQudmFsdWUsXHJcbiAgICAgICAgV2FybjogdGhpcy5NYW51YWxXYXJuLnZhbHVlXHJcbiAgICAgIH1cclxuICAgIClcclxuICAgIHRoaXMuVGhlbWVzLnVuc2hpZnQobWFudWFsUGFsZXR0ZSk7XHJcbiAgICB0aGlzLlNldEFjdGl2ZVRoZW1lKG1hbnVhbFBhbGV0dGUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLk1hbnVhbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgbWFudWFsVGhlbWVOYW1lOiBuZXcgRm9ybUNvbnRyb2woJycsIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFByaW1hcnk6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxBY2NlbnQ6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxXYXJuOiBuZXcgRm9ybUNvbnRyb2woXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlbWVzIGZvciB0aGVtZSBwaWNrZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdGhlbWVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5UaGVtZXMgPSBbXHJcbiAgICAgIG5ldyBUaGVtZVBpY2tlck1vZGVsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIElEOiAnRmF0aHltIEJyYW5kJyxcclxuICAgICAgICAgIFByaW1hcnk6IENvbnN0YW50cy5kb2N1bWVudC5nZXRQcm9wZXJ0eVZhbHVlKCctLWluaXRpYWwtcHJpbWFyeScpLFxyXG4gICAgICAgICAgQWNjZW50OiBDb25zdGFudHMuZG9jdW1lbnQuZ2V0UHJvcGVydHlWYWx1ZSgnLS1pbml0aWFsLWFjY2VudCcpLFxyXG4gICAgICAgICAgV2FybjogQ29uc3RhbnRzLmRvY3VtZW50LmdldFByb3BlcnR5VmFsdWUoJy0taW5pdGlhbC13YXJuJylcclxuICAgICAgICB9XHJcbiAgICAgICksXHJcbiAgICAgIG5ldyBUaGVtZVBpY2tlck1vZGVsKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIElEOiAnWWVsbG93JywgXHJcbiAgICAgICAgICBQcmltYXJ5OiAnI2ZmY2MxMScsIFxyXG4gICAgICAgICAgQWNjZW50OiAnIzA2YTVmZicsIFxyXG4gICAgICAgICAgV2FybjogJyM5OTAwMDAnXHJcbiAgICAgICAgfVxyXG4gICAgICApLFxyXG4gICAgICBuZXcgVGhlbWVQaWNrZXJNb2RlbChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBJRDogJ1BpbmsnLCBcclxuICAgICAgICAgIFByaW1hcnk6ICcjYTgzMjcxJywgXHJcbiAgICAgICAgICBBY2NlbnQ6ICcjNjEwM2ZmJywgXHJcbiAgICAgICAgICBXYXJuOiAnI2I5ZjAxMydcclxuICAgICAgICB9XHJcbiAgICAgIClcclxuICAgIF07XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=