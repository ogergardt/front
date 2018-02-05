import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {IJob} from '../model/ijob.model';

const URL: string = 'http://ogergardt.me/api/jobs';

@Injectable()
export class JobService {

  constructor(protected _http: HttpClient) {
  }

  public create(job: IJob): Observable<IJob> {
    return this._http.post<IJob>(URL, job);
  }

  public delete(job: IJob): Observable<IJob> {
    return this._http.delete<IJob>(`${URL}/${job.id}`);
  }

  public get(id: string): Observable<IJob> {
    return this._http.get<IJob>(`${URL}/${id}`);
  }

  public list(): Observable<Array<IJob>> {
    return this._http.get<Array<IJob>>(URL);
  }

  public update(job: IJob): Observable<IJob> {
    return this._http.put<IJob>(`${URL}/${job.id}`, job);
  }
}
