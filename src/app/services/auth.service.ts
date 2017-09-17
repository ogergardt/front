import {Injectable} from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/signin', JSON.stringify({
      username: username,
      password: password
    }), this.generateOptions())
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();

        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  // login(user) {
  //   const body = `username=${user.username}&password=${user.password}`;
  //   const headers = new Headers();
  //   //headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   return this.http.post('/auth/login', body, headers);
  // }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private generateOptions(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type');
    return new RequestOptions({headers: headers});
  }
}
