import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {setupListeners} from '@reduxjs/toolkit/dist/query'
import {userApi} from './services/user'
import {trireaApi} from './services/trirea'
import {triggerApi} from './services/trigger'
import {reactionApi} from './services/reaction'
import {serviceApi} from './services/service'
import userSlice from './features/userSlice'
import {api} from './services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['navigations', api.reducerPath],
  manuelPersist: true,
}

const reducers = combineReducers({
  user: userSlice,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(userApi.middleware)
      .concat(trireaApi.middleware)
      .concat(triggerApi.middleware)
      .concat(reactionApi.middleware)
      .concat(serviceApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
