import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { BlogService } from '../../services/blog.service';

import { Post } from '../../models/post';
import { Comment, CommentCreate } from '../../models/comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public post: Post;
  can = false;
  model: any = {}

  constructor(private _route: ActivatedRoute,
              private blogService: BlogService,
              private _router: Router) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.token) {
      this.can = true;
    }
    this._route.params
            .switchMap((params: Params) => this.blogService.getPost(+params['id'])).subscribe(
                    data => {
                        this.post = data as Post;
                    },
                    error => {
                        console.log(error);
                    }
            );
  }

  addComment(){
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const comment: CommentCreate = {
                content: this.model.comment,
                publish_date: new Date().toDateString(),
                author: currentUser.user.id,
                post: this.post.id
            };
            console.log(comment);
            console.log(this.blogService.postComment(comment));
        }
        console.log(this.model.review);
    }

}
