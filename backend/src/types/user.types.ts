export interface LoginRequest {
    username: string;
    password: string;
};

export interface CreateUser {
    username: string;
    password: string;
};

export interface UserSocketInfo {
    user_id: string;
    username: string;
};