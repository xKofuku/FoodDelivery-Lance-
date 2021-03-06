const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "customer",
		enum: ["customer", "rider", "store", "admin"],
	},
	refreshToken: {
		type: String,
	},
	userInfo: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserDetails",
		},
	},
});

const User = mongoose.model("User", userAuthSchema);
module.exports = User;
