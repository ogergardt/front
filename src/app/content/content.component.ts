import {
  Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject, ViewChildren, QueryList, OnChanges
} from '@angular/core';
import {JobService} from '../services/job.service';
import {InputService} from '../services/input.service';
import {IJob} from '../model/ijob.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {PositionCardComponent} from '../position-card/position-card.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  public kind: string;
  public subscriptionKind: Subscription;
  public subscriptionPosition: Subscription;
  public positions: IJob[] = [];
  public favorites = new Map();
  public subscriptionSearchTerm: Subscription;
  public searchTerm: string = '';
  public routeLinks: string[] = ['All', 'Apple', 'Qualcomm'];
  public activeLinkIndex: number = 0;
  public activeLinkLabel: string = 'All';
  @ViewChild('cursor') private cursorHTML: ElementRef;
  @ViewChildren(PositionCardComponent) list: QueryList<PositionCardComponent>;


  // public cursor: IJob;

  constructor(private _jobService: JobService,
              private _inputService: InputService,
              private _route: ActivatedRoute,
              /*private _cursorService: CursorService*/) {
  }

  ngAfterViewInit() {
    this.list.changes.subscribe((r) => {
      // console.log('activeLinkLabel: ' + this.activeLinkLabel);
      // console.log(r);
      const i: any = r._results.find(el => ((this.activeLinkLabel === 'All') || (el.position.company === this.activeLinkLabel)));
      // console.log(i);
      if (i) {
        this.cursorHTML.nativeElement.innerHTML = i.position.description;
      } else {
        this.cursorHTML.nativeElement.innerHTML = '';
      }
    });
  }

  ngOnChanges() {
    // console.log('ContentComponent.ngOnChanges()');
  }

  ngOnInit(): void {
    // console.log('ContentComponent.ngOnInit()');
    this.getKind();
    this.getPositions();
    this.getSearchTerm();
  }

  ngOnDestroy() {
    this.subscriptionKind.unsubscribe();
    this.subscriptionPosition.unsubscribe();
    this.subscriptionSearchTerm.unsubscribe();
  }

  getKind(): void {
    // console.log('ContentComponent.getKind()');
    this.subscriptionKind = this._route.params.subscribe(params => {
      this.kind = params['kind'];
    });
  }

  getPositions(): void {
    this.subscriptionPosition = this._jobService.list().subscribe(resp => {
      this.positions = resp;
    });
  }

  getSearchTerm(): void {
    this.subscriptionSearchTerm = this._inputService.getInput().subscribe(term => {
      this.searchTerm = term;
    });
  }

  onTabChange(index: number): void {
    this.activeLinkIndex = index;
    this.activeLinkLabel = this.routeLinks[index];
    // console.log('onTabChange(' + index + ')   activeLinkIndex: ' + this.activeLinkIndex + '  activeLinkLabel: ' + this.activeLinkLabel);
    // ToDo: simplify
    if (this.list.find(el => (this.activeLinkLabel === 'All') || (el.position.company === this.activeLinkLabel))) {
      this.cursorHTML.nativeElement.innerHTML =
        this.list.find(el => (this.activeLinkLabel === 'All') || (el.position.company === this.activeLinkLabel)).position.description;
    } else {
      this.cursorHTML.nativeElement.innerHTML = '';
    }
  }

  public onLike(position: IJob): void {
    if (!this.favorites.get(position.id)) {
      this.favorites.set(position.id, position);
    } else {
      this.favorites.delete(position.id);
    }
    position.like = !position.like;
  }

  public getFavorites(): IJob[] {
    return Array.from(this.favorites.values());
  }

  public onChangeCursor(position: IJob): void {
    // console.log('ContentComponent.onChangeCursor(...)');
    // this._cursorService.cursor$.next(position);
    this.cursorHTML.nativeElement.innerHTML = position.description;
    // this.cursor = position;
  }
}
