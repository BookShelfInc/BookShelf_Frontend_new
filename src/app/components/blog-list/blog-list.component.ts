import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { BlogService } from '../../services/blog.service';

import { Post, PostIsLiked } from '../../models/post';
import { Upvote, UpvoteCreate } from '../../models/upvote';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  posts: Post[];
  postsIsLiked: PostIsLiked[] = [];
  can = false;

  constructor(private blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.token) {
      this.can = true;

      this.blogService.getAllPosts().subscribe(
        data => {
          this.posts = data as Post[];
          for (var i = 0; i < this.posts.length; i++) {
            var exist = false;
            for (var j = 0; j < this.posts[i].upvotes.length; j++) {
              if (this.posts[i].upvotes[j].author == currentUser.user.id) {
                exist = true;
                break;
              }
            }
            const postIL: PostIsLiked = {
              id: this.posts[i].id,
              title: this.posts[i].title,
              content: this.posts[i].content,
              publish_date: this.posts[i].publish_date,
              author: this.posts[i].author,
              comments: this.posts[i].comments.length,
              upvotes: this.posts[i].upvotes.length,
              is_liked: exist,
            }
            this.postsIsLiked.push(postIL);
          }
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.blogService.getAllPosts().subscribe(
        data => {
          this.posts = data as Post[];
          for (var i = 0; i < this.posts.length; i++) {
            var exist = false;
            const postIL: PostIsLiked = {
              id: this.posts[i].id,
              title: this.posts[i].title,
              content: this.posts[i].content,
              publish_date: this.posts[i].publish_date,
              author: this.posts[i].author,
              comments: this.posts[i].comments.length,
              upvotes: this.posts[i].upvotes.length,
              is_liked: exist,
            }
            this.postsIsLiked.push(postIL);
          }
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  
  addUpvote(post: PostIsLiked) {
      let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const upvote: UpvoteCreate = {
                author: currentUser.user.id,
                post: post.id,
                like: true
            };
            const upvotePush: Upvote = {
                id: 1,
                author: currentUser.user.id,
                post: post.id,
                like: true
            };
            console.log(upvote);
            this.blogService.addUpvote(upvote).subscribe(
                data => {
                    console.log(data);
                    post.upvotes = post.upvotes + 1;
                    post.is_liked = true;
                },
                error => {
                    console.log(error);
                }
            );
        }
  }

  goToDetail(post: Post){
        this.router.navigate(['/blog/post/', post.id]);
        console.log(post.id);
  }

  goToCreatePost() {
    this.router.navigate(['/blog/create']);
  }

}
