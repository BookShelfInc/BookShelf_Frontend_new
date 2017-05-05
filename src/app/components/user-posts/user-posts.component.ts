import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from "@angular/router";

import { Post } from '../../models/post';


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  posts: Post[];

  constructor(private blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    this.getUsersPost();
  }

  getUsersPost() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    this.blogService.getUserPosts(currentUser.user.id).subscribe(
      data => {
        this.posts = data as Post[];
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }

  goToDetail(post: Post) {
    this.router.navigate(['/blog/post/', post.id]);
    console.log(post.id);
  }

  deletePost(id: number) {
    this.blogService.deletePost(id).subscribe(
      data => {
        this.getUsersPost();
      }
    );
  }

}
