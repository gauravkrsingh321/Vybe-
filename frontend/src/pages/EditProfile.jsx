import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-black flex items-center flex-col gap-5">
      <div className="w-full h-20 flex items-center gap-5 px-5">
        <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/profile/${userData.username}`)}/>
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
    </div>
  );
};

export default EditProfile;
