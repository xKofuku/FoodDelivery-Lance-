const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
	name: String,
	address: String,
	ratings: String,
	storePhoto: String, //URL link, must be changed
	Menu: String,
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
