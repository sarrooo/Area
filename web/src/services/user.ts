import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse } from '@/types/Login'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = userApi
