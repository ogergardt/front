import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IToken} from '../model/itoken.model';

const URL: string = 'http://localhost:8080/api/auth/signin';



@Injectable()
export class AuthService {

  private userInfo: any;

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService) {
  }

  public login(username: string, password: string): Observable<IToken> {
    return this._http.post<IToken>('http://localhost:8080/api/auth/signin',
      JSON.stringify({
        username: username,
        password: password
      }),
      {
        headers: new HttpHeaders()
          .append('Content-Type', 'application/json')

      });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.userInfo = null;
  }

  public isLoggedIn(): boolean {

    const token = this._jwtHelper.tokenGetter();
    console.log('token: ' + token);
    console.log('expireDate = ' + this._jwtHelper.getTokenExpirationDate(token));
    console.log('isExpired = ' + this._jwtHelper.isTokenExpired(token));

    if (!Boolean(token)) {
      return false;
    }

    const isExpired = this._jwtHelper.isTokenExpired();

    if (isExpired) {
      this.logout();
      return false;
    }

    if (!Boolean(this.userInfo)) {
      this._setUserInfo(token);
    }

    return true;
  }

  public getUserInfo() {
    return this.userInfo;
  }


  private _setToken(tokenObj: any) {
    const token = tokenObj.token;
    localStorage.setItem('token', token);
    this._setUserInfo(token);
  }

  private _setUserInfo(token) {
    const parsedToken = this._jwtHelper.decodeToken(token);

    this.userInfo = {
      userId: parsedToken.id,
      username: parsedToken.sub,
      email: parsedToken.email,
      role: parsedToken.role
    };
  }
}
