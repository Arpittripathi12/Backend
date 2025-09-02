    // require('dotenv').config()({path:'/env'})
    // import mongoose from "mongoose";
    // import { DB_NAME } from "./constants";
    import connectDB from "./db/index.js";
    import dotenv from 'dotenv'
    // dotenv ko isliye use karte hai taki jab hamari first file load ho tabhi humare sare ke sare environment variables bhi load ho jaye
    dotenv.config({
        path:'./env'
    })
    connectDB();





    /*
    import express from "express"
    const app=express()
    // Using IFE means directly calling function()
    (async()=>{
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            // kayi bar app toh connect ho jati hai par express usse baat nahi kar pati hai isliye app.on() use karte hai
            app.on("error",(error)=>{
                console.log("ERR:",error);
                throw error
            
            })
            app.listen(process.env.PORT,()=>{
                console.log(`App is listening on port ${process.env.PORT}`);
            })
        } catch (error) {
            console.error("Error:",error);
        }
    })()
        */