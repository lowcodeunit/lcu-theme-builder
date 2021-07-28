import { PaletteModel } from '../models/palette.model';
import { ColorModel } from '../models/color.model';
import { Subject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class PalettePickerService {
    /**
     *
     */
    ColorPickerChanged: Subject<PaletteModel>;
    /**
     * Event after color picker has closed
     */
    ColorPickerClosed: Subject<any>;
    /**
     * Current color palette
     */
    CurrentPalette: PaletteModel;
    /**
     * Array of primary colors
     */
    PrimaryColorPalette: Array<ColorModel>;
    /**
     * Array of accent colors
     */
    AccentColorPalette: Array<ColorModel>;
    /**
     * Array of warn colors
     */
    WarnColorPalette: Array<ColorModel>;
    constructor();
    PalettePickerChange(params: PaletteModel): void;
    /**
     * Event when color picker is closed, use this to kick off
     * the process of building color variants and everything else
     * Doing this prevents multiple processes that occur during
     * Form Control changes
     *
     * @param params Selected color from color picker
     */
    CloseColorPicker(params: string): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<PalettePickerService, never>;
}

//# sourceMappingURL=palette-picker.service.d.ts.map