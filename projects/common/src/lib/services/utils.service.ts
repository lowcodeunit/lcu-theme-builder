import { Injectable } from '@angular/core';
import tinycolor from 'tinycolor2';

type RGBA = tinycolor.ColorFormats.RGBA;
const tinyColor = tinycolor;

@Injectable({
    providedIn: 'root'
  })

  export class UtilsService {

    public Multiply(rgb1: RGBA, rgb2: RGBA): any {
        rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
        rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
        rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);

        return tinyColor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
    }

  }