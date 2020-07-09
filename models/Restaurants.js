const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
	name: String,
	address: String,
	ratings: String,
	retaurantPhoto: String, //URL link, must be changed
	Menu: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
