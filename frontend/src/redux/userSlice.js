import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData:null,
   loading: true, // ✅ start true until auth check completes
   suggestedUsers: null,
   profileData:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state,action) => {
      state.userData = action.payload
      state.loading = false;
    },
    setSuggestedUsers: (state,action) => {
      state.suggestedUsers = action.payload
    },
    setProfileData: (state,action) => {
      state.profileData = action.payload
    }
  },
})

export const {setUserData,setSuggestedUsers,setProfileData } = userSlice.actions

export default userSlice.reducer