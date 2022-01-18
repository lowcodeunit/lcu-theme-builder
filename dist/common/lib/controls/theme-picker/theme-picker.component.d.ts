import { VariantColorService } from './../../services/variant-color.service';
import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { OnInit } from '@angular/core';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class ThemePickerComponent implements OnInit {
    protected palettePickerService: PalettePickerService;
    protected themeBuilderService: ThemeBuilderService;
    protected variantColorService: VariantColorService;
    /**
     * property for reactive form
     */
    ManualForm: FormGroup;
    /**
     * List of themes
     */
    Themes: Array<ThemePickerModel>;
    test: boolean;
    private _darkMode;
    set DarkMode(val: boolean);
    get DarkMode(): boolean;
    ToggleManualControls: boolean;
    /**
     *
     * @param val _theming.scss from external source
     */
    private _materialTheming;
    get MaterialTheming(): string;
    set MaterialTheming(val: string);
    /**
     * Access manual accent color field
     */
    get ManualAccent(): AbstractControl;
    /**
     * Access manual primary color field
     */
    get ManualPrimary(): AbstractControl;
    /**
     * Access manual theme name field
     */
    get ManualThemeName(): AbstractControl;
    /**
     * Access manual warn color field
     */
    get ManualWarn(): AbstractControl;
    constructor(palettePickerService: PalettePickerService, themeBuilderService: ThemeBuilderService, variantColorService: VariantColorService);
    ngOnInit(): void;
    SetActiveTheme(theme: ThemePickerModel): void;
    /**
     * Manually create theme, by using inputs
     */
    SetManualTheme(): void;
    /**
     * Setup form controls
     */
    protected setupForm(): void;
    /**
     * Create themes for theme picker
     */
    protected themes(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ThemePickerComponent, "lcu-theme-picker", never, { "DarkMode": "dark-mode"; "ToggleManualControls": "toggle-manual-controls"; "MaterialTheming": "material-theming"; }, {}, never, never>;
}
