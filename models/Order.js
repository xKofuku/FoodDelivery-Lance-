const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userDesc_id: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
    },
    store_id: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
	},
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
