import { Constants } from './../../utils/constants.utils';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { PaletteModel } from '../../models/palette.model';
import { PalettePickerService } from '../../services/palette-picker.service';
import { distinctUntilChanged } from 'rxjs/operators';
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
        this.patchValue(Constants.InitialValues, true);
        this.Form.valueChanges
            .pipe(distinctUntilChanged((a, b) => {
            //  console.log('A', a);
            //  console.log('B', b);
            return JSON.stringify(a) !== JSON.stringify(b);
        }))
            .subscribe((palette) => {
            console.log('ASKASLKDALKSD', palette);
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
PalettePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-palette-picker',
                template: "<div \r\n  fxLayout=\"column\" \r\n  fxLayoutGap=\"10px\">\r\n  <div \r\n    fxLayout.lg=\"row\" \r\n    fxLayout.md=\"row\" \r\n    fxLayout.sm=\"column\" \r\n    fxLayout.xs=\"column\"\r\n    fxLayoutGap=\"10px\">\r\n    <lcu-sub-palette-picker [color-picker-color]=\"PrimaryColor\" [form]=\"Primary\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"AccentColor\" [form]=\"Accent\"></lcu-sub-palette-picker>\r\n    <lcu-sub-palette-picker [color-picker-color]=\"WarnColor\" [form]=\"Warn\"></lcu-sub-palette-picker>\r\n  </div>\r\n  <lcu-variant-colors></lcu-variant-colors>\r\n</div>\r\n",
                styles: [""]
            },] }
];
PalettePickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService },
    { type: PalettePickerService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQW1CLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPdEQsTUFBTSxPQUFPLHNCQUFzQjtJQW1DakMsWUFBc0IsbUJBQXdDLEVBQ3hDLG9CQUEwQztRQUQxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFFOUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILG1EQUFtRDtRQUNuRCwwQ0FBMEM7UUFDMUMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0I7YUFDM0MsU0FBUyxDQUFDLENB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LElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQzthQUM1QixFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLFNBQVMsQ0FBQztnQkFDcEIsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQzthQUM1QixDQUFDO1lBQ0YsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDO2dCQUNsQixJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQzVCLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDeEIsU0FBUyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDbEMsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDeEMsUUFBUSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDakMsY0FBYyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDeEMsRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQWpJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsMG5CQUE4Qzs7YUFFL0M7OztZQVZRLG1CQUFtQjtZQUduQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL2NvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL2ludGVybmFsL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtcGFsZXR0ZS1waWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWxldHRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFsZXR0ZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHVibGljIEZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgcHJvdGVjdGVkIGNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHByb3RlY3RlZCBmb3JtU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIHB1YmxpYyBQcmltYXJ5Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgQWNjZW50Q29sb3I6IHN0cmluZztcclxuICBwdWJsaWMgV2FybkNvbG9yOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBQcmltYXJ5IGZvcm0gZ3JvdXBcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IFByaW1hcnkoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdwcmltYXJ5Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgQWNjZW50IGZvcm0gZ3JvdXBcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IEFjY2VudCgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ2FjY2VudCcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIFdhcm4gZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgV2FybigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3dhcm4nKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYWxldHRlUGlja2VyQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlKSB7XHJcblxyXG4gICAgdGhpcy5zZXR1cEZvcm0oKTtcclxuXHJcbiAgICB0aGlzLmNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uID0gdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNsb3NlZFxyXG4gICAgLnN1YnNjcmliZSgodmFsOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVQYWxldHRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgYmFzZSBjb2xvcnMgb2YgdGhlIGNvbG9yIHBpY2tlciBvbiBjaGFuZ2VcclxuICAgIC8vIHdoZW4gbWFudWFsbHkgc2V0dGluZyBjb2xvcnMsIG5vdCB1c2luZ1xyXG4gICAgLy8gdGhlIGNvbG9yIHBpY2tlciBpdHNlbGZcclxuICAgIHRoaXMucGFsZXR0ZVBpY2tlclNlcnZpY2UuQ29sb3JQaWNrZXJDaGFuZ2VkXHJcbiAgICAuc3Vic2NyaWJlKCh2YWw6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG5cclxuICAgICAgdGhpcy5QcmltYXJ5Q29sb3IgPSB2YWwucHJpbWFyeS5tYWluO1xyXG4gICAgICB0aGlzLkFjY2VudENvbG9yID0gdmFsLmFjY2VudC5tYWluO1xyXG4gICAgICB0aGlzLldhcm5Db2xvciA9IHZhbC53YXJuLm1haW47XHJcbiAgICAgIC8vIHRoaXMuUHJpbWFyeS5zZXRWYWx1ZSh2YWwucHJpbWFyeS5tYWluKTtcclxuICAgICAgLy8gdGhpcy5BY2NlbnQuc2V0VmFsdWUodmFsLmFjY2VudC5tYWluKTtcclxuICAgICAgLy8gdGhpcy5XYXJuLnNldFZhbHVlKHZhbC53YXJuLm1haW4pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdXBkYXRlUGFsZXR0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICBsZXQgcGFsZXR0ZTogUGFsZXR0ZU1vZGVsID0gbmV3IFBhbGV0dGVNb2RlbCgpO1xyXG4gICAgcGFsZXR0ZSA9IHsgLi4udGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DdXJyZW50UGFsZXR0ZSwgLi4ucGFsZXR0ZSB9O1xyXG4gICAgcGFsZXR0ZS5wcmltYXJ5Lm1haW4gPSB0aGlzLlByaW1hcnkudmFsdWUubWFpbjtcclxuICAgIHBhbGV0dGUuYWNjZW50Lm1haW4gPSB0aGlzLkFjY2VudC52YWx1ZS5tYWluO1xyXG4gICAgcGFsZXR0ZS53YXJuLm1haW4gPSB0aGlzLldhcm4udmFsdWUubWFpbjtcclxuXHJcbiAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgLy8gc2V0dGluZyBpbml0aWFsIHZhbHVlcyxcclxuICAgLy8gdGhpcyBpc24ndCB0aGUgcmlnaHQgd2F5IHRvIGRvIHRoaXMsIGJ1dCBmb3IgdGhlIG1vbWVudCAtIHNoYW5ub25cclxuICAgIHRoaXMucGF0Y2hWYWx1ZShDb25zdGFudHMuSW5pdGlhbFZhbHVlcywgdHJ1ZSk7XHJcblxyXG4gICB0aGlzLkZvcm0udmFsdWVDaGFuZ2VzXHJcbiAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhOiBQYWxldHRlTW9kZWwsIGI6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKCdBJywgYSk7XHJcbiAgICAvLyAgY29uc29sZS5sb2coJ0InLCBiKTtcclxuICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgIT09IEpTT04uc3RyaW5naWZ5KGIpO1xyXG4gICB9KSlcclxuICAgIC5zdWJzY3JpYmUoKHBhbGV0dGU6IFBhbGV0dGVNb2RlbCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnQVNLQVNMS0RBTEtTRCcsIHBhbGV0dGUpO1xyXG4gICAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuUGFsZXR0ZSA9IHBhbGV0dGU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmZvcm1TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYXRjaFZhbHVlKHZhbDogUGFsZXR0ZU1vZGVsIHwgYW55LCBlbWl0VmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuRm9ybS5wYXRjaFZhbHVlKHZhbCwge2VtaXRFdmVudDogZW1pdFZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCB0aGUgZm9ybVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzZXR1cEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLkZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgcHJpbWFyeTogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSksXHJcbiAgICAgIGFjY2VudDogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9KSxcclxuICAgICAgd2FybjogbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgbWFpbjogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgICBsaWdodGVyOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGRhcmtlcjogbmV3IEZvcm1Db250cm9sKCcnKVxyXG4gICAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSksXHJcbiAgICAgIGxpZ2h0VGV4dDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSksXHJcbiAgICAgIGxpZ2h0QmFja2dyb3VuZDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSksXHJcbiAgICAgIGRhcmtUZXh0OiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgZGFya0JhY2tncm91bmQ6IG5ldyBGb3JtQ29udHJvbCgnJywgW10pXHJcbiAgICB9LCB7dXBkYXRlT246ICdjaGFuZ2UnfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==