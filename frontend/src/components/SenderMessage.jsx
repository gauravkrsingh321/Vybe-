import React from 'react'
import dp from "../assets/blank_dp.png";
import { useSelector } from 'react-redux';

const SenderMessage = ({message}) => {
  const {userData} = useSelector(state=>state.user);
  return (
    <div className='w-fit max-w-[60%] bg-linear-to-br from-[#9500ff] to-[#ff0095] rounded-t-2xl rounded-bl-2xl rounded-br-0 px-2.5 py-2.5 relative ml-auto right-0 flex flex-col gap-2.5'>
      {message?.image && <img src={message.image} className='h-[200px] object-cover rounded-2xl'/>}
      {message?.message && <div className='text-[18px] text-white wrap-break-word'>{message.message}</div>}
      <div className='w-7.5 h-7.5 rounded-full cursor-pointer overflow-hidden absolute right-[-25px] -bottom-10'>
        <img src={userData?.profilePic || dp} className='object-cover w-full'/>
      </div>
    </div>
  )
}

export default SenderMessage