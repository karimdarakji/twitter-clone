import {
  IActivateUser,
  ICreateUser,
  ILogin,
  IRefreshTokenApiReturn,
} from "../types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "../utils";

// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    // first sign up modal api
    createUser: builder.mutation<any, ICreateUser>({
      query: (data) => ({
        url: `auth/create`,
        method: "POST",
        body: data,
      }),
    }),
    getUserEmail: builder.mutation<string, string>({
      query: (email) => ({
        url: `auth/user/email`,
        method: "POST",
        body: { email },
      }),
    }),
    // activate user
    activateUser: builder.mutation<any, IActivateUser>({
      query: (data) => ({
        url: `auth/activate`,
        method: "POST",
        body: data,
      }),
    }),
    // Login
    Login: builder.mutation<any, ILogin>({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    // Refresh Token
    RefreshToken: builder.mutation<IRefreshTokenApiReturn, void>({
      query: () => ({
        url: `auth/refresh`,
        method: "POST",
      }),
    }),
    // Logout
    Logout: builder.mutation<any, void>({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateUserMutation,
  useActivateUserMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetUserEmailMutation,
} = AuthApi;
