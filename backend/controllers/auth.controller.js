import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import sendMail from "../config/mail.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if(password.length<6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });
    res.cookie("token",token,{
      httpOnly:true,
      maxAge:10*365*24*60*60*1000, //10 years
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict"
    })

    //Remove password before sending response
    const userWithoutPassword = await User.findById(newUser._id).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist,please register first",
      });
    }
    const isMatching = await bcrypt.compare(password, existingUser.password);
    if (!isMatching) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //generate token
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
     res.cookie("token",token,{
      httpOnly:true,
      maxAge:10*365*24*60*60*1000, //10 years
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict"
    })

    const userWithoutPassword = await User.findById(existingUser._id).select(
      "-password"
    );

    return res.status(200).json({
      success: true,
      message: "Logged In Successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req,res) => {
  try {
    res.clearCookie("token",{
      httpOnly:true,
      maxAge:10*365*24*60*60*1000, //10 years
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict"
    })
    return res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const sendOTP = async (req,res) => {
  try {
    const {email} = req.body;
    if(!email) {
      return res.status(400).json({
      success: false,
      message: "Email Is Required",
    });
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
      success: false,
      message:"User Not Found",
    });
    }
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; //5 mins
    user.isOTPVerified = false
    await user.save();
    await sendMail(email,otp);
    return res.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const verifyOTP = async (req,res) => {
  try {
    const {email,otp} = req.body;
    if(!email || !otp) {
      return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
    }
    const user = await User.findOne({email});
    if(!user || user.resetOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({
      success: false,
      message: "User not found or otp invalid/expired",
    });
    }
    user.isOTPVerified = true;
    user.resetOTP=undefined;
    user.otpExpires=undefined;
    await user.save();
     return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const resetPasssword = async(req,res) => {
  try {
    const {email,password} = req.body;
    if(!email || !password) {
       return res.status(400).json({
      success: false,
      message: "All Fields Are Required",
    });
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
      success: false,
      message: "User not found",
    });
    }
    if(!user.isOTPVerified) {
      return res.status(400).json({
      success: false,
      message: "OTP Verification Is Required",
    });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    user.password = hashedPassword;
    user.isOTPVerified = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}