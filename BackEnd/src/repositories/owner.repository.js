import { Owners } from "./../models/entities/owner.entity.js";
import { OwnerModel } from "./../models/owner.model.js";

export class OwnerRepository {
	async getOwnersByTaxId(ownerTaxId) {
		const data = await Owners.findOne({
			ownerTaxId: ownerTaxId,
		});
		return new OwnerModel(
			data.ownerTaxId,
			data.name,
			data.surname,
			data.email,
			data.age,
			data.gender
		);
	}

	async getOwner(request,maxResults=1) {
		const dbRequest = {};
		if (request.ownerTaxId) dbRequest.ownerTaxId = request.ownerTaxId;
		if (request.name) dbRequest.name = request.name;
		if (request.surname) dbRequest.surname = request.surname;
		if (request.email) dbRequest.email = request.email;
		if (request.age) dbRequest.age = request.age;
		if (request.gender) dbRequest.gender = request.gender;
		const data = await Owners.find(dbRequest).limit(maxResults);
		return data.map(
			(item) =>
				new OwnerModel(
					item.ownerTaxId,
					item.name,
					item.surname,
					item.email,
					item.age,
					item.gender
				)
		);
	}

	async createOwner(ownerData) {
		const results = await Owners.findOne({
			ownerTaxId: ownerData.ownerTaxId,
		});
		if (!results) {
			await Owners.create({
				ownerTaxId: ownerData.ownerTaxId,
				name: ownerData.name,
				surname: ownerData.surname,
				email: ownerData.email,
				age: ownerData.age,
				gender: ownerData.gender,
				createDate: new Date(),
				updateDate: new Date(),
			});
			return ownerData;
		}
	}
	
	async editOwner(ownerData) {
		const results = await Owners.findOne({
			ownerTaxId: ownerData.ownerTaxId,
		});
		if (results) {
			await Owners.updateOne(
				{ ownerTaxId: ownerData.ownerTaxId },
				{
					name: ownerData.name,
					surname: ownerData.surname,
					email: ownerData.email,
					age: ownerData.age,
					gender: ownerData.gender,
					updateDate: new Date(),
				}
			);
			return ownerData;
		}else{
			await Owners.create({
				ownerTaxId: ownerData.ownerTaxId,
				name: ownerData.name,
				surname: ownerData.surname,
				email: ownerData.email,
				age: ownerData.age,
				gender: ownerData.gender,
				createDate: new Date(),
				updateDate: new Date(),
			});
			return ownerData;
		}
	}

	async removeOwner(id) {
		const results = await Owners.findOne({
			ownerTaxId: id,
		});
		if (results) {
			await Owners.deleteOne({ ownerTaxId: id });
			return true;
		}
	}
}
