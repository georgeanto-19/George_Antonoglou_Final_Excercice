import { UserRepository } from "./../repositories/user.repository.js";
import { OwnerRepository } from "./../repositories/owner.repository.js";
import { VehicleRepository } from "./../repositories/vehicle.repository.js";
import { InsuranceRepository } from "./../repositories/insurance.repository.js";
import { RepairRepository } from "./../repositories/repair.repository.js";

const userRepository = new UserRepository();
const ownerRepository = new OwnerRepository();
const vehicleRepository = new VehicleRepository();
const insuranceRepository = new InsuranceRepository();
const repairRepository = new RepairRepository();

export class InitialService {
	async initDb() {
		//Users
		await userRepository.createUser({
			name: "admin",
			surname: "admin",
			email: "admin@example.com",
			username: "admin",
			password: "admin",
		});
		await userRepository.createUser({
			name: "Georgis",
			surname: "Antonoglou",
			email: "georgis.antonoglou@example.com",
			username: "georgisantonoglou",
			password: "password123",
		});
		await userRepository.createUser({
			name: "John",
			surname: "Doe",
			email: "john.doe@example.com",
			username: "johndoe",
			password: "password123",
		});

		//Owners
		await ownerRepository.createOwner({
			ownerTaxId: "taxId001",
			name: "Georgis",
			surname: "Antonoglou",
			email: "Georgis.a@example.com",
			age: 30,
			gender: "MALE",
		});
		await ownerRepository.createOwner({
			ownerTaxId: "taxId002",
			name: "Anna",
			surname: "Antonoglou",
			email: "Anna.a@example.com",
			age: 30,
			gender: "FEMALE",
		});

		//Vehicle
		await vehicleRepository.createVehicle({
			plateNumber: "plate001",
			insuranceDate: new Date(),
			ownerTaxId: "taxId001",
			brand: "Toyota",
			model: "Camry",
			color: "Red",
		});
		await vehicleRepository.createVehicle({
			plateNumber: "plate002",
			insuranceDate: new Date(),
			ownerTaxId: "taxId002",
			brand: "Honda",
			model: "Civic",
			color: "Blue",
		});

		// Insurance
		await insuranceRepository.createInsurance({
			insuranceId: "insurance001",
			plateNumber: "plate001",
			ownerTaxId: "taxId001",
			expiryDate: new Date().addDays(365),
			price: 150,
		});
		await insuranceRepository.createInsurance({
			insuranceId: "insurance002",
			plateNumber: "plate002",
			ownerTaxId: "taxId002",
			expiryDate: new Date().addDays(60),
			price: 100,
		});

		// Reapirs
		await repairRepository.createRepair({
			repairId: "repair001",
			plateNumber: "plate001",
			startDate: new Date().addDays(-60),
			endDate: new Date().addDays(-1),
			statuses: [
				{
					repairId: "repair001",
					repairStatusId: "repairStatus0011",
					startDate: new Date().addDays(-60),
					endDate: new Date().addDays(-30),
					mechanicName: "Mike",
					comments: "Initial inspection completed.",
				},
				{
					repairId: "repair001",
					repairStatusId: "repairStatus0012",
					startDate: new Date().addDays(-29),
					endDate: new Date().addDays(-1),
					mechanicName: "Steve",
					comments: "Repairs finished, vehicle ready for pickup.",
				},
			],
		});
		await repairRepository.createRepair({
			repairId: "repair002",
			plateNumber: "plate002",
			startDate: new Date().addDays(-30),
			endDate: null,
			statuses: [
				{
					repairId: "repair002",
					repairStatusId: "repairStatus0021",
					startDate: new Date().addDays(-30),
					endDate: new Date().addDays(-5),
					mechanicName: "Mike",
					comments: "Initial inspection completed.",
				},
				{
					repairId: "repair002",
					repairStatusId: "repairStatus0022",
					startDate: new Date().addDays(-5),
					mechanicName: "Steve",
					comments: "Repairs finished, vehicle ready for pickup.",
				},
			],
		});
		return true;
	}
}

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};
