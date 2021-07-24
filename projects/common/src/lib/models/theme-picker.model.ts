export class ThemePickerModel {

    /**
     * Theme Accent Color
     */
    public Accent: string;

    /**
     * Toggle dark/light modes
     * 
     * TODO: implement this into the model
     */
    public DarkMode?: boolean;

    /**
     * Theme ID
     */
    public ID: string;

    /**
     * Theme Primary Color
     */
    public Primary: string;

    /**
     * Theme Warn Color
     */
    public Warn: string;

    constructor(opts: ThemePickerModel) {
        Object.assign(this, opts); // destructure values
    }
}