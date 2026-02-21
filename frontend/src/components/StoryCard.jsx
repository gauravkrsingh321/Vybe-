import React, { useEffect, useState } from "react";
import dp from "../assets/blank_dp.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import VideoPlayer from "./VideoPlayer";
const StoryCard = () => {
  const navigate = useNavigate();
  const { storyData } = useSelector((state) => state.story);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/");
          return 100;
        }
        return prev + 1;
      });
    }, 150);
     return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="w-full max-w-[500px] h-screen bg-black border-x-2 border-gray-800 relative flex flex-col justify-center ">
      <div className="flex items-center gap-2.5 absolute top-7.5 px-2.5 z-20">
        <MdOutlineKeyboardBackspace
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <div className="w-[30px] h-[30px] md:w-10 md:h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            className="w-full object-cover"
            src={storyData?.author?.profilePic || dp}
            alt="dp"
          />
        </div>
        <div className="w-[75px] text-white font-semibold truncate">
          {storyData.author?.username}
        </div>
      </div>

      <div className="w-full h-full  flex items-center justify-center">
        {storyData?.mediaType === "image" && (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={storyData?.media}
              alt="media"
              className="w-fit h-full object-cover "
            />
          </div>
        )}

        {storyData?.mediaType === "video" && (
          <div className="w-full h-full flex items-center justify-center">
            <VideoPlayer
              className="rounded-none border-0"
              media={storyData?.media}
            />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute top-2.5 w-full h-[5px] bg-gray-900 flex flex-col">
        <div
          className="w-[200px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StoryCard;
