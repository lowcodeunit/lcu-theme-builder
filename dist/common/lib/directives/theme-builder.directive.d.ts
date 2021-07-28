import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ThemeColorPickerService } from '@lcu/common';
import * as i0 from "@angular/core";
export declare class ThemeBuilderDirective implements OnInit {
    private elRef;
    private renderer;
    private themeService;
    private currentColor;
    constructor(elRef: ElementRef, renderer: Renderer2, themeService: ThemeColorPickerService);
    onMouseEnter(): void;
    onMouseLeave(): void;
    ngOnInit(): void;
    private getThemeColor;
    private hoverEffect;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeBuilderDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ThemeBuilderDirective, "[theme-builder]", never, {}, {}, never>;
}
