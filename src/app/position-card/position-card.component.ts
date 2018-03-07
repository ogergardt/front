import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IJob} from '../model/ijob.model';


@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.css']
})
export class PositionCardComponent implements OnInit, OnChanges {
  @Input('position') position: IJob;
  @Input('activeLinkLabel') activeLinkLabel: string;
  @Output('like') like: EventEmitter<IJob> = new EventEmitter<IJob>();
  @Output('cursor') cursor: EventEmitter<IJob> = new EventEmitter<IJob>();

  constructor() {
  }

  ngOnInit() {
    // console.log('position-card.ngOnInit()');
  }

  ngOnChanges() {
    // console.log('position-card.ngOnChanges()');
  }

  public handleLike(): void {
    this.like.emit(this.position);
  }

  public onItemClick(): void {
    // console.log('sendposition: ' + this.position.title);
    this.cursor.emit(this.position);
  }

}
