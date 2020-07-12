const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
	title: String,
	body: String,
	ratings: String,
    userDesc_id: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserDetails",
		},
    }, 
    store_id: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Store",
		},
	},
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
