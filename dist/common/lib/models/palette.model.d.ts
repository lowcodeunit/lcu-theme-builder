import { SubPaletteModel } from './sub-palette.model';
import { MaterialPaletteModel } from './material-palette.model';
export declare class PaletteModel {
    accent: SubPaletteModel;
    primary: SubPaletteModel;
    warn: SubPaletteModel;
    DarkMode: boolean;
    AccentColorPalette?: MaterialPaletteModel;
    PrimaryColorPalette?: MaterialPaletteModel;
    WarnColorPalette?: MaterialPaletteModel;
    ColorMap?: Map<string, object>;
    darkBackground: string;
    darkText: string;
    lightBackground: string;
    lightText: string;
}
