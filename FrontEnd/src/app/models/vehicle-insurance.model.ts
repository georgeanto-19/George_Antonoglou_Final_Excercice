import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { InsuranceModel } from "./insurance.model";

export class VehicleInsuranceModel {
	plateNumber: String;
	insuranceDate: Date;
	ownerTaxId: String;
	brand: String;
	model: String;
	color: String;
	insurances: InsuranceModel[];

	constructor() {

	}

	init(plateNumber, insuranceDate, ownerTaxId, brand, model, color, insurances) {
		this.plateNumber = plateNumber;
		this.insuranceDate = insuranceDate;
		this.ownerTaxId = ownerTaxId;
		this.brand = brand;
		this.model = model;
		this.color = color;
		this.insurances =
			this.insurances = insurances ? insurances.map((item) =>
				new InsuranceModel().init(item.insuranceId, item.ownerTaxId, item.plateNumber, item.expiryDate, item.price)
			) : [new InsuranceModel()];
		return this;
	}

	getFromModel(): FormGroup {

		const insurancesList = this.insurances ? this.insurances.map((item) =>
			item.getFromModel()
		) : [new InsuranceModel().getFromModel()];
		const insurancesForms = new FormArray(insurancesList);

		var form = new FormGroup({
			plateNumber: new FormControl({ value: this.plateNumber, disabled: true }, [Validators.required]),
			insuranceDate: new FormControl({ value: this.insuranceDate, disabled: true }, [Validators.required]),
			ownerTaxId: new FormControl({ value: this.ownerTaxId, disabled: true }, [Validators.required]),
			brand: new FormControl({ value: this.brand, disabled: true }, [Validators.required]),
			model: new FormControl({ value: this.model, disabled: true }, [Validators.required]),
			color: new FormControl({ value: this.color, disabled: true }, [Validators.required]),
			insurances: insurancesForms
		});
		return form;
	}

}