import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import * as tinycolor from 'tinycolor2';
<<<<<<< HEAD
import { PaletteModel } from '../../models/palette.model';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { PalettePickerService } from '../../services/palette-picker.service';
=======
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8

const tinyColor = tinycolor;

@Component({
  selector: 'lcu-palette-picker',
  templateUrl: './palette-picker.component.html',
  styleUrls: ['./palette-picker.component.scss']
})
export class PalettePickerComponent implements OnInit {

  /**
   * Access Primary form group
   */
  public get Primary(): AbstractControl {
    return this.Form.get('primary');
  }

  /**
   * Access Accent form group
   */
  public get Accent(): AbstractControl {
    return this.Form.get('accent');
  }

  /**
   * Access Warn form group
   */
  public get Warn(): AbstractControl {
    return this.Form.get('warn');
  }

<<<<<<< HEAD
  protected palettePickerChangedSubscription: Subscription;

  public Form: FormGroup;

  constructor(protected themeBuilderService: ThemeBuilderService,
              protected palettePickerService: PalettePickerService) {
=======
  public Form: FormGroup;

  constructor(protected themeBuilderService: ThemeBuilderService) {
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8
    this.setupForm();
  }

  public ngOnInit(): void {
<<<<<<< HEAD

    /**
     * Subscribe to color(palette) picker changes
     */
    this.palettePickerChangedSubscription = this.palettePickerService.ColorPickerChanged.subscribe((palette: PaletteModel) => {
      this.patchValue(palette);
    });

    const initialValues: object = {
      primary: { main: '#cf3a5a' },
      accent: { main: '#855F68' },
      warn: { main: '#FF94AB' },
      lightText: '#222222',
      lightBackground: '#fafafa',
      darkText: '#ffffff',
      darkBackground: '#2c2c2c'
    };

    this.patchValue(initialValues);

    this.Form.valueChanges
    .subscribe((palette: PaletteModel) => {
      this.themeBuilderService.Palette = palette;
    });

    // this.themeBuilderService.$palette
    //   .subscribe(x => {
    //     if (x) {
    //       this.Form.patchValue(x);
    //     }
    //   });
  }

  protected patchValue(val: PaletteModel | any): void {
    this.Form.patchValue(val);
=======
    this.Form.patchValue({
      primary: { main: '#cc33ca' },
      accent: { main: '#797979' },
      warn: { main: '#ff0000' },
      lightText: '#000000',
      lightBackground: '#fafafa',
      darkText: '#ffffff',
      darkBackground: '#2c2c2c'
    });

    this.Form.valueChanges.subscribe(x => {
      this.themeBuilderService.Palette = x;
    });

    this.themeBuilderService.$palette
      .subscribe(x => {
        if (x) {
          this.Form.patchValue(x);
        }
      });
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8
  }

  /**
   * Setup the form
   */
  protected setupForm(): void {
    this.Form = new FormGroup({
      primary: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      accent: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      warn: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      lightText: new FormControl('', []),
      lightBackground: new FormControl('', []),
      darkText: new FormControl('', []),
      darkBackground: new FormControl('', [])
    });
  }

<<<<<<< HEAD
  // isLegible(l1: string | tinycolor.Instance, l2: string | tinycolor.Instance, threshold = 4.5) {
  //   const rl1 = tinyColor(l1).getLuminance();
  //   const rl2 = tinyColor(l2).getLuminance();
  //   if (rl1 > rl2) {
  //     return (rl1 + .05) / (rl2 + .05) > threshold;
  //   } else {
  //     return (rl2 + .05) / (rl1 + .05) > threshold;
  //   }
  // }

  // validateLegibility(form: FormGroup) {
  //   const f = form.value;

  //   const lightText = f.lightText;
  //   const lightBackground = tinyColor(f.lightBackground);
  //   const darkText = f.darkText;
  //   const darkBackground = tinyColor(f.darkBackground);

  //   const pcol = tinyColor(f.primary.main);
  //   const acol = tinyColor(f.accent.main);
  //   const wcol = tinyColor(f.warn.main);

  //   let lightLegible = this.isLegible(lightText, lightBackground)
  //     && this.isLegible(lightText, lightBackground.darken(10))
  //     && this.isLegible(lightText, lightBackground.darken(20));
  //   // && this.isLegible(wcol, lightBackground)
  //   // && this.isLegible(wcol, lightBackground.darken(10));


  //   let darkLegible = this.isLegible(darkText, darkBackground)
  //     && this.isLegible(darkText, darkBackground.lighten(10))
  //     && this.isLegible(darkText, darkBackground.lighten(20));
  //   // && this.isLegible(wcol, darkBackground)
  //   // && this.isLegible(wcol, darkBackground.lighten(10));

  //   if (tinyColor(pcol).isDark()) {
  //     darkLegible = darkLegible && this.isLegible(darkText, pcol);
  //   } else {
  //     lightLegible = lightLegible && this.isLegible(lightText, pcol);
  //   }

  //   if (tinyColor(acol).isDark()) {
  //     darkLegible = darkLegible && this.isLegible(darkText, acol);
  //   } else {
  //     lightLegible = lightLegible && this.isLegible(lightText, acol);
  //   }

  //   const errors = {};
  //   if (!lightLegible) {
  //     errors['illegible-light'] = { valid: false };
  //   }
  //   if (!darkLegible) {
  //     errors['illegible-dark'] = { valid: false };
  //   }
  //   return Object.keys(errors) ? errors : null;
  // }
=======
  isLegible(l1: string | tinycolor.Instance, l2: string | tinycolor.Instance, threshold = 4.5) {
    const rl1 = tinyColor(l1).getLuminance();
    const rl2 = tinyColor(l2).getLuminance();
    if (rl1 > rl2) {
      return (rl1 + .05) / (rl2 + .05) > threshold;
    } else {
      return (rl2 + .05) / (rl1 + .05) > threshold;
    }
  }

  validateLegibility(form: FormGroup) {
    const f = form.value;

    const lightText = f.lightText;
    const lightBackground = tinyColor(f.lightBackground);
    const darkText = f.darkText;
    const darkBackground = tinyColor(f.darkBackground);

    const pcol = tinyColor(f.primary.main);
    const acol = tinyColor(f.accent.main);
    const wcol = tinyColor(f.warn.main);

    let lightLegible = this.isLegible(lightText, lightBackground)
      && this.isLegible(lightText, lightBackground.darken(10))
      && this.isLegible(lightText, lightBackground.darken(20));
    // && this.isLegible(wcol, lightBackground)
    // && this.isLegible(wcol, lightBackground.darken(10));


    let darkLegible = this.isLegible(darkText, darkBackground)
      && this.isLegible(darkText, darkBackground.lighten(10))
      && this.isLegible(darkText, darkBackground.lighten(20));
    // && this.isLegible(wcol, darkBackground)
    // && this.isLegible(wcol, darkBackground.lighten(10));

    if (tinyColor(pcol).isDark()) {
      darkLegible = darkLegible && this.isLegible(darkText, pcol);
    } else {
      lightLegible = lightLegible && this.isLegible(lightText, pcol);
    }

    if (tinyColor(acol).isDark()) {
      darkLegible = darkLegible && this.isLegible(darkText, acol);
    } else {
      lightLegible = lightLegible && this.isLegible(lightText, acol);
    }

    const errors = {};
    if (!lightLegible) {
      errors['illegible-light'] = { valid: false };
    }
    if (!darkLegible) {
      errors['illegible-dark'] = { valid: false };
    }
    return Object.keys(errors) ? errors : null;
  }
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8

}
