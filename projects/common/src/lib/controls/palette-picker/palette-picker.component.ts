import { Constants } from './../../utils/constants.utils';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { PaletteModel } from '../../models/palette.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { PalettePickerService } from '../../services/palette-picker.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lcu-palette-picker',
  templateUrl: './palette-picker.component.html',
  styleUrls: ['./palette-picker.component.scss']
})
export class PalettePickerComponent implements OnInit, OnDestroy {


  public Form: FormGroup;

  protected colorPickerClosedSubscription: Subscription;

  protected formSubscription: Subscription;

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

  constructor(protected themeBuilderService: ThemeBuilderService,
              protected palettePickerService: PalettePickerService) {

    this.setupForm();

    this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
    .subscribe((val: any) => {

      let palette: PaletteModel = new PaletteModel();
      palette = { ...this.palettePickerService.CurrentPalette, ...palette };
      palette.primary.main = this.Primary.value.main;
      palette.accent.main = this.Accent.value.main;
      palette.warn.main = this.Warn.value.main;

      this.themeBuilderService.Palette = palette;
    });
  }

  public ngOnInit(): void {

    /**
     * Subscribe to color(palette) picker changes
     */
    // this.palettePickerChangedSubscription =
    //   this.palettePickerService.ColorPickerChanged
    //   .subscribe((palette: PaletteModel) => {
    //     this.patchValue(palette, true);
    // });

    // setting initial values,
   // this isn't the right way to do this, but for the moment - shannon
    this.patchValue(Constants.InitialValues, true);

   this.Form.valueChanges
   .pipe(distinctUntilChanged((a: PaletteModel, b: PaletteModel) => {
    //  console.log('A', a);
    //  console.log('B', b);
     return JSON.stringify(a) !== JSON.stringify(b);
   }))
    .subscribe((palette: PaletteModel) => {
      console.log('ASKASLKDALKSD', palette);
      this.themeBuilderService.Palette = palette;
    });
  }

  public ngOnDestroy(): void {

    this.formSubscription.unsubscribe();
    this.colorPickerClosedSubscription.unsubscribe();
  }

  protected patchValue(val: PaletteModel | any, emitValue: boolean): void {
    this.Form.patchValue(val, {emitEvent: emitValue});
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
      }, {updateOn: 'change'}),
      accent: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      warn: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }, {updateOn: 'change'}),
      lightText: new FormControl('', []),
      lightBackground: new FormControl('', []),
      darkText: new FormControl('', []),
      darkBackground: new FormControl('', [])
    }, {updateOn: 'change'});
  }
}
