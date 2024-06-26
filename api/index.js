import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authrouter from "./routes/auth.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>{
    console.log("connect to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
const app=express();
app.use(express.json());
app.listen(3000 , () => {
    console.log("server is running on port 3000")
});


//Simple Api test 
// app.get("/test",(req,res) =>{
//     res.send("test api successfull")
// });

app.use("/api/user",userRouter);
app.use("/api/auth",authrouter);

app.use((err,req,res,next) => {
const statusCode=err.statusCode || 500;
const message = err.message || "internal server error ";
return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
});
});