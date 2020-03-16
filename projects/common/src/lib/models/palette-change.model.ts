export class PaletteChangeModel {
    public AccentColor: string;
    public PrimaryColor: string;
    public WarnColor: string;

    constructor(opts: PaletteChangeModel) {
        Object.assign(this, opts); // destructure values
    }
}
