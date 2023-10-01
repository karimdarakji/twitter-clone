import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const BaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
}) as any;
