import { Vehicles } from "../models/entities/vehicle.entity.js";
import { VehicleModel } from "../models/vehicle.model.js";

export class VehicleRepository {
	async getVehicle(request) {
		const dbRequest = {};
		if (request.plateNumber) dbRequest.plateNumber = request.plateNumber;
		if (request.insuranceDate) dbRequest.insuranceDate = request.insuranceDate;
		if (request.ownerTaxId) dbRequest.ownerTaxId = request.ownerTaxId;
		if (request.brand) dbRequest.brand = request.brand;
		if (request.model) dbRequest.model = request.model;
		if (request.color) dbRequest.color = request.color;
		const data = await Vehicles.find(dbRequest);
		return data.map(
			(resultData) =>
				new VehicleModel(
					resultData.plateNumber,
					resultData.insuranceDate,
					resultData.ownerTaxId,
					resultData.brand,
					resultData.model,
					resultData.color
				)
		);
	}

	async getVehiclesByPlate(plateNumber) {
		const data = await Vehicles.find({
			plateNumber: plateNumber,
		});

		return data.map(
			(resultData) =>
				new VehicleModel(
					resultData.plateNumber,
					resultData.insuranceDate,
					resultData.ownerTaxId,
					resultData.brand,
					resultData.model,
					resultData.color
				)
		);
	}

	async createVehicle(data) {
		const results = await Vehicles.findOne({
			plateNumber: data.plateNumber,
			ownerTaxId: data.ownerTaxId,
		});
		if (!results) {
			await Vehicles.create({
				plateNumber: data.plateNumber,
				insuranceDate: data.insuranceDate,
				ownerTaxId: data.ownerTaxId,
				brand: data.brand,
				model: data.model,
				color: data.color,
				createDate: new Date(),
				updateDate: new Date(),
			});
			return data;
		}
	}

	async editVehicle(vehicleData) {
		const results = await Vehicles.findOne({
			plateNumber: vehicleData.plateNumber,
		});
		if (results) {
			await Vehicles.updateOne(
				{ plateNumber: vehicleData.plateNumber },
				{
					insuranceDate: vehicleData.insuranceDate,
					ownerTaxId: vehicleData.ownerTaxId,
					brand: vehicleData.brand,
					model: vehicleData.model,
					color: vehicleData.color,
					updateDate: new Date(),
				}
			);
			return vehicleData;
		}else{
			await Vehicles.create({
				plateNumber: vehicleData.plateNumber,
				insuranceDate: vehicleData.insuranceDate,
				ownerTaxId: vehicleData.ownerTaxId,
				brand: vehicleData.brand,
				model: vehicleData.model,
				color: vehicleData.color,
				createDate: new Date(),
				updateDate: new Date(),
			});
			return vehicleData;
		}
	}

	async removeVehicle(id) {
		const results = await Vehicles.findOne({
			plateNumber: id,
		});
		if (results) {
			await Vehicles.deleteOne({ plateNumber: id });
			return true;
		}
	}
}
