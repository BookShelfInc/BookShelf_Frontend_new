import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WishList } from '../../models/wish-list';
import { Book } from '../../models/book';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'wish-list',
    templateUrl: 'wish-list.component.html',
    styleUrls: ['wish-list.component.css']
})
export class WishListComponent implements OnInit {

    pageTitle = 'My wishlist';
    books: WishList[];

    constructor(private userService: UserService,
        private router: Router) {
        this.getBooks();
    }


    ngOnInit() {
        this.getBooks();
    }

    getBooks() {
        this.userService.getWishList().subscribe(
            data => {
                this.books = data as WishList[];
                console.log(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    goToDetail(book: Book) {
        this.router.navigate(['/book', book.id]);
        console.log(book.id);
    }

    removeBook(id: number) {
        this.userService.deleteWishList(id).subscribe(
            data => {
                this.getBooks();
            }
        );
    }
}