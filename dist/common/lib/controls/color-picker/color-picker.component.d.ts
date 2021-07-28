import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PalettePickerService } from '../../services/palette-picker.service';
import * as ɵngcc0 from '@angular/core';
export declare class ColorPickerComponent implements OnInit {
    protected palettePickerService: PalettePickerService;
    /**
     * Toggle backdrop when color picker is open
     */
    ShowBackdrop: boolean;
    /**
     * Parent control from using component
     */
    Control: FormControl;
    /**
     * Disable color picker
     */
    Disabled: boolean;
    /**
     * Array of preset colors, shown in color picker
     */
    Variants?: string[];
    constructor(palettePickerService: PalettePickerService);
    /**
     * Set the selected color
     */
    set Color(col: string);
    /**
     * Get the selected color
     *
     */
    get Color(): string;
    ngOnInit(): void;
    /**
     * Turn backdrop on
     *
     * @param on toggle
     */
    SetBackdrop(on: boolean): void;
    /**
     * Set font color to contrast background color of display
     *
     * @param col color
     */
    GetTextColor(col: string): any;
    ColorPickerClosed(evt: string): void;
    ColorPickerChange(evt: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ColorPickerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<ColorPickerComponent, "lcu-color-picker", never, { "Color": "color"; "Control": "control"; "Disabled": "disabled"; "Variants": "variants"; }, {}, never, never>;
}

//# sourceMappingURL=color-picker.component.d.ts.map