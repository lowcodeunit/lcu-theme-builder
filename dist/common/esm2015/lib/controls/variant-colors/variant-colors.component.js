import { VariantColorService } from './../../services/variant-color.service';
import { PalettePickerService } from '../../services/palette-picker.service';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { ThemeBuilderService } from '../../services/theme-builder.service';
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
            if (!palette || !palette.Primary) {
                return;
            }
            this.variantColorService.UpdatePrimaryVariants(palette.Primary.Main);
            this.variantColorService.UpdateAccentVariants(palette.Accent.Main);
            this.variantColorService.UpdateWarnVariants(palette.Warn.Main);
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
VariantColorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-variant-colors',
                template: "<form\r\n    fxLayout=\"column\"\r\n    fxLayoutGap=\"10px\"\r\n    [formGroup]=\"Form\"\r\n    novalidate>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\" \r\n            *ngFor=\"let color of PalettePickerService.PrimaryColorPalette\" \r\n            [style.background-color]=\"color.hex\" \r\n            [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n            <div>\r\n                {{color.name}}\r\n            </div>\r\n            <div>\r\n                {{color.hex}}\r\n            </div>\r\n        </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n                fxLayoutAlign=\"space-between center\"\r\n                class=\"padding-left-2 padding-right-2\"\r\n                *ngFor=\"let color of PalettePickerService.AccentColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div fxFlex=\"33\" fxLayout=\"column\">\r\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" \r\n            fxLayoutAlign=\"space-between center\"\r\n            class=\"padding-left-2 padding-right-2\"\r\n            *ngFor=\"let color of PalettePickerService.WarnColorPalette\" \r\n                [style.background-color]=\"color.hex\" \r\n                [style.color]=\"color.darkContrast ? 'black' : 'white'\">\r\n                <div>\r\n                    {{color.name}}\r\n                </div>\r\n                <div>\r\n                    {{color.hex}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
VariantColorsComponent.ctorParameters = () => [
    { type: PalettePickerService },
    { type: ThemeBuilderService },
    { type: VariantColorService }
];
VariantColorsComponent.propDecorators = {
    AccentColor: [{ type: Input, args: ['accent-color',] }],
    PrimaryColor: [{ type: Input, args: ['primary-color',] }],
    WarnColor: [{ type: Input, args: ['warn-color',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb2xvcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdmFyaWFudC1jb2xvcnMvdmFyaWFudC1jb2xvcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQW1CLFdBQVcsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sS0FBSyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBTXhDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRzNFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQWU1QixNQUFNLE9BQU8sc0JBQXNCO0lBK0RqQyxZQUNTLG9CQUEwQyxFQUN2QyxtQkFBd0MsRUFDeEMsbUJBQXdDO1FBRjNDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDdkMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFoRUgsMkNBQTJDO0lBQzNDLElBQ0ksV0FBVyxDQUFDLEdBQVc7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFDSSxZQUFZLENBQUMsR0FBVztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxJQUNJLFNBQVMsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLG1CQUFtQjtRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxrQkFBa0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFrQk8sUUFBUTtRQUNaLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQjthQUM3RSxTQUFTLENBQUMsQ0FBQyxPQUFxQixFQUFFLEVBQUU7WUFFbkMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hDLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELCtDQUErQztZQUMvQyxpREFBaUQ7WUFDakQsMkNBQTJDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFFSCx3REFBd0Q7SUFDeEQsMEhBQTBIO0lBRTFILHVFQUF1RTtJQUN2RSxpREFBaUQ7SUFDakQsNkJBQTZCO0lBQzdCLDJEQUEyRDtJQUMzRCx1RUFBdUU7SUFFdkUsNkNBQTZDO0lBQzdDLGdFQUFnRTtJQUNoRSxrRUFBa0U7SUFDbEUsUUFBUTtJQUNSLE1BQU07SUFFTix1REFBdUQ7SUFDdkQsd0hBQXdIO0lBRXhILHNFQUFzRTtJQUN0RSxnREFBZ0Q7SUFDaEQsNkJBQTZCO0lBQzdCLDJEQUEyRDtJQUMzRCx1RUFBdUU7SUFDdkUsZ0VBQWdFO0lBQ2hFLGtFQUFrRTtJQUNsRSxRQUFRO0lBQ1IsTUFBTTtJQUVOLHFEQUFxRDtJQUNyRCw4RUFBOEU7SUFFOUUsb0VBQW9FO0lBQ3BFLDhDQUE4QztJQUM5Qyw2QkFBNkI7SUFDN0IsMkRBQTJEO0lBQzNELHVFQUF1RTtJQUN2RSxnRUFBZ0U7SUFDaEUsa0VBQWtFO0lBQ2xFLFFBQVE7SUFDUixNQUFNO0lBRU0sU0FBUztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3hCLG1CQUFtQixFQUFFLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUMvQyxrQkFBa0IsRUFBRSxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBbkpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw4bEVBQThDOzthQUUvQzs7O1lBekJRLG9CQUFvQjtZQVNwQixtQkFBbUI7WUFYbkIsbUJBQW1COzs7MEJBb0MzQixLQUFLLFNBQUMsY0FBYzsyQkFZcEIsS0FBSyxTQUFDLGVBQWU7d0JBWXJCLEtBQUssU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmFyaWFudENvbG9yU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdmFyaWFudC1jb2xvci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5pbXBvcnQgeyBQYWxldHRlVGVtcGxhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgUGFsZXR0ZUNvbG9yTWFwTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS1jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFBhbGV0dGVNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9tYXRlcmlhbC1wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbG9yTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvY29sb3IubW9kZWwnO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG5cclxuLy8gY29uc3Qgc3R5bGVWYXJpYWJsZXMgPSByZXF1aXJlKCcuL2Fzc2V0cy9zdHlsZXMvZHluYW1pYy10aGVtZS5zY3NzJyk7XHJcblxyXG4vKipcclxuICogU3RyaW5nIGxpdGVyYWwgZGF0YSB0eXBlXHJcbiAqL1xyXG50eXBlIE1vZGVUeXBlID0gJ2RhcmsnIHwgJ2xpZ2h0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXZhcmlhbnQtY29sb3JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmFyaWFudC1jb2xvcnMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBWYXJpYW50Q29sb3JzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIF9hY2NlbnRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ByaW1hcnlDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3dhcm5Db2xvcjogc3RyaW5nO1xyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG5ASW5wdXQoJ2FjY2VudC1jb2xvcicpXHJcbnNldCBBY2NlbnRDb2xvcih2YWw6IHN0cmluZykge1xyXG4gIHRoaXMuX2FjY2VudENvbG9yID0gdmFsO1xyXG4gIC8vIHRoaXMudXBkYXRlQWNjZW50Q29sb3IodmFsKTtcclxuICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHModmFsKTtcclxufVxyXG5cclxuZ2V0IEFjY2VudENvbG9yKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHRoaXMuX2FjY2VudENvbG9yO1xyXG59XHJcblxyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbkBJbnB1dCgncHJpbWFyeS1jb2xvcicpXHJcbnNldCBQcmltYXJ5Q29sb3IodmFsOiBzdHJpbmcpIHtcclxuICB0aGlzLl9wcmltYXJ5Q29sb3IgPSB2YWw7XHJcbiAgLy8gdGhpcy51cGRhdGVQcmltYXJ5Q29sb3IodmFsKTtcclxuICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlUHJpbWFyeVZhcmlhbnRzKHZhbCk7XHJcbn1cclxuXHJcbmdldCBQcmltYXJ5Q29sb3IoKTogc3RyaW5nIHtcclxuICByZXR1cm4gdGhpcy5QcmltYXJ5Q29sb3I7XHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuQElucHV0KCd3YXJuLWNvbG9yJylcclxuc2V0IFdhcm5Db2xvcih2YWw6IHN0cmluZykge1xyXG4gIHRoaXMuX3dhcm5Db2xvciA9IHZhbDtcclxuICAvLyB0aGlzLnVwZGF0ZVdhcm5Db2xvcih2YWwpO1xyXG4gIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHModmFsKTtcclxufVxyXG5cclxuZ2V0IFdhcm5Db2xvcigpOiBzdHJpbmcge1xyXG4gIHJldHVybiB0aGlzLldhcm5Db2xvcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFjY2VzcyBwcmltYXJ5IGNvbG9yIGZpZWxkXHJcbiAqL1xyXG5wdWJsaWMgZ2V0IFByaW1hcnlDb2xvckNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5Gb3JtLmdldCgncHJpbWFyeUNvbG9yQ29udHJvbCcpO1xyXG59XHJcblxyXG4vKipcclxuICogQWNjZXNzIGFjY2VudCBjb2xvciBmaWVsZFxyXG4gKi9cclxucHVibGljIGdldCBBY2NlbnRDb2xvckNvbnRyb2woKTogQWJzdHJhY3RDb250cm9sIHtcclxuICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnYWNjZW50Q29sb3JDb250cm9sJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBwcm9wZXJ0eSBmb3IgcmVhY3RpdmUgZm9ybVxyXG4gKi9cclxucHVibGljIEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbnByb3RlY3RlZCBwYWxldHRlQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBQYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YXJpYW50Q29sb3JTZXJ2aWNlOiBWYXJpYW50Q29sb3JTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLlByaW1hcnlDb2xvclBhbGV0dGUgPSBbXTtcclxuICAgIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuQWNjZW50Q29sb3JQYWxldHRlID0gW107XHJcbiAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLldhcm5Db2xvclBhbGV0dGUgPSBbXTtcclxuICB9XHJcblxyXG4gcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXR1cEZvcm0oKTtcclxuXHJcbiAgICB0aGlzLnBhbGV0dGVDaGFuZ2VkU3Vic2NyaXB0aW9uID0gdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNoYW5nZWRcclxuICAgIC5zdWJzY3JpYmUoKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG5cclxuICAgICAgaWYgKCFwYWxldHRlIHx8ICFwYWxldHRlLlByaW1hcnkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVQcmltYXJ5VmFyaWFudHMocGFsZXR0ZS5QcmltYXJ5Lk1haW4pO1xyXG4gICAgICB0aGlzLnZhcmlhbnRDb2xvclNlcnZpY2UuVXBkYXRlQWNjZW50VmFyaWFudHMocGFsZXR0ZS5BY2NlbnQuTWFpbik7XHJcbiAgICAgIHRoaXMudmFyaWFudENvbG9yU2VydmljZS5VcGRhdGVXYXJuVmFyaWFudHMocGFsZXR0ZS5XYXJuLk1haW4pO1xyXG4gICAgICAvLyB0aGlzLnVwZGF0ZUFjY2VudENvbG9yKHBhbGV0dGUuYWNjZW50Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLnVwZGF0ZVByaW1hcnlDb2xvcihwYWxldHRlLnByaW1hcnkubWFpbik7XHJcbiAgICAgIC8vIHRoaXMudXBkYXRlV2FybkNvbG9yKHBhbGV0dGUud2Fybi5tYWluKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYWxldHRlQ2hhbmdlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbi8vICAgcHJvdGVjdGVkIHVwZGF0ZVByaW1hcnlDb2xvcihjb2xvcjogc3RyaW5nKTogdm9pZCB7XHJcbi8vICAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLlByaW1hcnlDb2xvclBhbGV0dGUgPSB0aGlzLmNvbXB1dGVDb2xvcnMoY29sb3IgPyBjb2xvciA6IHRoaXMuUHJpbWFyeUNvbG9yQ29udHJvbC52YWx1ZSk7XHJcblxyXG4vLyAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuUGFsZXR0ZVBpY2tlclNlcnZpY2UuUHJpbWFyeUNvbG9yUGFsZXR0ZSkge1xyXG4vLyAgICAgICBjb25zdCBrZXkgPSBgLS10aGVtZS1wcmltYXJ5LSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlID0gYy5oZXg7XHJcbi8vICAgICAgIGNvbnN0IGtleTIgPSBgLS10aGVtZS1wcmltYXJ5LWNvbnRyYXN0LSR7Yy5uYW1lfWA7XHJcbi8vICAgICAgIGNvbnN0IHZhbHVlMiA9IGMuZGFya0NvbnRyYXN0ID8gJ3JnYmEoYmxhY2ssIDAuODcpJyA6ICd3aGl0ZSc7XHJcblxyXG4vLyAgICAgICAvLyBzZXQgb3IgdXBkYXRlIENTUyB2YXJpYWJsZSB2YWx1ZXNcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUpO1xyXG4vLyAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5MiwgdmFsdWUyKTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcblxyXG4vLyAgIHByb3RlY3RlZCB1cGRhdGVBY2NlbnRDb2xvcihjb2xvcjogc3RyaW5nKTogdm9pZCB7XHJcbi8vICAgICB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLkFjY2VudENvbG9yUGFsZXR0ZSA9IHRoaXMuY29tcHV0ZUNvbG9ycyhjb2xvciA/IGNvbG9yIDogdGhpcy5BY2NlbnRDb2xvckNvbnRyb2wudmFsdWUpO1xyXG5cclxuLy8gICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLlBhbGV0dGVQaWNrZXJTZXJ2aWNlLkFjY2VudENvbG9yUGFsZXR0ZSkge1xyXG4vLyAgICAgICBjb25zdCBrZXkgPSBgLS10aGVtZS1hY2NlbnQtJHtjLm5hbWV9YDtcclxuLy8gICAgICAgY29uc3QgdmFsdWUgPSBjLmhleDtcclxuLy8gICAgICAgY29uc3Qga2V5MiA9IGAtLXRoZW1lLXByaW1hcnktY29udHJhc3QtJHtjLm5hbWV9YDtcclxuLy8gICAgICAgY29uc3QgdmFsdWUyID0gYy5kYXJrQ29udHJhc3QgPyAncmdiYShibGFjaywgMC44NyknIDogJ3doaXRlJztcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUpO1xyXG4vLyAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5MiwgdmFsdWUyKTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcblxyXG4vLyAgIHByb3RlY3RlZCB1cGRhdGVXYXJuQ29sb3IoY29sb3I6IHN0cmluZyk6IHZvaWQge1xyXG4vLyAgICAgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5XYXJuQ29sb3JQYWxldHRlID0gdGhpcy5jb21wdXRlQ29sb3JzKGNvbG9yKTtcclxuXHJcbi8vICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5QYWxldHRlUGlja2VyU2VydmljZS5XYXJuQ29sb3JQYWxldHRlKSB7XHJcbi8vICAgICAgIGNvbnN0IGtleSA9IGAtLXRoZW1lLXdhcm4tJHtjLm5hbWV9YDtcclxuLy8gICAgICAgY29uc3QgdmFsdWUgPSBjLmhleDtcclxuLy8gICAgICAgY29uc3Qga2V5MiA9IGAtLXRoZW1lLXByaW1hcnktY29udHJhc3QtJHtjLm5hbWV9YDtcclxuLy8gICAgICAgY29uc3QgdmFsdWUyID0gYy5kYXJrQ29udHJhc3QgPyAncmdiYShibGFjaywgMC44NyknIDogJ3doaXRlJztcclxuLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KGtleSwgdmFsdWUpO1xyXG4vLyAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoa2V5MiwgdmFsdWUyKTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXR1cEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLkZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgcHJpbWFyeUNvbG9yQ29udHJvbDogbmV3IEZvcm1Db250cm9sKCcjZmZjYzExJyksXHJcbiAgICAgIGFjY2VudENvbG9yQ29udHJvbDogbmV3IEZvcm1Db250cm9sKCcjMDAwMGFhJylcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbi8vICAgcHJvdGVjdGVkIGNvbXB1dGVDb2xvcnMoY29sb3I6IHN0cmluZyk6IEFycmF5PENvbG9yTW9kZWw+IHtcclxuXHJcbi8vICAgICBjb25zdCBiYXNlTGlnaHRDb2xvciA9IHRpbnlDb2xvcignI2ZmZmZmZicpO1xyXG4vLyAgICAgY29uc3QgYmFzZURhcmtDb2xvciA9IHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5tdWx0aXBseSh0aW55Q29sb3IoY29sb3IpLnRvUmdiKCksIHRpbnlDb2xvcihjb2xvcikudG9SZ2IoKSk7XHJcbi8vICAgICBjb25zdCBbLCAsICwgYmFzZVRldHJhZF0gPSB0aW55Q29sb3IoY29sb3IpLnRldHJhZCgpO1xyXG5cclxuLy8gICAgIHJldHVybiBbXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlTGlnaHRDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgMTIpLCAnNTAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VMaWdodENvbG9yLCB0aW55Q29sb3IoY29sb3IpLCAzMCksICcxMDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VMaWdodENvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA1MCksICcyMDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VMaWdodENvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA3MCksICczMDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VMaWdodENvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA4NSksICc0MDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IoY29sb3IpLCAnNTAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCB0aW55Q29sb3IoY29sb3IpLCA4NyksICc2MDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIHRpbnlDb2xvcihjb2xvciksIDcwKSwgJzcwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgdGlueUNvbG9yKGNvbG9yKSwgNTQpLCAnODAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCB0aW55Q29sb3IoY29sb3IpLCAyNSksICc5MDAnKSxcclxuLy8gICAgICAgdGhpcy5nZXRDb2xvck9iamVjdCh0aW55Q29sb3IubWl4KGJhc2VEYXJrQ29sb3IsIGJhc2VUZXRyYWQsIDE1KS5zYXR1cmF0ZSg4MCkubGlnaHRlbig2NSksICdBMTAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCBiYXNlVGV0cmFkLCAxNSkuc2F0dXJhdGUoODApLmxpZ2h0ZW4oNTUpLCAnQTIwMCcpLFxyXG4vLyAgICAgICB0aGlzLmdldENvbG9yT2JqZWN0KHRpbnlDb2xvci5taXgoYmFzZURhcmtDb2xvciwgYmFzZVRldHJhZCwgMTUpLnNhdHVyYXRlKDEwMCkubGlnaHRlbig0NSksICdBNDAwJyksXHJcbi8vICAgICAgIHRoaXMuZ2V0Q29sb3JPYmplY3QodGlueUNvbG9yLm1peChiYXNlRGFya0NvbG9yLCBiYXNlVGV0cmFkLCAxNSkuc2F0dXJhdGUoMTAwKS5saWdodGVuKDQwKSwgJ0E3MDAnKVxyXG4vLyAgICAgXTtcclxuLy8gICB9XHJcbi8vIC8vIGZvcmNlIGNoYW5nZVxyXG4vLyAgIHByb3RlY3RlZCBnZXRDb2xvck9iamVjdCh2YWx1ZTogdGlueWNvbG9yLkluc3RhbmNlLCBuYW1lOiBzdHJpbmcpOiBDb2xvck1vZGVsIHtcclxuLy8gICAgIGNvbnN0IGMgPSB0aW55Q29sb3IodmFsdWUpO1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgbmFtZSxcclxuLy8gICAgICAgaGV4OiBjLnRvSGV4U3RyaW5nKCksXHJcbi8vICAgICAgIGRhcmtDb250cmFzdDogYy5pc0xpZ2h0KClcclxuLy8gICAgIH07XHJcbi8vICAgfVxyXG59XHJcbiJdfQ==