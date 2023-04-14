const asyncHandler = require("express-async-handler");
const bcrpyt = require("bcrypt");
const User = require("../models/userModel");
//@desc Register a new user
//@route GET /api/users/register
//@access Public
const registerUser = asyncHandler( async (req , res) => {
    const { username , email , password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please provide username, email and password");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    //Hash the password
    const hashedPassword = await bcrpyt.hash(password, 10);
    console.log("Hashed password : " ,hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log("User created : " , user);
    if(user){
        res.status(201).json({_id: user._id, username: user.username, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({message: "Register a user"});
});

const loginUser = asyncHandler( async (req , res) => {
    res.json({message: "login a user"});
});

const currentUser = asyncHandler( async (req , res) => {
    res.json({message: "Current user information"});
});

module.exports = {registerUser , loginUser , currentUser};