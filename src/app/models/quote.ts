import { User } from './user';
import { Book } from './book';

export class Quote {
    user: User;
    book: Book;
    quote: string;
}

export class QuoteCreate {
    quote: string;
    user: number;
    book: number;
}