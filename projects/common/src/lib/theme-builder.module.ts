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
import { ModeToggleComponent } from './controls/mode-toggle/mode-toggle.component';
import { VariantColorsComponent } from './controls/variant-colors/variant-colors.component';
import { ThemePickerComponent } from './controls/theme-picker/theme-picker.component';
import { PalettePickerService } from './services/palette-picker.service';

@NgModule({
  declarations: [
    ThemeBuilderComponent,
    ThemeBuilderDirective,
    ColorPickerComponent,
    PalettePickerComponent,
    SubPalettePickerComponent,
    ModeToggleComponent,
    VariantColorsComponent,
    ThemePickerComponent
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ColorPickerModule
  ],
  exports: [
    ThemeBuilderComponent,
    ThemeBuilderDirective,
    ThemePickerComponent
  ],
  entryComponents: [
    ThemePickerComponent
  ]
})
export class ThemeBuilderModule {
  static forRoot(): ModuleWithProviders<ThemeBuilderModule> {
    return {
      ngModule: ThemeBuilderModule,
      providers: [
        ThemeBuilderService,
        PalettePickerService
      ]
    };
  }
}
