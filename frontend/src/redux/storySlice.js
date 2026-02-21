import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  storyData:[],
  storyList:[]
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStoryData: (state,action) => {
      state.storyData = action.payload
    },
    setStoryList: (state,action) => {
      state.storyList = action.payload
    }
  },
})

export const {setStoryData,setStoryList} = storySlice.actions

export default storySlice.reducer