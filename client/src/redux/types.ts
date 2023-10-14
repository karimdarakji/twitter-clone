export interface ICreateUser {
  name: string;
  email: string;
  birthDate: string;
  username: string;
  password: string;
}

export interface IActivateUser {
  userId: string;
  token: string;
}

export interface ILogin {
  emailorUsername: string;
  password: string;
}

export interface IRefreshTokenApiReturn {
  accessToken: string;
}

export interface IForgotPassword {
  emailorUsername: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}
