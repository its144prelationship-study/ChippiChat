export interface LoginRequest {
    username: string;
    password: string;
}

export interface CreateUser {
    username: string;
    password: string;
    profile_picture: string;
}

export interface UpdateUser {
    username: string;
    profile_picture: string;
}
