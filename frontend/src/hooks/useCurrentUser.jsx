import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice.js'

function useCurrentUser() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/current`,{withCredentials:true});
        dispatch(setUserData(res.data.user))
        dispatch(setFollowing(res.data.user.following))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    fetchUser();
  },[dispatch])
}

export default useCurrentUser