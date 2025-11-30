import React, { useRef } from 'react'

const ReelCard = ({reel}) => {
  const videoRef = useRef()
  return (
    <div className='w-full  h-screen flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative'>
      <video ref={videoRef} muted autoPlay loop src={reel?.media} className='w-full max-h-full'/>
    </div>
  )
}

export default ReelCard