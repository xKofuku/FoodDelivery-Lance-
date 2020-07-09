const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
	User.find()
		.then(function (user) {
			res.json(user);
		})
		.catch(function (user) {
			res.send(user);
		});
});

module.exports = router;
