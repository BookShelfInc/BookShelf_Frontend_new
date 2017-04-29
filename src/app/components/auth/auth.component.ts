import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AuthorizationService } from '../../services/authorization.service';

import { User, UserCreate } from '../../models/user';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  error = false;

  constructor(private authorizationService: AuthorizationService,
              public dialogRef: MdDialogRef<AuthComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();  
  }

  login(){
    this.authorizationService.login(this.model.username, this.model.password).subscribe(
      data => {
        this.closeDialog();
        this.error = false;
      },
      error => {
        this.loading = false;
        this.error = true;
      }
    );
  }
}

@Component({
  selector: 'app-auth-register',
  templateUrl: './authRegister.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthRegisterComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  error = false;

  constructor(private authenticationService: AuthorizationService,
              public dialogRef: MdDialogRef<AuthRegisterComponent>) { }
  
  closeDialog() {
    this.dialogRef.close();  
  }
  
  register() {
      this.loading = true;
      const user: UserCreate = {
        is_manager: false,
        username: this.model.username,
        first_name: this.model.first_name,
        last_name: this.model.last_name,
        phone: this.model.phone,
        password: this.model.password,
      }
      this.authenticationService.register(user)
          .subscribe(
              data => {
                this.login();
                this.closeDialog();
                this.error = false;
              },
              error => {
                  this.loading = false;
                  this.error = true;
              });
  }

  private login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                this.error = false;
              },
              error => {
                  this.loading = false;
                  this.error = true;
              });
  }

  ngOnInit() {
  }

}
