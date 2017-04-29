import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';


import { Book } from '../../models/book';
import { WishListCreate } from '../../models/wish-list';


import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css']
})
export class BookListComponent implements OnInit {

    books: Book[];

    constructor(private bookService: BookService,
                private userService: UserService,
                private router: Router,
                public snackBar: MdSnackBar) {}

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

    addWishList(bookId: number){
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const wishList: WishListCreate = {
                user: currentUser.user.id,
                book: bookId,
                has_read: false,
            };
        console.log(wishList);
        console.log(this.userService.addWishList(wishList));
        console.log("Book successfully added");
        this.snackBar.openFromComponent(AddedComponent, {
                    duration: 500,
            });
        }
    }
}

@Component({
    selector: 'added',
    templateUrl: 'added.html',
    styleUrls: ['added.css']
})
export class AddedComponent {}

