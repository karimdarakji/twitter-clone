import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const BaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
}) as any;
