import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import dp from "../assets/blank_dp.png";
import OnlineUser from "../components/onlineUser";
import { setSelectedUser } from "../redux/messageSlice";

const Messages = () => {
  const { userData } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  const { prevChatUsers} = useSelector((state) => state.message);
  const dispatch = useDispatch();
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

      <div className="w-full h-20 flex gap-5 justify-start items-center overflow-x-auto p-5 border-b-2 border-gray-800">
        {userData?.following?.map((user,index) => {
          return onlineUsers?.includes(user._id) && <OnlineUser key={index} user={user} />;
        })}
      </div>

      <div className="w-full h-full overflow-auto flex flex-col gap-5">
        {prevChatUsers.map((user,index) => (
          <div
            key={index}
            className="text-white cursor-pointer w-full flex items-center gap-2.5"
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messageArea");
            }}
          >
            {onlineUsers?.includes(user?.user?._id) ? (
              <OnlineUser user={user?.user} />
            ) : (
              <div className="w-[50px]  h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  className="w-full object-cover"
                  src={user?.user?.profilePic || dp}
                  alt="dp"
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="text-white text-[18px] font-semibold">
                {user?.user?.username}
              </div>
              {onlineUsers?.includes(user?.user?._id) && (
                <div className="text-[#00ff0d]">Active Now</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
