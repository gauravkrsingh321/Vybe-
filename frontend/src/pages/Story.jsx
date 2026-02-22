import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../redux/storySlice";
import StoryCard from "../components/StoryCard";
import { useParams } from "react-router";

const Story = () => {
  const dispatch = useDispatch();
  const { storyData } = useSelector((state) => state.story);
  const {username} = useParams();

  useEffect(() => {
    const handleStory = async () => {
      dispatch(setStoryData(null));
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/story/storyByUsername/${username}`,
          { withCredentials: true },
        );
        dispatch(setStoryData(res.data.story[0]));
      } catch (error) {
        console.log(error);
      } 
    };
    if (username) {
      handleStory();
    }
  }, [username, dispatch]);

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
     <StoryCard storyData={storyData} /> 
    </div>
  );
};

export default Story;
