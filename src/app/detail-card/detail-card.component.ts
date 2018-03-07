import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IJob} from '../model/ijob.model';
import {CursorService} from '../services/cursor.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit {
  // @Input('cursor') cursor: IJob;
  cursor: IJob;

  constructor(private _cursorService: CursorService) {
  }

  ngOnInit() {
    this._cursorService.cursor$.subscribe(c => {
      this.cursor = c;
    });
    // console.log(this.cursor);
  }
}
