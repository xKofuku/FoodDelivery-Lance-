const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const middleware = require("../middleware/index");
const ROLE = require("../helpers/UserRoles");

router.get(
	"/",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.ADMIN),
	(req, res) => {
		User.find()
			.then(function (user) {
				res.json(user);
			})
			.catch(function (user) {
				res.send(user);
			});
	}
);

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
			return res.status(400).send("Cannot find user");
		}
		try {
			if (await bcrypt.compare(req.body.password, user.password)) {
				const refreshToken = jwt.sign(
					{ username: user.username },
					process.env.REFRESH_TOKEN_SECRET
				);
				const accessToken = generateAccessToken({ username: user.username });
				res.cookie("refreshToken", refreshToken, {
					maxAge: 3600,
					httpOnly: true,
					//secure: true
				});
				res.json({ accessToken: accessToken });
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
	res.sendStatus(204);
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}

module.exports = router;
