import { Component, Input, OnInit } from '@angular/core';
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
export class ModeToggleComponent implements OnInit {

  private _darkMode: boolean;
  @Input('dark-mode')
  public set DarkMode(val: boolean) {

    if (!val ) { return; }

    this._darkMode = val;
    this.Toggle.setValue(val);
    // this.setThemeMode(val);
  }

  public get DarkMode(): boolean {
    return this._darkMode;
  }

  /**
   * Access Toggle field within the form group
   */
   public get Toggle(): AbstractControl {

    if (!this.ToggleForm) { return null ;}

    return this.ToggleForm.get('toggle');
  }

  public ToggleForm: FormGroup;

  public ToggleMode: string;

  constructor(protected themeBuilderService: ThemeBuilderService) { 
    this.ToggleMode = 'Dark Mode';
  }

  public ngOnInit(): void {

    this.formSetup();
  }

    protected formSetup(): void {

      this.ToggleForm = new FormGroup({
        toggle: new FormControl(this.DarkMode)
      })

      this.onChanges();
    }

    protected onChanges(): void {

      this.Toggle.valueChanges
      .subscribe((val: boolean) => {
        this.setThemeMode(val);
      });
    }

    protected toggleMode(val: boolean): string {
      return val ? 'Dark Mode' : 'Light Mode';
    }

    protected setThemeMode(val: boolean): void {
      this.ToggleMode = this.toggleMode(val);
      this.themeBuilderService.ThemeMode = val;
    }
  }
