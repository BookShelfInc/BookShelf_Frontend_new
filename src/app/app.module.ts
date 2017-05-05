import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthComponent, AuthRegisterComponent } from './components/auth/auth.component';
import { BookListComponent, AddedComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { AuthorComponent } from './components/author/author.component';

import { AuthorizationService } from './services/authorization.service';
import { BookService } from './services/book.service';
import { AuthorService } from './services/author.service';
import { BlogService } from './services/blog.service';
import { UserService } from './services/user.service';
import { BazaarService } from './services/bazaar.service';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { AuthorListComponent } from './components/author-list/author-list.component';


import { UserComponent } from './components/user/user.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { QuoteComponent } from './components/quote/quote.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';

import { BazaarListComponent } from './components/bazaar-list/bazaar-list.component';
import { BazaarDialog } from './components/bazaar-list/bazaar-list.component';
import { BazaarDetailComponent } from './components/bazaar-detail/bazaar-detail.component';
import { BazaarCreateComponent } from './components/bazaar-create/bazaar-create.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { Custom404Component } from './components/custom-404/custom-404.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthRegisterComponent,
    BookListComponent,
    BookDetailComponent,
    NavbarComponent,
    ReviewListComponent,
    AuthorComponent,
    BlogListComponent,
    PostDetailComponent,
    PostCreateComponent,
    AuthorListComponent,
    UserComponent,
    WishListComponent,
    QuoteComponent,
    AddQuoteComponent,
    BazaarListComponent,
    BazaarDetailComponent,
    BazaarDialog,
    BazaarCreateComponent,
    AddedComponent,
    Custom404Component
  ],
  imports: [
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: 'book/:id', component: BookDetailComponent },
      { path: 'books', component: BookListComponent },
      { path: 'author', component: AuthorListComponent },
      { path: 'author/:id', component: AuthorComponent },
      { path: 'blog', component: BlogListComponent },
      { path: 'blog/post/:id', component: PostDetailComponent },
      { path: 'blog/create', component: PostCreateComponent },
      { path: 'my_page', component: UserComponent },
      { path: 'my_page/create-quote', component: AddQuoteComponent },
      { path: 'bazaar', component: BazaarListComponent },
      { path: 'bazaar/create', component: BazaarCreateComponent },
      { path: '', redirectTo: 'books', pathMatch: 'full'},
      { path: '404', component: Custom404Component},
      { path: '**', redirectTo: '404', pathMatch: 'full'},
    ])
  ],
  entryComponents: [AuthComponent, AuthRegisterComponent, BazaarDialog, BazaarListComponent, BookListComponent, AddedComponent],
  providers: [AuthorizationService, BookService, AuthorService, BlogService, BazaarService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
