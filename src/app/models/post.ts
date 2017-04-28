import { User } from './user';
import { Comment } from './comment';
import { Upvote } from './upvote';

export class Post{
    id: number;
    title: string;
    content: string;
    publish_date: string;
    author: User;
    comments: Comment[];
    upvotes: Upvote[];
}

export class PostCreate{
    title: string;
    content: string;
    publish_date: string;
    author: User;
}

export class PostIsLiked{
    id: number;
    title: string;
    content: string;
    publish_date: string;
    author: User;
    comments: number;
    upvotes: number;
    is_liked: boolean;
}