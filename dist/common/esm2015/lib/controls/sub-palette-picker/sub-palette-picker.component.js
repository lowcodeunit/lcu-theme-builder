import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Constants } from '../../utils/constants.utils';
import { PalettePickerService } from '../../services/palette-picker.service';
export class SubPalettePickerComponent {
    constructor(themeBuilderService, palettePickerService) {
        this.themeBuilderService = themeBuilderService;
        this.palettePickerService = palettePickerService;
        this.Unlocked = new FormControl(false);
        this.materialKeys = [...Object.keys(Constants.MIX_AMOUNTS_PRIMARY),
            ...Object.keys(Constants.MIX_AMOUNTS_SECONDARY)];
    }
    set ColorPickerColor(val) {
        this.Main.setValue(val);
        this.onMainChange();
    }
    /**
     * Access Main color form control
     */
    get Main() {
        return this.Form.get('main');
    }
    /**
     * Access Light color form control
     */
    get Lighter() {
        return this.Form.get('lighter');
    }
    /**
     * Access Dark color form control
     */
    get Darker() {
        return this.Form.get('darker');
    }
    /**
     * Set preset color palette
     */
    get Variants() {
        return !this.themeBuilderService.MaterialPaletteColors ? undefined :
            this.materialKeys.map((x) => {
                return this.themeBuilderService.MaterialPaletteColors[x];
            });
    }
    ngOnInit() {
        if (this.Main.value) {
            this.onMainChange();
        }
        this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
            .subscribe((val) => {
            this.onMainChange();
        });
    }
    ngOnDestroy() {
        this.palettePickerChangedSubscription.unsubscribe();
        this.colorPickerClosedSubscription.unsubscribe();
    }
    /**
     * Returns palette colors, 50 - A700
     *
     * @param color selected base color, chosen from color pickers
     */
    onMainChange() {
        this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(this.Form.value.main);
        // set lightest and darkest hue colors in color picker
        if (!this.Unlocked.value) {
            this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
            this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
        }
    }
}
SubPalettePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-sub-palette-picker',
                template: "\r\n<div fxLayout=\"column\">\r\n    <!--Main Color-->\r\n    <lcu-color-picker\r\n      class=\"main\" \r\n      [control]=\"Main\"></lcu-color-picker>\r\n  \r\n    <div fxLayout=\"row\">\r\n      <!--Light and dark colors for additional hues-->\r\n      <lcu-color-picker \r\n        class=\"lighter\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Lighter\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n  \r\n      <lcu-color-picker \r\n        class=\"darker\" \r\n        [disabled]=\"!Unlocked.value\" \r\n        [control]=\"Darker\" \r\n        [variants]=\"Variants\"></lcu-color-picker>\r\n    </div>\r\n  </div>\r\n  ",
                styles: [".darker,.lighter,.main{border:.5px solid #ddd}.darker,.lighter{height:40px}.main{height:60px}"]
            },] }
];
SubPalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];
SubPalettePickerComponent.propDecorators = {
    Form: [{ type: Input, args: ['form',] }],
    ColorPickerColor: [{ type: Input, args: ['color-picker-color',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLXBhbGV0dGUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3N1Yi1wYWxldHRlLXBpY2tlci9zdWItcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBOEIsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBUTdFLE1BQU0sT0FBTyx5QkFBeUI7SUEyRHBDLFlBQXNCLG1CQUF3QyxFQUNsRCxvQkFBMEM7UUFEaEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUNsRCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUM7WUFDN0MsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQTFERCxJQUNXLGdCQUFnQixDQUFDLEdBQVc7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBU0Q7O09BRUc7SUFDSCxJQUFXLFFBQVE7UUFFakIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRTtnQkFFbEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBZ0JNLFFBQVE7UUFFYixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBRWhCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxZQUFZO1FBRXBCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNHLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0gsQ0FBQzs7O1lBdkdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxrcUJBQWtEOzthQUVuRDs7O1lBVlEsbUJBQW1CO1lBR25CLG9CQUFvQjs7O21CQVcxQixLQUFLLFNBQUMsTUFBTTsrQkFHWixLQUFLLFNBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS1zdWItcGFsZXR0ZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdWItcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N1Yi1wYWxldHRlLXBpY2tlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdWJQYWxldHRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdmb3JtJylcclxuICBwdWJsaWMgRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBASW5wdXQoJ2NvbG9yLXBpY2tlci1jb2xvcicpXHJcbiAgcHVibGljIHNldCBDb2xvclBpY2tlckNvbG9yKHZhbDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLk1haW4uc2V0VmFsdWUodmFsKTtcclxuICAgIHRoaXMub25NYWluQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgTWFpbiBjb2xvciBmb3JtIGNvbnRyb2xcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IE1haW4oKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdtYWluJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgTGlnaHQgY29sb3IgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBMaWdodGVyKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnbGlnaHRlcicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIERhcmsgY29sb3IgZm9ybSBjb250cm9sXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBEYXJrZXIoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdkYXJrZXInKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjb2xvclBpY2tlckNsb3NlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgY29udHJvbCBmb3IgbGlnaHQgYW5kIGRhcmsgY29sb3JzXHJcbiAgICovXHJcbiAgcHVibGljIFVubG9ja2VkOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHByZXNldCBjb2xvciBwYWxldHRlXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBWYXJpYW50cygpOiBBcnJheTx7IGtleTogc3RyaW5nOyBoZXg6IHN0cmluZzsgaXNMaWdodDogYm9vbGVhbjsgfT4ge1xyXG5cclxuICAgIHJldHVybiAhdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsUGFsZXR0ZUNvbG9ycyA/IHVuZGVmaW5lZCA6XHJcbiAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxLZXlzLm1hcCgoeDogc3RyaW5nKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5NYXRlcmlhbFBhbGV0dGVDb2xvcnNbeF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlckNoYW5nZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogS2V5cyBmb3IgcGFsZXR0ZSBjb2xvcnMsIDUwIC0gQTcwMFxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBtYXRlcmlhbEtleXM6IEFycmF5PHN0cmluZz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSkge1xyXG4gICAgdGhpcy5VbmxvY2tlZCA9IG5ldyBGb3JtQ29udHJvbChmYWxzZSk7XHJcbiAgICB0aGlzLm1hdGVyaWFsS2V5cyA9IFsuLi5PYmplY3Qua2V5cyhDb25zdGFudHMuTUlYX0FNT1VOVFNfUFJJTUFSWSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAuLi5PYmplY3Qua2V5cyhDb25zdGFudHMuTUlYX0FNT1VOVFNfU0VDT05EQVJZKV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHRoaXMuTWFpbi52YWx1ZSkge1xyXG4gICAgIHRoaXMub25NYWluQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb2xvclBpY2tlckNsb3NlZFN1YnNjcmlwdGlvbiA9IHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuQ29sb3JQaWNrZXJDbG9zZWRcclxuICAgIC5zdWJzY3JpYmUoKHZhbDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMub25NYWluQ2hhbmdlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLnBhbGV0dGVQaWNrZXJDaGFuZ2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLmNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHBhbGV0dGUgY29sb3JzLCA1MCAtIEE3MDBcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb2xvciBzZWxlY3RlZCBiYXNlIGNvbG9yLCBjaG9zZW4gZnJvbSBjb2xvciBwaWNrZXJzXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG9uTWFpbkNoYW5nZSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxQYWxldHRlQ29sb3JzID0gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLkdldFBhbGV0dGUodGhpcy5Gb3JtLnZhbHVlLm1haW4pO1xyXG5cclxuICAgIC8vIHNldCBsaWdodGVzdCBhbmQgZGFya2VzdCBodWUgY29sb3JzIGluIGNvbG9yIHBpY2tlclxyXG4gICAgaWYgKCF0aGlzLlVubG9ja2VkLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuRm9ybS5wYXRjaFZhbHVlKHsgbGlnaHRlcjogdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsUGFsZXR0ZUNvbG9yc1snNTAnXSB9KTtcclxuICAgICAgdGhpcy5Gb3JtLnBhdGNoVmFsdWUoeyBkYXJrZXI6IHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5NYXRlcmlhbFBhbGV0dGVDb2xvcnNbJzkwMCddIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=