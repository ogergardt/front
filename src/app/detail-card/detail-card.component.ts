import {Component, Input, OnInit} from '@angular/core';
import {IJob} from '../model/ijob.model';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit {
  @Input('cursor') cursor: IJob;

  constructor() {
  }

  ngOnInit() {
    console.log('DetailCardComponent.ngOnInit()');
  }

}
