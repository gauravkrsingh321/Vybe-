import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice.js'
import { setCurrentUserStory } from '../redux/storySlice.js';

function useFollowingList() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/followingList`,{withCredentials:true});
        dispatch(setFollowing(res?.data?.followingList))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    fetchUser();
  },[dispatch])
}

export default useFollowingList