import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { PaletteModel } from '../models/palette.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ColorModel } from '../models/color.model';

@Injectable({
    providedIn: 'root'
})


export class PalettePickerService {

    /**
     * 
     */
    public ColorPickerChanged: Subject<PaletteModel>;

    /**
     * Event after color picker has closed
     */
    public ColorPickerClosed: Subject<any>;

    /**
     * Current color palette
     */
    public CurrentPalette: PaletteModel;

    /**
     * Array of primary colors
     */
    public PrimaryColorPalette: Array<ColorModel>;

    /**
     * Array of accent colors
     */
    public AccentColorPalette: Array<ColorModel>;

    /**
     * Array of warn colors
     */
    public WarnColorPalette: Array<ColorModel>;

    constructor() {
        this.ColorPickerChanged = new BehaviorSubject<PaletteModel>(new PaletteModel());
        this.ColorPickerClosed = new Subject<any>();
    }

    public PalettePickerChange(params: PaletteModel): void {

        this.CurrentPalette = { ...params };
        this.ColorPickerChanged.next( this.CurrentPalette );
    }

    /**
     * Event when color picker is closed, use this to kick off
     * the process of building color variants and everything else
     * Doing this prevents multiple processes that occur during
     * Form Control changes
     * 
     * @param params Selected color from color picker
     */
    public CloseColorPicker(params: string): void {

        this.ColorPickerClosed.next( params );
    }
}
