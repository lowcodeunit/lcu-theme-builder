import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from './controls/color-picker/color-picker.component';
import { LightnessPickerComponent } from './controls/mode-toggle/mode-toggle.component';
import { PalettePickerComponent } from './controls/palette-picker/palette-picker.component';
import { SubPalettePickerComponent } from './controls/sub-palette-picker/sub-palette-picker.component';
import { ThemeBuilderComponent } from './controls/theme-builder/theme-builder.component';
import { ThemePickerComponent } from './controls/theme-picker/theme-picker.component';
import { VariantColorsComponent } from './controls/variant-colors/variant-colors.component';
import { ThemeBuilderDirective } from './directives/theme-builder.directive';
import { PalettePickerService } from './services/palette-picker.service';
import { ThemeBuilderService } from './services/theme-builder.service';
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
                    LightnessPickerComponent,
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
                    ThemePickerComponent,
                    ThemeBuilderComponent,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi90aGVtZS1idWlsZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQStCdkUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF0Q0YsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUNyQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2Ysb0JBQW9CO29CQUNwQixxQkFBcUI7aUJBQ3RCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmF0aHltU2hhcmVkTW9kdWxlLCBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJ0BsY3UvY29tbW9uJztcclxuaW1wb3J0IHsgQ29sb3JQaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtY29sb3ItcGlja2VyJztcclxuaW1wb3J0IHsgQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlnaHRuZXNzUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9tb2RlLXRvZ2dsZS9tb2RlLXRvZ2dsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9wYWxldHRlLXBpY2tlci9wYWxldHRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJQYWxldHRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9zdWItcGFsZXR0ZS1waWNrZXIvc3ViLXBhbGV0dGUtcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvdGhlbWUtYnVpbGRlci90aGVtZS1idWlsZGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy90aGVtZS1waWNrZXIvdGhlbWUtcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvcnNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL3ZhcmlhbnQtY29sb3JzL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRoZW1lQnVpbGRlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy90aGVtZS1idWlsZGVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBUaGVtZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICBUaGVtZUJ1aWxkZXJEaXJlY3RpdmUsXHJcbiAgICBDb2xvclBpY2tlckNvbXBvbmVudCxcclxuICAgIFBhbGV0dGVQaWNrZXJDb21wb25lbnQsXHJcbiAgICBTdWJQYWxldHRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgTGlnaHRuZXNzUGlja2VyQ29tcG9uZW50LFxyXG4gICAgVmFyaWFudENvbG9yc0NvbXBvbmVudCxcclxuICAgIFRoZW1lUGlja2VyQ29tcG9uZW50XHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGYXRoeW1TaGFyZWRNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBGbGV4TGF5b3V0TW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxNb2R1bGUsXHJcbiAgICBDb2xvclBpY2tlck1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgVGhlbWVCdWlsZGVyQ29tcG9uZW50LFxyXG4gICAgVGhlbWVCdWlsZGVyRGlyZWN0aXZlLFxyXG4gICAgVGhlbWVQaWNrZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVGhlbWVQaWNrZXJDb21wb25lbnQsXHJcbiAgICBUaGVtZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGhlbWVCdWlsZGVyTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRoZW1lQnVpbGRlck1vZHVsZT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFRoZW1lQnVpbGRlck1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgVGhlbWVCdWlsZGVyU2VydmljZSxcclxuICAgICAgICBQYWxldHRlUGlja2VyU2VydmljZVxyXG4gICAgICBdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=