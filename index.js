const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const port=4000;
dotenv.config();


mongoose.connect(process.env.DB_URI,
    () =>{console.log("DB connected");
})
app.use(cookieParser());
app.use(express.json());

app.use("/api/user",authRoutes);

app.listen(port,() => {
    console.log("server started");
})