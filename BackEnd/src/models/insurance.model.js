export class InsuranceModel {
	constructor(insuranceId, ownerTaxId, plateNumber, expiryDate, price) {
		this.insuranceId = insuranceId;
		this.ownerTaxId = ownerTaxId;
		this.plateNumber = plateNumber;
		this.expiryDate = expiryDate;
		this.price = price;
	}
}
