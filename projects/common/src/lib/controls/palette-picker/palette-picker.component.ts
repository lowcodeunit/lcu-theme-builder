import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../../models/palette.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { PalettePickerService } from '../../services/palette-picker.service';

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

  protected palettePickerChangedSubscription: Subscription;

  public Form: FormGroup;

  constructor(protected themeBuilderService: ThemeBuilderService,
              protected palettePickerService: PalettePickerService) {

    this.setupForm();
  }

  public ngOnInit(): void {

    /**
     * Subscribe to color(palette) picker changes
     */
    this.palettePickerChangedSubscription =
      this.palettePickerService.ColorPickerChanged
      .subscribe((palette: PaletteModel) => {
        this.patchValue(palette);
    });

    const bodyStyles = window.getComputedStyle(document.documentElement);

    const initialValues: object = {
      primary: { main: bodyStyles.getPropertyValue('--initial-primary') },
      accent: { main: bodyStyles.getPropertyValue('--initial-accent') },
      warn: { main: bodyStyles.getPropertyValue('--initial-warn') },
      lightText: bodyStyles.getPropertyValue('--initial-light-text'),
      lightBackground: bodyStyles.getPropertyValue('--initial-light-background'),
      darkText: bodyStyles.getPropertyValue('--initial-dark-text'),
      darkBackground: bodyStyles.getPropertyValue('--initial-dark-background')
    };

    this.patchValue(initialValues);

    this.Form.valueChanges
    .subscribe((palette: PaletteModel) => {
      this.themeBuilderService.Palette = palette;
    });
  }

  protected patchValue(val: PaletteModel | any): void {
    this.Form.patchValue(val);
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
}
