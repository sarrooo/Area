import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/services/user'
import userSlice from '@/features/userSlice'
import { api } from '@/services/api'

const reducers = combineReducers({
  user: userSlice,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
