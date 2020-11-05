import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Constants } from '../../utils/constants.utils';
import { filter } from 'rxjs/operators';
import { MaterialPaletteModel } from '../../models/material-palette.model';

@Component({
  selector: 'lcu-sub-palette-picker',
  templateUrl: './sub-palette-picker.component.html',
  styleUrls: ['./sub-palette-picker.component.scss']
})
export class SubPalettePickerComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('form')
  public Form: FormGroup;

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

  /**
   * Toggle control for light and dark colors
   */
  public Unlocked: FormControl;

  /**
   * Set preset color palette
   */
  get Presets() {
    return !this.themeBuilderService.MaterialPaletteColors ? undefined :
            this.materialKeys.map(x => this.themeBuilderService.MaterialPaletteColors[x]);
  }

  /**
   * Keys for palette colors, 50 - A700
   */
  protected materialKeys: Array<string>;

  constructor(protected themeBuilderService: ThemeBuilderService) {
    this.Unlocked = new FormControl(false);
    this.materialKeys = [...Object.keys(Constants.MIX_AMOUNTS_PRIMARY),
                         ...Object.keys(Constants.MIX_AMOUNTS_SECONDARY)];
  }

  public ngOnInit(): void {
    this.Main.valueChanges.subscribe((color: string) => {
      // debugger;
      if (color) {
        this.onMainChange(color);
      }
    });

    if (this.Main.value) {
      this.onMainChange(this.Main.value);
    }

    this.Unlocked.valueChanges.pipe(
      filter((locked: boolean) => !locked)
    ).subscribe((locked: boolean) => {
      this.onMainChange(this.Main.value);
    });
  }

  /**
   * Returns palette colors, 50 - A700
   *
   * @param color selected base color, chosen from color pickers
   */
  protected onMainChange(color: string): void {
    this.themeBuilderService.MaterialPaletteColors = this.themeBuilderService.GetPalette(color);

    // set lightest and darkest hue colors in color picker
    if (!this.Unlocked.value) {
      this.Form.patchValue({ lighter: this.themeBuilderService.MaterialPaletteColors['50'] });
      this.Form.patchValue({ darker: this.themeBuilderService.MaterialPaletteColors['900'] });
    }
  }
}
