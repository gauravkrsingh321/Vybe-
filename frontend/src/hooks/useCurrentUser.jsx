import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice.js'

function useCurrentUser() {
  const dispatch = useDispatch();
  const {storyData} = useSelector(state=>state.story);

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
  },[dispatch,storyData])
}

export default useCurrentUser