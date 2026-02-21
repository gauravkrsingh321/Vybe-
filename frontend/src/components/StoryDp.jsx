import { FiPlusCircle } from "react-icons/fi";
import dp from "../assets/blank_dp.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const StoryDp = ({ ProfilePic, username, story }) => {
  const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);

  const handleClick = () => {
    if (!story && username === "Your Story") {
      navigate("/upload");
    }
    else if(story && username === "Your Story") {
      navigate(`/story/${userData?.username}`)
    }
    else navigate(`/story/${username}`)
  };

  return (
    <div className="flex flex-col w-20">
      <div
        className={`w-20 h-20 bg-linear-to-b ${story ? "bg-linear-to-b from-red-500 to-blue-950" : ""}  rounded-full flex items-center justify-center relative`}
      onClick={handleClick}  >
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            className="w-full object-cover"
            src={ProfilePic || dp}
            alt="dp"
          />
          {!story && username === "Your Story" && (
            <div>
              <FiPlusCircle
                className="absolute text-black bg-white right-2.5 rounded-full bottom-2 w-[22px] h-[22px]"
              />
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
