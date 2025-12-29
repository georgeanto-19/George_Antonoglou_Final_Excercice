import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
	ownerTaxId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String},
	age: { type: Number },
	gender: { type: String },
	createDate: { type: Date },
	updateDate: { type: Date },
});

const Owners = mongoose.model("Owners", ownerSchema);
export { Owners };
