import { UtilsService } from './utils.service';

import { Injectable } from '@angular/core';
import { ColorModel } from '../models/color.model';
import tinycolor from 'tinycolor2';
import { PalettePickerService } from './palette-picker.service';

const tinyColor = tinycolor;

@Injectable({
    providedIn: 'root'
})

export class VariantColorService {

    constructor(
        protected palettePickerService: PalettePickerService,
        protected utilsService: UtilsService
    ) { }

    public UpdatePrimaryVariants(color: string): void {
        this.palettePickerService.PrimaryColorPalette = this.computeColors(color);

        for (const c of this.palettePickerService.PrimaryColorPalette) {
            const key = `--theme-primary-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';

            // set or update CSS variable values
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }

    public UpdateAccentVariants(color: string): void {
        this.palettePickerService.AccentColorPalette = this.computeColors(color);

        for (const c of this.palettePickerService.AccentColorPalette) {
            const key = `--theme-accent-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }

    public UpdateWarnVariants(color: string): void {
        this.palettePickerService.WarnColorPalette = this.computeColors(color);

        for (const c of this.palettePickerService.WarnColorPalette) {
            const key = `--theme-warn-${c.name}`;
            const value = c.hex;
            const key2 = `--theme-primary-contrast-${c.name}`;
            const value2 = c.darkContrast ? 'rgba(black, 0.87)' : 'white';
            document.documentElement.style.setProperty(key, value);
            document.documentElement.style.setProperty(key2, value2);
        }
    }

    protected computeColors(color: string): Array<ColorModel> {

        const baseLightColor = tinyColor('#ffffff');
        let baseDarkColor: any = tinyColor('#222222');

        if (this.utilsService.Multiply) {
            baseDarkColor = this.utilsService.Multiply(tinyColor(color).toRgb(), tinyColor(color).toRgb());
        }

        const [, , , baseTetrad] = tinyColor(color).tetrad();

        return [
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 12), '50'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 30), '100'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 50), '200'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 70), '300'),
            this.getColorObject(tinyColor.mix(baseLightColor, tinyColor(color), 85), '400'),
            this.getColorObject(tinyColor(color), '500'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 87), '600'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 70), '700'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 54), '800'),
            this.getColorObject(tinyColor.mix(baseDarkColor, tinyColor(color), 25), '900'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(65), 'A100'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(80).lighten(55), 'A200'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(45), 'A400'),
            this.getColorObject(tinyColor.mix(baseDarkColor, baseTetrad, 15).saturate(100).lighten(40), 'A700')
        ];
    }
    // force change
    protected getColorObject(value: tinycolor.Instance, name: string): ColorModel {
        const c = tinyColor(value);
        return {
            name,
            hex: c.toHexString(),
            darkContrast: c.isLight()
        };
    }

}