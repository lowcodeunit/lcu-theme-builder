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
PaletteTemplateService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PaletteTemplateService_Factory() { return new PaletteTemplateService(); }, token: PaletteTemplateService, providedIn: "root" });
PaletteTemplateService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvcGFsZXR0ZS10ZW1wbGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxLQUFLLFNBQVMsTUFBTSxZQUFZLENBQUM7O0FBRXhDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQU81QixNQUFNLE9BQU8sc0JBQXNCO0lBRWpDOzs7O09BSUc7SUFDTSxXQUFXLENBQUMsS0FBaUI7UUFFbEMsTUFBTSxRQUFRLEdBQUc7Ozs7Ozs7OztvQkFTSCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkEyQnRCLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkE0QmIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlOzs7Ozs7bUNBTXhCLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYzttQ0FDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFvQmpDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYzs7Ozs7bUNBS3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZTttQ0FDN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQnhELENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztnQkFFbkYsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCO21CQUNwRCxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qm5FLENBQUM7UUFFSixPQUFPLFFBQVEsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sY0FBYyxDQUFDLElBQVksRUFBRSxVQUEyQjtRQUNoRSxPQUFPOztZQUVELElBQUksV0FBVyxVQUFVLENBQUMsSUFBSTtZQUM5QixJQUFJLG1CQUFtQixVQUFVLENBQUMsT0FBTztZQUN6QyxJQUFJLGtCQUFrQixVQUFVLENBQUMsTUFBTTtpQkFDbEMsSUFBSSxhQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztpQkFDbkQsSUFBSSxxQkFBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2lCQUM5RCxJQUFJLG9CQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OztXQUdsRSxJQUFJO2NBQ0QsVUFBVSxDQUFDLElBQUk7aUJBQ1osVUFBVSxDQUFDLE9BQU87Z0JBQ25CLFVBQVUsQ0FBQyxNQUFNO2FBQ3BCLFVBQVUsQ0FBQyxJQUFJOztnQkFFWixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7bUJBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztrQkFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDOzs7YUFHekMsSUFBSSxzQkFBc0IsSUFBSSwyQkFBMkIsQ0FBQztJQUNyRSxDQUFDO0lBRUM7Ozs7T0FJRztJQUNPLFlBQVksQ0FBQyxHQUFXO1FBQ2hDLE9BQU8sSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxlQUFlLENBQUM7SUFDeEUsQ0FBQzs7OztZQTNNSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaGVtZU1vZGVsIH0gZnJvbSAnLi8uLi9tb2RlbHMvdGhlbWUubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJQYWxldHRlTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9zdWItcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5cclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG50eXBlIFJHQkEgPSB0aW55Y29sb3IuQ29sb3JGb3JtYXRzLlJHQkE7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxuICB9KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbGV0dGVUZW1wbGF0ZVNlcnZpY2Uge1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGVtcGxhdGUgZm9yIHNjc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB0aGVtZSBjdXJyZW50IHRoZW1lXHJcbiAgICovXHJcbiAgICBwdWJsaWMgR2V0VGVtcGxhdGUodGhlbWU6IFRoZW1lTW9kZWwpOiBzdHJpbmcge1xyXG5cclxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBgXHJcblxyXG4gICAgICBAaW1wb3J0ICd+QGFuZ3VsYXIvbWF0ZXJpYWwvdGhlbWluZyc7XHJcbiAgICAgIC8vIEluY2x1ZGUgdGhlIGNvbW1vbiBzdHlsZXMgZm9yIEFuZ3VsYXIgTWF0ZXJpYWwuIFdlIGluY2x1ZGUgdGhpcyBoZXJlIHNvIHRoYXQgeW91IG9ubHlcclxuICAgICAgLy8gaGF2ZSB0byBsb2FkIGEgc2luZ2xlIGNzcyBmaWxlIGZvciBBbmd1bGFyIE1hdGVyaWFsIGluIHlvdXIgYXBwLlxyXG5cclxuICAgICAgLy8gRm9yZWdyb3VuZCBFbGVtZW50c1xyXG5cclxuICAgICAgLy8gTGlnaHQgVGhlbWUgVGV4dFxyXG4gICAgICAkZGFyay10ZXh0OiAke3RoZW1lLnBhbGV0dGUubGlnaHRUZXh0fTtcclxuICAgICAgJGRhcmstcHJpbWFyeS10ZXh0OiByZ2JhKCRkYXJrLXRleHQsIDAuODcpO1xyXG4gICAgICAkZGFyay1hY2NlbnQtdGV4dDogcmdiYSgkZGFyay1wcmltYXJ5LXRleHQsIDAuNTQpO1xyXG4gICAgICAkZGFyay1kaXNhYmxlZC10ZXh0OiByZ2JhKCRkYXJrLXByaW1hcnktdGV4dCwgMC4zOCk7XHJcbiAgICAgICRkYXJrLWRpdmlkZXJzOiByZ2JhKCRkYXJrLXByaW1hcnktdGV4dCwgMC4xMik7XHJcbiAgICAgICRkYXJrLWZvY3VzZWQ6IHJnYmEoJGRhcmstcHJpbWFyeS10ZXh0LCAwLjEyKTtcclxuXHJcbiAgICAgICRtYXQtbGlnaHQtdGhlbWUtZm9yZWdyb3VuZDogKFxyXG4gICAgICAgIGJhc2U6ICAgICAgICAgICAgICBibGFjayxcclxuICAgICAgICBkaXZpZGVyOiAgICAgICAgICAgJGRhcmstZGl2aWRlcnMsXHJcbiAgICAgICAgZGl2aWRlcnM6ICAgICAgICAgICRkYXJrLWRpdmlkZXJzLFxyXG4gICAgICAgIGRpc2FibGVkOiAgICAgICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbjogICByZ2JhKCRkYXJrLXRleHQsIDAuMjYpLFxyXG4gICAgICAgIGRpc2FibGVkLXRleHQ6ICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIGVsZXZhdGlvbjogICAgICAgICBibGFjayxcclxuICAgICAgICBzZWNvbmRhcnktdGV4dDogICAgJGRhcmstYWNjZW50LXRleHQsXHJcbiAgICAgICAgaGludC10ZXh0OiAgICAgICAgICRkYXJrLWRpc2FibGVkLXRleHQsXHJcbiAgICAgICAgYWNjZW50LXRleHQ6ICAgICAgICRkYXJrLWFjY2VudC10ZXh0LFxyXG4gICAgICAgIGljb246ICAgICAgICAgICAgICAkZGFyay1hY2NlbnQtdGV4dCxcclxuICAgICAgICBpY29uczogICAgICAgICAgICAgJGRhcmstYWNjZW50LXRleHQsXHJcbiAgICAgICAgdGV4dDogICAgICAgICAgICAgICRkYXJrLXByaW1hcnktdGV4dCxcclxuICAgICAgICBzbGlkZXItbWluOiAgICAgICAgJGRhcmstcHJpbWFyeS10ZXh0LFxyXG4gICAgICAgIHNsaWRlci1vZmY6ICAgICAgICByZ2JhKCRkYXJrLXRleHQsIDAuMjYpLFxyXG4gICAgICAgIHNsaWRlci1vZmYtYWN0aXZlOiAkZGFyay1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gRGFyayBUaGVtZSB0ZXh0XHJcbiAgICAgICRsaWdodC10ZXh0OiAke3RoZW1lLnBhbGV0dGUuZGFya1RleHR9O1xyXG4gICAgICAkbGlnaHQtcHJpbWFyeS10ZXh0OiAkbGlnaHQtdGV4dDtcclxuICAgICAgJGxpZ2h0LWFjY2VudC10ZXh0OiByZ2JhKCRsaWdodC1wcmltYXJ5LXRleHQsIDAuNyk7XHJcbiAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0OiByZ2JhKCRsaWdodC1wcmltYXJ5LXRleHQsIDAuNSk7XHJcbiAgICAgICRsaWdodC1kaXZpZGVyczogcmdiYSgkbGlnaHQtcHJpbWFyeS10ZXh0LCAwLjEyKTtcclxuICAgICAgJGxpZ2h0LWZvY3VzZWQ6IHJnYmEoJGxpZ2h0LXByaW1hcnktdGV4dCwgMC4xMik7XHJcblxyXG4gICAgICAkbWF0LWRhcmstdGhlbWUtZm9yZWdyb3VuZDogKFxyXG4gICAgICAgIGJhc2U6ICAgICAgICAgICAgICAkbGlnaHQtdGV4dCxcclxuICAgICAgICBkaXZpZGVyOiAgICAgICAgICAgJGxpZ2h0LWRpdmlkZXJzLFxyXG4gICAgICAgIGRpdmlkZXJzOiAgICAgICAgICAkbGlnaHQtZGl2aWRlcnMsXHJcbiAgICAgICAgZGlzYWJsZWQ6ICAgICAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbjogICByZ2JhKCRsaWdodC10ZXh0LCAwLjMpLFxyXG4gICAgICAgIGRpc2FibGVkLXRleHQ6ICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcclxuICAgICAgICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXHJcbiAgICAgICAgaGludC10ZXh0OiAgICAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxyXG4gICAgICAgIHNlY29uZGFyeS10ZXh0OiAgICAkbGlnaHQtYWNjZW50LXRleHQsXHJcbiAgICAgICAgYWNjZW50LXRleHQ6ICAgICAgICRsaWdodC1hY2NlbnQtdGV4dCxcclxuICAgICAgICBpY29uOiAgICAgICAgICAgICAgJGxpZ2h0LXRleHQsXHJcbiAgICAgICAgaWNvbnM6ICAgICAgICAgICAgICRsaWdodC10ZXh0LFxyXG4gICAgICAgIHRleHQ6ICAgICAgICAgICAgICAkbGlnaHQtdGV4dCxcclxuICAgICAgICBzbGlkZXItbWluOiAgICAgICAgJGxpZ2h0LXRleHQsXHJcbiAgICAgICAgc2xpZGVyLW9mZjogICAgICAgIHJnYmEoJGxpZ2h0LXRleHQsIDAuMyksXHJcbiAgICAgICAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEoJGxpZ2h0LXRleHQsIDAuMyksXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBCYWNrZ3JvdW5kIGNvbmZpZ1xyXG4gICAgICAvLyBMaWdodCBiZ1xyXG4gICAgICAkbGlnaHQtYmFja2dyb3VuZDogICAgJHt0aGVtZS5wYWxldHRlLmxpZ2h0QmFja2dyb3VuZH07XHJcbiAgICAgICRsaWdodC1iZy1kYXJrZXItNTogICBkYXJrZW4oJGxpZ2h0LWJhY2tncm91bmQsIDUlKTtcclxuICAgICAgJGxpZ2h0LWJnLWRhcmtlci0xMDogIGRhcmtlbigkbGlnaHQtYmFja2dyb3VuZCwgMTAlKTtcclxuICAgICAgJGxpZ2h0LWJnLWRhcmtlci0yMDogIGRhcmtlbigkbGlnaHQtYmFja2dyb3VuZCwgMjAlKTtcclxuICAgICAgJGxpZ2h0LWJnLWRhcmtlci0zMDogIGRhcmtlbigkbGlnaHQtYmFja2dyb3VuZCwgMzAlKTtcclxuICAgICAgJGxpZ2h0LWJnLWxpZ2h0ZXItNTogIGxpZ2h0ZW4oJGxpZ2h0LWJhY2tncm91bmQsIDUlKTtcclxuICAgICAgJGRhcmstYmctYWxwaGEtNDogICAgIHJnYmEoJHt0aGVtZS5wYWxldHRlLmRhcmtCYWNrZ3JvdW5kfSwgMC4wNCk7XHJcbiAgICAgICRkYXJrLWJnLWFscGhhLTEyOiAgICByZ2JhKCR7dGhlbWUucGFsZXR0ZS5kYXJrQmFja2dyb3VuZH0sIDAuMTIpO1xyXG5cclxuICAgICAgJG1hdC1saWdodC10aGVtZS1iYWNrZ3JvdW5kOiAoXHJcbiAgICAgICAgYmFja2dyb3VuZDogICAgICAgICAgICAgICAkbGlnaHQtYmFja2dyb3VuZCxcclxuICAgICAgICBzdGF0dXMtYmFyOiAgICAgICAgICAgICAgICRsaWdodC1iZy1kYXJrZXItMjAsXHJcbiAgICAgICAgYXBwLWJhcjogICAgICAgICAgICAgICAgICAkbGlnaHQtYmctZGFya2VyLTUsXHJcbiAgICAgICAgaG92ZXI6ICAgICAgICAgICAgICAgICAgICAkZGFyay1iZy1hbHBoYS00LFxyXG4gICAgICAgIGNhcmQ6ICAgICAgICAgICAgICAgICAgICAgJGxpZ2h0LWJnLWxpZ2h0ZXItNSxcclxuICAgICAgICBkaWFsb2c6ICAgICAgICAgICAgICAgICAgICRsaWdodC1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uOiAgICAgICAgICAkZGFyay1iZy1hbHBoYS0xMixcclxuICAgICAgICByYWlzZWQtYnV0dG9uOiAgICAgICAgICAgICRsaWdodC1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZm9jdXNlZC1idXR0b246ICAgICAgICAgICAkZGFyay1mb2N1c2VkLFxyXG4gICAgICAgIHNlbGVjdGVkLWJ1dHRvbjogICAgICAgICAgJGxpZ2h0LWJnLWRhcmtlci0yMCxcclxuICAgICAgICBzZWxlY3RlZC1kaXNhYmxlZC1idXR0b246ICRsaWdodC1iZy1kYXJrZXItMzAsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uLXRvZ2dsZTogICAkbGlnaHQtYmctZGFya2VyLTEwLFxyXG4gICAgICAgIHVuc2VsZWN0ZWQtY2hpcDogICAgICAgICAgJGxpZ2h0LWJnLWRhcmtlci0xMCxcclxuICAgICAgICBkaXNhYmxlZC1saXN0LW9wdGlvbjogICAgICRsaWdodC1iZy1kYXJrZXItMTAsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvLyBEYXJrIGJnXHJcbiAgICAgICRkYXJrLWJhY2tncm91bmQ6ICAgICAke3RoZW1lLnBhbGV0dGUuZGFya0JhY2tncm91bmR9O1xyXG4gICAgICAkZGFyay1iZy1saWdodGVyLTU6ICAgbGlnaHRlbigkZGFyay1iYWNrZ3JvdW5kLCA1JSk7XHJcbiAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMTA6ICBsaWdodGVuKCRkYXJrLWJhY2tncm91bmQsIDEwJSk7XHJcbiAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMjA6ICBsaWdodGVuKCRkYXJrLWJhY2tncm91bmQsIDIwJSk7XHJcbiAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMzA6ICBsaWdodGVuKCRkYXJrLWJhY2tncm91bmQsIDMwJSk7XHJcbiAgICAgICRsaWdodC1iZy1hbHBoYS00OiAgICByZ2JhKCR7dGhlbWUucGFsZXR0ZS5saWdodEJhY2tncm91bmR9LCAwLjA0KTtcclxuICAgICAgJGxpZ2h0LWJnLWFscGhhLTEyOiAgIHJnYmEoJHt0aGVtZS5wYWxldHRlLmxpZ2h0QmFja2dyb3VuZH0sIDAuMTIpO1xyXG5cclxuICAgICAgLy8gQmFja2dyb3VuZCBwYWxldHRlIGZvciBkYXJrIHRoZW1lcy5cclxuICAgICAgJG1hdC1kYXJrLXRoZW1lLWJhY2tncm91bmQ6IChcclxuICAgICAgICBiYWNrZ3JvdW5kOiAgICAgICAgICAgICAgICRkYXJrLWJhY2tncm91bmQsXHJcbiAgICAgICAgc3RhdHVzLWJhcjogICAgICAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTIwLFxyXG4gICAgICAgIGFwcC1iYXI6ICAgICAgICAgICAgICAgICAgJGRhcmstYmctbGlnaHRlci01LFxyXG4gICAgICAgIGhvdmVyOiAgICAgICAgICAgICAgICAgICAgJGxpZ2h0LWJnLWFscGhhLTQsXHJcbiAgICAgICAgY2FyZDogICAgICAgICAgICAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZGlhbG9nOiAgICAgICAgICAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZGlzYWJsZWQtYnV0dG9uOiAgICAgICAgICAkbGlnaHQtYmctYWxwaGEtMTIsXHJcbiAgICAgICAgcmFpc2VkLWJ1dHRvbjogICAgICAgICAgICAkZGFyay1iZy1saWdodGVyLTUsXHJcbiAgICAgICAgZm9jdXNlZC1idXR0b246ICAgICAgICAgICAkbGlnaHQtZm9jdXNlZCxcclxuICAgICAgICBzZWxlY3RlZC1idXR0b246ICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMjAsXHJcbiAgICAgICAgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uOiAkZGFyay1iZy1saWdodGVyLTMwLFxyXG4gICAgICAgIGRpc2FibGVkLWJ1dHRvbi10b2dnbGU6ICAgJGRhcmstYmctbGlnaHRlci0xMCxcclxuICAgICAgICB1bnNlbGVjdGVkLWNoaXA6ICAgICAgICAgICRkYXJrLWJnLWxpZ2h0ZXItMjAsXHJcbiAgICAgICAgZGlzYWJsZWQtbGlzdC1vcHRpb246ICAgICAkZGFyay1iZy1saWdodGVyLTEwLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gVGhlbWUgQ29uZmlnXHJcbiAgICAgICR7WydwcmltYXJ5JywgJ2FjY2VudCcsICd3YXJuJ10ubWFwKHggPT4gdGhpcy5nZXRTY3NzUGFsZXR0ZSh4LCB0aGVtZS5wYWxldHRlW3hdKSkuam9pbignXFxuJyl9O1xyXG5cclxuICAgICAgJHRoZW1lOiAkeyF0aGVtZS5saWdodG5lc3MgPyAnbWF0LWRhcmstdGhlbWUnIDogJ21hdC1saWdodC10aGVtZSd9KCR0aGVtZS1wcmltYXJ5LCAkdGhlbWUtYWNjZW50LCAkdGhlbWUtd2Fybik7XHJcbiAgICAgICRhbHRUaGVtZTogJHshdGhlbWUubGlnaHRuZXNzID8gJ21hdC1saWdodC10aGVtZScgOiAnbWF0LWRhcmstdGhlbWUnfSgkdGhlbWUtcHJpbWFyeSwgJHRoZW1lLWFjY2VudCwgJHRoZW1lLXdhcm4pO1xyXG5cclxuICAgICAgLy8gVGhlbWUgSW5pdFxyXG4gICAgICBAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCR0aGVtZSk7XHJcblxyXG4gICAgICAudGhlbWUtYWx0ZXJuYXRlIHtcclxuICAgICAgICBAaW5jbHVkZSBhbmd1bGFyLW1hdGVyaWFsLXRoZW1lKCRhbHRUaGVtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgIC8vIFNwZWNpZmljIGNvbXBvbmVudCBvdmVycmlkZXMsIHBpZWNlcyB0aGF0IGFyZSBub3QgaW4gbGluZSB3aXRoIHRoZSBnZW5lcmFsIHRoZW1pbmdcclxuXHJcbiAgICAgIC8vIEhhbmRsZSBidXR0b25zIGFwcHJvcHJpYXRlbHksIHdpdGggcmVzcGVjdCB0byBsaW5lLWhlaWdodFxyXG4gICAgICAubWF0LXJhaXNlZC1idXR0b24sIC5tYXQtc3Ryb2tlZC1idXR0b24sIC5tYXQtZmxhdC1idXR0b24ge1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMS4xNWVtO1xyXG4gICAgICAgIG1hcmdpbjogMCAuNjVlbTtcclxuICAgICAgICBtaW4td2lkdGg6IDNlbTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm1hdC1zdGFuZGFyZC1jaGlwIHtcclxuICAgICAgICBwYWRkaW5nOiAuNWVtIC44NWVtO1xyXG4gICAgICAgIG1pbi1oZWlnaHQ6IDIuNWVtO1xyXG4gICAgICB9XHJcbiAgICAgIGA7XHJcblxyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBTY3NzIFBhbGF0dGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBwYWxldHRlIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gc3ViUGFsZXR0ZSBTdWJQYWxldHRlTW9kZWxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldFNjc3NQYWxldHRlKG5hbWU6IHN0cmluZywgc3ViUGFsZXR0ZTogU3ViUGFsZXR0ZU1vZGVsKTogc3RyaW5nIHtcclxuICAgICAgcmV0dXJuIGBcclxuICAgICAgYm9keSB7XHJcbiAgICAgICAgLS0ke25hbWV9LWNvbG9yOiAke3N1YlBhbGV0dGUubWFpbn07XHJcbiAgICAgICAgLS0ke25hbWV9LWxpZ2h0ZXItY29sb3I6ICR7c3ViUGFsZXR0ZS5saWdodGVyfTtcclxuICAgICAgICAtLSR7bmFtZX0tZGFya2VyLWNvbG9yOiAke3N1YlBhbGV0dGUuZGFya2VyfTtcclxuICAgICAgICAtLXRleHQtJHtuYW1lfS1jb2xvcjogI3ske3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUubWFpbil9fTtcclxuICAgICAgICAtLXRleHQtJHtuYW1lfS1saWdodGVyLWNvbG9yOiAjeyR7dGhpcy5nZXRUZXh0Q29sb3Ioc3ViUGFsZXR0ZS5saWdodGVyKX19O1xyXG4gICAgICAgIC0tdGV4dC0ke25hbWV9LWRhcmtlci1jb2xvcjogI3ske3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUuZGFya2VyKX19O1xyXG4gICAgICB9XHJcblxyXG4gICAgJG1hdC0ke25hbWV9OiAoXHJcbiAgICAgIG1haW46ICR7c3ViUGFsZXR0ZS5tYWlufSxcclxuICAgICAgbGlnaHRlcjogJHtzdWJQYWxldHRlLmxpZ2h0ZXJ9LFxyXG4gICAgICBkYXJrZXI6ICR7c3ViUGFsZXR0ZS5kYXJrZXJ9LFxyXG4gICAgICAyMDA6ICR7c3ViUGFsZXR0ZS5tYWlufSwgLy8gRm9yIHNsaWRlIHRvZ2dsZSxcclxuICAgICAgY29udHJhc3QgOiAoXHJcbiAgICAgICAgbWFpbjogJHt0aGlzLmdldFRleHRDb2xvcihzdWJQYWxldHRlLm1haW4pfSxcclxuICAgICAgICBsaWdodGVyOiAke3RoaXMuZ2V0VGV4dENvbG9yKHN1YlBhbGV0dGUubGlnaHRlcil9LFxyXG4gICAgICAgIGRhcmtlcjogJHt0aGlzLmdldFRleHRDb2xvcihzdWJQYWxldHRlLmRhcmtlcil9LFxyXG4gICAgICApXHJcbiAgICApO1xyXG4gICAgJHRoZW1lLSR7bmFtZX06IG1hdC1wYWxldHRlKCRtYXQtJHtuYW1lfSwgbWFpbiwgbGlnaHRlciwgZGFya2VyKTtgO1xyXG4gIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0ZXh0IGNvbG9yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNvbCBjb2xvclxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0VGV4dENvbG9yKGNvbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgcmV0dXJuIGAkJHt0aW55Q29sb3IoY29sKS5pc0xpZ2h0KCkgPyAnZGFyaycgOiAnbGlnaHQnfS1wcmltYXJ5LXRleHRgO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==