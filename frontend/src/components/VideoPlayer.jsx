import React, { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

const VideoPlayer = ({ media }) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(true); // start muted for autoplay
  const [isPlaying, setIsPlaying] = useState(false); // start paused

  // autoplay when component mounts or media changes
  useEffect(() => {
    if (videoTag.current) {
      videoTag.current.muted = mute;
      const playPromise = videoTag.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [media, mute]);

  const handleClick = () => {
    if (!videoTag.current) return;

    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="h-full  w-full relative overflow-hidden cursor-pointer max-w-full rounded-2xl">
      <video
        src={media}
        ref={videoTag}
        muted={mute}
        loop
        className="h-full w-full object-cover rounded-2xl"
        onClick={handleClick}
      ></video>

      <div
        className="absolute bottom-2.5 right-2.5"
        onClick={(e) => {
          e.stopPropagation(); // prevent pause/play on video click
          setMute((prev) => !prev);
        }}
      >
        {!mute ? (
          <FiVolume2 className="w-5 h-5 text-white font-semibold" />
        ) : (
          <FiVolumeX className="w-5 h-5 text-white font-semibold" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
