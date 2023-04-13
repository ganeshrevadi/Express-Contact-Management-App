const asyncHandler = require("express-async-handler");

//@desc Register a new user
//@route GET /api/users/register
//@access Public
const registerUser = asyncHandler( async (req , res) => {
    res.json({message: "Register a user"});
});

const loginUser = asyncHandler( async (req , res) => {
    res.json({message: "login a user"});
});

const currentUser = asyncHandler( async (req , res) => {
    res.json({message: "Current user information"});
});

module.exports = {registerUser , loginUser , currentUser};