export class RepairStatusModel {
	constructor(repairId, repairStatusId, startDate, endDate, mechanicName, description, comments) {
		this.repairId = repairId;
		this.repairStatusId = repairStatusId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.mechanicName = mechanicName;
		this.description = description;
		this.comments = comments;
	}
}
