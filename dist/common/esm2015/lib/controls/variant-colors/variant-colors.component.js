import { PalettePickerService } from '../../services/palette-picker.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { ThemeBuilderService } from '../../services/theme-builder.service';
const tinyColor = tinycolor;
export class VariantColorsComponent {
    constructor(PalettePickerService, themeBuilderService) {
        this.PalettePickerService = PalettePickerService;
        this.themeBuilderService = themeBuilderService;
        this.PalettePickerService.PrimaryColorPalette = [];
        this.PalettePickerService.AccentColorPalette = [];
        this.PalettePickerService.WarnColorPalette = [];
    }
    // tslint:disable-next-line:no-input-rename
    set AccentColor(val) {
        this._accentColor = val;
        this.updateAccentColor(val);
    }
    get AccentColor() {
        return this._accentColor;
    }
    // tslint:disable-next-line:no-input-rename
    set PrimaryColor(val) {
        this._primaryColor = val;
        this.updatePrimaryColor(val);
    }
    get PrimaryColor() {
        return this.PrimaryColor;
    }
    // tslint:disable-next-line:no-input-rename
    set WarnColor(val) {
        this._warnColor = val;
        this.updateWarnColor(val);
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
            this.updateAccentColor(palette.accent.main);
            this.updatePrimaryColor(palette.primary.main);
            this.updateWarnColor(palette.warn.main);
        });
    }
    ngOnDestroy() {
        this.paletteChangedSubscription.unsubscribe();
    }
    updatePrimaryColor(color) {
        this.PalettePickerService.PrimaryColorPalette = this.computeColors(color ? color : this.PrimaryColorControl.value);
        for (const c of this.PalettePickerService.PrimaryColorPalette) {
            const key = `--theme-primary-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            // set or update CSS variable values
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    updateAccentColor(color) {
        this.PalettePickerService.AccentColorPalette = this.computeColors(color ? color : this.AccentColorControl.value);
        for (const c of this.PalettePickerService.AccentColorPalette) {
            const key = `--theme-accent-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    updateWarnColor(color) {
        this.PalettePickerService.WarnColorPalette = this.computeColors(color);
        for (const c of this.PalettePickerService.WarnColorPalette) {
            const key = `--theme-warn-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }
    setupForm() {
        this.Form = new FormGroup({
            primaryColorControl: new FormControl('#ffcc11'),
            accentColorControl: new FormControl('#0000aa')
        });
    }
    computeColors(color) {
        const baseLightColor = tinyColor('#ffffff');
        const baseDarkColor = this.themeBuilderService.multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
        const [, , , baseTetrad] = tinyColor(color).tetrad();
        return [
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 12), '50'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 30), '100'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 50), '200'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 70), '300'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 85), '400'),
            this.getColorObject(tinyColor(color), '500'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 87), '600'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 70), '700'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 54), '800'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 25), '900'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
        ];
    }
    // force change
    getColorObject(value, name) {
        const c = tinyColor(value);
        return {
            name,
            hex: c.toHexString(),
            darkContrast: c.isLight()
        };
    }
}
VariantColorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-variant-colors',
                template: "<form\r\n    fxLayout=\"column\"\r\n    fxLayoutGap=\"10px\"\r\n    [formGroup]=\"Form\"\r\n    novalidate>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\" \r\n            *ngFor=\"let color of PalettePickerService.PrimaryColorPalette\" \r\n            [style.background-color]=\"color.hex\" \r\n            [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n            <div>\r\n                {{color.name}}\r\n            </div>\r\n            <div>\r\n                {{color.hex}}\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n                fxLayoutAlign=\"space-between center\"\r\n                class=\"padding-left-2 padding-right-2\"\r\n                *ngFor=\"let color of PalettePickerService.AccentColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\"\r\n            *ngFor=\"let color of PalettePickerService.WarnColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
VariantColorsComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService }
];
VariantColorsComponent.propDecorators = {
    AccentColor: [{ type: Input, args: ['accent-color',] }],
    PrimaryColor: [{ type: Input, args: ['primary-color',] }],
    WarnColor: [{ type: Input, args: ['warn-color',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb2xvcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdmFyaWFudC1jb2xvcnMvdmFyaWFudC1jb2xvcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sS0FBSyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBTXhDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRzNFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQWU1QixNQUFNLE9BQU8sc0JBQXNCO0lBNERqQyxZQUNTLG9CQUEwQyxFQUN2QyxtQkFBd0M7UUFEM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUN2Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUE1REgsMkNBQTJDO0lBQzNDLElBQ0ksV0FBVyxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FB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QUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQy9FLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDL0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDOUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNuRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztTQUNwRyxDQUFDO0lBQ0osQ0FBQztJQUNILGVBQWU7SUFDSCxjQUFjLENBQUMsS0FBeUIsRUFBRSxJQUFZO1FBQzlELE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPO1lBQ0wsSUFBSTtZQUNKLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3BCLFlBQVksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFO1NBQzFCLENBQUM7SUFDSixDQUFDOzs7WUE3S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDhsRUFBOEM7O2FBRS9DOzs7WUF6QlEsb0JBQW9CO1lBU3BCLG1CQUFtQjs7OzBCQXlCM0IsS0FBSyxTQUFDLGNBQWM7MkJBV3BCLEtBQUssU0FBQyxlQUFlO3dCQVdyQixLQUFLLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVDb2xvck1hcE1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUtY29sb3ItbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xvck1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbG9yLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuXHJcbi8vIGNvbnN0IHN0eWxlVmFyaWFibGVzID0gcmVxdWlyZSgnLi9hc3NldHMvc3R5bGVzL2R5bmFtaWMtdGhlbWUuc2NzcycpO1xyXG5cclxuLyoqXHJcbiAqIFN0cmluZyBsaXRlcmFsIGRhdGEgdHlwZVxyXG4gKi9cclxudHlwZSBNb2RlVHlwZSA9ICdkYXJrJyB8ICdsaWdodCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS12YXJpYW50LWNvbG9ycycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi92YXJpYW50LWNvbG9ycy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVmFyaWFudENvbG9yc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBfYWNjZW50Q29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF9wcmltYXJ5Q29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF93YXJuQ29sb3I6IHN0cmluZztcclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuQElucHV0KCdhY2NlbnQtY29sb3InKVxyXG5zZXQgQWNjZW50Q29sb3IodmFsOiBzdHJpbmcpIHtcclxuICB0aGlzLl9hY2NlbnRDb2xvciA9IHZhbDtcclxuICB0aGlzLnVwZGF0ZUFjY2VudENvbG9yKHZhbCk7XHJcbn1cclxuXHJcbmdldCBBY2NlbnRDb2xvcigpOiBzdHJpbmcge1xyXG4gIHJldHVybiB0aGlzLl9hY2NlbnRDb2xvcjtcclxufVxyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG5ASW5wdXQoJ3ByaW1hcnktY29sb3InKVxyXG5zZXQgUHJpbWFyeUNvbG9yKHZhbDogc3RyaW5nKSB7XHJcbiAgdGhpcy5fcHJpbWFyeUNvbG9yID0gdmFsO1xyXG4gIHRoaXMudXBkYXRlUHJpbWFyeUNvbG9yKHZhbCk7XHJcbn1cclxuXHJcbmdldCBQcmltYXJ5Q29sb3IoKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGhpcy5QcmltYXJ5Q29sb3I7XHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuQElucHV0KCd3YXJuLWNvbG9yJylcclxuc2V0IFdhcm5Db2xvcih2YWw6IHN0cmluZykge1xyXG4gIHRoaXMuX3dhcm5Db2xvciA9IHZhbDtcclxuICB0aGlzLnVwZGF0ZVdhcm5Db2xvcih2YWwpO1xyXG59XHJcblxyXG5nZXQgV2FybkNvbG9yKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRoaXMuV2FybkNvbG9yO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXNzIHByaW1hcnkgY29sb3IgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgUHJpbWFyeUNvbG9yQ29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdwcmltYXJ5Q29sb3JDb250cm9sJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgYWNjZW50IGNvbG9yIGZpZWxkXHJcbiAqL1xyXG5wdWJsaWMgZ2V0IEFjY2VudENvbG9yQ29udHJvbCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdhY2NlbnRDb2xvckNvbnRyb2wnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHByb3BlcnR5IGZvciByZWFjdGl2ZSBmb3JtXHJcbiAqL1xyXG5wdWJsaWMgRm9ybTogRm9ybUdyb3VwO1xyXG5cclxucHJvdGVjdGVkIHBhbGV0dGVDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIFBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLlByaW1hcnlDb2xvclBhbGV0dGUgPSBbXTtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuQWNjZW50Q29sb3JQYWxldHRlID0gW107XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLldhcm5Db2xvclBhbGV0dGUgPSBbXTtcclxuICB9XHJcblxyXG4gcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXR1cEZvcm0oKTtcclxuXHJcbiAgICB0aGlzLnBhbGV0dGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNoYW5nZWRcclxuICAgIC5zdWJzY3JpYmUoKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG5cclxuICAgICAgaWYgKCFwYWxldHRlIHx8ICFwYWxldHRlLnByaW1hcnkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudXBkYXRlQWNjZW50Q29sb3IocGFsZXR0ZS5hY2NlbnQubWFpbik7XHJcbiAgICAgIHRoaXMudXBkYXRlUHJpbWFyeUNvbG9yKHBhbGV0dGUucHJpbWFyeS5tYWluKTtcclxuICAgICAgdGhpcy51cGRhdGVXYXJuQ29sb3IocGFsZXR0ZS53YXJuLm1haW4pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnBhbGV0dGVDaGFuZ2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlUHJpbWFyeUNvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuUHJpbWFyeUNvbG9yUGFsZXR0ZSA9IHRoaXMuY29tcHV0ZUNvbG9ycyhjb2xvciA/IGNvbG9yIDogdGhpcy5QcmltYXJ5Q29sb3JDb250cm9sLnZhbHVlKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5QcmltYXJ5Q29sb3JQYWxldHRlKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGAtLXRoZW1lLXByaW1hcnktJHtjLm5hbWV9YDtcclxuICAgICAgY29uc3QgdmFsdWUgPSBjLmhleDtcclxuICAgICAgY29uc3Qga2V5MiA9IGAtLXRoZW1lLXByaW1hcnktY29udHJhc3QtJHtjLm5hbWV9YDtcclxuICAgICAgY29uc3QgdmFsdWUyID0gYy5kYXJrQ29udHJhc3QgPyAncmdiYShibGFjaywgMC44NyknIDogJ3doaXRlJztcclxuXHJcbiAgICAgIC8vIHNldCBvciB1cGRhdGUgQ1NTIHZhcmlhYmxlIHZhbHVlc1xyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXkyLCB2YWx1ZTIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVwZGF0ZUFjY2VudENvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuQWNjZW50Q29sb3JQYWxldHRlID0gdGhpcy5jb21wdXRlQ29sb3JzKGNvbG9yID8gY29sb3IgOiB0aGlzLkFjY2VudENvbG9yQ29udHJvbC52YWx1ZSk7XHJcblxyXG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuQWNjZW50Q29sb3JQYWxldHRlKSB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGAtLXRoZW1lLWFjY2VudC0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGMuaGV4O1xyXG4gICAgICBjb25zdCBrZXkyID0gYC0tdGhlbWUtcHJpbWFyeS1jb250cmFzdC0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZTIgPSBjLmRhcmtDb250cmFzdCA/ICdyZ2JhKGJsYWNrLCAwLjg3KScgOiAnd2hpdGUnO1xyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXkyLCB2YWx1ZTIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVwZGF0ZVdhcm5Db2xvcihjb2xvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLldhcm5Db2xvclBhbGV0dGUgPSB0aGlzLmNvbXB1dGVDb2xvcnMoY29sb3IpO1xyXG5cclxuICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLldhcm5Db2xvclBhbGV0dGUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gYC0tdGhlbWUtd2Fybi0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGMuaGV4O1xyXG4gICAgICBjb25zdCBrZXkyID0gYC0tdGhlbWUtcHJpbWFyeS1jb250cmFzdC0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZTIgPSBjLmRhcmtDb250cmFzdCA/ICdyZ2JhKGJsYWNrLCAwLjg3KScgOiAnd2hpdGUnO1xyXG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXkyLCB2YWx1ZTIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBwcmltYXJ5Q29sb3JDb250cm9sOiBuZXcgRm9ybUNvbnRyb2woJyNmZmNjMTEnKSxcclxuICAgICAgYWNjZW50Q29sb3JDb250cm9sOiBuZXcgRm9ybUNvbnRyb2woJyMwMDAwYWEnKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29tcHV0ZUNvbG9ycyhjb2xvcjogc3RyaW5nKTogQXJyYXk8Q29sb3JNb2RlbD4ge1xyXG5cclxuICAgIGNvbnN0IGJhc2VMaWdodENvbG9yID0gdGlueUNvbG9yKCcjZmZmZmZmJyk7XHJcbiAgICBjb25zdCBiYXNlRGFya0NvbG9yID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLm11bHRpcGx5KHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSwgdGlueUNvbG9yKGNvbG9yKS50b1JnYigpKTtcclxuICAgIGNvbnN0IFssICwgLCBiYXNlVGV0cmFkXSA9IHRpbnlDb2xvcihjb2xvcikudGV0cmFkKCk7XHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VMaWdodENvbG9yLCB0aW55Q29sb3IoY29sb3IpLCAxMiksICc1MCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDMwKSwgJzEwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDUwKSwgJzIwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDcwKSwgJzMwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDg1KSwgJzQwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvcihjb2xvciksICc1MDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIHRpbnlDb2xvcihjb2xvciksIDg3KSwgJzYwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNzApLCAnNzAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA1NCksICc4MDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIHRpbnlDb2xvcihjb2xvciksIDI1KSwgJzkwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDgwKS5saWdodGVuKDY1KSwgJ0ExMDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIGJhc2VUZXRyYWQsIDE1KS5zYXR1cmF0ZSg4MCkubGlnaHRlbig1NSksICdBMjAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCBiYXNlVGV0cmFkLCAxNSkuc2F0dXJhdGUoMTAwKS5saWdodGVuKDQ1KSwgJ0E0MDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIGJhc2VUZXRyYWQsIDE1KS5zYXR1cmF0ZSgxMDApLmxpZ2h0ZW4oNDApLCAnQTcwMCcpXHJcbiAgICBdO1xyXG4gIH1cclxuLy8gZm9yY2UgY2hhbmdlXHJcbiAgcHJvdGVjdGVkIGdldENvbG9yT2JqZWN0KHZhbHVlOiB0aW55Y29sb3IuSW5zdGFuY2UsIG5hbWU6IHN0cmluZyk6IENvbG9yTW9kZWwge1xyXG4gICAgY29uc3QgYyA9IHRpbnlDb2xvcih2YWx1ZSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBoZXg6IGMudG9IZXhTdHJpbmcoKSxcclxuICAgICAgZGFya0NvbnRyYXN0OiBjLmlzTGlnaHQoKVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19