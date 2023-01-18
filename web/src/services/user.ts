import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '@/types/User'

interface LoginResponse {
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API_BASE_URL }),
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
