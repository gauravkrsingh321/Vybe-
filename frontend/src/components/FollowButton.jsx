import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggoleFollow } from '../redux/userSlice';

const FollowButton = ({targetUserId,tailwind,onFollowChange}) => {
  const {following} = useSelector(state=>state.user);
  const isFollowing = following.includes(targetUserId);
  const dispatch = useDispatch()
  const handleFollow = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/follow/${targetUserId}`,{withCredentials:true})
      if(onFollowChange) {
        onFollowChange()
      }
      dispatch(toggoleFollow(targetUserId))
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleFollow} className={tailwind}>
      {isFollowing ? "Following":"Follow"}
    </button>
  )
}

export default FollowButton