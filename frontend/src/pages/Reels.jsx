import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import ReelCard from '../components/ReelCard';

const Reels = () => {
  const navigate = useNavigate();
  const { reelData } = useSelector((state) => state.reel);
  return (
    <div className='w-screen h-screen bg-black overflow-hidden flex justify-center items-center'
    >
       <div className="w-full h-20 flex items-center gap-5 px-5 fixed top-2.5 left-2.5 z-50">
              <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/`)}/>
              <h1 className="text-white text-[20px] font-semibold">Reels</h1>
            </div>
            <div className='h-screen  overflow-y-scroll snap-y snap-mandatory scrollbar-hide'>
              {
                reelData.map((reel,index)=>(
                  <div key={index} className='h-screen snap-start'>
                    <ReelCard reel={reel} key={index}/>
                  </div>
                ))
              }
            </div>
    </div>
  )
}

export default Reels