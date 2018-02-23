import {Component, Input, OnInit} from '@angular/core';
import {IJob} from '../model/ijob.model';
import {CursorService} from '../services/cursor.service';

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
    console.log('DetailCardComponent.ngOnInit()');

    this._cursorService.cursor$.subscribe(c => {
      console.log(c);
      this.cursor = c;
    });
  }

}
