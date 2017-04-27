import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { AuthorService } from '../../services/author.service';

import { Author } from '../../models/author';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors: Author[];

  constructor(private authorService: AuthorService,
              private router: Router) { }

  ngOnInit() {
    this.authorService.getAllAuthors().subscribe(
      data => {
        this.authors = data as Author[];
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  goToDetail(author: Author){
        this.router.navigate(['/author', author.id]);
        console.log(author.id);
  }

}
