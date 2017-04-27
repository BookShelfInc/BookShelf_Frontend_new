import { Component, OnInit, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AuthComponent, AuthRegisterComponent } from '../auth/auth.component';
import { AuthorizationService } from '../../services/authorization.service';

import { BookService } from '../../services/book.service';

import { Book } from '../../models/book';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: string;
  books: Book[];

  constructor(public dialog: MdDialog, public authService: AuthorizationService, 
              public bookService: BookService) {
    this.checkUser();

    
  }

  checkUser(){
    if (this.authService.isLoggedIn()) {
        var currentUser = JSON.parse(localStorage.getItem('user'));
        this.username = currentUser.username;
    }
  }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  openLoginDialog() {
    this.dialog.open(AuthComponent);
  }
   
  openSignupDialog() {
    this.dialog.open(AuthRegisterComponent);
  }

  logout() {
    this.authService.logout();
    this.username = null;
  }
}
