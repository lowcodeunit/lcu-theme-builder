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
      $dark-text: ${theme.palette.lightText};
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
      $light-text: ${theme.palette.darkText};
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
      $light-background:    ${theme.palette.lightBackground};
      $light-bg-darker-5:   darken($light-background, 5%);
      $light-bg-darker-10:  darken($light-background, 10%);
      $light-bg-darker-20:  darken($light-background, 20%);
      $light-bg-darker-30:  darken($light-background, 30%);
      $light-bg-lighter-5:  lighten($light-background, 5%);
      $dark-bg-alpha-4:     rgba(${theme.palette.darkBackground}, 0.04);
      $dark-bg-alpha-12:    rgba(${theme.palette.darkBackground}, 0.12);

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
      $dark-background:     ${theme.palette.darkBackground};
      $dark-bg-lighter-5:   lighten($dark-background, 5%);
      $dark-bg-lighter-10:  lighten($dark-background, 10%);
      $dark-bg-lighter-20:  lighten($dark-background, 20%);
      $dark-bg-lighter-30:  lighten($dark-background, 30%);
      $light-bg-alpha-4:    rgba(${theme.palette.lightBackground}, 0.04);
      $light-bg-alpha-12:   rgba(${theme.palette.lightBackground}, 0.12);

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
      ${['primary', 'accent', 'warn'].map(x => this.getScssPalette(x, theme.palette[x])).join('\n')};

      $theme: ${!theme.lightness ? 'mat-dark-theme' : 'mat-light-theme'}($theme-primary, $theme-accent, $theme-warn);
      $altTheme: ${!theme.lightness ? 'mat-light-theme' : 'mat-dark-theme'}($theme-primary, $theme-accent, $theme-warn);

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
        --${name}-color: ${subPalette.main};
        --${name}-lighter-color: ${subPalette.lighter};
        --${name}-darker-color: ${subPalette.darker};
        --text-${name}-color: #{${this.getTextColor(subPalette.main)}};
        --text-${name}-lighter-color: #{${this.getTextColor(subPalette.lighter)}};
        --text-${name}-darker-color: #{${this.getTextColor(subPalette.darker)}};
      }

    $mat-${name}: (
      main: ${subPalette.main},
      lighter: ${subPalette.lighter},
      darker: ${subPalette.darker},
      200: ${subPalette.main}, // For slide toggle,
      contrast : (
        main: ${this.getTextColor(subPalette.main)},
        lighter: ${this.getTextColor(subPalette.lighter)},
        darker: ${this.getTextColor(subPalette.darker)},
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
PaletteTemplateService.ɵfac = function PaletteTemplateService_Factory(t) { return new (t || PaletteTemplateService)(); };
PaletteTemplateService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PaletteTemplateService, factory: PaletteTemplateService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaletteTemplateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7O0FBRXhDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQU81QixNQUFNLE9BQU8sc0JBQXNCO0lBRWpDOzs7O09BSUc7SUFDTSxXQUFXLENBQUMsS0FBaUI7UUFFbEMsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7O29CQVFILEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQTJCdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTRCYixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWU7Ozs7OzttQ0FNeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjO21DQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQW9CakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjOzs7OzttQ0FLdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlO21DQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCeEQsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O2dCQUVuRixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxpQkFBaUI7bUJBQ3BELENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCbkUsQ0FBQztRQUVKLE9BQU8sUUFBUSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxjQUFjLENBQUMsSUFBWSxFQUFFLFVBQTJCO1FBQ2hFLE9BQU87O1lBRUQsSUFBSSxXQUFXLFVBQVUsQ0FBQyxJQUFJO1lBQzlCLElBQUksbUJBQW1CLFVBQVUsQ0FBQyxPQUFPO1lBQ3pDLElBQUksa0JBQWtCLFVBQVUsQ0FBQyxNQUFNO2lCQUNsQyxJQUFJLGFBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO2lCQUNuRCxJQUFJLHFCQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7aUJBQzlELElBQUksb0JBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7O1dBR2xFLElBQUk7Y0FDRCxVQUFVLENBQUMsSUFBSTtpQkFDWixVQUFVLENBQUMsT0FBTztnQkFDbkIsVUFBVSxDQUFDLE1BQU07YUFDcEIsVUFBVSxDQUFDLElBQUk7O2dCQUVaLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzttQkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2tCQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OzthQUd6QyxJQUFJLHNCQUFzQixJQUFJLDJCQUEyQixDQUFDO0lBQ3JFLENBQUM7SUFFQzs7OztPQUlHO0lBQ08sWUFBWSxDQUFDLEdBQVc7UUFDaEMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLGVBQWUsQ0FBQztJQUN4RSxDQUFDOzs0RkF0TVEsc0JBQXNCOzRFQUF0QixzQkFBc0IsV0FBdEIsc0JBQXNCLG1CQUhuQixNQUFNO3VGQUdULHNCQUFzQjtjQUpsQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaGVtZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJQYWxldHRlTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9zdWItcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG50eXBlIFJHQkEgPSB0aW55Y29sb3IuQ29sb3JGb3JtYXRzLlJHQkE7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxuICB9KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGVtcGxhdGUgZm9yIHNjc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0aGVtZSBjdXJyZW50IHRoZW1lXHJcbiAgICovXHJcbiAgICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG5cclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcbiAgICAgIEBpbXBvcnQgJ35AYW5ndWxhci9tYXRlcmlhbC90aGVtaW5nJztcclxuICAgICAgLy8gSW5jbHVkZSB0aGUgY29tbW9uIHN0eWxlcyBmb3IgQW5ndWxhciBNYXRlcmlhbC4gV2UgaW5jbHVkZSB0aGlzIGhlcmUgc28gdGhhdCB5b3Ugb25seVxyXG4gICAgICAvLyBoYXZlIHRvIGxvYWQgYSBzaW5nbGUgY3NzIGZpbGUgZm9yIEFuZ3VsYXIgTWF0ZXJpYWwgaW4geW91ciBhcHAuXHJcblxyXG4gICAgICAvLyBGb3JlZ3JvdW5kIEVsZW1lbnRzXHJcblxyXG4gICAgICAvLyBMaWdodCBUaGVtZSBUZXh0XHJcbiAgICAgICRkYXJrLXRleHQ6ICR7dGhlbWUucGFsZXR0ZS5saWdodFRleHR9O1xyXG4gICAgICAkZGFyay1wcmltYXJ5LXRleHQ6IHJnYmEoJGRhcmstdGV4dCwgMC44Nyk7XHJcbiAgICAgICRkYXJrLWFjY2VudC10ZXh0OiByZ2JhKCRkYXJrLXByaW1hcnktdGV4dCwgMC41NCk7XHJcbiAgICAgICRkYXJrLWRpc2FibGVkLXRleHQ6IHJnYmEoJGRhcmstcHJpbWFyeS10ZXh0LCAwLjM4KTtcclxuICAgICAgJGRhcmstZGl2aWRlcnM6IHJnYmEoJGRhcmstcHJpbWFyeS10ZXh0LCAwLjEyKTtcclxuICAgICAgJGRhcmstZm9jdXNlZDogcmdiYSgkZGFyay1wcmltYXJ5LXRleHQsIDAuMTIpO1xyXG5cclxuICAgICAgJG1hdC1saWdodC10aGVtZS1mb3JlZ3JvdW5kOiAoXHJcbiAgICAgICAgYmFzZTogICAgICAgICAgICAgIGJsYWNrLFxyXG4gICAgICAgIGRpdmlkZXI6ICAgICAgICAgICAkZGFyay1kaXZpZGVycyxcclxuICAgICAgICBkaXZpZGVyczogICAgICAgICAgJGRhcmstZGl2aWRlcnMsXHJcbiAgICAgICAgZGlzYWJsZWQ6ICAgICAgICAgICRkYXJrLWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uOiAgIHJnYmEoJGRhcmstdGV4dCwgMC4yNiksXHJcbiAgICAgICAgZGlzYWJsZWQtdGV4dDogICAgICRkYXJrLWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgZWxldmF0aW9uOiAgICAgICAgIGJsYWNrLFxyXG4gICAgICAgIHNlY29uZGFyeS10ZXh0OiAgICAkZGFyay1hY2NlbnQtdGV4dCxcclxuICAgICAgICBoaW50LXRleHQ6ICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBhY2NlbnQtdGV4dDogICAgICAgJGRhcmstYWNjZW50LXRleHQsXHJcbiAgICAgICAgaWNvbjogICAgICAgICAgICAgICRkYXJrLWFjY2VudC10ZXh0LFxyXG4gICAgICAgIGljb25zOiAgICAgICAgICAgICAkZGFyay1hY2NlbnQtdGV4dCxcclxuICAgICAgICB0ZXh0OiAgICAgICAgICAgICAgJGRhcmstcHJpbWFyeS10ZXh0LFxyXG4gICAgICAgIHNsaWRlci1taW46ICAgICAgICAkZGFyay1wcmltYXJ5LXRleHQsXHJcbiAgICAgICAgc2xpZGVyLW9mZjogICAgICAgIHJnYmEoJGRhcmstdGV4dCwgMC4yNiksXHJcbiAgICAgICAgc2xpZGVyLW9mZi1hY3RpdmU6ICRkYXJrLWRpc2FibGVkLXRleHQsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBEYXJrIFRoZW1lIHRleHRcclxuICAgICAgJGxpZ2h0LXRleHQ6ICR7dGhlbWUucGFsZXR0ZS5kYXJrVGV4dH07XHJcbiAgICAgICRsaWdodC1wcmltYXJ5LXRleHQ6ICRsaWdodC10ZXh0O1xyXG4gICAgICAkbGlnaHQtYWNjZW50LXRleHQ6IHJnYmEoJGxpZ2h0LXByaW1hcnktdGV4dCwgMC43KTtcclxuICAgICAgJGxpZ2h0LWRpc2FibGVkLXRleHQ6IHJnYmEoJGxpZ2h0LXByaW1hcnktdGV4dCwgMC41KTtcclxuICAgICAgJGxpZ2h0LWRpdmlkZXJzOiByZ2JhKCRsaWdodC1wcmltYXJ5LXRleHQsIDAuMTIpO1xyXG4gICAgICAkbGlnaHQtZm9jdXNlZDogcmdiYSgkbGlnaHQtcHJpbWFyeS10ZXh0LCAwLjEyKTtcclxuXHJcbiAgICAgICRtYXQtZGFyay10aGVtZS1mb3JlZ3JvdW5kOiAoXHJcbiAgICAgICAgYmFzZTogICAgICAgICAgICAgICRsaWdodC10ZXh0LFxyXG4gICAgICAgIGRpdmlkZXI6ICAgICAgICAgICAkbGlnaHQtZGl2aWRlcnMsXHJcbiAgICAgICAgZGl2aWRlcnM6ICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcclxuICAgICAgICBkaXNhYmxlZDogICAgICAgICAgJGxpZ2h0LWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uOiAgIHJnYmEoJGxpZ2h0LXRleHQsIDAuMyksXHJcbiAgICAgICAgZGlzYWJsZWQtdGV4dDogICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIGVsZXZhdGlvbjogICAgICAgICBibGFjayxcclxuICAgICAgICBoaW50LXRleHQ6ICAgICAgICAgJGxpZ2h0LWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgc2Vjb25kYXJ5LXRleHQ6ICAgICRsaWdodC1hY2NlbnQtdGV4dCxcclxuICAgICAgICBhY2NlbnQtdGV4dDogICAgICAgJGxpZ2h0LWFjY2VudC10ZXh0LFxyXG4gICAgICAgIGljb246ICAgICAgICAgICAgICAkbGlnaHQtdGV4dCxcclxuICAgICAgICBpY29uczogICAgICAgICAgICAgJGxpZ2h0LXRleHQsXHJcbiAgICAgICAgdGV4dDogICAgICAgICAgICAgICRsaWdodC10ZXh0LFxyXG4gICAgICAgIHNsaWRlci1taW46ICAgICAgICAkbGlnaHQtdGV4dCxcclxuICAgICAgICBzbGlkZXItb2ZmOiAgICAgICAgcmdiYSgkbGlnaHQtdGV4dCwgMC4zKSxcclxuICAgICAgICBzbGlkZXItb2ZmLWFjdGl2ZTogcmdiYSgkbGlnaHQtdGV4dCwgMC4zKSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIEJhY2tncm91bmQgY29uZmlnXHJcbiAgICAgIC8vIExpZ2h0IGJnXHJcbiAgICAgICRsaWdodC1iYWNrZ3JvdW5kOiAgICAke3RoZW1lLnBhbGV0dGUubGlnaHRCYWNrZ3JvdW5kfTtcclxuICAgICAgJGxpZ2h0LWJnLWRhcmtlci01OiAgIGRhcmtlbigkbGlnaHQtYmFja2dyb3VuZCwgNSUpO1xyXG4gICAgICAkbGlnaHQtYmctZGFya2VyLTEwOiAgZGFya2VuKCRsaWdodC1iYWNrZ3JvdW5kLCAxMCUpO1xyXG4gICAgICAkbGlnaHQtYmctZGFya2VyLTIwOiAgZGFya2VuKCRsaWdodC1iYWNrZ3JvdW5kLCAyMCUpO1xyXG4gICAgICAkbGlnaHQtYmctZGFya2VyLTMwOiAgZGFya2VuKCRsaWdodC1iYWNrZ3JvdW5kLCAzMCUpO1xyXG4gICAgICAkbGlnaHQtYmctbGlnaHRlci01OiAgbGlnaHRlbigkbGlnaHQtYmFja2dyb3VuZCwgNSUpO1xyXG4gICAgICAkZGFyay1iZy1hbHBoYS00OiAgICAgcmdiYSgke3RoZW1lLnBhbGV0dGUuZGFya0JhY2tncm91bmR9LCAwLjA0KTtcclxuICAgICAgJGRhcmstYmctYWxwaGEtMTI6ICAgIHJnYmEoJHt0aGVtZS5wYWxldHRlLmRhcmtCYWNrZ3JvdW5kfSwgMC4xMik7XHJcblxyXG4gICAgICAkbWF0LWxpZ2h0LXRoZW1lLWJhY2tncm91bmQ6IChcclxuICAgICAgICBiYWNrZ3JvdW5kOiAgICAgICAgICAgICAgICRsaWdodC1iYWNrZ3JvdW5kLFxyXG4gICAgICAgIHN0YXR1cy1iYXI6ICAgICAgICAgICAgICAgJGxpZ2h0LWJnLWRhcmtlci0yMCxcclxuICAgICAgICBhcHAtYmFyOiAgICAgICAgICAgICAgICAgICRsaWdodC1iZy1kYXJrZXItNSxcclxuICAgICAgICBob3ZlcjogICAgICAgICAgICAgICAgICAgICRkYXJrLWJnLWFscGhhLTQsXHJcbiAgICAgICAgY2FyZDogICAgICAgICAgICAgICAgICAgICAkbGlnaHQtYmctbGlnaHRlci01LFxyXG4gICAgICAgIGRpYWxvZzogICAgICAgICAgICAgICAgICAgJGxpZ2h0LWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b246ICAgICAgICAgICRkYXJrLWJnLWFscGhhLTEyLFxyXG4gICAgICAgIHJhaXNlZC1idXR0b246ICAgICAgICAgICAgJGxpZ2h0LWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBmb2N1c2VkLWJ1dHRvbjogICAgICAgICAgICRkYXJrLWZvY3VzZWQsXHJcbiAgICAgICAgc2VsZWN0ZWQtYnV0dG9uOiAgICAgICAgICAkbGlnaHQtYmctZGFya2VyLTIwLFxyXG4gICAgICAgIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbjogJGxpZ2h0LWJnLWRhcmtlci0zMCxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b24tdG9nZ2xlOiAgICRsaWdodC1iZy1kYXJrZXItMTAsXHJcbiAgICAgICAgdW5zZWxlY3RlZC1jaGlwOiAgICAgICAgICAkbGlnaHQtYmctZGFya2VyLTEwLFxyXG4gICAgICAgIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiAgICAgJGxpZ2h0LWJnLWRhcmtlci0xMCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIC8vIERhcmsgYmdcclxuICAgICAgJGRhcmstYmFja2dyb3VuZDogICAgICR7dGhlbWUucGFsZXR0ZS5kYXJrQmFja2dyb3VuZH07XHJcbiAgICAgICRkYXJrLWJnLWxpZ2h0ZXItNTogICBsaWdodGVuKCRkYXJrLWJhY2tncm91bmQsIDUlKTtcclxuICAgICAgJGRhcmstYmctbGlnaHRlci0xMDogIGxpZ2h0ZW4oJGRhcmstYmFja2dyb3VuZCwgMTAlKTtcclxuICAgICAgJGRhcmstYmctbGlnaHRlci0yMDogIGxpZ2h0ZW4oJGRhcmstYmFja2dyb3VuZCwgMjAlKTtcclxuICAgICAgJGRhcmstYmctbGlnaHRlci0zMDogIGxpZ2h0ZW4oJGRhcmstYmFja2dyb3VuZCwgMzAlKTtcclxuICAgICAgJGxpZ2h0LWJnLWFscGhhLTQ6ICAgIHJnYmEoJHt0aGVtZS5wYWxldHRlLmxpZ2h0QmFja2dyb3VuZH0sIDAuMDQpO1xyXG4gICAgICAkbGlnaHQtYmctYWxwaGEtMTI6ICAgcmdiYSgke3RoZW1lLnBhbGV0dGUubGlnaHRCYWNrZ3JvdW5kfSwgMC4xMik7XHJcblxyXG4gICAgICAvLyBCYWNrZ3JvdW5kIHBhbGV0dGUgZm9yIGRhcmsgdGhlbWVzLlxyXG4gICAgICAkbWF0LWRhcmstdGhlbWUtYmFja2dyb3VuZDogKFxyXG4gICAgICAgIGJhY2tncm91bmQ6ICAgICAgICAgICAgICAgJGRhcmstYmFja2dyb3VuZCxcclxuICAgICAgICBzdGF0dXMtYmFyOiAgICAgICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMjAsXHJcbiAgICAgICAgYXBwLWJhcjogICAgICAgICAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgaG92ZXI6ICAgICAgICAgICAgICAgICAgICAkbGlnaHQtYmctYWxwaGEtNCxcclxuICAgICAgICBjYXJkOiAgICAgICAgICAgICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBkaWFsb2c6ICAgICAgICAgICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBkaXNhYmxlZC1idXR0b246ICAgICAgICAgICRsaWdodC1iZy1hbHBoYS0xMixcclxuICAgICAgICByYWlzZWQtYnV0dG9uOiAgICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBmb2N1c2VkLWJ1dHRvbjogICAgICAgICAgICRsaWdodC1mb2N1c2VkLFxyXG4gICAgICAgIHNlbGVjdGVkLWJ1dHRvbjogICAgICAgICAgJGRhcmstYmctbGlnaHRlci0yMCxcclxuICAgICAgICBzZWxlY3RlZC1kaXNhYmxlZC1idXR0b246ICRkYXJrLWJnLWxpZ2h0ZXItMzAsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uLXRvZ2dsZTogICAkZGFyay1iZy1saWdodGVyLTEwLFxyXG4gICAgICAgIHVuc2VsZWN0ZWQtY2hpcDogICAgICAgICAgJGRhcmstYmctbGlnaHRlci0yMCxcclxuICAgICAgICBkaXNhYmxlZC1saXN0LW9wdGlvbjogICAgICRkYXJrLWJnLWxpZ2h0ZXItMTAsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBUaGVtZSBDb25maWdcclxuICAgICAgJHtbJ3ByaW1hcnknLCAnYWNjZW50JywgJ3dhcm4nXS5tYXAoeCA9PiB0aGlzLmdldFNjc3NQYWxldHRlKHgsIHRoZW1lLnBhbGV0dGVbeF0pKS5qb2luKCdcXG4nKX07XHJcblxyXG4gICAgICAkdGhlbWU6ICR7IXRoZW1lLmxpZ2h0bmVzcyA/ICdtYXQtZGFyay10aGVtZScgOiAnbWF0LWxpZ2h0LXRoZW1lJ30oJHRoZW1lLXByaW1hcnksICR0aGVtZS1hY2NlbnQsICR0aGVtZS13YXJuKTtcclxuICAgICAgJGFsdFRoZW1lOiAkeyF0aGVtZS5saWdodG5lc3MgPyAnbWF0LWxpZ2h0LXRoZW1lJyA6ICdtYXQtZGFyay10aGVtZSd9KCR0aGVtZS1wcmltYXJ5LCAkdGhlbWUtYWNjZW50LCAkdGhlbWUtd2Fybik7XHJcblxyXG4gICAgICAvLyBUaGVtZSBJbml0XHJcbiAgICAgIEBpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJHRoZW1lKTtcclxuXHJcbiAgICAgIC50aGVtZS1hbHRlcm5hdGUge1xyXG4gICAgICAgIEBpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJGFsdFRoZW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG5cclxuICAgICAgLy8gU3BlY2lmaWMgY29tcG9uZW50IG92ZXJyaWRlcywgcGllY2VzIHRoYXQgYXJlIG5vdCBpbiBsaW5lIHdpdGggdGhlIGdlbmVyYWwgdGhlbWluZ1xyXG5cclxuICAgICAgLy8gSGFuZGxlIGJ1dHRvbnMgYXBwcm9wcmlhdGVseSwgd2l0aCByZXNwZWN0IHRvIGxpbmUtaGVpZ2h0XHJcbiAgICAgIC5tYXQtcmFpc2VkLWJ1dHRvbiwgLm1hdC1zdHJva2VkLWJ1dHRvbiwgLm1hdC1mbGF0LWJ1dHRvbiB7XHJcbiAgICAgICAgcGFkZGluZzogMCAxLjE1ZW07XHJcbiAgICAgICAgbWFyZ2luOiAwIC42NWVtO1xyXG4gICAgICAgIG1pbi13aWR0aDogM2VtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAubWF0LXN0YW5kYXJkLWNoaXAge1xyXG4gICAgICAgIHBhZGRpbmc6IC41ZW0gLjg1ZW07XHJcbiAgICAgICAgbWluLWhlaWdodDogMi41ZW07XHJcbiAgICAgIH1cclxuICAgICAgYDtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIFNjc3MgUGFsYXR0ZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lIHBhbGV0dGUgbmFtZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzdWJQYWxldHRlIFN1YlBhbGV0dGVNb2RlbFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0U2Nzc1BhbGV0dGUobmFtZTogc3RyaW5nLCBzdWJQYWxldHRlOiBTdWJQYWxldHRlTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gYFxyXG4gICAgICBib2R5IHtcclxuICAgICAgICAtLSR7bmFtZX0tY29sb3I6ICR7c3ViUGFsZXR0ZS5tYWlufTtcclxuICAgICAgICAtLSR7bmFtZX0tbGlnaHRlci1jb2xvcjogJHtzdWJQYWxldHRlLmxpZ2h0ZXJ9O1xyXG4gICAgICAgIC0tJHtuYW1lfS1kYXJrZXItY29sb3I6ICR7c3ViUGFsZXR0ZS5kYXJrZXJ9O1xyXG4gICAgICAgIC0tdGV4dC0ke25hbWV9LWNvbG9yOiAjeyR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5tYWluKX19O1xyXG4gICAgICAgIC0tdGV4dC0ke25hbWV9LWxpZ2h0ZXItY29sb3I6ICN7JHt0aGlzLmdldFRleHRDb2xvcihzdWJQYWxldHRlLmxpZ2h0ZXIpfX07XHJcbiAgICAgICAgLS10ZXh0LSR7bmFtZX0tZGFya2VyLWNvbG9yOiAjeyR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5kYXJrZXIpfX07XHJcbiAgICAgIH1cclxuXHJcbiAgICAkbWF0LSR7bmFtZX06IChcclxuICAgICAgbWFpbjogJHtzdWJQYWxldHRlLm1haW59LFxyXG4gICAgICBsaWdodGVyOiAke3N1YlBhbGV0dGUubGlnaHRlcn0sXHJcbiAgICAgIGRhcmtlcjogJHtzdWJQYWxldHRlLmRhcmtlcn0sXHJcbiAgICAgIDIwMDogJHtzdWJQYWxldHRlLm1haW59LCAvLyBGb3Igc2xpZGUgdG9nZ2xlLFxyXG4gICAgICBjb250cmFzdCA6IChcclxuICAgICAgICBtYWluOiAke3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUubWFpbil9LFxyXG4gICAgICAgIGxpZ2h0ZXI6ICR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5saWdodGVyKX0sXHJcbiAgICAgICAgZGFya2VyOiAke3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUuZGFya2VyKX0sXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgICAkdGhlbWUtJHtuYW1lfTogbWF0LXBhbGV0dGUoJG1hdC0ke25hbWV9LCBtYWluLCBsaWdodGVyLCBkYXJrZXIpO2A7XHJcbiAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRleHQgY29sb3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY29sIGNvbG9yXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRUZXh0Q29sb3IoY29sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICByZXR1cm4gYCQke3RpbnlDb2xvcihjb2wpLmlzTGlnaHQoKSA/ICdkYXJrJyA6ICdsaWdodCd9LXByaW1hcnktdGV4dGA7XHJcbiAgICB9XHJcbn1cclxuIl19