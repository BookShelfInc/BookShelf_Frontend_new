export class Upvote {
    id: number;
    author: number;
    post: number;
    like: boolean;
}

export class UpvoteCreate {
    author: number;
    post: number;
    like: boolean;
}
