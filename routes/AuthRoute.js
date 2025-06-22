const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/Db");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
    const { email, password } = await req.body;
    console.log(req.body);    
    console.log("This it the user email and password = ",email,password);
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ token });
});

router.post("/logout", (req, res) => {
    res.send("Hello World");
});


router.get("/test",(req,res)=>{ 
    res.send("Hello World");
});


module.exports = router;
