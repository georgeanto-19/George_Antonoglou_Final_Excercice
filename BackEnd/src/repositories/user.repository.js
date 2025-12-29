import { Users } from "./../models/entities/user.entity.js";
import { UserModel } from "./../models/user.model.js";

export class UserRepository {
	async getUser(username) {
		const data = await Users.findOne({
			username: username,
		});
		if (data) {
			return new UserModel(
				data.name,
				data.surname,
				data.email,
				data.username,
				data.password
			);
		}
		return null;
	}

	async createUser(data) {
		const results = await Users.findOne({
			username: data.username,
		});
		if (!results) {
			await Users.create({
				name: data.name,
				surname: data.surname,
				email: data.email,
				username: data.username,
				password: data.password,
				createDate: new Date(),
				updateDate: new Date(),
			});
			return data;
		}
	}

	async removeUser(id) {
		const results = await Users.findOne({
			username: id,
		});
		if (results) {
			await Users.deleteOne({ username: id });
			return true;
		}
	}
}
