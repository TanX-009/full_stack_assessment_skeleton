import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import User from "../types/user.type";
import Home from "../types/home.type";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    findAllUsers: builder.query<User[], void>({
      query: () => "/user/find-all",
    }),
    findUsersByHome: builder.query<User[], { homeId: number }>({
      query: ({ homeId }) => `/user/find-by-home?homeId=${homeId}`,
    }),
    findHomesByUser: builder.query<Home[], { userId: number; page: number }>({
      query: ({ userId, page }) =>
        `/home/find-by-user?userId=${userId}&page=${page}`,
    }),
    updateUsers: builder.mutation<void, { homeId: number; userIds: number[] }>({
      query: (body) => ({
        url: "/home/update-users",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useFindAllUsersQuery,
  useFindUsersByHomeQuery,
  useFindHomesByUserQuery,
  useUpdateUsersMutation,
} = api;

export default api;
