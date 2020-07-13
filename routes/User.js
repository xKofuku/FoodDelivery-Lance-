const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const middleware = require("../middleware/index");

router.get("/", middleware.authenticateToken, (req, res) => {
	User.find()
		.then(function (user) {
			res.json(user);
		})
		.catch(function (user) {
			res.send(user);
		});
});

router.post("/register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = { username: req.body.username, password: hashedPassword };
		User.create(user);
	} catch {
		res.status(500).send();
	}
});

module.exports = router;
