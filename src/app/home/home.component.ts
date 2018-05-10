import {AfterViewInit, Component, ElementRef, OnInit, Renderer, ViewChild} from '@angular/core';

// flex-layout
import {ObservableMedia} from '@angular/flex-layout';

// rxjs
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cols: Observable<number>;
  value: string = '';


  constructor(private observableMedia: ObservableMedia) {
  }

  ngOnInit() {
    const grid = new Map([
      ['xs', 1],
      ['sm', 2],
      ['md', 2],
      ['lg', 3],
      ['xl', 3]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        // console.log('mqAlias: ' + mqAlias);
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
      .map(change => grid.get(change.mqAlias))
      .startWith(start);
  }
}
