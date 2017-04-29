import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WishList } from '../../models/wish-list';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'wish-list',
    templateUrl: 'wish-list.component.html'
})
export class WishListComponent implements OnInit{

    pageTitle = 'My wishlist';
    books: WishList[];

    constructor(private userService: UserService,
                private router: Router) { }


    ngOnInit() {
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


    
}