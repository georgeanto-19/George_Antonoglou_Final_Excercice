import { FormControl, FormGroup, Validators } from "@angular/forms";

export class InsuranceModel {
	insuranceId: String;
	ownerTaxId: String;
	plateNumber: String;
	expiryDate: Date;
	price: Number;

	constructor() {
	}

	init(insuranceId, ownerTaxId, plateNumber, expiryDate, price) {
		this.insuranceId = insuranceId;
		this.ownerTaxId = ownerTaxId;
		this.plateNumber = plateNumber;
		this.expiryDate = expiryDate;
		this.price = price;
		return this;
	}

	getFromModel(): FormGroup {
		var form = new FormGroup({
			insuranceId: new FormControl({ value: this.insuranceId, disabled: true }, [Validators.required]),
			ownerTaxId: new FormControl({ value: this.ownerTaxId, disabled: true }, [Validators.required]),
			plateNumber: new FormControl({ value: this.plateNumber, disabled: true }, [Validators.required]),
			expiryDate: new FormControl({ value: this.expiryDate, disabled: true }, [Validators.required]),
			price: new FormControl({ value: this.price, disabled: true }, [Validators.required]),
		});
		return form;
	}
}
