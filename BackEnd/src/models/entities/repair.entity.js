import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({
	repairId: { type: String, required: true, unique: true },
	plateNumber: { type: String, required: true },
	startDate: { type: Date },
	endDate: { type: Date },
	createDate: { type: Date },
	updateDate: { type: Date },
});

const Repairs = mongoose.model("Repairs", repairSchema);
export { Repairs };
