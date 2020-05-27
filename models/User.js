const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: String,
	DOB: String,
	gender: String
});

mongoose.model("User", userSchema);
