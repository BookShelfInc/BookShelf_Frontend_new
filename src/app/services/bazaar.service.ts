import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Bazaar, BazaarCreate } from '../models/bazaar';

@Injectable()
export class BazaarService {

  chosenAd: Bazaar;

  getChosenAd() {
    return this.chosenAd;
  }
  setChosenAd(ad: Bazaar){
    this.chosenAd = ad;
  }

  constructor(private http: Http) { }

  getAllAds(): Observable<Bazaar[]> {
    let url = 'http://fit.kbtu.kz:8080/bazaar/all/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map((res: Response) => res.json());
  }

  getAd(id: number): Observable<Bazaar> {
    let url = 'http://fit.kbtu.kz:8080/bazaar/' + id.toString() + '/';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options).map((res: Response) => res.json());
  }

  createAd(ad: BazaarCreate) {
    let url = 'http://fit.kbtu.kz:8080/bazaar/create/';
    return this.http.post(url, JSON.stringify(ad), this.jwt()).map((res: Response) => res.json());
  }
  
  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.token) {
          console.log(currentUser.token);
          let headers = new Headers({ 'Content-Type': 'application/json',
                                      'Authorization': 'JWT ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }
}
