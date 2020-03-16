import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
<<<<<<< HEAD
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
/**
 * String literal data type
 */
type ModeType = 'dark' | 'light';
=======
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8

@Component({
  selector: 'lcu-lightness-picker',
  templateUrl: './lightness-picker.component.html',
  styleUrls: ['./lightness-picker.component.scss']
})
export class LightnessPickerComponent implements OnInit {

  lightness = new FormControl(false);
<<<<<<< HEAD
  toggle = new FormControl(false);
=======
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8

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
<<<<<<< HEAD

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
=======
>>>>>>> c0df40ed12c6d0967061024dfce48ca50b1fe8e8
  }
