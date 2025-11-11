import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadToCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file); //delete file after we have received it in result
    return result;
  } 
  catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};

export default uploadToCloudinary;
