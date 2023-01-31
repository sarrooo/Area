import {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/Login'

import { api } from '@/redux/services/api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `/auth/login`,
        method: 'POST',
        body,
        providesTags: ['User'],
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<LoginResponse, void>({
      query: (body) => ({
        url: `/auth/logout`,
        method: 'POST',
        body,
        invalidatesTags: ['User'],
      }),
    }),
    refresh: build.mutation<RefreshResponse, void>({
      query: (body) => ({
        url: `/auth/refresh`,
        method: 'POST',
        body,
      }),
    }),
    getTrirea: build.query<void, void>({
      query: () => ({
        url: `/trirea`,
        method: 'GET',
      }),
    }),
    me: build.query<void, void>({
      query: (body) => ({
        url: `/user/me`,
        method: 'GET',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
  useMeQuery,
  useGetTrireaQuery,
} = userApi
