import { SubPaletteModel } from './sub-palette.model';
import { MaterialPaletteModel } from './material-palette.model';

export class PaletteModel {
    public accent: SubPaletteModel;
    public primary: SubPaletteModel;
    public warn: SubPaletteModel;
    public AccentColorPalette: MaterialPaletteModel;
    public PrimaryColorPalette: MaterialPaletteModel;
    public WarnColorPalette: MaterialPaletteModel;
    public ColorMap: Map<string, object>;
    public darkBackground: string;
    public darkText: string;
    public lightBackground: string;
    public lightText: string;
}
