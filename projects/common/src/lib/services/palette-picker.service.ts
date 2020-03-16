import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { PaletteModel } from '../models/palette.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})

export class PalettePickerService {

    public PaletteChanged: BehaviorSubject<PaletteModel>;
    public ColorPickerChanged: BehaviorSubject<PaletteModel>;

    constructor() {
        this.PaletteChanged = new BehaviorSubject<PaletteModel>(new PaletteModel());
        this.ColorPickerChanged = new BehaviorSubject<PaletteModel>(new PaletteModel());
    }

    /**
     * When a palette changes, pass the colors
     *
     * @param params Palette Colors
     */
    public NewPalette(params: PaletteModel): void {
        this.PaletteChanged.next( {...params} );
    }

    public PalettePickerChange(params: PaletteModel): void {
        this.ColorPickerChanged.next( {...params} );
    }
}
