import { Repairs } from "../models/entities/repair.entity.js";
import { RepairStatus } from "../models/entities/repair-status.entity.js";
import { RepairModel } from "../models/repair.model.js";
import { RepairStatusModel } from "../models/repair-status.model.js";

export class RepairRepository {
	async getRepair(request) {
		const dbRequest = {};
		if (request.repairId) dbRequest.repairId = request.repairId;
		if (request.plateNumber) dbRequest.plateNumber = request.plateNumber;
		if (request.startDate)
			dbRequest.startDate = { $gte: new Date(request.startDate) };
		if (request.endDate)
			dbRequest.endDate = { $lt: new Date(request.endDate) };
		const data = await Repairs.find(dbRequest);

		const results = await Promise.all(
			data.map(async (repair) => {
				const statusesList = await RepairStatus.find({
					repairId: repair.repairId,
				});
				const statuses = statusesList.map((status) => {
					return new RepairStatusModel(
						status.repairId,
						status.repairStatusId,
						status.startDate,
						status.endDate,
						status.mechanicName,
						status.description,
						status.comments
					);
				});
				return new RepairModel(
					repair.repairId,
					repair.plateNumber,
					statuses,
					repair.startDate,
					repair.endDate
				);
			})
		);
		return results;
	}

	async createRepair(data) {
		const results = await Repairs.findOne({
			repairId: data.repairId,
			plateNumber: data.plateNumber,
		});
		if (!results) {
			await Repairs.create({
				repairId: data.repairId,
				plateNumber: data.plateNumber,
				startDate: data.startDate,
				endDate: data.endDate,
				createDate: new Date(),
				updateDate: new Date(),
			});
			const results = await Promise.all(
				data.statuses.map(async (status) => {
					await RepairStatus.create({
						repairId: status.repairId,
						repairStatusId: status.repairStatusId,
						startDate: status.startDate,
						endDate: status.endDate,
						mechanicName: status.mechanicName,
						comments: status.comments,
						createDate: new Date(),
						updateDate: new Date(),
					});
				})
			);

			return results;
		}
	}

	async editRepair(repairData) {
		const results = await Repairs.findOne({
			repairId: data.repairId,
			plateNumber: data.plateNumber,
		});
		if (results) {
			await Repairs.updateOne(
				{ repairId: data.repairId, plateNumber: data.plateNumber },
				{
					startDate: repairData.insuranceDate,
					endDate: repairData.endDate,
					updateDate: new Date(),
				}
			);
			const results1 = await Promise.all(
				repairData.statuses.map(
					async (status) =>
						await RepairStatus.updateOne(
							{
								repairId: status.repairId,
								repairStatusId: status.repairStatusId,
							},
							{
								startDate: status.startDate,
								endDate: status.endDate,
								mechanicName: status.mechanicName,
								comments: status.comments,
								updateDate: new Date(),
							}
						)
				)
			);
			return results1;
		} else {
			await Repairs.create({
				repairId: repairData.repairId,
				plateNumber: repairData.plateNumber,
				startDate: repairData.startDate,
				endDate: repairData.endDate,
				createDate: new Date(),
				updateDate: new Date(),
			});
			const results = await Promise.all(
				repairData.statuses.map(async (status) => {
					await RepairStatus.create({
						repairId: status.repairId,
						repairStatusId: status.repairStatusId,
						startDate: status.startDate,
						endDate: status.endDate,
						mechanicName: status.mechanicName,
						comments: status.comments,
						createDate: new Date(),
						updateDate: new Date(),
					});
				})
			);
			return results;
		}
	}

	async removeRepair(id) {
		const results = await Repairs.findOne({
			plateNumber: id,
		});
		if (results) {
			await Repairs.deleteOne({ plateNumber: id });
			await RepairStatus.deleteMany({ repairId: results.repairId });
			return true;
		}
	}
}
