import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthorInfo } from '../models/authorInfo';
import { Author } from '../models/author';

@Injectable()
export class AuthorService {

   constructor(private http: Http) { }

    getAuthor(id: number): Observable<AuthorInfo>{
        let url = 'http://fit.kbtu.kz:8080/book/author/' + id.toString() + '/';
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    } 

    getAllAuthors(): Observable<Author[]> {
        let url = 'http://fit.kbtu.kz:8080/book/author/all/';
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }

}