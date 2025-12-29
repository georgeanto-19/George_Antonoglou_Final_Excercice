import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String },
	createDate: { type: Date },
	updateDate: { type: Date },
});

const Users = mongoose.model("Users", userSchema);
export { Users };
