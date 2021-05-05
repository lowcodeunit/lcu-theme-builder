import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';

import { ColorPickerModule } from 'ngx-color-picker';

import { ThemeBuilderService } from './services/theme-builder.service';
import { ThemeBuilderComponent } from './controls/theme-builder/theme-builder.component';
import { ThemeBuilderDirective } from './directives/theme-builder.directive';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { PalettePickerComponent } from './controls/palette-picker/palette-picker.component';
import { SubPalettePickerComponent } from './controls/sub-palette-picker/sub-palette-picker.component';
import { LightnessPickerComponent } from './controls/mode-toggle/mode-toggle.component';
import { DynamicThemeColorsComponent } from './controls/dynamic-theme-colors/dynamic-theme-colors.component';

@NgModule({
  declarations: [
    ThemeBuilderComponent,
    ThemeBuilderDirective,
    ColorPickerComponent,
    PalettePickerComponent,
    SubPalettePickerComponent,
    LightnessPickerComponent,
    DynamicThemeColorsComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ColorPickerModule
  ],
  exports: [ThemeBuilderComponent, ThemeBuilderDirective],
  entryComponents: []
})
export class ThemeBuilderModule {
  static forRoot(): ModuleWithProviders<ThemeBuilderModule> {
    return {
      ngModule: ThemeBuilderModule,
      providers: [ThemeBuilderService]
    };
  }
}
