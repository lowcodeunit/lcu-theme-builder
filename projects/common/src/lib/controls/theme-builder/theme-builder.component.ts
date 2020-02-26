import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThemeBuilderModel } from '../../models/theme-builder.model';

@Component({
  selector: 'lcu-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss']
})
export class ThemeBuilderComponent implements OnInit {

  @Input() public card: ThemeBuilderModel;

  @Output() public cardSelected: EventEmitter<any>;

  constructor() {
    this.cardSelected = new EventEmitter<any>();
  }

  public ngOnInit(): void { }

  public SelectCard(url?: string): void {
    this.cardSelected.emit();

    if (url) {
      window.open(url);
    }
  }

}
