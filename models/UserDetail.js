const mongoose = require("mongoose");

const userDetailSchema = mongoose.Schema({
	firstName: String,
    lastName: String,
    email: String,
    displayPicture: String, //URL link, must be changed
    address: String,
});

const UserDetail = mongoose.model("UserDetail", userDetailSchema);
module.exports = UserDetail;
