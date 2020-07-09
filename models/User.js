const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema({
	username: String,
	password: String,
	userInfo: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserDetails",
		},
	},
});

const User = mongoose.model("User", userAuthSchema);
module.exports = User;
