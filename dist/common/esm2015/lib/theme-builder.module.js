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
                    ThemePickerComponent,
                    ModeToggleComponent
                ],
                entryComponents: [
                    ThemePickerComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi90aGVtZS1idWlsZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQStCekUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxtQkFBbUI7Z0JBQ25CLG9CQUFvQjthQUNyQjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF0Q0YsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsbUJBQW1CO29CQUNuQixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFDckI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixtQkFBbUI7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixvQkFBb0I7aUJBQ3JCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmxleExheW91dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcclxuaW1wb3J0IHsgRmF0aHltU2hhcmVkTW9kdWxlLCBNYXRlcmlhbE1vZHVsZSB9IGZyb20gJ0BsY3UvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IENvbG9yUGlja2VyTW9kdWxlIH0gZnJvbSAnbmd4LWNvbG9yLXBpY2tlcic7XHJcblxyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90aGVtZS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL3RoZW1lLWJ1aWxkZXIvdGhlbWUtYnVpbGRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUaGVtZUJ1aWxkZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdGhlbWUtYnVpbGRlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYWxldHRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9wYWxldHRlLXBpY2tlci9wYWxldHRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJQYWxldHRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy9zdWItcGFsZXR0ZS1waWNrZXIvc3ViLXBhbGV0dGUtcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1vZGVUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL21vZGUtdG9nZ2xlL21vZGUtdG9nZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvcnNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL3ZhcmlhbnQtY29sb3JzL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy90aGVtZS1waWNrZXIvdGhlbWUtcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBhbGV0dGVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wYWxldHRlLXBpY2tlci5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBUaGVtZUJ1aWxkZXJDb21wb25lbnQsXHJcbiAgICBUaGVtZUJ1aWxkZXJEaXJlY3RpdmUsXHJcbiAgICBDb2xvclBpY2tlckNvbXBvbmVudCxcclxuICAgIFBhbGV0dGVQaWNrZXJDb21wb25lbnQsXHJcbiAgICBTdWJQYWxldHRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgTW9kZVRvZ2dsZUNvbXBvbmVudCxcclxuICAgIFZhcmlhbnRDb2xvcnNDb21wb25lbnQsXHJcbiAgICBUaGVtZVBpY2tlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgRmF0aHltU2hhcmVkTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRmxleExheW91dE1vZHVsZSxcclxuICAgIE1hdGVyaWFsTW9kdWxlLFxyXG4gICAgQ29sb3JQaWNrZXJNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRoZW1lQnVpbGRlckNvbXBvbmVudCxcclxuICAgIFRoZW1lQnVpbGRlckRpcmVjdGl2ZSxcclxuICAgIFRoZW1lUGlja2VyQ29tcG9uZW50LFxyXG4gICAgTW9kZVRvZ2dsZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBUaGVtZVBpY2tlckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRoZW1lQnVpbGRlck1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUaGVtZUJ1aWxkZXJNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUaGVtZUJ1aWxkZXJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFRoZW1lQnVpbGRlclNlcnZpY2UsXHJcbiAgICAgICAgUGFsZXR0ZVBpY2tlclNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19