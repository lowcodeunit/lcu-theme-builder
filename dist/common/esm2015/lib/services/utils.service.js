import { Injectable } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import * as i0 from "@angular/core";
const tinyColor = tinycolor;
export class UtilsService {
    Multiply(rgb1, rgb2) {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
        return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    }
}
UtilsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UtilsService_Factory() { return new UtilsService(); }, token: UtilsService, providedIn: "root" });
UtilsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQzs7QUFHeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBTTFCLE1BQU0sT0FBTyxZQUFZO0lBRWhCLFFBQVEsQ0FBQyxJQUFVLEVBQUUsSUFBVTtRQUNsQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUUzQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Ozs7WUFaSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcclxuXHJcbnR5cGUgUkdCQSA9IHRpbnljb2xvci5Db2xvckZvcm1hdHMuUkdCQTtcclxuY29uc3QgdGlueUNvbG9yID0gdGlueWNvbG9yO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XHJcblxyXG4gICAgcHVibGljIE11bHRpcGx5KHJnYjE6IFJHQkEsIHJnYjI6IFJHQkEpOiBhbnkge1xyXG4gICAgICAgIHJnYjEuYiA9IE1hdGguZmxvb3IocmdiMS5iICogcmdiMi5iIC8gMjU1KTtcclxuICAgICAgICByZ2IxLmcgPSBNYXRoLmZsb29yKHJnYjEuZyAqIHJnYjIuZyAvIDI1NSk7XHJcbiAgICAgICAgcmdiMS5yID0gTWF0aC5mbG9vcihyZ2IxLnIgKiByZ2IyLnIgLyAyNTUpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGlueUNvbG9yKCdyZ2IgJyArIHJnYjEuciArICcgJyArIHJnYjEuZyArICcgJyArIHJnYjEuYik7XHJcbiAgICB9XHJcblxyXG4gIH0iXX0=