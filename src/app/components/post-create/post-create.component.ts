import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { BlogService } from '../../services/blog.service';

import { Post, PostCreate } from '../../models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  model: any = {}

  constructor(private blogService: BlogService,
              private router: Router) { }

  ngOnInit() {
  }

  addPost(){
    let currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.token) {
          console.log('here');
          const post: PostCreate = {
              title: this.model.title,
              content: this.model.content,
              publish_date: new Date().toDateString(),
              author: currentUser.user.id,
          };
          console.log(post);
          console.log(this.blogService.addPost(post));
          this.router.navigate(['/blog']);
    }
    console.log(this.model.review);
  }
}
