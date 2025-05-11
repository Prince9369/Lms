//basic express server setup
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import morgan from "morgan";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";


dotenv.config();



//call database connection function
connectDB();
const app=express();
const PORT=process.env.PORT||3000;

app.use(morgan('dev'));//morgan middleware use hota hai to log the requests in the console

//default middleware
app.use(express.json());//json data ko parse karne ke liye use hota hai
app.use(cookieParser());//cookie ko parse karne ke liye use hota hai
app.use(cors({//cors middleware use hota hai to allow cross-origin requests
    origin:"http://localhost:5173",//yaha pe apne frontend ka url dena hai
    credentials:true,//credentials ko true karne se cookie send hoti hai
}));


//apis aayegi
//middleware
app.use("/api/v1/media",mediaRoute);//media route use hota hai to upload media files
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/purchase",purchaseRoute);//purchase route use hota hai to purchase courses
app.use("/api/v1/progress",courseProgressRoute);//course progress route use hota hai to track course progress







app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})