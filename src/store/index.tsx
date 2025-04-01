import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './blog-slice'

export const store = configureStore({
  reducer: {
    blog: BlogReducer,
  },
})
