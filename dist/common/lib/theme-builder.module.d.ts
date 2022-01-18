import { ModuleWithProviders } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./controls/theme-builder/theme-builder.component";
import * as i2 from "./directives/theme-builder.directive";
import * as i3 from "./controls/color-picker/color-picker.component";
import * as i4 from "./controls/palette-picker/palette-picker.component";
import * as i5 from "./controls/sub-palette-picker/sub-palette-picker.component";
import * as i6 from "./controls/mode-toggle/mode-toggle.component";
import * as i7 from "./controls/variant-colors/variant-colors.component";
import * as i8 from "./controls/theme-picker/theme-picker.component";
import * as i9 from "@lcu/common";
import * as i10 from "@angular/forms";
import * as i11 from "@angular/flex-layout";
import * as i12 from "ngx-color-picker";
export declare class ThemeBuilderModule {
    static forRoot(): ModuleWithProviders<ThemeBuilderModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeBuilderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ThemeBuilderModule, [typeof i1.ThemeBuilderComponent, typeof i2.ThemeBuilderDirective, typeof i3.ColorPickerComponent, typeof i4.PalettePickerComponent, typeof i5.SubPalettePickerComponent, typeof i6.LightnessPickerComponent, typeof i7.VariantColorsComponent, typeof i8.ThemePickerComponent], [typeof i9.FathymSharedModule, typeof i10.FormsModule, typeof i10.ReactiveFormsModule, typeof i11.FlexLayoutModule, typeof i9.MaterialModule, typeof i12.ColorPickerModule], [typeof i1.ThemeBuilderComponent, typeof i2.ThemeBuilderDirective, typeof i8.ThemePickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ThemeBuilderModule>;
}
