const asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req , res) => { 
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New contacts
//@route POST /api/contacts
//@access Public
const createContact = asyncHandler( async (req , res) => { 
    console.log("The request body is :" , req.body);
    const { name , email , phone } = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("Please enter all fields");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id,

    });

    res.status(201).json(contact);
});

//@desc Get all contacts
//@route GET /api/contacts/:id
//@access Public
const getContact = asyncHandler( async (req , res) => { 
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update all contacts
//@route PUT /api/contacts/:id
//@access Public
const updateContact = asyncHandler( async (req , res) => { 
    const contacts = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc Delete all contacts
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = asyncHandler( async (req , res) => { 
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized");
    }

    await contact.deleteOne({_id: req.params.id});
    res.status(201).json({message: `Delete contact for ${req.params.id}`});
});


module.exports = { getContacts , createContact , getContact , updateContact , deleteContact };