import { FiPlusCircle } from "react-icons/fi";
import dp from "../assets/blank_dp.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const StoryDp = ({ ProfilePic, username, story }) => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { storyData, storyList } = useSelector((state) => state.story);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    if (
      story?.viewers?.some(
        (viewer) =>
          viewer?._id?.toString() === userData._id.toString() ||
          viewer?.toString() === userData._id.toString(),
      )
    ) {
      setViewed(true);
    } else {
      setViewed(false);
    }
  }, [story, userData, storyData, storyList, story?.viewers, userData._id]);

  const handleViewers = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/story/viewStory/${story._id}`,
        { withCredentials: true },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (!story && username === "Your Story") {
      navigate("/upload");
    } else if (story && username === "Your Story") {
      handleViewers();
      navigate(`/story/${userData?.username}`);
    } else {
      handleViewers();
      navigate(`/story/${username}`);
    }
  };

  return (
    <div className="flex flex-col w-20">
      <div
        className={`w-20 h-20 bg-linear-to-b ${!story ? null : !viewed ? "bg-linear-to-b from-red-500 to-blue-950" : "bg-linear-to-r from-gray-500 to-black-800"}  rounded-full flex items-center justify-center relative`}
        onClick={handleClick}
      >
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            className="w-full object-cover"
            src={ProfilePic || dp}
            alt="dp"
          />
          {!story && username === "Your Story" && (
            <div>
              <FiPlusCircle className="absolute text-black bg-white right-2.5 rounded-full bottom-2 w-[22px] h-[22px]" />
            </div>
          )}
        </div>
      </div>
      <div className="text-[14px] truncate text-center w-full  text-white">
        {username}
      </div>
    </div>
  );
};

export default StoryDp;
