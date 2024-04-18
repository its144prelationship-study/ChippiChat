export interface RegisterSchema {
  username: string;
  password: string;
  profile_picture: string;
}

export interface UpdateUserSchema {
  username: string;
  profile_picture: string;
}

export type profilePicture =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;
