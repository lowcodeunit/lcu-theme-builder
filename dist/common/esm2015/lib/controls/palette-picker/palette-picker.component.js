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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQW1CLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPdEQsTUFBTSxPQUFPLHNCQUFzQjtJQW1DakMsWUFBc0IsbUJBQXdDLEVBQ3hDLG9CQUEwQztRQUQxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFFOUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILG1EQUFtRDtRQUNuRCwwQ0FBMEM7UUFDMUMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxrQkFBa0I7YUFDM0MsU0FBUyxDQUFDLENB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LElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQzthQUM1QixFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxJQUFJLFNBQVMsQ0FBQztnQkFDcEIsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQzthQUM1QixDQUFDO1lBQ0YsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDO2dCQUNsQixJQUFJLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO2FBQzVCLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUM7WUFDeEIsU0FBUyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDbEMsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDeEMsUUFBUSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDakMsY0FBYyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7U0FDeEMsRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQWpJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsMG5CQUE4Qzs7YUFFL0M7OztZQVZRLG1CQUFtQjtZQUduQixvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uLy4uL3V0aWxzL2NvbnN0YW50cy51dGlscyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFsZXR0ZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3BhbGV0dGUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS1wYWxldHRlLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3BhbGV0dGUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wYWxldHRlLXBpY2tlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYWxldHRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwdWJsaWMgRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBwcm90ZWN0ZWQgY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHJvdGVjdGVkIGZvcm1TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgcHVibGljIFByaW1hcnlDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBBY2NlbnRDb2xvcjogc3RyaW5nO1xyXG4gIHB1YmxpYyBXYXJuQ29sb3I6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQWNjZXNzIFByaW1hcnkgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgUHJpbWFyeSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ3ByaW1hcnknKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBBY2NlbnQgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgQWNjZW50KCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnYWNjZW50Jyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgV2FybiBmb3JtIGdyb3VwXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBXYXJuKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICByZXR1cm4gdGhpcy5Gb3JtLmdldCgnd2FybicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJDaGFuZ2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UpIHtcclxuXHJcbiAgICB0aGlzLnNldHVwRm9ybSgpO1xyXG5cclxuICAgIHRoaXMuY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb24gPSB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkNvbG9yUGlja2VyQ2xvc2VkXHJcbiAgICAuc3Vic2NyaWJlKCh2YWw6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZVBhbGV0dGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBiYXNlIGNvbG9ycyBvZiB0aGUgY29sb3IgcGlja2VyIG9uIGNoYW5nZVxyXG4gICAgLy8gd2hlbiBtYW51YWxseSBzZXR0aW5nIGNvbG9ycywgbm90IHVzaW5nXHJcbiAgICAvLyB0aGUgY29sb3IgcGlja2VyIGl0c2VsZlxyXG4gICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNoYW5nZWRcclxuICAgIC5zdWJzY3JpYmUoKHZhbDogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcblxyXG4gICAgICB0aGlzLlByaW1hcnlDb2xvciA9IHZhbC5wcmltYXJ5Lm1haW47XHJcbiAgICAgIHRoaXMuQWNjZW50Q29sb3IgPSB2YWwuYWNjZW50Lm1haW47XHJcbiAgICAgIHRoaXMuV2FybkNvbG9yID0gdmFsLndhcm4ubWFpbjtcclxuICAgICAgLy8gdGhpcy5QcmltYXJ5LnNldFZhbHVlKHZhbC5wcmltYXJ5Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLkFjY2VudC5zZXRWYWx1ZSh2YWwuYWNjZW50Lm1haW4pO1xyXG4gICAgICAvLyB0aGlzLldhcm4uc2V0VmFsdWUodmFsLndhcm4ubWFpbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVQYWxldHRlKCk6IHZvaWQge1xyXG5cclxuICAgIGxldCBwYWxldHRlOiBQYWxldHRlTW9kZWwgPSBuZXcgUGFsZXR0ZU1vZGVsKCk7XHJcbiAgICBwYWxldHRlID0geyAuLi50aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkN1cnJlbnRQYWxldHRlLCAuLi5wYWxldHRlIH07XHJcbiAgICBwYWxldHRlLnByaW1hcnkubWFpbiA9IHRoaXMuUHJpbWFyeS52YWx1ZS5tYWluO1xyXG4gICAgcGFsZXR0ZS5hY2NlbnQubWFpbiA9IHRoaXMuQWNjZW50LnZhbHVlLm1haW47XHJcbiAgICBwYWxldHRlLndhcm4ubWFpbiA9IHRoaXMuV2Fybi52YWx1ZS5tYWluO1xyXG5cclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5QYWxldHRlID0gcGFsZXR0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBzZXR0aW5nIGluaXRpYWwgdmFsdWVzLFxyXG4gICAvLyB0aGlzIGlzbid0IHRoZSByaWdodCB3YXkgdG8gZG8gdGhpcywgYnV0IGZvciB0aGUgbW9tZW50IC0gc2hhbm5vblxyXG4gICAgdGhpcy5wYXRjaFZhbHVlKENvbnN0YW50cy5Jbml0aWFsVmFsdWVzLCB0cnVlKTtcclxuXHJcbiAgIHRoaXMuRm9ybS52YWx1ZUNoYW5nZXNcclxuICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKGE6IFBhbGV0dGVNb2RlbCwgYjogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcbiAgICAvLyAgY29uc29sZS5sb2coJ0EnLCBhKTtcclxuICAgIC8vICBjb25zb2xlLmxvZygnQicsIGIpO1xyXG4gICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhKSAhPT0gSlNPTi5zdHJpbmdpZnkoYik7XHJcbiAgIH0pKVxyXG4gICAgLnN1YnNjcmliZSgocGFsZXR0ZTogUGFsZXR0ZU1vZGVsKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBU0tBU0xLREFMS1NEJywgcGFsZXR0ZSk7XHJcbiAgICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5QYWxldHRlID0gcGFsZXR0ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZm9ybVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5jb2xvclBpY2tlckNsb3NlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHBhdGNoVmFsdWUodmFsOiBQYWxldHRlTW9kZWwgfCBhbnksIGVtaXRWYWx1ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5Gb3JtLnBhdGNoVmFsdWUodmFsLCB7ZW1pdEV2ZW50OiBlbWl0VmFsdWV9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHVwIHRoZSBmb3JtXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHNldHVwRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICBwcmltYXJ5OiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KSxcclxuICAgICAgYWNjZW50OiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0pLFxyXG4gICAgICB3YXJuOiBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICBtYWluOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICAgIGxpZ2h0ZXI6IG5ldyBGb3JtQ29udHJvbCgnJyksXHJcbiAgICAgICAgZGFya2VyOiBuZXcgRm9ybUNvbnRyb2woJycpXHJcbiAgICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KSxcclxuICAgICAgbGlnaHRUZXh0OiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgbGlnaHRCYWNrZ3JvdW5kOiBuZXcgRm9ybUNvbnRyb2woJycsIFtdKSxcclxuICAgICAgZGFya1RleHQ6IG5ldyBGb3JtQ29udHJvbCgnJywgW10pLFxyXG4gICAgICBkYXJrQmFja2dyb3VuZDogbmV3IEZvcm1Db250cm9sKCcnLCBbXSlcclxuICAgIH0sIHt1cGRhdGVPbjogJ2NoYW5nZSd9KTtcclxuICB9XHJcbn1cclxuIl19