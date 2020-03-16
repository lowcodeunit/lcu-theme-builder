
/**
 * Class to model palette colors needed for dynamic material themes
 *
 * ? If used, this should be placed in Ref Arch - shannon
 */
export class PaletteColorMapModel {
    /**
     * Theme accent color
     */
    public Accent: string;

    /**
     * Theme name
     */
    public Name: string;

    /**
     * Theme primary color
     */
    public Primary: string;

    /**
     * Theme warn color
     */
    public Warn: string;

    constructor(opts: PaletteColorMapModel) {
        Object.assign(this, opts); // destructure values
    }
}
