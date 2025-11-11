import React from 'react'
import logo1 from "../assets/logo2.png"
import { FaRegHeart } from 'react-icons/fa6'
import StoryCard from './StoryCard'
import BottomNav from './BottomNav'

const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto'>
      <div className='flex justify-between lg:hidden w-full h-[100px] p-5 items-center'>
              <img src={logo1} alt="logo" className='w-20' />
             <div><FaRegHeart className="text-white w-[25px] h-[25px]"/></div>
            </div>

            <div className='flex w-full overflow-auto gap-2.5 items-center p-5'>
              <StoryCard username={"adnjkefj"}/>
              <StoryCard username={"adnjkefj"}/>
              <StoryCard username={"adnjkefj"}/>
              <StoryCard username={"adnklednenklesjdnjkefj"}/>
              <StoryCard username={"adnjkefj"}/>
              <StoryCard username={"adnjkefj"}/>
              <StoryCard username={"adnjkefj"}/>
            </div>

            <div className='w-full bg-white pb-[120px] min-h-screen flex flex-col items-center gap-5 p-2.5 pt-10 rounded-t-[60px] relative'>
              <BottomNav/>
            </div>
    </div>
  )
}

export default Feed