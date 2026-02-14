import React, { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import dp from "../assets/blank_dp.png";
import FollowButton from "./FollowButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineComment } from "react-icons/md";
import axios from "axios";
import { setReelData } from "../redux/reelSlice";
import { IoSendSharp } from "react-icons/io5";

const ReelCard = ({ reel }) => {
  const videoRef = useRef();
  const commentRef = useRef();
  const [mute, setMute] = useState(true); //start muted for autoplay
  const [isPlaying, setIsPlaying] = useState(false); // start paused
  const [progress, setProgress] = useState(0);
  const { userData } = useSelector((state) => state.user);
  const { reelData } = useSelector((state) => state.reel);
  const [showHeart, setShowHeart] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

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

  const handleLike = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/reel/like/${reel._id}`,
        { withCredentials: true },
      );
      const updatedReel = res.data.reel;
      const updatedReels = reelData.map((r) =>
        r._id === reel._id ? updatedReel : r,
      );
      dispatch(setReelData(updatedReels));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/reel/comment/${reel._id}`,
        { message },
        { withCredentials: true },
      );
      const updatedReel = res.data.reel;
      const updatedReels = reelData.map((r) =>
        r._id === reel._id ? updatedReel : r,
      );
      dispatch(setReelData(updatedReels));
      setMessage("")
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeOnDoubleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1000);
    {
      !reel?.likes?.includes(userData._id) ? handleLike() : null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowComment(false);
      }
    };

    if (showComment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showComment]);

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
      { threshold: 0.6 },
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <div className="w-[420px] h-screen flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative overflow-hidden">
      {showHeart && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50">
          <GoHeartFill className="w-[90px] h-[90px] drop-shadow-2xl text-white" />
        </div>
      )}

      <div
        ref={commentRef}
        className={`absolute z-200 bottom-0 w-full h-[500px] p-2.5 rounded-t-4xl bg-[#0e1718] left-0 shadow-2xl transform transition-transform duration-500 ease-in-out shadow-black ${showComment ? "translate-y-0" : "translate-y-full"}`}
      >
        <h1 className="text-white text-[20px] text-center font-semibold">
          Comments
        </h1>

        <div className="w-full h-[350px] overflow-y-auto flex flex-col gap-5">
          {reel?.comments?.length === 0 && (
            <div className="text-center text-white text-[20px] font-semibold mt-[50px]">
              No Comments Yet
            </div>
          )}

          {reel?.comments?.map((com) => (
            <div key={com._id} className="w-full flex flex-col gap-[5px] border-b border-gray-800 justify-center  mt-2.5 pb-2.5">
              <div className="flex justify-start items-center gap-2.5 md:gap-3.5">
          <div className="w-[30px] h-[30px] md:w-10 md:h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              className="w-full object-cover"
              src={com.author?.profilePic || dp}
              alt="dp"
            />
          </div>
          <div className="w-[150px] text-white font-semibold truncate">
            {com.author?.username}
          </div>
        </div>
        <div className="text-white pl-13">{com.message}</div>
            </div>
          ))}
        </div>

        <div className="w-full fixed bottom-0 h-20 flex items-center justify-between px-0 py-5">
          <div className="w-[30px] h-[30px] md:w-10 md:h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              className="w-full object-cover"
              src={reel?.author?.profilePic || dp}
              alt="dp"
            />
          </div>
          <input
            type="text"
            className="px-2.5 border-b-2 border-b-gray-500 w-[90%] text-white  outline-none h-10 placeholder:text-white"
            placeholder="Write Comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && <button
            onClick={handleComment}
            className="absolute right-5 cursor-pointer"
          >
            <IoSendSharp className="w-[25px] h-[25px] text-white" />
          </button>}
        </div>
      </div>

      <video
        ref={videoRef}
        onClick={handleClick}
        onDoubleClick={handleLikeOnDoubleClick}
        onTimeUpdate={handleTimeUpdate}
        muted={mute}
        autoPlay
        loop
        src={reel?.media}
        className="w-full h-full object-cover"
      />
      {/* Volume */}
      <div
        className="absolute cursor-pointer top-5 right-16  md:right-5 z-50"
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
      {/* Progress bar line*/}
      <div className="absolute bottom-0 w-full h-[5px] bg-gray-900 flex flex-col">
        <div
          className="w-[200px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* User details */}
      <div className="w-full absolute h-[100px] bottom-2.5 p-2.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[30px] h-[30px] md:w-10 md:h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden"
            onClick={() => navigate(`/profile/${reel?.author?.username}`)}
          >
            <img
              className="w-full object-cover"
              src={reel?.author?.profilePic || dp}
              alt="dp"
            />
          </div>
          <div className="w-[75px] text-white font-semibold truncate">
            {reel.author?.username}
          </div>
          {reel.author?._id !== userData._id && (
            <FollowButton
              targetUserId={reel.author?._id}
              tailwind="px-[10px] py-[5px] text-white border-2 text-[14px] rounded-2xl border-white"
            />
          )}
        </div>
        <div className="text-white pt-4">{reel?.caption}</div>

        {/* Like & Comment*/}
        <div className="absolute right-0 flex flex-col gap-5 text-white bottom-[200px] justify-center px-2.5">
          <div className="flex flex-col items-center cursor-pointer">
            <div className="pr-10 md:pr-0" onClick={handleLike}>
              {reel?.likes?.includes(userData._id) ? (
                <GoHeartFill className="w-[25px] h-[25px] cursor-pointer text-red-600" />
              ) : (
                <GoHeart className="w-[25px] h-[25px] cursor-pointer" />
              )}
            </div>
            <div className="pr-10 md:pr-0">{reel?.likes?.length}</div>
          </div>

          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowComment(true)}
          >
            <div className="pr-10 md:pr-0">
              <MdOutlineComment className="w-[25px] h-[25px] cursor-pointer" />
            </div>
            <div className="pr-10 md:pr-0">{reel?.comments?.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
