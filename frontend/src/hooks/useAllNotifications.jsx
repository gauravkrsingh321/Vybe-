import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationData } from '../redux/userSlice.js'

function useAllNotifications() {
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  useEffect(()=>{
    const fetchNotifications = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getAllNotifications`,{withCredentials:true});
        dispatch(setNotificationData(res.data.notifications))
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotifications();
  },[dispatch,userData])
}

export default useAllNotifications