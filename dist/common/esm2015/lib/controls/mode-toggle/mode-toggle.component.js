import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
export class ModeToggleComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
    }
    set DarkMode(val) {
        if (!val) {
            return;
        }
        this._darkMode = val;
        if (!this.ToggleForm) {
            return;
        }
        this.Toggle.setValue(val);
        // this.setThemeMode(val);
    }
    get DarkMode() {
        return this._darkMode;
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
            toggle: new FormControl(this.DarkMode)
        });
        this.onChanges();
    }
    onChanges() {
        this.Toggle.valueChanges
            .subscribe((val) => {
            this.setThemeMode(val);
        });
    }
    toggleMode(val) {
        return val ? 'Dark Mode' : 'Light Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
ModeToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-mode-toggle',
                template: "<form \r\n    [formGroup]=\"ToggleForm\" \r\n    fxLayout=\"row\" \r\n    fxLayoutAlign=\"start center\">\r\n    <mat-slide-toggle\r\n        (click)=\"$event.stopPropagation()\" \r\n        formControlName=\"toggle\"\r\n        labelPosition=\"before\" \r\n        color=\"primary\">\r\n    </mat-slide-toggle>\r\n    <span \r\n        class=\"margin-left-1 mat-card-subtitle\">\r\n        {{ ToggleMode }}\r\n    </span>\r\n</form>\r\n\r\n\r\n",
                styles: [""]
            },] }
];
ModeToggleComponent.ctorParameters = () => [
    { type: ThemeBuilderService }
];
ModeToggleComponent.propDecorators = {
    DarkMode: [{ type: Input, args: ['dark-mode',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBWTNFLE1BQU0sT0FBTyxtQkFBbUI7SUFnQzlCLFlBQXNCLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUEvQkQsSUFDVyxRQUFRLENBQUMsR0FBWTtRQUU5QixJQUFJLENBQUMsR0FBRyxFQUFHO1lBQUUsT0FBTztTQUFFO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXJCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQUUsT0FBUTtTQUFDO1FBRWpDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLDBCQUEwQjtJQUM1QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDRixJQUFXLE1BQU07UUFFaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBVU0sUUFBUTtRQUViLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVcsU0FBUztRQUVqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVMsU0FBUztRQUVqQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVk7YUFDdkIsU0FBUyxDQUFDLENBQUMsR0FBWSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxVQUFVLENBQUMsR0FBWTtRQUMvQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVTLFlBQVksQ0FBQyxHQUFZO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUMzQyxDQUFDOzs7WUF0RUosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHljQUEyQzs7YUFFNUM7OztZQVhRLG1CQUFtQjs7O3VCQWV6QixLQUFLLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XHJcbi8qKlxyXG4gKiBTdHJpbmcgbGl0ZXJhbCBkYXRhIHR5cGVcclxuICovXHJcbnR5cGUgTW9kZVR5cGUgPSAnZGFyaycgfCAnbGlnaHQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtbW9kZS10b2dnbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RlLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbW9kZS10b2dnbGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kZVRvZ2dsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHByaXZhdGUgX2RhcmtNb2RlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgnZGFyay1tb2RlJylcclxuICBwdWJsaWMgc2V0IERhcmtNb2RlKHZhbDogYm9vbGVhbikge1xyXG5cclxuICAgIGlmICghdmFsICkgeyByZXR1cm47IH1cclxuXHJcbiAgICB0aGlzLl9kYXJrTW9kZSA9IHZhbDtcclxuXHJcbiAgICBpZiAoIXRoaXMuVG9nZ2xlRm9ybSkgeyByZXR1cm4gO31cclxuXHJcbiAgICB0aGlzLlRvZ2dsZS5zZXRWYWx1ZSh2YWwpO1xyXG4gICAgLy8gdGhpcy5zZXRUaGVtZU1vZGUodmFsKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRGFya01vZGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFya01vZGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgVG9nZ2xlIGZpZWxkIHdpdGhpbiB0aGUgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gICBwdWJsaWMgZ2V0IFRvZ2dsZSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG5cclxuICAgIHJldHVybiB0aGlzLlRvZ2dsZUZvcm0uZ2V0KCd0b2dnbGUnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBUb2dnbGVGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG4gIHB1YmxpYyBUb2dnbGVNb2RlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0aGVtZUJ1aWxkZXJTZXJ2aWNlOiBUaGVtZUJ1aWxkZXJTZXJ2aWNlKSB7IFxyXG4gICAgdGhpcy5Ub2dnbGVNb2RlID0gJ0RhcmsgTW9kZSc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5mb3JtU2V0dXAoKTtcclxuICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGZvcm1TZXR1cCgpOiB2b2lkIHtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlRm9ybSA9IG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgIHRvZ2dsZTogbmV3IEZvcm1Db250cm9sKHRoaXMuRGFya01vZGUpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLm9uQ2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNoYW5nZXMoKTogdm9pZCB7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZS52YWx1ZUNoYW5nZXNcclxuICAgICAgLnN1YnNjcmliZSgodmFsOiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRUaGVtZU1vZGUodmFsKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHRvZ2dsZU1vZGUodmFsOiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgICAgcmV0dXJuIHZhbCA/ICdEYXJrIE1vZGUnIDogJ0xpZ2h0IE1vZGUnO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzZXRUaGVtZU1vZGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlTW9kZSA9IHRoaXMudG9nZ2xlTW9kZSh2YWwpO1xyXG4gICAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuVGhlbWVNb2RlID0gdmFsO1xyXG4gICAgfVxyXG4gIH1cclxuIl19