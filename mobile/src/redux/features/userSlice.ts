import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { User } from '../../types/User'
import { RootState } from '../store'
import { userApi } from '../services/user'
import { Trirea } from '../../types/Trirea'
import { Service } from '../../types/Service'

export interface UserState {
  user: User | null
  accessToken: string | null
  isLogged: boolean
  trirea: Trirea
  trireas?: Trirea[]
  services?: Service[]
}

export const emptyTrirea: Trirea = {
  name: '',
  enabled: true,
  triggerId: 1,
  reactionId: 1,
  triggerInputs: [],
  reactionInputs: [],
}

export const initialState: UserState = {
  user: null,
  accessToken: null,
  isLogged: false,
  trireas: undefined,
  services: undefined,
  trirea: {
    name: '',
    enabled: true,
    triggerId: 1,
    reactionId: 1,
    triggerInputs: [],
    reactionInputs: [],
  },
}

const loginReducer = (
  state: UserState,
  action: PayloadAction<{ token: string }>
) => {
  const decoded = jwtDecode<User>(action.payload.token)
  state.user = decoded
  state.accessToken = action.payload.token
  state.isLogged = true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: loginReducer,
    logout: () => {
      return initialState
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        loginReducer(state, action)
      })
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, action) => {
          loginReducer(state, action)
        }
      )
      .addMatcher(userApi.endpoints.logout.matchFulfilled, () => {
        return initialState
      })
      .addMatcher(userApi.endpoints.logout.matchRejected, () => {
        return initialState
      })
  },
})

export const {
  login,
  logout,
  refreshToken,
} = userSlice.actions

export const selectIsLogged = (state: RootState) => state.user.isLogged;
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
