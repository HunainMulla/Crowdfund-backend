const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    campaigns: [{
        name:{ 
            type: String,   
            required: true
        },
        description:{
            type: String,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },
        currentAmount:{
            type: Number,
            required: true,
            default: 0
        },
        image:{
            type: String,
        },
        
    }]
});

module.exports = mongoose.model("User", userSchema);
