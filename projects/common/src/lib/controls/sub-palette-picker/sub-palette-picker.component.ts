import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Constants } from '../../utils/constants.utils';
import { filter } from 'rxjs/operators';
import { MaterialPaletteModel } from '../../models/material-palette.model';
import { Subscription } from 'rxjs';
import { PalettePickerService } from '../../services/palette-picker.service';
import { PaletteModel } from '../../models/palette.model';

@Component({
  selector: 'lcu-sub-palette-picker',
  templateUrl: './sub-palette-picker.component.html',
  styleUrls: ['./sub-palette-picker.component.scss']
})
export class SubPalettePickerComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('form')
  public Form: FormGroup;

  @Input('color-picker-color')
  public set ColorPickerColor(val: string) {
    this.Main.setValue(val);
  }

  /**
   * Access Main color form control
   */
  public get Main(): AbstractControl {
    return this.Form.get('main');
  }

  /**
   * Access Light color form control
   */
  public get Lighter(): AbstractControl {
    return this.Form.get('lighter');
  }

  /**
   * Access Dark color form control
   */
  public get Darker(): AbstractControl {
    return this.Form.get('darker');
  }

  protected colorPickerClosedSubscription: Subscription;

  /**
   * Toggle control for light and dark colors
   */
  public Unlocked: FormControl;

  /**
   * Set preset color palette
   */
  public get Variants(): Array<{ key: string; hex: string; isLight: boolean; }> {

    return !this.themeBuilderService.MaterialPaletteColors ? undefined :
            this.materialKeys.map((x: string) =>
            {
              return this.themeBuilderService.MaterialPaletteColors[x]
            });
  }

  protected palettePickerChangedSubscription: Subscription;

  /**
   * Keys for palette colors, 50 - A700
   */
  protected materialKeys: Array<string>;

  constructor(protected themeBuilderService: ThemeBuilderService,
    protected palettePickerService: PalettePickerService) {
    this.Unlocked = new FormControl(false);
    this.materialKeys = [...Object.keys(Constants.MIX_AMOUNTS_PRIMARY),
                         ...Object.keys(Constants.MIX_AMOUNTS_SECONDARY)];
  }

  public ngOnInit(): void {

    if (this.Main.value) {
     this.onMainChange();
    }

    this.colorPickerClosedSubscription = this.palettePickerService.ColorPickerClosed
    .subscribe((val: string) => {
      this.onMainChange();
    });

    this.palettePickerService.ColorPickerChanged
    .subscribe((val: PaletteModel) => {
      // this.Main.setValue(val.primary.main);
      // this.onMainChange();
    })
  }

  public ngOnDestroy(): void {

    this.palettePickerChangedSubscription.unsubscribe();
    this.colorPickerClosedSubscription.unsubscribe();
  }

  /**
   * Returns palette colors, 50 - A700
   *
   * @param color selected base color, chosen from color pickers
   */
  protected onMainChange(): void {

    this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(this.Form.value.main);

    // set lightest and darkest hue colors in color picker
    if (!this.Unlocked.value) {
      this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
      this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
    }
  }
}
