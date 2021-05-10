import { ColorMapModel } from './../models/color-map.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {

    protected colorMap: BehaviorSubject<string>;
    protected storageArray: Array<ColorMapModel>;

    constructor() {}

    public ClearColorMapStorage(): void {
        localStorage.clear();
    }

    public GetColorMapStorage(name: string): string {
        // return this.colorPalette;
        const arr: Array<ColorMapModel> = JSON.parse(localStorage.getItem(name));
        return localStorage.getItem(name);
    }

    public SetColorMapStorage(colorMap: ColorMapModel): void {
        // if ColorMaps already exists
        if (localStorage.getItem('ColorMaps')) {

            // return storage, then parse saved string
            this.storageArray = JSON.parse(localStorage.getItem('ColorMaps'));
        } else {
            this.storageArray = [];
        }

        // update storage array
        this.storageArray.push(colorMap);
        this.updateColorMapStorage();
    }

    protected updateColorMapStorage(): void {
        localStorage.setItem('ColorMaps', JSON.stringify(this.storageArray));
    }
}
