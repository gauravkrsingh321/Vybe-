import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router'

const Reels = () => {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center'
    >
       <div className="w-full h-20 flex items-center gap-5 px-5 fixed top-2.5 left-2.5">
              <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/`)}/>
              <h1 className="text-white text-[20px] font-semibold">Reels</h1>
            </div>
    </div>
  )
}

export default Reels