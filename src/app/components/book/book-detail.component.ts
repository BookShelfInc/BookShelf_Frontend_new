import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { BookService } from '../../services/book.service';
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

    constructor(private _route: ActivatedRoute,
                private bookService: BookService,
                private router: Router) {}

    ngOnInit(){
        this._route.params
            .switchMap((params: Params) => this.bookService.getBook(+params['id'])).subscribe(
                    data => {
                        this.book = data as Book;
                    },
                    error => {
                        this.error = true;
                        console.log(error);
                    }
            );
        this.bookService.isReview().subscribe(
            data => {
                this.can = false;
                console.log(data);
            }, 
            error => {
                this.can = true;
                let currentUser = JSON.parse(localStorage.getItem('user'));
                if(!(currentUser && currentUser.token)) {
                    this.can = false;
                }
                console.log(error);
            }
        )
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
            console.log(review);
            console.log(this.bookService.addReview(review));
        }
        console.log(this.model.review);
    }

    getAuthor(id: number){
        this.router.navigate(['/author', id]);
    }
}