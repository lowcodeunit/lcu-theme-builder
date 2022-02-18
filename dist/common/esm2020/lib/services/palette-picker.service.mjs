import { Injectable } from '@angular/core';
import { PaletteModel } from '../models/palette.model';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class PalettePickerService {
    constructor() {
        this.ColorPickerChanged = new BehaviorSubject(new PaletteModel());
        this.ColorPickerClosed = new Subject();
    }
    PalettePickerChange(params) {
        this.CurrentPalette = { ...params };
        this.ColorPickerChanged.next(this.CurrentPalette);
    }
    /**
     * Event when color picker is closed, use this to kick off
     * the process of building color variants and everything else
     * Doing this prevents multiple processes that occur during
     * Form Control changes
     *
     * @param params Selected color from color picker
     */
    CloseColorPicker(params) {
        this.ColorPickerClosed.next(params);
    }
}
PalettePickerService.ɵfac = function PalettePickerService_Factory(t) { return new (t || PalettePickerService)(); };
PalettePickerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PalettePickerService, factory: PalettePickerService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PalettePickerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL3NlcnZpY2VzL3BhbGV0dGUtcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBTWhELE1BQU0sT0FBTyxvQkFBb0I7SUFnQzdCO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksZUFBZSxDQUFlLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQUNoRCxDQUFDO0lBRU0sbUJBQW1CLENBQUMsTUFBb0I7UUFFM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxnQkFBZ0IsQ0FBQyxNQUFjO1FBRWxDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFFLENBQUM7SUFDMUMsQ0FBQzs7d0ZBdERRLG9CQUFvQjswRUFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQixtQkFKakIsTUFBTTt1RkFJVCxvQkFBb0I7Y0FMaEMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWxldHRlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvcGFsZXR0ZS5tb2RlbCc7XHJcbmltcG9ydCB7IENvbG9yTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29sb3IubW9kZWwnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbGV0dGVQaWNrZXJTZXJ2aWNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ29sb3JQaWNrZXJDaGFuZ2VkOiBTdWJqZWN0PFBhbGV0dGVNb2RlbD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFdmVudCBhZnRlciBjb2xvciBwaWNrZXIgaGFzIGNsb3NlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ29sb3JQaWNrZXJDbG9zZWQ6IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgY29sb3IgcGFsZXR0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQ3VycmVudFBhbGV0dGU6IFBhbGV0dGVNb2RlbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIHByaW1hcnkgY29sb3JzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBQcmltYXJ5Q29sb3JQYWxldHRlOiBBcnJheTxDb2xvck1vZGVsPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFycmF5IG9mIGFjY2VudCBjb2xvcnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIEFjY2VudENvbG9yUGFsZXR0ZTogQXJyYXk8Q29sb3JNb2RlbD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBcnJheSBvZiB3YXJuIGNvbG9yc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgV2FybkNvbG9yUGFsZXR0ZTogQXJyYXk8Q29sb3JNb2RlbD47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5Db2xvclBpY2tlckNoYW5nZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBhbGV0dGVNb2RlbD4obmV3IFBhbGV0dGVNb2RlbCgpKTtcclxuICAgICAgICB0aGlzLkNvbG9yUGlja2VyQ2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWxldHRlUGlja2VyQ2hhbmdlKHBhcmFtczogUGFsZXR0ZU1vZGVsKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuQ3VycmVudFBhbGV0dGUgPSB7IC4uLnBhcmFtcyB9O1xyXG4gICAgICAgIHRoaXMuQ29sb3JQaWNrZXJDaGFuZ2VkLm5leHQoIHRoaXMuQ3VycmVudFBhbGV0dGUgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IHdoZW4gY29sb3IgcGlja2VyIGlzIGNsb3NlZCwgdXNlIHRoaXMgdG8ga2ljayBvZmZcclxuICAgICAqIHRoZSBwcm9jZXNzIG9mIGJ1aWxkaW5nIGNvbG9yIHZhcmlhbnRzIGFuZCBldmVyeXRoaW5nIGVsc2VcclxuICAgICAqIERvaW5nIHRoaXMgcHJldmVudHMgbXVsdGlwbGUgcHJvY2Vzc2VzIHRoYXQgb2NjdXIgZHVyaW5nXHJcbiAgICAgKiBGb3JtIENvbnRyb2wgY2hhbmdlc1xyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIFNlbGVjdGVkIGNvbG9yIGZyb20gY29sb3IgcGlja2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDbG9zZUNvbG9yUGlja2VyKHBhcmFtczogc3RyaW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuQ29sb3JQaWNrZXJDbG9zZWQubmV4dCggcGFyYW1zICk7XHJcbiAgICB9XHJcbn1cclxuIl19