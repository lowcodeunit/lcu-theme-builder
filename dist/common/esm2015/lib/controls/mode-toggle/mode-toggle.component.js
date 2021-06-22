import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
export class LightnessPickerComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
    }
    set DarkModeToggle(val) {
        if (!val) {
            return;
        }
        this._darkModeToggle = val;
        this.setThemeMode(val);
    }
    get DarkModeToggle() {
        return this._darkModeToggle;
    }
    /**
     * Access Toggle field within the form group
     */
    get Toggle() {
        return this.ToggleForm.get('toggle');
    }
    ngOnInit() {
        this.formSetup();
    }
    formSetup() {
        this.ToggleForm = new FormGroup({
            toggle: new FormControl(this.DarkModeToggle)
        });
        this.onChanges();
    }
    onChanges() {
        debugger;
        this.Toggle.valueChanges
            .subscribe((val) => {
            debugger;
            this.setThemeMode(val);
        });
    }
    toggleMode(val) {
        return val ? 'Light Mode' : 'Dark Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
LightnessPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-mode-toggle',
                template: "<form \r\n    [formGroup]=\"ToggleForm\" \r\n    fxLayout=\"row\" \r\n    fxLayoutAlign=\"start center\">\r\n    <mat-slide-toggle\r\n        (click)=\"$event.stopPropagation()\" \r\n        formControlName=\"toggle\"\r\n        labelPosition=\"before\" \r\n        color=\"primary\">\r\n    </mat-slide-toggle>\r\n    <span \r\n        class=\"margin-left-1 mat-card-subtitle\">\r\n        {{ ToggleMode }}\r\n    </span>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
LightnessPickerComponent.ctorParameters = () => [
    { type: ThemeBuilderService }
];
LightnessPickerComponent.propDecorators = {
    DarkModeToggle: [{ type: Input, args: ['dark-mode-toggle',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBWTNFLE1BQU0sT0FBTyx3QkFBd0I7SUE0Qm5DLFlBQXNCLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUEzQkQsSUFDVyxjQUFjLENBQUMsR0FBWTtRQUVwQyxJQUFJLENBQUMsR0FBRyxFQUFHO1lBQUUsT0FBTztTQUFFO1FBRXRCLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsY0FBYztRQUN2QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0YsSUFBVyxNQUFNO1FBRWhCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVVNLFFBQVE7UUFFYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVXLFNBQVM7UUFFakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUM5QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM3QyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVTLFNBQVM7UUFDakIsUUFBUSxDQUFDO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO2FBQ3ZCLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQzFCLFFBQVEsQ0FBQztZQUNULElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsVUFBVSxDQUFDLEdBQVk7UUFDL0IsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQzFDLENBQUM7SUFFUyxZQUFZLENBQUMsR0FBWTtRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDM0MsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix5Y0FBMkM7O2FBRTVDOzs7WUFYUSxtQkFBbUI7Ozs2QkFlekIsS0FBSyxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XHJcbi8qKlxyXG4gKiBTdHJpbmcgbGl0ZXJhbCBkYXRhIHR5cGVcclxuICovXHJcbnR5cGUgTW9kZVR5cGUgPSAnZGFyaycgfCAnbGlnaHQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtbW9kZS10b2dnbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbW9kZS10b2dnbGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRuZXNzUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHJpdmF0ZSBfZGFya01vZGVUb2dnbGU6IGJvb2xlYW47XHJcbiAgQElucHV0KCdkYXJrLW1vZGUtdG9nZ2xlJylcclxuICBwdWJsaWMgc2V0IERhcmtNb2RlVG9nZ2xlKHZhbDogYm9vbGVhbikge1xyXG4gICAgXHJcbiAgICBpZiAoIXZhbCApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5fZGFya01vZGVUb2dnbGUgPSB2YWw7XHJcbiAgICB0aGlzLnNldFRoZW1lTW9kZSh2YWwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBEYXJrTW9kZVRvZ2dsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXJrTW9kZVRvZ2dsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBUb2dnbGUgZmllbGQgd2l0aGluIHRoZSBmb3JtIGdyb3VwXHJcbiAgICovXHJcbiAgIHB1YmxpYyBnZXQgVG9nZ2xlKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgXHJcbiAgICByZXR1cm4gdGhpcy5Ub2dnbGVGb3JtLmdldCgndG9nZ2xlJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgVG9nZ2xlRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBwdWJsaWMgVG9nZ2xlTW9kZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSkgeyBcclxuICAgIHRoaXMuVG9nZ2xlTW9kZSA9ICdEYXJrIE1vZGUnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZm9ybVNldHVwKCk7XHJcbiAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBmb3JtU2V0dXAoKTogdm9pZCB7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICB0b2dnbGU6IG5ldyBGb3JtQ29udHJvbCh0aGlzLkRhcmtNb2RlVG9nZ2xlKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5vbkNoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICBkZWJ1Z2dlcjtcclxuICAgICAgdGhpcy5Ub2dnbGUudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWVNb2RlKHZhbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB0b2dnbGVNb2RlKHZhbDogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiB2YWwgPyAnTGlnaHQgTW9kZScgOiAnRGFyayBNb2RlJztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0VGhlbWVNb2RlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICB0aGlzLlRvZ2dsZU1vZGUgPSB0aGlzLnRvZ2dsZU1vZGUodmFsKTtcclxuICAgICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lTW9kZSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==