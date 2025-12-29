import { OwnerRepository } from "./../repositories/owner.repository.js";

const ownerRepository = new OwnerRepository();

export class OwnerService {
	async getOwners(request) {
		return await ownerRepository.getOwner(request);
	}

	async getOwnerById(id) {
		return await ownerRepository.getOwnersByTaxId(id);
	}

	async createOwner(request) {
		return await ownerRepository.createOwner(request);
	}

	async editOwner(request) {
		return await ownerRepository.editOwner(request);
	}

	async removeOwner(id) {
		return await ownerRepository.removeOwner(id);
	}
}
