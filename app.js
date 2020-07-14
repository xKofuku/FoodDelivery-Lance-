require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { MONGOURI } = require("./keys/keys");
const Seed = require("./seed");

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(
// 	jwt({
// 		secret: process.env.REFRESH_TOKEN_SECRET,
// 		getToken: (req) => req.cookies.token,
// 	})
// );

const PORT = process.env.PORT;

//Connection to Mongo

mongoose.connect(MONGOURI, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
	console.log("Connected to Mongo");
});

mongoose.connection.on("error", (error) => {
	console.log("Error" + error);
});

//Seeds the database
//Seed();

//Model Schema Imports

//Route Imports
let userRoutes = require("./routes/User");

//Route Use
app.use("/api/users", userRoutes);

//App listen
app.listen(PORT || 3000, () => {
	console.log(`Server started on port`);
});
