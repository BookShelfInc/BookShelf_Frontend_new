import { User } from './user';

export class Comment{
    id: number;
    content: string;
    publish_date: string;
    author: User;
    post: number;
}

export class CommentCreate{
    content: string;
    publish_date: string;
    author: User;
    post: number;
}