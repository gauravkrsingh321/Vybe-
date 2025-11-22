import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import dp from "../assets/blank_dp.png";
import FollowButton from './FollowButton';
import { setProfileData } from "../redux/userSlice";


const OtherUser = ({user}) => {
    const {suggestedUsers} = useSelector(state=>state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div className='w-full h-20 justify-between border-b-2 border-gray-800 flex items-center'>
      <div className='flex items-center gap-2.5'>
                <div className='w-[50px]  h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={() => {
  dispatch(setProfileData(null));
  navigate(`/profile/${user.username}`);
}}
>
                <img className='w-full object-cover' src={user.profilePic || dp} alt="dp"/>
              </div>
              {
                suggestedUsers && <div>
                <div className='text-[18px] text-white font-semibold'>{user.username}</div>
                <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
              </div>
              }
      </div>
      <FollowButton tailwind={'px-2.5 w-[100px]  md:w-[60px] lg:w-[100px] md:text-[0.8rem] lg:text-[1rem] cursor-pointer hover:bg-gray-500 py-[5px] h-10 bg-white rounded-2xl cursor-pointer'} targetUserId={user._id}/>
    </div>
  )
}

export default OtherUser