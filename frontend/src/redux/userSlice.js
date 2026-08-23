import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userData:null,
   loading: true, // ✅ start true until auth check completes
   suggestedUsers: null,
   profileData:null,
   following:[],
   searchData:[]
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
    },
    setSearchData: (state,action) => {
      state.searchData = action.payload;
    },
    setFollowing: (state,action) => {
      state.following = action.payload;
    },
    toggleFollow: (state,action) => {
      const targetUserId = action.payload;
      if(state.following.includes(targetUserId)) {
        state.following = state.following.filter(id=>id!==targetUserId);
      }
      else {
        state.following.push(targetUserId);
      }
    }
  },
})

export const {setUserData,setSuggestedUsers,setProfileData,setSearchData,setFollowing,toggleFollow } = userSlice.actions

export default userSlice.reducer