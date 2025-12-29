import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { VehicleInsuranceModel } from "./vehicle-insurance.model";

export class OwnerVehicleModel {
	ownerTaxId: String;
	name: String;
	surname: String;
	email: String;
	age: Number;
	gender: String;
	vehicles: VehicleInsuranceModel[];

	constructor() {

	}

	init(ownerTaxId, name, surname, email, age, gender, vehicles) {
		this.ownerTaxId = ownerTaxId;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.age = age;
		this.gender = gender;
		this.vehicles = vehicles ? vehicles.map((item) =>
			new VehicleInsuranceModel().init(item.vehicles.plateNumber, item.vehicles.insuranceDate, item.vehicles.ownerTaxId, item.vehicles.brand, item.vehicles.model, item.vehicles.color, item.insurances)
		) : [new VehicleInsuranceModel()];
		return this;
	}

	getFromModel(): FormGroup {

		const vehiclesList = this.vehicles ? this.vehicles.map((item) =>
			item.getFromModel()
		) : [new VehicleInsuranceModel().getFromModel()];
		const vehicleForms = new FormArray(vehiclesList);

		var form = new FormGroup({
			ownerTaxId: new FormControl({ value: this.ownerTaxId, disabled: true }, [Validators.required]),
			name: new FormControl({ value: this.name, disabled: true }, [Validators.required]),
			surname: new FormControl({ value: this.surname, disabled: true }, [Validators.required]),
			email: new FormControl({ value: this.email, disabled: true }, [Validators.required]),
			age: new FormControl({ value: this.age, disabled: true }, [Validators.required]),
			gender: new FormControl({ value: this.gender, disabled: true }, [Validators.required]),
			vehicles: vehicleForms
		});
		return form;
	}
}

