import { PaletteModel } from './palette.model';
import { FontSelectionModel } from './font-selection.model';

export class ThemeModel {
    public fonts: Array<FontSelectionModel>;
    public lightness: boolean;
    public palette: PaletteModel;
}
