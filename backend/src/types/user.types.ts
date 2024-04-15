export interface LoginRequest {
    username: string;
    password: string;
};

export interface CreateUser {
    username: string;
    password: string;
};

export interface OnlineUser {
    user_id: string;
    username: string;
};