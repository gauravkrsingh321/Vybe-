import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setProfileData, setUserData } from "../redux/userSlice";
import dp from "../assets/blank_dp.png";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import BottomNav from "../components/BottomNav";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);
  useEffect(() => {
    const profileHandler = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/getProfile/${username}`,
          { withCredentials: true }
        );
        dispatch(setProfileData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    profileHandler();
  }, [username, dispatch]);
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-20 flex justify-between items-center px-[30px] text-white">
        <div>
          <MdOutlineKeyboardBackspace
            className="text-white w-[25px] h-[25px] cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="font-semibold text-[20px]">
          {profileData?.user?.username}
        </div>
        <div
          className="font-semibold text-[20px] text-blue-500 cursor-pointer"
          onClick={logoutHandler}
        >
          Log Out
        </div>
      </div>
      <div className="w-full h-[150px] flex items-start gap-5 lg:gap-[50px] pt-5 justify-center">
        <div className="w-20 h-20 md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            className="w-full object-cover"
            src={userData.profilePic || dp}
            alt="dp"
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.user?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.user?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center gap-10 text-white md:gap-[60px] px-[20%] pt-[30px]">
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.user?.posts.length}
          </div>
          <div className="text-[#ffffffc7] text-[18px] md:text-[22px]">
            Posts
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-5">
            <div className="flex relative">
              <div className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="w-10 h-10 absolute left-[9px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="w-10 h-10 absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.user?.followers.length}
            </div>
          </div>
          <div className="text-[#ffffffc7] text-[18px] md:text-[22px]">
            Followers
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-5">
            <div className="flex relative">
              <div className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="w-10 h-10 absolute left-[9px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
              <div className="w-10 h-10 absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profilePic || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.user?.following?.length}
            </div>
          </div>
          <div className="text-[#ffffffc7] text-[18px] md:text-[22px]">
            Following
          </div>
        </div>
      </div>

      <div className="w-full h-20 mt-2.5 flex items-center justify-center gap-5">
        {profileData?.user?._id === userData._id && (
          <button
            className="px-2.5 min-w-[150px] py-[5px]
        h-10 bg-white cursor-pointer rounded-2xl"
          onClick={()=>navigate("/editprofile")} >
            Edit Profile
          </button>
        )}

        {profileData?.user?._id !== userData._id && 
        <>
        <button
            className="px-2.5 min-w-[150px] py-[5px]
        h-10 bg-white cursor-pointer rounded-2xl"
          >
            Follow
          </button>
          <button
            className="px-2.5 min-w-[150px] py-[5px]
        h-10 bg-white cursor-pointer rounded-2xl"
          >
            Message
          </button>
        </>}
      </div>

      <div className="w-full mt-6 min-h-screen flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-5 pt-[30px]">
          <BottomNav/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
