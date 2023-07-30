import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./utils";

// Define a service using a base URL and expected endpoints
export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    // get user
    user: builder.query<IUser, void>({
      query: () => `users/user`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserQuery } = UserApi;
