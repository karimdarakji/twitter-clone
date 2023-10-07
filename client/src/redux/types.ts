export interface ICreateUser {
  name: string;
  email: string;
  birthDate: string;
  username: string;
  password: string;
}

export interface IActivateUser {
  user_id?: string;
  token?: string;
}

export interface ILogin {
  emailorUsername: string;
  password: string;
}

export interface IRefreshTokenApiReturn {
  accessToken: string;
}
