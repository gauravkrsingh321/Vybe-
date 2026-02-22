import React, { useEffect, useState } from "react";
import dp from "../assets/blank_dp.png";
import { useNavigate } from "react-router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import VideoPlayer from "./VideoPlayer";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa6";
const StoryCard = ({ storyData }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [showViewers, setShowViewers] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log("userdata", userData);
  console.log("storyData", storyData);

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
          {storyData?.author?.username}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-2.5 w-full h-[5px] bg-gray-900 flex flex-col">
        <div
          className="w-[200px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {!showViewers && (
        <>
          <div className="w-full h-full  flex items-center justify-center">
            {storyData?.mediaType === "image" && (
              <div className="w-full h-full overflow-hidden flex items-center justify-center">
                <img
                  src={storyData?.media}
                  alt="media"
                  className="w-full h-full object-cover "
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

          {storyData?.author?.username === userData?.username && (
            <div
              className="absolute w-full cursor-pointer flex items-center gap-2.5 text-white h-[70px] bottom-0 p-2 left-0"
              onClick={() => setShowViewers(true)}
            >
              <div className="text-white flex items-center gap-[5px]">
                <FaEye />
                {storyData?.viewers?.length}
              </div>

              <div className="relative pb-7 flex">
                {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
                  <div
                    key={index}
                    className="w-7.5 h-7.5 border-2 border-black rounded-full cursor-pointer overflow-hidden absolute"
                    style={{ left: `${index * 10}px` }}
                  >
                    <img
                      src={viewer?.profilePic || dp}
                      alt="story"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {showViewers && (
        <>
          <div
            className="w-full overflow-hidden h-[50%]  flex items-center justify-center cursor-pointer"
            onClick={() => setShowViewers(false)}
          >
            {storyData?.mediaType === "image" && (
              <div className="h-full overflow-hidden flex items-center justify-center">
                <img
                  src={storyData?.media}
                  alt="media"
                  className="h-full object-contain"
                />
              </div>
            )}

            {storyData?.mediaType === "video" && (
              <div className="h-full w-full flex items-center justify-center">
                <VideoPlayer
                  className="rounded-none border-0"
                  media={storyData?.media}
                />
              </div>
            )}
          </div>

          <div className="w-full h-[70%] border-t-2 border-t-gray-800 p-5">
            <div className="flex items-center pl-2 text-white gap-2.5">
              <FaEye />
              <span>
                {storyData?.viewers?.length}{" "}
                {storyData?.viewers?.length === 1 ? "Viewer" : "Viewers"}
              </span>
            </div>

            <div className="w-full max-h-full flex flex-col gap-2.5 overflow-auto pt-5">
              {storyData?.viewers?.map((viewer, index) => (
                <div key={index} className="w-full flex items-center gap-5">
                  <div className="w-[30px] h-[30px] md:w-10 md:h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img
                      className="w-full object-cover"
                      src={viewer?.profilePic || dp}
                      alt="dp"
                    />
                  </div>
                  <div className="w-[75px] text-white font-semibold truncate">
                    {viewer?.username}
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoryCard;
