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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uL3NyYy9saWIvc2VydmljZXMvbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNDLE1BQU0sT0FBTyxtQkFBbUI7SUFLNUIsZ0JBQWUsQ0FBQztJQUVULG9CQUFvQjtRQUN2QixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLGtCQUFrQixDQUFDLElBQVk7UUFDbEMsNEJBQTRCO1FBQzVCLE1BQU0sR0FBRyxHQUF5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLFFBQXVCO1FBQzdDLDhCQUE4QjtRQUM5QixJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFFbkMsMENBQTBDO1lBQzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDckU7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBRUQsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFUyxxQkFBcUI7UUFDM0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDOzs7O1lBdENKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbG9yTWFwTW9kZWwgfSBmcm9tICcuLy4uL21vZGVscy9jb2xvci1tYXAubW9kZWwnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0JztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZVNlcnZpY2Uge1xyXG5cclxuICAgIHByb3RlY3RlZCBjb2xvck1hcDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZz47XHJcbiAgICBwcm90ZWN0ZWQgc3RvcmFnZUFycmF5OiBBcnJheTxDb2xvck1hcE1vZGVsPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIENsZWFyQ29sb3JNYXBTdG9yYWdlKCk6IHZvaWQge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDb2xvck1hcFN0b3JhZ2UobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5jb2xvclBhbGV0dGU7XHJcbiAgICAgICAgY29uc3QgYXJyOiBBcnJheTxDb2xvck1hcE1vZGVsPiA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkpO1xyXG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q29sb3JNYXBTdG9yYWdlKGNvbG9yTWFwOiBDb2xvck1hcE1vZGVsKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYgQ29sb3JNYXBzIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdDb2xvck1hcHMnKSkge1xyXG5cclxuICAgICAgICAgICAgLy8gcmV0dXJuIHN0b3JhZ2UsIHRoZW4gcGFyc2Ugc2F2ZWQgc3RyaW5nXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZUFycmF5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnQ29sb3JNYXBzJykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZUFycmF5ID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB1cGRhdGUgc3RvcmFnZSBhcnJheVxyXG4gICAgICAgIHRoaXMuc3RvcmFnZUFycmF5LnB1c2goY29sb3JNYXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JNYXBTdG9yYWdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNvbG9yTWFwU3RvcmFnZSgpOiB2b2lkIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnQ29sb3JNYXBzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zdG9yYWdlQXJyYXkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=