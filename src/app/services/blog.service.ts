import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Post, PostCreate } from '../models/post';
import { CommentCreate } from '../models/comment';

@Injectable()
export class BlogService {

    constructor(private http: Http) { }

    getAllPosts(): Observable<Post[]> {
        let url = 'http://fit.kbtu.kz:8080/blog/posts/all/';
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
        let url = 'http://fit.kbtu.kz:8080/blog/post/comments/create/';
        this.http.post(url, JSON.stringify(comment), this.jwt()).subscribe();
    }

    addPost(post: PostCreate) {
        let url = 'http://fit.kbtu.kz:8080/blog/post/create/';
        this.http.post(url, JSON.stringify(post), this.jwt()).subscribe();
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser && currentUser.token) {
            console.log(currentUser.token);
            let headers = new Headers({ 'Content-Type': 'application/json',
                                        'Authorization': 'JWT ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
