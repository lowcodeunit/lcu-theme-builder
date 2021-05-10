import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
/**
 * String literal data type
 */
type ModeType = 'dark' | 'light';

@Component({
  selector: 'lcu-mode-toggle',
  templateUrl: './mode-toggle.component.html',
  styleUrls: ['./mode-toggle.component.scss']
})
export class LightnessPickerComponent implements OnInit {

  /**
   * Access Toggle field within the form group
   */
   public get Toggle(): AbstractControl {
    return this.ToggleForm.get('toggle');
  }

  public ToggleForm: FormGroup;

  constructor(protected themeBuilderService: ThemeBuilderService) { }

  public ngOnInit(): void {

    this.formSetup();
  }

    protected formSetup(): void {

      this.ToggleForm = new FormGroup({
        toggle: new FormControl(false)
      })

      this.onChanges();
    }

    protected onChanges(): void {
      this.Toggle.valueChanges
      .subscribe((val: boolean) => {
        this.themeBuilderService.ThemeMode = val;
      });
    }
  }
