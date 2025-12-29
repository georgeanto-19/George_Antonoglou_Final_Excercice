import { UserRepository } from "./../repositories/user.repository.js";

const userRepository = new UserRepository();

export class UserService {
	async getUser(username) {
		return await userRepository.getUser(username);
	}
}
