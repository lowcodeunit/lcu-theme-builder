import { VariantColorService } from './variant-color.service';
import { PalettePickerService } from './palette-picker.service';
import { LocalStorageService } from './local-storage.service';
import { MaterialPaletteModel } from './../models/material-palette.model';
import { NgZone } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { PaletteModel } from '../models/palette.model';
import { Subject } from 'rxjs';
import { ThemeModel } from '../models/theme.model';
import { HttpClient } from '@angular/common/http';
import { PaletteListModel } from '../models/palette-list.model';
import { PaletteTemplateService } from './palette-template.service';
import { ThemePickerModel } from '../models/theme-picker.model';
declare type RGBA = tinycolor.ColorFormats.RGBA;
export declare class ThemeBuilderService {
    protected http: HttpClient;
    protected paletteTemplateService: PaletteTemplateService;
    protected localStorageService: LocalStorageService;
    protected palettePickerService: PalettePickerService;
    protected zone: NgZone;
    protected variantColorService: VariantColorService;
    /**
     * Is it lightness
     */
    protected themeMode: boolean;
    /**
     * Theme Palette
     */
    protected palette: PaletteModel;
    Theme: Subject<ThemeModel>;
    PaletteColors: Subject<Partial<PaletteModel>>;
    ThemeScss: Promise<void>;
    PaletteList: Array<PaletteListModel>;
    /**
     * Palette colors, from 50 - A700
     */
    MaterialPaletteColors: MaterialPaletteModel;
    constructor(http: HttpClient, paletteTemplateService: PaletteTemplateService, localStorageService: LocalStorageService, palettePickerService: PalettePickerService, zone: NgZone, variantColorService: VariantColorService);
    /**
     * Set Palette colors
     */
    set Palette(palette: PaletteModel);
    get Palette(): PaletteModel;
    set ThemeMode(light: boolean);
    get ThemeMode(): boolean;
    Themes: Array<ThemePickerModel>;
    /**
     * load intial theme
     */
    protected loadThemingScss(): Promise<void>;
    /**
     * Get theme template and update it
     *
     * @param theme current theme
     */
    GetTemplate(theme: ThemeModel): string;
    /**
     * Compile SASS to CSS
     *
     * @param theme SASS stylesheet
     * @returns compiled CSS
     */
    CompileScssTheme(theme: string): Promise<string>;
    /**
     * Return primary and accent colors for each color map, from colors 50 - A700
     *
     * @param color color
     */
    GetPalette(color: string): MaterialPaletteModel;
    /**
     * emit event with theme
     */
    protected emit(): void;
    /**
     * Return a new theme model
     */
    getTheme(): ThemeModel;
    multiply(rgb1: RGBA, rgb2: RGBA): any;
    UpdateTheme(theme: ThemeModel): void;
    SetThemes(themes: Array<ThemePickerModel>): void;
}
export {};
