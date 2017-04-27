import { Book } from './book';

export class AuthorInfo {
    id: number;
    first_name: string;
    last_name: string;
    biography: string;
    avatar: string;
    book_set: Book[];
}