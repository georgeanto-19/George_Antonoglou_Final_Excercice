import { FormControl, FormGroup, Validators } from "@angular/forms";

export class OwnerModel {
	ownerTaxId: String;
	name: String;
	surname: String;
	email: String;
	age: Number;
	gender: String;

	constructor(){

	}
	init(ownerTaxId, name, surname, email, age, gender) {
		this.ownerTaxId = ownerTaxId;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.age = age;
		this.gender = gender;
		return this;
	}

	getFromModel(): FormGroup {
		var form = new FormGroup({
			ownerTaxId: new FormControl({ value: this.ownerTaxId, disabled: true }, [Validators.required]),
			name: new FormControl({ value: this.name, disabled: true }, [Validators.required]),
			surname: new FormControl({ value: this.surname, disabled: true }, [Validators.required]),
			email: new FormControl({ value: this.email, disabled: true }, [Validators.required]),
			age: new FormControl({ value: this.age, disabled: true }, [Validators.required]),
			gender: new FormControl({ value: this.gender, disabled: true }, [Validators.required]),
		});
		return form;
	}
}

