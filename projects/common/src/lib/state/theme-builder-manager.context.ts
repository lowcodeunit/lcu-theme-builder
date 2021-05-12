import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';
import { ThemeBuilderModel } from '../models/theme-builder.model';

@Injectable({
    providedIn: 'root'
})
export class ThemeBuilderManagerContext extends StateContext
<ThemeBuilderModel> {

    protected State: ThemeBuilderModel;

    constructor(protected injector: Injector) {
        super(injector);
    }

    public GetThemeBuilderById(id: number): void {
        this.State.Loading = true;

        this.Execute({
            Arguments: {
                ThemeBuilderId: id
            },
            Type: 'get-dynamic-theme-builder-by-id'
        });
    }

    protected async loadStateKey() {
        return 'main';
    }

    protected async loadStateName() {
        return 'theme-builder';
    }
}
