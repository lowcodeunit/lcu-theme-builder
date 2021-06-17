import { ColorModel } from '../models/color.model';
import * as tinycolor from 'tinycolor2';
import { PalettePickerService } from './palette-picker.service';
import { ThemeBuilderService } from './theme-builder.service';
export declare class VariantColorService {
    protected palettePickerService: PalettePickerService;
    protected themeBuilderService: ThemeBuilderService;
    constructor(palettePickerService: PalettePickerService, themeBuilderService: ThemeBuilderService);
    UpdatePrimaryVariants(color: string): void;
    UpdateAccentVariants(color: string): void;
    UpdateWarnVariants(color: string): void;
    protected computeColors(color: string): Array<ColorModel>;
    protected getColorObject(value: tinycolor.Instance, name: string): ColorModel;
}
