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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb2xvcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdmFyaWFudC1jb2xvcnMvdmFyaWFudC1jb2xvcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sS0FBSyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBT3hDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRzNFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQWM1QixNQUFNLE9BQU8sc0JBQXNCO0lBNERqQyxZQUNTLG9CQUEwQyxFQUN2QyxtQkFBd0M7UUFEM0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUN2Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUE1REgsMkNBQTJDO0lBQzNDLElBQ0ksV0FBVyxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FB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QUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQy9FLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDL0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUM7WUFDOUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQzlFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUM5RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNsRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNuRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztTQUNwRyxDQUFDO0lBQ0osQ0FBQztJQUNILGVBQWU7SUFDSCxjQUFjLENBQUMsS0FBeUIsRUFBRSxJQUFZO1FBQzlELE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPO1lBQ0wsSUFBSTtZQUNKLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3BCLFlBQVksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFO1NBQzFCLENBQUM7SUFDSixDQUFDOzs7WUE3S0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDhsRUFBOEM7O2FBRS9DOzs7WUF6QlEsb0JBQW9CO1lBVXBCLG1CQUFtQjs7OzBCQXdCM0IsS0FBSyxTQUFDLGNBQWM7MkJBV3BCLEtBQUssU0FBQyxlQUFlO3dCQVdyQixLQUFLLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtdGVtcGxhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFBhbGV0dGVDb2xvck1hcE1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUtY29sb3ItbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgTWF0ZXJpYWxQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWF0ZXJpYWwtcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb2xvck1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbG9yLm1vZGVsJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuLy8gY29uc3Qgc3R5bGVWYXJpYWJsZXMgPSByZXF1aXJlKCcuL2Fzc2V0cy9zdHlsZXMvZHluYW1pYy10aGVtZS5zY3NzJyk7XHJcblxyXG4vKipcclxuICogU3RyaW5nIGxpdGVyYWwgZGF0YSB0eXBlXHJcbiAqL1xyXG50eXBlIE1vZGVUeXBlID0gJ2RhcmsnIHwgJ2xpZ2h0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXZhcmlhbnQtY29sb3JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmFyaWFudC1jb2xvcnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWYXJpYW50Q29sb3JzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIF9hY2NlbnRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ByaW1hcnlDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3dhcm5Db2xvcjogc3RyaW5nO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG5ASW5wdXQoJ2FjY2VudC1jb2xvcicpXHJcbnNldCBBY2NlbnRDb2xvcih2YWw6IHN0cmluZykge1xyXG4gIHRoaXMuX2FjY2VudENvbG9yID0gdmFsO1xyXG4gIHRoaXMudXBkYXRlQWNjZW50Q29sb3IodmFsKTtcclxufVxyXG5cclxuZ2V0IEFjY2VudENvbG9yKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRoaXMuX2FjY2VudENvbG9yO1xyXG59XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbkBJbnB1dCgncHJpbWFyeS1jb2xvcicpXHJcbnNldCBQcmltYXJ5Q29sb3IodmFsOiBzdHJpbmcpIHtcclxuICB0aGlzLl9wcmltYXJ5Q29sb3IgPSB2YWw7XHJcbiAgdGhpcy51cGRhdGVQcmltYXJ5Q29sb3IodmFsKTtcclxufVxyXG5cclxuZ2V0IFByaW1hcnlDb2xvcigpOiBzdHJpbmcge1xyXG4gIHJldHVybiB0aGlzLlByaW1hcnlDb2xvcjtcclxufVxyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG5ASW5wdXQoJ3dhcm4tY29sb3InKVxyXG5zZXQgV2FybkNvbG9yKHZhbDogc3RyaW5nKSB7XHJcbiAgdGhpcy5fd2FybkNvbG9yID0gdmFsO1xyXG4gIHRoaXMudXBkYXRlV2FybkNvbG9yKHZhbCk7XHJcbn1cclxuXHJcbmdldCBXYXJuQ29sb3IoKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGhpcy5XYXJuQ29sb3I7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBY2Nlc3MgcHJpbWFyeSBjb2xvciBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBQcmltYXJ5Q29sb3JDb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3ByaW1hcnlDb2xvckNvbnRyb2wnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBhY2NlbnQgY29sb3IgZmllbGRcclxuICovXHJcbnB1YmxpYyBnZXQgQWNjZW50Q29sb3JDb250cm9sKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ2FjY2VudENvbG9yQ29udHJvbCcpO1xyXG59XHJcblxyXG4vKipcclxuICogcHJvcGVydHkgZm9yIHJlYWN0aXZlIGZvcm1cclxuICovXHJcbnB1YmxpYyBGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG5wcm90ZWN0ZWQgcGFsZXR0ZUNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgUGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UpIHtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuUHJpbWFyeUNvbG9yUGFsZXR0ZSA9IFtdO1xyXG4gICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGUgPSBbXTtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuV2FybkNvbG9yUGFsZXR0ZSA9IFtdO1xyXG4gIH1cclxuXHJcbiBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG5cclxuICAgIHRoaXMucGFsZXR0ZUNoYW5nZWRTdWJzY3JpcHRpb24gPSB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLkNvbG9yUGlja2VyQ2hhbmdlZFxyXG4gICAgLnN1YnNjcmliZSgocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcblxyXG4gICAgICBpZiAoIXBhbGV0dGUgfHwgIXBhbGV0dGUucHJpbWFyeSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy51cGRhdGVBY2NlbnRDb2xvcihwYWxldHRlLmFjY2VudC5tYWluKTtcclxuICAgICAgdGhpcy51cGRhdGVQcmltYXJ5Q29sb3IocGFsZXR0ZS5wcmltYXJ5Lm1haW4pO1xyXG4gICAgICB0aGlzLnVwZGF0ZVdhcm5Db2xvcihwYWxldHRlLndhcm4ubWFpbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucGFsZXR0ZUNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVQcmltYXJ5Q29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5QcmltYXJ5Q29sb3JQYWxldHRlID0gdGhpcy5jb21wdXRlQ29sb3JzKGNvbG9yID8gY29sb3IgOiB0aGlzLlByaW1hcnlDb2xvckNvbnRyb2wudmFsdWUpO1xyXG5cclxuICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLlByaW1hcnlDb2xvclBhbGV0dGUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gYC0tdGhlbWUtcHJpbWFyeS0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IGMuaGV4O1xyXG4gICAgICBjb25zdCBrZXkyID0gYC0tdGhlbWUtcHJpbWFyeS1jb250cmFzdC0ke2MubmFtZX1gO1xyXG4gICAgICBjb25zdCB2YWx1ZTIgPSBjLmRhcmtDb250cmFzdCA/ICdyZ2JhKGJsYWNrLCAwLjg3KScgOiAnd2hpdGUnO1xyXG5cclxuICAgICAgLy8gc2V0IG9yIHVwZGF0ZSBDU1MgdmFyaWFibGUgdmFsdWVzXHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlQWNjZW50Q29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGUgPSB0aGlzLmNvbXB1dGVDb2xvcnMoY29sb3IgPyBjb2xvciA6IHRoaXMuQWNjZW50Q29sb3JDb250cm9sLnZhbHVlKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5BY2NlbnRDb2xvclBhbGV0dGUpIHtcclxuICAgICAgY29uc3Qga2V5ID0gYC0tdGhlbWUtYWNjZW50LSR7Yy5uYW1lfWA7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYy5oZXg7XHJcbiAgICAgIGNvbnN0IGtleTIgPSBgLS10aGVtZS1wcmltYXJ5LWNvbnRyYXN0LSR7Yy5uYW1lfWA7XHJcbiAgICAgIGNvbnN0IHZhbHVlMiA9IGMuZGFya0NvbnRyYXN0ID8gJ3JnYmEoYmxhY2ssIDAuODcpJyA6ICd3aGl0ZSc7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlV2FybkNvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuV2FybkNvbG9yUGFsZXR0ZSA9IHRoaXMuY29tcHV0ZUNvbG9ycyhjb2xvcik7XHJcblxyXG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuV2FybkNvbG9yUGFsZXR0ZSkge1xyXG4gICAgICBjb25zdCBrZXkgPSBgLS10aGVtZS13YXJuLSR7Yy5uYW1lfWA7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gYy5oZXg7XHJcbiAgICAgIGNvbnN0IGtleTIgPSBgLS10aGVtZS1wcmltYXJ5LWNvbnRyYXN0LSR7Yy5uYW1lfWA7XHJcbiAgICAgIGNvbnN0IHZhbHVlMiA9IGMuZGFya0NvbnRyYXN0ID8gJ3JnYmEoYmxhY2ssIDAuODcpJyA6ICd3aGl0ZSc7XHJcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlKTtcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleTIsIHZhbHVlMik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0dXBGb3JtKCk6IHZvaWQge1xyXG4gICAgdGhpcy5Gb3JtID0gbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgIHByaW1hcnlDb2xvckNvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgnI2ZmY2MxMScpLFxyXG4gICAgICBhY2NlbnRDb2xvckNvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgnIzAwMDBhYScpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjb21wdXRlQ29sb3JzKGNvbG9yOiBzdHJpbmcpOiBBcnJheTxDb2xvck1vZGVsPiB7XHJcblxyXG4gICAgY29uc3QgYmFzZUxpZ2h0Q29sb3IgPSB0aW55Q29sb3IoJyNmZmZmZmYnKTtcclxuICAgIGNvbnN0IGJhc2VEYXJrQ29sb3IgPSB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UubXVsdGlwbHkodGlueUNvbG9yKGNvbG9yKS50b1JnYigpLCB0aW55Q29sb3IoY29sb3IpLnRvUmdiKCkpO1xyXG4gICAgY29uc3QgWywgLCAsIGJhc2VUZXRyYWRdID0gdGlueUNvbG9yKGNvbG9yKS50ZXRyYWQoKTtcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZUxpZ2h0Q29sb3IsIHRpbnlDb2xvcihjb2xvciksIDEyKSwgJzUwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgMzApLCAnMTAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNTApLCAnMjAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNzApLCAnMzAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgODUpLCAnNDAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yKGNvbG9yKSwgJzUwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgODcpLCAnNjAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA3MCksICc3MDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIHRpbnlDb2xvcihjb2xvciksIDU0KSwgJzgwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgMjUpLCAnOTAwJyksXHJcbiAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCBiYXNlVGV0cmFkLCAxNSkuc2F0dXJhdGUoODApLmxpZ2h0ZW4oNjUpLCAnQTEwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDgwKS5saWdodGVuKDU1KSwgJ0EyMDAnKSxcclxuICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIGJhc2VUZXRyYWQsIDE1KS5zYXR1cmF0ZSgxMDApLmxpZ2h0ZW4oNDUpLCAnQTQwMCcpLFxyXG4gICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDEwMCkubGlnaHRlbig0MCksICdBNzAwJylcclxuICAgIF07XHJcbiAgfVxyXG4vLyBmb3JjZSBjaGFuZ2VcclxuICBwcm90ZWN0ZWQgZ2V0Q29sb3JPYmplY3QodmFsdWU6IHRpbnljb2xvci5JbnN0YW5jZSwgbmFtZTogc3RyaW5nKTogQ29sb3JNb2RlbCB7XHJcbiAgICBjb25zdCBjID0gdGlueUNvbG9yKHZhbHVlKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWUsXHJcbiAgICAgIGhleDogYy50b0hleFN0cmluZygpLFxyXG4gICAgICBkYXJrQ29udHJhc3Q6IGMuaXNMaWdodCgpXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=