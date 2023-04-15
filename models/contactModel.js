const moongoose = require("mongoose");

const contactSchema = new moongoose.Schema({
    user_id: {
        type: moongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true,"Email already exists"],
    },
    phone:{
        type: String,
        required: [true, "Please provide a phone number"],
    },
},  {timestamps: true});    

module.exports = moongoose.model("User", contactSchema);