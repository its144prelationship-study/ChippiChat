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

export type groupMembers = {
  id: string;
  name: string;
  profile_picture:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14";
};

export type chatGroupMessages = {
  id: string;
  message: string;
  timestamp: Date;
};

export type userInfo = {
  username: string;
  profile_picture: string;
  user_id: string;
  socket_id?: string;
};
