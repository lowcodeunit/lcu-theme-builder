export class ThemePickerModel {

    public Accent: string;
    public DarkMode: boolean;
    public ID: string;
    public Primary: string;
    public Warn: string;

    constructor(opts: ThemePickerModel) {
        Object.assign(this, opts); // destructure values
    }
}