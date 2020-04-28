export type UserIdentifier = string | number;

export interface User {
  id: string | number;
  username: string;
  displayName: string;
}

export interface Authentication {
  accessToken: string;
  user: User;
}
