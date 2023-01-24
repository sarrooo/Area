import {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
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
    logout: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: `/auth/logout`,
        method: 'POST',
        body,
      }),
    }),
    refresh: build.mutation<RefreshRequest, void>({
      query: (body) => ({
        url: `/auth/refresh`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = userApi
