import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./auth/authApi";
import { UserApi } from "./user";
import authSlice from "./auth/authSlice";
import { TweetApi } from "./tweet";
// ...

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [TweetApi.reducerPath]: TweetApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      AuthApi.middleware,
      UserApi.middleware,
      TweetApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
