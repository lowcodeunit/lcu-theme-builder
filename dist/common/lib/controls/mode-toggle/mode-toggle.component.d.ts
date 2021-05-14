import { OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
export declare class LightnessPickerComponent implements OnInit {
    protected themeBuilderService: ThemeBuilderService;
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
}
