import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs/internal/Subject';
import { take, switchMap, debounceTime } from 'rxjs/operators';

import { ThemeModel } from '../../models/theme.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';

@Component({
  selector: 'lcu-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})

export class ThemeBuilderComponent implements OnInit  {

  protected compiledDynamicCSS: string;
  protected ready: Subject<boolean>;
  protected source: string;

  constructor(protected zone: NgZone,
              protected sanitizer: DomSanitizer,
              protected themeBuilderService: ThemeBuilderService,
              protected localStorageService: LocalStorageService)
  {

    this.ready = new Subject();

    window.onload = () => {
      this.ready.next(true);
    }
  }

  public ngOnInit(): void {

    this.ready
      .pipe(
        take(1),
        switchMap(x => this.themeBuilderService.$theme),
        debounceTime(100)
      )
      .subscribe(x => {
        this.updateTheme(x);
        // setTimeout(() => this.isReady = true, 1000);
      });

  }

  protected updateTheme(theme: ThemeModel): void {

    // SASS stylesheet
    this.source = this.themeBuilderService.GetTemplate(theme);

    // Running functions outside of Angular's zone and do work that
    // doesn't trigger Angular change-detection.
    this.zone.runOutsideAngular(() => {

     this.themeBuilderService.CompileScssTheme(this.source).then( (text: string) => {

        // SASS compiled to CSS
        this.compiledDynamicCSS = text;

        const dynamicStyleSheet: HTMLElement = document.getElementById('dynamic-style-sheet');

        // check if dynamic stylesheet exists, then remove it
        if (dynamicStyleSheet) {
          document.getElementsByTagName('head')[0].removeChild(dynamicStyleSheet);
        }

        // add dynamic stylesheet
        const style = document.createElement('style');
              style.id = 'dynamic-style-sheet';
              style.appendChild(document.createTextNode(this.compiledDynamicCSS));

        document.getElementsByTagName('head')[0].appendChild(style);

      }).catch((err: Error) => {
        console.error(err);
      });
    });
  }
}
