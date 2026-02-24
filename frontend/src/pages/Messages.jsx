import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router";

const Messages = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col bg-black gap-5 p-0 lg:p-2">
      <div className="w-full h-20 flex items-center gap-5 px-5">
        <MdOutlineKeyboardBackspace
          className="text-white w-[25px] h-[25px] cursor-pointer lg:hidden"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Messages</h1>
      </div>


    </div>
  );
};

export default Messages;
