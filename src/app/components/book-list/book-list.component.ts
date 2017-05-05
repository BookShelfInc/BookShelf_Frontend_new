import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core'
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';


import { Book } from '../../models/book';
import { WishListCreate } from '../../models/wish-list';


import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { AuthorizationService } from '../../services/authorization.service';


@Component({
    selector: 'book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.css'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [
                animate(700, keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ]),
            transition('* => void', [
                animate(700, keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                    style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})
export class BookListComponent implements OnInit {

    books: Book[];
    loggedInBool: boolean;



    constructor(private bookService: BookService,
        private userService: UserService,
        private router: Router,
        public snackBar: MdSnackBar,
        public authService: AuthorizationService, ) { }


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
        this.loggedIn();
    }

    goToDetail(book: Book) {
        this.router.navigate(['/book', book.id]);
        console.log(book.id);
    }

    addWishList(bookId: number) {
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

    loggedIn() {
        this.loggedInBool = this.authService.isLoggedIn();
    }
}

@Component({
    selector: 'added',
    templateUrl: 'added.html',
    styleUrls: ['added.css']
})
export class AddedComponent { }

