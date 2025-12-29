import { InsuranceRepository } from "../repositories/insurance.repository.js";

const insuranceRepository = new InsuranceRepository();

export class InsuranceService {
	async getInsurances(request) {
		return await insuranceRepository.getInsurance(request);
	}

	async getInsuranceById(request) {
		return await insuranceRepository.getInsurancesById(request);
	}

	async createInsurance(request) {
		return await insuranceRepository.createInsurance(request);
	}

	async editInsurance(request) {
		return await insuranceRepository.editInsurance(request);
	}

	async removeInsurance(request) {
		//TODO: Implement remove insurance logic
	}
}
