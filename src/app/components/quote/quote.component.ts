import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quote, QuoteCreate } from '../../models/quote';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'quote',
    templateUrl: 'quote.component.html'
})
export class QuoteComponent implements OnInit {

    pageTitle = "Quote";

    quotes: Quote[];

    constructor(private router: Router,
        private userService: UserService) {
        this.getQuote();
    }

    ngOnInit() {
        this.getQuote();
    }

    getQuote() {
        this.userService.getQuote().subscribe(
            data => {
                this.quotes = data as Quote[];
            },
            error => {
                console.error(error);
            }
        )
    }

    deleteQuote(id: number) {
        this.userService.deleteQuote(id).subscribe(
            data => {
                this.getQuote();
            }
        );
    }

    goToAddQuote() {
        this.router.navigate(['/my_page/create-quote']);
    }
}
