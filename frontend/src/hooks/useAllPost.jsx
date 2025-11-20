import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice.js'

function useAllPost() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
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
  },[dispatch,userData])
}

export default useAllPost