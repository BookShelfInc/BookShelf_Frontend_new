import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { BlogService } from '../../services/blog.service';

import { Post } from '../../models/post';
import { Comment, CommentCreate } from '../../models/comment';
import { Upvote, UpvoteCreate } from '../../models/upvote';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public post: Post;
  can = false;
  model: any = {}
  written = false;
  liked = false;
  canLike = true;

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
                        //
                        this.checkIsLiked();
                    },
                    error => {
                        console.log(error);
                    }
            );
  }

  addUpvote() {
      let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log('here');
            const upvote: UpvoteCreate = {
                author: currentUser.user.id,
                post: this.post.id,
                like: true
            };
            const upvotePush: Upvote = {
                id: 1,
                author: currentUser.user.id,
                post: this.post.id,
                like: true
            };
            console.log(upvote);
            this.blogService.addUpvote(upvote).subscribe(
                data => {
                    this.liked = true;
                    console.log(data);
                    this.post.upvotes.push(upvotePush);
                },
                error => {
                    console.log(error);
                }
            );
        }
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
            const commentPush: Comment = {
                id: 1,
                content: this.model.comment,
                publish_date: new Date().toDateString(),
                author: currentUser.user.id,
                post: this.post.id
            };
            console.log(comment);
            console.log(this.blogService.postComment(comment));
            this.written = true;
            this.post.comments.push(commentPush);
            this.model.comment = '';
        }
        console.log(this.model.review);
        
    }

    checkIsLiked() {
        this.blogService.isLiked(this.post.id).subscribe(
            data => {
                this.canLike = false;
                console.log('checked ' + data);
            }
        );
    }
}
