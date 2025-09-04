import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // file system, import nahi karna padta jaha chahe waha use karlo       

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const UploadOnCloudinary=async (localfilePath)=>{
    try{
        if(!localfilePath) return null;
        const   response =  await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        console.log("File has been uploaded on Cloudinary ",response.url);
        return response;
    }catch{
        fs.unlinkSync(localfilePath) //remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {UploadOnCloudinary}