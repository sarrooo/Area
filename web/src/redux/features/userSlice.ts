import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { User } from '@/types/User'
import { RootState } from '@/redux/store'
import { userApi } from '@/redux/services/user'
import { Trirea, TrireaReactionInput, TrireaTriggerInput } from '@/types/Trirea'
// import {
//   setTrirea,
//   setTrireaName,
//   setTriggerId,
//   setReactionId,
//   addTriggerInput,
//   addReactionInput,
//   clearTrirea,
//   clearTriggerInputs,
//   clearReactionInputs,
//   removeTriggerInput,
//   removeReactionInput,
// } from '@/redux/features/trireaReducers'

export interface UserState {
  user: User | null
  accessToken: string | null
  isLogged: boolean
  trirea: Trirea
}

export const emptyTrirea: Trirea = {
  name: '',
  enabled: true,
  triggerId: -1,
  reactionId: -1,
  triggerInputs: [],
  reactionInputs: [],
}

export const initialState: UserState = {
  user: null,
  accessToken: null,
  isLogged: false,
  trirea: {
    name: '',
    enabled: true,
    triggerId: -1,
    reactionId: -1,
    triggerInputs: [],
    reactionInputs: [],
  },
}

const clearTrireaReducer = (state: UserState) => {
  state.trirea = emptyTrirea
}

const setTrireaReducer = (
  state: UserState,
  action: PayloadAction<{ trirea: Trirea }>
) => {
  state.trirea = action.payload.trirea
}

const setTrireaNameReducer = (
  state: UserState,
  action: PayloadAction<{ name: string }>
) => {
  state.trirea.name = action.payload.name
}

const setTriggerIdReducer = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.triggerId = action.payload.id
}

const setReactionIdReducer = (
  state: UserState,
  action: PayloadAction<{ id: number }>
) => {
  state.trirea.reactionId = action.payload.id
}

const addTriggerInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaTriggerInput }>
) => {
  state.trirea.triggerInputs.push(action.payload.triggerInput)
}

const addReactionInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInput: TrireaReactionInput }>
) => {
  state.trirea.reactionInputs.push(action.payload.triggerInput)
}

const clearTriggerInputsReducer = (state: UserState) => {
  state.trirea.triggerInputs = []
}

const clearReactionInputsReducer = (state: UserState) => {
  state.trirea.reactionInputs = []
}

const removeTriggerInputReducer = (
  state: UserState,
  action: PayloadAction<{ triggerInputId: number }>
) => {
  state.trirea.triggerInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.triggerInputId
  })
}

const removeReactionInputReducer = (
  state: UserState,
  action: PayloadAction<{ reactionInputId: number }>
) => {
  state.trirea.reactionInputs.filter((trirea) => {
    return trirea.trireaId !== action.payload.reactionInputId
  })
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
    setTrirea: setTrireaReducer,
    setTrireaName: setTrireaNameReducer,
    setTriggerId: setTriggerIdReducer,
    setReactionId: setReactionIdReducer,
    addTriggerInput: addTriggerInputReducer,
    addReactionInput: addReactionInputReducer,
    clearTrirea: clearTrireaReducer,
    clearTriggerInputs: clearTriggerInputsReducer,
    clearReactionInputs: clearReactionInputsReducer,
    removeTriggerInput: removeTriggerInputReducer,
    removeReactionInput: removeReactionInputReducer,
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
  setTrirea,
  clearTrirea,
  setTrireaName,
  setTriggerId,
  setReactionId,
  addTriggerInput,
  addReactionInput,
  clearTriggerInputs,
  clearReactionInputs,
  removeTriggerInput,
  removeReactionInput,
} = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
