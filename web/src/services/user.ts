import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/types/User'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `process.env.API_BASE_URL/` }),
  endpoints: (builder) => ({
    login: builder.mutation<User, string>({
      query: (name) => `login/${name}`,
    }),
  }),
})
