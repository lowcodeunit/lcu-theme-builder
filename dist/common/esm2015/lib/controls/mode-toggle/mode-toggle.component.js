import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
export class LightnessPickerComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
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
            toggle: new FormControl(false)
        });
        this.onChanges();
    }
    onChanges() {
        this.Toggle.valueChanges
            .subscribe((val) => {
            this.ToggleMode = val ? 'Light Mode' : 'Dark Mode';
            this.themeBuilderService.ThemeMode = val;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFZM0UsTUFBTSxPQUFPLHdCQUF3QjtJQWFuQyxZQUFzQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUNoQyxDQUFDO0lBYkQ7O09BRUc7SUFDRixJQUFXLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBVU0sUUFBUTtRQUViLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVcsU0FBUztRQUVqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDO1lBQzlCLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFUyxTQUFTO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTthQUN2QixTQUFTLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDbkQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUExQ0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHljQUEyQzs7YUFFNUM7OztZQVhRLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcclxuLyoqXHJcbiAqIFN0cmluZyBsaXRlcmFsIGRhdGEgdHlwZVxyXG4gKi9cclxudHlwZSBNb2RlVHlwZSA9ICdkYXJrJyB8ICdsaWdodCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS1tb2RlLXRvZ2dsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21vZGUtdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tb2RlLXRvZ2dsZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodG5lc3NQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgVG9nZ2xlIGZpZWxkIHdpdGhpbiB0aGUgZm9ybSBncm91cFxyXG4gICAqL1xyXG4gICBwdWJsaWMgZ2V0IFRvZ2dsZSgpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuVG9nZ2xlRm9ybS5nZXQoJ3RvZ2dsZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFRvZ2dsZUZvcm06IEZvcm1Hcm91cDtcclxuXHJcbiAgcHVibGljIFRvZ2dsZU1vZGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UpIHsgXHJcbiAgICB0aGlzLlRvZ2dsZU1vZGUgPSAnRGFyayBNb2RlJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmZvcm1TZXR1cCgpO1xyXG4gIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZm9ybVNldHVwKCk6IHZvaWQge1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGVGb3JtID0gbmV3IEZvcm1Hcm91cCh7XHJcbiAgICAgICAgdG9nZ2xlOiBuZXcgRm9ybUNvbnRyb2woZmFsc2UpXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB0aGlzLm9uQ2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAgIHRoaXMuVG9nZ2xlLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKCh2YWw6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLlRvZ2dsZU1vZGUgPSB2YWwgPyAnTGlnaHQgTW9kZScgOiAnRGFyayBNb2RlJztcclxuICAgICAgICB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuVGhlbWVNb2RlID0gdmFsO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==