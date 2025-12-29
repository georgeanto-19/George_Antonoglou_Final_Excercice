
import mongoose from 'mongoose';
const InsuranceSchema = new mongoose.Schema({
	insuranceId: String,
	ownerTaxId: String,
	plateNumber: String,
	expiryDate: Date,
	price: Number,
	createDate: Date,
	updateDate: Date,
});
InsuranceSchema.index({ insuranceId: 1, ownerTaxId:1, plateNumber:1 }, { unique: true });

const Insurances = mongoose.model("Insurances", InsuranceSchema);
export { Insurances };


