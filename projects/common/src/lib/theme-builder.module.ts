import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { ThemeBuilderService } from './services/theme-builder.service';
import { ThemeBuilderComponent } from './controls/theme-builder/theme-builder.component';
import { ThemeBuilderDirective } from './directives/theme-builder.directive';

@NgModule({
  declarations: [ThemeBuilderComponent, ThemeBuilderDirective],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
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
