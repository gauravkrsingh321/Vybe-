import {LuImage} from "react-icons/lu";
import {IoMdSend} from "react-icons/io";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import dp from "../assets/blank_dp.png";
import {useNavigate} from "react-router";
import SenderMessage from "../components/SenderMessage";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import ReceiverMessage from "../components/ReceiverMessage";

const MessageArea = () => {
  const {selectedUser,messages} = useSelector(state => state.message);
  const {socket} = useSelector(state => state.socket)
  const {userData} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const imageInput = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const sendMessageHandler = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("message",input);
      if(backendImage) {
        formData.append("image",backendImage);
      }
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/message/send/${selectedUser?.user?._id}`,formData,{withCredentials:true});
      dispatch(setMessages([...messages,res.data.newMessage]));
      setInput("")
      setBackendImage(null)
      setFrontendImage(null)
    } catch (error) {
      console.log(error.response?.data); 
    } 
  }

  useEffect(()=>{
     const fetchAllMessages = async ()=>{
      setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/message/getAll/${selectedUser?.user?._id}`,{withCredentials:true});
      dispatch(setMessages(res.data.messages));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    } 
  }
  if (selectedUser?.user?._id) {
    fetchAllMessages();
  }
  },[dispatch,selectedUser?.user?._id])

  useEffect(()=>{
    socket?.on("newMessage",(mess)=>{
      dispatch(setMessages([...messages,mess]))
    })
    return ()=> socket?.off("newMessage")
  },[messages,dispatch,socket])

  return (
    <div className="w-full h-screen bg-black relative">

      <div className="flex items-center gap-[15px] px-5 py-2.5 fixed top-0 z-100 bg-black w-full">
        <div className=" h-20 flex items-center gap-5 px-5">
          <MdOutlineKeyboardBackspace
            className="text-white w-[25px] h-[25px] cursor-pointer"
            onClick={() => navigate(`/`)}
          />
        </div>

        <div
          className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden"
          onClick={() => {
            navigate(`/profile/${selectedUser?.user?.username}`);
          }}
        >
          <img
            className="w-full object-cover"
            src={selectedUser?.user?.profilePic || dp}
            alt="dp"
          />
        </div>

        <div className="text-white text-[18px] font-semibold">
          <div>{selectedUser?.user?.username}</div>
          <div className="text-gray-400 text-[14px]">
            {selectedUser?.user?.name}
          </div>
        </div>
      </div>

      <div className="w-full h-[80%] pt-[100px] px-10 flex flex-col gap-[50px] overflow-auto bg-black">
        { 
         loading ? (
          <>
      <div className="w-[120px] h-10 bg-gray-700 rounded-2xl animate-pulse"></div>
      <div className="w-40 h-10 bg-gray-700 rounded-2xl animate-pulse ml-auto"></div>
      <div className="w-[140px] h-10 bg-gray-700 rounded-2xl animate-pulse"></div>
      <div className="w-[180px] h-10 bg-gray-700 rounded-2xl animate-pulse ml-auto"></div>
      <div className="w-[130px] h-10 bg-gray-700 rounded-2xl animate-pulse"></div>
    </>
         ) :
         (
          messages && messages.map((mess)=>(
            mess.sender===userData._id?<SenderMessage key={mess._id} message={mess}/>:<ReceiverMessage key={mess._id} message={mess}/>
          ))
        )
        }
      </div>

      <div className="w-full h-20 fixed bottom-0 flex justify-center items-center bg-black z-100">
        <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616] flex items-center gap-2.5 px-5 relative" onSubmit={sendMessageHandler}>
          {
            frontendImage && <div className="w-[100px] rounded-xl h-[100px] absolute top-[-120px] right-2.5 overflow-hidden"><img className="h-full object-cover" src={frontendImage} /></div>
          }
          <input type="file" hidden accept="image/*" ref={imageInput} onChange={handleImage}/>
          <input
            type="text"
            placeholder="Message"
            className="w-full h-full px-5 text-[18px] text-white outline-0"
            onChange={(e)=>setInput(e.target.value)}
            value={input}
          />
          <div onClick={()=>imageInput.current.click()}><LuImage className="w-7 cursor-pointer h-7 text-white"/></div>
          {(input || frontendImage) && <button className="w-15 h-10 rounded-full bg-linear-to-br from-[#9500ff] to-[#ff0095] flex items-center justify-center cursor-pointer"><IoMdSend className="w-[25px] h-[25px]text-white"/></button>}
        </form>
      </div>
      
    </div>
  );
};

export default MessageArea;
