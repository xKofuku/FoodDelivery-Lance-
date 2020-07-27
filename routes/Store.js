const express = require("express");
const router = express.Router();
const User = require("../models/User");
const middleware = require("../middleware/index");
const ROLE = require("../helpers/UserRoles");

router.get(
	"/",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.CUSTOMER),
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

router.post(
	"/",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.CUSTOMER),
	(req, res) => {
		User.create(req.body)
			.then(function (newUser) {
				res.status(201).json(newUser);
			})
			.catch(function (err) {
				res.send(err);
			});
	}
);

router.get(
	"/:userId",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.CUSTOMER),
	(req, res) => {
		User.findById(req.params.userId)
			.then(function (foundUser) {
				res.json(foundUser);
			})
			.catch(function (err) {
				res.send(err);
			});
	}
);

router.put(
	"/:userId",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.CUSTOMER),
	(req, res) => {
		User.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
			.then(function (todo) {
				res.json(todo);
			})
			.catch(function (err) {
				res.send(err);
			});
	}
);

router.delete(
	"/:userId",
	middleware.authenticateToken,
	middleware.checkRole(ROLE.CUSTOMER),
	(req, res) => {
		User.remove({ _id: req.params.todoId })
			.then(function () {
				res.json({ message: "We Deleted it" });
			})
			.catch(function (err) {
				res.send(err);
			});
	}
);

module.exports = router;