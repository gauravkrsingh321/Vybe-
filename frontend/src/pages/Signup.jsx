import React, { useState } from "react";
import logo1 from "../assets/logo.png"
import logo2 from "../assets/logo2.png"
import {IoIosEye,IoIosEyeOff} from "react-icons/io"
import {ClipLoader} from "react-spinners"
import {useNavigate} from "react-router"
import axios from "axios"
import {useDispatch} from "react-redux"
import {setUserData} from "../redux/userSlice.js"

const Signup = () => {
  const [inputClicked, setInputClicked] = useState({
    name:false,
    username:false,
    email:false,
    password:false
  })
  const [formData, setFormData] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e)=> {
    const {name,value} = e.target;
    setFormData({
      ...formData,[name]:value})
  }

  const signupHandler = async (e)=>{
    setLoading(true);
    setErr("")
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`,formData,{withCredentials:true});
      dispatch(setUserData(res.data.user))
      console.log(res)
      console.log(res.data)
    } catch (error) {
          setErr(error.response?.data?.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="w-full h-screen bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        {/* left container */}
        <form onSubmit={signupHandler} className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-2.5 gap-5">
          <div className="flex gap-2.5 items-center text-[20px] font-semibold mt-10">
            <span>Sign Up To</span>
            <img src={logo1} alt="logo" className="w-[70px]"/>
          </div>

          <div className="relative flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl mt-[30px] border-2" onClick={()=>setInputClicked({...inputClicked,name:true})}>
            <label htmlFor="name" className={`text-gray-700 absolute left-5 cursor-pointer p-[5px] bg-white text-[15px] ${inputClicked.name || formData.name?"top-[-15px]":""}`}>Enter Your Name</label>
            <input disabled={loading} type="text" id="name" name="name" value={formData.name} onChange={changeHandler} className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>

          
          <div className="relative flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,username:true})}>
            <label htmlFor="username" className={`text-gray-700 absolute left-5 cursor-pointer p-[5px] bg-white text-[15px] ${inputClicked.username || formData.username?"top-[-15px]":""}`}>Enter Username</label>
            <input disabled={loading} type="text" id="username" name="username" value={formData.username} onChange={changeHandler}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>

          
          <div className="relative flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,email:true})}>
            <label htmlFor="email" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.email || formData.email?"top-[-15px]":""}`}>Enter Email</label>
            <input disabled={loading} type="email" id="email" name="email" value={formData.email} onChange={changeHandler}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>

          
          <div className="relative flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,password:true})}>
            <label htmlFor="password" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.password || formData.password?"top-[-15px]":""}`}>Enter Password</label>
            <input disabled={loading} type={showPassword ? "text":"password"} name="password" id="password" value={formData.password} onChange={changeHandler}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
            {!showPassword ? <IoIosEye className="absolute cursor-pointer right-5 w-[25px] h-[25px]" onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className="absolute cursor-pointer right-5 w-[25px] h-[25px]" onClick={()=>setShowPassword(false)}/>}
          </div>

          {err && <p className="text-red-500">{err}</p>}

          <button type="submit" disabled={loading} className="w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] hover:bg-gray-900 transition-all">{loading ? <ClipLoader size={30} color="white"/> : "Sign Up"}</button>
          <p className="cursor-pointer text-gray-800" onClick={()=>navigate('/login')}>Already Have An Account? <span className="text-blue-700 border-b-2 border-b-blue-700 pb-[3px]">Sign In</span></p>
        </form>
        {/* right container */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-2.5 text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo2} alt="logo" className="w-[40%]"/>
          <p>Not Just A Platform ,It's A VYBE</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
