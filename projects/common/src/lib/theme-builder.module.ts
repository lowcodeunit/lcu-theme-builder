import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';

import { ColorPickerModule } from 'ngx-color-picker';

import { ThemeBuilderService } from './services/theme-builder.service';
import { ThemeBuilderComponent } from './controls/theme-builder/theme-builder.component';
import { ThemeBuilderDirective } from './directives/theme-builder.directive';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { FontPickerComponent } from './controls/font-picker/font-picker.component';
import { PalettePickerComponent } from './controls/palette-picker/palette-picker.component';
import { SubPalettePickerComponent } from './controls/sub-palette-picker/sub-palette-picker.component';
import { LightnessPickerComponent } from './controls/lightness-picker/lightness-picker.component';

@NgModule({
  declarations: [
    ThemeBuilderComponent,
    ThemeBuilderDirective,
    ColorPickerComponent,
    FontPickerComponent,
    PalettePickerComponent,
    SubPalettePickerComponent,
    LightnessPickerComponent],
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeBuilderModule,
      providers: [ThemeBuilderService]
    };
  }
}
