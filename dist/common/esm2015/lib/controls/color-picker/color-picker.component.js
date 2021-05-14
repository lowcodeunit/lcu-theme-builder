import { Component, Input } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PalettePickerService } from '../../services/palette-picker.service';
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
ColorPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-color-picker',
                template: "<div class=\"backdrop\" *ngIf=\"ShowBackdrop\"></div>\r\n\r\n<input \r\n  type=\"text\" \r\n  [disabled]=\"Disabled\" \r\n  [colorPicker]=\"Color\" \r\n  (colorPickerOpen)=\"SetBackdrop(true)\"\r\n  [cpPresetColors]=\"Variants\" \r\n  [cpPosition]=\"'bottom-left'\"\r\n  (colorPickerClose)=\"SetBackdrop(false); ColorPickerClosed($event)\" \r\n  [cpOutputFormat]=\"'hex'\"\r\n  [cpAlphaChannel]=\"'disabled'\" \r\n  (colorPickerChange)=\"ColorPickerChange($event)\" \r\n  [value]=\"Color\"\r\n  [style.background]=\"Color\" \r\n  [style.color]=\"GetTextColor(Color)\"\r\n>\r\n",
                styles: [".backdrop{position:absolute;width:100vw;height:100vh;top:0;left:0;background:rgba(0,0,0,.5)}:host,input{display:block;width:100%;box-sizing:border-box;height:100%;border:0}input{text-align:center;cursor:pointer}:host{display:block}"]
            },] }
];
ColorPickerComponent.ctorParameters = () => [
    { type: PalettePickerService }
];
ColorPickerComponent.propDecorators = {
    Control: [{ type: Input, args: ['control',] }],
    Disabled: [{ type: Input, args: ['disabled',] }],
    Variants: [{ type: Input, args: ['variants',] }],
    Color: [{ type: Input, args: ['color',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL2NvbnRyb2xzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sS0FBSyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBR3hDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLDBDQUEwQztBQUUxQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFPNUIsTUFBTSxPQUFPLG9CQUFvQjtJQTRCL0IsWUFBc0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFFOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFDVyxLQUFLLENBQUMsR0FBVztRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU0sUUFBUTtJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLEVBQVc7UUFFNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxZQUFZLENBQUMsR0FBVztRQUU3QixPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEQsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEdBQVc7UUFFbEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxHQUFXO1FBRWxDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7OztZQXRGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsNGtCQUE0Qzs7YUFFN0M7OztZQVRRLG9CQUFvQjs7O3NCQXFCMUIsS0FBSyxTQUFDLFNBQVM7dUJBT2YsS0FBSyxTQUFDLFVBQVU7dUJBT2hCLEtBQUssU0FBQyxVQUFVO29CQVdoQixLQUFLLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UnO1xyXG4vLyBpbXBvcnQgKiBhcyBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcclxuXHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LWNvbG9yLXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbG9yLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29sb3ItcGlja2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIGJhY2tkcm9wIHdoZW4gY29sb3IgcGlja2VyIGlzIG9wZW5cclxuICAgKi9cclxuICBwdWJsaWMgU2hvd0JhY2tkcm9wOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBQYXJlbnQgY29udHJvbCBmcm9tIHVzaW5nIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ2NvbnRyb2wnKVxyXG4gIHB1YmxpYyBDb250cm9sOiBGb3JtQ29udHJvbDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBjb2xvciBwaWNrZXJcclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCdkaXNhYmxlZCcpXHJcbiAgcHVibGljIERpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBcnJheSBvZiBwcmVzZXQgY29sb3JzLCBzaG93biBpbiBjb2xvciBwaWNrZXJcclxuICAgKi9cclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCd2YXJpYW50cycpXHJcbiAgcHVibGljIFZhcmlhbnRzPzogc3RyaW5nW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBwYWxldHRlUGlja2VyU2VydmljZTogUGFsZXR0ZVBpY2tlclNlcnZpY2UpIHtcclxuXHJcbiAgICB0aGlzLlNob3dCYWNrZHJvcCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBzZWxlY3RlZCBjb2xvclxyXG4gICAqL1xyXG4gIEBJbnB1dCgnY29sb3InKVxyXG4gIHB1YmxpYyBzZXQgQ29sb3IoY29sOiBzdHJpbmcpIHtcclxuXHJcbiAgICB0aGlzLkNvbnRyb2wuc2V0VmFsdWUoY29sKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc2VsZWN0ZWQgY29sb3JcclxuICAgKlxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXQgQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5Db250cm9sLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHVybiBiYWNrZHJvcCBvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIG9uIHRvZ2dsZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBTZXRCYWNrZHJvcChvbjogYm9vbGVhbik6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuU2hvd0JhY2tkcm9wID0gb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgZm9udCBjb2xvciB0byBjb250cmFzdCBiYWNrZ3JvdW5kIGNvbG9yIG9mIGRpc3BsYXlcclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb2wgY29sb3JcclxuICAgKi9cclxuICBwdWJsaWMgR2V0VGV4dENvbG9yKGNvbDogc3RyaW5nKTogYW55IHtcclxuXHJcbiAgICByZXR1cm4gdGlueUNvbG9yKGNvbCkuaXNMaWdodCgpID8gJyMwMDAnIDogJyNmZmYnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIENvbG9yUGlja2VyQ2xvc2VkKGV2dDogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5wYWxldHRlUGlja2VyU2VydmljZS5DbG9zZUNvbG9yUGlja2VyKGV2dCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgQ29sb3JQaWNrZXJDaGFuZ2UoZXZ0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLkNvbG9yID0gZXZ0O1xyXG4gIH1cclxuXHJcbn1cclxuIl19