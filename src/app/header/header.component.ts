import {Component, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MdInput} from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import {InputService} from '../services/input.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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

export class HeaderComponent implements AfterViewInit {

  @ViewChild(MdInput) private _searchInput: MdInput;

  value: string = '';

  // searchBox: FormControl = new FormControl();
  // subscription: Subscription;

  showSearch: boolean = false;

  @Input('debounce') debounce = 400;

  @Input('placeholder') placeholder: string;

  @Output('searchDebounce') searchDebounce: EventEmitter<string> = new EventEmitter<string>();

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  @Output('clear') clear: EventEmitter<void> = new EventEmitter<void>();

  @Output('blur') blur: EventEmitter<void> = new EventEmitter<void>();

  // @Output('selectedIndexChange') selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private _inputService: InputService) {
  }

  ngAfterViewInit(): void {
    // if (this._searchInput) {
    //
    //   this._searchInput.ngControl.valueChanges
    //     .debounceTime(this.debounce)
    //     .subscribe((value: string) => {
    //       console.log('ngAfterViewInit say: value= ' + value);
    //       this.searchDebounce.emit(value);
    //     });
    // }
  }

  handleBlur(): void {
    this.blur.emit(undefined);
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  handleSearch(event: Event): void {
    console.log('event');
    this.stopPropagation(event);
    this.search.emit(this.value);
    this._inputService.changeInput(this.value.toLowerCase());
  }

  clearSearch(): void {
    this.value = '';
    this.clear.emit(undefined);
    this._inputService.changeInput(this.value.toLowerCase());
  }
}
