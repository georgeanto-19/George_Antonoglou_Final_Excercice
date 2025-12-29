
import mongoose from 'mongoose';
const VehicleSchema = new mongoose.Schema({
	plateNumber: String,
	insuranceDate: String,
	ownerTaxId: String,
	brand: String,
	model: String,
	color: String,
	createDate: Date,
	updateDate: Date,
});
VehicleSchema.index({ plateNumber: 1, ownerTaxId:1 }, { unique: true });

const Vehicles = mongoose.model("Vehicles", VehicleSchema);
export { Vehicles };
