import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false)
  const [inputClicked, setInputClicked] = useState({
      email:false,
      otp:false,
      newPassword:false,
      confirmNewPassword:false
    })
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [err, setErr] = useState("")
      const navigate = useNavigate();


    const handleStep1 = async ()=>{
      setLoading(true)
      setErr("")
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/sendOtp`,{email},{withCredentials:true});
      console.log(res)
      console.log(res.data)
        setStep(2)
      } catch (error) {
          setErr(error.response?.data?.message)

        console.log(error)
      } finally{
        setLoading(false)
      }
    }
     const handleStep2 = async ()=>{
      setLoading(true)
      setErr("")
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/verifyOtp`,{email,otp},{withCredentials:true});
      console.log(res.data)
        setStep(3)
      } catch (error) {
              setErr(error.response.data.message)

        console.log(error)
      } finally{
        setLoading(false)
      }
    }
     const handleStep3 = async ()=>{
      if(newPassword !== confirmNewPassword) return setErr("Password Does Not Match")
      setLoading(true)
      setErr("")
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/resetPassword`,{email,password:newPassword},{withCredentials:true});
      console.log(res.data)
navigate('/login')   
   } catch (error) {
          setErr(error.response?.data?.message)

        console.log(error)
      } finally{
        setLoading(false)
      }
    }
  return (
    <div className="firstfull h-screen bg-linear-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {
        step===1 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center border-[#1a1f23]'>
        <h2 className='font-semibold text-[30px]'>Forgot Password</h2>
        
          <div className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,email:true})}>
            <label htmlFor="email" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.email || email?"top-[-15px]":""}`}>Enter Email</label>
            <input disabled={loading} type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>
           {err && <p className="text-red-500">{err}</p>}
          <button onClick={handleStep1} disabled={loading} className="w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] hover:bg-gray-900 transition-all">{loading ? <ClipLoader size={30} color="white"/> : "Send OTP"}</button>
        </div>
      }

      {
        step===2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center border-[#1a1f23]'>
        <h2 className='font-semibold text-[30px]'>Forgot Password</h2>
        
          <div className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,otp:true})}>
            <label htmlFor="otp" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.otp || otp?"top-[-15px]":""}`}>Enter OTP</label>
            <input disabled={loading}  type="text"
  inputMode="numeric"
  pattern="[0-9]*" id="otp" name="otp" value={otp} onChange={(e)=>{
             const val = e.target.value.replace(/\D/g, "");
    setOtp(val)}}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>
            {err && <p className="text-red-500">{err}</p>}
          <button onClick={handleStep2} disabled={loading} className="w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] hover:bg-gray-900 transition-all">{loading ? <ClipLoader size={30} color="white"/> : "Submit"}</button>
        </div>
      }

       {
        step===3 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center border-[#1a1f23]'>
        <h2 className='font-semibold text-[30px]'>Reset Password</h2>
        
          <div className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,newPassword:true})}>
            <label htmlFor="newPassword" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.newPassword || newPassword?"top-[-15px]":""}`}>Enter New Password</label>
            <input disabled={loading} type="text" id="newPassword" name="newPassword" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>
           <div className="relative mt-[30px] flex items-center justify-start w-[90%] h-[50px] border-black rounded-2xl border-2" onClick={()=>setInputClicked({...inputClicked,confirmNewPassword:true})}>
            <label htmlFor="confirmNewPassword" className={`text-gray-700 absolute left-5 p-[5px] cursor-pointer bg-white text-[15px] ${inputClicked.confirmNewPassword || confirmNewPassword?"top-[-15px]":""}`}>Confirm New Password</label>
            <input disabled={loading} type="text" id="confirmNewPassword" name="confirmNewPassword" value={confirmNewPassword} onChange={(e)=>setConfirmNewPassword(e.target.value)}  className="w-full h-full rounded-2xl px-5 outline-none border-0" required/>
          </div>
              {err && <p className="text-red-500">{err}</p>}
          <button onClick={handleStep3} disabled={loading} className="w-[70%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] hover:bg-gray-900 transition-all">{loading ? <ClipLoader size={30} color="white"/> : "Reset Password"}</button>
        </div>
      }
    </div>
  )
}

export default ForgotPassword