const express = require("express");
const app = express();
const authRoutes = require("./routes/AuthRoute");
const connectDB = require("./config/Db");
const dotenv = require("dotenv");
const createCamp = require("./routes/CreateCamp");

dotenv.config();
connectDB();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/campaign", createCamp);
// app.use("/user", userRoutes);   


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


