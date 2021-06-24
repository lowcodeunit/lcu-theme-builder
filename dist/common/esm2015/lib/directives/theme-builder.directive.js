import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ThemeColorPickerService } from '@lcu/common';
export class ThemeBuilderDirective {
    constructor(elRef, renderer, themeService) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.themeService = themeService;
    }
    onMouseEnter() {
        this.hoverEffect(this.getThemeColor(), 'underline');
    }
    onMouseLeave() {
        this.hoverEffect('', 'initial');
    }
    ngOnInit() {
        this.currentColor = this.getThemeColor();
    }
    getThemeColor() {
        const theme = this.themeService.GetColorClass().value;
        return 'color-swatch-' + theme.substring(theme.indexOf('-') + 1, theme.lastIndexOf('-'));
    }
    hoverEffect(color, decoration) {
        const title = this.elRef.nativeElement.querySelector('.mat-card-title');
        this.renderer.setStyle(title, 'text-decoration', decoration);
        if (!color && this.currentColor) {
            this.renderer.removeClass(title, this.currentColor);
        }
        else if (color !== this.currentColor) {
            this.renderer.removeClass(title, this.currentColor);
        }
        if (color) {
            this.renderer.addClass(title, color);
            this.currentColor = color;
        }
    }
}
ThemeBuilderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[theme-builder]'
            },] }
];
ThemeBuilderDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ThemeColorPickerService }
];
ThemeBuilderDirective.propDecorators = {
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVpbGRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24vc3JjL2xpYi9kaXJlY3RpdmVzL3RoZW1lLWJ1aWxkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBS3RELE1BQU0sT0FBTyxxQkFBcUI7SUFJaEMsWUFDVSxLQUFpQixFQUNqQixRQUFtQixFQUNuQixZQUFxQztRQUZyQyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsaUJBQVksR0FBWixZQUFZLENBQXlCO0lBQzNDLENBQUM7SUFFdUIsWUFBWTtRQUN0QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRTJCLFlBQVk7UUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU8sYUFBYTtRQUVuQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUN0RCxPQUFPLGVBQWUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRU8sV0FBVyxDQUFDLEtBQWEsRUFBRSxVQUFrQjtRQUNuRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQTdDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1Qjs7O1lBTDJCLFVBQVU7WUFBZ0IsU0FBUztZQUN0RCx1QkFBdUI7OzsyQkFlN0IsWUFBWSxTQUFDLFlBQVk7MkJBSXpCLFlBQVksU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRoZW1lQ29sb3JQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnQGxjdS9jb21tb24nO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbdGhlbWUtYnVpbGRlcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaGVtZUJ1aWxkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwcml2YXRlIGN1cnJlbnRDb2xvcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIHRoZW1lU2VydmljZTogVGhlbWVDb2xvclBpY2tlclNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJykgb25Nb3VzZUVudGVyKCkge1xyXG4gICAgdGhpcy5ob3ZlckVmZmVjdCh0aGlzLmdldFRoZW1lQ29sb3IoKSwgJ3VuZGVybGluZScpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIG9uTW91c2VMZWF2ZSgpIHtcclxuICAgIHRoaXMuaG92ZXJFZmZlY3QoJycsICdpbml0aWFsJyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IHRoaXMuZ2V0VGhlbWVDb2xvcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRUaGVtZUNvbG9yKCk6IHN0cmluZyB7XHJcbiAgXHJcbiAgICBjb25zdCB0aGVtZSA9IHRoaXMudGhlbWVTZXJ2aWNlLkdldENvbG9yQ2xhc3MoKS52YWx1ZTtcclxuICAgIHJldHVybiAnY29sb3Itc3dhdGNoLScgKyB0aGVtZS5zdWJzdHJpbmcodGhlbWUuaW5kZXhPZignLScpICsgMSwgdGhlbWUubGFzdEluZGV4T2YoJy0nKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhvdmVyRWZmZWN0KGNvbG9yOiBzdHJpbmcsIGRlY29yYXRpb246IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1hdC1jYXJkLXRpdGxlJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRpdGxlLCAndGV4dC1kZWNvcmF0aW9uJywgZGVjb3JhdGlvbik7XHJcblxyXG4gICAgaWYgKCFjb2xvciAmJiB0aGlzLmN1cnJlbnRDb2xvcikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRpdGxlLCB0aGlzLmN1cnJlbnRDb2xvcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbG9yICE9PSB0aGlzLmN1cnJlbnRDb2xvcikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRpdGxlLCB0aGlzLmN1cnJlbnRDb2xvcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbG9yKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGl0bGUsIGNvbG9yKTtcclxuICAgICAgdGhpcy5jdXJyZW50Q29sb3IgPSBjb2xvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==