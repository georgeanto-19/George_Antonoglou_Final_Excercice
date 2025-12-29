import { RepairRepository } from "../repositories/repair.repository.js";

const repairRepository = new RepairRepository();

export class RepairService {
	async getRepairs(request) {
		return await repairRepository.getRepair(request);
	}

	async createRepair(request) {
		return await repairRepository.createRepair(request);
	}

	async editRepair(request) {
		return await repairRepository.editRepair(request);
	}

	async removeRepair(request) {
		return await repairRepository.removeRepair(request);
	}
}
