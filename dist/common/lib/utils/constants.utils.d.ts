import { PaletteModel } from '../models/palette.model';
/**
 * @dynamic need this because there are static members
 */
export declare class Constants {
    static MIX_AMOUNTS_PRIMARY: {
        50: (number | boolean)[];
        100: (number | boolean)[];
        200: (number | boolean)[];
        300: (number | boolean)[];
        400: (number | boolean)[];
        500: (number | boolean)[];
        600: (number | boolean)[];
        700: (number | boolean)[];
        800: (number | boolean)[];
        900: (number | boolean)[];
    };
    static MIX_AMOUNTS_SECONDARY: {
        A100: number[];
        A200: number[];
        A400: number[];
        A700: number[];
    };
    static document: CSSStyleDeclaration;
    static InitialValues: PaletteModel;
}
