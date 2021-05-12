import { Component, OnInit, Input, Output } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PalettePickerService } from '../../services/palette-picker.service';
// import * as EventEmitter from 'events';

const tinyColor = tinycolor;

@Component({
  selector: 'lcu-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  /**
   * Toggle backdrop when color picker is open
   */
  public ShowBackdrop: boolean;

  /**
   * Parent control from using component
   */
  // tslint:disable-next-line:no-input-rename
  @Input('control')
  public Control: FormControl;

  /**
   * Disable color picker
   */
  // tslint:disable-next-line:no-input-rename
  @Input('disabled')
  public Disabled: boolean;

  /**
   * Array of preset colors, shown in color picker
   */
  // tslint:disable-next-line:no-input-rename
  @Input('variants')
  public Variants?: string[];

  constructor(protected palettePickerService: PalettePickerService) {

    this.ShowBackdrop = false;
  }

  /**
   * Set the selected color
   */
  @Input('color')
  public set Color(col: string) {

    this.Control.setValue(col);
  }

  /**
   * Get the selected color
   *
   */
  public get Color() {
    return this.Control.value;
  }

  public ngOnInit(): void {
  }

  /**
   * Turn backdrop on
   *
   * @param on toggle
   */
  public SetBackdrop(on: boolean): void {

    this.ShowBackdrop = on;
  }

  /**
   * Set font color to contrast background color of display
   *
   * @param col color
   */
  public GetTextColor(col: string): any {

    return tinyColor(col).isLight() ? '#000' : '#fff';
  }

  public ColorPickerClosed(evt: string): void {

    this.palettePickerService.CloseColorPicker(evt);
  }

  public ColorPickerChange(evt: string): void {

    this.Color = evt;
  }

}
