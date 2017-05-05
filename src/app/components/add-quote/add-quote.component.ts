import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Quote, QuoteCreate } from '../../models/quote';
import { Book } from '../../models/book';

import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/startWith';


@Component({
    selector: 'add-quote',
    templateUrl: 'add-quote.component.html',
})
export class AddQuoteComponent implements OnInit {
    stateCtrl: FormControl;
    filteredStates: any;

    
    model: any = {}
    selectBookId: number;
    books: Book[];
    currentID: number = undefined;

    constructor(private userService: UserService,
        private bookSerive: BookService,
        private router: Router) {

        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
            
    }

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
    filterStates(val: string) {
        // console.log('hello');
        let ans =  val ? this.books.filter(s => new RegExp(`^${val}`, 'gi').test(s.title))
            : this.books;
        if(ans.length == 0) {
            this.currentID = undefined;
        } else {
            this.currentID = ans[0].id;
        }
        return ans;
    }


    addQuote() {
        // alert(this.currentID);
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const quote: QuoteCreate = {
                quote: this.model.quote.toString(),
                user: currentUser.user.id,
                book: this.currentID,
            };
            console.log(quote);
            console.log(this.userService.addQuote(quote));
            this.router.navigate(['/my_page']);
        }
        console.log(this.model.review);
    }
}