const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
	name: String,
    price: String,
    description: String,
    itemImage: String,
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
