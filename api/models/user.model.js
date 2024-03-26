import mongoose from "mongoose";
//creating a model in MongoDb 
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require : true,
        unique :true,
    },email:{
        type: String,
        require : true,
        unique :true,
    },password:{
        type: String,
        require : true,
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;