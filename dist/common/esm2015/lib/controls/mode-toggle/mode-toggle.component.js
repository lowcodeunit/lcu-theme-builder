import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../services/theme-builder.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/flex-layout/flex";
import * as i4 from "@angular/material/slide-toggle";
export class LightnessPickerComponent {
    constructor(themeBuilderService) {
        this.themeBuilderService = themeBuilderService;
        this.ToggleMode = 'Dark Mode';
    }
    set DarkMode(val) {
        if (!val) {
            return;
        }
        this._darkMode = val;
        this.setThemeMode(val);
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
        return val ? 'Light Mode' : 'Dark Mode';
    }
    setThemeMode(val) {
        this.ToggleMode = this.toggleMode(val);
        this.themeBuilderService.ThemeMode = val;
    }
}
LightnessPickerComponent.ɵfac = function LightnessPickerComponent_Factory(t) { return new (t || LightnessPickerComponent)(i0.ɵɵdirectiveInject(i1.ThemeBuilderService)); };
LightnessPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LightnessPickerComponent, selectors: [["lcu-mode-toggle"]], inputs: { DarkMode: ["dark-mode", "DarkMode"] }, decls: 4, vars: 2, consts: [["fxLayout", "row", "fxLayoutAlign", "start center", 3, "formGroup"], ["formControlName", "toggle", "labelPosition", "before", "color", "primary", 3, "click"], [1, "margin-left-1", "mat-card-subtitle"]], template: function LightnessPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "mat-slide-toggle", 1);
        i0.ɵɵlistener("click", function LightnessPickerComponent_Template_mat_slide_toggle_click_1_listener($event) { return $event.stopPropagation(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(2, "span", 2);
        i0.ɵɵtext(3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.ToggleForm);
        i0.ɵɵadvance(3);
        i0.ɵɵtextInterpolate1(" ", ctx.ToggleMode, " ");
    } }, directives: [i2.ɵNgNoValidate, i2.NgControlStatusGroup, i3.DefaultLayoutDirective, i3.DefaultLayoutAlignDirective, i2.FormGroupDirective, i4.MatSlideToggle, i2.NgControlStatus, i2.FormControlName], styles: [""] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightnessPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-mode-toggle',
                templateUrl: './mode-toggle.component.html',
                styleUrls: ['./mode-toggle.component.scss']
            }]
    }], function () { return [{ type: i1.ThemeBuilderService }]; }, { DarkMode: [{
            type: Input,
            args: ['dark-mode']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvbW9kZS10b2dnbGUvbW9kZS10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQWF6RSxNQUFNLE9BQU8sd0JBQXdCO0lBNEJuQyxZQUFzQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUM1RCxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUNoQyxDQUFDO0lBM0JELElBQ1csUUFBUSxDQUFDLEdBQVk7UUFFOUIsSUFBSSxDQUFDLEdBQUcsRUFBRztZQUFFLE9BQU87U0FBRTtRQUV0QixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNGLElBQVcsTUFBTTtRQUVoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFVTSxRQUFRO1FBRWIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFVyxTQUFTO1FBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDOUIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdkMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFUyxTQUFTO1FBRWpCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTthQUN2QixTQUFTLENBQUMsQ0FBQyxHQUFZLEVBQUUsRUFBRTtZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLFVBQVUsQ0FBQyxHQUFZO1FBQy9CLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUMxQyxDQUFDO0lBRVMsWUFBWSxDQUFDLEdBQVk7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQzNDLENBQUM7O2dHQTdEUSx3QkFBd0I7MkVBQXhCLHdCQUF3QjtRQ2RyQywrQkFHaUM7UUFDN0IsMkNBSW9CO1FBSGhCLHFIQUFTLHdCQUF3QixJQUFDO1FBSXRDLGlCQUFtQjtRQUNuQiwrQkFDNEM7UUFDeEMsWUFDSjtRQUFBLGlCQUFPO1FBQ1gsaUJBQU87O1FBYkgsMENBQXdCO1FBV3BCLGVBQ0o7UUFESSwrQ0FDSjs7dUZEQ1Msd0JBQXdCO2NBTHBDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsOEJBQThCO2dCQUMzQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQzthQUM1QztzRUFLWSxRQUFRO2tCQURsQixLQUFLO21CQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZS10b2dnbGUnO1xyXG4vKipcclxuICogU3RyaW5nIGxpdGVyYWwgZGF0YSB0eXBlXHJcbiAqL1xyXG50eXBlIE1vZGVUeXBlID0gJ2RhcmsnIHwgJ2xpZ2h0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LW1vZGUtdG9nZ2xlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbW9kZS10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21vZGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0bmVzc1BpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHByaXZhdGUgX2RhcmtNb2RlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgnZGFyay1tb2RlJylcclxuICBwdWJsaWMgc2V0IERhcmtNb2RlKHZhbDogYm9vbGVhbikge1xyXG4gICAgXHJcbiAgICBpZiAoIXZhbCApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgdGhpcy5fZGFya01vZGUgPSB2YWw7XHJcbiAgICB0aGlzLnNldFRoZW1lTW9kZSh2YWwpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBEYXJrTW9kZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXJrTW9kZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBUb2dnbGUgZmllbGQgd2l0aGluIHRoZSBmb3JtIGdyb3VwXHJcbiAgICovXHJcbiAgIHB1YmxpYyBnZXQgVG9nZ2xlKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgXHJcbiAgICByZXR1cm4gdGhpcy5Ub2dnbGVGb3JtLmdldCgndG9nZ2xlJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgVG9nZ2xlRm9ybTogRm9ybUdyb3VwO1xyXG5cclxuICBwdWJsaWMgVG9nZ2xlTW9kZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdGhlbWVCdWlsZGVyU2VydmljZTogVGhlbWVCdWlsZGVyU2VydmljZSkgeyBcclxuICAgIHRoaXMuVG9nZ2xlTW9kZSA9ICdEYXJrIE1vZGUnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZm9ybVNldHVwKCk7XHJcbiAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBmb3JtU2V0dXAoKTogdm9pZCB7XHJcblxyXG4gICAgICB0aGlzLlRvZ2dsZUZvcm0gPSBuZXcgRm9ybUdyb3VwKHtcclxuICAgICAgICB0b2dnbGU6IG5ldyBGb3JtQ29udHJvbCh0aGlzLkRhcmtNb2RlKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5vbkNoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2VzKCk6IHZvaWQge1xyXG5cclxuICAgICAgdGhpcy5Ub2dnbGUudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0VGhlbWVNb2RlKHZhbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB0b2dnbGVNb2RlKHZhbDogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgIHJldHVybiB2YWwgPyAnTGlnaHQgTW9kZScgOiAnRGFyayBNb2RlJztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0VGhlbWVNb2RlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICB0aGlzLlRvZ2dsZU1vZGUgPSB0aGlzLnRvZ2dsZU1vZGUodmFsKTtcclxuICAgICAgdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLlRoZW1lTW9kZSA9IHZhbDtcclxuICAgIH1cclxuICB9XHJcbiIsIjxmb3JtIFxyXG4gICAgW2Zvcm1Hcm91cF09XCJUb2dnbGVGb3JtXCIgXHJcbiAgICBmeExheW91dD1cInJvd1wiIFxyXG4gICAgZnhMYXlvdXRBbGlnbj1cInN0YXJ0IGNlbnRlclwiPlxyXG4gICAgPG1hdC1zbGlkZS10b2dnbGVcclxuICAgICAgICAoY2xpY2spPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCIgXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9nZ2xlXCJcclxuICAgICAgICBsYWJlbFBvc2l0aW9uPVwiYmVmb3JlXCIgXHJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICA8L21hdC1zbGlkZS10b2dnbGU+XHJcbiAgICA8c3BhbiBcclxuICAgICAgICBjbGFzcz1cIm1hcmdpbi1sZWZ0LTEgbWF0LWNhcmQtc3VidGl0bGVcIj5cclxuICAgICAgICB7eyBUb2dnbGVNb2RlIH19XHJcbiAgICA8L3NwYW4+XHJcbjwvZm9ybT5cclxuXHJcblxyXG4iXX0=