import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/User'
import { RootState } from '@/app/store'

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
    logout: (state) => {
      state = initialState
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLogged = true
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
