require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys/keys");
const Seed = require("./seed");

const app = express();
app.use(express.json());

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
let userAuth = require("./routes/UserAuth");

//Route Use
app.use("/api/users", userRoutes);
app.use("/api/users", userAuth);

//App listen
app.listen(PORT || 3000, () => {
	console.log(`Server started on port`);
});
