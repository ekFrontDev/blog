import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import BlogReducer from './blog-slice'

export const store = configureStore({
  reducer: {
    blog: BlogReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
