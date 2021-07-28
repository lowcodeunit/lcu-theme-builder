import { ThemeModel } from './../models/theme.model';
import { SubPaletteModel } from './../models/sub-palette.model';
import * as i0 from "@angular/core";
export declare class PaletteTemplateService {
    /**
     * Return template for scss
     *
     * @param theme current theme
     */
    GetTemplate(theme: ThemeModel): string;
    /**
     * Get the Scss Palatte
     *
     * @param name palette name
     *
     * @param subPalette SubPaletteModel
     */
    protected getScssPalette(name: string, subPalette: SubPaletteModel): string;
    /**
     * Get text color
     *
     * @param col color
     */
    protected getTextColor(col: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaletteTemplateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaletteTemplateService>;
}
