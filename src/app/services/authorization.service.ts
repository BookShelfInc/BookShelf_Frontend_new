import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { User } from '../models/user';

@Injectable()
export class AuthorizationService {

  public token: string;

  constructor(private http:Http) { }

  login(username: string, password: string): Observable<boolean>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = 'http://fit.kbtu.kz:8080/auth/login/';
    let body = JSON.stringify({username: username, password: password});
    
    return this.http.post(url, body, options)
      .map((response: Response) => {
        console.log(response);
        console.log(response.status)
        let token = response.json() && response.json().token
        if(token){
          this.token = token
          localStorage.setItem('user', JSON.stringify({ token: token, username: username }));

          this.getInfo().subscribe(
            data => {
              let userInfo = data as User;
              localStorage.removeItem('user');
              localStorage.setItem('user', JSON.stringify({ token: token, username: username, user: userInfo}));
            }
          );

          return true;
        }
        else{
          return false;
        }
      });
  }

  register(username: string, password: string): Observable<boolean>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = 'http://fit.kbtu.kz:8080/auth/register/';
    let body = JSON.stringify({username: username, password: password});

    return this.http.post(url, body, options)
      .map((response: Response) => {
        if(response.status == 200){
          return true;
        }
        else{
          return false;
        }
      });
  }

  getInfo(): Observable<any> {
    let url = 'http://fit.kbtu.kz:8080/auth/info/';
        
    console.log(this.jwt());

    return this.http.get(url, this.jwt()).map((res: Response) => res.json());
  }

  isLoggedIn(): Boolean {
      let currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.token) {
          return true
      } else {
          return false
      }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
    location.reload();
  }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log(currentUser);
            let headers = new Headers({ 'Content-Type': 'application/json',
                                        'Authorization': 'JWT ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
