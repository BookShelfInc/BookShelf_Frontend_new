import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { BlogService } from '../../services/blog.service';

import { Post } from '../../models/post';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  posts: Post[];
  can = false;

  constructor(private blogService: BlogService,
              private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.token) {
      this.can = true;
    }

    this.blogService.getAllPosts().subscribe(
      data => {
        this.posts = data as Post[];
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  goToDetail(post: Post){
        this.router.navigate(['/blog/post/', post.id]);
        console.log(post.id);
  }

  goToCreatePost(){
        this.router.navigate(['/blog/create']);
  }

}
