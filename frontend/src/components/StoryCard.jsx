import React from "react";
import dp from "../assets/blank_dp.png";

const StoryCard = ({ ProfilePic, username }) => {
  return (
    <div className="flex flex-col w-20">
      <div className="w-20 h-20 bg-linear-to-b from-blue-500 to-blue-950 rounded-full flex items-center justify-center">
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img className="w-full object-cover" src={dp} alt="dp" />
        </div>
      </div>
      <div className="text-[14px] truncate text-center w-full  text-white">
          {username}
        </div>
    </div>
  );
};

export default StoryCard;
