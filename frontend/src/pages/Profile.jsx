import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { setProfileData, setUserData } from "../redux/userSlice";
import dp from "../assets/blank_dp.png";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import BottomNav from "../components/BottomNav";
import FollowButton from "../components/FollowButton";
import Post from "../components/Post";
import { setSelectedUser } from "../redux/messageSlice";

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);
  const [postType, setPostType] = useState("posts");
  const { postData } = useSelector((state) => state.post);
  const userPosts = postData?.filter(
    (post) => post.author?._id === profileData?.user?._id,
  );
  const profileHandler = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/user/getProfile/${username}`,
        { withCredentials: true },
      );
      dispatch(setProfileData(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [username, dispatch]);
  useEffect(() => {
    profileHandler();
  }, [profileHandler]);
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  if (!profileData) {
    return (
      <div className="w-full min-h-screen bg-black animate-pulse">
        {/* Top Bar */}
        <div className="w-full h-20 flex justify-between items-center px-[30px]">
          <div className="w-[25px] h-[25px] bg-gray-700 rounded"></div>

          <div className="w-28 h-6 bg-gray-700 rounded"></div>

          <div className="w-20 h-6 bg-gray-700 rounded"></div>
        </div>

        {/* Profile Section */}
        <div className="w-full h-[150px] flex items-start gap-5 lg:gap-[50px] pt-5 justify-center">
          {/* DP */}
          <div className="w-20 h-20 md:w-[140px] md:h-[140px] rounded-full bg-gray-700"></div>

          {/* Name, profession, bio */}
          <div className="flex flex-col gap-3">
            <div className="w-40 h-6 bg-gray-700 rounded"></div>
            <div className="w-32 h-5 bg-gray-700 rounded"></div>
            <div className="w-48 h-5 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full h-[100px] flex items-center justify-center gap-10 md:gap-[60px] px-[20%] pt-[30px]">
          {/* Posts */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-6 bg-gray-700 rounded"></div>
            <div className="w-16 h-4 bg-gray-700 rounded"></div>
          </div>

          {/* Followers */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-6 bg-gray-700 rounded"></div>
            <div className="w-20 h-4 bg-gray-700 rounded"></div>
          </div>

          {/* Following */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-6 bg-gray-700 rounded"></div>
            <div className="w-20 h-4 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full h-20 mt-2.5 flex items-center justify-center gap-5">
          <div className="w-[150px] h-10 bg-gray-700 rounded-2xl"></div>
          <div className="w-[150px] h-10 bg-gray-700 rounded-2xl"></div>
        </div>

        {/* Bottom Section */}
        <div className="w-full mt-6 min-h-screen flex justify-center">
          <div className="w-full max-w-[900px] h-[500px] bg-gray-700 rounded-t-[30px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-20 flex justify-between items-center px-[30px] text-white">
        <div>
          <MdOutlineKeyboardBackspace
            className="text-white w-[25px] h-[25px] cursor-pointer"
            onClick={() => navigate("/")}
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
            src={
              profileData?.user?._id === userData?._id
                ? userData?.profilePic || dp // fast for your own profile change
                : profileData?.user?.profilePic || dp // correct when you visit others' profiles
            }
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
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.user?.bio}
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center gap-10 text-white md:gap-[60px] px-[20%] pt-[30px]">
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {userPosts?.length || 0}
          </div>
          <div className="text-[#ffffffc7] text-[18px] md:text-[22px]">
            Posts
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center">
            <div className="relative w-[70px] h-10">
              {profileData?.user?.followers?.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden absolute"
                  style={{ left: `${index * 9}px` }}
                >
                  <img
                    src={user?.profilePic || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
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
          <div className="flex items-center justify-center">
            <div className="relative w-[70px] h-10">
              {profileData?.user?.following?.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden absolute"
                  style={{ left: `${index * 10}px` }}
                >
                  <img
                    src={user?.profilePic || dp}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.user?.following.length}
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
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}

        {profileData?.user?._id !== userData._id && (
          <>
            <FollowButton
              tailwind={`px-2.5 min-w-[150px] py-[5px]
        h-10 bg-white cursor-pointer rounded-2xl`}
              targetUserId={profileData?.user?._id}
              onFollowChange={profileHandler}
            />
            <button
              className="px-2.5 min-w-[150px] py-[5px]
        h-10 bg-white cursor-pointer rounded-2xl"
              onClick={() =>{ 
                dispatch(setSelectedUser(profileData))
                navigate("/messagearea")}}
            >
              Message
            </button>
          </>
        )}
      </div>

      <div className="w-full mt-6 min-h-screen flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-5 pt-[30px] pb-[100px]">
          {userData._id === profileData?.user?._id && (
            <div className="w-[90%] max-w-[500px] h-20 bg-[white] rounded-full flex justify-around items-center gap-2.5">
              {userPosts?.length === 0 ? (
                ""
              ) : (
                <>
                  <div
                    className={`${
                      postType === "posts"
                        ? "bg-black text-white shadow-2xl shadow-black"
                        : ""
                    } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
                    onClick={() => setPostType("posts")}
                  >
                    Posts
                  </div>
                  <div
                    className={`${
                      postType === "saved"
                        ? "bg-black text-white shadow-2xl shadow-black"
                        : ""
                    } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
                    onClick={() => setPostType("saved")}
                  >
                    Saved
                  </div>
                </>
              )}
            </div>
          )}
          <BottomNav />

          {userData._id === profileData?.user?._id && (
            <>
              {postType === "posts" &&
                (userPosts?.length === 0 ? (
                  <div className="text-black font-bold text-2xl">
                    No Posts Uploaded, Get Social
                  </div>
                ) : (
                  userPosts.map((post, index) => (
                    <Post post={post} key={index} />
                  ))
                ))}
              {postType === "saved" &&
                postData.map(
                  (post, index) =>
                    userData?.saved.includes(post._id) && (
                      <Post post={post} key={index} />
                    ),
                )}
            </>
          )}

          {userData._id !== profileData?.user?._id &&
            (userPosts?.length === 0 ? (
              <div className="text-black lg:mt-6 text-2xl font-bold lg:text-3xl">
                No posts uploaded
              </div>
            ) : (
              userPosts.map((post, index) => <Post post={post} key={index} />)
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
