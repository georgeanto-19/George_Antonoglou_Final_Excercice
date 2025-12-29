import { FormControl, FormGroup, Validators } from "@angular/forms";

export class VehicleModel {
	plateNumber: String;
	insuranceDate: Date;
	ownerTaxId: String;
	brand: String;
	model: String;
	color: String;

	constructor(){

	}

	init(plateNumber, insuranceDate, ownerTaxId, brand, model, color) {
		this.plateNumber = plateNumber;
		this.insuranceDate = insuranceDate;
		this.ownerTaxId = ownerTaxId;
		this.brand = brand;
		this.model = model;
		this.color = color;
		return this;
	}

	getFromModel(): FormGroup {
		var form = new FormGroup({
			plateNumber: new FormControl({ value: this.plateNumber, disabled: true }, [Validators.required]),
			insuranceDate: new FormControl({ value: this.insuranceDate, disabled: true }, [Validators.required]),
			ownerTaxId: new FormControl({ value: this.ownerTaxId, disabled: true }, [Validators.required]),
			brand: new FormControl({ value: this.brand, disabled: true }, [Validators.required]),
			model: new FormControl({ value: this.model, disabled: true }, [Validators.required]),
			color: new FormControl({ value: this.color, disabled: true }, [Validators.required]),
		});
		return form;
	}

}