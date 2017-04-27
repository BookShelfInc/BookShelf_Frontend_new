import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { AuthorizationService } from '../../services/authorization.service';

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
      this.authenticationService.register(this.model.username, this.model.password)
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
