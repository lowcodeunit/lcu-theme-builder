import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { Subscription } from 'rxjs';
import { PalettePickerService } from '../../services/palette-picker.service';
export declare class SubPalettePickerComponent implements OnInit, OnDestroy {
    protected themeBuilderService: ThemeBuilderService;
    protected palettePickerService: PalettePickerService;
    Form: FormGroup;
    set ColorPickerColor(val: string);
    /**
     * Access Main color form control
     */
    get Main(): AbstractControl;
    /**
     * Access Light color form control
     */
    get Lighter(): AbstractControl;
    /**
     * Access Dark color form control
     */
    get Darker(): AbstractControl;
    protected colorPickerClosedSubscription: Subscription;
    /**
     * Toggle control for light and dark colors
     */
    Unlocked: FormControl;
    /**
     * Set preset color palette
     */
    get Variants(): Array<{
        key: string;
        hex: string;
        isLight: boolean;
    }>;
    protected palettePickerChangedSubscription: Subscription;
    /**
     * Keys for palette colors, 50 - A700
     */
    protected materialKeys: Array<string>;
    constructor(themeBuilderService: ThemeBuilderService, palettePickerService: PalettePickerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Returns palette colors, 50 - A700
     *
     * @param color selected base color, chosen from color pickers
     */
    protected onMainChange(): void;
}
