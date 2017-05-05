import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';

import { Quote, QuoteCreate } from '../../models/quote';
import { Book } from '../../models/book';

import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';


@Component({
    selector: 'add-quote',
    templateUrl: 'add-quote.component.html'
})
export class AddQuoteComponent implements OnInit {

    model: any = {}

    selectBookId: number;
    books: Book[];


    constructor(private userService: UserService,
        private bookSerive: BookService,
        private router: Router) {}

    ngOnInit() {
        this.bookSerive.getAllBooks().subscribe(
            data => {
                this.books = data as Book[];
            },
            error => {
                console.log(error);
            }
        )
    }

    addQuote() {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const quote: QuoteCreate = {
                quote: this.model.quote.toString(),
                user: currentUser.user.id,
                book: 1
            };
            console.log(quote);
            console.log(this.userService.addQuote(quote));
            this.router.navigate(['/my_page']);
        }
        console.log(this.model.review);
    }
}