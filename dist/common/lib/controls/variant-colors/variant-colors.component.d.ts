import { VariantColorService } from './../../services/variant-color.service';
import { PalettePickerService } from '../../services/palette-picker.service';
import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import * as i0 from "@angular/core";
export declare class VariantColorsComponent implements OnInit, OnDestroy {
    PalettePickerService: PalettePickerService;
    protected themeBuilderService: ThemeBuilderService;
    protected variantColorService: VariantColorService;
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
    constructor(PalettePickerService: PalettePickerService, themeBuilderService: ThemeBuilderService, variantColorService: VariantColorService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected setupForm(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VariantColorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VariantColorsComponent, "lcu-variant-colors", never, { "AccentColor": "accent-color"; "PrimaryColor": "primary-color"; "WarnColor": "warn-color"; }, {}, never, never>;
}
