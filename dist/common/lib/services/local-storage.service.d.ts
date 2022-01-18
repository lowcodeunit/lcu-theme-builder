import { ColorMapModel } from './../models/color-map.model';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class LocalStorageService {
    protected colorMap: BehaviorSubject<string>;
    protected storageArray: Array<ColorMapModel>;
    constructor();
    ClearColorMapStorage(): void;
    GetColorMapStorage(name: string): string;
    SetColorMapStorage(colorMap: ColorMapModel): void;
    protected updateColorMapStorage(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}
