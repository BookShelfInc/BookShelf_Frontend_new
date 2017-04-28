import { User } from './user';
import { Book } from './book';

export class WishList {
    id: number;
    user: User;
    book: Book;
    has_read: boolean;
}

export class WishListCreate {
    user: number;
    book: number;
    has_read: boolean;
}