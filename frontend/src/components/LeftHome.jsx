import React from 'react'
import logo1 from "../assets/logo2.png"
import {FaRegHeart} from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/blank_dp.png"
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import OtherUser from './OtherUser'
import { useNavigate } from 'react-router'

const LeftHome = () => {
  const {userData,suggestedUsers} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`,{},{withCredentials:true})
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='w-[25%] bg-black hidden lg:block min-h-screen border-r-2 border-gray-900'>
      <div className='flex justify-between w-full h-[100px] p-5 items-center'>
        <img src={logo1} alt="logo" className='w-20' />
       <div><FaRegHeart className="text-white w-[25px] h-[25px]"/></div>
      </div>
      <div className='flex w-full justify-between px-2.5 items-center gap-2.5 border-b-2 border-b-gray-900 py-2.5'>
        <div>
          <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.username}`)}>
          <img className='w-full object-cover' src={userData.profilePic || dp} alt="dp" />
        </div>
        {
          userData && <div>
          <div className='text-[18px] text-white font-semibold'>{userData.username}</div>
          <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
        </div>
        }
        </div>
        <div onClick={logoutHandler} className='text-blue-500 cursor-pointer font-semibold'>
          Log Out
        </div>
      </div>

      <div className='w-full flex flex-col gap-5 p-5'>
        <h1 className='text-white text-[19px]'>Suggested Users</h1>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>{
          return <OtherUser key={index} user={user}/>
        })}
      </div>
    </div>
  )
}

export default LeftHome