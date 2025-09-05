import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true, // for Searching makes Easy
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
},
fullname:{
    type:String,
    required:true,
    trim:true,
    index:true,
},
avatar:{
    type:String, //cloudinary URL
    required:true,
},
coverimage:{
    type:String, //cloudinary URL
},
watchHistory:[
    {
        type:Schema.Types.ObjectId,
        ref:"Video"
    }
],
password:{
    type:String,
    required:[true,"Password is required"] //true ke sath hamesha message bhi likh sakte hai
},
refreshToken:{
    type:String,
}
},  {
    timestamps:true
}
)
// BCRYPT LIBARARY PASSWORD KO ENCRYPT AUR DECRYPT KARNE KE LIYE USE HOTI HAI
// JSONWEBTOKEN(JWT) IS USED FOR GENERATINGS TOKENS
// JWT ek bearer token hai , jiske paas ye token hoga , usko data send kar do

    userSchema.pre("save", async function(next){ //arrow function nahi use kar sakte kyuki usme context nahi hota
    // for storing password in distorted form
        if(!this.isModified("password")) return next();
    this.password= await bcrypt.hash(this.password,10)
    next()          
    })
    
    userSchema.methods.isPasswordCorrect=async function(password){
        
      return await bcrypt.compare(password,this.password) 
    }



    userSchema.methods.generateAccessToken=function(){
        return jwt.sign(
            {//payload
                _id:this._id,
                email:this.email,
                username:this.username,
                fullname:this.fullname

            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generateRefreshToken=function( ){
          return jwt.sign(
            {//payload
                _id:this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFERSH_TOKEN_EXPIRY
            }
        ) 
    }

export const User=mongoose.model("User",userSchema);