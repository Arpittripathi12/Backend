import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const  app=express()

// Cross Origin Resource Sharing
// It allows your frontend (React, Flutter, etc.) running on another domain/port to talk to your backend safely.
app.use(cors( {
        origin: process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json({limit:"16kb"}))
// limit: "16kb" → request body can’t be bigger than 16 kilobytes (for security).
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// Lets Express read data sent from HTML forms (like name=Arpit&age=21).or data hidden in URLS
app.use(express.static("public"))
// “Whatever files are inside public/ → serve them directly when browser requests them.”
app.use(cookieParser())
// Allows Express to read and set cookies in the browser.
// Useful for authentication (login tokens, sessions, etc.
// ).

// routes import 
import userRouter from "./routes/user.routes.js"
// routes declaration (yaha pe aap.get() nahi use karenge kyuki router ka func different file me likha hua hai)
// app.use("/users",userRouter)
 app.use("/api/v1/users",userRouter)


// http://localhost:8000/api/v1/users/register
export {app}