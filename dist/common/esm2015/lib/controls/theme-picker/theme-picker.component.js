import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { Component } from '@angular/core';
import { PaletteModel } from '../../models/palette.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export class ThemePickerComponent {
    constructor(palettePickerService, themeBuilderService) {
        this.palettePickerService = palettePickerService;
        this.themeBuilderService = themeBuilderService;
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
        palette.primary.main = theme.Primary;
        palette.accent.main = theme.Accent;
        palette.warn.main = theme.Warn;
        // this.palettePickerService.PalettePickerChange(palette);
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
                template: "<button mat-icon-button id=\"theme-selector\" [mat-menu-trigger-for]=\"themeMenu\" tabindex=\"-1\">\r\n    <mat-icon class=\"auto-flip\">format_color_fill</mat-icon>\r\n</button>\r\n\r\n<mat-menu #themeMenu=\"matMenu\">\r\n    <lcu-mode-toggle class=\"margin-2\"></lcu-mode-toggle>\r\n    <div class=\"theme-selector-container\"\r\n        tabindex=\"-1\"\r\n        (click)=\"$event.stopPropagation();\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.tab)=\"$event.stopPropagation()\"\r\n        (keydown.shift.tab)=\"$event.stopPropagation()\">\r\n        <div *ngFor=\"let theme of Themes\" fxLayout=\"column\">\r\n            <button mat-button class=\"theme-selector\" (click)=\"SetActiveTheme(theme)\">\r\n                <div \r\n                    fxLayout=\"row\"\r\n                    fxLayout=\"start center\"\r\n                    class=\"margin-1\">\r\n                    <div class=\"theme-primary\" [ngStyle]=\"{'background-color':theme.Primary}\">\r\n                        <div class=\"theme-accent\" [ngStyle]=\"{'background-color':theme.Accent}\"></div>\r\n                        <div class=\"theme-warn\" [ngStyle]=\"{'background-color':theme.Warn}\"></div>\r\n                        <!-- <mat-icon *ngIf=\"activeTheme===theme\" class=\"center theme-check\">check</mat-icon> -->\r\n                    </div>\r\n                    <span \r\n                    class=\"margin-left-2 mat-card-subtitle\">\r\n                        {{ theme.ID }}\r\n                    </span>\r\n                </div>\r\n            </button>\r\n        </div>\r\n        <div class=\"margin-2 margin-top-5\">\r\n            <mat-card>\r\n                <mat-card-header>\r\n                    <div mat-card-avatar class=\"lcu-card-avatar\">\r\n                        <mat-icon color=\"accent\">palette</mat-icon>\r\n                    </div>\r\n                    <mat-card-title>\r\n                        Manual Theme\r\n                    </mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                    <form\r\n                    fxLayout=\"column\"\r\n                    fxLayoutGap=\"10px\"\r\n                    [formGroup]=\"ManualForm\"\r\n                    novalidate\r\n                    (click)=\"$event.stopPropagation()\">\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualThemeName\"\r\n                        />\r\n                        <mat-hint>Theme Name</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualPrimary\"\r\n                        />\r\n                        <mat-hint>Primary Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualAccent\"\r\n                        />\r\n                        <mat-hint>Accent Color</mat-hint>\r\n                    </mat-form-field>\r\n                    <mat-form-field>\r\n                        <input\r\n                        type=\"text\"\r\n                        matInput\r\n                        formControlName=\"manualWarn\"\r\n                        />\r\n                        <mat-hint>Warn Color</mat-hint>\r\n                    </mat-form-field>\r\n                </form>\r\n                </mat-card-content>\r\n                <mat-card-actions>\r\n                    <button\r\n                    mat-raised-button\r\n                    color=\"primary\"\r\n                    class=\"margin-top-3\"\r\n                    [disabled]=\"!ManualForm.valid\"\r\n                    (click)=\"SetManualTheme()\"\r\n                        >\r\n                        Set Theme\r\n                    </button>\r\n                </mat-card-actions>\r\n            </mat-card>\r\n           \r\n        </div>\r\n    </div>\r\n</mat-menu>",
                styles: [".toolbar-spacer{flex:1 1 auto}.theme-selectors-container{width:390px;margin:0 8px}div.theme-primary{width:50px;height:50px}div.theme-accent{width:25px;height:25px;position:absolute;bottom:15px;left:17px}div.theme-warn{width:15px;height:15px;position:absolute;bottom:15px;left:30px}"]
            },] }
];
ThemePickerComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3RoZW1lLXBpY2tlci90aGVtZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU9yRixNQUFNLE9BQU8sb0JBQW9CO0lBdUMvQixZQUNZLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFEeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBRWhELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBcENIOztPQUVHO0lBQ0gsSUFBVyxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHO0lBQ0YsSUFBVyxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxlQUFlO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLFVBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBWUMsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQXVCO1FBQzNDLElBQUksT0FBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLE9BQU8sbUNBQVEsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsR0FBSyxPQUFPLENBQUUsQ0FBQztRQUV0RSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVqQywwREFBMEQ7UUFFMUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0ksY0FBYztRQUNuQixJQUFJLGFBQStCLENBQUM7UUFDcEMsYUFBYSxHQUFHLElBQUksZ0JBQWdCLENBQ2xDO1lBQ0UsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSztZQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLO1lBQ2pDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7WUFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztTQUM1QixDQUNGLENBQUE7UUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFUyxTQUFTO1FBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDOUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUM7WUFDdkUsYUFBYSxFQUFFLElBQUksV0FBVyxDQUM1QixFQUFFLEVBQ0YsRUFBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBQyxDQUFDO1lBQ3BDLFlBQVksRUFBRSxJQUFJLFdBQVcsQ0FDM0IsRUFBRSxFQUNGLEVBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQztZQUNwQyxVQUFVLEVBQUUsSUFBSSxXQUFXLENBQ3pCLEVBQUUsRUFDRixFQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUM7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ08sTUFBTTtRQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztJQUNoRCxDQUFDOzs7WUE1R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHF1SUFBNEM7O2FBRTdDOzs7WUFYUSxvQkFBb0I7WUFJcEIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29uc3RhbnRzIH0gZnJvbSAnLi8uLi8uLi91dGlscy90aGVtZS1idWlsZGVyLWNvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVQaWNrZXJNb2RlbCB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL3RoZW1lLXBpY2tlci5tb2RlbCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXRoZW1lLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RoZW1lLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGhlbWUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRoZW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogcHJvcGVydHkgZm9yIHJlYWN0aXZlIGZvcm1cclxuICAgKi9cclxuICBwdWJsaWMgTWFudWFsRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgbWFudWFsIGFjY2VudCBjb2xvciBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBNYW51YWxBY2NlbnQoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsQWNjZW50Jyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgbWFudWFsIHByaW1hcnkgY29sb3IgZmllbGRcclxuICovXHJcbiBwdWJsaWMgZ2V0IE1hbnVhbFByaW1hcnkoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5NYW51YWxGb3JtLmdldCgnbWFudWFsUHJpbWFyeScpO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXNzIG1hbnVhbCB0aGVtZSBuYW1lIGZpZWxkXHJcbiAqL1xyXG5wdWJsaWMgZ2V0IE1hbnVhbFRoZW1lTmFtZSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLk1hbnVhbEZvcm0uZ2V0KCdtYW51YWxUaGVtZU5hbWUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBtYW51YWwgd2FybiBjb2xvciBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBNYW51YWxXYXJuKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuTWFudWFsRm9ybS5nZXQoJ21hbnVhbFdhcm4nKTtcclxufVxyXG5cclxuXHJcbiAgcHVibGljIFRoZW1lczogQXJyYXk8VGhlbWVQaWNrZXJNb2RlbD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRoZW1lcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNldEFjdGl2ZVRoZW1lKHRoZW1lOiBUaGVtZVBpY2tlck1vZGVsKTogdm9pZCB7XHJcbiAgICBsZXQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgcGFsZXR0ZSA9IHsgLi4udGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DdXJyZW50UGFsZXR0ZSwgLi4ucGFsZXR0ZSB9O1xyXG5cclxuICAgIHBhbGV0dGUucHJpbWFyeS5tYWluID0gdGhlbWUuUHJpbWFyeTtcclxuICAgIHBhbGV0dGUuYWNjZW50Lm1haW4gPSB0aGVtZS5BY2NlbnQ7XHJcbiAgICBwYWxldHRlLndhcm4ubWFpbiA9IHRoZW1lLldhcm47XHJcblxyXG4gIC8vIHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuUGFsZXR0ZVBpY2tlckNoYW5nZShwYWxldHRlKTtcclxuXHJcbiAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlBhbGV0dGUgPSBwYWxldHRlO1xyXG4gIHRoaXMudGhlbWVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNYW51YWxseSBjcmVhdGUgdGhlbWUsIGJ5IHVzaW5nIGlucHV0c1xyXG4gICAqL1xyXG4gIHB1YmxpYyBTZXRNYW51YWxUaGVtZSgpOiB2b2lkIHtcclxuICAgIGxldCBtYW51YWxQYWxldHRlOiBUaGVtZVBpY2tlck1vZGVsO1xyXG4gICAgbWFudWFsUGFsZXR0ZSA9IG5ldyBUaGVtZVBpY2tlck1vZGVsKFxyXG4gICAgICB7XHJcbiAgICAgICAgSUQ6IHRoaXMuTWFudWFsVGhlbWVOYW1lLnZhbHVlLFxyXG4gICAgICAgIFByaW1hcnk6IHRoaXMuTWFudWFsUHJpbWFyeS52YWx1ZSxcclxuICAgICAgICBBY2NlbnQ6IHRoaXMuTWFudWFsQWNjZW50LnZhbHVlLFxyXG4gICAgICAgIFdhcm46IHRoaXMuTWFudWFsV2Fybi52YWx1ZVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuVGhlbWVzLnVuc2hpZnQobWFudWFsUGFsZXR0ZSk7XHJcbiAgICB0aGlzLlNldEFjdGl2ZVRoZW1lKG1hbnVhbFBhbGV0dGUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLk1hbnVhbEZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgbWFudWFsVGhlbWVOYW1lOiBuZXcgRm9ybUNvbnRyb2woJycsIHt2YWxpZGF0b3JzOiBWYWxpZGF0b3JzLnJlcXVpcmVkfSksXHJcbiAgICAgIG1hbnVhbFByaW1hcnk6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxBY2NlbnQ6IG5ldyBGb3JtQ29udHJvbChcclxuICAgICAgICAnJyxcclxuICAgICAgICB7dmFsaWRhdG9yczogVmFsaWRhdG9ycy5yZXF1aXJlZH0pLFxyXG4gICAgICBtYW51YWxXYXJuOiBuZXcgRm9ybUNvbnRyb2woXHJcbiAgICAgICAgJycsXHJcbiAgICAgICAge3ZhbGlkYXRvcnM6IFZhbGlkYXRvcnMucmVxdWlyZWR9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlbWVzIGZvciB0aGVtZSBwaWNrZXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdGhlbWVzKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuVGhlbWVzID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lcztcclxuICB9XHJcblxyXG59XHJcbiJdfQ==