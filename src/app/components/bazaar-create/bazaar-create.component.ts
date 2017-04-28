import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { BazaarService } from '../../services/bazaar.service';
import { BookService } from '../../services/book.service';

import { Bazaar, BazaarCreate } from '../../models/bazaar';
import { Book } from '../../models/book';

@Component({
  selector: 'app-bazaar-create',
  templateUrl: './bazaar-create.component.html',
  styleUrls: ['./bazaar-create.component.css']
})
export class BazaarCreateComponent implements OnInit {

  error = false;
  model: any = {};

  selectedBookId: number;
  allBooks: Book[];

  constructor(private bazaarService: BazaarService,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe(
      data => {
        this.allBooks = data as Book[];
      }, 
      error => {
        console.log(error);
      }
    );
  }

  createAd(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.token) {
          console.log('here');
          const ad: BazaarCreate = {
              book: this.selectedBookId,  
              user: currentUser.user.id,
              price: this.model.price,
              publish_date: new Date().toDateString()
          };
          console.log(ad);
          this.bazaarService.createAd(ad).subscribe(
            data => {
              this.router.navigate(['/bazaar']);  
            },
            error => {
              this.error = true;
            }
          );
    }
  }
}
