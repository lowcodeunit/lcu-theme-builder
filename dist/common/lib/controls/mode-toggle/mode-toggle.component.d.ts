import { OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import * as ɵngcc0 from '@angular/core';
export declare class LightnessPickerComponent implements OnInit {
    protected themeBuilderService: ThemeBuilderService;
    private _darkMode;
    set DarkMode(val: boolean);
    get DarkMode(): boolean;
    /**
     * Access Toggle field within the form group
     */
    get Toggle(): AbstractControl;
    ToggleForm: FormGroup;
    ToggleMode: string;
    constructor(themeBuilderService: ThemeBuilderService);
    ngOnInit(): void;
    protected formSetup(): void;
    protected onChanges(): void;
    protected toggleMode(val: boolean): string;
    protected setThemeMode(val: boolean): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<LightnessPickerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<LightnessPickerComponent, "lcu-mode-toggle", never, { "DarkMode": "dark-mode"; }, {}, never, never>;
}

//# sourceMappingURL=mode-toggle.component.d.ts.map