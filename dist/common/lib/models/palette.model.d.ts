import { SubPaletteModel } from './sub-palette.model';
import { MaterialPaletteModel } from './material-palette.model';
export declare class PaletteModel {
    Accent: SubPaletteModel;
    Primary: SubPaletteModel;
    Warn: SubPaletteModel;
    DarkMode: boolean;
    AccentColorPalette?: MaterialPaletteModel;
    PrimaryColorPalette?: MaterialPaletteModel;
    WarnColorPalette?: MaterialPaletteModel;
    ColorMap?: Map<string, object>;
    DarkBackground: string;
    DarkText: string;
    LightBackground: string;
    LightText: string;
}
