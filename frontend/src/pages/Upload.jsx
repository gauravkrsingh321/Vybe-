import React, { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Upload = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post")
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center">
      <div className="w-full h-20 flex items-center gap-5 px-5">
        <MdOutlineKeyboardBackspace
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
      </div>

      <div className="w-[90%] max-w-[600px] h-20 bg-[white] rounded-full flex justify-around items-center gap-2.5">
        <div className={`${uploadType==="post" ? "bg-black text-white shadow-2xl shadow-black":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={()=>setUploadType("post")}>Post</div>
        <div  className={`${uploadType==="story" ? "bg-black text-white shadow-2xl shadow-black":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={()=>setUploadType("story")}>Story</div>
        <div  className={`${uploadType==="reel" ? "bg-black text-white shadow-2xl shadow-black":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`} onClick={()=>setUploadType("reel")}>Reel</div>
      </div>

      <div className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]">
        <FiPlusSquare className='w-[25px] cursor-pointer text-white h-[25px]'/>
        <input type="file" accept="image/*" className="hidden"/>
        <div className="text-white text-[19px] font-semibold">Upload {uploadType}</div>
      </div>
    </div>
  );
};

export default Upload;
