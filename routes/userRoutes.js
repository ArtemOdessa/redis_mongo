const mongoose = require("mongoose");
const { clearKey } = require("../services/cache");
const User = mongoose.model("User");

module.exports = app => {
	app.get("/api/users", async (req, res) => {
		try {
			let user;
			if (req.query.id) {
				user = await User.findById(req.query.id).cache();
			} else {
				user = await User.findById().cache({
					time: 10
				});
			}

			res.status(200).send(user);
		} catch (err) {
			res.status(500).send(err);
		}
		
	});

	app.post("/api/users", async (req, res) => {
		const { fullName, DOB, gender } = req.body;

		const user = new User({
			fullName,
			DOB,
			gender
		});

		try {
			await user.save();
			clearKey(User.collection.collectionName);
			
			res.send(user);
		} catch (err) {
			res.status(500).send(err);
		}
	});

	app.put("/api/users", async (req, res) => {
		const { fullName, DOB, gender } = req.body;

		try {
			const filter = { _id: req.query.id };
			const update = {
				fullName: fullName,
				DOB: DOB,
				gender: gender
			};

			await User.findOneAndUpdate(filter, update);
			clearKey(User.collection.collectionName);

			res.status(200).send({message: 'OK'});
		} catch (err) {
			res.status(400).send(err);
		}
	})
};
