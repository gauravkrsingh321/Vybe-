import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import dp from "../assets/blank_dp.png";

const ReceiverMessage = ({message}) => {
  const {userData} = useSelector(state=>state.user);
  const {selectedUser} = useSelector((state) => state.message);
  const scroll = useRef()
    
    useEffect(()=>{
      scroll.current.scrollIntoView({behavior:"smooth"})
    },[message.message,message.image])
  return (
    <div ref={scroll} className='w-fit max-w-[60%] bg-blue-800 rounded-t-2xl rounded-br-2xl rounded-bl-0 px-2.5 py-2.5 relative left-0 flex flex-col gap-2.5'>
      {message?.image && <img src={message.image} className='h-[200px] object-cover rounded-2xl'/>}
      {message?.message && <div className='text-[18px] text-white wrap-break-word'>{message.message}</div>}
      <div className='w-7.5 h-7.5 rounded-full cursor-pointer overflow-hidden absolute left-[-25px] -bottom-10'>
        <img src={selectedUser?.user?.profilePic || dp} className='object-cover w-full'/>
      </div>
    </div>
  )
}

export default ReceiverMessage