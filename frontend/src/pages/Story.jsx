import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";
import StoryCard from "../components/StoryCard";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";

const Story = () => {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);
  const [loading, setLoading] = useState(false)
  const {username} = useParams();

  useEffect(() => {
    const handleStory = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/story/storyByUsername/${username}`,
          { withCredentials: true },
        );
        dispatch(setStoryData(res.data.story[0]));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    if (username) {
      handleStory();
    }
  }, [username, dispatch]);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      {loading ? <div className="w-full max-w-[500px] h-screen bg-black border-x-2 border-gray-800 relative flex justify-center items-center"><ClipLoader color="white" size={50}/> </div>: <StoryCard story={storyData} /> }
    </div>
  );
};

export default Story;
