import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeBuilderConstants } from '../../utils/theme-builder-constants.utils';
import * as i0 from "@angular/core";
import * as i1 from "../../services/theme-builder.service";
import * as i2 from "../../services/palette-picker.service";
import * as i3 from "@angular/flex-layout/flex";
import * as i4 from "../color-picker/color-picker.component";
export class SubPalettePickerComponent {
    constructor(themeBuilderService, palettePickerService) {
        this.themeBuilderService = themeBuilderService;
        this.palettePickerService = palettePickerService;
        this.Unlocked = new FormControl(false);
        this.materialKeys = [...Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_PRIMARY),
            ...Object.keys(ThemeBuilderConstants.MIX_AMOUNTS_SECONDARY)];
    }
    set ColorPickerColor(val) {
        this.Main.setValue(val);
        this.onMainChange();
    }
    /**
     * Access Main color form control
     */
    get Main() {
        return this.Form.get('main');
    }
    /**
     * Access Light color form control
     */
    get Lighter() {
        return this.Form.get('lighter');
    }
    /**
     * Access Dark color form control
     */
    get Darker() {
        return this.Form.get('darker');
    }
    /**
     * Set preset color palette
     */
    get Variants() {
        return !this.themeBuilderService.MaterialPaletteColors ? undefined :
            this.materialKeys.map((x) => {
                return this.themeBuilderService.MaterialPaletteColors[x];
            });
    }
    ngOnInit() {
        if (this.Main.value) {
            this.onMainChange();
        }
        this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
            .subscribe((val) => {
            this.onMainChange();
        });
    }
    ngOnDestroy() {
        this.palettePickerChangedSubscription.unsubscribe();
        this.colorPickerClosedSubscription.unsubscribe();
    }
    /**
     * Returns palette colors, 50 - A700
     *
     * @param color selected base color, chosen from color pickers
     */
    onMainChange() {
        this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(this.Form.value.main);
        // set lightest and darkest hue colors in color picker
        if (!this.Unlocked.value) {
            this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
            this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
        }
    }
}
SubPalettePickerComponent.ɵfac = function SubPalettePickerComponent_Factory(t) { return new (t || SubPalettePickerComponent)(i0.ɵɵdirectiveInject(i1.ThemeBuilderService), i0.ɵɵdirectiveInject(i2.PalettePickerService)); };
SubPalettePickerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SubPalettePickerComponent, selectors: [["lcu-sub-palette-picker"]], inputs: { Form: ["form", "Form"], ColorPickerColor: ["color-picker-color", "ColorPickerColor"] }, decls: 5, vars: 7, consts: [["fxLayout", "column"], [1, "main", 3, "control"], ["fxLayout", "row"], [1, "lighter", 3, "disabled", "control", "variants"], [1, "darker", 3, "disabled", "control", "variants"]], template: function SubPalettePickerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "lcu-color-picker", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelement(3, "lcu-color-picker", 3);
        i0.ɵɵelement(4, "lcu-color-picker", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("control", ctx.Main);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Lighter)("variants", ctx.Variants);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("disabled", !ctx.Unlocked.value)("control", ctx.Darker)("variants", ctx.Variants);
    } }, directives: [i3.DefaultLayoutDirective, i4.ColorPickerComponent], styles: [".darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%], .main[_ngcontent-%COMP%]{border:.5px solid #ddd}.darker[_ngcontent-%COMP%], .lighter[_ngcontent-%COMP%]{height:40px}.main[_ngcontent-%COMP%]{height:60px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SubPalettePickerComponent, [{
        type: Component,
        args: [{
                selector: 'lcu-sub-palette-picker',
                templateUrl: './sub-palette-picker.component.html',
                styleUrls: ['./sub-palette-picker.component.scss']
            }]
    }], function () { return [{ type: i1.ThemeBuilderService }, { type: i2.PalettePickerService }]; }, { Form: [{
            type: Input,
            args: ['form']
        }], ColorPickerColor: [{
            type: Input,
            args: ['color-picker-color']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLXBhbGV0dGUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL3N1Yi1wYWxldHRlLXBpY2tlci9zdWItcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvY29udHJvbHMvc3ViLXBhbGV0dGUtcGlja2VyL3N1Yi1wYWxldHRlLXBpY2tlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQThCLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXpFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDOzs7Ozs7QUFPbEYsTUFBTSxPQUFPLHlCQUF5QjtJQTJEcEMsWUFBc0IsbUJBQXdDLEVBQ2xELG9CQUEwQztRQURoQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ2xELHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDcEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDO1lBQ3pELEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQTFERCxJQUNXLGdCQUFnQixDQUFDLEdBQVc7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBU0Q7O09BRUc7SUFDSCxJQUFXLFFBQVE7UUFFakIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRTtnQkFFbEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDO0lBZ0JNLFFBQVE7UUFFYixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNwQjtRQUVELElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQy9FLFNBQVMsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxXQUFXO1FBRWhCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxZQUFZO1FBRXBCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNHLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pGO0lBQ0gsQ0FBQzs7a0dBbEdVLHlCQUF5Qjs0RUFBekIseUJBQXlCO1FDYnRDLDhCQUF1QjtRQUVuQixzQ0FFc0M7UUFFdEMsOEJBQW9CO1FBRWxCLHNDQUkyQztRQUUzQyxzQ0FJMkM7UUFDN0MsaUJBQU07UUFDUixpQkFBTTs7UUFoQkYsZUFBZ0I7UUFBaEIsa0NBQWdCO1FBTWQsZUFBNEI7UUFBNUIsOENBQTRCLHdCQUFBLDBCQUFBO1FBTTVCLGVBQTRCO1FBQTVCLDhDQUE0Qix1QkFBQSwwQkFBQTs7dUZESHZCLHlCQUF5QjtjQUxyQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsU0FBUyxFQUFFLENBQUMscUNBQXFDLENBQUM7YUFDbkQ7eUdBS1EsSUFBSTtrQkFEVixLQUFLO21CQUFDLE1BQU07WUFJRixnQkFBZ0I7a0JBRDFCLEtBQUs7bUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbnN0YW50cyB9IGZyb20gJy4uLy4uL3V0aWxzL3RoZW1lLWJ1aWxkZXItY29uc3RhbnRzLnV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXN1Yi1wYWxldHRlLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N1Yi1wYWxldHRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3ViLXBhbGV0dGUtcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN1YlBhbGV0dGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2Zvcm0nKVxyXG4gIHB1YmxpYyBGb3JtOiBGb3JtR3JvdXA7XHJcblxyXG4gIEBJbnB1dCgnY29sb3ItcGlja2VyLWNvbG9yJylcclxuICBwdWJsaWMgc2V0IENvbG9yUGlja2VyQ29sb3IodmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuTWFpbi5zZXRWYWx1ZSh2YWwpO1xyXG4gICAgdGhpcy5vbk1haW5DaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBNYWluIGNvbG9yIGZvcm0gY29udHJvbFxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgTWFpbigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ21haW4nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjY2VzcyBMaWdodCBjb2xvciBmb3JtIGNvbnRyb2xcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IExpZ2h0ZXIoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgIHJldHVybiB0aGlzLkZvcm0uZ2V0KCdsaWdodGVyJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY2Nlc3MgRGFyayBjb2xvciBmb3JtIGNvbnRyb2xcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IERhcmtlcigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuRm9ybS5nZXQoJ2RhcmtlcicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvZ2dsZSBjb250cm9sIGZvciBsaWdodCBhbmQgZGFyayBjb2xvcnNcclxuICAgKi9cclxuICBwdWJsaWMgVW5sb2NrZWQ6IEZvcm1Db250cm9sO1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgcHJlc2V0IGNvbG9yIHBhbGV0dGVcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0IFZhcmlhbnRzKCk6IEFycmF5PHsga2V5OiBzdHJpbmc7IGhleDogc3RyaW5nOyBpc0xpZ2h0OiBib29sZWFuOyB9PiB7XHJcblxyXG4gICAgcmV0dXJuICF0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxQYWxldHRlQ29sb3JzID8gdW5kZWZpbmVkIDpcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbEtleXMubWFwKCh4OiBzdHJpbmcpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsUGFsZXR0ZUNvbG9yc1t4XVxyXG4gICAgICAgICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBwYWxldHRlUGlja2VyQ2hhbmdlZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBLZXlzIGZvciBwYWxldHRlIGNvbG9ycywgNTAgLSBBNzAwXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIG1hdGVyaWFsS2V5czogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRoZW1lQnVpbGRlclNlcnZpY2U6IFRoZW1lQnVpbGRlclNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgcGFsZXR0ZVBpY2tlclNlcnZpY2U6IFBhbGV0dGVQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLlVubG9ja2VkID0gbmV3IEZvcm1Db250cm9sKGZhbHNlKTtcclxuICAgIHRoaXMubWF0ZXJpYWxLZXlzID0gWy4uLk9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19QUklNQVJZKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIC4uLk9iamVjdC5rZXlzKFRoZW1lQnVpbGRlckNvbnN0YW50cy5NSVhfQU1PVU5UU19TRUNPTkRBUlkpXTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAodGhpcy5NYWluLnZhbHVlKSB7XHJcbiAgICAgdGhpcy5vbk1haW5DaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbG9yUGlja2VyQ2xvc2VkU3Vic2NyaXB0aW9uID0gdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5Db2xvclBpY2tlckNsb3NlZFxyXG4gICAgLnN1YnNjcmliZSgodmFsOiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5vbk1haW5DaGFuZ2UoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMucGFsZXR0ZVBpY2tlckNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuY29sb3JQaWNrZXJDbG9zZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgcGFsZXR0ZSBjb2xvcnMsIDUwIC0gQTcwMFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbG9yIHNlbGVjdGVkIGJhc2UgY29sb3IsIGNob3NlbiBmcm9tIGNvbG9yIHBpY2tlcnNcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgb25NYWluQ2hhbmdlKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMudGhlbWVCdWlsZGVyU2VydmljZS5NYXRlcmlhbFBhbGV0dGVDb2xvcnMgPSB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuR2V0UGFsZXR0ZSh0aGlzLkZvcm0udmFsdWUubWFpbik7XHJcblxyXG4gICAgLy8gc2V0IGxpZ2h0ZXN0IGFuZCBkYXJrZXN0IGh1ZSBjb2xvcnMgaW4gY29sb3IgcGlja2VyXHJcbiAgICBpZiAoIXRoaXMuVW5sb2NrZWQudmFsdWUpIHtcclxuICAgICAgdGhpcy5Gb3JtLnBhdGNoVmFsdWUoeyBsaWdodGVyOiB0aGlzLnRoZW1lQnVpbGRlclNlcnZpY2UuTWF0ZXJpYWxQYWxldHRlQ29sb3JzWyc1MCddIH0pO1xyXG4gICAgICB0aGlzLkZvcm0ucGF0Y2hWYWx1ZSh7IGRhcmtlcjogdGhpcy50aGVtZUJ1aWxkZXJTZXJ2aWNlLk1hdGVyaWFsUGFsZXR0ZUNvbG9yc1snOTAwJ10gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIlxyXG48ZGl2IGZ4TGF5b3V0PVwiY29sdW1uXCI+XHJcbiAgICA8IS0tTWFpbiBDb2xvci0tPlxyXG4gICAgPGxjdS1jb2xvci1waWNrZXJcclxuICAgICAgY2xhc3M9XCJtYWluXCIgXHJcbiAgICAgIFtjb250cm9sXT1cIk1haW5cIj48L2xjdS1jb2xvci1waWNrZXI+XHJcbiAgXHJcbiAgICA8ZGl2IGZ4TGF5b3V0PVwicm93XCI+XHJcbiAgICAgIDwhLS1MaWdodCBhbmQgZGFyayBjb2xvcnMgZm9yIGFkZGl0aW9uYWwgaHVlcy0tPlxyXG4gICAgICA8bGN1LWNvbG9yLXBpY2tlciBcclxuICAgICAgICBjbGFzcz1cImxpZ2h0ZXJcIiBcclxuICAgICAgICBbZGlzYWJsZWRdPVwiIVVubG9ja2VkLnZhbHVlXCIgXHJcbiAgICAgICAgW2NvbnRyb2xdPVwiTGlnaHRlclwiIFxyXG4gICAgICAgIFt2YXJpYW50c109XCJWYXJpYW50c1wiPjwvbGN1LWNvbG9yLXBpY2tlcj5cclxuICBcclxuICAgICAgPGxjdS1jb2xvci1waWNrZXIgXHJcbiAgICAgICAgY2xhc3M9XCJkYXJrZXJcIiBcclxuICAgICAgICBbZGlzYWJsZWRdPVwiIVVubG9ja2VkLnZhbHVlXCIgXHJcbiAgICAgICAgW2NvbnRyb2xdPVwiRGFya2VyXCIgXHJcbiAgICAgICAgW3ZhcmlhbnRzXT1cIlZhcmlhbnRzXCI+PC9sY3UtY29sb3ItcGlja2VyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgIl19