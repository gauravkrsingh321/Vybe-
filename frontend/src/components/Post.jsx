import React, { useState } from "react";
import dp from "../assets/blank_dp.png";
import VideoPlayer from "./VideoPlayer";
import { GoBookmarkFill, GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineBookmarkBorder, MdOutlineComment } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import axios from "axios";
import { setPostData } from "../redux/postSlice";
import {setUserData} from "../redux/userSlice"

const Post = ({ post }) => {
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const [showComment, setShowComment] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/like/${post._id}`,
        { withCredentials: true }
      );
      const updatedPost = res.data.post;
      const updatedPosts = postData.map((p) =>
        p._id === post._id ? updatedPost : p
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/postComment/${post._id}`,
        { message },
        { withCredentials: true }
      );
      const updatedPost = res.data.post;
      const updatedPosts = postData.map((p) =>
        p._id === post._id ? updatedPost : p
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

   const handleSaved = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/saved/${post._id}`,
        { withCredentials: true }
      );
      dispatch(setUserData(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] min-h-[450px] flex flex-col  bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl">
      <div className="w-full h-20 justify-between items-center px-2.5 flex">
        <div className="flex justify-center items-center gap-2.5 md:gap-5">
          <div className="w-10 h-10 md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              className="w-full object-cover"
              src={post.author?.profilePic || dp}
              alt="dp"
            />
          </div>
          <div className="w-[150px] font-semibold truncate">
            {post.author?.username}
          </div>
        </div>
        <button className="px-2.5 w-[60px] md:w-[100px] py-[5px] h-[30px] md:h-10 bg-black text-white rounded-2xl text-[14px] md:text-[16px]">
          Follow
        </button>
      </div>

      <div className="w-[90%] min-h-[400px] md:mt-4  flex items-start flex-col md:items-center justify-center">
        {post.mediaType === "image" && (
          <div className="min-w-full md:h-[400px] h-[280px]  flex  items-center justify-center">
            <img
              src={post.media}
              alt="media"
              className="h-full  max-w-full object-center md:object-cover rounded-2xl"
            />
          </div>
        )}

        {post.mediaType === "video" && (
          <div className="w-full md:w-[430px] overflow-hidden md:h-[400px] h-[300px] xl:w-[600px] flex items-center justify-center">
            <VideoPlayer media={post.media} />
          </div>
        )}
      </div>

      <div className="w-full h-[60px]  flex justify-between items-center px-5 mt-2.5">
        <div className="flex justify-center items-center gap-2.5">
          <div
            className="flex justify-center items-center gap-[5px]"
            onClick={handleLike}
          >
            {post?.likes?.includes(userData._id) ? (
              <GoHeartFill className="w-[25px] h-[25px] cursor-pointer text-red-600" />
            ) : (
              <GoHeart className="w-[25px] h-[25px] cursor-pointer" />
            )}
            <span>
              <span>{post.likes?.length || 0}</span>
            </span>
          </div>
          <div className="flex justify-center items-center gap-[5px]">
            <MdOutlineComment onClick={()=>setShowComment(prev=>!prev)} className="w-[25px] h-[25px] cursor-pointer" />
            <span>
              <span>{post.comments?.length || 0}</span>
            </span>
          </div>
        </div>
        <button
  className="cursor-pointer p-2 rounded-full active:scale-90 no-select"
  onClick={handleSaved}
>
  {userData?.saved?.includes(post?._id) ? (
    <GoBookmarkFill className="w-[25px] h-[25px]" />
  ) : (
    <MdOutlineBookmarkBorder className="w-[25px] h-[25px]" />
  )}
</button>

      </div>

      {post?.caption && (
        <div className="w-full pb-4 px-5 gap-2.5 flex justify-start items-center">
          <h1 className="font-semibold">{post?.author?.username}</h1>
          <span>{post?.caption}</span>
        </div>
      )}

      {showComment && (
        <div className="w-full flex flex-col gap-[30px] pb-5">
          <div className="w-full h-20 flex items-center justify-between px-5 relative">
            <div className="w-10 h-10 md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
              <img
                className="w-full object-cover"
                src={post?.author?.profilePic || dp}
                alt="dp"
              />
            </div>
            <input
              type="text"
              className="px-2.5 border-b-2 border-b-gray-500 w-[90%] outline-none h-10 placeholder:text-gray-500"
              placeholder="Write Comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleComment}
              className="absolute right-5 cursor-pointer"
            >
              <IoSendSharp />
            </button>
          </div>

          <div className="w-full max-h-[300px] overflow-auto">
            <p className="px-5 font-bold">All Comments</p>
            {post.comments?.map((com, index) => (
              <div key={index} className="w-full px-5 py-5 flex items-center gap-5 border-b-2 border-b-gray-400">
                <div className="w-10 h-10 md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                  <img
                    className="w-full object-cover"
                    src={com.author?.profilePic || dp}
                    alt="dp"
                  />
                </div>
                <div className="font-medium text-black">{com.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
