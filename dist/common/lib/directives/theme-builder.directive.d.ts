import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ThemeColorPickerService } from '@lcu/common';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ThemeBuilderDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<ThemeBuilderDirective, "[theme-builder]", never, {}, {}, never>;
}

//# sourceMappingURL=theme-builder.directive.d.ts.map