import { ColorMapModel } from './../models/color-map.model';
import { BehaviorSubject } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class LocalStorageService {
    protected colorMap: BehaviorSubject<string>;
    protected storageArray: Array<ColorMapModel>;
    constructor();
    ClearColorMapStorage(): void;
    GetColorMapStorage(name: string): string;
    SetColorMapStorage(colorMap: ColorMapModel): void;
    protected updateColorMapStorage(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<LocalStorageService, never>;
}

//# sourceMappingURL=local-storage.service.d.ts.map