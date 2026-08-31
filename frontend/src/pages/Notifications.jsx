import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import NotificationCard from "../components/NotificationCard";
import axios from "axios";
import { setNotificationData } from "../redux/userSlice";
import { useEffect } from "react";

const Notifications = () => {
  const navigate = useNavigate();
  const { notificationData } = useSelector((state) => state.user);
  const ids = notificationData.map((n) => n._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const markNotificationAsRead = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/user/markAsRead`,
          { notificationId: ids },
          { withCredentials: true },
        );
        await fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/getAllNotifications`,
          { withCredentials: true },
        );
        dispatch(setNotificationData(res.data.notifications));
      } catch (error) {
        console.log(error);
      }
    };
    markNotificationAsRead();
  }, [ids, dispatch]);

  return (
    <div className="w-full h-screen bg-black overflow-auto">
      <div className="w-full h-20 flex items-center gap-5 mt-8 px-5 lg:hidden">
        <MdOutlineKeyboardBackspace
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-white text-[20px] font-semibold">Notifications</h1>
      </div>

      <div className="w-full flex flex-col gap-5 h-full px-2.5">
        {notificationData?.map((noti, index) => (
          <NotificationCard noti={noti} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
