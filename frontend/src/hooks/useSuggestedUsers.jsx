import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers } from '../redux/userSlice.js'

function useSuggestedUsers() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/suggested`,{withCredentials:true});
        dispatch(setSuggestedUsers(res.data.users))
      } catch (error) {
        console.log(error)
        dispatch(setSuggestedUsers(null))
      }
    }
    fetchUser();
  },[userData,dispatch])
}

export default useSuggestedUsers