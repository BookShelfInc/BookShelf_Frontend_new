import { User } from './user';
import { Book } from './book';

export class Bazaar {
    id: number;
    book: Book;
    user: User;
    price: number;
    publish_date: string;
}

export class BazaarCreate {
    book: number;
    user: number;
    price: number;
    publish_date: string;
}