import {Component, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MdInput} from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import {NgSwitch} from '@angular/common';
import {Job} from '../model/job.model';

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

export class HeaderComponent implements OnInit {

  @ViewChild(MdInput) private input: MdInput;

  value: string;

  @Input('debounce') debounce = 400;

  @Input('placeholder') placeholder: string;

  @Output('searchDebounce') searchDebounce: EventEmitter<string> = new EventEmitter<string>();

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  @Output('clear') clear: EventEmitter<void> = new EventEmitter<void>();

  @Output('blur') blur: EventEmitter<void> = new EventEmitter<void>();

  // @Output('selectedIndexChange') selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit(): void {
    this.input.ngControl.valueChanges
      .skip(1) // skip first change when value is set to undefined
      .debounceTime(this.debounce)
      .subscribe((value: string) => {
        this.searchDebounce.emit(value);
      });
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

}