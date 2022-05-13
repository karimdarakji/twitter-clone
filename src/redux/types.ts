export interface IFirstSignup {
  name: string;
  email: string;
  year: number;
  day: number;
  month: number;
}

export interface ISecondSignup {
  username: string;
  email: string;
  password: string;
}

export interface IActivateUser {
  user_id?: string;
  token?: string;
}

export interface ILogin {
  username: string;
  password: string;
}
