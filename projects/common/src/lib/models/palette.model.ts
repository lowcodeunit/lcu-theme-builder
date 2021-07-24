import { SubPaletteModel } from './sub-palette.model';
import { MaterialPaletteModel } from './material-palette.model';

export class PaletteModel {
    public Accent: SubPaletteModel;
    public Primary: SubPaletteModel;
    public Warn: SubPaletteModel;
    public DarkMode: boolean;
    public AccentColorPalette?: MaterialPaletteModel;
    public PrimaryColorPalette?: MaterialPaletteModel;
    public WarnColorPalette?: MaterialPaletteModel;
    public ColorMap?: Map<string, object>;
    public DarkBackground: string;
    public DarkText: string;
    public LightBackground: string;
    public LightText: string;
}
