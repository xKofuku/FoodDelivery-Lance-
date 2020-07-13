const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

let refreshTokens = []; //Should be stored in cache or database

router.post("/token", (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) {
		return res.sendStatus(401);
	}
	if (!refreshTokens.includes(refreshToken)) {
		return res.sendStatus(403);
	}
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		const accessToken = generateAccessToken({ name: user.username });
		res.json({ accessToken: accessToken });
	});
});

router.post("/login", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, user) => {
		if (user == null) {
			return res.status(400).send("Cannot find user");
		}
		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				const refreshToken = jwt.sign({username: user.username}, process.env.REFRESH_TOKEN_SECRET);
				const accessToken = generateAccessToken({username: user.username});
				res.json({ accessToken: accessToken, refreshToken: refreshToken });
			} else {
				res.send("Not Allowed");
			}
		} catch {
			return res.status(500);
		}
	});
});

router.delete("/logout", (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(404);
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

module.exports = router;
