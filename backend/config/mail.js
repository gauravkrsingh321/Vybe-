import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});


const sendMail = async (email,otp)=>{
  await transporter.sendMail({
    from:`${process.env.MAIL}`,
    to:email,
    subject:"Reset Your Password",
    html:`<p>Your OTP for password reset is <b>${otp}</b>.
    It expires in 5 minutes.</p>`
  })
}

export default sendMail;