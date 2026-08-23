import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser:null,
  messages:[],
  prevChatUsers:[]
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setSelectedUser: (state,action) => {
      state.selectedUser = action.payload
    },
    setMessages: (state,action) => {
      state.messages = action.payload
    },
    setPrevChatUsers: (state,action) => {
      state.prevChatUsers = action.payload
    }
  },
})

export const {setSelectedUser,setMessages,setPrevChatUsers} = messageSlice.actions

export default messageSlice.reducer