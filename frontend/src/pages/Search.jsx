import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import dp from "../assets/blank_dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../redux/userSlice.js";

function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const { searchData } = useSelector((state) => state.user);

  useEffect(() => {
    const handleSearch = async () => {
       if (!input.trim()) {
        dispatch(setSearchData([]));
        return;
    }

      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/search?keyword=${input}`,
          {withCredentials:true}
        );

        dispatch(setSearchData(result.data.users));
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [input,dispatch]);

  return (
    <div className="w-full min-h-screen bg-black flex items-center flex-col gap-5">
      {/* Back button */}
      <div className="w-full h-20 flex items-center gap-5 px-5 absolute top-0">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Search bar */}
      <div className="w-full h-20 flex items-center justify-center mt-20">
        <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-5">
          <FiSearch className="w-[18px] h-[18px] text-white" />

          <input
            type="text"
            placeholder="Search..."
            className="w-full h-full outline-0 rounded-full px-5 text-white text-[18px]"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </form>
      </div>

      {/* Search Results */}
      {input &&
        searchData?.map((user) => (
          <div
            key={user._id}
            className="w-[90vw] max-w-[700px] h-[60px] rounded-full bg-white flex items-center gap-5 px-[5px] cursor-pointer hover:bg-gray-200"
            onClick={() => navigate(`/profile/${user.username}`)}
          >
            {/* Profile Image */}
            <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
              <img
                src={user.profilePic || dp}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Information */}
            <div className="text-black text-[18px] font-semibold">
              <div>{user.username}</div>

              <div className="text-[14px] text-gray-400">{user.name}</div>
            </div>
          </div>
        ))}

      {/* When there is no search input */}
      {!input && (
        <div className="text-[30px] text-gray-700 font-bold">
          Search Here...
        </div>
      )}
    </div>
  );
}

export default Search;
