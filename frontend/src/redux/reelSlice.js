import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reelData:[],
}

export const reelSlice = createSlice({
  name: 'reel',
  initialState,
  reducers: {
    setReelData: (state,action) => {
      state.reelData = action.payload
    }
  },
})

export const {setReelData} = reelSlice.actions

export default reelSlice.reducer