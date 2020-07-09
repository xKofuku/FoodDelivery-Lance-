var mongoose = require("mongoose");
var User = require("./models/User");

var data = [
	{ username: "test", password: "1234" },
	{ username: "test2", password: "12346" },
	{ username: "test3", password: "12345" },
];

function seedDB() {
	User.remove({})
		.then(User.create(data))
		.catch(function (err) {
			console.log(err);
		});
}

module.exports = seedDB;
