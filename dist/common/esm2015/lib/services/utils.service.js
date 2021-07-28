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
UtilsService.ɵfac = function UtilsService_Factory(t) { return new (t || UtilsService)(); };
UtilsService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEtBQUssU0FBUyxNQUFNLFlBQVksQ0FBQzs7QUFHeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBTTFCLE1BQU0sT0FBTyxZQUFZO0lBRWhCLFFBQVEsQ0FBQyxJQUFVLEVBQUUsSUFBVTtRQUNsQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUUzQyxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O3dFQVJVLFlBQVk7a0VBQVosWUFBWSxXQUFaLFlBQVksbUJBSFgsTUFBTTt1RkFHUCxZQUFZO2NBSjFCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgdGlueWNvbG9yIGZyb20gJ3Rpbnljb2xvcjInO1xyXG5cclxudHlwZSBSR0JBID0gdGlueWNvbG9yLkNvbG9yRm9ybWF0cy5SR0JBO1xyXG5jb25zdCB0aW55Q29sb3IgPSB0aW55Y29sb3I7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxuICB9KVxyXG5cclxuICBleHBvcnQgY2xhc3MgVXRpbHNTZXJ2aWNlIHtcclxuXHJcbiAgICBwdWJsaWMgTXVsdGlwbHkocmdiMTogUkdCQSwgcmdiMjogUkdCQSk6IGFueSB7XHJcbiAgICAgICAgcmdiMS5iID0gTWF0aC5mbG9vcihyZ2IxLmIgKiByZ2IyLmIgLyAyNTUpO1xyXG4gICAgICAgIHJnYjEuZyA9IE1hdGguZmxvb3IocmdiMS5nICogcmdiMi5nIC8gMjU1KTtcclxuICAgICAgICByZ2IxLnIgPSBNYXRoLmZsb29yKHJnYjEuciAqIHJnYjIuciAvIDI1NSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aW55Q29sb3IoJ3JnYiAnICsgcmdiMS5yICsgJyAnICsgcmdiMS5nICsgJyAnICsgcmdiMS5iKTtcclxuICAgIH1cclxuXHJcbiAgfSJdfQ==