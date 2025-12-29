import mongoose from "mongoose";

const repairStatusSchema = new mongoose.Schema({
	repairId: { type: String, required: true },
	repairStatusId: { type: String, required: true },
	startDate: { type: Date },
	endDate: { type: Date },
	mechanicName: { type: String },
	description: { type: String },
	comments: { type: String },
	createDate: { type: Date },
	updateDate: { type: Date },
});
repairStatusSchema.index({ repairId: 1, repairStatusId: 1 }, { unique: true });

const RepairStatus = mongoose.model("RepairStatus", repairStatusSchema);
export { RepairStatus };