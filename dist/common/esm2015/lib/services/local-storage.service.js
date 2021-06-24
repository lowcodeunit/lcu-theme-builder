import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LocalStorageService {
    constructor() { }
    ClearColorMapStorage() {
        localStorage.clear();
    }
    GetColorMapStorage(name) {
        // return this.colorPalette;
        const arr = JSON.parse(localStorage.getItem(name));
        return localStorage.getItem(name);
    }
    SetColorMapStorage(colorMap) {
        // if ColorMaps already exists
        if (localStorage.getItem('ColorMaps')) {
            // return storage, then parse saved string
            this.storageArray = JSON.parse(localStorage.getItem('ColorMaps'));
        }
        else {
            this.storageArray = [];
        }
        // update storage array
        this.storageArray.push(colorMap);
        this.updateColorMapStorage();
    }
    updateColorMapStorage() {
        localStorage.setItem('ColorMaps', JSON.stringify(this.storageArray));
    }
}
LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
LocalStorageService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFLNUIsZ0JBQWUsQ0FBQztJQUVULG9CQUFvQjtRQUN2QixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLElBQVk7UUFDbEMsNEJBQTRCO1FBQzVCLE1BQU0sR0FBRyxHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLFFBQXVCO1FBQzdDLDhCQUE4QjtRQUM5QixJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFFbkMsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDckU7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFUyxxQkFBcUI7UUFDM0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O1lBdENKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlU2VydmljZSB7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbG9yTWFwOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPjtcclxuICAgIHByb3RlY3RlZCBzdG9yYWdlQXJyYXk6IEFycmF5PENvbG9yTWFwTW9kZWw+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgQ2xlYXJDb2xvck1hcFN0b3JhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENvbG9yTWFwU3RvcmFnZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIHJldHVybiB0aGlzLmNvbG9yUGFsZXR0ZTtcclxuICAgICAgICBjb25zdCBhcnI6IEFycmF5PENvbG9yTWFwTW9kZWw+ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSk7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRDb2xvck1hcFN0b3JhZ2UoY29sb3JNYXA6IENvbG9yTWFwTW9kZWwpOiB2b2lkIHtcclxuICAgICAgICAvLyBpZiBDb2xvck1hcHMgYWxyZWFkeSBleGlzdHNcclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0NvbG9yTWFwcycpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyByZXR1cm4gc3RvcmFnZSwgdGhlbiBwYXJzZSBzYXZlZCBzdHJpbmdcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQXJyYXkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdDb2xvck1hcHMnKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlQXJyYXkgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSBzdG9yYWdlIGFycmF5XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlQXJyYXkucHVzaChjb2xvck1hcCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2xvck1hcFN0b3JhZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ29sb3JNYXBTdG9yYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdDb2xvck1hcHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnN0b3JhZ2VBcnJheSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==