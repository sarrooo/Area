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
    logoutUser: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState
    },
    loginUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLogged = true
    },
  },
})

export const { loginUser, logoutUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
