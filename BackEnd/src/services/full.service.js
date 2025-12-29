import { OwnerRepository } from "./../repositories/owner.repository.js";
import { VehicleRepository } from "../repositories/vehicle.repository.js";
import { InsuranceRepository } from "../repositories/insurance.repository.js";
import { OwnerVehicleModel } from "../models/owner-vehicle.model.js";
import { VehicleInsuranceModel } from "../models/vehicle-insurance.model.js";

const ownerRepository = new OwnerRepository();
const vehicleRepository = new VehicleRepository();
const insuranceRepository = new InsuranceRepository();

export class FullService {
	async getAll(maxResults=1) {
		const owners = await ownerRepository.getOwner({},maxResults);
		const ownerVehicleModels = [];
		for (const owner of owners) {
		const vehicles = await vehicleRepository.getVehicle({ownerTaxId: owner.ownerTaxId});
			const vehicleInsuranceModels = [];
			for (const vehicle of vehicles) {
				const insurances = await insuranceRepository.getInsurance({plateNumber: vehicle.plateNumber, ownerTaxId: vehicle.ownerTaxId});
				vehicleInsuranceModels.push(
					new VehicleInsuranceModel(vehicle, insurances)
				);
			}
			ownerVehicleModels.push(
				new OwnerVehicleModel(owner, vehicleInsuranceModels)
			);
		}
		return ownerVehicleModels;
	}

	async getByOwnerId(id) {
		const owner = await ownerRepository.getOwnersByTaxId(id);
		const vehicles = await vehicleRepository.getVehicle({
			ownerTaxId: owner.ownerTaxId,
		});
		const vehicleInsuranceModels = [];
		for (const vehicle of vehicles) {
			const filteredInsurance = await insuranceRepository.getInsurance({
				ownerTaxId: owner.ownerTaxId,
				plateNumber: vehicle.plateNumber,
			});
			vehicleInsuranceModels.push(
				new VehicleInsuranceModel(vehicle, filteredInsurance)
			);
		}
		return new OwnerVehicleModel(owner, vehicleInsuranceModels);
	}

	async create(request) {
		//TODO: create
		return;
	}

	async edit(request) {
		//TODO: create
		return;
	}

	async remove(id) {
		//TODO: create
		return;
	}
}
