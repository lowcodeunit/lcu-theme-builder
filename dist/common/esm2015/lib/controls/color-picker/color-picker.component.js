import { Component, Input } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import * as i0 from "@angular/core";
import * as i1 from "../../services/palette-picker.service";
import * as i2 from "@angular/common";
import * as i3 from "ngx-color-picker";
function ColorPickerComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 2);
} }
// import * as EventEmitter from 'events';
const tinyColor = tinycolor;
export class ColorPickerComponent {
    constructor(palettePickerService) {
        this.palettePickerService = palettePickerService;
        this.ShowBackdrop = false;
    }
    /**
     * Set the selected color
     */
    set Color(col) {
        this.Control.setValue(col);
    }
    /**
     * Get the selected color
     *
     */
    get Color() {
        return this.Control.value;
    }
    ngOnInit() {
    }
    /**
     * Turn backdrop on
     *
     * @param on toggle
     */
    SetBackdrop(on) {
        this.ShowBackdrop = on;
    }
    /**
     * Set font color to contrast background color of display
     *
     * @param col color
     */
    GetTextColor(col) {
        return tinyColor(col).isLight() ? '#000' : '#fff';
    }
    ColorPickerClosed(evt) {
        this.palettePickerService.CloseColorPicker(evt);
    }
    ColorPickerChange(evt) {
        this.Color = evt;
    }
}
ColorPickerComponent.ɵfac = function ColorPickerComponent_Factory(t) { return new (t || ColorPickerComponent)(i0.ɵɵdirectiveInject(i1.PalettePickerService)); };
ColorPickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["lcu-color-picker"]], inputs: { Control: ["control", "Control"], Disabled: ["disabled", "Disabled"], Variants: ["variants", "Variants"], Color: ["color", "Color"] }, decls: 2, vars: 12, consts: [["class", "backdrop", 4, "ngIf"], ["type", "text", 3, "disabled", "colorPicker", "cpPresetColors", "cpPosition", "cpOutputFormat", "cpAlphaChannel", "value", "colorPickerOpen", "colorPickerClose", "colorPickerChange"], [1, "backdrop"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ColorPickerComponent_div_0_Template, 1, 0, "div", 0);
        i0.ɵɵelementStart(1, "input", 1);
        i0.ɵɵlistener("colorPickerOpen", function ColorPickerComponent_Template_input_colorPickerOpen_1_listener() { return ctx.SetBackdrop(true); })("colorPickerClose", function ColorPickerComponent_Template_input_colorPickerClose_1_listener($event) { ctx.SetBackdrop(false); return ctx.ColorPickerClosed($event); })("colorPickerChange", function ColorPickerComponent_Template_input_colorPickerChange_1_listener($event) { return ctx.ColorPickerChange($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.ShowBackdrop);
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("background", ctx.Color)("color", ctx.GetTextColor(ctx.Color));
        i0.ɵɵproperty("disabled", ctx.Disabled)("colorPicker", ctx.Color)("cpPresetColors", ctx.Variants)("cpPosition", "bottom-left")("cpOutputFormat", "hex")("cpAlphaChannel", "disabled")("value", ctx.Color);
    } }, directives: [i2.NgIf, i3.ColorPickerDirective], styles: [".backdrop[_ngcontent-%COMP%]{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}[_nghost-%COMP%], input[_ngcontent-%COMP%]{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input[_ngcontent-%COMP%]{text-align:center;cursor:pointer}[_nghost-%COMP%]{display:block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-color-picker',
                templateUrl: './color-picker.component.html',
                styleUrls: ['./color-picker.component.scss']
            }]
    }], function () { return [{ type: i1.PalettePickerService }]; }, { Control: [{
            type: Input,
            args: ['control']
        }], Disabled: [{
            type: Input,
            args: ['disabled']
        }], Variants: [{
            type: Input,
            args: ['variants']
        }], Color: [{
            type: Input,
            args: ['color']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQzs7Ozs7O0lDRHhDLHlCQUFpRDs7QURLakQsMENBQTBDO0FBRTFDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQU81QixNQUFNLE9BQU8sb0JBQW9CO0lBNEIvQixZQUFzQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUU5RCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUNXLEtBQUssQ0FBQyxHQUFXO1FBRTFCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFTSxRQUFRO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXLENBQUMsRUFBVztRQUU1QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFlBQVksQ0FBQyxHQUFXO1FBRTdCLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwRCxDQUFDO0lBRU0saUJBQWlCLENBQUMsR0FBVztRQUVsQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEdBQVc7UUFFbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQzs7d0ZBakZVLG9CQUFvQjt1RUFBcEIsb0JBQW9CO1FDZGpDLHFFQUFpRDtRQUVqRCxnQ0FjQztRQVZDLG9IQUFtQixnQkFBWSxJQUFJLENBQUMsSUFBQyx3R0FHakIsZ0JBQVksS0FBSyxDQUFDLFNBQUUsNkJBQXlCLElBSDVCLGlIQU1oQiw2QkFBeUIsSUFOVDtRQUp2QyxpQkFjQzs7UUFoQnNCLHVDQUFrQjtRQWN2QyxlQUEwQjtRQUExQix1Q0FBMEIsc0NBQUE7UUFWMUIsdUNBQXFCLDBCQUFBLGdDQUFBLDZCQUFBLHlCQUFBLDhCQUFBLG9CQUFBOzt1RkRVVixvQkFBb0I7Y0FMaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSwrQkFBK0I7Z0JBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO2FBQzdDO3VFQWFRLE9BQU87a0JBRGIsS0FBSzttQkFBQyxTQUFTO1lBUVQsUUFBUTtrQkFEZCxLQUFLO21CQUFDLFVBQVU7WUFRVixRQUFRO2tCQURkLEtBQUs7bUJBQUMsVUFBVTtZQVlOLEtBQUs7a0JBRGYsS0FBSzttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcbi8vIGltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsY3UtY29sb3ItcGlja2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb2xvci1waWNrZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgYmFja2Ryb3Agd2hlbiBjb2xvciBwaWNrZXIgaXMgb3BlblxyXG4gICAqL1xyXG4gIHB1YmxpYyBTaG93QmFja2Ryb3A6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFBhcmVudCBjb250cm9sIGZyb20gdXNpbmcgY29tcG9uZW50XHJcbiAgICovXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgnY29udHJvbCcpXHJcbiAgcHVibGljIENvbnRyb2w6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBEaXNhYmxlIGNvbG9yIHBpY2tlclxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2Rpc2FibGVkJylcclxuICBwdWJsaWMgRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFycmF5IG9mIHByZXNldCBjb2xvcnMsIHNob3duIGluIGNvbG9yIHBpY2tlclxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3ZhcmlhbnRzJylcclxuICBwdWJsaWMgVmFyaWFudHM/OiBzdHJpbmdbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHBhbGV0dGVQaWNrZXJTZXJ2aWNlOiBQYWxldHRlUGlja2VyU2VydmljZSkge1xyXG5cclxuICAgIHRoaXMuU2hvd0JhY2tkcm9wID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHNlbGVjdGVkIGNvbG9yXHJcbiAgICovXHJcbiAgQElucHV0KCdjb2xvcicpXHJcbiAgcHVibGljIHNldCBDb2xvcihjb2w6IHN0cmluZykge1xyXG5cclxuICAgIHRoaXMuQ29udHJvbC5zZXRWYWx1ZShjb2wpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzZWxlY3RlZCBjb2xvclxyXG4gICAqXHJcbiAgICovXHJcbiAgcHVibGljIGdldCBDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLkNvbnRyb2wudmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUdXJuIGJhY2tkcm9wIG9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0gb24gdG9nZ2xlXHJcbiAgICovXHJcbiAgcHVibGljIFNldEJhY2tkcm9wKG9uOiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5TaG93QmFja2Ryb3AgPSBvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBmb250IGNvbG9yIHRvIGNvbnRyYXN0IGJhY2tncm91bmQgY29sb3Igb2YgZGlzcGxheVxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbCBjb2xvclxyXG4gICAqL1xyXG4gIHB1YmxpYyBHZXRUZXh0Q29sb3IoY29sOiBzdHJpbmcpOiBhbnkge1xyXG5cclxuICAgIHJldHVybiB0aW55Q29sb3IoY29sKS5pc0xpZ2h0KCkgPyAnIzAwMCcgOiAnI2ZmZic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ29sb3JQaWNrZXJDbG9zZWQoZXZ0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLnBhbGV0dGVQaWNrZXJTZXJ2aWNlLkNsb3NlQ29sb3JQaWNrZXIoZXZ0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBDb2xvclBpY2tlckNoYW5nZShldnQ6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuQ29sb3IgPSBldnQ7XHJcbiAgfVxyXG5cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYmFja2Ryb3BcIiAqbmdJZj1cIlNob3dCYWNrZHJvcFwiPjwvZGl2PlxyXG5cclxuPGlucHV0IFxyXG4gIHR5cGU9XCJ0ZXh0XCIgXHJcbiAgW2Rpc2FibGVkXT1cIkRpc2FibGVkXCIgXHJcbiAgW2NvbG9yUGlja2VyXT1cIkNvbG9yXCIgXHJcbiAgKGNvbG9yUGlja2VyT3Blbik9XCJTZXRCYWNrZHJvcCh0cnVlKVwiXHJcbiAgW2NwUHJlc2V0Q29sb3JzXT1cIlZhcmlhbnRzXCIgXHJcbiAgW2NwUG9zaXRpb25dPVwiJ2JvdHRvbS1sZWZ0J1wiXHJcbiAgKGNvbG9yUGlja2VyQ2xvc2UpPVwiU2V0QmFja2Ryb3AoZmFsc2UpOyBDb2xvclBpY2tlckNsb3NlZCgkZXZlbnQpXCIgXHJcbiAgW2NwT3V0cHV0Rm9ybWF0XT1cIidoZXgnXCJcclxuICBbY3BBbHBoYUNoYW5uZWxdPVwiJ2Rpc2FibGVkJ1wiIFxyXG4gIChjb2xvclBpY2tlckNoYW5nZSk9XCJDb2xvclBpY2tlckNoYW5nZSgkZXZlbnQpXCIgXHJcbiAgW3ZhbHVlXT1cIkNvbG9yXCJcclxuICBbc3R5bGUuYmFja2dyb3VuZF09XCJDb2xvclwiIFxyXG4gIFtzdHlsZS5jb2xvcl09XCJHZXRUZXh0Q29sb3IoQ29sb3IpXCJcclxuPlxyXG4iXX0=