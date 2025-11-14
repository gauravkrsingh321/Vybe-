import React, { useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import dp from "../assets/blank_dp.png";
import axios from "axios";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profilePic || dp)
    const [loading, setLoading] = useState(false)
    const [backendImage, setBackendImage] = useState(null)
    const [name, setName] = useState(userData?.name || "")
    const [username, setUsername] = useState(userData?.username || "")
    const [bio, setBio] = useState(userData?.bio || "")
    const [profession, setProfession] = useState(userData?.profession || "")
    const [gender, setGender] = useState(userData?.gender || "")
    const dispatch = useDispatch()
    const handleImage = (e)=> {
      const file = e.target.files[0];
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }

    const handleEditProfile = async () => {
      setLoading(true)
      try {
        const formData = new FormData();
        formData.append("name",name);
        formData.append("username",username);
        formData.append("bio",bio);
        formData.append("profession",profession);
        formData.append("gender",gender);
        if(backendImage) {
          formData.append("profilePic",backendImage);
        }
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/editProfile`,formData,{withCredentials:true});
        dispatch(setProfileData(res.data.user));
        dispatch(setUserData(res.data.user));
        navigate(`/profile/${userData?.username}`)
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
    }

  return (
    <div className="w-full min-h-screen bg-black flex items-center flex-col gap-5">
      <div className="w-full h-20 flex items-center gap-5 px-5">
        <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={() => navigate(`/profile/${userData.username}`)}/>
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>

      <div className="w-20 h-20 md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={()=>imageInput.current.click()}>
        <input type="file" accept="image/*" ref={imageInput} hidden onChange={handleImage}/>
                <img
                  className="w-full object-cover"
                  src={frontendImage}
                  alt="dp"
                />
      </div>

      <div className="text-blue-500 text-[18px] font-semibold cursor-pointer" onClick={()=>imageInput.current.click()}>
        Change Your Profile Picture
      </div>
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none placeholder:text-gray-400" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)} disabled={loading} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none placeholder:text-gray-400" placeholder="Enter Your Name" value={username} onChange={(e)=>setUsername(e.target.value)} disabled={loading} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none placeholder:text-gray-400" placeholder="Bio" value={bio} onChange={(e)=>setBio(e.target.value)} disabled={loading} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl text-white font-semibold px-5 outline-none placeholder:text-gray-400" placeholder="Profession" value={profession} onChange={(e)=>setProfession(e.target.value)} disabled={loading} />
      <input type="text" className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 rounded-2xl placeholder:text-gray-400 text-white font-semibold px-5 outline-none" placeholder="Gender" value={gender} onChange={(e)=>setGender(e.target.value)} disabled={loading} />
      <button disabled={loading} className="px-2.5 w-[60%] max-w-[200px] hover:bg-gray-400 py-[5px] h-[50px] bg-white cursor-pointer font-bold rounded-2xl mb-8 mt-3" onClick={handleEditProfile}>{loading ? <div className="flex  items-center justify-center gap-2"><ClipLoader size={30} color="black"/><span className="text-black">Saving</span></div>:"Save Profile"}</button>
    </div>
  );
};

export default EditProfile;
