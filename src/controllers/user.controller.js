import {asyncHandler} from "../utils/async_handler.js"  
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {UploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async (req,res)=>{


// res.status(200).json({
//     message:"ok"
// })
//get user details from frontend
// validation-not empty
// check if user already exists=>username,email
// check for images,check for avatar
// upload them to cloudinary, avatar
// create user object-create entry in db
// remove password and refresh token field from response
// check for user creation
// return response

const {fullName,email,password,username} =req.body// ye sirf data handle kar sakta hai , file nahi
console.log("email :",email);
    // Mutliple if bhi use kar sakte ho for checking each field
    // if(fullName===""){
    //     throw new ApiError(400,"fullName is required")
    // }    

    if([fullName,email,password,username].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    }
    )
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    const avatarlocalPath=req.files?.avatar[0]?.path;
    const coverImagelocalPath=req.files?.coverImage[0]?.path;
    if(!avatarlocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar= await UploadOnCloudinary(avatarlocalPath)
    const coverImage=await UploadOnCloudinary(coverImagelocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url|| "" ,
        email,
        password,
        username:username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
     
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered Successfully")
    )


})

export {registerUser}