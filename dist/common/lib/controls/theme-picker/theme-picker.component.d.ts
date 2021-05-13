import { PalettePickerService } from './../../services/palette-picker.service';
import { ThemePickerModel } from './../../models/theme-picker.model';
import { OnInit } from '@angular/core';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { AbstractControl, FormGroup } from '@angular/forms';
export declare class ThemePickerComponent implements OnInit {
    protected palettePickerService: PalettePickerService;
    protected themeBuilderService: ThemeBuilderService;
    /**
     * property for reactive form
     */
    ManualForm: FormGroup;
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
    Themes: Array<ThemePickerModel>;
    constructor(palettePickerService: PalettePickerService, themeBuilderService: ThemeBuilderService);
    ngOnInit(): void;
    SetActiveTheme(theme: ThemePickerModel): void;
    /**
     * Manually create theme, by using inputs
     */
    SetManualTheme(): void;
    protected setupForm(): void;
    /**
     * Create themes for theme picker
     */
    protected themes(): void;
}
