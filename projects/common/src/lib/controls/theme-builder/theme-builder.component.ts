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

    if (window.location.search) {
      setTimeout(() => {
        const theme = atob(decodeURIComponent(window.location.search.replace(/^[?]c=/, '')));
        this.themeBuilderService.FromExternal(theme);
      }, 100);
    }
  }

  onReady() {
    this.ready.next(true);
  }

  showSource(yes: boolean) {
    this.showingSource = yes;
  }

  showCredits() {
    // this.dialog.open(CreditsComponent, {
    //   width: '500px',
    // });
  }

  /**
   * Copy SCSS or CSS to clipboard
   *
   * @param title name
   *
   * @param val either scss or css
   */
  protected copy(title: string, val: string): void {
    const el = document.createElement('textarea');
    el.value = val;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.snackbar.open(`Successfully copied ${title} to clipboard!`, 'dismiss', {
      duration: 3000
    });
  }

  /**
   * Export CSS to clipboard
   */
  public ExportCSS(): void {
    this.copy('css', this.css);
  }

  /**
   * Export SCSS to clipboard
   */
  public ExportSCSS(): void {
    this.copy('Angular scss', this.source);
  }

  /**
   * Clear local storage
   */
  public ClearColorMapStorage(): void {
    this.localStorageService.ClearColorMapStorage();
  }

  /**
   * Download palette
   *
   * @param val custom string literal type
   */
  public DownloadPalette(val: SaveType): void {
    const isScss: boolean = val.toUpperCase() === 'SCSS';
    const name: string = String(Math.floor(Math.random() * 100));
    const el: HTMLAnchorElement = document.createElement('a');
    const file: Blob = new Blob([isScss ? this.source : this.css], {type: 'text/x-scss'});
    el.href = URL.createObjectURL(file);
    el.download = isScss ? name + '.scss' : name + '.css';
    el.click();
  }

  makeLink() {
    // let link = window.location.toString().replace(/[#?].*$/g, '');
    // link = `${link}?c=${btoa(this.themeBuilderService.ToExternal())}`;
    // this.copy('link', link);
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
        setTimeout(() => this.isReady = true, 1000);
      });

    this.onReady();

    window.addEventListener('message', (ev) => {
      if (ev.data && ev.data.iconsDone) {
        console.log('Got It!', ev);
      }
    });
  }

  public ngAfterViewInit(): void {
    console.log(this.Preview);
  }

  protected updateTheme(theme: ThemeModel): void {

    if (!theme.palette) {
      return;
    }

    this.source = this.themeBuilderService.GetTemplate(theme);
    this.themeBuilderService.SaveColorPalette(theme);
    console.log('local storage', this.localStorageService.GetColorMapStorage('ColorMaps'));

    const body = this.themeWrapper;

    this.sourcePretty = this.sanitizer.bypassSecurityTrustHtml(highlight(this.source));

    this.zone.runOutsideAngular(() => {
     // window.postMessage({ icons: theme.icons }, window.location.toString());
      this.themeBuilderService.CompileScssTheme(this.source).then( (text: string) => {
        this.css = text;

        // document.getElementById('preview').innerHTML = text;
        // const preview: HTMLElement = document.getElementById('preview');
        // const style = document.createElement('style');
        // preview.appendChild(style);
        // style.type = 'text/css';
        // style.appendChild(document.createTextNode(this.so));
        // preview[0].innerHTML = text;
        // this works, but overrides all styles
        // document.getElementsByTagName('style')[0].innerHTML = text;

        // Sass.readFile('~@angular/material/theming', (s: any) => {
        //   // debugger;
        // });

        // Sass.listFiles((list: Array<any>) => {
        //   list.forEach((cur, i, arr) => {
        //   // debugger;
        // });

          // Sass.writeFile('./assets/dynamic-themes' + (list.length + 1), text, (success: boolean) => {
          //   console.log('write file', success);
          // });
        // });
      }).catch((err: Error) => {
        console.error(err);
      });
    });
  }
}
