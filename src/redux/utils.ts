import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
}) as any;
