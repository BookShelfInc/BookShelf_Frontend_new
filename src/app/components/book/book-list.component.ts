import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
    selector: 'book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {

    books: Book[];

    constructor(private bookService: BookService,
                private router: Router) {}

    ngOnInit() {
        this.bookService.getAllBooks().subscribe(
            data => {
                this.books = data as Book[];
                //console.log(data);
                console.log(this.books);
            }, 
            error => {
                console.log(error);
            }
        );        
    }

    goToDetail(book: Book){
        this.router.navigate(['/book', book.id]);
        console.log(book.id);
    }
}