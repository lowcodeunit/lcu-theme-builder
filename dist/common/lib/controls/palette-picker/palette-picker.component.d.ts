import { OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { PaletteModel } from '../../models/palette.model';
import { Subscription } from 'rxjs';
import { PalettePickerService } from '../../services/palette-picker.service';
import * as i0 from "@angular/core";
export declare class PalettePickerComponent implements OnInit, OnDestroy {
    protected themeBuilderService: ThemeBuilderService;
    protected palettePickerService: PalettePickerService;
    Form: FormGroup;
    protected colorPickerClosedSubscription: Subscription;
    protected formSubscription: Subscription;
    PrimaryColor: string;
    AccentColor: string;
    WarnColor: string;
    /**
     * Access Primary form group
     */
    get Primary(): AbstractControl;
    /**
     * Access Accent form group
     */
    get Accent(): AbstractControl;
    /**
     * Access Warn form group
     */
    get Warn(): AbstractControl;
    protected palettePickerChangedSubscription: Subscription;
    constructor(themeBuilderService: ThemeBuilderService, palettePickerService: PalettePickerService);
    protected updatePalette(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected patchValue(val: PaletteModel | any, emitValue: boolean): void;
    /**
     * Setup the form
     */
    protected setupForm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PalettePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PalettePickerComponent, "lcu-palette-picker", never, {}, {}, never, never>;
}
