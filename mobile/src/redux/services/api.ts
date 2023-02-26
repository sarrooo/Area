import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react'
import { RootState, store } from '../store'
import { logout, refreshToken } from '../features/userSlice'
import { RefreshResponse } from '../../types/Login'
import Config from "react-native-config"

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        credentials: 'include',
      },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      store.dispatch(
        refreshToken((refreshResult.data as RefreshResponse).token)
      )
      result = await baseQuery(args, api, extraOptions)
    } else {
      store.dispatch(logout())
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({}),
})
