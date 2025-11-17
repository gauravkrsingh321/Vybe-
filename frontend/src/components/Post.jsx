import React from "react";
import dp from "../assets/blank_dp.png";

const Post = ({ postData }) => {
  return (
    <div className="w-[90%] min-h-[450px] flex flex-col gap-2.5 bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl">
      <div className="w-full h-20 justify-between items-center px-2.5 flex">
        <div className="flex justify-center items-center gap-2.5 md:gap-5">
          <div className="w-10 h-10 md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              className="w-full object-cover"
              src={postData.author?.profilePic || dp}
              alt="dp"
            />
          </div>
          <div className="w-[200px] font-semibold truncate">
            {postData.author?.username}
          </div>
        </div>
        <button className="px-2.5 w-20 md:w-[100px] py-[5px] h-[30px] md:h-10 bg-black text-white rounded-2xl text-[14px] md:text-[16px]">
          Follow
        </button>
      </div>
      
    </div>
  );
};

export default Post;
