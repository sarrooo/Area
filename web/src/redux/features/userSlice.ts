import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { User } from '@/types/User'
import { RootState } from '@/redux/store'
import { userApi } from '@/redux/services/user'
import { Trirea } from '@/types/Trirea'
import { Service } from '@/types/Service'
// import {
//   setTrireaReducer,
//   setTrireaNameReducer,
//   setTriggerIdReducer,
//   setReactionIdReducer,
//   addTriggerInputReducer,
//   addReactionInputReducer,
//   clearTrireaReducer,
//   clearTriggerInputsReducer,
//   clearReactionInputsReducer,
//   removeTriggerInputReducer,
//   removeReactionInputReducer,
// } from '@/redux/features/trireaReducers'

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
    // setTrirea: setTrireaReducer,
    // setTrireaName: setTrireaNameReducer,
    // setTriggerId: setTriggerIdReducer,
    // setReactionId: setReactionIdReducer,
    // addTriggerInput: addTriggerInputReducer,
    // addReactionInput: addReactionInputReducer,
    // clearTrirea: clearTrireaReducer,
    // clearTriggerInputs: clearTriggerInputsReducer,
    // clearReactionInputs: clearReactionInputsReducer,
    // removeTriggerInput: removeTriggerInputReducer,
    // removeReactionInput: removeReactionInputReducer,
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
  // setTrirea,
  // clearTrirea,
  // setTrireaName,
  // setTriggerId,
  // setReactionId,
  // addTriggerInput,
  // addReactionInput,
  // clearTriggerInputs,
  // clearReactionInputs,
  // removeTriggerInput,
  // removeReactionInput,
} = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
