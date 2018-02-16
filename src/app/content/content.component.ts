import {Component, OnInit, OnDestroy} from '@angular/core';
import {JobService} from '../services/job.service';
import {InputService} from '../services/input.service';
import {IJob} from '../model/ijob.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit, OnDestroy {
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
  public cursor: IJob;

  constructor(private _jobService: JobService, private _inputService: InputService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
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
    this.subscriptionKind = this._route.params.subscribe(params => {
      this.kind = params['kind'];
    });
  }

  getPositions(): void {
    this.subscriptionPosition = this._jobService.list().subscribe(resp => {
      // this.positions = resp['data'];
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
    this.cursor = void(0);
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
    this.cursor = position;
  }
}
