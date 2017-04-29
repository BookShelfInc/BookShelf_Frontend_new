import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { BookService } from '../../services/book.service';
import { AuthorizationService } from '../../services/authorization.service';

import { Book } from '../../models/book';
import { Review } from '../../models/review';

@Component({
    selector: 'book-detail',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{

    public book: Book;
    error = false;
    model: any = {}
    can = false;

    loggedInBool: boolean;
    isrev: boolean;

    constructor(private _route: ActivatedRoute,
                private bookService: BookService,
                private router: Router,
                public authService: AuthorizationService, ) {}

    ngOnInit(){
        this._route.params
            .switchMap((params: Params) => this.bookService.getBook(+params['id'])).subscribe(
                    data => {
                        this.book = data as Book;
                        //
                        this.loggedIn();
                        this.isReviewed();
                    },
                    error => {
                        this.error = true;
                        console.log(error);
                    }
            );
    }

    addReview(){
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const review: Review = {
                user: currentUser.user.id,
                book: this.book.id,
                review: this.model.review
            };
            console.log('curUSer' +  currentUser.user)
            console.log('Review --- ' + review);
            console.log(this.bookService.addReview(review));
            this.isrev = true;
        }
        console.log(this.model.review);
    }

    getAuthor(id: number){
        this.router.navigate(['/author', id]);
    }

    loggedIn() {
        this.loggedInBool = this.authService.isLoggedIn();
    }

    isReviewed() {
        this.bookService.isReview(this.book.id).subscribe(
            data => {
               this.isrev = data as boolean; 
               console.log('is + ' + this.isrev);
            }
        );
    }
}