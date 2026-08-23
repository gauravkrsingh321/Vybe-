import React from 'react'
import logo1 from "../assets/logo2.png"
import { FaRegHeart } from 'react-icons/fa6'
import {BiMessageAltDetail} from "react-icons/bi"
import BottomNav from './BottomNav'
import { useSelector } from 'react-redux'
import Post from './Post'
import StoryDp from './StoryDp'
import { useNavigate } from 'react-router'

const Feed = () => {
  const navigate = useNavigate()
    const {postData} = useSelector(state=>state.post);
    const {userData} = useSelector(state=>state.user);
    const {storyList,currentUserStory} = useSelector(state=>state.story);
    
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-screen lg:h-screen relative lg:overflow-y-auto'>
      <div className='flex justify-between lg:hidden w-full h-[100px] p-5 items-center'>
              <img src={logo1} alt="logo" className='w-20' />
             <div className='flex items-center gap-2.5'><FaRegHeart className="text-white w-[25px] h-[25px]"/><BiMessageAltDetail className="text-white cursor-pointer w-[25px] h-[25px]" onClick={()=>navigate("/messages")} /></div>
            </div>

            <div className='flex w-full overflow-auto gap-2.5 items-center p-5'>
              <StoryDp username={"Your Story"} ProfilePic={userData?.profilePic} story={currentUserStory}/>

              {
                storyList?.map((story)=>(
                  <StoryDp key={story._id} username={story?.author?.username} ProfilePic={story?.author?.profilePic} story={story}/>
                ))
              }
            </div>

            <div className='w-full bg-white pb-[120px] min-h-screen flex flex-col items-center gap-10 p-2.5 pt-10 rounded-t-[60px] relative'>
              <BottomNav/>

            {
              postData?.map((post)=>{
               return <Post post={post} key={post._id}/>
              })
            }  
            </div>
    </div>
  )
}

export default Feed 