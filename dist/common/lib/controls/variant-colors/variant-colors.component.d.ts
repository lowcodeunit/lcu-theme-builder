import { PalettePickerService } from '../../services/palette-picker.service';
import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { Subscription } from 'rxjs';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { ColorModel } from '../../models/color.model';
export declare class VariantColorsComponent implements OnInit, OnDestroy {
    PalettePickerService: PalettePickerService;
    protected themeBuilderService: ThemeBuilderService;
    private _accentColor;
    private _primaryColor;
    private _warnColor;
    set AccentColor(val: string);
    get AccentColor(): string;
    set PrimaryColor(val: string);
    get PrimaryColor(): string;
    set WarnColor(val: string);
    get WarnColor(): string;
    /**
     * Access primary color field
     */
    get PrimaryColorControl(): AbstractControl;
    /**
     * Access accent color field
     */
    get AccentColorControl(): AbstractControl;
    /**
     * property for reactive form
     */
    Form: FormGroup;
    protected paletteChangedSubscription: Subscription;
    constructor(PalettePickerService: PalettePickerService, themeBuilderService: ThemeBuilderService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected updatePrimaryColor(color: string): void;
    protected updateAccentColor(color: string): void;
    protected updateWarnColor(color: string): void;
    protected setupForm(): void;
    protected computeColors(color: string): Array<ColorModel>;
    protected getColorObject(value: tinycolor.Instance, name: string): ColorModel;
}
