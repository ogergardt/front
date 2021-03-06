
import {debounceTime} from 'rxjs/operators';
import {Component, ViewChild, AfterViewInit, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MatInput} from '@angular/material';


import {InputService} from '../services/input.service';
import {SubscriptionLike as ISubscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('searchState', [
      state('hide-left', style({
        transform: 'translateX(-150%)',
        visibility: 'hidden',
      })),
      state('hide-right', style({
        transform: 'translateX(150%)',
        visibility: 'hidden',
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

export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatInput) private _searchInput: MatInput;

  value: string = '';

  private subscription: ISubscription;

  public username: string;

  public showSearch: boolean = false;

  @Input() debounce = 400;

  @Output('searchDebounce') searchDebounce: EventEmitter<string> = new EventEmitter<string>();

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  @Output('clear') clear: EventEmitter<void> = new EventEmitter<void>();

  @Output('blur') blur: EventEmitter<void> = new EventEmitter<void>();

  // @Output('selectedIndexChange') selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();


  constructor(private _inputService: InputService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this._authService.getLoggedInName.subscribe(name => this.username = name);
    this._authService.isLoggedIn();
    this._inputService.getInput().subscribe(v => this.value = v);

  }

  ngAfterViewInit(): void {
    if (this._searchInput) {

      this._searchInput.ngControl.valueChanges.pipe(
        debounceTime(this.debounce))
        .subscribe((value: string) => {
          // console.log('ngAfterViewInit say: value= ' + value);
          this.searchDebounce.emit(value);
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    this._inputService.changeInput(this.value.trim().toLowerCase());
  }

  clearSearch(): void {
    this.value = '';
    this.clear.emit(undefined);
    this._inputService.changeInput(this.value.toLowerCase());
    // this.showSearch = !this.showSearch;
  }
}
