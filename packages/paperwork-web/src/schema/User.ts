export type UserIdentifier = string;

export interface User {
  id: string;
  username: string;
  displayName: string;
}

export interface Authentication {
  accessToken: string;
  user: User;
}
