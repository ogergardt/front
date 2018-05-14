import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs';
import {IJob} from '../model/ijob.model';

@Injectable()
export class CursorService {
  cursor$: BehaviorSubject<IJob> = new BehaviorSubject(<IJob>{});
}
