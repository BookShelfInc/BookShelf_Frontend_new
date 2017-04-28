import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-page',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {

    pageTitle = "User app works";

    user: User;
    name: string;
    surname: string;

    constructor(private userService: UserService,
                private router: Router) { }

    ngOnInit(){
        let currentUser = JSON.parse(localStorage.getItem('user'));
        this.user = currentUser.user as User;
        this.name = currentUser.first_name;
    }
}