import { createSlice } from '@reduxjs/toolkit'
import { User } from '@/types/User'
import { RootState } from '@/redux/store'
import { userApi } from '@/redux/services/user'

interface UserState {
  user: User | null
  isLogged: boolean
}

const initialState: UserState = {
  user: null,
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.login.matchFulfilled, (state) => {
      state.isLogged = true
    })
    builder.addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
      state.isLogged = false
    })
  },
})

export const { logoutUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
