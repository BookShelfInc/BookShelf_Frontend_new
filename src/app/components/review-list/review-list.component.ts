import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { BookService } from '../../services/book.service';
import { Review } from '../../models/review';
import { Book } from '../../models/book';

@Component({
    selector: 'review-list',
    templateUrl: 'review-list.component.html',
    styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {  
    
    reviews: Review[];
    @Input() currentBook: Book;

    constructor(private _route: ActivatedRoute,
                private bookService: BookService) {}
    
    ngOnInit(){
        this.bookService.getReview(this.currentBook).subscribe(
            data => {
                this.reviews = data as Review[];
                console.log(this.reviews);
            }
        );
    }
}