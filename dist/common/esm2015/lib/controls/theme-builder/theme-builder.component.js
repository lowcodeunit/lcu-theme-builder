import { Component } from '@angular/core';
export class ThemeBuilderComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
ThemeBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'lcu-theme-builder',
                template: "\r\n<div fxLayout=\"column\" fxLayoutGap=\"10px\">\r\n  <!-- <lcu-mode-toggle></lcu-mode-toggle> -->\r\n  <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-toolbar color=\"primary\">\r\n        <span class=\"primary-color\">Primary Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"accent\">\r\n        <span class=\"accent-color\">Accent Colors</span>\r\n      </mat-toolbar>\r\n      <mat-toolbar color=\"warn\">\r\n        <span class=\"warn-color\">Warn Colors</span>\r\n      </mat-toolbar>\r\n  </div>\r\n  <!-- <lcu-palette-picker></lcu-palette-picker> -->\r\n</div>\r\n",
                styles: [".primary-color{color:var(--theme-primary-A700)}.accent-color{color:var(--theme-accent-A700)}.warn-color{color:var(--theme-warn-A700)}"]
            },] }
];
ThemeBuilderComponent.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi9jb250cm9scy90aGVtZS1idWlsZGVyL3RoZW1lLWJ1aWxkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFRbEQsTUFBTSxPQUFPLHFCQUFxQjtJQUVoQztJQUdBLENBQUM7SUFFTSxRQUFRO0lBRWYsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHVtQkFBNkM7O2FBRTlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGN1LXRoZW1lLWJ1aWxkZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aGVtZS1idWlsZGVyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgIHtcclxuXHJcbiAgY29uc3RydWN0b3IoKVxyXG4gIHtcclxuXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19