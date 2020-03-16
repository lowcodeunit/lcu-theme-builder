import { ThemeBuilderService } from './../../services/theme-builder.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'lcu-palett-picker',
  templateUrl: './palett-picker.component.html',
  styleUrls: ['./palett-picker.component.scss']
})
export class PalettPickerComponent implements OnInit {

  /**
   * Access Primary form group
   */
  public get Primary(): AbstractControl {
    return this.Form.get('primary');
  }

  /**
   * Access Accent form group
   */
  public get Accent(): AbstractControl {
    return this.Form.get('accent');
  }

  /**
   * Access Warn form group
   */
  public get Warn(): AbstractControl {
    return this.Form.get('warn');
  }

  public Form: FormGroup;

  constructor(protected service: ThemeBuilderService) {
    this.setupForm();
  }

  public ngOnInit(): void {
    this.Form.patchValue({
      primary: { main: '#cc33ca' },
      accent: { main: '#797979' },
      warn: { main: '#ff0000' },
      lightText: '#000000',
      lightBackground: '#fafafa',
      darkText: '#ffffff',
      darkBackground: '#2c2c2c'
    });

    this.Form.valueChanges.subscribe(x => {
      this.service.palette = x;
    });

    this.service.$palette
      .subscribe(x => {
        if (x) {
          this.Form.patchValue(x);
        }
      });
  }

  /**
   * Setup the form
   */
  protected setupForm(): void {
    this.Form = new FormGroup({
      primary: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      accent: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      }),
      warn: new FormGroup({
        main: new FormControl(''),
        lighter: new FormControl(''),
        darker: new FormControl('')
      })
    });
  }

}
