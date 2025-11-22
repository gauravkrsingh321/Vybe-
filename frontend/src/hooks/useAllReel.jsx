import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReelData } from '../redux/reelSlice.js'

function useAllReel() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchReels = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reel/allReels`,{withCredentials:true});
        dispatch(setReelData(res.data.allReels))
      } catch (error) {
        console.log(error)
      }
    }
    fetchReels();
  },[dispatch,userData])
}

export default useAllReel