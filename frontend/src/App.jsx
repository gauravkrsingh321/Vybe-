import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { io } from "socket.io-client";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import Reels from "./pages/Reels";
import Story from "./pages/Story";
import Messages from "./pages/Messages";
import MessageArea from "./pages/MessageArea";

import useCurrentUser from "./hooks/useCurrentUser.jsx";
import useSuggestedUsers from "./hooks/useSuggestedUsers.jsx";
import useAllPost from "./hooks/useAllPost.jsx";
import useAllReel from "./hooks/useAllReel.jsx";
import useAllStories from "./hooks/useAllStories.jsx";
import { setOnlineUsers, setSocket } from "./redux/socketSlice";
import useFollowingList from "./hooks/useFollowingList.jsx";
import usePrevChatUsers from "./hooks/usePrevChatUsers.jsx";
import Search from "./pages/Search.jsx";

const App = () => {
  useCurrentUser()
  useSuggestedUsers()
  useAllPost()
  useAllReel()
  useAllStories()
  useFollowingList()
  usePrevChatUsers()
  const { userData, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
  if (!userData) {
    return;
  }

  const socketIo = io(import.meta.env.VITE_BASE_URL, {
    query: {
      userId: userData._id,
    },
  });

  dispatch(setSocket(socketIo));

  socketIo.on("getOnlineUsers", (users)=>{
    dispatch(setOnlineUsers(users))
  })

  return () => {
    socketIo.close();
    dispatch(setSocket(null));
  };
}, [userData, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={60} />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />

        <Route
          path="/profile/:username"
          element={userData ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/story/:username"
          element={userData ? <Story /> : <Navigate to="/login" />}
        />

        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/upload"
          element={userData ? <Upload /> : <Navigate to="/login" />}
        />

         <Route
          path="/search"
          element={userData ? <Search /> : <Navigate to="/login" />}
        />

        <Route
          path="/messages"
          element={userData ? <Messages /> : <Navigate to="/login" />}
        />

        <Route
          path="/messagearea"
          element={userData ? <MessageArea /> : <Navigate to="/login" />}
        />

        <Route
          path="/reels"
          element={userData ? <Reels /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
