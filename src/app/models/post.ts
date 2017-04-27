import { User } from './user';
import { Comment } from './comment';

export class Post{
    id: number;
    title: string;
    content: string;
    publish_date: string;
    author: User;
    comments: Comment[];
}

export class PostCreate{
    title: string;
    content: string;
    publish_date: string;
    author: User;
}