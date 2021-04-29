import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, ElementRef, NgZone, Inject, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs/internal/Subject';
import { take, switchMap, debounceTime } from 'rxjs/operators';

import { ThemeBuilderModel } from '../../models/theme-builder.model';
import { ThemeModel } from '../../models/theme.model';
import { highlight } from '../../utils/highlights.utils';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { DOCUMENT } from '@angular/common';
import { readFile } from 'fs';
import { ColorMapModel } from '../../models/color-map.model';

declare var Sass: any;

/**
 * String literal data type
 */
type SaveType = 'scss' | 'css';

@Component({
  selector: 'lcu-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})

export class ThemeBuilderComponent implements OnInit, AfterViewInit  {

  @ViewChild('preview')
  public Preview: ElementRef;

  protected renderer2: Renderer2;

  protected themeWrapper: Document;

  form: FormGroup;

  refresh: Subject<number> = new Subject();
  ready: Subject<boolean> = new Subject();
  isReady: boolean;
  showingSource = false;
  source = '';
  css = '';
  sourcePretty: SafeHtml = '';
  first = true;

  constructor(private el: ElementRef, private zone: NgZone,
              private snackbar: MatSnackBar,
              private sanitizer: DomSanitizer,
              protected themeBuilderService: ThemeBuilderService,
              protected localStorageService: LocalStorageService,
              @Inject(DOCUMENT) protected document: any
  ) {
    this.themeWrapper = document.querySelector('head');
    window.onload = () => {
      this.onReady();
    }
  }

  onReady() {
    this.ready.next(true);
  }



  public ngOnInit(): void {
    this.ready
      .pipe(
        take(1),
        switchMap(x => this.themeBuilderService.$theme),
        debounceTime(100)
      )
      .subscribe(x => {
        // debugger;
        this.updateTheme(x);
        setTimeout(() => this.isReady = true, 1000);
      });

  }

  public ngAfterViewInit(): void {
   
  }

  protected updateTheme(theme: ThemeModel): void {
// debugger;
    this.source = this.themeBuilderService.GetTemplate(theme);
   // this.themeBuilderService.SaveColorPalette(theme);

    const preview: HTMLElement = document.getElementById('preview') as HTMLElement;
    this.sourcePretty = this.sanitizer.bypassSecurityTrustHtml(highlight(this.source));

    this.zone.runOutsideAngular(() => {

     this.themeBuilderService.CompileScssTheme(this.source).then( (text: string) => {
        this.css = text;

        const stylesheets: any = document.styleSheets;

        stylesheets.forEach((element: object) => {
            console.log(element);
          });


        const style = document.createElement('style');
        style.id = 'dynamicstyle'
        style.appendChild(document.createTextNode(this.css));

        document.getElementsByTagName('head')[0].appendChild(style);

      }).catch((err: Error) => {
        console.error(err);
      });
    });
  }
}
