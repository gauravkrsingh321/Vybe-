import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import reelReducer from './reelSlice'
import storyReducer from './storySlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    post:postReducer,
    story:storyReducer,
    reel:reelReducer
  },
})