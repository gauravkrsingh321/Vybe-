import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import postReducer from './postSlice'
import reelReducer from './reelSlice'
import storyReducer from './storySlice'
import messageReducer from './messageSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    post:postReducer,
    story:storyReducer,
    reel:reelReducer,
    message:messageReducer
  },
})