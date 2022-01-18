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
        args: [{ selector: 'lcu-theme-builder', template: "\r\n<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <!-- <lcu-mode-toggle></lcu-mode-toggle> -->\r\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-toolbar color=\"primary\">\r\n        <span class=\"primary-color\">Primary Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"accent\">\r\n        <span class=\"accent-color\">Accent Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"warn\">\r\n        <span class=\"warn-color\">Warn Colors</span>\r\n      </mat-toolbar>\r\n  </div>\r\n  <!-- <lcu-palette-picker></lcu-palette-picker> -->\r\n</div>\r\n", styles: [".primary-color{color:var(--theme-primary-A700)}.accent-color{color:var(--theme-accent-A700)}.warn-color{color:var(--theme-warn-A700)}\n"] }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi9jb250cm9scy90aGVtZS1idWlsZGVyL3RoZW1lLWJ1aWxkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvdGhlbWUtYnVpbGRlci90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRbEQsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQztJQUdBLENBQUM7SUFFTSxRQUFRO0lBRWYsQ0FBQzs7MEZBVFUscUJBQXFCO3dFQUFyQixxQkFBcUI7UUNQbEMsOEJBQTBDO1FBRXhDLDhCQUF1QztRQUNuQyxzQ0FBNkI7UUFDM0IsK0JBQTRCO1FBQUEsOEJBQWM7UUFBQSxpQkFBTztRQUNuRCxpQkFBYztRQUNkLHNDQUE0QjtRQUMxQiwrQkFBMkI7UUFBQSw2QkFBYTtRQUFBLGlCQUFPO1FBQ2pELGlCQUFjO1FBQ2Qsc0NBQTBCO1FBQ3hCLCtCQUF5QjtRQUFBLDRCQUFXO1FBQUEsaUJBQU87UUFDN0MsaUJBQWM7UUFDbEIsaUJBQU07UUFFUixpQkFBTTs7dUZEUE8scUJBQXFCO2NBTmpDLFNBQVM7MkJBQ0UsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXRoZW1lLWJ1aWxkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKVxyXG4gIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiXHJcbjxkaXYgZnhMYXlvdXQ9XCJjb2x1bW5cIiBmeExheW91dEdhcD1cIjEwcHhcIj5cclxuICA8IS0tIDxsY3UtbW9kZS10b2dnbGU+PC9sY3UtbW9kZS10b2dnbGU+IC0tPlxyXG4gIDxkaXYgZnhMYXlvdXQ9XCJyb3dcIiBmeExheW91dEdhcD1cIjEwcHhcIj5cclxuICAgICAgPG1hdC10b29sYmFyIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpbWFyeS1jb2xvclwiPlByaW1hcnkgQ29sb3JzPC9zcGFuPlxyXG4gICAgICA8L21hdC10b29sYmFyPlxyXG4gICAgICA8bWF0LXRvb2xiYXIgY29sb3I9XCJhY2NlbnRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImFjY2VudC1jb2xvclwiPkFjY2VudCBDb2xvcnM8L3NwYW4+XHJcbiAgICAgIDwvbWF0LXRvb2xiYXI+XHJcbiAgICAgIDxtYXQtdG9vbGJhciBjb2xvcj1cIndhcm5cIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIndhcm4tY29sb3JcIj5XYXJuIENvbG9yczwvc3Bhbj5cclxuICAgICAgPC9tYXQtdG9vbGJhcj5cclxuICA8L2Rpdj5cclxuICA8IS0tIDxsY3UtcGFsZXR0ZS1waWNrZXI+PC9sY3UtcGFsZXR0ZS1waWNrZXI+IC0tPlxyXG48L2Rpdj5cclxuIl19