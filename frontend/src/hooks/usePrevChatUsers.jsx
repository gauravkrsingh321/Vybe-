import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevChatUsers } from "../redux/messageSlice.js";

function usePrevChatUsers() {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/message/prevChats`,
          { withCredentials: true },
        );
        dispatch(setPrevChatUsers(res?.data?.previousUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [messages, dispatch]);
}

export default usePrevChatUsers;
