import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi9zcmMvbGliL3NlcnZpY2VzL3V0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7O0FBR25DLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQztBQU0xQixNQUFNLE9BQU8sWUFBWTtJQUVoQixRQUFRLENBQUMsSUFBVSxFQUFFLElBQVU7UUFDbEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFM0MsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDOzt3RUFSVSxZQUFZO2tFQUFaLFlBQVksV0FBWixZQUFZLG1CQUhYLE1BQU07dUZBR1AsWUFBWTtjQUoxQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB0aW55Y29sb3IgZnJvbSAndGlueWNvbG9yMic7XHJcblxyXG50eXBlIFJHQkEgPSB0aW55Y29sb3IuQ29sb3JGb3JtYXRzLlJHQkE7XHJcbmNvbnN0IHRpbnlDb2xvciA9IHRpbnljb2xvcjtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG4gIH0pXHJcblxyXG4gIGV4cG9ydCBjbGFzcyBVdGlsc1NlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBNdWx0aXBseShyZ2IxOiBSR0JBLCByZ2IyOiBSR0JBKTogYW55IHtcclxuICAgICAgICByZ2IxLmIgPSBNYXRoLmZsb29yKHJnYjEuYiAqIHJnYjIuYiAvIDI1NSk7XHJcbiAgICAgICAgcmdiMS5nID0gTWF0aC5mbG9vcihyZ2IxLmcgKiByZ2IyLmcgLyAyNTUpO1xyXG4gICAgICAgIHJnYjEuciA9IE1hdGguZmxvb3IocmdiMS5yICogcmdiMi5yIC8gMjU1KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRpbnlDb2xvcigncmdiICcgKyByZ2IxLnIgKyAnICcgKyByZ2IxLmcgKyAnICcgKyByZ2IxLmIpO1xyXG4gICAgfVxyXG5cclxuICB9Il19