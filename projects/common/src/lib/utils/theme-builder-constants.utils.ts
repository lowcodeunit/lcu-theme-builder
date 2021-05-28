import { PaletteModel } from '../models/palette.model';

// @dynamic
/**
 * @dynamic need this because there are static members
 */

export class ThemeBuilderConstants {
    public static MIX_AMOUNTS_PRIMARY = {
        50: [true, 12],
        100: [true, 30],
        200: [true, 50],
        300: [true, 70],
        400: [true, 85],
        500: [true, 100],
        600: [false, 87],
        700: [false, 70],
        800: [false, 54],
        900: [false, 25]
    };

    public static MIX_AMOUNTS_SECONDARY = {
        A100: [15, 80, 65],
        A200: [15, 80, 55],
        A400: [15, 100, 45],
        A700: [15, 100, 40]
    };

      public static document = window.getComputedStyle(document.documentElement);

      public static InitialValues: PaletteModel = {
        primary: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-primary'), lighter: null, darker: null },
        accent: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-accent'), lighter: null, darker: null },
        warn: { main: ThemeBuilderConstants.document.getPropertyValue('--initial-warn'), lighter: null, darker: null },
        lightText: ThemeBuilderConstants.document.getPropertyValue('--initial-light-text'),
        lightBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-light-background'),
        darkText: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-text'),
        darkBackground: ThemeBuilderConstants.document.getPropertyValue('--initial-dark-background')
      };

  }
