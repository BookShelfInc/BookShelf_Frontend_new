import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quote, QuoteCreate } from '../../models/quote';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'quote',
    templateUrl: 'quote.component.html'
}) 
export class QuoteComponent implements OnInit {

    pageTitle = "quote component works";

    quotes: Quote[];

    constructor(private router: Router,
                private userService: UserService) {} 

    ngOnInit() {
        this.userService.getQuote().subscribe(
            data => {
                this.quotes = data as Quote[];
            },
            error => {
                console.error(error);
            }
        )
    }

    goToAddQuote(){
        this.router.navigate(['/my_page/create-quote']);
    }
}
