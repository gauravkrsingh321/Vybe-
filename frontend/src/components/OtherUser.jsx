import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import dp from "../assets/blank_dp.png";

const OtherUser = ({user}) => {
    const {suggestedUsers} = useSelector(state=>state.user);
    const navigate = useNavigate()
  return (
    <div className='w-full h-20 justify-between border-b-2 border-gray-800 flex items-center'>
      <div className='flex items-center gap-2.5'>
                <div className='w-[50px]  h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${user.username}`)}>
                <img className='w-full object-cover' src={user.profilePic || dp} alt="dp"/>
              </div>
              {
                suggestedUsers && <div>
                <div className='text-[18px] text-white font-semibold'>{user.username}</div>
                <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
              </div>
              }
      </div>
      <button className='px-2.5 w-[100px] cursor-pointer hover:bg-gray-500 py-[5px] h-10 bg-white rounded-2xl'>Follow</button>
    </div>
  )
}

export default OtherUser