import React, { useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const VideoPlayer = ({media}) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true);
  const handleClick = () => {
      if(isPlaying) {
        videoTag.current.pause()
        setIsPlaying(false)
      }
      else {
        videoTag.current.play();
        setIsPlaying(true)
      }
  }
  return (
    <div className='h-full relative overflow-hidden cursor-pointer max-w-full rounded-2xl'>
      <video src={media} autoPlay ref={videoTag} muted={mute} loop className='h-full cursor-pointer w-full object-cover rounded-2xl' onClick={handleClick}></video>

      <div className='absolute bottom-2.5 right-2.5' onClick={()=>setMute(prev=>!prev)}>
        {!mute ? <FiVolume2 className='w-5 h-5 text-white font-semibold'/>:<FiVolumeX className='w-5 h-5 text-white font-semibold'/>}
      </div>
    </div>
  )
}

export default VideoPlayer