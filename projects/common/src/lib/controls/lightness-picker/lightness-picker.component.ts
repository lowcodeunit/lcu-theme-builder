import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
/**
 * String literal data type
 */
type ModeType = 'dark' | 'light';

@Component({
  selector: 'lcu-lightness-picker',
  templateUrl: './lightness-picker.component.html',
  styleUrls: ['./lightness-picker.component.scss']
})
export class LightnessPickerComponent implements OnInit {

  lightness = new FormControl(false);
  toggle = new FormControl(false);

  constructor(private themeBuilderService: ThemeBuilderService) { }

  ngOnInit(): void {

    this.toggle.valueChanges
    .subscribe((val: boolean) => {
      this.themeBuilderService.lightness = !val;
    });

    this.lightness.updateValueAndValidity();

    }

    OnToggleChange(evt: MatSlideToggleChange | boolean): void {

      // if (typeof evt === 'boolean') {
      //   this.setMode(evt);
      // } else {
      //   this.setMode(evt.checked);
      // }
    }

    // protected setMode(val: boolean): void {
    //   if (document.documentElement.hasAttribute('theme-mode')) {
    //     document.documentElement.removeAttribute('theme-mode');
    //   }

    //   if (val) {
    //     document.documentElement.setAttribute('theme-mode', 'dark');
    //   } else {
    //     document.documentElement.setAttribute('theme-mode', 'light');
    //   }
    // }

    /**
     * Store theme in local storage, so it can be used across components
     */
    protected persistThemeMode(): void {
      const storedTheme: any = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      if (storedTheme) {
          document.documentElement.setAttribute('dark-theme', storedTheme);
      }
    }
  }
