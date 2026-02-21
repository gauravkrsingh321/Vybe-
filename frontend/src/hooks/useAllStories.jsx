import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryList } from '../redux/storySlice.js';

function useAllStories() {
  const dispatch = useDispatch();
  const {userData} = useSelector(state=>state.user);

  useEffect(()=>{
    const fetchAllStories = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/story/allStories`,{withCredentials:true});
        dispatch(setStoryList(res.data.stories))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllStories();
  },[dispatch,userData])
}

export default useAllStories