import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PalettePickerService } from '../../services/palette-picker.service';
export declare class ColorPickerComponent implements OnInit {
    protected palettePickerService: PalettePickerService;
    /**
     * Toggle backdrop when color picker is open
     */
    ShowBackdrop: boolean;
    /**
     * Parent control from using component
     */
    Control: FormControl;
    /**
     * Disable color picker
     */
    Disabled: boolean;
    /**
     * Array of preset colors, shown in color picker
     */
    Variants?: string[];
    constructor(palettePickerService: PalettePickerService);
    /**
     * Set the selected color
     */
    set Color(col: string);
    /**
     * Get the selected color
     *
     */
    get Color(): string;
    ngOnInit(): void;
    /**
     * Turn backdrop on
     *
     * @param on toggle
     */
    SetBackdrop(on: boolean): void;
    /**
     * Set font color to contrast background color of display
     *
     * @param col color
     */
    GetTextColor(col: string): any;
    ColorPickerClosed(evt: string): void;
    ColorPickerChange(evt: string): void;
}
