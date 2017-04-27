import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { AuthComponent, AuthRegisterComponent } from './components/auth/auth.component';
import { BookListComponent } from './components/book/book-list.component';
import { BookDetailComponent } from './components/book/book-detail.component';
import { ReviewListComponent } from './components/book/review-list.component';
import { AuthorComponent } from './components/author/author.component';

import { AuthorizationService } from './services/authorization.service';
import { BookService } from './services/book.service';
import { AuthorService } from './services/author.service';
import { BlogService } from './services/blog.service';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { AuthorListComponent } from './components/author-list/author-list.component';

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
  ],
  imports: [
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
      { path: '', redirectTo: 'books', pathMatch: 'full'},
      { path: '**', redirectTo: 'books', pathMatch: 'full'},     
    ])
  ],
  entryComponents: [AuthComponent, AuthRegisterComponent],
  providers: [AuthorizationService, BookService, AuthorService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
