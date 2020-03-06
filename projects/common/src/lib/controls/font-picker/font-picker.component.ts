import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Constants } from '../../utils/constants.utils';
import { FontSelectionModel } from '../../models/font-selection.model';
import { ThemeBuilderService } from '../../services/theme-builder.service';
import { FontService, FontMeta } from '../../services/font.service';
import { AllFontSelection } from '../../models/all-font-selection.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'lcu-font-picker',
  templateUrl: './font-picker.component.html',
  styleUrls: ['./font-picker.component.scss']
})
export class FontPickerComponent implements OnInit {

  fonts: AllFontSelection = {};

  keys = Object.keys(Constants.DEFAULT_FONTS);

  variants = ['regular', 'medium', 'light'];

  items: FormArray;

  form: FormGroup = new FormGroup({
    family: new FormControl()
  });

  selectedIndex = -1;

  searchItems: Observable<FontMeta[]>;

  search = new FormControl();

  all: FormGroup;
  editing: FormGroup;

  constructor(fb: FormBuilder,
              private themeBuilderService: ThemeBuilderService,
              private fontService: FontService
  ) {
    for (const k of Object.keys(Constants.DEFAULT_FONTS)) {
      this.fonts[k] = { ...Constants.DEFAULT_FONTS[k] };
    }

    this.all = new FormGroup({
      target: new FormControl(null),
      family: new FormControl(null),
      variant: new FormControl(null),
      lineHeight: new FormControl(null),
      size: new FormControl(null),
      spacing: new FormControl(null),
      capitalized: new FormControl(null),
    });

    this.all.valueChanges.subscribe((v) => {
      const keys = Object.keys(v).filter(k => v[k] !== null);
      for (const ctrl of this.items.controls) {
        for (const k of keys) {
          (ctrl as FormGroup).get(k).setValue(v[k]);
        }
      }
      this.form.updateValueAndValidity();
    });

    this.items = fb.array(this.keys.map(x =>
      fb.group({
        target: fb.control(this.fonts[x].target),
        family: new FormControl(this.fonts[x].family),
        variant: fb.control(this.fonts[x].variant),
        lineHeight: fb.control(this.fonts[x].lineHeight),
        size: fb.control(this.fonts[x].size),
        spacing: fb.control(this.fonts[x].spacing),
        capitalized: fb.control(this.fonts[x].capitalized),
      })
    ));

    // this.searchItems = this.search.valueChanges
    //   .pipe(
    //     switchMap(x => this.searchAllFonts(x))
    //   );
  }

  searchAllFonts(q: string) {
    q = q.toLowerCase();
    return this.fontService.getAllFonts()
      .pipe(
        map(x =>
          x.items.filter(v => v.family.toLowerCase().startsWith(q)))
      );
  }

  ngOnInit() {
    this.items.valueChanges.subscribe(x => {
      this.themeBuilderService.fonts = x;
      this.fonts = (x as FontSelectionModel[]).reduce((acc, v) => {
        acc[v.target] = v;
        return acc;
      }, {});

      if (this.selectedIndex >= 0) {
        if (this.search.value !== this.items.at(this.selectedIndex).value.family) {
          this.search.setValue(this.items.at(this.selectedIndex).value.family);
        }
      }
    });


    this.themeBuilderService.$fonts.subscribe((x: any) => {
      const families = Array.from(new Set(x.map((f: FontSelectionModel) => f.family)));
      for (const f of families) {
        debugger;
        // this.fontService.loadFont(f);
      }
      this.items.setValue(x.map((f: any) => Object.assign({}, Constants.DEFAULT_FONTS[f.target], f)));
    });

    this.items.updateValueAndValidity();
  }

  edit(idx: number) {
    this.selectedIndex = idx;
    if (this.selectedIndex >= 0) {
      this.search.setValue(this.items.at(idx).value.family);
    }
    this.editing = this.items.at(idx) as FormGroup;
  }

  editAll() {
    this.search.setValue('');
    this.all.setValue({
      target: null,
      family: null,
      variant: null,
      lineHeight: null,
      size: null,
      spacing: null,
      capitalized: null
    });
    this.editing = this.all;
  }

  selectFont() {
    // this.dialog.open(GoogleFontSelectorComponent, {
    //   data: this.editing
    // });
  }

  // pickFont(f: FontMeta) {
  //   this.editing.patchValue({ family: f.family });
  //   this.fontService.loadFont(f.family);
  //   this.form.updateValueAndValidity();
  // }
}
