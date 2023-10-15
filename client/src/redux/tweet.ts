import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseQuery } from "./utils";

// Define a service using a base URL and expected endpoints
export const TweetApi = createApi({
  reducerPath: "TweetApi",
  baseQuery: BaseQuery,
  endpoints: (builder) => ({
    // create tweet
    tweet: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `tweets/create`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useTweetMutation } = TweetApi;
