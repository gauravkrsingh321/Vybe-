import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPostData } from '../redux/postSlice.js'

function useAllPost() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/allPosts`,{withCredentials:true});
        dispatch(setPostData(res.data.allPosts))
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts();
  },[dispatch])
}

export default useAllPost