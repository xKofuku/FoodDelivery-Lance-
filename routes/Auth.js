const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const middleware = require("../middleware/index");
const ROLE = require("../helpers/UserRoles");


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

router.post("/token", (req, res) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		const data = User.findOne({username: user.username}).exec();
		data.refreshToken
	});

	const refreshToken = req.cookies.refreshToken;
	if (refreshToken == null) {
		return res.sendStatus(401);
	}
	// if (!refreshTokens.includes(refreshToken)) {
	// 	return res.sendStatus(403);
	// }
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		const accessToken = generateAccessToken({ username: user.username });
		res.json({ accessToken: accessToken });
	});
});

router.post("/login", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, user) => {
		if (user == null) {
			return res.status(400).send("Wrong username or password");
		}
		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				const refreshToken = jwt.sign(
					{ _id: user._id, username: user.username, role: user.role },
					process.env.REFRESH_TOKEN_SECRET
				);
				const accessToken = generateAccessToken({
					_id: user._id,
					username: user.username,
					role: user.role,
				});
				res.cookie("accessToken", accessToken, {
					maxAge: 36000,
					httpOnly: true,
					//secure: true
				});
				user.refreshToken = refreshToken;
				user.save();
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
	res.clearCookie("accessToken");
	User.findOne().then(function (user) {
		user.refreshToken = null;
		user.save();
	});
	res.sendStatus(204);
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}

module.exports = router;
