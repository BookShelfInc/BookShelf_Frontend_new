import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Book } from '../models/book';
import { Review } from '../models/review';

@Injectable()
export class BookService {

    constructor(private http: Http) { }

    getAllBooks(): Observable<Book[]> {
        let url = 'http://fit.kbtu.kz:8080/book/all/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    getBook(id: number) {
        let url = 'http://fit.kbtu.kz:8080/book/' + id.toString() + '/';
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    getReview(book: Book): Observable<Review[]> {
        let url = 'http://fit.kbtu.kz:8080/book/review/' + book.id.toString() + '/';
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    addReview(review: Review) {
        let url = 'http://fit.kbtu.kz:8080/book/review/';

        console.log(JSON.stringify(review));

        this.http.post(url, JSON.stringify(review), this.jwt()).subscribe();
    }

    isReview(): Observable<any>{
        let url = 'http://fit.kbtu.kz:8080/book/isreview/';
        return this.http.get(url, this.jwt()).map((res: Response) => {
            if(res.status == 200){
                return true;
            }
            else{
                return false;
            }
        });
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