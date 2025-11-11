import mongoose from "mongoose"

export const connectToDB = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected")
  } catch (error) {
    console.log(error,"Error in connecting db");
    process.exit(1)
  }
}