const express = require("express");
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys/keys");
const Seed = require("./seed");

const app = express();
const PORT = 5000;

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
Seed();

//Model Schema Imports

//Route Imports
let userRoutes = require("./routes/User");

//Route Use
app.use("/api/users", userRoutes);

//App listen
app.listen(PORT, () => {
	console.log(`Server started on port`);
});
