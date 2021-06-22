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
export class LightnessPickerComponent implements OnInit {

  private _darkModeToggle: boolean;
  @Input('dark-mode-toggle')
  public set DarkModeToggle(val: boolean) {
    
    if (!val ) { return; }

    this._darkModeToggle = val;
    this.setThemeMode(val);
  }

  public get DarkModeToggle(): boolean {
    return this._darkModeToggle;
  }

  /**
   * Access Toggle field within the form group
   */
   public get Toggle(): AbstractControl {
  
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
        toggle: new FormControl(this.DarkModeToggle)
      })

      this.onChanges();
    }

    protected onChanges(): void {
      debugger;
      this.Toggle.valueChanges
      .subscribe((val: boolean) => {
        debugger;
        this.setThemeMode(val);
      });
    }

    protected toggleMode(val: boolean): string {
      return val ? 'Light Mode' : 'Dark Mode';
    }

    protected setThemeMode(val: boolean): void {
      this.ToggleMode = this.toggleMode(val);
      this.themeBuilderService.ThemeMode = val;
    }
  }
