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
        if (!this.ToggleForm) {
            return null;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBWTNFLE1BQU0sT0FBTyxtQkFBbUI7SUErQjlCLFlBQXNCLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQzVELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ2hDLENBQUM7SUE5QkQsSUFDVyxRQUFRLENBQUMsR0FBWTtRQUU5QixJQUFJLENBQUMsR0FBRyxFQUFHO1lBQUUsT0FBTztTQUFFO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLDBCQUEwQjtJQUM1QixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDRixJQUFXLE1BQU07UUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFBRSxPQUFPLElBQUksQ0FBRTtTQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVVNLFFBQVE7UUFFYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVXLFNBQVM7UUFFakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQztZQUM5QixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN2QyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVTLFNBQVM7UUFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZO2FBQ3ZCLFNBQVMsQ0FBQyxDQUFDLEdBQVksRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsVUFBVSxDQUFDLEdBQVk7UUFDL0IsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFFUyxZQUFZLENBQUMsR0FBWTtRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDM0MsQ0FBQzs7O1lBckVKLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix5Y0FBMkM7O2FBRTVDOzs7WUFYUSxtQkFBbUI7Ozt1QkFlekIsS0FBSyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xyXG4vKipcclxuICogU3RyaW5nIGxpdGVyYWwgZGF0YSB0eXBlXHJcbiAqL1xyXG50eXBlIE1vZGVUeXBlID0gJ2RhcmsnIHwgJ2xpZ2h0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LW1vZGUtdG9nZ2xlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbW9kZS10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21vZGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGVUb2dnbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwcml2YXRlIF9kYXJrTW9kZTogYm9vbGVhbjtcclxuICBASW5wdXQoJ2RhcmstbW9kZScpXHJcbiAgcHVibGljIHNldCBEYXJrTW9kZSh2YWw6IGJvb2xlYW4pIHtcclxuXHJcbiAgICBpZiAoIXZhbCApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5fZGFya01vZGUgPSB2YWw7XHJcbiAgICB0aGlzLlRvZ2dsZS5zZXRWYWx1ZSh2YWwpO1xyXG4gICAgLy8gdGhpcy5zZXRUaGVtZU1vZGUodmFsKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgRGFya01vZGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFya01vZGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgVG9nZ2xlIGZpZWxkIHdpdGhpbiB0aGUgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gICBwdWJsaWMgZ2V0IFRvZ2dsZSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG5cclxuICAgIGlmICghdGhpcy5Ub2dnbGVGb3JtKSB7IHJldHVybiBudWxsIDt9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuVG9nZ2xlRm9ybS5nZXQoJ3RvZ2dsZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFRvZ2dsZUZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgcHVibGljIFRvZ2dsZU1vZGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UpIHsgXHJcbiAgICB0aGlzLlRvZ2dsZU1vZGUgPSAnRGFyayBNb2RlJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmZvcm1TZXR1cCgpO1xyXG4gIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZm9ybVNldHVwKCk6IHZvaWQge1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVGb3JtID0gbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgdG9nZ2xlOiBuZXcgRm9ybUNvbnRyb2wodGhpcy5EYXJrTW9kZSlcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMub25DaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlcygpOiB2b2lkIHtcclxuXHJcbiAgICAgIHRoaXMuVG9nZ2xlLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKCh2YWw6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLnNldFRoZW1lTW9kZSh2YWwpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdG9nZ2xlTW9kZSh2YWw6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gdmFsID8gJ0RhcmsgTW9kZScgOiAnTGlnaHQgTW9kZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldFRoZW1lTW9kZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgdGhpcy5Ub2dnbGVNb2RlID0gdGhpcy50b2dnbGVNb2RlKHZhbCk7XHJcbiAgICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5UaGVtZU1vZGUgPSB2YWw7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=