/**
 * Class to model palette colors needed for dynamic material themes
 *
 * ? If used, this should be placed in Ref Arch - shannon
 */
export declare class PaletteColorMapModel {
    /**
     * Theme accent color
     */
    Accent: string;
    /**
     * Theme name
     */
    Name: string;
    /**
     * Theme primary color
     */
    Primary: string;
    /**
     * Theme warn color
     */
    Warn: string;
    constructor(opts: PaletteColorMapModel);
}
