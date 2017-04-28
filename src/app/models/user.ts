export class User{
    id: number;
    is_manager: boolean;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
}

export class UserCreate{
    is_manager: boolean;
    username: string;
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
}