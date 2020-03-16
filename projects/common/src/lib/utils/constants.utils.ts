import { FontSelectionModel } from './../models/font-selection.model';
// @dynamic
/**
 * @dynamic need this because there are static memebers
 */

export class Constants {
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

    public static DEFAULT_FONTS: { [key: string]: FontSelectionModel } = {
        'display-4': {
          target: 'display-4',
          family: 'Roboto',
          variant: 'light',
          size: 112,
          lineHeight: 112,
          spacing: -1.5,
          capitalized: false
        },
        'display-3': {
          target: 'display-3',
          family: 'Roboto',
          variant: 'regular',
          size: 56,
          lineHeight: 56,
          spacing: -.5,
          capitalized: false
        },
        'display-2': {
          target: 'display-2',
          family: 'Roboto',
          variant: 'regular',
          size: 45,
          lineHeight: 48,
          spacing: 0,
          capitalized: false
        },
        'display-1': {
          target: 'display-1',
          family: 'Roboto',
          variant: 'regular',
          size: 34,
          lineHeight: 40,
          spacing: .25,
          capitalized: false
        },
        headline: {
          target: 'headline',
          family: 'Roboto',
          variant: 'regular',
          size: 24,
          lineHeight: 32,
          spacing: 0,
          capitalized: false
        },
        title: {
          target: 'title',
          family: 'Roboto',
          variant: 'medium',
          size: 20,
          lineHeight: 32,
          spacing: 0.15,
          capitalized: false
        },
        'subheading-2': {
          target: 'subheading-2',
          family: 'Roboto',
          variant: 'regular',
          size: 16,
          lineHeight: 28,
          spacing: 0.15,
          capitalized: false
        },
        'subheading-1': {
          target: 'subheading-1',
          family: 'Roboto',
          variant: 'medium',
          size: 15,
          lineHeight: 24,
          spacing: .1,
          capitalized: false
        },
        'body-2': {
          target: 'body-2',
          family: 'Roboto',
          variant: 'medium',
          size: 14,
          lineHeight: 24,
          spacing: .25,
          capitalized: false
        },
        'body-1': {
          target: 'body-1',
          family: 'Roboto',
          variant: 'regular',
          size: 14,
          lineHeight: 20,
          spacing: .25,
          capitalized: false
        },
        button: {
          target: 'button',
          family: 'Roboto',
          variant: 'medium',
          size: 14,
          lineHeight: 14,
          spacing: 1.25,
          capitalized: true
        },
        caption: {
          target: 'caption',
          family: 'Roboto',
          variant: 'regular',
          size: 12,
          lineHeight: 20,
          spacing: .4,
          capitalized: false
        },
        input: {
          target: 'input',
          family: 'Roboto',
          variant: 'regular',
          size: undefined,
          lineHeight: 1.125,
          spacing: 1.25,
          capitalized: true
        }
      };

  }
