import React from 'react'
import {GoHomeFill} from "react-icons/go"
import {FiSearch} from "react-icons/fi"
import {FiPlusSquare} from "react-icons/fi"
import {RxVideo} from "react-icons/rx"
import dp from "../assets/blank_dp.png"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const BottomNav = () => {
  const navigate = useNavigate();
  const {userData} = useSelector(state=>state.user);
  return (
    <div className='w-[90%] lg:w-[40%] h-20 bg-black flex justify-around items-center fixed bottom-5 shadow-2xl shadow-[#000000] rounded-full'>
      <div  onClick={()=>navigate(`/`)}><GoHomeFill className='w-[25px] cursor-pointer text-white h-[25px]'/></div>
      <div><FiSearch className='w-[25px] cursor-pointer text-white h-[25px]'/></div>
      <div onClick={()=>navigate(`/upload`)}><FiPlusSquare className='w-[25px] cursor-pointer text-white h-[25px]'/></div>
      <div><RxVideo className='w-7 cursor-pointer text-white h-7'/></div>
      <div className='w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.username}`)}>
                <img className='w-full object-cover' src={userData?.profilePic || dp} alt="dp" />
              </div>
    </div>
  )
}

export default BottomNav