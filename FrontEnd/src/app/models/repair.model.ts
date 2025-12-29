import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export class RepairModel {
	repairId: String;
	plateNumber: String;
	startDate: Date;
	endDate: Date;
	statuses: RepairStatusModel[];

	constructor() {

	}

	init(repairId, plateNumber, startDate, endDate, statuses) {
		this.repairId = repairId;
		this.plateNumber = plateNumber;
		this.startDate = new Date(startDate);
		this.endDate = new Date(endDate);
		this.statuses = statuses;

		this.statuses =
			this.statuses = statuses ? statuses.map((item) =>
				new RepairStatusModel().init(item.repairId, item.repairStatusId, item.startDate, item.endDate, item.mechanicName, item.description, item.comments)
			) : [new RepairStatusModel()];
		return this;
	}

	getFromModel(): FormGroup {

		const statusesList = this.statuses ? this.statuses.map((item) =>
			item.getFromModel()
		) : [new RepairStatusModel().getFromModel()];
		const statusesForms = new FormArray(statusesList);

		var form = new FormGroup({
			repairId: new FormControl({ value: this.repairId, disabled: true }, [Validators.required]),
			plateNumber: new FormControl({ value: this.plateNumber, disabled: true }, [Validators.required]),
			startDate: new FormControl({ value: this.startDate, disabled: true }, [Validators.required]),
			endDate: new FormControl({ value: this.endDate, disabled: true }, [Validators.required]),
			statuses: statusesForms,
		});
		return form;
	}

}


export class RepairStatusModel {
	repairId: String;
	repairStatusId: String;
	startDate: Date;
	endDate: Date;
	mechanicName: String;
	description: String;
	comments: String;

	constructor() {

	}

	init(repairId, repairStatusId, startDate, endDate, mechanicName, description, comments) {
		this.repairId = repairId;
		this.repairStatusId = repairStatusId;
		this.startDate = new Date(startDate);
		this.endDate = new Date(endDate);
		this.mechanicName = mechanicName;
		this.description = description;
		this.comments = comments;
		return this;
	}

	getFromModel(): FormGroup {
		var form = new FormGroup({
			repairId: new FormControl({ value: this.repairId, disabled: true }, [Validators.required]),
			repairStatusId: new FormControl({ value: this.repairStatusId, disabled: true }, [Validators.required]),
			startDate: new FormControl({ value: this.startDate, disabled: true }, [Validators.required]),
			endDate: new FormControl({ value: this.endDate, disabled: true }),
			mechanicName: new FormControl({ value: this.mechanicName, disabled: true }, [Validators.required]),
			description: new FormControl({ value: this.description, disabled: true }, [Validators.required]),
			comments: new FormControl({ value: this.comments, disabled: true }),
		});
		return form;
	}
}