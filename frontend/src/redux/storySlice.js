import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  storyData:[],
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStoryData: (state,action) => {
      state.storyData = action.payload
    }
  },
})

export const {setStoryData} = storySlice.actions

export default storySlice.reducer