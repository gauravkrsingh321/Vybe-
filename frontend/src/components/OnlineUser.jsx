import React from "react";
import dp from "../assets/blank_dp.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/messageSlice";

const OnlineUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-[50px] h-[50px] flex gap-5 justify-start items-center relative">
      <div className="flex items-center gap-2.5">
        <div
          className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
          onClick={() => {
            dispatch(setSelectedUser(user));
            navigate("/messageArea");
          }}
        >
          <img
            className="w-full object-cover"
            src={user.profilePic || dp}
            alt="dp"
          />
        </div>
      </div>
      <div className="w-2.5 h-2.5 bg-[#00ff0d] rounded-full absolute top-1 right-0"></div>
    </div>
  );
};

export default OnlineUser;
