import { UtilsService } from './utils.service';
import { ColorModel } from '../models/color.model';
import tinycolor from 'tinycolor2';
import { PalettePickerService } from './palette-picker.service';
import * as i0 from "@angular/core";
export declare class VariantColorService {
    protected palettePickerService: PalettePickerService;
    protected utilsService: UtilsService;
    constructor(palettePickerService: PalettePickerService, utilsService: UtilsService);
    UpdatePrimaryVariants(color: string): void;
    UpdateAccentVariants(color: string): void;
    UpdateWarnVariants(color: string): void;
    protected computeColors(color: string): Array<ColorModel>;
    protected getColorObject(value: tinycolor.Instance, name: string): ColorModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<VariantColorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VariantColorService>;
}
