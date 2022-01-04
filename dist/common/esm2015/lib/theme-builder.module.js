import { NgModule } from '@angular/core';
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
export class ThemeBuilderModule {
    static forRoot() {
        return {
            ngModule: ThemeBuilderModule,
            providers: [
                ThemeBuilderService,
                PalettePickerService
            ]
        };
    }
}
ThemeBuilderModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi90aGVtZS1idWlsZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQThCekUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFyQ0YsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysb0JBQW9CO2lCQUNyQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XHJcbmltcG9ydCB7IEZhdGh5bVNoYXJlZE1vZHVsZSwgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICdAbGN1L2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBDb2xvclBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xyXG5cclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy90aGVtZS1idWlsZGVyL3RoZW1lLWJ1aWxkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RoZW1lLWJ1aWxkZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3ViUGFsZXR0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvc3ViLXBhbGV0dGUtcGlja2VyL3N1Yi1wYWxldHRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RlVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9tb2RlLXRvZ2dsZS9tb2RlLXRvZ2dsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBWYXJpYW50Q29sb3JzQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy92YXJpYW50LWNvbG9ycy92YXJpYW50LWNvbG9ycy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaGVtZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvdGhlbWUtcGlja2VyL3RoZW1lLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcGFsZXR0ZS1waWNrZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgVGhlbWVCdWlsZGVyQ29tcG9uZW50LFxyXG4gICAgVGhlbWVCdWlsZGVyRGlyZWN0aXZlLFxyXG4gICAgQ29sb3JQaWNrZXJDb21wb25lbnQsXHJcbiAgICBQYWxldHRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgU3ViUGFsZXR0ZVBpY2tlckNvbXBvbmVudCxcclxuICAgIE1vZGVUb2dnbGVDb21wb25lbnQsXHJcbiAgICBWYXJpYW50Q29sb3JzQ29tcG9uZW50LFxyXG4gICAgVGhlbWVQaWNrZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIEZhdGh5bVNoYXJlZE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXHJcbiAgICBNYXRlcmlhbE1vZHVsZSxcclxuICAgIENvbG9yUGlja2VyTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBUaGVtZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICBUaGVtZUJ1aWxkZXJEaXJlY3RpdmUsXHJcbiAgICBUaGVtZVBpY2tlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBUaGVtZVBpY2tlckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRoZW1lQnVpbGRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUaGVtZUJ1aWxkZXJNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUaGVtZUJ1aWxkZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFRoZW1lQnVpbGRlclNlcnZpY2UsXHJcbiAgICAgICAgUGFsZXR0ZVBpY2tlclNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19