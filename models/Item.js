const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
	name: String,
    price: String,
    description: String,
    itemImage: String,
    store_id: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
	},
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
