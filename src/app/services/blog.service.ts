import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post, PostCreate } from '../models/post';
import { CommentCreate, Comment } from '../models/comment';
import { Upvote, UpvoteCreate } from '../models/upvote';

@Injectable()
export class BlogService {

    constructor(private http: Http) { }

    getAllPosts(): Observable<Post[]> {
        let url = 'http://fit.kbtu.kz:8080/blog/post/all/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }


    //TODO: Set button
    deletePost(id: number) {    
        let url = 'http://fit.kbtu.kz:8080/blog/post/delete/' + id.toString() + '/';
        return this.http.post(url, this.jwt()).map((res: Response) => res);
    }

    //TODO: Set button
    deleteComment(id: number) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/comment/delete/' + id.toString() + '/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(url, this.jwt()).subscribe();
    }

    getUserPosts(id: number): Observable<Post[]> {
        let url = 'http://fit.kbtu.kz:8080/blog/post/user/' + id.toString() + '/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }
    
    getPost(id: number): Observable<Post> {
        let url = 'http://fit.kbtu.kz:8080/blog/post/' + id.toString() + '/';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((res: Response) => res.json());
    }

    postComment(comment: CommentCreate) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/comment/create/';
        this.http.post(url, JSON.stringify(comment), this.jwt()).subscribe();
    }

    addPost(post: PostCreate) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/create/';
        this.http.post(url, JSON.stringify(post), this.jwt()).subscribe();
    }

    addUpvote(upvote: UpvoteCreate) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/upvote/create/';
        return this.http.post(url, JSON.stringify(upvote), this.jwt()).map((res: Response) => res.json());
    }

    isLiked(id: number) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/upvote/isliked/' + id.toString() + '/';
        return this.http.get(url, this.jwt()).map((res: Response) => res.status);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log(currentUser.token);
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + currentUser.token
            });
            console.log(headers);
            return new RequestOptions({ headers: headers });
        }
    }
}
