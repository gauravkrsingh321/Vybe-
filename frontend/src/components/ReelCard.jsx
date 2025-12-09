import React, { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

const ReelCard = ({ reel }) => {
  const videoRef = useRef();
  const [mute, setMute] = useState(true); // start muted for autoplay
  const [isPlaying, setIsPlaying] = useState(false); // start paused

  // autoplay when component mounts or media changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = mute;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [mute]);

  const handleClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);
  return (
    <div className="w-full  h-screen flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative">
      <video
        ref={videoRef}
        onClick={handleClick}
        muted={mute}
        autoPlay
        loop
        src={reel?.media}
        className="w-full max-h-full"
      />
      <div
        className="absolute cursor-pointer top-5 right-2.5 z-50"
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

export default ReelCard;
