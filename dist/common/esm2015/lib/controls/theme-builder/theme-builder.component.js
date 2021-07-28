import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout/flex";
import * as i2 from "@angular/material/toolbar";
export class ThemeBuilderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ThemeBuilderComponent.ɵfac = function ThemeBuilderComponent_Factory(t) { return new (t || ThemeBuilderComponent)(); };
ThemeBuilderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ThemeBuilderComponent, selectors: [["lcu-theme-builder"]], decls: 11, vars: 0, consts: [["fxLayout", "column", "fxLayoutGap", "10px"], ["fxLayout", "row", "fxLayoutGap", "10px"], ["color", "primary"], [1, "primary-color"], ["color", "accent"], [1, "accent-color"], ["color", "warn"], [1, "warn-color"]], template: function ThemeBuilderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "mat-toolbar", 2);
        i0.ɵɵelementStart(3, "span", 3);
        i0.ɵɵtext(4, "Primary Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "mat-toolbar", 4);
        i0.ɵɵelementStart(6, "span", 5);
        i0.ɵɵtext(7, "Accent Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(8, "mat-toolbar", 6);
        i0.ɵɵelementStart(9, "span", 7);
        i0.ɵɵtext(10, "Warn Colors");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } }, directives: [i1.DefaultLayoutDirective, i1.DefaultLayoutGapDirective, i2.MatToolbar], styles: [".primary-color[_ngcontent-%COMP%]{color:var(--theme-primary-A700)}.accent-color[_ngcontent-%COMP%]{color:var(--theme-accent-A700)}.warn-color[_ngcontent-%COMP%]{color:var(--theme-warn-A700)}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeBuilderComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-theme-builder',
                templateUrl: './theme-builder.component.html',
                styleUrls: ['./theme-builder.component.scss']
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi9jb250cm9scy90aGVtZS1idWlsZGVyL3RoZW1lLWJ1aWxkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdGhlbWUtYnVpbGRlci90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRbEQsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQztJQUdBLENBQUM7SUFFTSxRQUFRO0lBRWYsQ0FBQzs7MEZBVFUscUJBQXFCO3dFQUFyQixxQkFBcUI7UUNQbEMsOEJBQTBDO1FBRXhDLDhCQUF1QztRQUNuQyxzQ0FBNkI7UUFDM0IsK0JBQTRCO1FBQUEsOEJBQWM7UUFBQSxpQkFBTztRQUNuRCxpQkFBYztRQUNkLHNDQUE0QjtRQUMxQiwrQkFBMkI7UUFBQSw2QkFBYTtRQUFBLGlCQUFPO1FBQ2pELGlCQUFjO1FBQ2Qsc0NBQTBCO1FBQ3hCLCtCQUF5QjtRQUFBLDRCQUFXO1FBQUEsaUJBQU87UUFDN0MsaUJBQWM7UUFDbEIsaUJBQU07UUFFUixpQkFBTTs7dUZEUE8scUJBQXFCO2NBTmpDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixXQUFXLEVBQUUsZ0NBQWdDO2dCQUM3QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xjdS10aGVtZS1idWlsZGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdGhlbWUtYnVpbGRlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdGhlbWUtYnVpbGRlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0ICB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKClcclxuICB7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICB9XHJcblxyXG59XHJcbiIsIlxyXG48ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XHJcbiAgPCEtLSA8bGN1LW1vZGUtdG9nZ2xlPjwvbGN1LW1vZGUtdG9nZ2xlPiAtLT5cclxuICA8ZGl2IGZ4TGF5b3V0PVwicm93XCIgZnhMYXlvdXRHYXA9XCIxMHB4XCI+XHJcbiAgICAgIDxtYXQtdG9vbGJhciBjb2xvcj1cInByaW1hcnlcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaW1hcnktY29sb3JcIj5QcmltYXJ5IENvbG9yczwvc3Bhbj5cclxuICAgICAgPC9tYXQtdG9vbGJhcj5cclxuICAgICAgPG1hdC10b29sYmFyIGNvbG9yPVwiYWNjZW50XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhY2NlbnQtY29sb3JcIj5BY2NlbnQgQ29sb3JzPC9zcGFuPlxyXG4gICAgICA8L21hdC10b29sYmFyPlxyXG4gICAgICA8bWF0LXRvb2xiYXIgY29sb3I9XCJ3YXJuXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3YXJuLWNvbG9yXCI+V2FybiBDb2xvcnM8L3NwYW4+XHJcbiAgICAgIDwvbWF0LXRvb2xiYXI+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSA8bGN1LXBhbGV0dGUtcGlja2VyPjwvbGN1LXBhbGV0dGUtcGlja2VyPiAtLT5cclxuPC9kaXY+XHJcbiJdfQ==