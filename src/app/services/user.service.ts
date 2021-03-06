import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { WishList, WishListCreate } from '../models/wish-list';
import { Quote, QuoteCreate } from '../models/quote';

@Injectable()
export class UserService {

    constructor(private http: Http) { }


    //GET ALL WISH_LISTS AND QUOTES

    getQuote(): Observable<Quote[]> {
        let url = 'http://bookshelf.life:8080/profile/quotes/all/'; //GET
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this.http.get(url, this.jwt()).map((res: Response) => res.json());
    }

    getWishList(): Observable<WishList[]> {
        let url = 'http://bookshelf.life:8080/profile/wishlist/all/'; //GET
        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this.http.get(url, this.jwt()).map((res: Response) => res.json());
    }




    //ADD [QUOTE] AND [BOOKS TO WISHLIST]

    addQuote(quote: QuoteCreate) {
        let url = 'http://bookshelf.life:8080/profile/quotes/add/';
        this.http.post(url, JSON.stringify(quote), this.jwt()).subscribe();
    }

    addWishList(wishlist: WishListCreate) {
        let url = 'http://bookshelf.life:8080/profile/wishlist/add/';
        this.http.post(url, JSON.stringify(wishlist), this.jwt()).subscribe();
    }



    //DELETE [QUOTE] and [BOOKS TO WISHLIST]
    deleteQuote(id: number) {
        let url = 'http://bookshelf.life:8080/profile/quotes/delete/' + id.toString() + '/';
        return this.http.post(url, this.jwt()).map((res: Response) => res);
    }


    deleteWishList(id: number) {
        let url = 'http://bookshelf.life:8080/profile/wishlist/delete/' + id.toString() + '/';
        return this.http.post(url, this.jwt()).map((res: Response) => res);
    }


    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log(currentUser.token);
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + currentUser.token
            });
            console.log(headers);
            return new RequestOptions({ headers: headers });
        }
    }
}