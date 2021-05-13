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
import { LightnessPickerComponent } from './controls/mode-toggle/mode-toggle.component';
import { VariantColorsComponent } from './controls/variant-colors/variant-colors.component';
import { ThemePickerComponent } from './controls/theme-picker/theme-picker.component';
export class ThemeBuilderModule {
    static forRoot() {
        return {
            ngModule: ThemeBuilderModule,
            providers: [ThemeBuilderService]
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
                exports: [ThemeBuilderComponent, ThemeBuilderDirective, ThemePickerComponent],
                entryComponents: [
                    ThemePickerComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi90aGVtZS1idWlsZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUN0RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQXlCdEYsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQ2pDLENBQUM7SUFDSixDQUFDOzs7WUE3QkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHlCQUF5QjtvQkFDekIsd0JBQXdCO29CQUN4QixzQkFBc0I7b0JBQ3RCLG9CQUFvQjtpQkFBQztnQkFDdkIsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2dCQUM3RSxlQUFlLEVBQUU7b0JBQ2Ysb0JBQW9CO2lCQUNyQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XHJcbmltcG9ydCB7IEZhdGh5bVNoYXJlZE1vZHVsZSwgTWF0ZXJpYWxNb2R1bGUgfSBmcm9tICdAbGN1L2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBDb2xvclBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1jb2xvci1waWNrZXInO1xyXG5cclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGhlbWUtYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy90aGVtZS1idWlsZGVyL3RoZW1lLWJ1aWxkZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGhlbWVCdWlsZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RoZW1lLWJ1aWxkZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGFsZXR0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvcGFsZXR0ZS1waWNrZXIvcGFsZXR0ZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3ViUGFsZXR0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbHMvc3ViLXBhbGV0dGUtcGlja2VyL3N1Yi1wYWxldHRlLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaWdodG5lc3NQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL21vZGUtdG9nZ2xlL21vZGUtdG9nZ2xlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZhcmlhbnRDb2xvcnNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2xzL3ZhcmlhbnQtY29sb3JzL3ZhcmlhbnQtY29sb3JzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRoZW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9scy90aGVtZS1waWNrZXIvdGhlbWUtcGlja2VyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgVGhlbWVCdWlsZGVyQ29tcG9uZW50LFxyXG4gICAgVGhlbWVCdWlsZGVyRGlyZWN0aXZlLFxyXG4gICAgQ29sb3JQaWNrZXJDb21wb25lbnQsXHJcbiAgICBQYWxldHRlUGlja2VyQ29tcG9uZW50LFxyXG4gICAgU3ViUGFsZXR0ZVBpY2tlckNvbXBvbmVudCxcclxuICAgIExpZ2h0bmVzc1BpY2tlckNvbXBvbmVudCxcclxuICAgIFZhcmlhbnRDb2xvcnNDb21wb25lbnQsXHJcbiAgICBUaGVtZVBpY2tlckNvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgRmF0aHltU2hhcmVkTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgRmxleExheW91dE1vZHVsZSxcclxuICAgIE1hdGVyaWFsTW9kdWxlLFxyXG4gICAgQ29sb3JQaWNrZXJNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtUaGVtZUJ1aWxkZXJDb21wb25lbnQsIFRoZW1lQnVpbGRlckRpcmVjdGl2ZSwgVGhlbWVQaWNrZXJDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgVGhlbWVQaWNrZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VGhlbWVCdWlsZGVyTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogVGhlbWVCdWlsZGVyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtUaGVtZUJ1aWxkZXJTZXJ2aWNlXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19