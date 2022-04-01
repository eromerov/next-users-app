interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
} 

export type User = IUser;

