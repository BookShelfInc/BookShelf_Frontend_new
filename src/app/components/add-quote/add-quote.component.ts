import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quote, QuoteCreate } from '../../models/quote';

import { UserService } from '../../services/user.service';


@Component({
    selector: 'add-quote',
    templateUrl: 'add-quote.component.html'
})
export class AddQuoteComponent implements OnInit {

    model: any = {}

    constructor(private userService: UserService,
                private router: Router) { } 

    ngOnInit() { }

    addQuote(){
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