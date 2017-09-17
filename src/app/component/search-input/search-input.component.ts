import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MdInputDirective} from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  animations: [
    trigger('searchState', [
      state('hide-left', style({
        transform: 'translateX(-150%)',
        display: 'none',
      })),
      state('hide-right', style({
        transform: 'translateX(150%)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translateX(0%)',
        display: 'block',
      })),
      transition('* => show', animate('200ms ease-in')),
      transition('show => *', animate('200ms ease-out')),
    ]),
  ],
})
export class SearchInputComponent implements OnInit {

  @ViewChild('input') input: MdInputDirective;


  value: string;

  /**
   * debounce?: number
   * Debounce timeout between keypresses. Defaults to 400.
   */
  @Input('debounce') debounce = 400;

  /**
   * placeholder?: string
   * Placeholder for the underlying input component.
   */
  @Input('placeholder') placeholder: string;

  /**
   * searchDebounce: function($event)
   * Event emitted after the [debounce] timeout.
   */
  @Output('searchDebounce') searchDebounce: EventEmitter<string> = new EventEmitter<string>();

  /**
   * search: function($event)
   * Event emitted after the key enter has been pressed.
   */
  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  /**
   * clear: function()
   * Event emitted after the clear icon has been clicked.
   */
  @Output('clear') clear: EventEmitter<void> = new EventEmitter<void>();

  /**
   * blur: function()
   * Event emitted after the blur event has been called in underlying input.
   */
  @Output('blur') blur: EventEmitter<void> = new EventEmitter<void>();


  constructor() {
  }

  ngOnInit(): void {
    this.input['underlineRef'].nativeElement.className = null; // Remove the input underline
    this.input._ngControl.valueChanges
      .skip(1) // skip first change when value is set to undefined
      .debounceTime(this.debounce)
      .subscribe((value: string) => {
        this._searchTermChanged(value);
      });
  }

  /**
   * Method to focus to underlying input.
   */
  focus(): void {
    this.input.focus();
  }

  handleBlur(): void {
    this.blur.emit(undefined);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  handleSearch(event: Event): void {
    this.stopPropagation(event);
    this.search.emit(this.value);
  }

  clearSearch(): void {
    this.value = '';
    this.clear.emit(undefined);
  }

  private _searchTermChanged(value: string): void {
    this.searchDebounce.emit(value);
  }

}
