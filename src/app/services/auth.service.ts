import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

import {IToken} from '../model/itoken.model';

@Injectable()
export class AuthService {
  @Output() getLoggedInName: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  public login(username: string, password: string): Observable<IToken> {
    return this._http.post<IToken>('/api/auth/signin',
      JSON.stringify({username: username, password: password}),
      {headers: new HttpHeaders().append('Content-Type', 'application/json')}
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.getLoggedInName.emit('');
  }

  public register(username: string, email: string, password: string): Observable<IToken> {
    return this._http.post<IToken>('/api/auth/signup',
      JSON.stringify({username: username, email: email, password: password}),
      {headers: new HttpHeaders().append('Content-Type', 'application/json')});
  }

  public isLoggedIn(): boolean {

    const token = this._jwtHelper.tokenGetter();

    if (!Boolean(token)) {
      return false;
    }

    const isExpired = this._jwtHelper.isTokenExpired();

    if (isExpired) {
      this.logout();
      return false;
    }
    const username = this._jwtHelper.decodeToken(token).sub;

    this.getLoggedInName.emit(username);
    return true;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  // I'm not using it now
  public ping() {
    this._http.get('/api/whoami')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }
}
