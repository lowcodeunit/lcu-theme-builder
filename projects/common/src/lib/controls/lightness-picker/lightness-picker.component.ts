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
    this.lightness.valueChanges
    .subscribe(x => this.themeBuilderService.lightness = x);

    this.themeBuilderService.$lightness.subscribe(x => {
        this.lightness.setValue(x);
        this.lightness.updateValueAndValidity();
      });

    this.lightness.updateValueAndValidity();
    }

    OnToggleChange(evt: MatSlideToggleChange) {
      this.setMode(evt.checked);
    }

    protected setMode(val: boolean): void {
      if (document.documentElement.hasAttribute('theme-mode')) {
        document.documentElement.removeAttribute('theme-mode');
      } else {
        if (val) {
          document.documentElement.setAttribute('theme-mode', 'dark');
        }
      }
    }
  }
