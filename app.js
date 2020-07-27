require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
//const cors = require("cors");
const { MONGOURI } = require("./keys/keys");
const Seed = require("./seed");
const connectDB = require("./config/db");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(
// 	cors({
// 		origin: process.env.CORS_ORIGIN,
// 		credentials: true,
// 	})
// );

//Connection to Mongo
connectDB();

//Seeds the database
//Seed();

//Model Schema Imports

//Route Imports
let authRoutes = require("./routes/Auth");
let userRoutes = require("./routes/User");

//Route Use
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//App listen
app.listen(PORT || 3000, () => {
	console.log(`Server started on port`);
});
