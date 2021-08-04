import { Injectable } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import * as i0 from "@angular/core";
const tinyColor = tinycolor;
export class PaletteTemplateService {
    /**
     * Return template for scss
     *
     * @param theme current theme
     */
    GetTemplate(theme) {
        const template = `
      @import '~@angular/material/theming';
      // Include the common styles for Angular Material. We include this here so that you only
      // have to load a single css file for Angular Material in your app.

      // Foreground Elements

      // Light Theme Text
      $dark-text: ${theme.Palette.LightText};
      $dark-primary-text: rgba($dark-text, 0.87);
      $dark-accent-text: rgba($dark-primary-text, 0.54);
      $dark-disabled-text: rgba($dark-primary-text, 0.38);
      $dark-dividers: rgba($dark-primary-text, 0.12);
      $dark-focused: rgba($dark-primary-text, 0.12);

      $mat-light-theme-foreground: (
        base:              black,
        divider:           $dark-dividers,
        dividers:          $dark-dividers,
        disabled:          $dark-disabled-text,
        disabled-button:   rgba($dark-text, 0.26),
        disabled-text:     $dark-disabled-text,
        elevation:         black,
        secondary-text:    $dark-accent-text,
        hint-text:         $dark-disabled-text,
        accent-text:       $dark-accent-text,
        icon:              $dark-accent-text,
        icons:             $dark-accent-text,
        text:              $dark-primary-text,
        slider-min:        $dark-primary-text,
        slider-off:        rgba($dark-text, 0.26),
        slider-off-active: $dark-disabled-text,
      );

      // Dark Theme text
      $light-text: ${theme.Palette.DarkText};
      $light-primary-text: $light-text;
      $light-accent-text: rgba($light-primary-text, 0.7);
      $light-disabled-text: rgba($light-primary-text, 0.5);
      $light-dividers: rgba($light-primary-text, 0.12);
      $light-focused: rgba($light-primary-text, 0.12);

      $mat-dark-theme-foreground: (
        base:              $light-text,
        divider:           $light-dividers,
        dividers:          $light-dividers,
        disabled:          $light-disabled-text,
        disabled-button:   rgba($light-text, 0.3),
        disabled-text:     $light-disabled-text,
        elevation:         black,
        hint-text:         $light-disabled-text,
        secondary-text:    $light-accent-text,
        accent-text:       $light-accent-text,
        icon:              $light-text,
        icons:             $light-text,
        text:              $light-text,
        slider-min:        $light-text,
        slider-off:        rgba($light-text, 0.3),
        slider-off-active: rgba($light-text, 0.3),
      );

      // Background config
      // Light bg
      $light-background:    ${theme.Palette.LightBackground};
      $light-bg-darker-5:   darken($light-background, 5%);
      $light-bg-darker-10:  darken($light-background, 10%);
      $light-bg-darker-20:  darken($light-background, 20%);
      $light-bg-darker-30:  darken($light-background, 30%);
      $light-bg-lighter-5:  lighten($light-background, 5%);
      $dark-bg-alpha-4:     rgba(${theme.Palette.DarkBackground}, 0.04);
      $dark-bg-alpha-12:    rgba(${theme.Palette.DarkBackground}, 0.12);

      $mat-light-theme-background: (
        background:               $light-background,
        status-bar:               $light-bg-darker-20,
        app-bar:                  $light-bg-darker-5,
        hover:                    $dark-bg-alpha-4,
        card:                     $light-bg-lighter-5,
        dialog:                   $light-bg-lighter-5,
        disabled-button:          $dark-bg-alpha-12,
        raised-button:            $light-bg-lighter-5,
        focused-button:           $dark-focused,
        selected-button:          $light-bg-darker-20,
        selected-disabled-button: $light-bg-darker-30,
        disabled-button-toggle:   $light-bg-darker-10,
        unselected-chip:          $light-bg-darker-10,
        disabled-list-option:     $light-bg-darker-10,
      );

      // Dark bg
      $dark-background:     ${theme.Palette.DarkBackground};
      $dark-bg-lighter-5:   lighten($dark-background, 5%);
      $dark-bg-lighter-10:  lighten($dark-background, 10%);
      $dark-bg-lighter-20:  lighten($dark-background, 20%);
      $dark-bg-lighter-30:  lighten($dark-background, 30%);
      $light-bg-alpha-4:    rgba(${theme.Palette.LightBackground}, 0.04);
      $light-bg-alpha-12:   rgba(${theme.Palette.LightBackground}, 0.12);

      // Background palette for dark themes.
      $mat-dark-theme-background: (
        background:               $dark-background,
        status-bar:               $dark-bg-lighter-20,
        app-bar:                  $dark-bg-lighter-5,
        hover:                    $light-bg-alpha-4,
        card:                     $dark-bg-lighter-5,
        dialog:                   $dark-bg-lighter-5,
        disabled-button:          $light-bg-alpha-12,
        raised-button:            $dark-bg-lighter-5,
        focused-button:           $light-focused,
        selected-button:          $dark-bg-lighter-20,
        selected-disabled-button: $dark-bg-lighter-30,
        disabled-button-toggle:   $dark-bg-lighter-10,
        unselected-chip:          $dark-bg-lighter-20,
        disabled-list-option:     $dark-bg-lighter-10,
      );

      // Theme Config
      ${['primary', 'accent', 'warn'].map(x => this.getScssPalette(x, theme.Palette[x])).join('\n')};

      $theme: ${!theme.Lightness ? 'mat-dark-theme' : 'mat-light-theme'}($theme-primary, $theme-accent, $theme-warn);
      $altTheme: ${!theme.Lightness ? 'mat-light-theme' : 'mat-dark-theme'}($theme-primary, $theme-accent, $theme-warn);

      // Theme Init
      @include angular-material-theme($theme);

      .theme-alternate {
        @include angular-material-theme($altTheme);
      }

      // Specific component overrides, pieces that are not in line with the general theming

      // Handle buttons appropriately, with respect to line-height
      .mat-raised-button, .mat-stroked-button, .mat-flat-button {
        padding: 0 1.15em;
        margin: 0 .65em;
        min-width: 3em;
      }

      .mat-standard-chip {
        padding: .5em .85em;
        min-height: 2.5em;
      }
      `;
        return template;
    }
    /**
     * Get the Scss Palatte
     *
     * @param name palette name
     *
     * @param subPalette SubPaletteModel
     */
    getScssPalette(name, subPalette) {
        return `
      body {
        --${name}-color: ${subPalette.Main};
        --${name}-lighter-color: ${subPalette.Lighter};
        --${name}-darker-color: ${subPalette.Darker};
        --text-${name}-color: #{${this.getTextColor(subPalette.Main)}};
        --text-${name}-lighter-color: #{${this.getTextColor(subPalette.Lighter)}};
        --text-${name}-darker-color: #{${this.getTextColor(subPalette.Darker)}};
      }

    $mat-${name}: (
      main: ${subPalette.Main},
      lighter: ${subPalette.Lighter},
      darker: ${subPalette.Darker},
      200: ${subPalette.Main}, // For slide toggle,
      contrast : (
        main: ${this.getTextColor(subPalette.Main)},
        lighter: ${this.getTextColor(subPalette.Lighter)},
        darker: ${this.getTextColor(subPalette.Darker)},
      )
    );
    $theme-${name}: mat-palette($mat-${name}, main, lighter, darker);`;
    }
    /**
     * Get text color
     *
     * @param col color
     */
    getTextColor(col) {
        return `$${tinyColor(col).isLight() ? 'dark' : 'light'}-primary-text`;
    }
}
PaletteTemplateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaletteTemplateService_Factory() { return new PaletteTemplateService(); }, token: PaletteTemplateService, providedIn: "root" });
PaletteTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7O0FBRXhDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQU81QixNQUFNLE9BQU8sc0JBQXNCO0lBRWpDOzs7O09BSUc7SUFDTSxXQUFXLENBQUMsS0FBaUI7UUFFbEMsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7O29CQVFILEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQTJCdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTRCYixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWU7Ozs7OzttQ0FNeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjO21DQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQW9CakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjOzs7OzttQ0FLdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlO21DQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCeEQsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O2dCQUVuRixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxpQkFBaUI7bUJBQ3BELENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCbkUsQ0FBQztRQUVKLE9BQU8sUUFBUSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxjQUFjLENBQUMsSUFBWSxFQUFFLFVBQTJCO1FBRWhFLE9BQU87O1lBRUQsSUFBSSxXQUFXLFVBQVUsQ0FBQyxJQUFJO1lBQzlCLElBQUksbUJBQW1CLFVBQVUsQ0FBQyxPQUFPO1lBQ3pDLElBQUksa0JBQWtCLFVBQVUsQ0FBQyxNQUFNO2lCQUNsQyxJQUFJLGFBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2lCQUNuRCxJQUFJLHFCQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7aUJBQzlELElBQUksb0JBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7O1dBR2xFLElBQUk7Y0FDRCxVQUFVLENBQUMsSUFBSTtpQkFDWixVQUFVLENBQUMsT0FBTztnQkFDbkIsVUFBVSxDQUFDLE1BQU07YUFDcEIsVUFBVSxDQUFDLElBQUk7O2dCQUVaLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzttQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2tCQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OzthQUd6QyxJQUFJLHNCQUFzQixJQUFJLDJCQUEyQixDQUFDO0lBQ3JFLENBQUM7SUFFQzs7OztPQUlHO0lBQ08sWUFBWSxDQUFDLEdBQVc7UUFDaEMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLGVBQWUsQ0FBQztJQUN4RSxDQUFDOzs7O1lBeE1KLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRoZW1lTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy90aGVtZS5tb2RlbCc7XHJcbmltcG9ydCB7IFN1YlBhbGV0dGVNb2RlbCB9IGZyb20gJy4vLi4vbW9kZWxzL3N1Yi1wYWxldHRlLm1vZGVsJztcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcblxyXG5jb25zdCB0aW55Q29sb3IgPSB0aW55Y29sb3I7XHJcbnR5cGUgUkdCQSA9IHRpbnljb2xvci5Db2xvckZvcm1hdHMuUkdCQTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG4gIH0pXHJcblxyXG5leHBvcnQgY2xhc3MgUGFsZXR0ZVRlbXBsYXRlU2VydmljZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0ZW1wbGF0ZSBmb3Igc2Nzc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHRoZW1lIGN1cnJlbnQgdGhlbWVcclxuICAgKi9cclxuICAgIHB1YmxpYyBHZXRUZW1wbGF0ZSh0aGVtZTogVGhlbWVNb2RlbCk6IHN0cmluZyB7XHJcblxyXG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGBcclxuICAgICAgQGltcG9ydCAnfkBhbmd1bGFyL21hdGVyaWFsL3RoZW1pbmcnO1xyXG4gICAgICAvLyBJbmNsdWRlIHRoZSBjb21tb24gc3R5bGVzIGZvciBBbmd1bGFyIE1hdGVyaWFsLiBXZSBpbmNsdWRlIHRoaXMgaGVyZSBzbyB0aGF0IHlvdSBvbmx5XHJcbiAgICAgIC8vIGhhdmUgdG8gbG9hZCBhIHNpbmdsZSBjc3MgZmlsZSBmb3IgQW5ndWxhciBNYXRlcmlhbCBpbiB5b3VyIGFwcC5cclxuXHJcbiAgICAgIC8vIEZvcmVncm91bmQgRWxlbWVudHNcclxuXHJcbiAgICAgIC8vIExpZ2h0IFRoZW1lIFRleHRcclxuICAgICAgJGRhcmstdGV4dDogJHt0aGVtZS5QYWxldHRlLkxpZ2h0VGV4dH07XHJcbiAgICAgICRkYXJrLXByaW1hcnktdGV4dDogcmdiYSgkZGFyay10ZXh0LCAwLjg3KTtcclxuICAgICAgJGRhcmstYWNjZW50LXRleHQ6IHJnYmEoJGRhcmstcHJpbWFyeS10ZXh0LCAwLjU0KTtcclxuICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dDogcmdiYSgkZGFyay1wcmltYXJ5LXRleHQsIDAuMzgpO1xyXG4gICAgICAkZGFyay1kaXZpZGVyczogcmdiYSgkZGFyay1wcmltYXJ5LXRleHQsIDAuMTIpO1xyXG4gICAgICAkZGFyay1mb2N1c2VkOiByZ2JhKCRkYXJrLXByaW1hcnktdGV4dCwgMC4xMik7XHJcblxyXG4gICAgICAkbWF0LWxpZ2h0LXRoZW1lLWZvcmVncm91bmQ6IChcclxuICAgICAgICBiYXNlOiAgICAgICAgICAgICAgYmxhY2ssXHJcbiAgICAgICAgZGl2aWRlcjogICAgICAgICAgICRkYXJrLWRpdmlkZXJzLFxyXG4gICAgICAgIGRpdmlkZXJzOiAgICAgICAgICAkZGFyay1kaXZpZGVycyxcclxuICAgICAgICBkaXNhYmxlZDogICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b246ICAgcmdiYSgkZGFyay10ZXh0LCAwLjI2KSxcclxuICAgICAgICBkaXNhYmxlZC10ZXh0OiAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXHJcbiAgICAgICAgc2Vjb25kYXJ5LXRleHQ6ICAgICRkYXJrLWFjY2VudC10ZXh0LFxyXG4gICAgICAgIGhpbnQtdGV4dDogICAgICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIGFjY2VudC10ZXh0OiAgICAgICAkZGFyay1hY2NlbnQtdGV4dCxcclxuICAgICAgICBpY29uOiAgICAgICAgICAgICAgJGRhcmstYWNjZW50LXRleHQsXHJcbiAgICAgICAgaWNvbnM6ICAgICAgICAgICAgICRkYXJrLWFjY2VudC10ZXh0LFxyXG4gICAgICAgIHRleHQ6ICAgICAgICAgICAgICAkZGFyay1wcmltYXJ5LXRleHQsXHJcbiAgICAgICAgc2xpZGVyLW1pbjogICAgICAgICRkYXJrLXByaW1hcnktdGV4dCxcclxuICAgICAgICBzbGlkZXItb2ZmOiAgICAgICAgcmdiYSgkZGFyay10ZXh0LCAwLjI2KSxcclxuICAgICAgICBzbGlkZXItb2ZmLWFjdGl2ZTogJGRhcmstZGlzYWJsZWQtdGV4dCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIERhcmsgVGhlbWUgdGV4dFxyXG4gICAgICAkbGlnaHQtdGV4dDogJHt0aGVtZS5QYWxldHRlLkRhcmtUZXh0fTtcclxuICAgICAgJGxpZ2h0LXByaW1hcnktdGV4dDogJGxpZ2h0LXRleHQ7XHJcbiAgICAgICRsaWdodC1hY2NlbnQtdGV4dDogcmdiYSgkbGlnaHQtcHJpbWFyeS10ZXh0LCAwLjcpO1xyXG4gICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dDogcmdiYSgkbGlnaHQtcHJpbWFyeS10ZXh0LCAwLjUpO1xyXG4gICAgICAkbGlnaHQtZGl2aWRlcnM6IHJnYmEoJGxpZ2h0LXByaW1hcnktdGV4dCwgMC4xMik7XHJcbiAgICAgICRsaWdodC1mb2N1c2VkOiByZ2JhKCRsaWdodC1wcmltYXJ5LXRleHQsIDAuMTIpO1xyXG5cclxuICAgICAgJG1hdC1kYXJrLXRoZW1lLWZvcmVncm91bmQ6IChcclxuICAgICAgICBiYXNlOiAgICAgICAgICAgICAgJGxpZ2h0LXRleHQsXHJcbiAgICAgICAgZGl2aWRlcjogICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcclxuICAgICAgICBkaXZpZGVyczogICAgICAgICAgJGxpZ2h0LWRpdmlkZXJzLFxyXG4gICAgICAgIGRpc2FibGVkOiAgICAgICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b246ICAgcmdiYSgkbGlnaHQtdGV4dCwgMC4zKSxcclxuICAgICAgICBkaXNhYmxlZC10ZXh0OiAgICAgJGxpZ2h0LWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgZWxldmF0aW9uOiAgICAgICAgIGJsYWNrLFxyXG4gICAgICAgIGhpbnQtdGV4dDogICAgICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBzZWNvbmRhcnktdGV4dDogICAgJGxpZ2h0LWFjY2VudC10ZXh0LFxyXG4gICAgICAgIGFjY2VudC10ZXh0OiAgICAgICAkbGlnaHQtYWNjZW50LXRleHQsXHJcbiAgICAgICAgaWNvbjogICAgICAgICAgICAgICRsaWdodC10ZXh0LFxyXG4gICAgICAgIGljb25zOiAgICAgICAgICAgICAkbGlnaHQtdGV4dCxcclxuICAgICAgICB0ZXh0OiAgICAgICAgICAgICAgJGxpZ2h0LXRleHQsXHJcbiAgICAgICAgc2xpZGVyLW1pbjogICAgICAgICRsaWdodC10ZXh0LFxyXG4gICAgICAgIHNsaWRlci1vZmY6ICAgICAgICByZ2JhKCRsaWdodC10ZXh0LCAwLjMpLFxyXG4gICAgICAgIHNsaWRlci1vZmYtYWN0aXZlOiByZ2JhKCRsaWdodC10ZXh0LCAwLjMpLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gQmFja2dyb3VuZCBjb25maWdcclxuICAgICAgLy8gTGlnaHQgYmdcclxuICAgICAgJGxpZ2h0LWJhY2tncm91bmQ6ICAgICR7dGhlbWUuUGFsZXR0ZS5MaWdodEJhY2tncm91bmR9O1xyXG4gICAgICAkbGlnaHQtYmctZGFya2VyLTU6ICAgZGFya2VuKCRsaWdodC1iYWNrZ3JvdW5kLCA1JSk7XHJcbiAgICAgICRsaWdodC1iZy1kYXJrZXItMTA6ICBkYXJrZW4oJGxpZ2h0LWJhY2tncm91bmQsIDEwJSk7XHJcbiAgICAgICRsaWdodC1iZy1kYXJrZXItMjA6ICBkYXJrZW4oJGxpZ2h0LWJhY2tncm91bmQsIDIwJSk7XHJcbiAgICAgICRsaWdodC1iZy1kYXJrZXItMzA6ICBkYXJrZW4oJGxpZ2h0LWJhY2tncm91bmQsIDMwJSk7XHJcbiAgICAgICRsaWdodC1iZy1saWdodGVyLTU6ICBsaWdodGVuKCRsaWdodC1iYWNrZ3JvdW5kLCA1JSk7XHJcbiAgICAgICRkYXJrLWJnLWFscGhhLTQ6ICAgICByZ2JhKCR7dGhlbWUuUGFsZXR0ZS5EYXJrQmFja2dyb3VuZH0sIDAuMDQpO1xyXG4gICAgICAkZGFyay1iZy1hbHBoYS0xMjogICAgcmdiYSgke3RoZW1lLlBhbGV0dGUuRGFya0JhY2tncm91bmR9LCAwLjEyKTtcclxuXHJcbiAgICAgICRtYXQtbGlnaHQtdGhlbWUtYmFja2dyb3VuZDogKFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICAgICAgICAgICAgICAgJGxpZ2h0LWJhY2tncm91bmQsXHJcbiAgICAgICAgc3RhdHVzLWJhcjogICAgICAgICAgICAgICAkbGlnaHQtYmctZGFya2VyLTIwLFxyXG4gICAgICAgIGFwcC1iYXI6ICAgICAgICAgICAgICAgICAgJGxpZ2h0LWJnLWRhcmtlci01LFxyXG4gICAgICAgIGhvdmVyOiAgICAgICAgICAgICAgICAgICAgJGRhcmstYmctYWxwaGEtNCxcclxuICAgICAgICBjYXJkOiAgICAgICAgICAgICAgICAgICAgICRsaWdodC1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZGlhbG9nOiAgICAgICAgICAgICAgICAgICAkbGlnaHQtYmctbGlnaHRlci01LFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbjogICAgICAgICAgJGRhcmstYmctYWxwaGEtMTIsXHJcbiAgICAgICAgcmFpc2VkLWJ1dHRvbjogICAgICAgICAgICAkbGlnaHQtYmctbGlnaHRlci01LFxyXG4gICAgICAgIGZvY3VzZWQtYnV0dG9uOiAgICAgICAgICAgJGRhcmstZm9jdXNlZCxcclxuICAgICAgICBzZWxlY3RlZC1idXR0b246ICAgICAgICAgICRsaWdodC1iZy1kYXJrZXItMjAsXHJcbiAgICAgICAgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uOiAkbGlnaHQtYmctZGFya2VyLTMwLFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbi10b2dnbGU6ICAgJGxpZ2h0LWJnLWRhcmtlci0xMCxcclxuICAgICAgICB1bnNlbGVjdGVkLWNoaXA6ICAgICAgICAgICRsaWdodC1iZy1kYXJrZXItMTAsXHJcbiAgICAgICAgZGlzYWJsZWQtbGlzdC1vcHRpb246ICAgICAkbGlnaHQtYmctZGFya2VyLTEwLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gRGFyayBiZ1xyXG4gICAgICAkZGFyay1iYWNrZ3JvdW5kOiAgICAgJHt0aGVtZS5QYWxldHRlLkRhcmtCYWNrZ3JvdW5kfTtcclxuICAgICAgJGRhcmstYmctbGlnaHRlci01OiAgIGxpZ2h0ZW4oJGRhcmstYmFja2dyb3VuZCwgNSUpO1xyXG4gICAgICAkZGFyay1iZy1saWdodGVyLTEwOiAgbGlnaHRlbigkZGFyay1iYWNrZ3JvdW5kLCAxMCUpO1xyXG4gICAgICAkZGFyay1iZy1saWdodGVyLTIwOiAgbGlnaHRlbigkZGFyay1iYWNrZ3JvdW5kLCAyMCUpO1xyXG4gICAgICAkZGFyay1iZy1saWdodGVyLTMwOiAgbGlnaHRlbigkZGFyay1iYWNrZ3JvdW5kLCAzMCUpO1xyXG4gICAgICAkbGlnaHQtYmctYWxwaGEtNDogICAgcmdiYSgke3RoZW1lLlBhbGV0dGUuTGlnaHRCYWNrZ3JvdW5kfSwgMC4wNCk7XHJcbiAgICAgICRsaWdodC1iZy1hbHBoYS0xMjogICByZ2JhKCR7dGhlbWUuUGFsZXR0ZS5MaWdodEJhY2tncm91bmR9LCAwLjEyKTtcclxuXHJcbiAgICAgIC8vIEJhY2tncm91bmQgcGFsZXR0ZSBmb3IgZGFyayB0aGVtZXMuXHJcbiAgICAgICRtYXQtZGFyay10aGVtZS1iYWNrZ3JvdW5kOiAoXHJcbiAgICAgICAgYmFja2dyb3VuZDogICAgICAgICAgICAgICAkZGFyay1iYWNrZ3JvdW5kLFxyXG4gICAgICAgIHN0YXR1cy1iYXI6ICAgICAgICAgICAgICAgJGRhcmstYmctbGlnaHRlci0yMCxcclxuICAgICAgICBhcHAtYmFyOiAgICAgICAgICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBob3ZlcjogICAgICAgICAgICAgICAgICAgICRsaWdodC1iZy1hbHBoYS00LFxyXG4gICAgICAgIGNhcmQ6ICAgICAgICAgICAgICAgICAgICAgJGRhcmstYmctbGlnaHRlci01LFxyXG4gICAgICAgIGRpYWxvZzogICAgICAgICAgICAgICAgICAgJGRhcmstYmctbGlnaHRlci01LFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbjogICAgICAgICAgJGxpZ2h0LWJnLWFscGhhLTEyLFxyXG4gICAgICAgIHJhaXNlZC1idXR0b246ICAgICAgICAgICAgJGRhcmstYmctbGlnaHRlci01LFxyXG4gICAgICAgIGZvY3VzZWQtYnV0dG9uOiAgICAgICAgICAgJGxpZ2h0LWZvY3VzZWQsXHJcbiAgICAgICAgc2VsZWN0ZWQtYnV0dG9uOiAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTIwLFxyXG4gICAgICAgIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbjogJGRhcmstYmctbGlnaHRlci0zMCxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b24tdG9nZ2xlOiAgICRkYXJrLWJnLWxpZ2h0ZXItMTAsXHJcbiAgICAgICAgdW5zZWxlY3RlZC1jaGlwOiAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTIwLFxyXG4gICAgICAgIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiAgICAgJGRhcmstYmctbGlnaHRlci0xMCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIFRoZW1lIENvbmZpZ1xyXG4gICAgICAke1sncHJpbWFyeScsICdhY2NlbnQnLCAnd2FybiddLm1hcCh4ID0+IHRoaXMuZ2V0U2Nzc1BhbGV0dGUoeCwgdGhlbWUuUGFsZXR0ZVt4XSkpLmpvaW4oJ1xcbicpfTtcclxuXHJcbiAgICAgICR0aGVtZTogJHshdGhlbWUuTGlnaHRuZXNzID8gJ21hdC1kYXJrLXRoZW1lJyA6ICdtYXQtbGlnaHQtdGhlbWUnfSgkdGhlbWUtcHJpbWFyeSwgJHRoZW1lLWFjY2VudCwgJHRoZW1lLXdhcm4pO1xyXG4gICAgICAkYWx0VGhlbWU6ICR7IXRoZW1lLkxpZ2h0bmVzcyA/ICdtYXQtbGlnaHQtdGhlbWUnIDogJ21hdC1kYXJrLXRoZW1lJ30oJHRoZW1lLXByaW1hcnksICR0aGVtZS1hY2NlbnQsICR0aGVtZS13YXJuKTtcclxuXHJcbiAgICAgIC8vIFRoZW1lIEluaXRcclxuICAgICAgQGluY2x1ZGUgYW5ndWxhci1tYXRlcmlhbC10aGVtZSgkdGhlbWUpO1xyXG5cclxuICAgICAgLnRoZW1lLWFsdGVybmF0ZSB7XHJcbiAgICAgICAgQGluY2x1ZGUgYW5ndWxhci1tYXRlcmlhbC10aGVtZSgkYWx0VGhlbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTcGVjaWZpYyBjb21wb25lbnQgb3ZlcnJpZGVzLCBwaWVjZXMgdGhhdCBhcmUgbm90IGluIGxpbmUgd2l0aCB0aGUgZ2VuZXJhbCB0aGVtaW5nXHJcblxyXG4gICAgICAvLyBIYW5kbGUgYnV0dG9ucyBhcHByb3ByaWF0ZWx5LCB3aXRoIHJlc3BlY3QgdG8gbGluZS1oZWlnaHRcclxuICAgICAgLm1hdC1yYWlzZWQtYnV0dG9uLCAubWF0LXN0cm9rZWQtYnV0dG9uLCAubWF0LWZsYXQtYnV0dG9uIHtcclxuICAgICAgICBwYWRkaW5nOiAwIDEuMTVlbTtcclxuICAgICAgICBtYXJnaW46IDAgLjY1ZW07XHJcbiAgICAgICAgbWluLXdpZHRoOiAzZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5tYXQtc3RhbmRhcmQtY2hpcCB7XHJcbiAgICAgICAgcGFkZGluZzogLjVlbSAuODVlbTtcclxuICAgICAgICBtaW4taGVpZ2h0OiAyLjVlbTtcclxuICAgICAgfVxyXG4gICAgICBgO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgU2NzcyBQYWxhdHRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG5hbWUgcGFsZXR0ZSBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN1YlBhbGV0dGUgU3ViUGFsZXR0ZU1vZGVsXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRTY3NzUGFsZXR0ZShuYW1lOiBzdHJpbmcsIHN1YlBhbGV0dGU6IFN1YlBhbGV0dGVNb2RlbCk6IHN0cmluZyB7XHJcblxyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICBib2R5IHtcclxuICAgICAgICAtLSR7bmFtZX0tY29sb3I6ICR7c3ViUGFsZXR0ZS5NYWlufTtcclxuICAgICAgICAtLSR7bmFtZX0tbGlnaHRlci1jb2xvcjogJHtzdWJQYWxldHRlLkxpZ2h0ZXJ9O1xyXG4gICAgICAgIC0tJHtuYW1lfS1kYXJrZXItY29sb3I6ICR7c3ViUGFsZXR0ZS5EYXJrZXJ9O1xyXG4gICAgICAgIC0tdGV4dC0ke25hbWV9LWNvbG9yOiAjeyR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5NYWluKX19O1xyXG4gICAgICAgIC0tdGV4dC0ke25hbWV9LWxpZ2h0ZXItY29sb3I6ICN7JHt0aGlzLmdldFRleHRDb2xvcihzdWJQYWxldHRlLkxpZ2h0ZXIpfX07XHJcbiAgICAgICAgLS10ZXh0LSR7bmFtZX0tZGFya2VyLWNvbG9yOiAjeyR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5EYXJrZXIpfX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAkbWF0LSR7bmFtZX06IChcclxuICAgICAgbWFpbjogJHtzdWJQYWxldHRlLk1haW59LFxyXG4gICAgICBsaWdodGVyOiAke3N1YlBhbGV0dGUuTGlnaHRlcn0sXHJcbiAgICAgIGRhcmtlcjogJHtzdWJQYWxldHRlLkRhcmtlcn0sXHJcbiAgICAgIDIwMDogJHtzdWJQYWxldHRlLk1haW59LCAvLyBGb3Igc2xpZGUgdG9nZ2xlLFxyXG4gICAgICBjb250cmFzdCA6IChcclxuICAgICAgICBtYWluOiAke3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUuTWFpbil9LFxyXG4gICAgICAgIGxpZ2h0ZXI6ICR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5MaWdodGVyKX0sXHJcbiAgICAgICAgZGFya2VyOiAke3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUuRGFya2VyKX0sXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICAkdGhlbWUtJHtuYW1lfTogbWF0LXBhbGV0dGUoJG1hdC0ke25hbWV9LCBtYWluLCBsaWdodGVyLCBkYXJrZXIpO2A7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRleHQgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY29sIGNvbG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUZXh0Q29sb3IoY29sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gYCQke3RpbnlDb2xvcihjb2wpLmlzTGlnaHQoKSA/ICdkYXJrJyA6ICdsaWdodCd9LXByaW1hcnktdGV4dGA7XHJcbiAgICB9XHJcbn1cclxuIl19