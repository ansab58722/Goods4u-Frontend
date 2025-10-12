import mongoose from "mongoose";


const User = new mongoose.Schema({
    name: String,
    email: String,
    password:String

  });


const User_schema = mongoose.model('Users', User);

export default  User_schema