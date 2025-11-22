import React, { useRef, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import VideoPlayer from "../components/VideoPlayer";
import { setPostData } from "../redux/postSlice";
import { setStoryData } from "../redux/storySlice";
import { setReelData } from "../redux/reelSlice";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  const mediaInput = useRef();
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const {postData} = useSelector(state=>state.post);
  const {storyData} = useSelector(state=>state.story);
  const {reelData} = useSelector(state=>state.reel);
  const [loading, setLoading] = useState(false)

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) setMediaType("image");
    else setMediaType("video");
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  };

  const uploadPost = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("caption",caption);
      formData.append("mediaType",mediaType);
      formData.append("media",backendMedia);
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/post/uploadPost`,formData,{withCredentials:true},);
      dispatch(setPostData([...postData,result.data]))
      navigate("/")
    } 
    catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  }

  const uploadStory = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("mediaType",mediaType);
      formData.append("media",backendMedia);
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/story/uploadStory`,formData,{withCredentials:true});
      dispatch(setStoryData([...storyData,result.data]));
      navigate("/")
    } 
    catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

   const uploadReel = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("caption",caption);
      formData.append("mediaType",mediaType);
      formData.append("media",backendMedia);
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reel/uploadReel`,formData,{withCredentials:true});
      console.log(result)
      dispatch(setReelData([...reelData,result.data]));
      navigate("/")
    } 
    catch (error) {
console.log(error.response?.data);
    } finally{
      setLoading(false)
    }
  }

  const handleUpload = () => {
    setLoading(true)
    if(uploadType === "post") uploadPost();
    else if(uploadType === "story") uploadStory();
    else uploadReel();
  }

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
        <div
          className={`${
            uploadType === "post"
              ? "bg-black text-white shadow-2xl shadow-black"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>
        <div
          className={`${
            uploadType === "story"
              ? "bg-black text-white shadow-2xl shadow-black"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>
        <div
          className={`${
            uploadType === "reel"
              ? "bg-black text-white shadow-2xl shadow-black"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("reel")}
        >
          Reel
        </div>
      </div>

      {!frontendMedia && (
        <div
          className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-2 mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
          onClick={() => mediaInput.current.click()}
        >
          <input type="file" accept={uploadType==="reel" ?"video/*" : ""} hidden ref={mediaInput} onChange={handleMedia} />
          <FiPlusSquare className="w-[25px] cursor-pointer text-white h-[25px]" />
          <div className="text-white text-[19px] font-semibold">
            Upload {uploadType}
          </div>
        </div>
      )}

      {frontendMedia && (
        <div className={`w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center mt-[9vh] ${uploadType === "story" ? "flex justify-end pb-1":""}`}>

          {mediaType === "image" && (
            <div className="w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center mt-[5vh]">
              <img
                src={frontendMedia}
                alt="media"
                className="h-[60%] md:h-[70%] lg:h-[80%] rounded-2xl"
              />
              {uploadType !== "story" && <input
                type="text"
                className="w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-[5px] text-white mt-5 placeholder:text-gray-500"
                placeholder="Write Caption"
                disabled={loading}
                onChange={(e)=>setCaption(e.target.value)} value={caption}
              />}
            </div>
          )}

          {mediaType === "video" && (
            <div className="w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center mt-[5vh]">
              <VideoPlayer media={frontendMedia}/>
              {uploadType !== "story" && 
              <input
                type="text"
                disabled={loading}
                className="w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-[5px] text-white mt-5 placeholder:text-gray-500"
                placeholder="Write Caption"
                onChange={(e)=>setCaption(e.target.value)} value={caption} />
              }
            </div>
          )}
        </div>
      )}

      {frontendMedia && (
        <button className="px-2.5 w-[60%] max-w-[200px] py-[5px] h-10 bg-white mt-[50px] cursor-pointer rounded-2xl font-bold hover:bg-gray-300" disabled={loading} onClick={handleUpload}>
          {loading ? <ClipLoader size={30} color="black"/>:`Upload ${uploadType}`}
        </button>
      )}
    </div>
  );
};

export default Upload;
